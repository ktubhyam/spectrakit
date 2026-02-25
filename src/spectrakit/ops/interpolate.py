"""Spectral interpolation to a new wavenumber axis."""

from __future__ import annotations

import logging

import numpy as np
from scipy.interpolate import interp1d

from spectrakit._validate import apply_along_spectra, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)


def spectral_interpolate(
    intensities: np.ndarray,
    wavenumbers: np.ndarray,
    new_wavenumbers: np.ndarray,
    kind: str = "linear",
) -> np.ndarray:
    """Interpolate spectra onto a new wavenumber axis.

    Useful for aligning spectra measured on different instruments or
    resampling to a uniform grid.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        wavenumbers: Original wavenumber axis, shape ``(W,)``.
        new_wavenumbers: Target wavenumber axis, shape ``(M,)``.
        kind: Interpolation method (``"linear"``, ``"cubic"``, etc.).
            Passed to ``scipy.interpolate.interp1d``.

    Returns:
        Interpolated intensities, shape ``(M,)`` or ``(N, M)``.
    """
    intensities = ensure_float64(intensities)
    wavenumbers = ensure_float64(wavenumbers)
    new_wavenumbers = ensure_float64(new_wavenumbers)
    validate_1d_or_2d(intensities)

    return apply_along_spectra(
        _interpolate_1d,
        intensities,
        wavenumbers=wavenumbers,
        new_wavenumbers=new_wavenumbers,
        kind=kind,
    )


def _interpolate_1d(
    intensities: np.ndarray,
    wavenumbers: np.ndarray,
    new_wavenumbers: np.ndarray,
    kind: str = "linear",
) -> np.ndarray:
    """Interpolate a single 1-D spectrum."""
    f = interp1d(
        wavenumbers,
        intensities,
        kind=kind,
        fill_value="extrapolate",
    )
    return f(new_wavenumbers)
