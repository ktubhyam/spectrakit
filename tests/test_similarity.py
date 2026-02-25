"""Tests for spectral similarity metrics."""

from __future__ import annotations

import numpy as np
import pytest

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

    def test_zero_vectors(self) -> None:
        """Zero vectors should return 0.0 similarity."""
        a = np.zeros(5)
        b = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
        assert similarity_cosine(a, b) == 0.0


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
        b = np.array(
            [
                [2.0, 4.0, 6.0, 8.0, 10.0],  # perfect correlation
                [5.0, 4.0, 3.0, 2.0, 1.0],  # negative correlation
            ]
        )
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
        b = np.array(
            [
                [1.0, 0.0, 0.0],  # identical → angle ≈ 0
                [0.0, 1.0, 0.0],  # orthogonal → angle ≈ pi/2
            ]
        )
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
        b = np.array(
            [
                [3.0, 4.0],  # distance = 5
                [0.0, 0.0],  # distance = 0
            ]
        )
        result = similarity_euclidean(a, b)
        assert result.shape == (2,)
        np.testing.assert_allclose(result[0], 5.0, atol=1e-10)
        np.testing.assert_allclose(result[1], 0.0, atol=1e-10)


class TestPearsonConstantArrays:
    """Pearson should return 0.0 for constant arrays (not NaN)."""

    def test_constant_query(self) -> None:
        query = np.ones(10)
        reference = np.arange(10, dtype=np.float64)
        result = similarity_pearson(query, reference)
        assert result == 0.0
        assert not np.isnan(result)

    def test_constant_reference(self) -> None:
        query = np.arange(10, dtype=np.float64)
        reference = np.ones(10)
        result = similarity_pearson(query, reference)
        assert result == 0.0

    def test_both_constant(self) -> None:
        query = np.ones(10) * 5.0
        reference = np.ones(10) * 3.0
        result = similarity_pearson(query, reference)
        assert result == 0.0


class TestNaNWarnings:
    """Processing functions should warn when input contains NaN/Inf."""

    def test_cosine_warns_on_nan(self) -> None:
        query = np.array([1.0, np.nan, 3.0])
        reference = np.array([1.0, 2.0, 3.0])
        with pytest.warns(UserWarning, match="non-finite"):
            similarity_cosine(query, reference)

    def test_euclidean_warns_on_inf(self) -> None:
        query = np.array([1.0, np.inf])
        reference = np.array([1.0, 2.0])
        with pytest.warns(UserWarning, match="non-finite"):
            similarity_euclidean(query, reference)


class TestDegenerateInputConsistency:
    """Verify all metrics return consistent values for degenerate inputs."""

    def test_zero_vectors_cosine(self) -> None:
        """Cosine returns 0.0 for zero vectors."""
        assert similarity_cosine(np.zeros(5), np.ones(5)) == 0.0

    def test_zero_vectors_spectral_angle(self) -> None:
        """Spectral angle returns 0.0 for zero vectors."""
        assert similarity_spectral_angle(np.zeros(5), np.ones(5)) == 0.0

    def test_zero_vectors_euclidean(self) -> None:
        """Euclidean returns distance (not 0) for zero query vs nonzero ref."""
        result = similarity_euclidean(np.zeros(3), np.array([3.0, 4.0, 0.0]))
        assert abs(result - 5.0) < 1e-10

    def test_constant_pearson(self) -> None:
        """Pearson returns 0.0 for constant spectra (zero std)."""
        assert similarity_pearson(np.ones(10), np.arange(10, dtype=float)) == 0.0

    def test_constant_batch_pearson(self) -> None:
        """Pearson batch returns 0.0 for rows with zero std."""
        query = np.ones(5)
        ref = np.array([[1.0, 2.0, 3.0, 4.0, 5.0], [7.0, 7.0, 7.0, 7.0, 7.0]])
        result = similarity_pearson(query, ref)
        assert result[1] == 0.0  # constant row


