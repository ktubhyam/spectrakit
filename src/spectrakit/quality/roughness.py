"""Spectral roughness via RMS of finite differences."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)

DEFAULT_ORDER = 1


def quality_roughness(
    intensities: np.ndarray,
    *,
    order: int = DEFAULT_ORDER,
) -> float | np.ndarray:
    """Compute spectral roughness as the RMS of finite differences.

    Lower values indicate smoother spectra; higher values indicate
    noisier or spikier data.  Useful for comparing preprocessing
    outcomes or flagging low-quality acquisitions.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        order: Finite difference order (1 = first difference, 2 = second,
            etc.).  Default is 1.

    Returns:
        Roughness value.  Scalar ``float`` for 1-D input, array of shape
        ``(N,)`` for a 2-D batch.

    Raises:
        SpectrumShapeError: If *intensities* is not 1-D or 2-D.
        EmptySpectrumError: If *intensities* has zero elements.
        ValueError: If *order* < 1 or *order* >= spectrum length.

    Examples:
        >>> import numpy as np
        >>> from spectrakit import quality_roughness
        >>> smooth = np.sin(np.linspace(0, 2 * np.pi, 100))
        >>> quality_roughness(smooth)  # doctest: +SKIP
        0.044...
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if order < 1:
        raise ValueError(f"order must be >= 1, got {order}")

    width = intensities.shape[-1]
    if order >= width:
        raise ValueError(f"order ({order}) must be less than spectrum length ({width})")

    if intensities.ndim == 1:
        diffs = np.diff(intensities, n=order)
        return float(np.sqrt(np.mean(diffs**2)))

    # 2-D: vectorized along axis=1
    diffs = np.diff(intensities, n=order, axis=1)
    return np.sqrt(np.mean(diffs**2, axis=1))  # type: ignore[return-value]
