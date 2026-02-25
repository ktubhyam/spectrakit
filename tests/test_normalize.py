"""Tests for normalization methods."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.normalize import normalize_area, normalize_minmax, normalize_snv, normalize_vector


class TestNormalizeSNV:
    def test_zero_mean_unit_var(self, synthetic_spectrum: np.ndarray) -> None:
        result = normalize_snv(synthetic_spectrum)
        assert abs(np.mean(result)) < 1e-10
        assert abs(np.std(result) - 1.0) < 1e-10

    def test_batch(self, synthetic_batch: np.ndarray) -> None:
        result = normalize_snv(synthetic_batch)
        assert result.shape == synthetic_batch.shape
        for row in result:
            assert abs(np.mean(row)) < 1e-10

    def test_constant_spectrum_1d(self) -> None:
        """Near-zero std path: constant spectrum returns zero-centered."""
        result = normalize_snv(np.ones(50))
        # Should return intensities - mean, which is all zeros
        np.testing.assert_allclose(result, 0.0, atol=1e-10)


class TestNormalizeMinMax:
    def test_range_01(self, synthetic_spectrum: np.ndarray) -> None:
        result = normalize_minmax(synthetic_spectrum)
        assert result.min() >= -1e-10
        assert result.max() <= 1.0 + 1e-10

    def test_constant_spectrum(self) -> None:
        result = normalize_minmax(np.ones(100))
        assert np.allclose(result, 0.0)

    def test_batch_2d(self) -> None:
        """2D batch path for min-max normalization."""
        rng = np.random.default_rng(42)
        batch = rng.random((5, 80)) * 10 + 2
        result = normalize_minmax(batch)
        assert result.shape == batch.shape
        for row in result:
            assert row.min() >= -1e-10
            assert row.max() <= 1.0 + 1e-10


class TestNormalizeArea:
    def test_unit_area(self, synthetic_spectrum: np.ndarray) -> None:
        result = normalize_area(synthetic_spectrum)
        area = np.trapezoid(np.abs(result))
        assert abs(area - 1.0) < 0.01

    def test_batch_2d(self) -> None:
        """2D batch path for area normalization."""
        rng = np.random.default_rng(42)
        batch = rng.random((4, 60)) + 0.1  # positive values
        result = normalize_area(batch)
        assert result.shape == batch.shape
        for row in result:
            area = np.trapezoid(np.abs(row))
            assert abs(area - 1.0) < 0.01

    def test_near_zero_area_1d(self) -> None:
        """Near-zero area spectrum returns unchanged."""
        tiny = np.full(50, 1e-20)
        result = normalize_area(tiny)
        np.testing.assert_array_equal(result, tiny)

    def test_with_wavenumbers(self) -> None:
        """Area normalization with explicit wavenumber axis."""
        wn = np.linspace(400, 4000, 100)
        intensities = np.random.default_rng(42).random(100) + 0.1
        result = normalize_area(intensities, wavenumbers=wn)
        area = np.trapezoid(np.abs(result), x=wn)
        assert abs(area - 1.0) < 0.01


class TestNormalizeVector:
    def test_unit_norm(self, synthetic_spectrum: np.ndarray) -> None:
        result = normalize_vector(synthetic_spectrum)
        assert abs(np.linalg.norm(result) - 1.0) < 1e-10

    def test_batch(self, synthetic_batch: np.ndarray) -> None:
        result = normalize_vector(synthetic_batch)
        norms = np.linalg.norm(result, axis=1)
        assert np.allclose(norms, 1.0)

    def test_zero_vector_1d(self) -> None:
        """Zero vector returns unchanged (no division)."""
        zero = np.zeros(50)
        result = normalize_vector(zero)
        np.testing.assert_array_equal(result, zero)

    def test_zero_vector_2d_warns(self) -> None:
        """2D batch with zero-norm rows warns."""
        batch = np.zeros((3, 50))
        batch[1] = np.arange(50, dtype=np.float64)  # one valid row
        with pytest.warns(UserWarning, match="near-zero norm"):
            result = normalize_vector(batch)
        assert result.shape == batch.shape
        # Valid row should be unit-normed
        assert abs(np.linalg.norm(result[1]) - 1.0) < 1e-10


class TestNormalize2DDegenerate:
    """Test 2D batch degenerate paths that emit warnings."""

    def test_snv_2d_constant_rows_warn(self) -> None:
        """2D batch with constant rows emits warning."""
        batch = np.ones((3, 50))
        with pytest.warns(UserWarning, match="near-zero std"):
            result = normalize_snv(batch)
        assert result.shape == batch.shape
        # All rows should be zero-centered (all zeros)
        np.testing.assert_allclose(result, 0.0, atol=1e-10)

    def test_minmax_2d_constant_rows_warn(self) -> None:
        """2D batch with constant rows emits warning."""
        batch = np.ones((3, 50)) * 5.0
        with pytest.warns(UserWarning, match="near-zero range"):
            result = normalize_minmax(batch)
        assert result.shape == batch.shape

    def test_area_2d_near_zero_warns(self) -> None:
        """2D batch with near-zero area rows emits warning."""
        batch = np.full((3, 50), 1e-20)
        with pytest.warns(UserWarning, match="near-zero area"):
            result = normalize_area(batch)
        assert result.shape == batch.shape
