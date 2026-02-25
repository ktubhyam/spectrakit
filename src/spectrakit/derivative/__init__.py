"""Spectral derivative methods."""

from spectrakit.derivative.gap_segment import derivative_gap_segment
from spectrakit.derivative.savgol import derivative_savgol

__all__ = ["derivative_savgol", "derivative_gap_segment"]
