"""Tests for spectral similarity metrics."""

from __future__ import annotations

import numpy as np

from spectrakit.similarity import (
    similarity_cosine,
    similarity_euclidean,
    similarity_pearson,
    similarity_spectral_angle,
)


class TestSimilarityCosine:
    def test_identical(self) -> None:
        a = np.array([1.0, 2.0, 3.0])
        assert abs(similarity_cosine(a, a) - 1.0) < 1e-10

    def test_orthogonal(self) -> None:
        a = np.array([1.0, 0.0])
        b = np.array([0.0, 1.0])
        assert abs(similarity_cosine(a, b)) < 1e-10

    def test_batch(self) -> None:
        a = np.array([1.0, 0.0, 0.0])
        b = np.array([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0]])
        result = similarity_cosine(a, b)
        assert result.shape == (2,)
        assert abs(result[0] - 1.0) < 1e-10
        assert abs(result[1]) < 1e-10


class TestSimilarityPearson:
    def test_perfect_correlation(self) -> None:
        a = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
        b = np.array([2.0, 4.0, 6.0, 8.0, 10.0])
        assert abs(similarity_pearson(a, b) - 1.0) < 1e-10

    def test_negative_correlation(self) -> None:
        a = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
        b = np.array([5.0, 4.0, 3.0, 2.0, 1.0])
        assert abs(similarity_pearson(a, b) - (-1.0)) < 1e-10

    def test_batch_2d(self) -> None:
        """2D batch path: compute pearson against a library."""
        a = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
        b = np.array([
            [2.0, 4.0, 6.0, 8.0, 10.0],   # perfect correlation
            [5.0, 4.0, 3.0, 2.0, 1.0],     # negative correlation
        ])
        result = similarity_pearson(a, b)
        assert result.shape == (2,)
        np.testing.assert_allclose(result[0], 1.0, atol=1e-10)
        np.testing.assert_allclose(result[1], -1.0, atol=1e-10)


class TestSpectralAngle:
    def test_identical(self) -> None:
        a = np.array([1.0, 2.0, 3.0])
        assert abs(similarity_spectral_angle(a, a)) < 1e-5

    def test_orthogonal(self) -> None:
        a = np.array([1.0, 0.0])
        b = np.array([0.0, 1.0])
        assert abs(similarity_spectral_angle(a, b) - np.pi / 2) < 1e-6

    def test_batch_2d(self) -> None:
        """2D batch path: compute spectral angle against a library."""
        a = np.array([1.0, 0.0, 0.0])
        b = np.array([
            [1.0, 0.0, 0.0],  # identical → angle ≈ 0
            [0.0, 1.0, 0.0],  # orthogonal → angle ≈ pi/2
        ])
        result = similarity_spectral_angle(a, b)
        assert result.shape == (2,)
        np.testing.assert_allclose(result[0], 0.0, atol=1e-4)
        np.testing.assert_allclose(result[1], np.pi / 2, atol=1e-4)


class TestEuclidean:
    def test_identical(self) -> None:
        a = np.array([1.0, 2.0, 3.0])
        assert abs(similarity_euclidean(a, a)) < 1e-10

    def test_known_distance(self) -> None:
        a = np.array([0.0, 0.0])
        b = np.array([3.0, 4.0])
        assert abs(similarity_euclidean(a, b) - 5.0) < 1e-10

    def test_batch_2d(self) -> None:
        """2D batch path: compute distances against a library."""
        a = np.array([0.0, 0.0])
        b = np.array([
            [3.0, 4.0],   # distance = 5
            [0.0, 0.0],   # distance = 0
        ])
        result = similarity_euclidean(a, b)
        assert result.shape == (2,)
        np.testing.assert_allclose(result[0], 5.0, atol=1e-10)
        np.testing.assert_allclose(result[1], 0.0, atol=1e-10)
