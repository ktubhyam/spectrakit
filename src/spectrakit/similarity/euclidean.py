"""Euclidean distance for spectral matching."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d, warn_if_not_finite


def similarity_euclidean(query: np.ndarray, reference: np.ndarray) -> float | np.ndarray:
    """Compute Euclidean distance between spectra.

    Lower values indicate greater similarity.

    Args:
        query: Query spectrum, shape ``(W,)`` or ``(M, W)``.
        reference: Reference spectrum shape ``(W,)``, or library shape ``(N, W)``.

    Returns:
        Euclidean distance in [0, inf).

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

    # 1D query vs 1D reference → scalar
    if query.ndim == 1 and reference.ndim == 1:
        return float(np.linalg.norm(query - reference))

    # 1D query vs 2D reference → (N,)
    if query.ndim == 1 and reference.ndim == 2:
        return np.linalg.norm(reference - query, axis=1)  # type: ignore[no-any-return]

    # 2D query vs 1D reference → (M,)
    if query.ndim == 2 and reference.ndim == 1:
        return np.linalg.norm(query - reference, axis=1)  # type: ignore[no-any-return]

    # 2D query vs 2D reference → (M, N)
    # Use broadcasting: (M, 1, W) - (1, N, W) → (M, N, W), then norm along W
    diff = query[:, np.newaxis, :] - reference[np.newaxis, :, :]
    return np.linalg.norm(diff, axis=2)  # type: ignore[no-any-return]
