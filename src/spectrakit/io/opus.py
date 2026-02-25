"""Bruker OPUS binary file format parser (.0, .1, .2, etc.).

The OPUS format is a proprietary binary format used by Bruker spectrometers.
This module provides a native parser (no external dependencies) that reads
the block directory, extracts spectral data parameters (NPT, FXV, LXV),
and reads float32 intensity arrays.

File structure overview:
    - Bytes 0-3: Magic bytes (version identifier)
    - Bytes 4-7: Program version (double, partially)
    - Bytes 8-11: Offset to first directory block pointer
    - The directory contains 12-byte entries: block_type(4), length(4), offset(4)
    - Parameter blocks contain 3-char ASCII tags with type/value pairs
    - Data blocks store IEEE 754 float32 arrays in little-endian byte order
"""

from __future__ import annotations

import logging
import struct
from pathlib import Path
from typing import Any

import numpy as np

from spectrakit._validate import validate_file_size
from spectrakit.exceptions import FileFormatError
from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)

# ── OPUS block type masks and identifiers ───────────────────────────
# OPUS block types are encoded in the lower bits of the 4-byte type field.
# The upper bytes can encode sub-type and channel information.
# Common data type identifiers (lower byte):
_DATA_TYPE_AB = 0x0F  # Absorbance / transmittance spectrum
_DATA_TYPE_SC_REF = 0x0B  # Single-channel reference
_DATA_TYPE_SC_SAMPLE = 0x07  # Single-channel sample
_DATA_TYPE_IGRM = 0x03  # Interferogram

# Common status/parameter block identifiers (lower two bytes):
_PARAM_DATA_STATUS = 0x1F  # Data status parameters (NPT, FXV, LXV for AB)
_PARAM_RF_STATUS = 0x1B  # Reference status parameters
_PARAM_SC_STATUS = 0x17  # Sample SC status parameters
_PARAM_INSTRUMENT = 0x20  # Instrument parameters
_PARAM_SAMPLE = 0x40  # Sample/acquisition parameters

# Minimum valid OPUS file size: magic(4) + version(4) + pointer(4) + at least
# one directory entry header(12) = 24 bytes absolute minimum.
_MIN_FILE_SIZE = 24

# OPUS parameter type codes (byte following the 3-char tag + padding)
_PARAM_TYPE_INT = 0
_PARAM_TYPE_FLOAT = 1
_PARAM_TYPE_STRING = 2
_PARAM_TYPE_ENUM = 3
_PARAM_TYPE_DOUBLE = 1  # Doubles also use type code 1 but with size 8


