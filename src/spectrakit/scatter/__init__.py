"""Scatter correction methods for spectral data."""

from spectrakit.scatter.emsc import scatter_emsc
from spectrakit.scatter.msc import scatter_msc

__all__ = ["scatter_msc", "scatter_emsc"]
