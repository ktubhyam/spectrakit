"""Spectral averaging."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)


def spectral_average(intensities: np.ndarray) -> np.ndarray:
    """Compute the mean spectrum from a batch.

    Args:
        intensities: Spectral batch, shape ``(N, W)``.

    Returns:
        Mean spectrum, shape ``(W,)``.

    Raises:
        SpectrumShapeError: If input is not 2-D.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    if intensities.ndim == 1:
        return intensities.copy()

    return np.mean(intensities, axis=0)  # type: ignore[no-any-return]
