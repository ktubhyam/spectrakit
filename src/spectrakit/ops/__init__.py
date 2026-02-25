"""Spectral arithmetic and manipulation operations."""

from __future__ import annotations

from spectrakit.ops.align import spectral_align
from spectrakit.ops.average import spectral_average
from spectrakit.ops.correlate import spectral_correlate
from spectrakit.ops.crop import spectral_crop
from spectrakit.ops.interpolate import spectral_interpolate
from spectrakit.ops.subtract import spectral_subtract

__all__ = [
    "spectral_align",
    "spectral_average",
    "spectral_correlate",
    "spectral_crop",
    "spectral_interpolate",
    "spectral_subtract",
]
