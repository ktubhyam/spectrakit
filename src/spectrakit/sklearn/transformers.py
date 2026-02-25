"""scikit-learn compatible transformer wrappers for SpectraKit functions.

Allows any SpectraKit processing function to be used in a scikit-learn
Pipeline via the familiar fit/transform interface.
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from typing import Any

import numpy as np

from spectrakit.exceptions import DependencyError

logger = logging.getLogger(__name__)


def _check_sklearn() -> Any:
    """Import sklearn base classes, raising DependencyError if missing."""
    try:
        from sklearn.base import BaseEstimator, TransformerMixin

        return BaseEstimator, TransformerMixin
    except ImportError as e:
        raise DependencyError(
            "scikit-learn is required for sklearn transformers. "
            "Install with: pip install spectrakit[sklearn]"
        ) from e


# Import at class definition time would fail if sklearn isn't installed.
# Instead, we create the class dynamically or use a factory approach.
# For simplicity, we check at import and class instantiation time.

try:
    from sklearn.base import BaseEstimator, TransformerMixin

    _HAS_SKLEARN = True
except ImportError:  # pragma: no cover — fallback when sklearn not installed
    _HAS_SKLEARN = False
    BaseEstimator = object
    TransformerMixin = object


class SpectralTransformer(BaseEstimator, TransformerMixin):  # type: ignore[misc]
    """scikit-learn transformer wrapping any SpectraKit function.

    Wraps a SpectraKit processing function (e.g., ``baseline_als``,
    ``normalize_snv``, ``smooth_savgol``) as a scikit-learn compatible
    transformer that can be used in ``sklearn.pipeline.Pipeline``.

    Args:
        func: A SpectraKit processing function with signature
            ``func(intensities, **kwargs) -> np.ndarray``.
        **kwargs: Keyword arguments passed to ``func`` on each
            ``transform()`` call.

    Examples:
        >>> from sklearn.pipeline import Pipeline as SkPipeline
        >>> from spectrakit import baseline_als, normalize_snv
        >>> from spectrakit.sklearn import SpectralTransformer
        >>>
        >>> pipe = SkPipeline([
        ...     ("baseline", SpectralTransformer(baseline_als, lam=1e6)),
        ...     ("normalize", SpectralTransformer(normalize_snv)),
        ... ])
        >>> X_processed = pipe.fit_transform(X_raw)
    """

    def __init__(self, func: Callable[..., np.ndarray], **kwargs: Any) -> None:
        if not _HAS_SKLEARN:
            raise DependencyError(
                "scikit-learn is required for SpectralTransformer. "
                "Install with: pip install spectrakit[sklearn]"
            )
        self.func = func
        self.kwargs = kwargs

    def fit(
        self,
        X: np.ndarray,  # noqa: N803 — sklearn convention
        y: Any = None,
    ) -> SpectralTransformer:
        """No-op fit (stateless transformer).

        Args:
            X: Training data (ignored).
            y: Training labels (ignored).

        Returns:
            Self.
        """
        return self

    def transform(self, X: np.ndarray) -> np.ndarray:  # noqa: N803
        """Apply the wrapped SpectraKit function.

        Args:
            X: Input spectral data, shape ``(N, W)``.

        Returns:
            Processed spectral data, same shape.
        """
        return self.func(X, **self.kwargs)

    def get_params(self, deep: bool = True) -> dict[str, Any]:
        """Get transformer parameters (sklearn interface).

        Args:
            deep: If True, return nested params.

        Returns:
            Dict of parameters.
        """
        params: dict[str, Any] = {"func": self.func}
        params.update(self.kwargs)
        return params

    def set_params(self, **params: Any) -> SpectralTransformer:
        """Set transformer parameters (sklearn interface).

        Args:
            **params: Parameters to set.

        Returns:
            Self.
        """
        if "func" in params:
            self.func = params.pop("func")
        self.kwargs.update(params)
        return self

    def __repr__(self) -> str:
        func_name = getattr(self.func, "__name__", str(self.func))
        param_str = ", ".join(f"{k}={v!r}" for k, v in self.kwargs.items())
        if param_str:
            return f"SpectralTransformer({func_name}, {param_str})"
        return f"SpectralTransformer({func_name})"
