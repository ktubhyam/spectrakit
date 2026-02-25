"""Spectral transformation methods."""

from spectrakit.transform.atr_correction import transform_atr_correction
from spectrakit.transform.kubelka_munk import transform_kubelka_munk

__all__ = ["transform_kubelka_munk", "transform_atr_correction"]
