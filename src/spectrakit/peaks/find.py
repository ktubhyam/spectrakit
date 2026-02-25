"""Peak detection in spectral data."""

from __future__ import annotations

import logging
from dataclasses import dataclass, field

import numpy as np
from scipy.signal import find_peaks as scipy_find_peaks

from spectrakit._validate import ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)

DEFAULT_HEIGHT_PERCENTILE = 10
DEFAULT_DISTANCE = 5


@dataclass
class PeakResult:
    """Container for peak detection results.

    Attributes:
        indices: Array of peak indices, shape ``(P,)``.
        heights: Peak heights at the detected positions, shape ``(P,)``.
        wavenumbers: Peak wavenumber positions if wavenumbers were
            provided, shape ``(P,)``. ``None`` otherwise.
    """

    indices: np.ndarray
    heights: np.ndarray
    wavenumbers: np.ndarray | None = None
    properties: dict[str, np.ndarray] = field(default_factory=dict)


def peaks_find(
    intensities: np.ndarray,
    wavenumbers: np.ndarray | None = None,
    height: float | None = None,
    distance: int = DEFAULT_DISTANCE,
    prominence: float | None = None,
) -> PeakResult:
    """Find peaks in a 1-D spectrum.

    Wraps ``scipy.signal.find_peaks`` with spectroscopy-friendly
    defaults and returns a structured result.

    Args:
        intensities: Spectral intensities, shape ``(W,)``.
        wavenumbers: Wavenumber axis, shape ``(W,)``. Used to report
            peak positions in wavenumber units.
        height: Minimum peak height. If ``None``, uses the 10th
            percentile of the spectrum as a threshold.
        distance: Minimum number of points between peaks.
        prominence: Minimum peak prominence. If ``None``, no
            prominence filter is applied.

    Returns:
        ``PeakResult`` with indices, heights, and optional wavenumbers.

    Raises:
        SpectrumShapeError: If input is not 1-D.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    if intensities.ndim != 1:
        raise ValueError("peaks_find requires a 1-D spectrum. For batches, call per-row.")

    if height is None:
        height = float(np.percentile(intensities, DEFAULT_HEIGHT_PERCENTILE))

    kwargs: dict[str, float | int] = {"height": height, "distance": distance}
    if prominence is not None:
        kwargs["prominence"] = prominence

    indices, properties = scipy_find_peaks(intensities, **kwargs)

    peak_wavenumbers = None
    if wavenumbers is not None:
        wavenumbers = ensure_float64(wavenumbers)
        peak_wavenumbers = wavenumbers[indices]

    return PeakResult(
        indices=indices,
        heights=intensities[indices],
        wavenumbers=peak_wavenumbers,
        properties=properties,
    )
