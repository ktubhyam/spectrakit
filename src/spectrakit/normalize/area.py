"""Area normalization (integral = 1)."""

from __future__ import annotations

import logging
import warnings

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite

# numpy 2.0 renamed trapz -> trapezoid; support both
_trapezoid = getattr(np, "trapezoid", np.trapz)

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

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if intensities.ndim == 1:
        area = _trapezoid(np.abs(intensities), x=wavenumbers)
        if area < EPSILON:
            warnings.warn(
                "Area normalization: near-zero area, returning spectrum unchanged.",
                stacklevel=2,
            )
            return intensities
        return intensities / area  # type: ignore[no-any-return]

    areas = _trapezoid(np.abs(intensities), x=wavenumbers, axis=1).reshape(-1, 1)
    degenerate = areas < EPSILON
    areas = np.where(degenerate, 1.0, areas)
    n_zero = int(np.sum(degenerate))
    if n_zero > 0:
        warnings.warn(
            f"Area normalization: {n_zero} spectrum/spectra have near-zero area "
            "and will be returned unchanged.",
            stacklevel=2,
        )

    return intensities / areas  # type: ignore[no-any-return]
