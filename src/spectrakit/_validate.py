"""Internal validation and array utilities.

Centralizes common checks (shape, dtype, emptiness) and the 2-D dispatch
pattern used by every processing function.  All helpers are private to
the package — they are not re-exported from ``spectrakit.__init__``.
"""
from __future__ import annotations

import logging
from collections.abc import Callable
from typing import Any

import numpy as np

from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError

logger = logging.getLogger(__name__)

EPSILON: float = 1e-10
"""Shared near-zero threshold for division guards."""


def ensure_float64(data: Any) -> np.ndarray:
    """Convert input to a contiguous float64 numpy array.

    Args:
        data: Array-like input (list, tuple, ndarray, etc.).

    Returns:
        ``np.ndarray`` with dtype ``float64``.

    Raises:
        TypeError: If *data* cannot be converted to a numeric array.
    """
    try:
        arr = np.asarray(data, dtype=np.float64)
    except (ValueError, TypeError) as exc:
        raise TypeError(
            f"Cannot convert {type(data).__name__} to a numeric array"
        ) from exc
    return np.ascontiguousarray(arr)


def validate_1d_or_2d(
    data: np.ndarray,
    *,
    name: str = "intensities",
    allow_empty: bool = False,
) -> np.ndarray:
    """Validate that *data* is a 1-D or 2-D numpy array.

    Args:
        data: Array to validate.
        name: Human-readable name for error messages.
        allow_empty: If ``False`` (default), raise on zero-length arrays.

    Returns:
        The validated array (same object, no copy).

    Raises:
        SpectrumShapeError: If *data* has fewer than 1 or more than 2
            dimensions.
        EmptySpectrumError: If the array has zero elements and
            *allow_empty* is ``False``.
    """
    if data.ndim < 1 or data.ndim > 2:
        raise SpectrumShapeError(
            f"{name} must be 1-D or 2-D, got {data.ndim}-D with shape {data.shape}"
        )
    if not allow_empty and data.size == 0:
        raise EmptySpectrumError(f"{name} array is empty")
    return data


def apply_along_spectra(
    fn: Callable[..., np.ndarray],
    intensities: np.ndarray,
    **kwargs: Any,
) -> np.ndarray:
    """Apply a 1-D processing function row-by-row over a 2-D array.

    If *intensities* is 1-D, ``fn`` is called directly.  If 2-D (N, W),
    ``fn`` is called once per row and results are stacked.

    This eliminates the duplicated ``if ndim == 2: for row in …`` pattern
    found in baseline and other modules.

    Args:
        fn: A function with signature ``fn(intensities_1d, **kwargs) -> np.ndarray``.
        intensities: Input array, shape ``(W,)`` or ``(N, W)``.
        **kwargs: Extra keyword arguments forwarded to *fn*.

    Returns:
        Processed array, same shape as *intensities*.
    """
    if intensities.ndim == 1:
        return fn(intensities, **kwargs)
    return np.array([fn(row, **kwargs) for row in intensities])
