"""Multiplicative Scatter Correction (MSC).

Reference:
    Geladi, P.; MacDougall, D.; Martens, H. (1985). Linearization and
    scatter-correction for near-infrared reflectance spectra of meat.
    Applied Spectroscopy, 39(3), 491-500.
"""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)


def scatter_msc(
    intensities: np.ndarray,
    reference: np.ndarray | None = None,
) -> np.ndarray:
    """Apply Multiplicative Scatter Correction.

    Each spectrum is corrected by fitting a linear regression against a
    reference spectrum (default: mean spectrum), then subtracting the
    intercept and dividing by the slope.

    Args:
        intensities: Spectral intensities, shape ``(N, W)`` for a batch
            or ``(W,)`` for a single spectrum (requires ``reference``).
        reference: Reference spectrum, shape ``(W,)``. If ``None``,
            uses the mean of the batch.

    Returns:
        MSC-corrected intensities, same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        ValueError: If a single spectrum is provided without a reference.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    if intensities.ndim == 1:
        if reference is None:
            raise ValueError(
                "reference is required for single-spectrum MSC. "
                "Pass a batch (N, W) array or provide a reference spectrum."
            )
        reference = ensure_float64(reference)
        return _msc_single(intensities, reference)

    if reference is None:
        reference = np.mean(intensities, axis=0)
    else:
        reference = ensure_float64(reference)

    return np.array([_msc_single(row, reference) for row in intensities])


def _msc_single(spectrum: np.ndarray, reference: np.ndarray) -> np.ndarray:
    """MSC correction for a single spectrum against a reference."""
    # Fit: spectrum = a + b * reference
    coeffs = np.polyfit(reference, spectrum, deg=1)
    slope, intercept = coeffs[0], coeffs[1]

    if abs(slope) < 1e-10:
        return spectrum - intercept

    return (spectrum - intercept) / slope
