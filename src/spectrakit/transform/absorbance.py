"""Absorbance-transmittance conversions.

Standard spectroscopic conversions between absorbance (A) and
percent transmittance (%T).  The fundamental relationship is:

    A = -log10(T)    or equivalently    T = 10^(-A)

where T is fractional transmittance in [0, 1] and %T = T * 100.
"""

from __future__ import annotations

import logging
import warnings

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)


def transform_absorbance_to_transmittance(absorbance: np.ndarray) -> np.ndarray:
    """Convert absorbance to percent transmittance.

    Applies: %T = 100 * 10^(-A)

    Args:
        absorbance: Absorbance values, shape ``(W,)`` or ``(N, W)``.

    Returns:
        Percent transmittance values in [0, 100], same shape.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    absorbance = ensure_float64(absorbance)
    validate_1d_or_2d(absorbance)
    warn_if_not_finite(absorbance)

    if np.any(absorbance < 0):
        warnings.warn(
            "Negative absorbance values detected. Transmittance will exceed 100%.",
            stacklevel=2,
        )

    return 100.0 * np.power(10.0, -absorbance)  # type: ignore[no-any-return]


def transform_transmittance_to_absorbance(transmittance: np.ndarray) -> np.ndarray:
    """Convert percent transmittance to absorbance.

    Applies: A = -log10(%T / 100)

    Args:
        transmittance: Percent transmittance values in [0, 100],
            shape ``(W,)`` or ``(N, W)``.

    Returns:
        Absorbance values, same shape.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    transmittance = ensure_float64(transmittance)
    validate_1d_or_2d(transmittance)
    warn_if_not_finite(transmittance)

    if np.any(transmittance <= 0):
        warnings.warn(
            "Zero or negative transmittance values detected. Results will contain Inf or NaN.",
            stacklevel=2,
        )

    # Clamp to avoid log(0)
    t_frac = np.maximum(transmittance / 100.0, EPSILON)
    return -np.log10(t_frac)  # type: ignore[no-any-return]
