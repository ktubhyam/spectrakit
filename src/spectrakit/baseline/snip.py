"""Statistics-sensitive Non-linear Iterative Peak-clipping (SNIP).

Reference:
    Ryan, C.G. et al. (1988). SNIP, a statistics-sensitive background
    treatment for the quantitative analysis of PIXE spectra.
    Nuclear Instruments and Methods B, 34(3), 396-402.
"""
from __future__ import annotations

import logging

import numpy as np

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
    """
    if intensities.ndim == 2:
        return np.array([
            baseline_snip(row, max_half_window=max_half_window, decreasing=decreasing)
            for row in intensities
        ])

    y = np.log(np.log(np.sqrt(np.maximum(intensities, 1e-10) + 1) + 1) + 1)

    if decreasing:
        window_range = range(max_half_window, 0, -1)
    else:
        window_range = range(1, max_half_window + 1)

    for hw in window_range:
        n = len(y)
        y_new = y.copy()
        for i in range(hw, n - hw):
            avg = (y[i - hw] + y[i + hw]) / 2.0
            y_new[i] = min(y[i], avg)
        y = y_new

    baseline = (np.exp(np.exp(y) - 1) - 1) ** 2 - 1e-10
    return np.maximum(baseline, 0.0)
