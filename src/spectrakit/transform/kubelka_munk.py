"""Kubelka-Munk transformation for diffuse reflectance spectra.

Reference:
    Kubelka, P.; Munk, F. (1931). Ein Beitrag zur Optik der
    Farbanstriche. Zeitschrift fur technische Physik, 12, 593-601.
"""

from __future__ import annotations

import logging
import warnings

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)


def transform_kubelka_munk(reflectance: np.ndarray) -> np.ndarray:
    """Convert diffuse reflectance to Kubelka-Munk units.

    Applies the transformation: K/S = (1 - R)^2 / (2R)

    where R is the diffuse reflectance (0 to 1 scale). This
    linearizes the relationship between concentration and spectral
    response for diffuse reflectance measurements.

    Args:
        reflectance: Diffuse reflectance values in [0, 1], shape
            ``(W,)`` or ``(N, W)``.

    Returns:
        Kubelka-Munk values (K/S), same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    reflectance = ensure_float64(reflectance)
    validate_1d_or_2d(reflectance)
    warn_if_not_finite(reflectance)

    if np.any(reflectance < 0) or np.any(reflectance > 1):
        warnings.warn(
            "Reflectance values outside [0, 1] detected. "
            "Ensure you are passing reflectance, not absorbance.",
            stacklevel=2,
        )

    # Clamp reflectance to avoid division by zero
    r = np.clip(reflectance, EPSILON, 1.0 - EPSILON)

    return (1.0 - r) ** 2 / (2.0 * r)
