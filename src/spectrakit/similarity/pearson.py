"""Pearson correlation coefficient for spectral matching."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d


def similarity_pearson(a: np.ndarray, b: np.ndarray) -> float | np.ndarray:
    """Compute Pearson correlation between spectra.

    Args:
        a: Query spectrum, shape (W,).
        b: Reference spectrum shape (W,), or library shape (N, W).

    Returns:
        Pearson r in [-1, 1]. Scalar or array of shape (N,).
    """
    a = ensure_float64(a)
    b = ensure_float64(b)
    validate_1d_or_2d(b, name="b")

    if b.ndim == 1:
        return float(np.corrcoef(a, b)[0, 1])

    a_centered = a - np.mean(a)
    b_centered = b - np.mean(b, axis=1, keepdims=True)

    numerator = b_centered @ a_centered
    denom_a = np.linalg.norm(a_centered)
    denom_b = np.linalg.norm(b_centered, axis=1)

    denom = denom_a * denom_b
    denom = np.where(denom < EPSILON, 1.0, denom)

    return numerator / denom  # type: ignore[no-any-return]
