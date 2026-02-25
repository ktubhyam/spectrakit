"""Standard Normal Variate (SNV) normalization."""

from __future__ import annotations

import logging
import warnings

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)


def normalize_snv(intensities: np.ndarray) -> np.ndarray:
    """Apply Standard Normal Variate normalization.

    Centers each spectrum to zero mean and unit variance. Removes
    multiplicative scatter effects common in diffuse reflectance data.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).

    Returns:
        SNV-normalized intensities, same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if intensities.ndim == 1:
        mean = np.mean(intensities)
        std = np.std(intensities)
        if std < EPSILON:
            logger.warning("SNV: near-zero std (%.2e), returning zero-centered", std)
            return intensities - mean  # type: ignore[no-any-return]
        return (intensities - mean) / std  # type: ignore[no-any-return]

    means = np.mean(intensities, axis=1, keepdims=True)
    stds = np.std(intensities, axis=1, keepdims=True)
    degenerate = stds < EPSILON
    stds = np.where(degenerate, 1.0, stds)
    n_constant = int(np.sum(degenerate))
    if n_constant > 0:
        warnings.warn(
            f"SNV: {n_constant} spectrum/spectra have near-zero std and "
            "will be zero-centered only (not variance-scaled).",
            stacklevel=2,
        )

    return (intensities - means) / stds  # type: ignore[no-any-return]
