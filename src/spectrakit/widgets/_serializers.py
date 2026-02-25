"""Binary serializers for transferring spectral data to the frontend.

Converts Spectrum objects into compact binary representations suitable for
efficient transfer over the anywidget traitlet bridge. The binary format
uses little-endian IEEE 754 float64 arrays preceded by a minimal header.

Binary format (per spectrum entry)::

    [4 bytes] n_points     (uint32, little-endian)
    [4 bytes] has_wavenum  (uint32, 0 or 1)
    [4 bytes] label_len    (uint32, byte length of UTF-8 label)
    [label_len bytes] label (UTF-8 encoded string)
    [n_points * 8 bytes] intensities (float64 little-endian)
    [n_points * 8 bytes] wavenumbers (float64 little-endian, only if has_wavenum == 1)

Multiple spectra are concatenated sequentially. A 4-byte count header
precedes the entries::

    [4 bytes] n_spectra (uint32, little-endian)
    [... entries ...]
"""

from __future__ import annotations

import logging
import struct
from typing import TYPE_CHECKING

import numpy as np

if TYPE_CHECKING:
    from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)

# Header: n_spectra (uint32)
_HEADER_FMT = "<I"
_HEADER_SIZE = struct.calcsize(_HEADER_FMT)

# Per-entry prefix: n_points, has_wavenumbers, label_byte_length
_ENTRY_PREFIX_FMT = "<III"
_ENTRY_PREFIX_SIZE = struct.calcsize(_ENTRY_PREFIX_FMT)


def spectrum_to_binary(spectrum: Spectrum) -> bytes:
    """Serialize a Spectrum object into compact binary bytes.

    Handles both single spectra with shape ``(W,)`` and collections with
    shape ``(N, W)``. Each row in a 2D spectrum is serialized as a
    separate entry sharing the same wavenumbers and label (suffixed with
    the row index).

    Args:
        spectrum: A Spectrum dataclass instance. Intensities must be
            1D ``(W,)`` or 2D ``(N, W)``.

    Returns:
        Binary payload suitable for assignment to an anywidget
        ``tl.Bytes()`` traitlet.

    Raises:
        ValueError: If intensities have an unsupported number of
            dimensions (not 1 or 2).

    Examples:
        >>> import numpy as np
        >>> from spectrakit.spectrum import Spectrum
        >>> spec = Spectrum(
        ...     intensities=np.array([1.0, 2.0, 3.0]),
        ...     wavenumbers=np.array([400.0, 800.0, 1200.0]),
        ...     label="test",
        ... )
        >>> data = spectrum_to_binary(spec)
        >>> isinstance(data, bytes)
        True
    """
    intensities = np.asarray(spectrum.intensities, dtype=np.float64)
    wavenumbers = (
        np.asarray(spectrum.wavenumbers, dtype=np.float64)
        if spectrum.wavenumbers is not None
        else None
    )

    if intensities.ndim == 1:
        rows = [intensities]
        labels = [spectrum.label or "spectrum"]
    elif intensities.ndim == 2:
        rows = [intensities[i] for i in range(intensities.shape[0])]
        base_label = spectrum.label or "spectrum"
        labels = [f"{base_label}_{i}" for i in range(intensities.shape[0])]
    else:
        raise ValueError(
            f"Expected 1D or 2D intensities, got {intensities.ndim}D "
            f"with shape {intensities.shape}"
        )

    n_spectra = len(rows)
    parts: list[bytes] = [struct.pack(_HEADER_FMT, n_spectra)]

    for row, label in zip(rows, labels, strict=True):
        parts.append(_serialize_entry(row, wavenumbers, label))

    logger.debug(
        "Serialized %d spectra (%d points each) to %d bytes",
        n_spectra,
        rows[0].shape[0],
        sum(len(p) for p in parts),
    )
    return b"".join(parts)


def spectra_to_binary(spectra: list[Spectrum]) -> bytes:
    """Serialize multiple Spectrum objects into a single binary payload.

    Unlike ``spectrum_to_binary`` which handles a single Spectrum
    (possibly with multiple rows), this function takes a list of
    independent Spectrum objects and serializes them all into one
    contiguous binary buffer.

    Args:
        spectra: List of Spectrum dataclass instances. Each must have
            1D ``(W,)`` intensities. Mixed-dimension spectra (some 1D,
            some 2D) are supported; 2D spectra are expanded row-wise.

    Returns:
        Binary payload suitable for assignment to an anywidget
        ``tl.Bytes()`` traitlet.

    Examples:
        >>> import numpy as np
        >>> from spectrakit.spectrum import Spectrum
        >>> specs = [
        ...     Spectrum(intensities=np.array([1.0, 2.0]), label="a"),
        ...     Spectrum(intensities=np.array([3.0, 4.0]), label="b"),
        ... ]
        >>> data = spectra_to_binary(specs)
        >>> isinstance(data, bytes)
        True
    """
    entries: list[tuple[np.ndarray, np.ndarray | None, str]] = []

    for spec in spectra:
        intensities = np.asarray(spec.intensities, dtype=np.float64)
        wavenumbers = (
            np.asarray(spec.wavenumbers, dtype=np.float64)
            if spec.wavenumbers is not None
            else None
        )

        if intensities.ndim == 1:
            entries.append((intensities, wavenumbers, spec.label or "spectrum"))
        elif intensities.ndim == 2:
            base_label = spec.label or "spectrum"
            for i in range(intensities.shape[0]):
                entries.append((
                    intensities[i],
                    wavenumbers,
                    f"{base_label}_{i}",
                ))
        else:
            raise ValueError(
                f"Expected 1D or 2D intensities, got {intensities.ndim}D "
                f"with shape {intensities.shape}"
            )

    n_spectra = len(entries)
    parts: list[bytes] = [struct.pack(_HEADER_FMT, n_spectra)]

    for row, wavenum, label in entries:
        parts.append(_serialize_entry(row, wavenum, label))

    logger.debug(
        "Serialized %d spectra to %d bytes",
        n_spectra,
        sum(len(p) for p in parts),
    )
    return b"".join(parts)


def _serialize_entry(
    intensities: np.ndarray,
    wavenumbers: np.ndarray | None,
    label: str,
) -> bytes:
    """Serialize a single spectrum entry to binary.

    Args:
        intensities: 1D array of intensity values, shape ``(W,)``.
        wavenumbers: Optional 1D array of x-axis values, shape ``(W,)``.
        label: UTF-8 label string for this entry.

    Returns:
        Binary bytes for one spectrum entry.
    """
    n_points = intensities.shape[0]
    has_wavenumbers = 1 if wavenumbers is not None else 0
    label_bytes = label.encode("utf-8")
    label_len = len(label_bytes)

    parts: list[bytes] = [
        struct.pack(_ENTRY_PREFIX_FMT, n_points, has_wavenumbers, label_len),
        label_bytes,
        intensities.tobytes(),
    ]

    if wavenumbers is not None:
        parts.append(wavenumbers.tobytes())

    return b"".join(parts)
