"""Cross-correlation for spectral signals."""

from __future__ import annotations

import logging

import numpy as np
from scipy.signal import correlate

from spectrakit._validate import (
    EPSILON,
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    validate_matching_width,
    warn_if_not_finite,
)

logger = logging.getLogger(__name__)

_VALID_MODES = frozenset({"full", "same", "valid"})


def spectral_correlate(
    query: np.ndarray,
    reference: np.ndarray,
    *,
    mode: str = "full",
    normalize: bool = True,
) -> np.ndarray:
    """Compute cross-correlation between spectral signals.

    Wraps :func:`scipy.signal.correlate` with optional L2 normalization
    so the peak value equals the cosine similarity.

    Args:
        query: Query spectrum, shape ``(W,)`` or ``(N, W)``.
        reference: Reference spectrum, shape ``(W,)``.
        mode: Correlation mode passed to ``scipy.signal.correlate``:
            ``"full"`` (default), ``"same"``, or ``"valid"``.
        normalize: If ``True`` (default), normalize by the product of
            L2 norms.

    Returns:
        Cross-correlation array.  Shape depends on *mode*:

        - ``"full"``: ``(2W - 1,)`` or ``(N, 2W - 1)``
        - ``"same"``: ``(W,)`` or ``(N, W)``
        - ``"valid"``: ``(1,)`` or ``(N, 1)`` (when query and reference
          have the same width)

    Raises:
        SpectrumShapeError: If *query* is not 1-D or 2-D, or *reference*
            is not 1-D.
        SpectrumShapeError: If spectral widths do not match.
        EmptySpectrumError: If inputs have zero elements.
        ValueError: If *mode* is not one of ``"full"``, ``"same"``,
            ``"valid"``.

    Examples:
        >>> import numpy as np
        >>> from spectrakit import spectral_correlate
        >>> a = np.array([0.0, 1.0, 0.0])
        >>> spectral_correlate(a, a, mode="same").shape
        (3,)
    """
    query = ensure_float64(query)
    reference = ensure_float64(reference)
    validate_1d_or_2d(query, name="query")
    validate_1d_or_2d(reference, name="reference")
    warn_if_not_finite(query, name="query")
    warn_if_not_finite(reference, name="reference")

    if reference.ndim != 1:
        raise ValueError("reference must be 1-D")
    validate_matching_width(query, reference)

    if mode not in _VALID_MODES:
        raise ValueError(f"mode must be one of {sorted(_VALID_MODES)}, got {mode!r}")

    return apply_along_spectra(
        _correlate_1d,
        query,
        reference=reference,
        mode=mode,
        normalize=normalize,
    )


def _correlate_1d(
    query: np.ndarray,
    *,
    reference: np.ndarray,
    mode: str,
    normalize: bool,
) -> np.ndarray:
    """Cross-correlation for a single spectrum pair."""
    corr = correlate(query, reference, mode=mode)

    if normalize:
        norm = np.sqrt(np.sum(query**2) * np.sum(reference**2))
        if norm > EPSILON:
            corr = corr / norm

    return corr
