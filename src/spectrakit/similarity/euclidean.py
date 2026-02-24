"""Euclidean distance for spectral matching."""
from __future__ import annotations

import numpy as np


def similarity_euclidean(a: np.ndarray, b: np.ndarray) -> float | np.ndarray:
    """Compute Euclidean distance between spectra.

    Lower values indicate greater similarity.

    Args:
        a: Query spectrum, shape (W,).
        b: Reference spectrum shape (W,), or library shape (N, W).

    Returns:
        Euclidean distance. Scalar or array of shape (N,).
    """
    if b.ndim == 1:
        return float(np.linalg.norm(a - b))

    return np.linalg.norm(b - a, axis=1)