def _parse_directory(
    raw: bytes,
) -> list[tuple[int, int, int]]:
    """Parse the OPUS block directory from raw file bytes.

    The directory starts at a known offset in the file header. Each entry
    is 12 bytes: block_type (uint32-LE), block_length (uint32-LE),
    block_offset (uint32-LE). The first directory entry is typically at
    byte offset 24.

    Args:
        raw: Complete file contents as bytes.

    Returns:
        List of (block_type, block_length, block_offset) tuples. Entries
        with block_type == 0 (end sentinel) are excluded.

    Raises:
        FileFormatError: If the directory cannot be parsed.
    """
    if len(raw) < _MIN_FILE_SIZE:
        raise FileFormatError(
            f"File too small to be OPUS format ({len(raw)} bytes, minimum {_MIN_FILE_SIZE})."
        )

    # The first 4 bytes are magic / version marker.
    # Byte 4 (or offset ~8 in some variants) typically contains metadata.
    # The directory pointer is at offset 8 (uint32-LE) in most OPUS files,
    # pointing to the start of the directory block.
    # However, many implementations simply start the directory at offset 24.
    #
    # We use the approach: try the pointer at offset 8; if the directory
    # there looks invalid, fall back to offset 24.
    try:
        dir_offset_candidate = struct.unpack_from("<I", raw, 8)[0]
    except struct.error:
        dir_offset_candidate = 0

    # Determine number of directory entries. The maximum number of entries
    # is stored at offset 16 (uint32-LE) and the actual count at offset 20.
    # If those look reasonable, use them; otherwise scan until a zero entry.
    try:
        _max_entries = struct.unpack_from("<I", raw, 16)[0]  # noqa: F841
        num_entries = struct.unpack_from("<I", raw, 20)[0]
    except struct.error:
        num_entries = 0

    # Validate: if num_entries is unreasonable, we will scan instead
    if num_entries == 0 or num_entries > 200:
        # Try to auto-detect by scanning from offset 24
        num_entries = 0

    # Determine the directory start offset
    dir_start = 24
    if dir_offset_candidate >= 24 and dir_offset_candidate + 12 <= len(raw):
        # Validate by checking if entries at that offset look like valid blocks
        test_type = struct.unpack_from("<I", raw, dir_offset_candidate)[0]
        if test_type != 0 and test_type < 0xFFFF:
            dir_start = dir_offset_candidate

    entries: list[tuple[int, int, int]] = []
    offset = dir_start

    # Read up to a reasonable maximum of directory entries
    scan_limit = num_entries if num_entries > 0 else 200
    for _ in range(scan_limit):
        if offset + 12 > len(raw):
            break
        try:
            block_type, block_length, block_offset = struct.unpack_from("<III", raw, offset)
        except struct.error:
            break

        if block_type == 0:
            break

        # Sanity-check: block_offset must be within file bounds
        if block_offset < len(raw):
            entries.append((block_type, block_length, block_offset))
            logger.debug(
                "Directory entry: type=0x%04X, length=%d, offset=%d",
                block_type,
                block_length,
                block_offset,
            )

        offset += 12

    if not entries:
        raise FileFormatError("No valid directory entries found in OPUS file.")

    return entries


def _parse_parameter_block(
    raw: bytes,
    offset: int,
    length: int,
) -> dict[str, Any]:
    """Parse an OPUS parameter block into a tag-value dictionary.

    OPUS parameter blocks store values as sequences of:
        - 3-byte ASCII tag (e.g., ``NPT``, ``FXV``, ``LXV``)
        - 1-byte type code (0=int, 1=double, 2=string, 3=enum)
        - 2-byte size (uint16-LE, total size of value in bytes)
        - N bytes value

    Args:
        raw: Complete file contents as bytes.
        offset: Byte offset where the parameter block starts.
        length: Length of the parameter block in 4-byte words (as stored
            in the directory; multiply by 4 for byte length, though we
            use it as a byte limit hint).

    Returns:
        Dictionary mapping 3-char tags to their parsed values.
    """
    params: dict[str, Any] = {}
    # Block length in the directory is in bytes for our purposes.
    # We clamp to file size to be safe.
    block_end = min(offset + length, len(raw))
    pos = offset

    while pos + 8 <= block_end:
        # Read the 3-char tag
        try:
            tag_bytes = raw[pos : pos + 3]
            tag = tag_bytes.decode("ascii", errors="replace").strip("\x00")
        except (UnicodeDecodeError, IndexError):
            break

        if len(tag) < 2 or not tag[0].isalpha():
            # Not a valid tag -- we've reached padding or end
            pos += 4
            continue

        # Type code is at pos+3 (after a null/padding byte sometimes)
        # The layout is: tag[3], type_code[2], size[2], value[size]
        try:
            type_code = struct.unpack_from("<H", raw, pos + 4)[0]
            value_size = struct.unpack_from("<H", raw, pos + 6)[0]
        except struct.error:
            break

        value_offset = pos + 8
        if value_offset + value_size > len(raw):
            break

        value: Any = None
        try:
            if type_code == _PARAM_TYPE_INT:
                if value_size >= 4:
                    value = struct.unpack_from("<i", raw, value_offset)[0]
            elif type_code == _PARAM_TYPE_FLOAT:
                if value_size >= 8:
                    value = struct.unpack_from("<d", raw, value_offset)[0]
                elif value_size >= 4:
                    value = struct.unpack_from("<f", raw, value_offset)[0]
            elif type_code == _PARAM_TYPE_STRING:
                value = (
                    raw[value_offset : value_offset + value_size]
                    .decode("latin-1", errors="replace")
                    .rstrip("\x00")
                    .strip()
                )
            elif type_code == _PARAM_TYPE_ENUM:
                if value_size >= 4:
                    value = struct.unpack_from("<i", raw, value_offset)[0]
        except struct.error:
            pass

        if value is not None and tag:
            params[tag] = value
            logger.debug("  Parameter %s = %r (type=%d)", tag, value, type_code)

        # Advance past this parameter entry
        # Total entry size: 8 (header) + value_size, rounded up to 4-byte boundary
        entry_size = 8 + value_size
        # OPUS aligns entries to 4-byte boundaries
        remainder = entry_size % 4
        if remainder != 0:
            entry_size += 4 - remainder
        pos += entry_size

    return params


