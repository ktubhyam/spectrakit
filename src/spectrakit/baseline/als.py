"""Asymmetric Least Squares (ALS) baseline correction.

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
from spectrakit.convergence import ConvergenceInfo

logger = logging.getLogger(__name__)

DEFAULT_LAMBDA = 1e6
DEFAULT_P = 0.01
DEFAULT_MAX_ITER = 10
DEFAULT_TOL = 1e-6


def baseline_als(
    intensities: np.ndarray,
    lam: float = DEFAULT_LAMBDA,
    p: float = DEFAULT_P,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
    return_info: bool = False,
) -> np.ndarray | ConvergenceInfo:
    """Estimate baseline using Asymmetric Least Squares smoothing.

    Iteratively fits a smooth baseline by penalizing deviations
    asymmetrically: points above the baseline are penalized less
    (weight p) than points below (weight 1-p).

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).
        lam: Smoothness parameter (lambda). Larger = smoother.
            Typical range: 1e4 to 1e9.
        p: Asymmetry parameter. Smaller values push baseline lower.
            Typical range: 0.001 to 0.05.
        max_iter: Maximum number of iterations.
        tol: Convergence tolerance on weight change.
        return_info: If ``True``, return a :class:`ConvergenceInfo`
            object with iteration count, convergence status, and
            baseline. Only supported for 1-D input.

    Returns:
        Estimated baseline (same shape as input), or
        :class:`ConvergenceInfo` if ``return_info=True``.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.

    Examples:
        >>> corrected = intensities - baseline_als(intensities)
        >>> info = baseline_als(intensities, return_info=True)
        >>> print(info.iterations, info.converged)
    """
    if not 0 < p < 1:
        raise ValueError(f"p (asymmetry) must be in (0, 1), got {p}")
    if lam <= 0:
        raise ValueError(f"lam (smoothness) must be positive, got {lam}")
    if max_iter < 1:
        raise ValueError(f"max_iter must be >= 1, got {max_iter}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    # Pre-compute the penalty matrix H = lam * D'D once.
    # This is the same for every spectrum in a batch since it depends
    # only on spectrum length and lam.
    n = intensities.shape[-1]
    D = sparse.diags([1, -2, 1], [0, 1, 2], shape=(n - 2, n))
    H = lam * D.T @ D

    if return_info:
        if intensities.ndim != 1:
            raise ValueError("return_info=True is only supported for 1-D input")
        return _baseline_als_1d_info(intensities, penalty=H, p=p, max_iter=max_iter, tol=tol)

    return apply_along_spectra(
        _baseline_als_1d, intensities, penalty=H, p=p, max_iter=max_iter, tol=tol
    )


def _baseline_als_1d(
    intensities: np.ndarray,
    penalty: sparse.spmatrix,
    p: float = DEFAULT_P,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
) -> np.ndarray:
    """ALS baseline for a single 1-D spectrum."""
    n = len(intensities)
    w = np.ones(n)
    y = intensities

    for _ in range(max_iter):
        W = sparse.diags(w, 0)
        Z = W + penalty
        z = spsolve(Z, w * y)

        w_new = np.where(y > z, p, 1.0 - p)
        if np.sum(np.abs(w_new - w)) < tol:
            break
        w = w_new  # type: ignore[assignment]

    return z  # type: ignore[no-any-return]


def _baseline_als_1d_info(
    intensities: np.ndarray,
    penalty: sparse.spmatrix,
    p: float = DEFAULT_P,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
) -> ConvergenceInfo:
    """ALS baseline for a single 1-D spectrum, returning convergence info."""
    n = len(intensities)
    w = np.ones(n)
    y = intensities
    converged = False
    residual = float("inf")
    iteration = 0

    for _i in range(1, max_iter + 1):
        iteration = _i
        W = sparse.diags(w, 0)
        Z = W + penalty
        z = spsolve(Z, w * y)

        w_new = np.where(y > z, p, 1.0 - p)
        residual = float(np.sum(np.abs(w_new - w)))
        if residual < tol:
            converged = True
            break
        w = w_new  # type: ignore[assignment]

    return ConvergenceInfo(
        iterations=iteration,
        converged=converged,
        final_residual=residual,
        baseline=z,
    )
