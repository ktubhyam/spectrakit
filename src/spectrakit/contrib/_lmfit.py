"""lmfit backend for spectral peak fitting.

Wraps the ``lmfit`` library (BSD-3 license) to provide curve fitting
of spectral peaks with Gaussian, Lorentzian, Voigt, and other models.

Install with::

    pip install spectrakit[fitting]

Reference:
    Newville, M. et al. (2024). lmfit: Non-Linear Least-Squares
    Minimization and Curve-Fitting for Python.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any

import numpy as np

from spectrakit._validate import ensure_float64
from spectrakit.exceptions import DependencyError

logger = logging.getLogger(__name__)

SUPPORTED_MODELS = {
    "gaussian": "GaussianModel",
    "lorentzian": "LorentzianModel",
    "voigt": "VoigtModel",
    "pseudo_voigt": "PseudoVoigtModel",
}


@dataclass
class FitResult:
    """Container for peak fitting results.

    Attributes:
        best_fit: Fitted curve, shape ``(W,)``.
        components: Individual peak components, list of arrays.
        parameters: Fitted parameter values per peak.
        residual: Residual (data - fit), shape ``(W,)``.
        success: Whether the fit converged.
    """

    best_fit: np.ndarray
    components: list[np.ndarray]
    parameters: list[dict[str, float]]
    residual: np.ndarray
    success: bool
    info: dict[str, Any] = field(default_factory=dict)


def _get_lmfit() -> Any:
    """Import lmfit, raising DependencyError if missing."""
    try:
        import lmfit

        return lmfit
    except ImportError as e:
        raise DependencyError(
            "lmfit is required for peak fitting. Install with: pip install spectrakit[fitting]"
        ) from e


def fit_peaks(
    intensities: np.ndarray,
    wavenumbers: np.ndarray,
    peak_positions: list[float],
    model: str = "gaussian",
    **kwargs: Any,
) -> FitResult:
    """Fit spectral peaks using lmfit models.

    Creates a composite model of multiple peaks and fits them to the
    data. Each peak is initialized near the specified position.

    Args:
        intensities: Spectral intensities, shape ``(W,)``.
        wavenumbers: Wavenumber axis, shape ``(W,)``.
        peak_positions: Approximate peak center positions in
            wavenumber units.
        model: Peak shape model. One of ``"gaussian"``,
            ``"lorentzian"``, ``"voigt"``, ``"pseudo_voigt"``.
        **kwargs: Additional keyword arguments passed to ``lmfit.Model.fit``.

    Returns:
        ``FitResult`` with the best fit, individual components,
        parameters, and residual.

    Raises:
        DependencyError: If lmfit is not installed.
        ValueError: If the model name is not supported.
    """
    lmfit = _get_lmfit()
    intensities = ensure_float64(intensities)
    wavenumbers = ensure_float64(wavenumbers)

    if model not in SUPPORTED_MODELS:
        raise ValueError(f"Unknown model '{model}'. Supported: {list(SUPPORTED_MODELS.keys())}")

    model_class = getattr(lmfit.models, SUPPORTED_MODELS[model])

    # Build composite model
    composite = None
    params = lmfit.Parameters()

    for i, center in enumerate(peak_positions):
        prefix = f"p{i}_"
        peak_model = model_class(prefix=prefix)

        if composite is None:
            composite = peak_model
        else:
            composite = composite + peak_model

        # Initialize parameters near the peak position
        peak_height = float(intensities[np.argmin(np.abs(wavenumbers - center))])
        params.update(peak_model.make_params())
        params[f"{prefix}center"].set(value=center)
        params[f"{prefix}amplitude"].set(value=peak_height, min=0)

    if composite is None:
        raise ValueError("At least one peak position is required")

    result = composite.fit(intensities, params, x=wavenumbers, **kwargs)

    # Extract components
    components = []
    param_list = []
    for i in range(len(peak_positions)):
        prefix = f"p{i}_"
        component_params = {
            k.replace(prefix, ""): v.value for k, v in result.params.items() if k.startswith(prefix)
        }
        param_list.append(component_params)

        # Evaluate individual component
        comp_model = model_class(prefix=prefix)
        comp_vals = comp_model.eval(
            params=result.params,
            x=wavenumbers,
        )
        components.append(comp_vals)

    return FitResult(
        best_fit=result.best_fit,
        components=components,
        parameters=param_list,
        residual=intensities - result.best_fit,
        success=result.success,
        info={"redchi": result.redchi, "aic": result.aic, "bic": result.bic},
    )
