"""Tests for lmfit contrib backend."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.contrib._lmfit import SUPPORTED_MODELS, fit_peaks

lmfit = pytest.importorskip("lmfit", reason="lmfit not installed")


class TestFitPeaks:
    """Verify lmfit peak fitting backend."""

    def _make_gaussian(self, x: np.ndarray, center: float, amp: float, sigma: float) -> np.ndarray:
        return amp * np.exp(-((x - center) ** 2) / (2 * sigma**2))

    def test_single_gaussian(self) -> None:
        x = np.linspace(0, 100, 500)
        y = self._make_gaussian(x, 50, 2.0, 5.0) + np.random.default_rng(42).normal(0, 0.01, 500)

        result = fit_peaks(y, x, peak_positions=[50.0], model="gaussian")
        assert result.success
        assert result.best_fit.shape == y.shape
        assert len(result.components) == 1
        assert len(result.parameters) == 1
        assert abs(result.parameters[0]["center"] - 50.0) < 2.0

    def test_two_gaussians(self) -> None:
        x = np.linspace(0, 100, 500)
        y = self._make_gaussian(x, 30, 1.5, 3.0) + self._make_gaussian(x, 70, 2.0, 4.0)

        result = fit_peaks(y, x, peak_positions=[30.0, 70.0], model="gaussian")
        assert result.success
        assert len(result.components) == 2
        assert len(result.parameters) == 2

    def test_lorentzian_model(self) -> None:
        x = np.linspace(0, 100, 500)
        y = 1.0 / (1 + ((x - 50) / 5) ** 2) + 0.01

        result = fit_peaks(y, x, peak_positions=[50.0], model="lorentzian")
        assert result.success
        assert result.best_fit.shape == y.shape

    def test_residual_shape(self) -> None:
        x = np.linspace(0, 100, 500)
        y = self._make_gaussian(x, 50, 2.0, 5.0)

        result = fit_peaks(y, x, peak_positions=[50.0])
        assert result.residual.shape == y.shape
        # Good fit should have small residuals
        assert np.max(np.abs(result.residual)) < 0.5

    def test_fit_info(self) -> None:
        x = np.linspace(0, 100, 500)
        y = self._make_gaussian(x, 50, 2.0, 5.0)

        result = fit_peaks(y, x, peak_positions=[50.0])
        assert "redchi" in result.info
        assert "aic" in result.info

    def test_unknown_model_raises(self) -> None:
        with pytest.raises(ValueError, match="Unknown model"):
            fit_peaks(np.ones(100), np.arange(100), [50.0], model="invalid")

    def test_supported_models_dict(self) -> None:
        assert "gaussian" in SUPPORTED_MODELS
        assert "lorentzian" in SUPPORTED_MODELS
        assert "voigt" in SUPPORTED_MODELS
