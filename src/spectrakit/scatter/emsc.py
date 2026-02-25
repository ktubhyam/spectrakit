"""Extended Multiplicative Signal Correction (EMSC).

Reference:
    Martens, H.; Stark, E. (1991). Extended multiplicative signal
    correction and spectral interference subtraction: new preprocessing
    methods for near infrared spectroscopy. Journal of Pharmaceutical
    and Biomedical Analysis, 9(8), 625-635.
"""

from __future__ import annotations

import logging

import numpy as np

from spectrakit._validate import EPSILON, ensure_float64, validate_1d_or_2d, warn_if_not_finite

logger = logging.getLogger(__name__)

DEFAULT_POLY_ORDER = 2


def scatter_emsc(
    intensities: np.ndarray,
    reference: np.ndarray | None = None,
    poly_order: int = DEFAULT_POLY_ORDER,
) -> np.ndarray:
    """Apply Extended Multiplicative Signal Correction.

    Extends MSC by also modeling polynomial baseline variations.
    Fits each spectrum as a linear combination of the reference
    spectrum plus orthogonal polynomial (Legendre) terms, then
    corrects by removing the polynomial and scatter contributions.

    Uses Legendre polynomials instead of monomials for improved
    numerical conditioning of the design matrix.

    Args:
        intensities: Spectral intensities, shape ``(N, W)`` for a batch
            or ``(W,)`` for a single spectrum (requires ``reference``).
        reference: Reference spectrum, shape ``(W,)``. If ``None``,
            uses the mean of the batch.
        poly_order: Maximum polynomial order for baseline modeling.
            Set to 0 to disable polynomial correction (equivalent to MSC).

    Returns:
        EMSC-corrected intensities, same shape as input.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
        ValueError: If a single spectrum is provided without a reference,
            or if ``poly_order`` is negative.
    """
    if poly_order < 0:
        raise ValueError(f"poly_order must be non-negative, got {poly_order}")

    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    if intensities.ndim == 1:
        if reference is None:
            raise ValueError(
                "reference is required for single-spectrum EMSC. "
                "Pass a batch (N, W) array or provide a reference spectrum."
            )
        reference = ensure_float64(reference)
        return _emsc_single(intensities, reference, poly_order)

    if reference is None:
        reference = np.mean(intensities, axis=0)
    else:
        reference = ensure_float64(reference)

    return np.array([_emsc_single(row, reference, poly_order) for row in intensities])


def _emsc_single(
    spectrum: np.ndarray,
    reference: np.ndarray,
    poly_order: int,
) -> np.ndarray:
    """EMSC correction for a single spectrum.

    Uses Legendre polynomials for the baseline basis, which are
    orthogonal on [-1, 1] and provide much better numerical
    conditioning than monomial powers (1, x, x^2, ...).
    """
    n = len(spectrum)
    x = np.linspace(-1, 1, n)

    # Build design matrix: [reference, P0(x), P1(x), ..., P_poly_order(x)]
    # where P_k are Legendre polynomials (orthogonal on [-1, 1]).
    poly_basis = np.polynomial.legendre.legvander(x, poly_order)
    design_matrix = np.column_stack([reference, poly_basis])

    # Least squares fit
    coeffs, _, _, _ = np.linalg.lstsq(design_matrix, spectrum, rcond=None)

    # Extract multiplicative factor (coefficient of reference)
    b = coeffs[0]

    if abs(b) < EPSILON:
        # Can't correct, return spectrum minus polynomial baseline
        baseline = design_matrix[:, 1:] @ coeffs[1:]
        return spectrum - baseline  # type: ignore[no-any-return]

    # Corrected = (spectrum - polynomial_baseline) / b
    polynomial_and_intercept = design_matrix[:, 1:] @ coeffs[1:]
    return (spectrum - polynomial_and_intercept) / b  # type: ignore[no-any-return]
