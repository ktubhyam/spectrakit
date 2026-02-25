"""Internal validation and array utilities.

Centralizes common checks (shape, dtype, emptiness) and the 2-D dispatch
pattern used by every processing function.  All helpers are private to
the package — they are not re-exported from ``spectrakit.__init__``.
"""

from __future__ import annotations

import logging
import os
import warnings
from collections.abc import Callable
from typing import Any

import numpy as np

from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError

logger = logging.getLogger(__name__)

EPSILON: float = 1e-10
"""Shared near-zero threshold for division guards."""

_DEFAULT_MAX_FILE_SIZE: int = 500 * 1024 * 1024  # 500 MB


def _read_max_file_size() -> int:
    """Read the maximum file size from env or use the default (500 MB).

    Set ``SPECTRAKIT_MAX_FILE_SIZE`` (in bytes) to override.
    """
    env = os.environ.get("SPECTRAKIT_MAX_FILE_SIZE")
    if env is not None:
        try:
            return int(env)
        except ValueError:
            logger.warning(
                "Invalid SPECTRAKIT_MAX_FILE_SIZE=%r, using default %d bytes",
                env,
                _DEFAULT_MAX_FILE_SIZE,
            )
    return _DEFAULT_MAX_FILE_SIZE


MAX_FILE_SIZE: int = _read_max_file_size()
"""Maximum file size (in bytes) accepted by I/O readers.

Override with the ``SPECTRAKIT_MAX_FILE_SIZE`` environment variable.
"""


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
        raise TypeError(f"Cannot convert {type(data).__name__} to a numeric array") from exc
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


def warn_if_not_finite(data: np.ndarray, *, name: str = "intensities") -> None:
    """Emit a warning if *data* contains NaN or Inf values.

    This does **not** raise an exception — processing continues so that
    callers can decide how to handle non-finite values.  The check is
    O(N) and inexpensive for typical spectral arrays.

    Args:
        data: Array to check.
        name: Human-readable name for the warning message.
    """
    if not np.all(np.isfinite(data)):
        n_nan = int(np.sum(np.isnan(data)))
        n_inf = int(np.sum(np.isinf(data)))
        parts: list[str] = []
        if n_nan:
            parts.append(f"{n_nan} NaN")
        if n_inf:
            parts.append(f"{n_inf} Inf")
        warnings.warn(
            f"{name} contains non-finite values ({', '.join(parts)}). Results may be unreliable.",
            stacklevel=3,
        )


def validate_file_size(path_size: int, *, path_name: str = "") -> None:
    """Raise if a file exceeds :data:`MAX_FILE_SIZE`.

    Args:
        path_size: File size in bytes.
        path_name: File name/path for the error message.

    Raises:
        ValueError: If file exceeds the size limit.
    """
    if path_size > MAX_FILE_SIZE:
        limit_mb = MAX_FILE_SIZE / (1024 * 1024)
        size_mb = path_size / (1024 * 1024)
        raise ValueError(
            f"File {path_name!r} is {size_mb:.1f} MB, exceeding the "
            f"{limit_mb:.0f} MB safety limit. If this file is legitimate, "
            f"read it manually with the appropriate library."
        )


def validate_matching_width(
    query: np.ndarray,
    reference: np.ndarray,
    *,
    query_name: str = "query",
    reference_name: str = "reference",
) -> None:
    """Check that two arrays have the same spectral width (last dimension).

    Args:
        query: First array, shape ``(..., W)``.
        reference: Second array, shape ``(..., W)``.
        query_name: Human-readable name for the first array.
        reference_name: Human-readable name for the second array.

    Raises:
        SpectrumShapeError: If the last dimensions do not match.
    """
    q_w = query.shape[-1]
    r_w = reference.shape[-1]
    if q_w != r_w:
        raise SpectrumShapeError(
            f"{query_name} has {q_w} spectral points but "
            f"{reference_name} has {r_w}"
        )


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
