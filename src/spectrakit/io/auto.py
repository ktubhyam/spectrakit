"""Auto-detect file format and read spectral data.

Provides ``read_spectrum``, a unified entry point that inspects the file
extension (and optionally magic bytes) to dispatch to the appropriate
format-specific reader.

Supported formats:
    - JCAMP-DX: ``.jdx``, ``.dx``, ``.jcamp``
    - Galactic SPC: ``.spc``
    - CSV/TSV: ``.csv``, ``.tsv``, ``.txt``
    - Bruker OPUS: ``.0`` through ``.99`` (numeric extensions)
    - HDF5: ``.h5``, ``.hdf5``
"""

from __future__ import annotations

import logging
import re
from pathlib import Path
from typing import Any

from spectrakit.exceptions import FileFormatError
from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)

# Extension → (module_path, function_name) for lazy imports
_EXTENSION_MAP: dict[str, tuple[str, str]] = {
    ".jdx": ("spectrakit.io.jcamp", "read_jcamp"),
    ".dx": ("spectrakit.io.jcamp", "read_jcamp"),
    ".jcamp": ("spectrakit.io.jcamp", "read_jcamp"),
    ".spc": ("spectrakit.io.spc", "read_spc"),
    ".csv": ("spectrakit.io.csv", "read_csv"),
    ".tsv": ("spectrakit.io.csv", "read_csv"),
    ".txt": ("spectrakit.io.csv", "read_csv"),
    ".h5": ("spectrakit.io.hdf5", "read_hdf5"),
    ".hdf5": ("spectrakit.io.hdf5", "read_hdf5"),
}

# Bruker OPUS uses numeric extensions (.0, .1, .2, ..., .99)
_OPUS_PATTERN = re.compile(r"^\.\d{1,2}$")

# Magic bytes for format detection (first N bytes → format key)
_MAGIC_BYTES: dict[bytes, str] = {
    b"\x0a\x0a": "opus",  # Bruker OPUS magic (first 2 bytes)
}

# Formats that support extra kwargs
_CSV_EXTENSIONS = {".csv", ".tsv", ".txt"}


def read_spectrum(
    path: str | Path,
    *,
    format: str | None = None,
    **kwargs: Any,
) -> Spectrum:
    """Read a spectral file with automatic format detection.

    Determines the file format from the extension or the *format* hint,
    then delegates to the appropriate reader. This is the recommended
    entry point when the exact format is not known in advance.

    Args:
        path: Path to the spectral file.
        format: Explicit format hint. One of ``"jcamp"``, ``"spc"``,
            ``"csv"``, ``"opus"``, ``"hdf5"``. If ``None`` (default),
            the format is inferred from the file extension.
        **kwargs: Additional keyword arguments passed to the
            underlying reader. For CSV files, common options include
            ``delimiter``, ``x_column``, ``y_column``.

    Returns:
        A Spectrum object loaded from the file.

    Raises:
        FileFormatError: If the format cannot be determined or is
            not supported.
        FileNotFoundError: If the file does not exist.

    Examples:
        >>> from spectrakit import read_spectrum
        >>> spec = read_spectrum("ethanol.jdx")  # doctest: +SKIP
        >>> spec = read_spectrum("data.csv", delimiter=";")  # doctest: +SKIP
        >>> spec = read_spectrum("unknown.dat", format="jcamp")  # doctest: +SKIP
    """
    file_path = Path(path)

    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    if format is not None:
        return _read_with_format(file_path, format, **kwargs)

    return _read_with_detection(file_path, **kwargs)


