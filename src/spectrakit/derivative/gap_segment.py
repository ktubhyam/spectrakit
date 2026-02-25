"""Gap-segment derivative (Norris-Williams).

Reference:
    Norris, K.H.; Williams, P.C. (1984). Optimization of mathematical
    treatments of raw near-infrared signal in the measurement of protein
    in hard red spring wheat. Cereal Chemistry, 61(2), 158-165.
"""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import apply_along_spectra, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)

DEFAULT_GAP = 5
DEFAULT_SEGMENT = 5
DEFAULT_DERIV = 1


def derivative_gap_segment(
    intensities: np.ndarray,
    gap: int = DEFAULT_GAP,
    segment: int = DEFAULT_SEGMENT,
    deriv: int = DEFAULT_DERIV,
) -> np.ndarray:
    """Compute gap-segment derivative (Norris-Williams method).

    Averages over ``segment`` points then takes differences separated
    by ``gap`` points. Commonly used for NIR pre-treatment.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        gap: Gap size (number of points between segments).
        segment: Segment size (number of points to average).
        deriv: Derivative order. 1 = first derivative, 2 = second.

    Returns:
        Derivative spectrum, same shape as input (padded with zeros
        at edges where the computation is undefined).

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
        ValueError: If ``deriv`` is not 1 or 2.
    """
    if deriv not in (1, 2):
        raise ValueError(f"deriv must be 1 or 2, got {deriv}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    return apply_along_spectra(
        _derivative_gap_segment_1d,
        intensities,
        gap=gap,
        segment=segment,
        deriv=deriv,
    )


def _derivative_gap_segment_1d(
    intensities: np.ndarray,
    gap: int = DEFAULT_GAP,
    segment: int = DEFAULT_SEGMENT,
    deriv: int = DEFAULT_DERIV,
) -> np.ndarray:
    """Gap-segment derivative for a single 1-D spectrum."""
    n = len(intensities)

    # Compute segment averages using a moving average
    kernel = np.ones(segment) / segment
    averaged = np.convolve(intensities, kernel, mode="same")

    # First derivative: difference of segment averages separated by gap
    result = np.zeros(n, dtype=np.float64)
    half_gap = gap // 2
    for i in range(half_gap, n - half_gap):
        result[i] = averaged[min(i + half_gap, n - 1)] - averaged[max(i - half_gap, 0)]

    if deriv == 2:
        # Apply the same operation again for second derivative
        first = result.copy()
        result = np.zeros(n, dtype=np.float64)
        for i in range(half_gap, n - half_gap):
            result[i] = first[min(i + half_gap, n - 1)] - first[max(i - half_gap, 0)]

    return result
