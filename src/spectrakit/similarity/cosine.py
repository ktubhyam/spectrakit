"""Cosine similarity for spectral matching."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d


def similarity_cosine(a: np.ndarray, b: np.ndarray) -> float | np.ndarray:
    """Compute cosine similarity between spectra.

    For single spectra (1-D), returns a scalar. For a query (1-D) against
    a library (2-D), returns an array of similarities.

    Args:
        a: Query spectrum, shape (W,).
        b: Reference spectrum shape (W,), or library shape (N, W).

    Returns:
        Cosine similarity in [-1, 1]. Scalar if b is 1-D, array of
        shape (N,) if b is 2-D.
    """
    a = ensure_float64(a)
    b = ensure_float64(b)
    validate_1d_or_2d(b, name="b")

    if b.ndim == 1:
        dot = np.dot(a, b)
        denom = np.linalg.norm(a) * np.linalg.norm(b)
        if denom < EPSILON:
            return 0.0
        return float(dot / denom)

    dots = b @ a
    norms_b = np.linalg.norm(b, axis=1)
    norm_a = np.linalg.norm(a)
    denoms = norms_b * norm_a
    denoms = np.where(denoms < EPSILON, 1.0, denoms)

    return dots / denoms
