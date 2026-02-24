"""Spectral Angle Mapper (SAM) similarity."""
from __future__ import annotations

import numpy as np

EPSILON = 1e-10


def similarity_spectral_angle(a: np.ndarray, b: np.ndarray) -> float | np.ndarray:
    """Compute Spectral Angle Mapper (SAM) between spectra.

    Returns the angle in radians between spectral vectors. Smaller
    angle means more similar. Range: [0, pi].

    Args:
        a: Query spectrum, shape (W,).
        b: Reference spectrum shape (W,), or library shape (N, W).

    Returns:
        Angle in radians. Scalar or array of shape (N,).
    """
    if b.ndim == 1:
        cos_angle = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + EPSILON)
        cos_angle = np.clip(cos_angle, -1.0, 1.0)
        return float(np.arccos(cos_angle))

    dots = b @ a
    norm_a = np.linalg.norm(a)
    norms_b = np.linalg.norm(b, axis=1)
    cos_angles = dots / (norm_a * norms_b + EPSILON)
    cos_angles = np.clip(cos_angles, -1.0, 1.0)

    return np.arccos(cos_angles)
