"""Standard Normal Variate (SNV) normalization."""
from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)


def normalize_snv(intensities: np.ndarray) -> np.ndarray:
    """Apply Standard Normal Variate normalization.

    Centers each spectrum to zero mean and unit variance. Removes
    multiplicative scatter effects common in diffuse reflectance data.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).

    Returns:
        SNV-normalized intensities, same shape as input.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    if intensities.ndim == 1:
        mean = np.mean(intensities)
        std = np.std(intensities)
        if std < EPSILON:
            logger.warning("SNV: near-zero std (%.2e), returning zero-centered", std)
            return intensities - mean
        return (intensities - mean) / std

    means = np.mean(intensities, axis=1, keepdims=True)
    stds = np.std(intensities, axis=1, keepdims=True)
    stds = np.where(stds < EPSILON, 1.0, stds)

    return (intensities - means) / stds
