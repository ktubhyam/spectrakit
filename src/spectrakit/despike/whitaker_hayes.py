"""Whitaker-Hayes cosmic ray removal for spectral data.

Reference:
    Whitaker, D.A.; Hayes, K. (2018). A simple algorithm for despiking
    Raman spectra.  *Chemometrics and Intelligent Laboratory Systems*,
    179, 82–84.
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

DEFAULT_THRESHOLD = 3.5

# Scaling constant so that MAD is a consistent estimator for σ under normality.
_MAD_SCALE = 0.6745

# Minimum spectrum length for 2nd derivative (need at least 2 points in diff output).
_MIN_LENGTH = 4


def despike_whitaker_hayes(
    intensities: np.ndarray,
    *,
    threshold: float = DEFAULT_THRESHOLD,
    window_size: int | None = None,
) -> np.ndarray:
    """Remove cosmic ray spikes using the Whitaker-Hayes method.

    Computes the modified Z-score of the second finite difference to
    detect outlier points (cosmic rays, electronic spikes).  Detected
    spikes are replaced by linear interpolation from neighboring
    non-spike points.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        threshold: Modified Z-score threshold for spike detection.
            Values of 3.0–5.0 are typical; lower catches more spikes.
        window_size: Optional rolling window for local MAD estimation.
            If ``None`` (default), uses global MAD over the full spectrum.
            If provided, must be odd and >= 3.

    Returns:
        Despiked intensities, same shape as input.

    Raises:
        SpectrumShapeError: If *intensities* is not 1-D or 2-D.
        EmptySpectrumError: If *intensities* has zero elements.
        ValueError: If *threshold* <= 0.
        ValueError: If spectrum has fewer than 4 points.
        ValueError: If *window_size* is provided but < 3 or even.

    Examples:
        >>> import numpy as np
        >>> from spectrakit import despike_whitaker_hayes
        >>> raw = np.sin(np.linspace(0, 4 * np.pi, 200))
        >>> raw[100] += 10.0  # cosmic ray spike
        >>> clean = despike_whitaker_hayes(raw, threshold=3.0)
        >>> abs(clean[100] - np.sin(np.linspace(0, 4 * np.pi, 200))[100]) < 0.5
        True
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if threshold <= 0:
        raise ValueError(f"threshold must be positive, got {threshold}")

    width = intensities.shape[-1]
    if width < _MIN_LENGTH:
        raise ValueError(f"Whitaker-Hayes requires at least {_MIN_LENGTH} points, got {width}")

    if window_size is not None:
        if window_size < 3:
            raise ValueError(f"window_size must be >= 3, got {window_size}")
        if window_size % 2 == 0:
            raise ValueError(f"window_size must be odd, got {window_size}")

    return apply_along_spectra(
        _despike_whitaker_hayes_1d,
        intensities,
        threshold=threshold,
        window_size=window_size,
    )


def _despike_whitaker_hayes_1d(
    intensities: np.ndarray,
    *,
    threshold: float,
    window_size: int | None,
) -> np.ndarray:
    """Whitaker-Hayes despiking for a single spectrum."""
    n = len(intensities)

    # Step 1: Second finite difference
    d2 = np.diff(intensities, n=2)

    # Step 2: Modified Z-score of d2
    if window_size is not None:
        # Windowed MAD via scipy.ndimage
        from scipy.ndimage import median_filter

        median_d2 = median_filter(d2, size=window_size, mode="nearest")
        abs_dev = np.abs(d2 - median_d2)
        mad_d2 = median_filter(abs_dev, size=window_size, mode="nearest")
    else:
        # Global MAD
        median_d2 = np.median(d2)
        mad_d2 = np.median(np.abs(d2 - median_d2))

    modified_z = _MAD_SCALE * (d2 - median_d2) / (mad_d2 + EPSILON)

    # Step 3: Identify spike indices (d2 has length n-2, maps to indices 1..n-2)
    spike_mask_d2 = np.abs(modified_z) > threshold
    spike_indices = np.where(spike_mask_d2)[0] + 1  # offset back to original

    if len(spike_indices) == 0:
        return intensities.copy()

    # Step 4: Linear interpolation from non-spike neighbors
    result = intensities.copy()
    all_indices = np.arange(n)
    good_mask = np.ones(n, dtype=bool)
    good_mask[spike_indices] = False

    if np.any(good_mask):
        result[spike_indices] = np.interp(
            all_indices[spike_indices],
            all_indices[good_mask],
            intensities[good_mask],
        )
    else:
        logger.warning("All points flagged as spikes; returning original spectrum")

    return result
