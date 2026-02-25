"""Asymmetrically Reweighted Penalized Least Squares (ArPLS) baseline.

Reference:
    Baek, S.-J.; Park, A.; Ahn, Y.-J.; Choo, J. (2015).
    Baseline correction using asymmetrically reweighted penalized
    least squares smoothing. Analyst, 140(1), 250-257.
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
DEFAULT_MAX_ITER = 50
DEFAULT_TOL = 1e-6


def baseline_arpls(
    intensities: np.ndarray,
    lam: float = DEFAULT_LAMBDA,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
    return_info: bool = False,
) -> np.ndarray | ConvergenceInfo:
    """Estimate baseline using Asymmetrically Reweighted PLS (ArPLS).

    Unlike standard ALS which uses a fixed asymmetry parameter *p*,
    ArPLS adaptively reweights based on the residual distribution.
    Points below the fitted baseline are given exponentially
    increasing weights, producing more robust estimates for spectra
    with varying peak densities.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        lam: Smoothness parameter (lambda). Larger = smoother.
            Typical range: 1e4 to 1e9.
        max_iter: Maximum number of iterations.
        tol: Convergence tolerance on weight change.
        return_info: If ``True``, return a :class:`ConvergenceInfo`
            object. Only supported for 1-D input.

    Returns:
        Estimated baseline (same shape as input), or
        :class:`ConvergenceInfo` if ``return_info=True``.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
        ValueError: If ``lam`` or ``max_iter`` are invalid.

    Examples:
        >>> corrected = intensities - baseline_arpls(intensities)
        >>> info = baseline_arpls(intensities, return_info=True)
        >>> print(info.iterations, info.converged)
    """
    if lam <= 0:
        raise ValueError(f"lam (smoothness) must be positive, got {lam}")
    if max_iter < 1:
        raise ValueError(f"max_iter must be >= 1, got {max_iter}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    # Pre-compute the penalty matrix H = lam * D'D once.
    # Same for every spectrum in a batch (depends only on length and lam).
    n = intensities.shape[-1]
    D = sparse.diags([1, -2, 1], [0, 1, 2], shape=(n - 2, n))
    H = lam * D.T @ D

    if return_info:
        if intensities.ndim != 1:
            raise ValueError("return_info=True is only supported for 1-D input")
        return _baseline_arpls_1d_info(intensities, penalty=H, max_iter=max_iter, tol=tol)

    return apply_along_spectra(
        _baseline_arpls_1d, intensities, penalty=H, max_iter=max_iter, tol=tol
    )


def _baseline_arpls_1d(
    intensities: np.ndarray,
    penalty: sparse.spmatrix,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
) -> np.ndarray:
    """ArPLS baseline for a single 1-D spectrum."""
    n = len(intensities)
    w = np.ones(n)
    y = intensities

    for _ in range(max_iter):
        W = sparse.diags(w, 0)
        Z = W + penalty
        z = spsolve(Z, w * y)

        # Residuals: negative = below baseline
        d = y - z
        d_neg = d[d < 0]

        if len(d_neg) == 0:
            break

        # Adaptive reweighting: sigmoid of standardized negative residuals
        m = np.mean(d_neg)
        s = np.std(d_neg, ddof=1) if len(d_neg) > 1 else 1.0
        if s < 1e-10:
            s = 1.0
        exponent = np.clip(2.0 * (d - (2.0 * s - m)) / s, -500.0, 500.0)
        w_new = 1.0 / (1.0 + np.exp(exponent))

        if np.sum(np.abs(w_new - w)) < tol:
            break
        w = w_new

    return z  # type: ignore[no-any-return]


def _baseline_arpls_1d_info(
    intensities: np.ndarray,
    penalty: sparse.spmatrix,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
) -> ConvergenceInfo:
    """ArPLS baseline for a single 1-D spectrum, returning convergence info."""
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

        d = y - z
        d_neg = d[d < 0]

        if len(d_neg) == 0:
            converged = True
            residual = 0.0
            break

        m = np.mean(d_neg)
        s = np.std(d_neg, ddof=1) if len(d_neg) > 1 else 1.0
        if s < 1e-10:
            s = 1.0
        exponent = np.clip(2.0 * (d - (2.0 * s - m)) / s, -500.0, 500.0)
        w_new = 1.0 / (1.0 + np.exp(exponent))

        residual = float(np.sum(np.abs(w_new - w)))
        if residual < tol:
            converged = True
            break
        w = w_new

    return ConvergenceInfo(
        iterations=iteration,
        converged=converged,
        final_residual=residual,
        baseline=z,
    )
