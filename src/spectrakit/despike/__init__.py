"""Spike removal methods for spectral data."""

from __future__ import annotations

from spectrakit.despike.whitaker_hayes import despike_whitaker_hayes
from spectrakit.despike.zscore import despike_zscore

__all__ = ["despike_whitaker_hayes", "despike_zscore"]
