"""Peak area integration for spectral data."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d, warn_if_not_finite
from spectrakit.exceptions import SpectrumShapeError

# numpy 2.0 renamed trapz -> trapezoid; support both
try:
    from numpy import trapezoid as _trapezoid
except ImportError:
    from numpy import trapz as _trapezoid  # type: ignore[attr-defined,no-redef]

logger = logging.getLogger(__name__)


def peaks_integrate(
    intensities: np.ndarray,
    wavenumbers: np.ndarray | None = None,
    ranges: list[tuple[float, float]] | None = None,
) -> np.ndarray | float:
    """Integrate peak areas over specified wavenumber ranges.

    If ``ranges`` is provided, computes the trapezoidal integral for
    each range. Otherwise, integrates the entire spectrum.

    Args:
        intensities: Spectral intensities, shape ``(W,)``.
        wavenumbers: Wavenumber axis, shape ``(W,)``. Required when
            ``ranges`` is specified.
        ranges: List of ``(start, end)`` wavenumber ranges to integrate.
            Each range defines a spectral region. If ``None``, integrates
            the full spectrum.

    Returns:
        If ``ranges`` is ``None``, a scalar (total area). If ``ranges``
        is provided, an array of shape ``(len(ranges),)`` with the area
        for each range.

    Raises:
        ValueError: If *ranges* is specified but *wavenumbers* is ``None``.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    if intensities.ndim != 1:
        raise SpectrumShapeError(
            f"peaks_integrate requires 1-D input, got shape {intensities.shape}. "
            "Apply row-by-row for 2-D batches."
        )
    warn_if_not_finite(intensities)

    if ranges is None:
        return float(_trapezoid(intensities, x=wavenumbers))

    if wavenumbers is None:
        raise ValueError("wavenumbers are required when ranges is specified")

    wavenumbers = ensure_float64(wavenumbers)
    areas = []

    for start, end in ranges:
        low, high = min(start, end), max(start, end)
        mask = (wavenumbers >= low) & (wavenumbers <= high)

        if not np.any(mask):
            areas.append(0.0)
            continue

        region_wn = wavenumbers[mask]
        region_y = intensities[mask]
        areas.append(float(_trapezoid(region_y, x=region_wn)))

    return np.array(areas, dtype=np.float64)
