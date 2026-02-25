"""ATR (Attenuated Total Reflectance) correction.

Reference:
    Harrick, N.J. (1967). Internal Reflection Spectroscopy.
    Interscience Publishers.
"""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d, warn_if_not_finite

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
        ValueError: If physics parameters are invalid (non-positive
            refractive indices, angle outside (0, 90), or angle below
            the critical angle for the given crystal/sample pair).
    """
    intensities = ensure_float64(intensities)
    wavenumbers = ensure_float64(wavenumbers)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    # Validate physics parameters
    if n_crystal <= 0:
        raise ValueError(f"n_crystal must be positive, got {n_crystal}")
    if n_sample <= 0:
        raise ValueError(f"n_sample must be positive, got {n_sample}")
    if not 0 < angle < 90:
        raise ValueError(f"angle must be in (0, 90) degrees, got {angle}")

    n_ratio = n_sample / n_crystal
    if n_ratio >= 1.0:
        raise ValueError(
            f"n_sample ({n_sample}) must be less than n_crystal ({n_crystal}) "
            "for total internal reflection"
        )

    # Compute penetration depth factor: dp ∝ 1 / (ν * sqrt(sin²θ - (n2/n1)²))
    theta = np.radians(angle)
    sin2_theta = np.sin(theta) ** 2

    discriminant = sin2_theta - n_ratio**2
    if discriminant <= 0:
        raise ValueError(
            f"Angle {angle}° is below the critical angle for n_crystal={n_crystal}, "
            f"n_sample={n_sample}. No total internal reflection occurs."
        )

    # Penetration depth: dp = λ / (2π * n1 * sqrt(sin²θ - (n2/n1)²))
    # Since λ = 1/ν (in cm⁻¹), dp ∝ 1 / (ν * sqrt(discriminant))
    # Correction: multiply absorbance by ν * sqrt(discriminant) to remove
    # the path-length dependence, then normalize so the correction factor
    # at the maximum wavenumber equals 1.
    dp_inv = wavenumbers * np.sqrt(discriminant)
    correction = dp_inv / np.max(dp_inv)

    if intensities.ndim == 1:
        return intensities * correction  # type: ignore[no-any-return]
    return intensities * correction[np.newaxis, :]  # type: ignore[no-any-return]
