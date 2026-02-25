"""Euclidean distance for spectral matching."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d, warn_if_not_finite


def similarity_euclidean(query: np.ndarray, reference: np.ndarray) -> float | np.ndarray:
    """Compute Euclidean distance between spectra.

    Lower values indicate greater similarity.

    Args:
        query: Query spectrum, shape ``(W,)``.
        reference: Reference spectrum shape ``(W,)``, or library shape ``(N, W)``.

    Returns:
        Euclidean distance in [0, inf). Scalar or array of shape ``(N,)``.

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
        return float(np.linalg.norm(query - reference))

    return np.linalg.norm(reference - query, axis=1)  # type: ignore[no-any-return]
