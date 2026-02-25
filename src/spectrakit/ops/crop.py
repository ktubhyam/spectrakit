"""Spectral cropping (wavenumber range selection)."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)


def spectral_crop(
    intensities: np.ndarray,
    wavenumbers: np.ndarray,
    start: float,
    end: float,
) -> tuple[np.ndarray, np.ndarray]:
    """Select a wavenumber region from spectral data.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        wavenumbers: Wavenumber axis, shape ``(W,)``.
        start: Lower bound of the wavenumber region (inclusive).
        end: Upper bound of the wavenumber region (inclusive).

    Returns:
        Tuple of ``(cropped_intensities, cropped_wavenumbers)``.
        Shapes are ``(M,)`` or ``(N, M)`` and ``(M,)`` respectively,
        where *M* is the number of points in [start, end].

    Raises:
        SpectrumShapeError: If *intensities* is not 1-D or 2-D.
        EmptySpectrumError: If *intensities* has zero elements.
        ValueError: If *start* >= *end* or no points fall in the range.
    """
    intensities = ensure_float64(intensities)
    wavenumbers = ensure_float64(wavenumbers)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    expected_w = intensities.shape[-1]
    if wavenumbers.shape[0] != expected_w:
        raise ValueError(
            f"wavenumbers length {wavenumbers.shape[0]} does not match "
            f"intensities spectral width {expected_w}"
        )

    low, high = min(start, end), max(start, end)
    if low == high:
        raise ValueError(f"start and end must differ, both are {low}")

    mask = (wavenumbers >= low) & (wavenumbers <= high)
    if not np.any(mask):
        raise ValueError(
            f"No points in [{low}, {high}]. "
            f"Wavenumber range is [{wavenumbers.min():.2f}, {wavenumbers.max():.2f}]."
        )

    cropped_wn = wavenumbers[mask]
    if intensities.ndim == 1:
        return intensities[mask], cropped_wn
    return intensities[:, mask], cropped_wn
