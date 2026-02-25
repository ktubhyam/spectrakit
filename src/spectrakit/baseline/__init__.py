"""Baseline correction methods for spectral data."""

from spectrakit.baseline.als import baseline_als
from spectrakit.baseline.arpls import baseline_arpls
from spectrakit.baseline.polynomial import baseline_polynomial
from spectrakit.baseline.rubberband import baseline_rubberband
from spectrakit.baseline.snip import baseline_snip

__all__ = [
    "baseline_als",
    "baseline_arpls",
    "baseline_snip",
    "baseline_polynomial",
    "baseline_rubberband",
]
