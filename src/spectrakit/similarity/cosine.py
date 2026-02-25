"""Cosine similarity for spectral matching."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import (
    EPSILON,
    ensure_float64,
    validate_1d_or_2d,
    validate_matching_width,
    warn_if_not_finite,
)


def similarity_cosine(query: np.ndarray, reference: np.ndarray) -> float | np.ndarray:
    """Compute cosine similarity between spectra.

    For single spectra (1-D), returns a scalar. For a query (1-D) against
    a library (2-D), returns an array of similarities. For a batch of
    queries (2-D) against a library (2-D), returns a similarity matrix.

    Args:
        query: Query spectrum, shape ``(W,)`` or ``(M, W)``.
        reference: Reference spectrum shape ``(W,)``, or library shape ``(N, W)``.

    Returns:
        Cosine similarity in [-1, 1].

        - query ``(W,)`` + reference ``(W,)`` → scalar
        - query ``(W,)`` + reference ``(N, W)`` → array ``(N,)``
        - query ``(M, W)`` + reference ``(W,)`` → array ``(M,)``
        - query ``(M, W)`` + reference ``(N, W)`` → matrix ``(M, N)``

    Raises:
        SpectrumShapeError: If *query* or *reference* is not 1-D or 2-D.
        EmptySpectrumError: If inputs have zero elements.
    """
    query = ensure_float64(query)
    reference = ensure_float64(reference)
    validate_1d_or_2d(query, name="query")
    validate_1d_or_2d(reference, name="reference")
    warn_if_not_finite(query, name="query")
    warn_if_not_finite(reference, name="reference")
    validate_matching_width(query, reference)

    # 1D query vs 1D reference → scalar
    if query.ndim == 1 and reference.ndim == 1:
        dot = np.dot(query, reference)
        nq = np.linalg.norm(query)
        nr = np.linalg.norm(reference)
        if nq < EPSILON or nr < EPSILON:
            return 0.0
        return float(dot / (nq * nr))

    # 1D query vs 2D reference → (N,)
    if query.ndim == 1 and reference.ndim == 2:
        dots = reference @ query
        norms_ref = np.linalg.norm(reference, axis=1)
        norm_query = np.linalg.norm(query)
        denoms = norms_ref * norm_query
        denoms = np.where(denoms < EPSILON, 1.0, denoms)
        return dots / denoms  # type: ignore[no-any-return]

    # 2D query vs 1D reference → (M,)
    if query.ndim == 2 and reference.ndim == 1:
        dots = query @ reference
        norms_query = np.linalg.norm(query, axis=1)
        norm_ref = np.linalg.norm(reference)
        denoms = norms_query * norm_ref
        denoms = np.where(denoms < EPSILON, 1.0, denoms)
        return dots / denoms  # type: ignore[no-any-return]

    # 2D query vs 2D reference → (M, N)
    dots = query @ reference.T
    norms_query = np.linalg.norm(query, axis=1, keepdims=True)
    norms_ref = np.linalg.norm(reference, axis=1, keepdims=True)
    denoms = norms_query @ norms_ref.T
    denoms = np.where(denoms < EPSILON, 1.0, denoms)
    return dots / denoms  # type: ignore[no-any-return]
