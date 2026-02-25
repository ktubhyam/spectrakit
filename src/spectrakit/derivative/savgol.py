"""Savitzky-Golay spectral derivatives.

Reference:
    Savitzky, A.; Golay, M.J.E. (1964). Smoothing and Differentiation
    of Data by Simplified Least Squares Procedures. Analytical Chemistry,
    36(8), 1627-1639.
"""

from __future__ import annotations

import logging

import numpy as np
from scipy.signal import savgol_filter

from spectrakit._validate import (
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    warn_if_not_finite,
)

logger = logging.getLogger(__name__)

DEFAULT_WINDOW_LENGTH = 11
DEFAULT_POLYORDER = 3
DEFAULT_DERIV = 1


def derivative_savgol(
    intensities: np.ndarray,
    window_length: int = DEFAULT_WINDOW_LENGTH,
    polyorder: int = DEFAULT_POLYORDER,
    deriv: int = DEFAULT_DERIV,
    delta: float = 1.0,
) -> np.ndarray:
    """Compute spectral derivative using Savitzky-Golay filter.

    Simultaneously smooths and differentiates spectral data. First and
    second derivatives are the most commonly used in chemometrics.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        window_length: Length of the filter window (must be odd and
            greater than ``polyorder``).
        polyorder: Order of the polynomial used to fit the samples.
        deriv: Order of the derivative to compute. Common values:
            1 (first derivative) or 2 (second derivative).
        delta: Spacing of the samples to which the filter is applied.
            Used to scale the derivative by ``1 / delta**deriv``.

    Returns:
        Derivative spectrum, same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
        ValueError: If parameters are invalid (window_length not odd,
            polyorder >= window_length, deriv < 0, delta <= 0).
    """
    if window_length < 1 or window_length % 2 == 0:
        raise ValueError(f"window_length must be a positive odd integer, got {window_length}")
    if polyorder < 0:
        raise ValueError(f"polyorder must be non-negative, got {polyorder}")
    if polyorder >= window_length:
        raise ValueError(
            f"polyorder ({polyorder}) must be less than window_length ({window_length})"
        )
    if deriv < 0:
        raise ValueError(f"deriv must be non-negative, got {deriv}")
    if delta <= 0:
        raise ValueError(f"delta must be positive, got {delta}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    return apply_along_spectra(
        _derivative_savgol_1d,
        intensities,
        window_length=window_length,
        polyorder=polyorder,
        deriv=deriv,
        delta=delta,
    )


def _derivative_savgol_1d(
    intensities: np.ndarray,
    window_length: int = DEFAULT_WINDOW_LENGTH,
    polyorder: int = DEFAULT_POLYORDER,
    deriv: int = DEFAULT_DERIV,
    delta: float = 1.0,
) -> np.ndarray:
    """Savitzky-Golay derivative for a single 1-D spectrum."""
    return savgol_filter(  # type: ignore[no-any-return]
        intensities,
        window_length=window_length,
        polyorder=polyorder,
        deriv=deriv,
        delta=delta,
    )
