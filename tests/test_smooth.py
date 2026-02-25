"""Tests for spectral smoothing methods."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError
from spectrakit.smooth import smooth_savgol, smooth_whittaker


class TestSmoothSavgol:
    """Verify Savitzky-Golay smoothing."""

    def test_output_shape_1d(self) -> None:
        y = np.random.default_rng(42).random(100)
        result = smooth_savgol(y)
        assert result.shape == y.shape

    def test_output_shape_2d(self) -> None:
        y = np.random.default_rng(42).random((5, 100))
        result = smooth_savgol(y)
        assert result.shape == y.shape

    def test_reduces_noise(self) -> None:
        rng = np.random.default_rng(42)
        x = np.linspace(0, 10, 200)
        clean = np.sin(x)
        noisy = clean + rng.normal(0, 0.1, size=200)

        smoothed = smooth_savgol(noisy, window_length=15, polyorder=3)

        noise_before = np.std(noisy - clean)
        noise_after = np.std(smoothed - clean)
        assert noise_after < noise_before

    def test_preserves_smooth_signal(self) -> None:
        """A smooth signal should be largely unchanged."""
        x = np.linspace(0, 2 * np.pi, 100)
        y = np.sin(x)

        smoothed = smooth_savgol(y, window_length=5, polyorder=3)
        np.testing.assert_allclose(smoothed, y, atol=0.01)

    def test_accepts_list_input(self) -> None:
        result = smooth_savgol([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0])
        assert isinstance(result, np.ndarray)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            smooth_savgol(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            smooth_savgol(np.ones((2, 3, 4)))


class TestSmoothWhittaker:
    """Verify Whittaker smoother."""

    def test_output_shape_1d(self) -> None:
        y = np.random.default_rng(42).random(100)
        result = smooth_whittaker(y)
        assert result.shape == y.shape

    def test_output_shape_2d(self) -> None:
        y = np.random.default_rng(42).random((5, 100))
        result = smooth_whittaker(y)
        assert result.shape == y.shape

    def test_reduces_noise(self) -> None:
        rng = np.random.default_rng(42)
        x = np.linspace(0, 10, 200)
        clean = np.sin(x)
        noisy = clean + rng.normal(0, 0.1, size=200)

        smoothed = smooth_whittaker(noisy, lam=1e4)

        noise_before = np.std(noisy - clean)
        noise_after = np.std(smoothed - clean)
        assert noise_after < noise_before

    def test_higher_lambda_smoother(self) -> None:
        """Higher lambda should produce a smoother result."""
        rng = np.random.default_rng(42)
        y = rng.random(100)

        smooth_low = smooth_whittaker(y, lam=1e2)
        smooth_high = smooth_whittaker(y, lam=1e6)

        # Higher lambda → smaller second derivative → smoother
        roughness_low = np.sum(np.diff(smooth_low, n=2) ** 2)
        roughness_high = np.sum(np.diff(smooth_high, n=2) ** 2)
        assert roughness_high < roughness_low

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            smooth_whittaker(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            smooth_whittaker(np.ones((2, 3, 4)))
