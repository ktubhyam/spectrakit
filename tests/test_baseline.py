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


class TestBaselinePolynomial:
    def test_output_shape(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_polynomial(synthetic_spectrum)
        assert bl.shape == synthetic_spectrum.shape


class TestBaselineRubberband:
    def test_output_shape(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_rubberband(synthetic_spectrum)
        assert bl.shape == synthetic_spectrum.shape

    def test_below_signal(self, synthetic_spectrum: np.ndarray) -> None:
        bl = baseline_rubberband(synthetic_spectrum)
        residual = synthetic_spectrum - bl
        assert np.mean(residual) >= -0.1
