"""Tests for normalization methods."""
from __future__ import annotations

import numpy as np

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


class TestNormalizeMinMax:
    def test_range_01(self, synthetic_spectrum: np.ndarray) -> None:
        result = normalize_minmax(synthetic_spectrum)
        assert result.min() >= -1e-10
        assert result.max() <= 1.0 + 1e-10

    def test_constant_spectrum(self) -> None:
        result = normalize_minmax(np.ones(100))
        assert np.allclose(result, 0.0)


class TestNormalizeArea:
    def test_unit_area(self, synthetic_spectrum: np.ndarray) -> None:
        result = normalize_area(synthetic_spectrum)
        area = np.trapezoid(np.abs(result))
        assert abs(area - 1.0) < 0.01


class TestNormalizeVector:
    def test_unit_norm(self, synthetic_spectrum: np.ndarray) -> None:
        result = normalize_vector(synthetic_spectrum)
        assert abs(np.linalg.norm(result) - 1.0) < 1e-10

    def test_batch(self, synthetic_batch: np.ndarray) -> None:
        result = normalize_vector(synthetic_batch)
        norms = np.linalg.norm(result, axis=1)
        assert np.allclose(norms, 1.0)
