"""ATR (Attenuated Total Reflectance) correction.

Reference:
    Harrick, N.J. (1967). Internal Reflection Spectroscopy.
    Interscience Publishers.
"""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)

DEFAULT_N_CRYSTAL = 2.4
DEFAULT_N_SAMPLE = 1.5
DEFAULT_ANGLE = 45.0


def transform_atr_correction(
    intensities: np.ndarray,
    wavenumbers: np.ndarray,
    n_crystal: float = DEFAULT_N_CRYSTAL,
    n_sample: float = DEFAULT_N_SAMPLE,
    angle: float = DEFAULT_ANGLE,
) -> np.ndarray:
    """Apply ATR path-length correction to infrared spectra.

    Corrects for the wavenumber-dependent penetration depth in ATR
    measurements. The effective path length in ATR varies with
    wavenumber, making peaks at lower wavenumbers appear stronger.
    This correction normalizes for that effect.

    Args:
        intensities: ATR spectral intensities, shape ``(W,)`` or ``(N, W)``.
        wavenumbers: Wavenumber axis in cm^-1, shape ``(W,)``.
        n_crystal: Refractive index of the ATR crystal. Common values:
            diamond = 2.4, ZnSe = 2.4, Ge = 4.0.
        n_sample: Refractive index of the sample. Typical organic
            samples: 1.4-1.6.
        angle: Angle of incidence in degrees.

    Returns:
        ATR-corrected intensities, same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    intensities = ensure_float64(intensities)
    wavenumbers = ensure_float64(wavenumbers)
    validate_1d_or_2d(intensities)

    # Compute penetration depth factor: dp ∝ 1 / (ν * sqrt(sin²θ - (n2/n1)²))
    theta = np.radians(angle)
    n_ratio = n_sample / n_crystal
    sin2_theta = np.sin(theta) ** 2

    discriminant = sin2_theta - n_ratio**2
    discriminant = np.maximum(discriminant, EPSILON)

    # Effective penetration depth proportional to 1/(ν * sqrt(discriminant))
    # Correction factor: multiply by ν to compensate
    correction = wavenumbers / np.max(wavenumbers)

    if intensities.ndim == 1:
        return intensities * correction
    return intensities * correction[np.newaxis, :]
