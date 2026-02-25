"""Polynomial baseline fitting."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import (
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    warn_if_not_finite,
)
from spectrakit.convergence import ConvergenceInfo

logger = logging.getLogger(__name__)

DEFAULT_DEGREE = 5
DEFAULT_MAX_ITER = 100
DEFAULT_TOL = 1e-3


def baseline_polynomial(
    intensities: np.ndarray,
    degree: int = DEFAULT_DEGREE,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
    return_info: bool = False,
) -> np.ndarray | ConvergenceInfo:
    """Estimate baseline using iterative polynomial fitting.

    Fits a polynomial, then iteratively removes points above it
    (peaks) and refits until convergence.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).
        degree: Polynomial degree. Higher = more complex baselines.
        max_iter: Maximum iterations for peak-removal loop.
        tol: Convergence tolerance (fraction of points changed).
        return_info: If ``True``, return a :class:`ConvergenceInfo`
            object. Only supported for 1-D input.

    Returns:
        Estimated baseline (same shape as input), or
        :class:`ConvergenceInfo` if ``return_info=True``.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    if degree < 0:
        raise ValueError(f"degree must be non-negative, got {degree}")
    if max_iter < 1:
        raise ValueError(f"max_iter must be >= 1, got {max_iter}")
    if tol <= 0:
        raise ValueError(f"tol must be positive, got {tol}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if return_info:
        if intensities.ndim != 1:
            raise ValueError("return_info=True is only supported for 1-D input")
        return _baseline_polynomial_1d_info(intensities, degree=degree, max_iter=max_iter, tol=tol)

    return apply_along_spectra(
        _baseline_polynomial_1d, intensities, degree=degree, max_iter=max_iter, tol=tol
    )


def _baseline_polynomial_1d(
    intensities: np.ndarray,
    degree: int = DEFAULT_DEGREE,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
) -> np.ndarray:
    """Iterative polynomial baseline for a single 1-D spectrum."""
    n = len(intensities)
    x = np.arange(n, dtype=np.float64)
    y = intensities
    mask = np.ones(n, dtype=bool)

    for _ in range(max_iter):
        coeffs = np.polyfit(x[mask], y[mask], degree)
        baseline = np.polyval(coeffs, x)

        new_mask = y <= baseline
        if np.sum(new_mask != mask) / n < tol:
            break
        mask = new_mask  # type: ignore[assignment]

        if np.sum(mask) < degree + 1:
            break

    return baseline


def _baseline_polynomial_1d_info(
    intensities: np.ndarray,
    degree: int = DEFAULT_DEGREE,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
) -> ConvergenceInfo:
    """Iterative polynomial baseline, returning convergence info."""
    n = len(intensities)
    x = np.arange(n, dtype=np.float64)
    y = intensities
    mask = np.ones(n, dtype=bool)
    converged = False
    residual = 1.0
    iteration = 0

    for _i in range(1, max_iter + 1):
        iteration = _i
        coeffs = np.polyfit(x[mask], y[mask], degree)
        baseline = np.polyval(coeffs, x)

        new_mask = y <= baseline
        residual = float(np.sum(new_mask != mask)) / n
        if residual < tol:
            converged = True
            break
        mask = new_mask  # type: ignore[assignment]

        if np.sum(mask) < degree + 1:
            break

    return ConvergenceInfo(
        iterations=iteration,
        converged=converged,
        final_residual=residual,
        baseline=baseline,
    )
