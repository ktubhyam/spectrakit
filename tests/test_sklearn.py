"""Tests for scikit-learn transformer wrappers."""

from __future__ import annotations

import numpy as np
import pytest

sklearn = pytest.importorskip("sklearn", reason="scikit-learn not installed")

from spectrakit.normalize import normalize_snv  # noqa: E402
from spectrakit.sklearn import SpectralTransformer  # noqa: E402
from spectrakit.smooth import smooth_savgol  # noqa: E402


class TestSpectralTransformer:
    """Verify sklearn-compatible transformer."""

    def test_transform_applies_function(self) -> None:
        X = np.random.default_rng(42).random((10, 100))
        transformer = SpectralTransformer(normalize_snv)
        result = transformer.fit_transform(X)
        expected = normalize_snv(X)
        np.testing.assert_array_equal(result, expected)

    def test_transform_with_kwargs(self) -> None:
        X = np.random.default_rng(42).random((5, 100))
        transformer = SpectralTransformer(smooth_savgol, window_length=7, polyorder=2)
        result = transformer.fit_transform(X)
        expected = smooth_savgol(X, window_length=7, polyorder=2)
        np.testing.assert_array_equal(result, expected)

    def test_fit_returns_self(self) -> None:
        X = np.ones((5, 100))
        transformer = SpectralTransformer(normalize_snv)
        result = transformer.fit(X)
        assert result is transformer

    def test_get_params(self) -> None:
        transformer = SpectralTransformer(smooth_savgol, window_length=11)
        params = transformer.get_params()
        assert params["func"] is smooth_savgol
        assert params["window_length"] == 11

    def test_set_params(self) -> None:
        transformer = SpectralTransformer(smooth_savgol, window_length=5)
        transformer.set_params(window_length=11)
        assert transformer.kwargs["window_length"] == 11

    def test_set_params_func_replacement(self) -> None:
        """set_params can replace the wrapped function."""
        transformer = SpectralTransformer(smooth_savgol, window_length=5)
        transformer.set_params(func=normalize_snv)
        assert transformer.func is normalize_snv

    def test_repr(self) -> None:
        transformer = SpectralTransformer(normalize_snv)
        assert "normalize_snv" in repr(transformer)

    def test_repr_with_params(self) -> None:
        transformer = SpectralTransformer(smooth_savgol, window_length=11)
        r = repr(transformer)
        assert "smooth_savgol" in r
        assert "window_length=11" in r

    def test_in_sklearn_pipeline(self) -> None:
        """Verify it works inside an actual sklearn Pipeline."""
        from sklearn.pipeline import Pipeline as SkPipeline

        X = np.random.default_rng(42).random((10, 100))

        pipe = SkPipeline(
            [
                ("smooth", SpectralTransformer(smooth_savgol, window_length=11)),
                ("normalize", SpectralTransformer(normalize_snv)),
            ]
        )

        result = pipe.fit_transform(X)
        assert result.shape == X.shape

        # Manual application should match
        expected = normalize_snv(smooth_savgol(X, window_length=11))
        np.testing.assert_array_equal(result, expected)

    def test_check_sklearn_function(self) -> None:
        """_check_sklearn returns base classes when sklearn is available."""
        from spectrakit.sklearn.transformers import _check_sklearn

        base_est, transformer_mixin = _check_sklearn()
        from sklearn.base import BaseEstimator, TransformerMixin

        assert base_est is BaseEstimator
        assert transformer_mixin is TransformerMixin

    def test_check_sklearn_missing_raises(self) -> None:
        """_check_sklearn raises DependencyError when sklearn is not importable."""
        import sys
        from unittest.mock import patch

        from spectrakit.exceptions import DependencyError
        from spectrakit.sklearn.transformers import _check_sklearn

        with (
            patch.dict(sys.modules, {"sklearn": None, "sklearn.base": None}),
            pytest.raises(DependencyError, match="scikit-learn"),
        ):
            _check_sklearn()

    def test_set_params_returns_self(self) -> None:
        """set_params should return self for chaining."""
        transformer = SpectralTransformer(normalize_snv)
        result = transformer.set_params(func=smooth_savgol)
        assert result is transformer

    def test_get_params_deep_false(self) -> None:
        """get_params(deep=False) returns the same as deep=True for this class."""
        transformer = SpectralTransformer(smooth_savgol, window_length=7)
        params = transformer.get_params(deep=False)
        assert params["func"] is smooth_savgol
        assert params["window_length"] == 7

    def test_instantiation_without_sklearn_raises(self) -> None:
        """SpectralTransformer raises DependencyError when _HAS_SKLEARN is False."""
        from unittest.mock import patch

        from spectrakit.exceptions import DependencyError

        with (
            patch("spectrakit.sklearn.transformers._HAS_SKLEARN", False),
            pytest.raises(DependencyError, match="scikit-learn"),
        ):
            SpectralTransformer(normalize_snv)
