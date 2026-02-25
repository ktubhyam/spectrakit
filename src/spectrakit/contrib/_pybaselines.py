"""pybaselines backend for 50+ baseline correction methods.

Wraps the ``pybaselines`` library (BSD-3 license) to provide access
to its comprehensive collection of baseline algorithms through
SpectraKit's functional API.

Install with::

    pip install spectrakit[baselines]

Reference:
    Erb, D. (2022). pybaselines: A Python Library of Algorithms for
    the Baseline Correction of Experimental Data.
"""

from __future__ import annotations

import logging
from typing import Any

import numpy as np

from spectrakit._validate import apply_along_spectra, ensure_float64, validate_1d_or_2d
from spectrakit.exceptions import DependencyError

logger = logging.getLogger(__name__)

_PYBASELINES_CATEGORIES = {
    "polynomial": [
        "poly",
        "modpoly",
        "imodpoly",
        "penalized_poly",
        "quant_reg",
        "goldindec",
    ],
    "whittaker": [
        "asls",
        "iasls",
        "airpls",
        "arpls",
        "drpls",
        "iarpls",
        "aspls",
        "psalsa",
    ],
    "morphological": [
        "mpls",
        "mor",
        "imor",
        "mormol",
        "amormol",
        "rolling_ball",
        "mwmv",
        "tophat",
    ],
    "smooth": [
        "noise_median",
        "snip",
        "swima",
        "ipsa",
        "ria",
    ],
    "spline": [
        "mixture_model",
        "irsqr",
        "corner_cutting",
        "pspline_asls",
        "pspline_airpls",
        "pspline_arpls",
        "pspline_iarpls",
        "pspline_psalsa",
    ],
}


def _get_pybaselines() -> Any:
    """Import and return pybaselines.Baseline, raising DependencyError if missing."""
    try:
        from pybaselines import Baseline

        return Baseline
    except ImportError as e:
        raise DependencyError(
            "pybaselines is required for the contrib baseline backend. "
            "Install with: pip install spectrakit[baselines]"
        ) from e


def pybaselines_method(
    intensities: np.ndarray,
    method: str,
    **kwargs: Any,
) -> np.ndarray:
    """Apply any pybaselines method through a unified interface.

    Args:
        intensities: Spectral intensities, shape ``(W,)`` or ``(N, W)``.
        method: Name of the pybaselines method (e.g., ``"asls"``,
            ``"airpls"``, ``"mor"``).
        **kwargs: Keyword arguments forwarded to the pybaselines method.

    Returns:
        Estimated baseline, same shape as intensities.

    Raises:
        DependencyError: If pybaselines is not installed.
        ValueError: If the method name is not recognized.
    """
    Baseline = _get_pybaselines()
    intensities = ensure_float64(intensities)
    validate_1d_or_2d(intensities)

    return apply_along_spectra(
        _pybaselines_1d,
        intensities,
        method=method,
        Baseline=Baseline,
        **kwargs,
    )


def _pybaselines_1d(
    intensities: np.ndarray,
    method: str,
    Baseline: Any,
    **kwargs: Any,
) -> np.ndarray:
    """Apply a single pybaselines method to a 1-D spectrum."""
    baseline_fitter = Baseline(x_data=np.arange(len(intensities)))

    # Find the method on the fitter
    fn = getattr(baseline_fitter, method, None)
    if fn is None:
        raise ValueError(
            f"Unknown pybaselines method: '{method}'. "
            f"Available categories: {list(_PYBASELINES_CATEGORIES.keys())}"
        )

    result = fn(intensities, **kwargs)
    # pybaselines returns (baseline, params_dict)
    return result[0]


def list_pybaselines_methods() -> dict[str, list[str]]:
    """Return a dictionary of available pybaselines methods by category.

    Returns:
        Dict mapping category names to lists of method names.
    """
    return dict(_PYBASELINES_CATEGORIES)