class TestBatchQuerySupport:
    """Verify 2D query (batch) against 1D or 2D reference."""

    def test_cosine_2d_query_1d_ref(self) -> None:
        """Batch queries against a single reference."""
        queries = np.array([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0]])
        ref = np.array([1.0, 0.0, 0.0])
        result = similarity_cosine(queries, ref)
        assert result.shape == (2,)
        np.testing.assert_allclose(result[0], 1.0, atol=1e-10)
        np.testing.assert_allclose(result[1], 0.0, atol=1e-10)

    def test_cosine_2d_query_2d_ref(self) -> None:
        """All-pairs similarity matrix."""
        queries = np.eye(3)
        refs = np.eye(3)
        result = similarity_cosine(queries, refs)
        assert result.shape == (3, 3)
        np.testing.assert_allclose(result, np.eye(3), atol=1e-10)

    def test_pearson_2d_query_1d_ref(self) -> None:
        queries = np.array([[1.0, 2.0, 3.0], [3.0, 2.0, 1.0]])
        ref = np.array([1.0, 2.0, 3.0])
        result = similarity_pearson(queries, ref)
        assert result.shape == (2,)
        np.testing.assert_allclose(result[0], 1.0, atol=1e-10)
        np.testing.assert_allclose(result[1], -1.0, atol=1e-10)

    def test_pearson_2d_query_2d_ref(self) -> None:
        queries = np.array([[1.0, 2.0, 3.0], [3.0, 2.0, 1.0]])
        refs = np.array([[1.0, 2.0, 3.0], [3.0, 2.0, 1.0]])
        result = similarity_pearson(queries, refs)
        assert result.shape == (2, 2)
        np.testing.assert_allclose(result[0, 0], 1.0, atol=1e-10)
        np.testing.assert_allclose(result[0, 1], -1.0, atol=1e-10)
        np.testing.assert_allclose(result[1, 0], -1.0, atol=1e-10)
        np.testing.assert_allclose(result[1, 1], 1.0, atol=1e-10)

    def test_spectral_angle_2d_query_1d_ref(self) -> None:
        queries = np.array([[1.0, 0.0], [0.0, 1.0]])
        ref = np.array([1.0, 0.0])
        result = similarity_spectral_angle(queries, ref)
        assert result.shape == (2,)
        np.testing.assert_allclose(result[0], 0.0, atol=1e-4)
        np.testing.assert_allclose(result[1], np.pi / 2, atol=1e-4)

    def test_spectral_angle_2d_query_2d_ref(self) -> None:
        queries = np.eye(3)
        refs = np.eye(3)
        result = similarity_spectral_angle(queries, refs)
        assert result.shape == (3, 3)
        for i in range(3):
            np.testing.assert_allclose(result[i, i], 0.0, atol=1e-4)
            for j in range(3):
                if i != j:
                    np.testing.assert_allclose(result[i, j], np.pi / 2, atol=1e-4)

    def test_euclidean_2d_query_1d_ref(self) -> None:
        queries = np.array([[3.0, 4.0], [0.0, 0.0]])
        ref = np.array([0.0, 0.0])
        result = similarity_euclidean(queries, ref)
        assert result.shape == (2,)
        np.testing.assert_allclose(result[0], 5.0, atol=1e-10)
        np.testing.assert_allclose(result[1], 0.0, atol=1e-10)

    def test_euclidean_2d_query_2d_ref(self) -> None:
        queries = np.array([[0.0, 0.0], [3.0, 4.0]])
        refs = np.array([[3.0, 4.0], [0.0, 0.0]])
        result = similarity_euclidean(queries, refs)
        assert result.shape == (2, 2)
        np.testing.assert_allclose(result[0, 0], 5.0, atol=1e-10)
        np.testing.assert_allclose(result[0, 1], 0.0, atol=1e-10)
        np.testing.assert_allclose(result[1, 0], 0.0, atol=1e-10)
        np.testing.assert_allclose(result[1, 1], 5.0, atol=1e-10)


class TestKeywordArgCompat:
    """Ensure the new query/reference param names work as kwargs."""

    def test_cosine_kwargs(self) -> None:
        q = np.array([1.0, 2.0, 3.0])
        r = np.array([1.0, 2.0, 3.0])
        result = similarity_cosine(query=q, reference=r)
        assert abs(result - 1.0) < 1e-10

    def test_pearson_kwargs(self) -> None:
        q = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
        r = np.array([2.0, 4.0, 6.0, 8.0, 10.0])
        result = similarity_pearson(query=q, reference=r)
        assert abs(result - 1.0) < 1e-10

    def test_spectral_angle_kwargs(self) -> None:
        q = np.array([1.0, 0.0])
        r = np.array([0.0, 1.0])
        result = similarity_spectral_angle(query=q, reference=r)
        assert abs(result - np.pi / 2) < 1e-6

    def test_euclidean_kwargs(self) -> None:
        q = np.array([0.0, 0.0])
        r = np.array([3.0, 4.0])
        assert abs(similarity_euclidean(query=q, reference=r) - 5.0) < 1e-10
