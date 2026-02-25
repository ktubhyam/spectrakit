"""Tests for baseline correction methods."""

from __future__ import annotations

import numpy as np

from spectrakit.baseline import (
    baseline_als,
    baseline_polynomial,
    baseline_rubberband,
    baseline_snip,
)


class TestBaselineALS:
    def test_output_shape_1d(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_als(synthetic_spectrum)
        assert bl.shape == synthetic_spectrum.shape

    def test_output_shape_2d(self, synthetic_batch: np.ndarray) -> None:
        bl = baseline_als(synthetic_batch)
        assert bl.shape == synthetic_batch.shape

    def test_baseline_below_signal(
        self, synthetic_spectrum_with_baseline: tuple[np.ndarray, np.ndarray]
    ) -> None:
        spectrum, _ = synthetic_spectrum_with_baseline
        estimated_bl = baseline_als(spectrum)
        assert np.mean(estimated_bl) < np.mean(spectrum)

    def test_smooth_baseline(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_als(synthetic_spectrum, lam=1e8)
        d2 = np.diff(bl, n=2)
        assert np.std(d2) < 0.01


class TestBaselineSNIP:
    def test_output_shape(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_snip(synthetic_spectrum)
        assert bl.shape == synthetic_spectrum.shape

    def test_non_negative(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_snip(synthetic_spectrum)
        assert np.all(bl >= -1e-6)

    def test_batch_2d(self) -> None:
        """2D batch path for SNIP."""
        rng = np.random.default_rng(42)
        batch = rng.random((3, 100)) + 0.5
        bl = baseline_snip(batch)
        assert bl.shape == batch.shape

    def test_increasing_window(self, synthetic_spectrum: np.ndarray) -> None:
        """decreasing=False uses increasing window range."""
        bl = baseline_snip(synthetic_spectrum, decreasing=False)
        assert bl.shape == synthetic_spectrum.shape


class TestBaselinePolynomial:
    def test_output_shape(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_polynomial(synthetic_spectrum)
        assert bl.shape == synthetic_spectrum.shape

    def test_low_degree_converges(self) -> None:
        """Low-degree polynomial on smooth data should converge quickly."""
        x = np.linspace(0, 1, 200)
        y = 0.5 * x**2 + 0.1 * x  # quadratic baseline only
        bl = baseline_polynomial(y, degree=2, tol=0.01)
        # Baseline should approximate the signal itself
        np.testing.assert_allclose(bl, y, atol=0.1)


class TestBaselineRubberband:
    def test_output_shape(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_rubberband(synthetic_spectrum)
        assert bl.shape == synthetic_spectrum.shape

    def test_below_signal(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_rubberband(synthetic_spectrum)
        residual = synthetic_spectrum - bl
        assert np.mean(residual) >= -0.1

    def test_flat_spectrum(self) -> None:
        """Flat spectrum should have a flat baseline."""
        y = np.ones(100) * 5.0
        bl = baseline_rubberband(y)
        assert bl.shape == (100,)
        np.testing.assert_allclose(bl, 5.0, atol=0.1)

    def test_batch_2d(self) -> None:
        """2D batch path for rubberband."""
        rng = np.random.default_rng(42)
        batch = rng.random((3, 100)) + 0.5
        bl = baseline_rubberband(batch)
        assert bl.shape == batch.shape

    def test_peak_with_linear_baseline(self) -> None:
        """Gaussian peak on linear baseline — exercises lower hull vertex selection."""
        n = 200
        x = np.linspace(0, 10, n)
        baseline_true = 0.5 * x  # linear ramp
        peak = 3.0 * np.exp(-0.5 * ((x - 5) / 0.5) ** 2)
        y = baseline_true + peak
        bl = baseline_rubberband(y)
        assert bl.shape == (n,)
        # Rubberband should approximate the true baseline (below the peak)
        np.testing.assert_allclose(bl, baseline_true, atol=0.5)

    def test_monotonic_increasing(self) -> None:
        """Monotonically increasing spectrum — endpoints always in hull."""
        y = np.linspace(0, 10, 100)
        bl = baseline_rubberband(y)
        assert bl.shape == (100,)
        # Baseline should be approximately the line itself
        np.testing.assert_allclose(bl, y, atol=0.5)

    def test_short_spectrum(self) -> None:
        """Very short spectrum (3 points) exercises endpoint logic."""
        y = np.array([1.0, 5.0, 2.0])
        bl = baseline_rubberband(y)
        assert bl.shape == (3,)
        # Endpoints should be in the hull
        assert bl[0] <= y[0] + 0.01
        assert bl[2] <= y[2] + 0.01
