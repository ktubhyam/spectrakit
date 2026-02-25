"""Vector (L2) normalization."""

from __future__ import annotations

import logging
import warnings

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)


def normalize_vector(intensities: np.ndarray) -> np.ndarray:
    """Normalize each spectrum to unit L2 norm.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).

    Returns:
        L2-normalized intensities, same shape.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if intensities.ndim == 1:
        norm = np.linalg.norm(intensities)
        if norm < EPSILON:
            warnings.warn(
                "Vector normalization: near-zero L2 norm, returning spectrum unchanged.",
                stacklevel=2,
            )
            return intensities
        return intensities / norm  # type: ignore[no-any-return]

    norms = np.linalg.norm(intensities, axis=1, keepdims=True)
    degenerate = norms < EPSILON
    norms = np.where(degenerate, 1.0, norms)
    n_zero = int(np.sum(degenerate))
    if n_zero > 0:
        warnings.warn(
            f"Vector normalization: {n_zero} spectrum/spectra have near-zero norm "
            "and will be returned unchanged.",
            stacklevel=2,
        )

    return intensities / norms  # type: ignore[no-any-return]
