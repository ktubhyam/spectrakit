"""Signal-to-noise ratio estimation for spectral data."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)

# Variance scaling factor for 2nd finite difference of white noise:
# Var(diff(y, n=2)) = 6 * Var(noise)  →  std(noise) = std(diff(y,2)) / sqrt(6)
_NOISE_SCALE_FACTOR = float(np.sqrt(6.0))


def quality_snr(
    intensities: np.ndarray,
    *,
    signal_range: tuple[int, int] | None = None,
    noise_range: tuple[int, int] | None = None,
) -> float | np.ndarray:
    """Estimate the signal-to-noise ratio of spectral data.

    Two modes of operation:

    1. **Explicit regions** — provide both *signal_range* and *noise_range*
       as ``(start_idx, end_idx)`` index slices.
       ``SNR = mean(signal_region) / std(noise_region)``.
    2. **Automatic (2nd derivative)** — omit both ranges.  Noise is
       estimated from ``std(diff(intensities, n=2)) / sqrt(6)``
       (white-noise correction).  Signal is peak-to-peak amplitude.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        signal_range: ``(start_idx, end_idx)`` index slice for the signal
            region.  Must be provided together with *noise_range*.
        noise_range: ``(start_idx, end_idx)`` index slice for the noise
            region.  Must be provided together with *signal_range*.

    Returns:
        SNR value.  Scalar ``float`` for 1-D input, array of shape
        ``(N,)`` for a 2-D batch.

    Raises:
        SpectrumShapeError: If *intensities* is not 1-D or 2-D.
        EmptySpectrumError: If *intensities* has zero elements.
        ValueError: If only one of *signal_range* / *noise_range* is given.
        ValueError: If ranges produce empty slices or are out of bounds.
        ValueError: If spectrum has fewer than 3 points in automatic mode.

    Examples:
        >>> import numpy as np
        >>> from spectrakit import quality_snr
        >>> clean = np.sin(np.linspace(0, 2 * np.pi, 200))
        >>> quality_snr(clean)  # doctest: +SKIP
        32.1...
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    has_signal = signal_range is not None
    has_noise = noise_range is not None
    if has_signal != has_noise:
        raise ValueError("signal_range and noise_range must both be provided or both omitted")

    if has_signal and has_noise:
        assert signal_range is not None  # for type narrowing
        assert noise_range is not None
        return _snr_explicit(intensities, signal_range, noise_range)

    return _snr_auto(intensities)


def _validate_range(
    rng: tuple[int, int],
    width: int,
    name: str,
) -> None:
    """Validate an index range tuple."""
    start, end = rng
    if start >= end:
        raise ValueError(f"{name} start ({start}) must be less than end ({end})")
    if start < 0 or end > width:
        raise ValueError(f"{name} ({start}, {end}) is out of bounds for spectrum of length {width}")


def _snr_explicit(
    intensities: np.ndarray,
    signal_range: tuple[int, int],
    noise_range: tuple[int, int],
) -> float | np.ndarray:
    """SNR from user-specified signal and noise regions."""
    width = intensities.shape[-1]
    _validate_range(signal_range, width, "signal_range")
    _validate_range(noise_range, width, "noise_range")

    sig = intensities[..., signal_range[0] : signal_range[1]]
    noi = intensities[..., noise_range[0] : noise_range[1]]

    signal_mean = np.mean(sig, axis=-1)
    noise_std = np.std(noi, axis=-1)
    snr = signal_mean / (noise_std + EPSILON)

    if intensities.ndim == 1:
        return float(snr)
    return snr  # type: ignore[return-value]


def _snr_auto(intensities: np.ndarray) -> float | np.ndarray:
    """SNR estimated from the 2nd derivative (white-noise assumption)."""
    width = intensities.shape[-1]
    if width < 3:
        raise ValueError(f"Automatic SNR estimation requires at least 3 points, got {width}")

    d2 = np.diff(intensities, n=2, axis=-1)
    noise_estimate = np.std(d2, axis=-1) / _NOISE_SCALE_FACTOR
    signal_estimate = np.max(intensities, axis=-1) - np.min(intensities, axis=-1)
    snr = signal_estimate / (noise_estimate + EPSILON)

    if intensities.ndim == 1:
        return float(snr)
    return snr  # type: ignore[return-value]
