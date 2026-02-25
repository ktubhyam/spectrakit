"""Euclidean distance for spectral matching."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d


def similarity_euclidean(a: np.ndarray, b: np.ndarray) -> float | np.ndarray:
    """Compute Euclidean distance between spectra.

    Lower values indicate greater similarity.

    Args:
        a: Query spectrum, shape (W,).
        b: Reference spectrum shape (W,), or library shape (N, W).

    Returns:
        Euclidean distance. Scalar or array of shape (N,).
    """
    a = ensure_float64(a)
    b = ensure_float64(b)
    validate_1d_or_2d(b, name="b")

    if b.ndim == 1:
        return float(np.linalg.norm(a - b))

    return np.linalg.norm(b - a, axis=1)
