"""Custom exception hierarchy for SpectraKit.

All exceptions inherit from both SpectraKitError and a built-in
exception type, so existing except clauses (e.g., ``except ValueError``)
continue to work without modification.
"""

from __future__ import annotations


class SpectraKitError(Exception):
    """Base exception for all SpectraKit errors."""


class SpectrumShapeError(SpectraKitError, ValueError):
    """Raised when array shapes are incompatible.

    Examples:
        >>> raise SpectrumShapeError(
        ...     "Expected 1D or 2D array, got shape (3, 4, 5)"
        ... )
    """


class FileFormatError(SpectraKitError, ValueError):
    """Raised when a spectral file cannot be parsed.

    Examples:
        >>> raise FileFormatError("No XYDATA block found in sample.jdx")
    """


class DependencyError(SpectraKitError, ImportError):
    """Raised when an optional dependency is missing.

    Examples:
        >>> raise DependencyError(
        ...     "h5py is required for HDF5 files. "
        ...     "Install with: pip install spectrakit[io]"
        ... )
    """


class EmptySpectrumError(SpectraKitError, ValueError):
    """Raised when input spectrum is empty or has insufficient points.

    Examples:
        >>> raise EmptySpectrumError("intensities array is empty")
    """
