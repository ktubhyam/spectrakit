"""Area normalization (integral = 1)."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)


def normalize_area(
    intensities: np.ndarray,
    wavenumbers: np.ndarray | None = None,
) -> np.ndarray:
    """Normalize spectra so that the area under each curve equals 1.

    Uses the trapezoidal rule for integration. If wavenumbers are not
    provided, assumes unit spacing.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).
        wavenumbers: X-axis values, shape (W,). Used for proper
            integration spacing. None assumes unit spacing.

    Returns:
        Area-normalized intensities, same shape.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    if intensities.ndim == 1:
        area = np.trapezoid(np.abs(intensities), x=wavenumbers)
        if area < EPSILON:
            return intensities
        return intensities / area  # type: ignore[no-any-return]

    areas = np.array([np.trapezoid(np.abs(row), x=wavenumbers) for row in intensities]).reshape(
        -1, 1
    )
    areas = np.where(areas < EPSILON, 1.0, areas)  # type: ignore[assignment]

    return intensities / areas  # type: ignore[no-any-return]
