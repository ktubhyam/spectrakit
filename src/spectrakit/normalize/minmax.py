"""Min-max normalization to [0, 1]."""

from __future__ import annotations

import logging
import warnings

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)


def normalize_minmax(intensities: np.ndarray) -> np.ndarray:
    """Scale intensities to the [0, 1] range per spectrum.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).

    Returns:
        Min-max normalized intensities, same shape.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if intensities.ndim == 1:
        mn = intensities.min()
        mx = intensities.max()
        rng = mx - mn
        if rng < EPSILON:
            warnings.warn(
                "Min-max: constant spectrum (range < epsilon), returning zeros.",
                stacklevel=2,
            )
            return np.zeros_like(intensities)
        return (intensities - mn) / rng  # type: ignore[no-any-return]

    mins = intensities.min(axis=1, keepdims=True)
    maxs = intensities.max(axis=1, keepdims=True)
    rngs = maxs - mins
    degenerate = rngs < EPSILON
    rngs = np.where(degenerate, 1.0, rngs)
    n_constant = int(np.sum(degenerate))
    if n_constant > 0:
        warnings.warn(
            f"Min-max: {n_constant} spectrum/spectra have near-zero range and "
            "will be returned as zeros.",
            stacklevel=2,
        )

    return (intensities - mins) / rngs  # type: ignore[no-any-return]
