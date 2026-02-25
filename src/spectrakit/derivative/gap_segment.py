"""Gap-segment derivative (Norris-Williams).

Reference:
    Norris, K.H.; Williams, P.C. (1984). Optimization of mathematical
    treatments of raw near-infrared signal in the measurement of protein
    in hard red spring wheat. Cereal Chemistry, 61(2), 158-165.
"""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import (
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    warn_if_not_finite,
)

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
    if gap < 1:
        raise ValueError(f"gap must be >= 1, got {gap}")
    if segment < 1:
        raise ValueError(f"segment must be >= 1, got {segment}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

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

    # First derivative: difference of segment averages separated
    # by exactly `gap` points.  The result is centered in the output
    # array; edges are zero-padded.
    result = _gap_diff(averaged, gap, n)

    if deriv == 2:
        # Apply the same gap difference again for second derivative
        result = _gap_diff(result, gap, n)

    return result


def _gap_diff(arr: np.ndarray, gap: int, n: int) -> np.ndarray:
    """Compute centered gap difference: out[i] ~ arr[i+gap/2] - arr[i-gap/2]."""
    out = np.zeros(n, dtype=np.float64)
    if gap < n:
        diff = arr[gap:] - arr[:-gap]  # length n - gap
        start = gap // 2
        out[start : start + len(diff)] = diff
    return out
