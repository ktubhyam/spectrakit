"""Statistics-sensitive Non-linear Iterative Peak-clipping (SNIP).

Reference:
    Ryan, C.G. et al. (1988). SNIP, a statistics-sensitive background
    treatment for the quantitative analysis of PIXE spectra.
    Nuclear Instruments and Methods B, 34(3), 396-402.
"""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import (
    EPSILON,
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    warn_if_not_finite,
)

logger = logging.getLogger(__name__)

DEFAULT_MAX_HALF_WINDOW = 40


def baseline_snip(
    intensities: np.ndarray,
    max_half_window: int = DEFAULT_MAX_HALF_WINDOW,
    decreasing: bool = True,
) -> np.ndarray:
    """Estimate baseline using the SNIP algorithm.

    Iteratively clips peaks by comparing each point to the average of
    its neighbors at increasing window sizes.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).
        max_half_window: Maximum half-window size. Controls how broad
            the features that get clipped can be.
        decreasing: If True, iterate from max_half_window down to 1.

    Returns:
        Estimated baseline, same shape as intensities.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    if max_half_window < 1:
        raise ValueError(f"max_half_window must be >= 1, got {max_half_window}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    return apply_along_spectra(
        _baseline_snip_1d,
        intensities,
        max_half_window=max_half_window,
        decreasing=decreasing,
    )


def _baseline_snip_1d(
    intensities: np.ndarray,
    max_half_window: int = DEFAULT_MAX_HALF_WINDOW,
    decreasing: bool = True,
) -> np.ndarray:
    """SNIP baseline for a single 1-D spectrum."""
    y = np.log(np.log(np.sqrt(np.maximum(intensities, EPSILON) + 1) + 1) + 1)

    if decreasing:
        window_range = range(max_half_window, 0, -1)
    else:
        window_range = range(1, max_half_window + 1)

    for hw in window_range:
        avg = (y[: -2 * hw] + y[2 * hw :]) / 2.0
        y[hw:-hw] = np.minimum(y[hw:-hw], avg)

    # Inverse of y = log(log(sqrt(x+1)+1)+1):
    #   x = (exp(exp(y)-1)-1)^2 - 1
    baseline = (np.exp(np.exp(y) - 1) - 1) ** 2 - 1.0
    return np.maximum(baseline, 0.0)  # type: ignore[no-any-return]
