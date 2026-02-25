"""Savitzky-Golay smoothing filter.

Reference:
    Savitzky, A.; Golay, M.J.E. (1964). Smoothing and Differentiation
    of Data by Simplified Least Squares Procedures. Analytical Chemistry,
    36(8), 1627-1639.
"""

from __future__ import annotations

import logging

import numpy as np
from scipy.signal import savgol_filter

from spectrakit._validate import apply_along_spectra, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)

DEFAULT_WINDOW_LENGTH = 11
DEFAULT_POLYORDER = 3


def smooth_savgol(
    intensities: np.ndarray,
    window_length: int = DEFAULT_WINDOW_LENGTH,
    polyorder: int = DEFAULT_POLYORDER,
) -> np.ndarray:
    """Apply Savitzky-Golay smoothing filter.

    Fits successive sub-sets of adjacent data points with a low-degree
    polynomial by the method of linear least squares.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        window_length: Length of the filter window (must be odd and
            greater than ``polyorder``).
        polyorder: Order of the polynomial used to fit the samples.

    Returns:
        Smoothed intensities, same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
        ValueError: If ``window_length`` or ``polyorder`` are invalid.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    return apply_along_spectra(
        _smooth_savgol_1d,
        intensities,
        window_length=window_length,
        polyorder=polyorder,
    )


def _smooth_savgol_1d(
    intensities: np.ndarray,
    window_length: int = DEFAULT_WINDOW_LENGTH,
    polyorder: int = DEFAULT_POLYORDER,
) -> np.ndarray:
    """Savitzky-Golay smoothing for a single 1-D spectrum."""
    return savgol_filter(intensities, window_length=window_length, polyorder=polyorder)
