"""Spectral Angle Mapper (SAM) similarity."""

from __future__ import annotations

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite


def similarity_spectral_angle(query: np.ndarray, reference: np.ndarray) -> float | np.ndarray:
    """Compute Spectral Angle Mapper (SAM) between spectra.

    Returns the angle in radians between spectral vectors. Smaller
    angle means more similar. Range: [0, pi].

    Args:
        query: Query spectrum, shape ``(W,)``.
        reference: Reference spectrum shape ``(W,)``, or library shape ``(N, W)``.

    Returns:
        Angle in radians in [0, pi]. Scalar or array of shape ``(N,)``.

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
        cos_angle = np.dot(query, reference) / (
            np.linalg.norm(query) * np.linalg.norm(reference) + EPSILON
        )
        cos_angle = np.clip(cos_angle, -1.0, 1.0)
        return float(np.arccos(cos_angle))

    dots = reference @ query
    norm_query = np.linalg.norm(query)
    norms_ref = np.linalg.norm(reference, axis=1)
    cos_angles = dots / (norm_query * norms_ref + EPSILON)
    cos_angles = np.clip(cos_angles, -1.0, 1.0)

    return np.arccos(cos_angles)  # type: ignore[no-any-return]