def _find_blocks_by_type(
    entries: list[tuple[int, int, int]],
    type_mask: int,
) -> list[tuple[int, int, int]]:
    """Filter directory entries matching a given type in the lower byte(s).

    Args:
        entries: Parsed directory entries.
        type_mask: Block type to match against the lower byte of each entry.

    Returns:
        Matching entries.
    """
    return [
        (btype, blen, boff)
        for btype, blen, boff in entries
        if (btype & 0xFF) == type_mask or (btype & 0xFFFF) == type_mask
    ]


def _read_float32_block(
    raw: bytes,
    offset: int,
    n_points: int,
) -> np.ndarray:
    """Read *n_points* IEEE 754 float32 values from *raw* at *offset*.

    Args:
        raw: Complete file contents.
        offset: Byte offset where the float32 array begins.
        n_points: Number of float32 values to read.

    Returns:
        1-D numpy array of shape ``(n_points,)`` with dtype float64.

    Raises:
        FileFormatError: If insufficient bytes are available.
    """
    needed = n_points * 4
    if offset + needed > len(raw):
        raise FileFormatError(
            f"Data block at offset {offset} requires {needed} bytes for "
            f"{n_points} float32 values, but only "
            f"{len(raw) - offset} bytes remain."
        )
    arr = np.frombuffer(raw, dtype="<f4", count=n_points, offset=offset)
    return arr.astype(np.float64)


