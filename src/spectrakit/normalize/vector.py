"""Vector (L2) normalization."""
from __future__ import annotations

import logging

import numpy as np

logger = logging.getLogger(__name__)

EPSILON = 1e-10


def normalize_vector(intensities: np.ndarray) -> np.ndarray:
    """Normalize each spectrum to unit L2 norm.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).

    Returns:
        L2-normalized intensities, same shape.
    """
    if intensities.ndim == 1:
        norm = np.linalg.norm(intensities)
        if norm < EPSILON:
            return intensities
        return intensities / norm

    norms = np.linalg.norm(intensities, axis=1, keepdims=True)
    norms = np.where(norms < EPSILON, 1.0, norms)

    return intensities / norms
