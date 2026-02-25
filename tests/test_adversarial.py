"""Adversarial edge case tests for SpectraKit v1.6.0.

Tests extreme inputs, boundary conditions, numerical edge cases,
parameter validation, and batch caching correctness.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
import pytest

from spectrakit import (
    baseline_als,
    baseline_arpls,
    baseline_polynomial,
    baseline_rubberband,
    baseline_snip,
    derivative_gap_segment,
    derivative_savgol,
    normalize_area,
    normalize_minmax,
    normalize_snv,
    normalize_vector,
    scatter_emsc,
    scatter_msc,
    similarity_cosine,
    similarity_euclidean,
    similarity_pearson,
    smooth_savgol,
    smooth_whittaker,
)
from spectrakit.exceptions import EmptySpectrumError

RNG = np.random.default_rng(99)


# ---------------------------------------------------------------------------
# 1. Minimum-size spectra (n=3, n=4)
# ---------------------------------------------------------------------------


class TestMinimumSizeSpectra:
    """Verify all methods handle very short spectra (n=3 or n=4)."""

    def test_als_n3(self) -> None:
        y = np.array([1.0, 5.0, 2.0])
        bl = baseline_als(y, lam=1e2, max_iter=5)
        assert bl.shape == (3,)
        assert np.all(np.isfinite(bl))

    def test_arpls_n3(self) -> None:
        y = np.array([1.0, 5.0, 2.0])
        bl = baseline_arpls(y, lam=1e2, max_iter=5)
        assert bl.shape == (3,)
        assert np.all(np.isfinite(bl))

    def test_snip_n4(self) -> None:
        y = np.array([1.0, 5.0, 2.0, 3.0])
        bl = baseline_snip(y, max_half_window=1)
        assert bl.shape == (4,)
        assert np.all(np.isfinite(bl))

    def test_rubberband_n3(self) -> None:
        y = np.array([1.0, 5.0, 2.0])
        bl = baseline_rubberband(y)
        assert bl.shape == (3,)

    def test_polynomial_n4(self) -> None:
        y = np.array([1.0, 3.0, 2.0, 4.0])
        bl = baseline_polynomial(y, degree=1)
        assert bl.shape == (4,)

    def test_smooth_whittaker_n3(self) -> None:
        y = np.array([1.0, 5.0, 2.0])
        result = smooth_whittaker(y, lam=1e2)
        assert result.shape == (3,)
        assert np.all(np.isfinite(result))

    def test_smooth_savgol_n5(self) -> None:
        """SG needs window_length <= n, so n=5 with window=5."""
        y = np.array([1.0, 3.0, 5.0, 3.0, 1.0])
        result = smooth_savgol(y, window_length=5, polyorder=2)
        assert result.shape == (5,)

    def test_normalize_snv_n3(self) -> None:
        y = np.array([1.0, 5.0, 2.0])
        result = normalize_snv(y)
        assert result.shape == (3,)
        np.testing.assert_allclose(np.mean(result), 0.0, atol=1e-14)

    def test_normalize_vector_n3(self) -> None:
        y = np.array([1.0, 5.0, 2.0])
        result = normalize_vector(y)
        np.testing.assert_allclose(np.linalg.norm(result), 1.0, atol=1e-14)

    def test_similarity_n3(self) -> None:
        a = np.array([1.0, 2.0, 3.0])
        b = np.array([3.0, 2.0, 1.0])
        cos = similarity_cosine(a, b)
        assert 0.0 <= cos <= 1.0 + 1e-14
        euc = similarity_euclidean(a, b)
        assert euc >= 0.0


# ---------------------------------------------------------------------------
# 2. Extreme dynamic range
# ---------------------------------------------------------------------------


class TestExtremeDynamicRange:
    """Test with extreme values that stress numerical precision."""

    def test_large_values_normalize_snv(self) -> None:
        """SNV should handle values on the order of 1e15."""
        y = RNG.standard_normal(100) * 1e15
        result = normalize_snv(y)
        np.testing.assert_allclose(np.mean(result), 0.0, atol=1e-10)
        np.testing.assert_allclose(np.std(result), 1.0, atol=1e-10)

    def test_small_values_normalize_vector(self) -> None:
        """Vector norm on tiny values triggers near-zero guard, returns unchanged."""
        y = RNG.standard_normal(100) * 1e-15
        result = normalize_vector(y)
        # Near-zero norm guard returns input unchanged
        np.testing.assert_allclose(result, y, atol=1e-30)

    def test_large_offset_als(self) -> None:
        """ALS on signal with large offset should still produce a baseline."""
        y = RNG.standard_normal(100) + 1e8
        bl = baseline_als(y, lam=1e6)
        assert bl.shape == (100,)
        assert np.all(np.isfinite(bl))

    def test_cosine_large_values(self) -> None:
        """Cosine similarity with large values should still be in [-1, 1]."""
        a = RNG.standard_normal(50) * 1e12
        b = RNG.standard_normal(50) * 1e12
        cos = similarity_cosine(a, b)
        assert -1.0 - 1e-10 <= cos <= 1.0 + 1e-10

    def test_minmax_wide_range(self) -> None:
        """Min-max on values spanning 1e-10 to 1e10."""
        y = np.concatenate(
            [
                RNG.uniform(1e-10, 1e-5, 50),
                RNG.uniform(1e5, 1e10, 50),
            ]
        )
        result = normalize_minmax(y)
        assert np.min(result) >= -1e-14
        assert np.max(result) <= 1.0 + 1e-14


# ---------------------------------------------------------------------------
# 3. Integer input conversion
# ---------------------------------------------------------------------------


class TestIntegerInput:
    """Verify integer arrays are properly converted to float64."""

    def test_als_integer_input(self) -> None:
        y = np.array([1, 5, 3, 7, 2, 8, 4, 6, 3, 5] * 10, dtype=np.int32)
        bl = baseline_als(y)
        assert bl.dtype == np.float64
        assert bl.shape == y.shape

    def test_snv_integer_input(self) -> None:
        y = np.arange(100, dtype=np.int64)
        result = normalize_snv(y)
        assert result.dtype == np.float64

    def test_whittaker_integer_input(self) -> None:
        y = np.arange(50, dtype=np.int32)
        result = smooth_whittaker(y, lam=1e3)
        assert result.dtype == np.float64

    def test_cosine_integer_input(self) -> None:
        a = np.array([1, 2, 3], dtype=np.int32)
        b = np.array([4, 5, 6], dtype=np.int32)
        result = similarity_cosine(a, b)
        assert isinstance(result, (float, np.floating))


# ---------------------------------------------------------------------------
# 4. SNIP inverse transform correctness
# ---------------------------------------------------------------------------


class TestSNIPInverseTransform:
    """Verify SNIP forward/inverse transform roundtrip."""

    def test_transform_roundtrip(self) -> None:
        """Forward then inverse should recover the original (for positive values)."""
        y = np.abs(RNG.standard_normal(100)) + 1.0
        # Forward: f(x) = log(log(sqrt(x+1)+1)+1)
        forward = np.log(np.log(np.sqrt(y + 1) + 1) + 1)
        # Inverse: g(y) = (exp(exp(y)-1)-1)^2 - 1
        inverse = (np.exp(np.exp(forward) - 1) - 1) ** 2 - 1.0
        np.testing.assert_allclose(inverse, y, atol=1e-10)

    def test_snip_non_negative_output(self) -> None:
        """SNIP baseline should always be non-negative."""
        y = RNG.standard_normal(200) * 5.0 + 10.0
        bl = baseline_snip(y, max_half_window=20)
        assert np.all(bl >= -1e-10), f"Min baseline value: {np.min(bl)}"

    def test_snip_below_signal(self) -> None:
        """SNIP baseline mean should be below signal mean for peaked spectra."""
        x = np.linspace(0, 10, 200)
        peak = 5.0 * np.exp(-((x - 5) ** 2) / (2 * 0.3**2))
        signal = peak + 1.0
        bl = baseline_snip(signal, max_half_window=30)
        assert np.mean(bl) < np.mean(signal)


# ---------------------------------------------------------------------------
# 5. Gap-segment derivative edge cases
# ---------------------------------------------------------------------------


class TestGapSegmentEdgeCases:
    """Verify gap-segment derivative with odd gaps and edge cases."""

    def test_odd_gap_symmetric_output(self) -> None:
        """Odd gap should produce symmetric derivative for symmetric input."""
        # Symmetric signal around center
        n = 101
        x = np.linspace(-5, 5, n)
        y = np.exp(-(x**2))  # symmetric Gaussian

        deriv = derivative_gap_segment(y, gap=5, segment=1, deriv=1)
        center = n // 2
        # First derivative of symmetric function should be antisymmetric
        left = deriv[center - 20 : center]
        right = deriv[center + 1 : center + 21]
        # Check approximate antisymmetry
        np.testing.assert_allclose(left, -right[::-1], atol=0.1)

    def test_gap_1(self) -> None:
        """gap=1 should approximate finite differences."""
        y = np.linspace(0, 10, 100)
        deriv = derivative_gap_segment(y, gap=1, segment=1, deriv=1)
        # Interior should be approximately constant
        interior = deriv[2:-2]
        assert np.std(interior) < 0.1

    def test_large_gap_small_spectrum(self) -> None:
        """Gap larger than spectrum length should produce zero output."""
        y = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
        deriv = derivative_gap_segment(y, gap=10, segment=1, deriv=1)
        np.testing.assert_allclose(deriv, 0.0, atol=1e-14)

    def test_second_derivative_quadratic(self) -> None:
        """Second derivative of quadratic should be roughly constant."""
        x = np.linspace(-5, 5, 200)
        y = x**2
        deriv2 = derivative_gap_segment(y, gap=3, segment=3, deriv=2)
        # Interior should have roughly constant second derivative
        interior = deriv2[20:-20]
        nonzero = interior[np.abs(interior) > 0.01]
        if len(nonzero) > 5:
            assert np.std(nonzero) / np.mean(np.abs(nonzero)) < 0.5


# ---------------------------------------------------------------------------
# 6. Derivative savgol parameter validation
# ---------------------------------------------------------------------------


class TestDerivativeSavgolValidation:
    """Verify derivative_savgol parameter validation."""

    def test_even_window_raises(self) -> None:
        y = np.ones(100)
        with pytest.raises(ValueError, match="positive odd integer"):
            derivative_savgol(y, window_length=10)

    def test_zero_window_raises(self) -> None:
        y = np.ones(100)
        with pytest.raises(ValueError, match="positive odd integer"):
            derivative_savgol(y, window_length=0)

    def test_negative_polyorder_raises(self) -> None:
        y = np.ones(100)
        with pytest.raises(ValueError, match="polyorder must be non-negative"):
            derivative_savgol(y, polyorder=-1)

    def test_polyorder_ge_window_raises(self) -> None:
        y = np.ones(100)
        with pytest.raises(ValueError, match="polyorder.*must be less than window_length"):
            derivative_savgol(y, window_length=5, polyorder=5)

    def test_negative_deriv_raises(self) -> None:
        y = np.ones(100)
        with pytest.raises(ValueError, match="deriv must be non-negative"):
            derivative_savgol(y, deriv=-1)

    def test_zero_delta_raises(self) -> None:
        y = np.ones(100)
        with pytest.raises(ValueError, match="delta must be positive"):
            derivative_savgol(y, delta=0.0)

    def test_negative_delta_raises(self) -> None:
        y = np.ones(100)
        with pytest.raises(ValueError, match="delta must be positive"):
            derivative_savgol(y, delta=-1.0)

    def test_delta_scales_derivative(self) -> None:
        """delta parameter should scale the derivative output."""
        x = np.linspace(0, 10, 200)
        y = x**2
        # First derivative of x^2 = 2x, but scaled by 1/delta
        d1 = derivative_savgol(y, window_length=11, polyorder=3, deriv=1, delta=1.0)
        d2 = derivative_savgol(y, window_length=11, polyorder=3, deriv=1, delta=2.0)
        # With delta=2, the derivative is divided by 2
        interior_d1 = d1[20:-20]
        interior_d2 = d2[20:-20]
        np.testing.assert_allclose(interior_d2, interior_d1 / 2.0, atol=0.1)


# ---------------------------------------------------------------------------
# 7. Batch caching correctness (ALS, ArPLS, Whittaker)
# ---------------------------------------------------------------------------


class TestBatchCachingCorrectness:
    """Verify that batch processing with cached matrices matches per-row."""

    def test_als_batch_matches_individual(self) -> None:
        """ALS batch result should match per-row processing."""
        batch = RNG.standard_normal((5, 100)) + 5.0
        batch_result = baseline_als(batch, lam=1e5)
        for i in range(5):
            individual = baseline_als(batch[i], lam=1e5)
            np.testing.assert_allclose(
                batch_result[i],
                individual,
                atol=1e-10,
                err_msg=f"ALS batch/individual mismatch at row {i}",
            )

    def test_arpls_batch_matches_individual(self) -> None:
        """ArPLS batch result should match per-row processing."""
        batch = RNG.standard_normal((4, 80)) + 5.0
        batch_result = baseline_arpls(batch, lam=1e5)
        for i in range(4):
            individual = baseline_arpls(batch[i], lam=1e5)
            np.testing.assert_allclose(
                batch_result[i],
                individual,
                atol=1e-10,
                err_msg=f"ArPLS batch/individual mismatch at row {i}",
            )

    def test_whittaker_batch_matches_individual(self) -> None:
        """Whittaker batch result should match per-row processing."""
        batch = RNG.standard_normal((4, 80)) + 5.0
        batch_result = smooth_whittaker(batch, lam=1e4)
        for i in range(4):
            individual = smooth_whittaker(batch[i], lam=1e4)
            np.testing.assert_allclose(
                batch_result[i],
                individual,
                atol=1e-10,
                err_msg=f"Whittaker batch/individual mismatch at row {i}",
            )

    def test_whittaker_batch_with_wavenumbers(self) -> None:
        """Whittaker batch with wavenumbers matches per-row."""
        wn = np.sort(RNG.uniform(400, 4000, 80))
        batch = RNG.standard_normal((3, 80)) + 5.0
        batch_result = smooth_whittaker(batch, lam=1e4, wavenumbers=wn)
        for i in range(3):
            individual = smooth_whittaker(batch[i], lam=1e4, wavenumbers=wn)
            np.testing.assert_allclose(
                batch_result[i],
                individual,
                atol=1e-10,
                err_msg=f"Whittaker (wn-aware) batch/individual mismatch at row {i}",
            )


# ---------------------------------------------------------------------------
# 8. MSC/EMSC dispatch via apply_along_spectra
# ---------------------------------------------------------------------------


class TestScatterDispatch:
    """Verify MSC/EMSC batch dispatch matches per-row."""

    def test_msc_batch_matches_individual(self) -> None:
        """MSC batch result matches per-row with same reference."""
        ref = RNG.standard_normal(80) + 5.0
        batch = np.array(
            [s * ref + o for s, o in zip([0.8, 1.0, 1.2, 1.5], [0.1, -0.1, 0.3, -0.2], strict=True)]
        )
        batch_result = scatter_msc(batch, reference=ref)
        for i in range(4):
            individual = scatter_msc(batch[i], reference=ref)
            np.testing.assert_allclose(
                batch_result[i],
                individual,
                atol=1e-10,
                err_msg=f"MSC batch/individual mismatch at row {i}",
            )

    def test_emsc_batch_matches_individual(self) -> None:
        """EMSC batch result matches per-row with same reference."""
        ref = RNG.standard_normal(80) + 5.0
        x = np.linspace(-1, 1, 80)
        batch = np.array(
            [s * ref + o + 0.1 * x for s, o in zip([0.8, 1.0, 1.3], [0.1, -0.1, 0.2], strict=True)]
        )
        batch_result = scatter_emsc(batch, reference=ref, poly_order=2)
        for i in range(3):
            individual = scatter_emsc(batch[i], reference=ref, poly_order=2)
            np.testing.assert_allclose(
                batch_result[i],
                individual,
                atol=1e-10,
                err_msg=f"EMSC batch/individual mismatch at row {i}",
            )


# ---------------------------------------------------------------------------
# 9. py.typed marker existence
# ---------------------------------------------------------------------------


class TestTypedMarker:
    """Verify PEP 561 py.typed marker is present."""

    def test_py_typed_exists(self) -> None:
        """py.typed marker file should exist in the package."""
        pkg_dir = Path(__file__).parent.parent / "src" / "spectrakit"
        assert (pkg_dir / "py.typed").exists(), "py.typed marker not found"


# ---------------------------------------------------------------------------
# 10. Constant / degenerate spectrum handling
# ---------------------------------------------------------------------------


class TestDegenerateSpectra:
    """Test degenerate inputs: constant, near-zero, single-valued."""

    def test_als_constant_spectrum(self) -> None:
        """ALS on a constant signal should return that constant as baseline."""
        y = np.full(100, 5.0)
        bl = baseline_als(y, lam=1e6)
        np.testing.assert_allclose(bl, 5.0, atol=0.1)

    def test_arpls_constant_spectrum(self) -> None:
        """ArPLS on a constant signal should return close to that constant."""
        y = np.full(100, 3.0)
        bl = baseline_arpls(y, lam=1e6)
        np.testing.assert_allclose(bl, 3.0, atol=0.5)

    def test_whittaker_constant(self) -> None:
        """Whittaker on a constant should return that constant."""
        y = np.full(100, 7.7)
        result = smooth_whittaker(y, lam=1e6)
        np.testing.assert_allclose(result, 7.7, atol=1e-8)

    def test_normalize_area_near_zero(self) -> None:
        """Area normalization on near-zero signal returns input unchanged."""
        y = np.full(100, 1e-20)
        result = normalize_area(y)
        assert np.all(np.isfinite(result))

    def test_euclidean_identical_signals(self) -> None:
        """Euclidean distance between identical signals is zero."""
        v = RNG.standard_normal(100)
        assert similarity_euclidean(v, v) == pytest.approx(0.0, abs=1e-14)

    def test_pearson_constant_signals(self) -> None:
        """Pearson correlation of constant signal should handle gracefully."""
        # Near-constant: std is very small
        a = np.full(50, 5.0)
        b = np.full(50, 5.0)
        result = similarity_pearson(a, b)
        assert np.isfinite(result)


# ---------------------------------------------------------------------------
# 11. Empty spectrum errors
# ---------------------------------------------------------------------------


class TestEmptySpectrumErrors:
    """Verify all methods raise EmptySpectrumError for empty inputs."""

    @pytest.mark.parametrize(
        "fn",
        [
            baseline_als,
            baseline_arpls,
            baseline_snip,
            baseline_polynomial,
            baseline_rubberband,
            smooth_savgol,
            smooth_whittaker,
            normalize_snv,
            normalize_minmax,
            normalize_vector,
            normalize_area,
        ],
    )
    def test_empty_raises(self, fn) -> None:  # type: ignore[no-untyped-def]
        with pytest.raises(EmptySpectrumError):
            fn(np.array([]))
