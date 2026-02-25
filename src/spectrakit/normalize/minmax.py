"""Min-max normalization to [0, 1]."""
from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)


def normalize_minmax(intensities: np.ndarray) -> np.ndarray:
    """Scale intensities to the [0, 1] range per spectrum.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).

    Returns:
        Min-max normalized intensities, same shape.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    if intensities.ndim == 1:
        mn = intensities.min()
        mx = intensities.max()
        rng = mx - mn
        if rng < EPSILON:
            return np.zeros_like(intensities)
        return (intensities - mn) / rng

    mins = intensities.min(axis=1, keepdims=True)
    maxs = intensities.max(axis=1, keepdims=True)
    rngs = maxs - mins
    rngs = np.where(rngs < EPSILON, 1.0, rngs)

    return (intensities - mins) / rngs
