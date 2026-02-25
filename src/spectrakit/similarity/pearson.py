"""Pearson correlation coefficient for spectral matching."""

from __future__ import annotations

import warnings

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite


def similarity_pearson(query: np.ndarray, reference: np.ndarray) -> float | np.ndarray:
    """Compute Pearson correlation between spectra.

    Args:
        query: Query spectrum, shape ``(W,)``.
        reference: Reference spectrum shape ``(W,)``, or library shape ``(N, W)``.

    Returns:
        Pearson *r* in [-1, 1]. Scalar or array of shape ``(N,)``.

    Raises:
        SpectrumShapeError: If *reference* is not 1-D or 2-D.
        EmptySpectrumError: If *reference* has zero elements.
    """
    query = ensure_float64(query)
    reference = ensure_float64(reference)
    validate_1d_or_2d(reference, name="reference")

    if reference.ndim == 1:
        warn_if_not_finite(query, name="query")
        warn_if_not_finite(reference, name="reference")
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", RuntimeWarning)
            r = np.corrcoef(query, reference)[0, 1]
        if np.isnan(r):
            return 0.0
        return float(r)

    query_centered = query - np.mean(query)
    reference_centered = reference - np.mean(reference, axis=1, keepdims=True)

    numerator = reference_centered @ query_centered
    denom_query = np.linalg.norm(query_centered)
    denom_reference = np.linalg.norm(reference_centered, axis=1)

    denom = denom_query * denom_reference
    denom = np.where(denom < EPSILON, 1.0, denom)

    return numerator / denom  # type: ignore[no-any-return]
