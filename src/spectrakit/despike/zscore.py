"""Rolling Z-score despiking for spectral data."""

from __future__ import annotations

import logging

import numpy as np
from scipy.ndimage import median_filter

from spectrakit._validate import (
    EPSILON,
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    warn_if_not_finite,
)

logger = logging.getLogger(__name__)

DEFAULT_THRESHOLD = 3.5
DEFAULT_WINDOW_SIZE = 9

# Scaling constant so that MAD is a consistent estimator for σ under normality.
_MAD_SCALE = 0.6745


def despike_zscore(
    intensities: np.ndarray,
    *,
    threshold: float = DEFAULT_THRESHOLD,
    window_size: int = DEFAULT_WINDOW_SIZE,
) -> np.ndarray:
    """Remove spikes using rolling modified Z-score detection.

    For each spectral point, a modified Z-score is computed relative to
    the local median within a rolling window.  Points exceeding the
    threshold are replaced with the local median.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        threshold: Modified Z-score threshold for spike detection.
            Values of 3.0–5.0 are typical; lower catches more spikes.
        window_size: Size of the rolling window for local statistics.
            Must be odd and >= 3.

    Returns:
        Despiked intensities, same shape as input.

    Raises:
        SpectrumShapeError: If *intensities* is not 1-D or 2-D.
        EmptySpectrumError: If *intensities* has zero elements.
        ValueError: If *threshold* <= 0, *window_size* < 3, or
            *window_size* is even.

    Examples:
        >>> import numpy as np
        >>> from spectrakit import despike_zscore
        >>> raw = np.ones(100); raw[50] = 100.0  # single spike
        >>> clean = despike_zscore(raw, threshold=3.0)
        >>> abs(clean[50] - 1.0) < 0.1
        True
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if threshold <= 0:
        raise ValueError(f"threshold must be positive, got {threshold}")
    if window_size < 3:
        raise ValueError(f"window_size must be >= 3, got {window_size}")
    if window_size % 2 == 0:
        raise ValueError(f"window_size must be odd, got {window_size}")

    return apply_along_spectra(
        _despike_zscore_1d,
        intensities,
        threshold=threshold,
        window_size=window_size,
    )


def _despike_zscore_1d(
    intensities: np.ndarray,
    *,
    threshold: float,
    window_size: int,
) -> np.ndarray:
    """Rolling Z-score despiking for a single spectrum."""
    medians = median_filter(intensities, size=window_size, mode="nearest")
    abs_dev = np.abs(intensities - medians)
    mads = median_filter(abs_dev, size=window_size, mode="nearest")

    z_scores = _MAD_SCALE * (intensities - medians) / (mads + EPSILON)
    spike_mask = np.abs(z_scores) > threshold

    result = intensities.copy()
    result[spike_mask] = medians[spike_mask]
    return result
