"""Spectral alignment via cross-correlation."""

from __future__ import annotations

import logging

import numpy as np
from scipy.signal import correlate

from spectrakit._validate import (
    ensure_float64,
    validate_1d_or_2d,
    validate_matching_width,
    warn_if_not_finite,
)

logger = logging.getLogger(__name__)


def spectral_align(
    intensities: np.ndarray,
    reference: np.ndarray,
    *,
    max_shift: int | None = None,
    fill_value: float | None = None,
) -> tuple[np.ndarray, int | np.ndarray]:
    """Align spectra to a reference using cross-correlation.

    Finds the integer shift that maximizes cross-correlation between
    each spectrum and the reference, then applies the shift.

    Args:
        intensities: Spectrum or batch to align, shape ``(W,)`` or
            ``(N, W)``.
        reference: Reference spectrum, shape ``(W,)``.
        max_shift: Maximum allowed shift in points.  ``None`` means no
            limit (shifts up to ``W - 1``).
        fill_value: Value for positions exposed by the shift.
            If ``None``, edge values are repeated (nearest-neighbor fill).

    Returns:
        Tuple of ``(aligned, shifts)`` where:

        - *aligned* has the same shape as *intensities*.
        - *shifts* is the integer offset applied (positive = shifted
            right, negative = shifted left).  Scalar ``int`` for 1-D,
            ``np.ndarray`` of shape ``(N,)`` for 2-D.

    Raises:
        SpectrumShapeError: If *intensities* is not 1-D or 2-D, or
            *reference* is not 1-D.
        SpectrumShapeError: If spectral widths do not match.
        EmptySpectrumError: If inputs have zero elements.
        ValueError: If *max_shift* < 0.

    Examples:
        >>> import numpy as np
        >>> from spectrakit import spectral_align
        >>> ref = np.zeros(50); ref[25] = 1.0  # peak at 25
        >>> shifted = np.zeros(50); shifted[30] = 1.0  # peak at 30
        >>> aligned, shift = spectral_align(shifted, ref)
        >>> shift
        -5
    """
    intensities = ensure_float64(intensities)
    reference = ensure_float64(reference)
    validate_1d_or_2d(intensities, name="intensities")
    validate_1d_or_2d(reference, name="reference")
    warn_if_not_finite(intensities, name="intensities")
    warn_if_not_finite(reference, name="reference")

    if reference.ndim != 1:
        raise ValueError("reference must be 1-D")
    validate_matching_width(intensities, reference)

    if max_shift is not None and max_shift < 0:
        raise ValueError(f"max_shift must be >= 0, got {max_shift}")

    if intensities.ndim == 1:
        aligned, shift = _align_1d(intensities, reference, max_shift, fill_value)
        return aligned, int(shift)

    # 2-D: process each row, collect shifts separately
    n_spectra = intensities.shape[0]
    aligned = np.empty_like(intensities)
    shifts = np.empty(n_spectra, dtype=np.intp)

    for i in range(n_spectra):
        aligned[i], shifts[i] = _align_1d(intensities[i], reference, max_shift, fill_value)

    return aligned, shifts


def _align_1d(
    intensities: np.ndarray,
    reference: np.ndarray,
    max_shift: int | None,
    fill_value: float | None,
) -> tuple[np.ndarray, int]:
    """Align a single spectrum to the reference."""
    n = len(intensities)

    # Cross-correlate to find optimal shift
    corr = correlate(intensities, reference, mode="full")
    # Lag axis: -(n-1) to +(n-1)
    lags = np.arange(-(n - 1), n)

    # Restrict to max_shift if specified
    if max_shift is not None:
        valid = np.abs(lags) <= max_shift
        corr = corr[valid]
        lags = lags[valid]

    # Best shift is the lag that maximizes correlation
    best_idx = int(np.argmax(corr))
    shift = int(lags[best_idx])

    if shift == 0:
        return intensities.copy(), 0

    # Apply shift: positive shift means the spectrum needs to move left
    # (we found that the spectrum is shifted right relative to reference)
    result = np.roll(intensities, -shift)

    # Fill exposed positions
    if fill_value is not None:
        fv = fill_value
    else:
        # Nearest-neighbor: replicate edge value
        fv = None

    if shift > 0:
        # Rolled left by `shift` → right edge exposed
        if fv is not None:
            result[-shift:] = fv
        else:
            result[-shift:] = intensities[-1]
    else:
        # shift < 0: rolled right by |shift| → left edge exposed
        if fv is not None:
            result[:-shift] = fv
        else:
            result[:-shift] = intensities[0]

    return result, -shift