def detect_format(path: str | Path) -> str:
    """Detect the spectral file format from extension and magic bytes.

    Args:
        path: Path to the spectral file.

    Returns:
        Format string: ``"jcamp"``, ``"spc"``, ``"csv"``, ``"opus"``,
        or ``"hdf5"``.

    Raises:
        FileFormatError: If the format cannot be determined.

    Examples:
        >>> detect_format("sample.jdx")
        'jcamp'
        >>> detect_format("data.csv")
        'csv'
        >>> detect_format("spectrum.0")
        'opus'
    """
    file_path = Path(path)
    suffix = file_path.suffix.lower()

    # Check direct extension mapping
    if suffix in _EXTENSION_MAP:
        module_path, func_name = _EXTENSION_MAP[suffix]
        # Derive format name from function name: read_jcamp → jcamp
        return func_name.replace("read_", "")

    # Check OPUS numeric extension pattern
    if _OPUS_PATTERN.match(suffix):
        return "opus"

    # Try magic bytes if file exists
    if file_path.exists():
        detected = _detect_from_magic(file_path)
        if detected is not None:
            return detected

    raise FileFormatError(
        f"Cannot determine format for '{file_path.name}'. "
        f"Supported extensions: {', '.join(sorted(_EXTENSION_MAP))} "
        f"and numeric (.0-.99 for OPUS). "
        f"Use format= to specify explicitly."
    )


def _read_with_format(
    path: Path,
    format: str,
    **kwargs: Any,
) -> Spectrum:
    """Read a file using an explicit format hint."""
    format_lower = format.lower().strip()

    format_to_reader: dict[str, tuple[str, str]] = {
        "jcamp": ("spectrakit.io.jcamp", "read_jcamp"),
        "jdx": ("spectrakit.io.jcamp", "read_jcamp"),
        "spc": ("spectrakit.io.spc", "read_spc"),
        "csv": ("spectrakit.io.csv", "read_csv"),
        "tsv": ("spectrakit.io.csv", "read_csv"),
        "opus": ("spectrakit.io.opus", "read_opus"),
        "hdf5": ("spectrakit.io.hdf5", "read_hdf5"),
        "h5": ("spectrakit.io.hdf5", "read_hdf5"),
    }

    if format_lower not in format_to_reader:
        supported = ", ".join(sorted(format_to_reader))
        raise FileFormatError(f"Unknown format '{format}'. Supported: {supported}")

    module_path, func_name = format_to_reader[format_lower]
    reader = _import_reader(module_path, func_name)

    logger.info("Reading '%s' as %s (explicit format)", path.name, format_lower)
    return reader(path, **kwargs)


def _read_with_detection(path: Path, **kwargs: Any) -> Spectrum:
    """Read a file by detecting its format."""
    suffix = path.suffix.lower()

    # Direct extension match
    if suffix in _EXTENSION_MAP:
        module_path, func_name = _EXTENSION_MAP[suffix]
        reader = _import_reader(module_path, func_name)

        # For CSV/TSV, infer delimiter from extension
        if suffix in _CSV_EXTENSIONS and "delimiter" not in kwargs:
            if suffix == ".tsv":
                kwargs["delimiter"] = "\t"

        format_name = func_name.replace("read_", "")
        logger.info("Reading '%s' as %s (detected from extension)", path.name, format_name)
        return reader(path, **kwargs)

    # OPUS numeric extension
    if _OPUS_PATTERN.match(suffix):
        from spectrakit.io.opus import read_opus

        logger.info("Reading '%s' as opus (numeric extension)", path.name)
        return read_opus(path, **kwargs)

    # Fall back to magic bytes
    detected = _detect_from_magic(path)
    if detected is not None:
        return _read_with_format(path, detected, **kwargs)

    raise FileFormatError(
        f"Cannot determine format for '{path.name}'. "
        f"Supported extensions: {', '.join(sorted(_EXTENSION_MAP))} "
        f"and numeric (.0-.99 for OPUS). "
        f"Use format= to specify explicitly."
    )


def _detect_from_magic(path: Path) -> str | None:
    """Try to identify format from the first few bytes of the file."""
    try:
        with open(path, "rb") as f:
            header = f.read(16)
    except OSError:
        return None

    if len(header) < 2:
        return None

    # Check OPUS magic bytes (0x0a 0x0a at offset 0)
    if header[:2] == b"\x0a\x0a":
        return "opus"

    # Check JCAMP-DX (starts with ##)
    if header[:2] == b"##":
        return "jcamp"

    # Check HDF5 magic (\x89HDF\r\n\x1a\n)
    if header[:8] == b"\x89HDF\r\n\x1a\n":
        return "hdf5"

    return None


def _import_reader(module_path: str, func_name: str) -> Any:
    """Lazily import a reader function from a module."""
    import importlib

    module = importlib.import_module(module_path)
    return getattr(module, func_name)
