"""Spectral arithmetic and manipulation operations."""

from spectrakit.ops.average import spectral_average
from spectrakit.ops.interpolate import spectral_interpolate
from spectrakit.ops.subtract import spectral_subtract

__all__ = ["spectral_subtract", "spectral_average", "spectral_interpolate"]