def read_opus(path: str | Path) -> Spectrum:
    """Read a Bruker OPUS binary file and return a Spectrum.

    Parses the OPUS binary format natively without external dependencies.
    Extracts the absorbance/transmittance spectrum, wavenumber axis
    (computed from FXV/LXV parameters), and metadata.

    Args:
        path: Path to the OPUS file (.0, .1, .2, etc.).

    Returns:
        Spectrum with intensities shape ``(W,)`` and wavenumbers ``(W,)``.

    Raises:
        FileNotFoundError: If *path* does not exist.
        FileFormatError: If the file cannot be parsed as valid OPUS.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"OPUS file not found: {path}")

    try:
        raw = path.read_bytes()
    except OSError as exc:
        raise FileFormatError(f"Cannot read OPUS file: {exc}") from exc

    validate_file_size(len(raw), path_name=str(path))

    if len(raw) < _MIN_FILE_SIZE:
        raise FileFormatError(f"File too small to be OPUS format ({len(raw)} bytes).")

    # ── Parse block directory ───────────────────────────────────────
    try:
        entries = _parse_directory(raw)
    except FileFormatError:
        raise
    except Exception as exc:
        raise FileFormatError(f"Failed to parse OPUS directory: {exc}") from exc

    # ── Locate data and parameter blocks ────────────────────────────
    # Strategy: look for AB (absorbance) data first, then fall back to
    # single-channel sample, then single-channel reference.
    data_type_priority = [
        _DATA_TYPE_AB,
        _DATA_TYPE_SC_SAMPLE,
        _DATA_TYPE_SC_REF,
    ]
    param_type_priority = [
        _PARAM_DATA_STATUS,
        _PARAM_SC_STATUS,
        _PARAM_RF_STATUS,
    ]

    data_block: tuple[int, int, int] | None = None
    param_block: tuple[int, int, int] | None = None

    for data_type, param_type in zip(data_type_priority, param_type_priority, strict=True):
        data_candidates = _find_blocks_by_type(entries, data_type)
        param_candidates = _find_blocks_by_type(entries, param_type)
        if data_candidates and param_candidates:
            data_block = data_candidates[0]
            param_block = param_candidates[0]
            logger.debug(
                "Using data block type=0x%02X, param block type=0x%02X",
                data_type,
                param_type,
            )
            break

    # If we found data but no paired parameter block, try any parameter block
    if data_block is None:
        for data_type in data_type_priority:
            data_candidates = _find_blocks_by_type(entries, data_type)
            if data_candidates:
                data_block = data_candidates[0]
                break

    if data_block is None:
        raise FileFormatError(
            "No spectral data block found in OPUS file. "
            "Searched for AB, single-channel sample, and reference blocks."
        )

    # Try all parameter block types if we don't have one yet
    if param_block is None:
        for param_type in param_type_priority:
            param_candidates = _find_blocks_by_type(entries, param_type)
            if param_candidates:
                param_block = param_candidates[0]
                break

    if param_block is None:
        raise FileFormatError(
            "No data parameter block found in OPUS file. Cannot determine NPT, FXV, LXV."
        )

    # ── Extract spectral parameters (NPT, FXV, LXV) ────────────────
    _, param_len, param_off = param_block
    try:
        params = _parse_parameter_block(raw, param_off, param_len)
    except Exception as exc:
        raise FileFormatError(f"Failed to parse OPUS parameter block: {exc}") from exc

    n_points = params.get("NPT")
    first_x = params.get("FXV")
    last_x = params.get("LXV")

    if n_points is None:
        raise FileFormatError("NPT (number of points) not found in OPUS parameter block.")
    n_points = int(n_points)

    if n_points <= 0:
        raise FileFormatError(f"Invalid NPT value in OPUS file: {n_points}")

    # ── Read spectral data ──────────────────────────────────────────
    _, _data_len, data_off = data_block
    try:
        intensities = _read_float32_block(raw, data_off, n_points)
    except FileFormatError:
        raise
    except Exception as exc:
        raise FileFormatError(f"Failed to read OPUS data block: {exc}") from exc

    # ── Build wavenumber axis ───────────────────────────────────────
    wavenumbers: np.ndarray | None = None
    if first_x is not None and last_x is not None:
        wavenumbers = np.linspace(float(first_x), float(last_x), n_points, dtype=np.float64)

    # ── Collect metadata from instrument/sample parameter blocks ────
    metadata: dict[str, Any] = {}
    metadata_block_types = [_PARAM_INSTRUMENT, _PARAM_SAMPLE]
    for mtype in metadata_block_types:
        for _, mlen, moff in _find_blocks_by_type(entries, mtype):
            try:
                block_params = _parse_parameter_block(raw, moff, mlen)
                metadata.update(block_params)
            except (struct.error, ValueError, IndexError) as exc:
                logger.debug("Could not parse metadata block at offset %d: %s", moff, exc)

    # Also include the data parameters in metadata
    metadata.update(params)

    logger.debug("Read OPUS: %d points from %s", n_points, path.name)

    return Spectrum(
        intensities=intensities,
        wavenumbers=wavenumbers,
        metadata=metadata,
        source_format="opus",
        label=path.stem,
    )
