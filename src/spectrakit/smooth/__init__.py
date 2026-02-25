"""Spectral smoothing methods."""

from spectrakit.smooth.savgol import smooth_savgol
from spectrakit.smooth.whittaker import smooth_whittaker

__all__ = ["smooth_savgol", "smooth_whittaker"]
