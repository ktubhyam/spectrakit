"""Peak detection and integration for spectral data."""

from __future__ import annotations

from spectrakit.peaks.find import PeakResult, peaks_find
from spectrakit.peaks.integrate import peaks_integrate

__all__ = ["peaks_find", "peaks_integrate", "PeakResult"]
