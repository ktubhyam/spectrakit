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
) -> np.ndarray:
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

    Returns:
        Estimated baseline, same shape as intensities.

    Examples:
        >>> corrected = intensities - baseline_als(intensities)
    """
    if intensities.ndim == 2:
        return np.array([
            baseline_als(row, lam=lam, p=p, max_iter=max_iter, tol=tol)
            for row in intensities
        ])

    n = len(intensities)
    D = sparse.diags([1, -2, 1], [0, 1, 2], shape=(n - 2, n))
    H = lam * D.T @ D

    w = np.ones(n)
    y = intensities.astype(np.float64)

    for _ in range(max_iter):
        W = sparse.diags(w, 0)
        Z = W + H
        z = spsolve(Z, w * y)

        w_new = np.where(y > z, p, 1.0 - p)
        if np.sum(np.abs(w_new - w)) < tol:
            break
        w = w_new

    return z
