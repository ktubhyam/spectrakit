"""Cosine similarity for spectral matching."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite


def similarity_cosine(query: np.ndarray, reference: np.ndarray) -> float | np.ndarray:
    """Compute cosine similarity between spectra.

    For single spectra (1-D), returns a scalar. For a query (1-D) against
    a library (2-D), returns an array of similarities.

    Args:
        query: Query spectrum, shape ``(W,)``.
        reference: Reference spectrum shape ``(W,)``, or library shape ``(N, W)``.

    Returns:
        Cosine similarity in [-1, 1]. Scalar if *reference* is 1-D,
        array of shape ``(N,)`` if *reference* is 2-D.

    Raises:
        SpectrumShapeError: If *reference* is not 1-D or 2-D.
        EmptySpectrumError: If *reference* has zero elements.
    """
    query = ensure_float64(query)
    reference = ensure_float64(reference)
    validate_1d_or_2d(reference, name="reference")
    warn_if_not_finite(query, name="query")
    warn_if_not_finite(reference, name="reference")

    if reference.ndim == 1:
        dot = np.dot(query, reference)
        denom = np.linalg.norm(query) * np.linalg.norm(reference)
        if denom < EPSILON:
            return 0.0
        return float(dot / denom)

    dots = reference @ query
    norms_ref = np.linalg.norm(reference, axis=1)
    norm_query = np.linalg.norm(query)
    denoms = norms_ref * norm_query
    denoms = np.where(denoms < EPSILON, 1.0, denoms)

    return dots / denoms  # type: ignore[no-any-return]
