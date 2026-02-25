"""Whittaker smoother (penalized least squares).

Reference:
    Eilers, P.H.C. (2003). A perfect smoother.
    Analytical Chemistry, 75(14), 3631-3636.
"""

from __future__ import annotations

import logging

import numpy as np
from scipy import sparse
from scipy.sparse.linalg import spsolve

from spectrakit._validate import apply_along_spectra, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)

DEFAULT_LAMBDA = 1e4
DEFAULT_DIFFERENCES = 2


def smooth_whittaker(
    intensities: np.ndarray,
    lam: float = DEFAULT_LAMBDA,
    differences: int = DEFAULT_DIFFERENCES,
) -> np.ndarray:
    """Apply Whittaker smoother (penalized least squares).

    Minimizes the sum of squared residuals plus a penalty on the
    roughness (measured by finite differences) of the fitted curve.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        lam: Smoothness parameter (lambda). Larger values produce
            smoother results. Typical range: 1e2 to 1e8.
        differences: Order of the difference penalty. 2 penalizes
            curvature (default), 1 penalizes slope.

    Returns:
        Smoothed intensities, same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    return apply_along_spectra(
        _smooth_whittaker_1d,
        intensities,
        lam=lam,
        differences=differences,
    )


def _smooth_whittaker_1d(
    intensities: np.ndarray,
    lam: float = DEFAULT_LAMBDA,
    differences: int = DEFAULT_DIFFERENCES,
) -> np.ndarray:
    """Whittaker smoother for a single 1-D spectrum."""
    n = len(intensities)

    # Build difference matrix of given order
    D = sparse.eye(n, format="csc")
    for _ in range(differences):
        D = D[1:] - D[:-1]

    W = sparse.eye(n, format="csc")
    Z = W + lam * D.T @ D

    return spsolve(Z, intensities)  # type: ignore[no-any-return]
