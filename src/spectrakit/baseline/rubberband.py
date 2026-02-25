"""Rubberband (convex hull) baseline correction."""

from __future__ import annotations

import logging

import numpy as np
from scipy.interpolate import interp1d
from scipy.spatial import ConvexHull

from spectrakit._validate import (
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    warn_if_not_finite,
)

logger = logging.getLogger(__name__)


def baseline_rubberband(intensities: np.ndarray) -> np.ndarray:
    """Estimate baseline using the rubberband (convex hull) method.

    Computes the lower convex hull of the spectrum and interpolates
    between the hull vertices to form the baseline.

    Args:
        intensities: Spectral intensities, shape (W,) or (N, W).

    Returns:
        Estimated baseline, same shape as intensities.

    Raises:
        SpectrumShapeError: If input is not 1-D or 2-D.
        EmptySpectrumError: If input has zero elements.
    """
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)
    warn_if_not_finite(intensities)

    return apply_along_spectra(_baseline_rubberband_1d, intensities)


def _baseline_rubberband_1d(intensities: np.ndarray) -> np.ndarray:
    """Rubberband baseline for a single 1-D spectrum."""
    n = len(intensities)
    x = np.arange(n)

    points = np.column_stack([x, intensities])
    low_val = intensities.min() - 1.0
    points_ext = np.vstack(
        [
            points,
            [0, low_val],
            [n - 1, low_val],
        ]
    )

    hull = ConvexHull(points_ext)

    hull_vertices = set(hull.vertices)
    lower_vertices = sorted(
        i
        for i in hull_vertices
        if i < n and (i == 0 or i == n - 1 or intensities[i] <= np.median(intensities))
    )

    if 0 not in lower_vertices:
        lower_vertices = [0, *lower_vertices]
    if n - 1 not in lower_vertices:
        lower_vertices = [*lower_vertices, n - 1]

    lower_vertices = sorted(set(lower_vertices))

    f = interp1d(
        x[lower_vertices],
        intensities[lower_vertices],
        kind="linear",
        fill_value="extrapolate",
    )
    return f(x)  # type: ignore[no-any-return]
