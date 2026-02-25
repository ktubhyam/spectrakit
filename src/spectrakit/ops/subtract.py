"""Spectral subtraction."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d, warn_if_not_finite
from spectrakit.exceptions import SpectrumShapeError

logger = logging.getLogger(__name__)


def spectral_subtract(
    spectrum: np.ndarray,
    background: np.ndarray,
    factor: float = 1.0,
) -> np.ndarray:
    """Subtract *background* from *spectrum*.

    Computes ``spectrum - factor * background``. Useful for background
    subtraction, solvent subtraction, or difference spectroscopy.

    Args:
        spectrum: Spectrum or batch, shape ``(W,)`` or ``(N, W)``.
        background: Spectrum to subtract, shape ``(W,)``. If *spectrum*
            is 2-D, *background* is subtracted from every row.
        factor: Scaling factor for *background* before subtraction.

    Returns:
        Difference spectrum, same shape as *spectrum*.

    Raises:
        SpectrumShapeError: If shapes are incompatible (different number
            of wavelength points).
        EmptySpectrumError: If *spectrum* has zero elements.
    """
    spectrum = ensure_float64(spectrum)
    background = ensure_float64(background)
    validate_1d_or_2d(spectrum, name="spectrum")
    warn_if_not_finite(spectrum, name="spectrum")
    warn_if_not_finite(background, name="background")

    # Validate compatible shapes
    spec_w = spectrum.shape[-1]
    bg_w = background.shape[-1] if background.ndim >= 1 else 0
    if spec_w != bg_w:
        raise SpectrumShapeError(f"spectrum has {spec_w} points but background has {bg_w} points")

    if spectrum.ndim == 1:
        return spectrum - factor * background

    return spectrum - factor * background[np.newaxis, :]
