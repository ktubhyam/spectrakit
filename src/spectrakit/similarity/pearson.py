"""Pearson correlation coefficient for spectral matching."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite


def similarity_pearson(query: np.ndarray, reference: np.ndarray) -> float | np.ndarray:
    """Compute Pearson correlation between spectra.

    Args:
        query: Query spectrum, shape ``(W,)`` or ``(M, W)``.
        reference: Reference spectrum shape ``(W,)``, or library shape ``(N, W)``.

    Returns:
        Pearson *r* in [-1, 1]. Returns ``0.0`` for constant spectra.

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
        qc = query - np.mean(query)
        rc = reference - np.mean(reference)
        denom = np.linalg.norm(qc) * np.linalg.norm(rc)
        if denom < EPSILON:
            return 0.0
        return float(np.dot(qc, rc) / denom)

    # 1D query vs 2D reference → (N,)
    if query.ndim == 1 and reference.ndim == 2:
        qc = query - np.mean(query)
        rc = reference - np.mean(reference, axis=1, keepdims=True)
        numerator = rc @ qc
        denom_q = np.linalg.norm(qc)
        denom_r = np.linalg.norm(rc, axis=1)
        denoms = np.where(denom_q * denom_r < EPSILON, 1.0, denom_q * denom_r)
        return numerator / denoms  # type: ignore[no-any-return]

    # 2D query vs 1D reference → (M,)
    if query.ndim == 2 and reference.ndim == 1:
        qc = query - np.mean(query, axis=1, keepdims=True)
        rc = reference - np.mean(reference)
        numerator = qc @ rc
        denom_q = np.linalg.norm(qc, axis=1)
        denom_r = np.linalg.norm(rc)
        denoms = np.where(denom_q * denom_r < EPSILON, 1.0, denom_q * denom_r)
        return numerator / denoms  # type: ignore[no-any-return]

    # 2D query vs 2D reference → (M, N)
    qc = query - np.mean(query, axis=1, keepdims=True)
    rc = reference - np.mean(reference, axis=1, keepdims=True)
    numerator = qc @ rc.T
    norms_q = np.linalg.norm(qc, axis=1, keepdims=True)
    norms_r = np.linalg.norm(rc, axis=1, keepdims=True)
    denoms = np.where(norms_q @ norms_r.T < EPSILON, 1.0, norms_q @ norms_r.T)
    return numerator / denoms  # type: ignore[no-any-return]
