"""Spectral subtraction."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)


def spectral_subtract(
    a: np.ndarray,
    b: np.ndarray,
    factor: float = 1.0,
) -> np.ndarray:
    """Subtract spectrum *b* from spectrum *a*.

    Computes ``a - factor * b``. Useful for background subtraction,
    solvent subtraction, or difference spectroscopy.

    Args:
        a: Spectrum or batch, shape ``(W,)`` or ``(N, W)``.
        b: Spectrum to subtract, shape ``(W,)``. If *a* is 2-D,
            *b* is subtracted from every row.
        factor: Scaling factor for *b* before subtraction.

    Returns:
        Difference spectrum, same shape as *a*.
    """
    a = ensure_float64(a)
    b = ensure_float64(b)
    validate_1d_or_2d(a, name="a")

    if a.ndim == 1:
        return a - factor * b

    return a - factor * b[np.newaxis, :]
