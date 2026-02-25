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

from spectrakit._validate import (
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    warn_if_not_finite,
)

logger = logging.getLogger(__name__)

DEFAULT_LAMBDA = 1e4
DEFAULT_DIFFERENCES = 2


def smooth_whittaker(
    intensities: np.ndarray,
    lam: float = DEFAULT_LAMBDA,
    differences: int = DEFAULT_DIFFERENCES,
    wavenumbers: np.ndarray | None = None,
) -> np.ndarray:
    """Apply Whittaker smoother (penalized least squares).

    Minimizes the sum of squared residuals plus a penalty on the
    roughness (measured by finite differences) of the fitted curve.

    When *wavenumbers* are provided, the penalty matrix accounts for
    non-uniform spacing between spectral points. This is important for
    spectra measured on instruments with variable point spacing, as the
    standard uniform-spacing penalty would over- or under-smooth
    regions with different point densities.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        lam: Smoothness parameter (lambda). Larger values produce
            smoother results. Typical range: 1e2 to 1e8.
        differences: Order of the difference penalty. 2 penalizes
            curvature (default), 1 penalizes slope.
        wavenumbers: Wavenumber axis, shape ``(W,)``. If provided,
            builds a non-uniform finite-difference penalty matrix that
            accounts for the actual point spacing.

    Returns:
        Smoothed intensities, same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
        ValueError: If ``lam`` or ``differences`` are invalid, or if
            ``wavenumbers`` length does not match spectral width.
    """
    if lam <= 0:
        raise ValueError(f"lam (smoothness) must be positive, got {lam}")
    if differences < 1:
        raise ValueError(f"differences must be >= 1, got {differences}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if wavenumbers is not None:
        wavenumbers = ensure_float64(wavenumbers)
        expected_w = intensities.shape[-1]
        if wavenumbers.shape[0] != expected_w:
            raise ValueError(
                f"wavenumbers length {wavenumbers.shape[0]} does not match "
                f"intensities spectral width {expected_w}"
            )

    # Pre-compute the penalty matrix once for the entire batch.
    n = intensities.shape[-1]

    if wavenumbers is not None and differences <= 2:
        if differences == 1:
            D = _build_nonuniform_diff1(wavenumbers)
        else:
            D = _build_nonuniform_diff2(wavenumbers)
    else:
        D = sparse.eye(n, format="csc")
        for _ in range(differences):
            D = D[1:] - D[:-1]

    penalty_z = sparse.eye(n, format="csc") + lam * D.T @ D

    return apply_along_spectra(
        _smooth_whittaker_1d,
        intensities,
        penalty_z=penalty_z,
    )


def _build_nonuniform_diff1(wavenumbers: np.ndarray) -> sparse.csc_matrix:
    """Build first-order finite difference matrix for non-uniform spacing.

    D1[i, i]   = -1 / dx[i]
    D1[i, i+1] =  1 / dx[i]

    where dx[i] = |x[i+1] - x[i]|.
    """
    n = len(wavenumbers)
    dx = np.abs(np.diff(wavenumbers))
    dx = np.where(dx < 1e-15, 1e-15, dx)  # guard against zero spacing
    d_neg = -1.0 / dx
    d_pos = 1.0 / dx
    return sparse.diags([d_neg, d_pos], [0, 1], shape=(n - 1, n), format="csc")


def _build_nonuniform_diff2(wavenumbers: np.ndarray) -> sparse.csc_matrix:
    """Build second-order finite difference matrix for non-uniform spacing.

    For interior point i (1 <= i <= n-2):
        D2[i-1, i-1] =  2 / (h0 * (h0 + h1))
        D2[i-1, i]   = -2 / (h0 * h1)
        D2[i-1, i+1] =  2 / (h1 * (h0 + h1))

    where h0 = |x[i] - x[i-1]|, h1 = |x[i+1] - x[i]|.
    """
    n = len(wavenumbers)
    dx = np.abs(np.diff(wavenumbers))
    dx = np.where(dx < 1e-15, 1e-15, dx)  # guard against zero spacing

    h0 = dx[:-1]  # h_{i-1}
    h1 = dx[1:]  # h_i

    d0 = 2.0 / (h0 * (h0 + h1))
    d1 = -2.0 / (h0 * h1)
    d2 = 2.0 / (h1 * (h0 + h1))

    return sparse.diags([d0, d1, d2], [0, 1, 2], shape=(n - 2, n), format="csc")


def _smooth_whittaker_1d(
    intensities: np.ndarray,
    penalty_z: sparse.spmatrix,
) -> np.ndarray:
    """Whittaker smoother for a single 1-D spectrum."""
    return spsolve(penalty_z, intensities)  # type: ignore[no-any-return]
