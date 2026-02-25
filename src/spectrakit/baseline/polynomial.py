"""Polynomial baseline fitting."""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import apply_along_spectra, ensure_float64, validate_1d_or_2d

logger = logging.getLogger(__name__)

DEFAULT_DEGREE = 5
DEFAULT_MAX_ITER = 100
DEFAULT_TOL = 1e-3


def baseline_polynomial(
    intensities: np.ndarray,
    degree: int = DEFAULT_DEGREE,
    max_iter: int = DEFAULT_MAX_ITER,
    tol: float = DEFAULT_TOL,
) -> np.ndarray:
    """Estimate baseline using iterative polynomial fitting.

    Fits a polynomial, then iteratively removes points above it
    (peaks) and refits until convergence.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).
        degree: Polynomial degree. Higher = more complex baselines.
        max_iter: Maximum iterations for peak-removal loop.
        tol: Convergence tolerance (fraction of points changed).

    Returns:
        Estimated baseline, same shape as intensities.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

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
        mask = new_mask

        if np.sum(mask) < degree + 1:
            break

    return baseline
