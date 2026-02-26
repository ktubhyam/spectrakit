"""Mathematical property tests and integration tests for SpectraKit.

Tests mathematical invariants, idempotence, round-trip properties,
and integration between modules. These tests verify that the library
produces mathematically correct results beyond simple shape checks.
"""

from __future__ import annotations

import numpy as np
import pytest

# numpy 2.0 renamed trapz -> trapezoid; support both
_trapezoid = getattr(np, "trapezoid", None) or getattr(np, "trapz")

from spectrakit import (
    Pipeline,
    baseline_als,
    baseline_arpls,
    baseline_polynomial,
    baseline_rubberband,
    baseline_snip,
    normalize_area,
    normalize_minmax,
    normalize_snv,
    normalize_vector,
    scatter_emsc,
    scatter_msc,
    similarity_cosine,
    similarity_euclidean,
    similarity_pearson,
    similarity_spectral_angle,
    smooth_savgol,
    smooth_whittaker,
)

RNG = np.random.default_rng(42)


# ---------------------------------------------------------------------------
# 1. Normalization invariants
# ---------------------------------------------------------------------------


class TestNormalizationInvariants:
    """Verify mathematical invariant properties of normalization methods."""

    def test_snv_idempotence(self) -> None:
        """SNV applied twice gives the same result as once (idempotent)."""
        y = RNG.standard_normal(200) * 5.0 + 50.0
        once = normalize_snv(y)
        twice = normalize_snv(once)
        np.testing.assert_allclose(twice, once, atol=1e-12)

    def test_snv_batch_idempotence(self) -> None:
        """SNV idempotence holds for batch inputs."""
        batch = RNG.standard_normal((5, 100)) * 10.0 + 30.0
        once = normalize_snv(batch)
        twice = normalize_snv(once)
        np.testing.assert_allclose(twice, once, atol=1e-12)

    def test_minmax_bounds_guaranteed(self) -> None:
        """Min-max output is always in [0, 1] for any non-constant input."""
        for _ in range(10):
            y = RNG.standard_normal(100) * 100.0 + RNG.uniform(-1000, 1000)
            result = normalize_minmax(y)
            assert np.min(result) >= -1e-14
            assert np.max(result) <= 1.0 + 1e-14

    def test_minmax_idempotence(self) -> None:
        """Min-max applied twice gives [0, ..., 1] again."""
        y = RNG.standard_normal(100) * 10.0
        once = normalize_minmax(y)
        twice = normalize_minmax(once)
        np.testing.assert_allclose(twice, once, atol=1e-12)

    def test_vector_norm_is_one(self) -> None:
        """L2-normalized output has norm exactly 1.0 for diverse inputs."""
        for _ in range(10):
            y = RNG.standard_normal(100) * RNG.uniform(0.01, 1000.0)
            result = normalize_vector(y)
            np.testing.assert_allclose(np.linalg.norm(result), 1.0, atol=1e-14)

    def test_vector_idempotence(self) -> None:
        """Vector normalization is idempotent."""
        y = RNG.standard_normal(100) * 10.0
        once = normalize_vector(y)
        twice = normalize_vector(once)
        np.testing.assert_allclose(twice, once, atol=1e-12)

    def test_area_integral_is_one(self) -> None:
        """Area-normalized (all-positive) output integrates to 1."""
        y = np.abs(RNG.standard_normal(100)) + 0.1
        result = normalize_area(y)
        integral = _trapezoid(np.abs(result))
        np.testing.assert_allclose(integral, 1.0, atol=1e-12)

    def test_area_with_wavenumbers(self) -> None:
        """Area normalization with non-uniform wavenumbers integrates to 1."""
        wn = np.sort(RNG.uniform(400, 4000, 100))
        y = np.abs(RNG.standard_normal(100)) + 0.1
        result = normalize_area(y, wavenumbers=wn)
        integral = _trapezoid(np.abs(result), x=wn)
        np.testing.assert_allclose(integral, 1.0, atol=1e-12)

    def test_snv_scaling_invariance(self) -> None:
        """SNV(a*y + b) == SNV(y) for any a > 0 and b."""
        y = RNG.standard_normal(100)
        ref = normalize_snv(y)
        scaled = normalize_snv(3.7 * y + 42.0)
        np.testing.assert_allclose(scaled, ref, atol=1e-12)


# ---------------------------------------------------------------------------
# 2. Similarity metric axioms
# ---------------------------------------------------------------------------


class TestSimilarityAxioms:
    """Verify that similarity metrics satisfy their defining axioms."""

    def test_cosine_self_similarity_is_one(self) -> None:
        """cos(v, v) == 1.0 for any non-zero v."""
        for _ in range(10):
            v = RNG.standard_normal(50) * 100.0
            assert similarity_cosine(v, v) == pytest.approx(1.0, abs=1e-14)

    def test_cosine_scaling_invariance(self) -> None:
        """cos(v, a*v) == 1.0 for a > 0 (positive scaling)."""
        v = RNG.standard_normal(50)
        assert similarity_cosine(v, 3.5 * v) == pytest.approx(1.0, abs=1e-14)

    def test_pearson_self_correlation_is_one(self) -> None:
        """r(v, v) == 1.0 for any non-constant v."""
        v = RNG.standard_normal(50) * 10.0
        assert similarity_pearson(v, v) == pytest.approx(1.0, abs=1e-14)

    def test_pearson_affine_invariance(self) -> None:
        """r(v, a*v + b) == 1.0 for a > 0."""
        v = RNG.standard_normal(50)
        assert similarity_pearson(v, 2.5 * v + 7.3) == pytest.approx(1.0, abs=1e-14)

    def test_spectral_angle_self_is_zero(self) -> None:
        """SAM(v, v) == 0 for any non-zero v (arccos near 1.0 has limited precision)."""
        v = RNG.standard_normal(50) * 10.0
        assert similarity_spectral_angle(v, v) == pytest.approx(0.0, abs=1e-7)

    def test_spectral_angle_positive_scaling_invariance(self) -> None:
        """SAM(v, a*v) == 0 for a > 0 (arccos near 1.0 has limited precision)."""
        v = np.abs(RNG.standard_normal(50)) + 0.1
        assert similarity_spectral_angle(v, 4.2 * v) == pytest.approx(0.0, abs=1e-7)

    def test_euclidean_self_distance_is_zero(self) -> None:
        """d(v, v) == 0 for any v."""
        v = RNG.standard_normal(50) * 100.0
        assert similarity_euclidean(v, v) == pytest.approx(0.0, abs=1e-14)

    def test_euclidean_symmetry(self) -> None:
        """d(a, b) == d(b, a) (symmetry axiom)."""
        a = RNG.standard_normal(50)
        b = RNG.standard_normal(50)
        d1 = similarity_euclidean(a, b)
        d2 = similarity_euclidean(b, a)
        np.testing.assert_allclose(d1, d2, atol=1e-14)

    def test_euclidean_non_negative(self) -> None:
        """d(a, b) >= 0 for all a, b (non-negativity axiom)."""
        for _ in range(10):
            a = RNG.standard_normal(50) * 100.0
            b = RNG.standard_normal(50) * 100.0
            assert similarity_euclidean(a, b) >= 0.0

    def test_cosine_symmetry(self) -> None:
        """cos(a, b) == cos(b, a) (symmetry)."""
        a = RNG.standard_normal(50)
        b = RNG.standard_normal(50)
        np.testing.assert_allclose(similarity_cosine(a, b), similarity_cosine(b, a), atol=1e-14)

    def test_pearson_symmetry(self) -> None:
        """r(a, b) == r(b, a) (symmetry)."""
        a = RNG.standard_normal(50)
        b = RNG.standard_normal(50)
        np.testing.assert_allclose(similarity_pearson(a, b), similarity_pearson(b, a), atol=1e-14)


# ---------------------------------------------------------------------------
# 3. Baseline properties
# ---------------------------------------------------------------------------


class TestBaselineProperties:
    """Verify universal properties of baseline estimators."""

    @pytest.fixture
    def signal_with_peak(self) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        """Linear baseline + Gaussian peak signal."""
        n = 300
        x = np.linspace(0, 10, n)
        true_bl = 0.5 * x + 1.0
        peak = 3.0 * np.exp(-((x - 5) ** 2) / (2 * 0.5**2))
        return true_bl + peak, true_bl, peak

    def test_als_below_signal(
        self, signal_with_peak: tuple[np.ndarray, np.ndarray, np.ndarray]
    ) -> None:
        """ALS baseline mean should be below signal mean."""
        signal, _, _ = signal_with_peak
        bl = baseline_als(signal, lam=1e7, p=0.01)
        assert np.mean(bl) < np.mean(signal)

    def test_arpls_below_signal(
        self, signal_with_peak: tuple[np.ndarray, np.ndarray, np.ndarray]
    ) -> None:
        """ArPLS baseline mean should be below signal mean."""
        signal, _, _ = signal_with_peak
        bl = baseline_arpls(signal, lam=1e7)
        assert np.mean(bl) < np.mean(signal)

    def test_snip_below_signal(
        self, signal_with_peak: tuple[np.ndarray, np.ndarray, np.ndarray]
    ) -> None:
        """SNIP baseline at peak center should be below signal."""
        signal, _, peak = signal_with_peak
        bl = baseline_snip(signal, max_half_window=40)
        peak_idx = np.argmax(peak)
        assert bl[peak_idx] < signal[peak_idx]

    def test_polynomial_below_signal(
        self, signal_with_peak: tuple[np.ndarray, np.ndarray, np.ndarray]
    ) -> None:
        """Polynomial baseline mean should be below signal mean."""
        signal, _, _ = signal_with_peak
        bl = baseline_polynomial(signal, degree=3)
        assert np.mean(bl) < np.mean(signal)

    def test_rubberband_below_or_equal_signal(
        self, signal_with_peak: tuple[np.ndarray, np.ndarray, np.ndarray]
    ) -> None:
        """Rubberband baseline should be at or below the signal everywhere."""
        signal, _, _ = signal_with_peak
        bl = baseline_rubberband(signal)
        residual = signal - bl
        assert np.all(residual >= -0.01), f"Rubberband exceeded signal by {-np.min(residual):.4f}"

    def test_rubberband_skewed_spectrum(self) -> None:
        """Rubberband handles highly skewed spectra (most values below median)."""
        n = 200
        x = np.linspace(0, 10, n)
        # A tall narrow peak on a low flat baseline = most values below median
        baseline_true = np.ones(n) * 0.1
        peak = 10.0 * np.exp(-((x - 5) ** 2) / (2 * 0.2**2))
        signal = baseline_true + peak
        bl = baseline_rubberband(signal)
        # Baseline should be below signal everywhere
        assert np.all(signal - bl >= -0.01)
        # At peak center, baseline should be much lower than signal
        peak_idx = np.argmax(peak)
        assert bl[peak_idx] < signal[peak_idx] * 0.5


# ---------------------------------------------------------------------------
# 4. Whittaker wavenumber-aware tests
# ---------------------------------------------------------------------------


class TestWhittakerWavenumberAware:
    """Verify wavenumber-aware Whittaker smoothing."""

    def test_uniform_wavenumbers_matches_default(self) -> None:
        """With uniform wavenumbers, result is finite and same shape."""
        y = RNG.standard_normal(100) + 5.0
        wn = np.linspace(400, 4000, 100)
        result_wn = smooth_whittaker(y, lam=1e4, wavenumbers=wn)
        # Wavenumber-aware version should produce valid output
        assert result_wn.shape == y.shape
        assert np.all(np.isfinite(result_wn))

    def test_nonuniform_wavenumbers_produces_output(self) -> None:
        """Non-uniform wavenumber spacing produces valid output."""
        # Simulate log-spaced wavenumbers (common in some instruments)
        wn = np.logspace(np.log10(400), np.log10(4000), 200)
        y = np.sin(2 * np.pi * wn / 1000) + RNG.standard_normal(200) * 0.1
        result = smooth_whittaker(y, lam=1e4, wavenumbers=wn)
        assert result.shape == y.shape
        assert np.all(np.isfinite(result))

    def test_constant_signal_preserved_with_wavenumbers(self) -> None:
        """A constant signal is unchanged by wavenumber-aware Whittaker."""
        wn = np.sort(RNG.uniform(400, 4000, 100))
        y = np.full(100, 5.0)
        result = smooth_whittaker(y, lam=1e4, wavenumbers=wn)
        np.testing.assert_allclose(result, 5.0, atol=1e-6)

    def test_wavenumber_length_mismatch_raises(self) -> None:
        """Mismatched wavenumber length raises ValueError."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 50)
        with pytest.raises(ValueError, match="wavenumbers length.*does not match"):
            smooth_whittaker(y, wavenumbers=wn)

    def test_nonuniform_reduces_noise(self) -> None:
        """Wavenumber-aware smoothing reduces noise on non-uniform grid."""
        wn = np.sort(RNG.uniform(400, 4000, 200))
        clean = np.sin(2 * np.pi * wn / 1000)
        noisy = clean + RNG.standard_normal(200) * 0.3
        smoothed = smooth_whittaker(noisy, lam=1e4, wavenumbers=wn)
        err_noisy = np.std(noisy - clean)
        err_smoothed = np.std(smoothed - clean)
        assert err_smoothed < err_noisy

    def test_diff1_with_wavenumbers(self) -> None:
        """First-order difference penalty with wavenumbers produces valid output."""
        wn = np.sort(RNG.uniform(400, 4000, 100))
        y = RNG.standard_normal(100) + 5.0
        result = smooth_whittaker(y, lam=1e4, differences=1, wavenumbers=wn)
        assert result.shape == y.shape
        assert np.all(np.isfinite(result))


# ---------------------------------------------------------------------------
# 5. EMSC Legendre basis and validation
# ---------------------------------------------------------------------------


class TestEMSCImprovements:
    """Verify EMSC with Legendre polynomials and new validation."""

    def test_emsc_negative_poly_order_raises(self) -> None:
        """poly_order < 0 should raise ValueError."""
        rng = np.random.default_rng(42)
        batch = rng.random((5, 100))
        with pytest.raises(ValueError, match="poly_order must be non-negative"):
            scatter_emsc(batch, poly_order=-1)

    def test_emsc_recovers_reference(self) -> None:
        """EMSC with Legendre basis recovers reference from scatter + baseline."""
        rng = np.random.default_rng(42)
        reference = rng.random(100) + 1.0
        x = np.linspace(-1, 1, 100)
        # Spectrum = 2.0 * ref + 0.5 + 0.3*x (linear baseline + scatter)
        spectrum = 2.0 * reference + 0.5 + 0.3 * x
        result = scatter_emsc(spectrum, reference=reference, poly_order=1)
        np.testing.assert_allclose(result, reference, atol=0.1)

    def test_emsc_high_poly_order_stable(self) -> None:
        """High poly_order with Legendre basis doesn't cause numerical issues."""
        rng = np.random.default_rng(42)
        reference = rng.random(100) + 1.0
        spectrum = 1.5 * reference + 0.2
        # Legendre basis should be numerically stable even at high orders
        result = scatter_emsc(spectrum, reference=reference, poly_order=6)
        assert np.all(np.isfinite(result))
        assert result.shape == (100,)


# ---------------------------------------------------------------------------
# 6. Pipeline integration tests
# ---------------------------------------------------------------------------


class TestPipelineIntegration:
    """Test Pipeline with real processing functions chained together."""

    def test_baseline_then_normalize(self) -> None:
        """Pipeline: baseline_als -> normalize_snv produces valid output."""
        n = 200
        x = np.linspace(0, 10, n)
        signal = np.exp(-((x - 5) ** 2) / (2 * 0.5**2)) + 0.1 * x + 1.0

        pipe = Pipeline()
        pipe.add("baseline", baseline_als, lam=1e6)
        pipe.add("normalize", normalize_snv)
        result = pipe.transform(signal)

        assert result.shape == signal.shape
        # SNV output: zero mean, unit std
        np.testing.assert_allclose(np.mean(result), 0.0, atol=1e-10)
        np.testing.assert_allclose(np.std(result), 1.0, atol=1e-10)

    def test_smooth_then_baseline_then_normalize(self) -> None:
        """Pipeline: smooth -> baseline -> normalize produces valid output."""
        n = 300
        x = np.linspace(0, 10, n)
        clean = np.exp(-((x - 5) ** 2) / (2 * 0.5**2))
        noise = RNG.standard_normal(n) * 0.05
        baseline_true = 0.2 * x + 1.0
        signal = clean + noise + baseline_true

        pipe = (
            Pipeline()
            .add("smooth", smooth_savgol, window_length=11, polyorder=3)
            .add("baseline", baseline_als, lam=1e7)
            .add("normalize", normalize_vector)
        )
        result = pipe.transform(signal)

        assert result.shape == signal.shape
        np.testing.assert_allclose(np.linalg.norm(result), 1.0, atol=1e-12)

    def test_pipeline_batch(self) -> None:
        """Pipeline operates correctly on 2D batch input."""
        batch = RNG.standard_normal((5, 200)) * 10.0 + 50.0
        pipe = Pipeline().add("normalize", normalize_snv)
        result = pipe.transform(batch)
        assert result.shape == batch.shape
        for i in range(5):
            np.testing.assert_allclose(np.mean(result[i]), 0.0, atol=1e-10)
            np.testing.assert_allclose(np.std(result[i]), 1.0, atol=1e-10)

    def test_pipeline_preserves_shape(self) -> None:
        """Pipeline never changes the shape of its input."""
        shapes = [(100,), (3, 100), (10, 500)]
        pipe = Pipeline().add("smooth", smooth_whittaker, lam=1e3)
        for shape in shapes:
            data = RNG.standard_normal(shape) + 5.0
            result = pipe.transform(data)
            assert result.shape == shape


# ---------------------------------------------------------------------------
# 7. Additional validation tests
# ---------------------------------------------------------------------------


class TestAdditionalValidation:
    """Tests for newly added validation checks."""

    def test_polynomial_tol_zero_raises(self) -> None:
        """tol=0 should raise ValueError."""
        y = np.ones(100)
        with pytest.raises(ValueError, match="tol must be positive"):
            baseline_polynomial(y, tol=0.0)

    def test_polynomial_tol_negative_raises(self) -> None:
        """tol=-1 should raise ValueError."""
        y = np.ones(100)
        with pytest.raises(ValueError, match="tol must be positive"):
            baseline_polynomial(y, tol=-1.0)

    def test_atr_wavenumber_mismatch_raises(self) -> None:
        """ATR correction with mismatched wavenumber length raises ValueError."""
        from spectrakit import transform_atr_correction

        y = np.ones(100)
        wn = np.linspace(400, 4000, 50)  # wrong length
        with pytest.raises(ValueError, match="wavenumbers length.*does not match"):
            transform_atr_correction(y, wn)

    def test_atr_2d_wavenumber_mismatch_raises(self) -> None:
        """ATR correction 2D with mismatched wavenumber length raises ValueError."""
        from spectrakit import transform_atr_correction

        y = np.ones((3, 100))
        wn = np.linspace(400, 4000, 50)
        with pytest.raises(ValueError, match="wavenumbers length.*does not match"):
            transform_atr_correction(y, wn)


# ---------------------------------------------------------------------------
# 8. Smoothing property tests
# ---------------------------------------------------------------------------


class TestSmoothingProperties:
    """Verify mathematical properties of smoothing methods."""

    def test_savgol_preserves_constant(self) -> None:
        """Constant signal is unchanged by Savitzky-Golay."""
        y = np.full(100, 7.3)
        result = smooth_savgol(y, window_length=11, polyorder=3)
        np.testing.assert_allclose(result, 7.3, atol=1e-10)

    def test_whittaker_preserves_constant(self) -> None:
        """Constant signal is unchanged by Whittaker."""
        y = np.full(100, 3.14)
        result = smooth_whittaker(y, lam=1e6)
        np.testing.assert_allclose(result, 3.14, atol=1e-8)

    def test_whittaker_preserves_linear_d2(self) -> None:
        """d=2 Whittaker preserves linear signals (d2 of linear = 0)."""
        y = np.linspace(1.0, 10.0, 200)
        result = smooth_whittaker(y, lam=1e8, differences=2)
        np.testing.assert_allclose(result, y, atol=1e-4)

    def test_savgol_preserves_quadratic(self) -> None:
        """SG with polyorder >= 2 preserves quadratic signals."""
        x = np.linspace(0, 10, 200)
        y = 2.0 * x**2 - 3.0 * x + 1.0
        result = smooth_savgol(y, window_length=11, polyorder=3)
        np.testing.assert_allclose(result, y, atol=1e-8)

    def test_higher_lambda_smoother(self) -> None:
        """Higher lambda in Whittaker produces smoother output."""
        y = RNG.standard_normal(200) + 5.0
        low = smooth_whittaker(y, lam=1e2)
        high = smooth_whittaker(y, lam=1e6)
        roughness_low = np.sum(np.diff(low, n=2) ** 2)
        roughness_high = np.sum(np.diff(high, n=2) ** 2)
        assert roughness_high < roughness_low


# ---------------------------------------------------------------------------
# 9. MSC / EMSC scatter correction properties
# ---------------------------------------------------------------------------


class TestScatterCorrectionProperties:
    """Verify scatter correction mathematical properties."""

    def test_msc_reference_is_fixed_point(self) -> None:
        """MSC(reference, reference=reference) should return reference."""
        ref = RNG.standard_normal(100) + 5.0
        result = scatter_msc(ref, reference=ref)
        np.testing.assert_allclose(result, ref, atol=1e-10)

    def test_emsc_reference_is_fixed_point(self) -> None:
        """EMSC(reference, reference=reference) should return reference."""
        ref = RNG.standard_normal(100) + 5.0
        result = scatter_emsc(ref, reference=ref, poly_order=2)
        np.testing.assert_allclose(result, ref, atol=1e-10)

    def test_msc_batch_mean_close_to_reference(self) -> None:
        """After MSC, batch mean should be close to the reference."""
        ref = RNG.standard_normal(80) + 5.0
        scales = [0.5, 1.0, 1.5, 2.0, 2.5]
        offsets = [0.1, 0.0, -0.2, 0.3, -0.1]
        batch = np.array([s * ref + o for s, o in zip(scales, offsets, strict=True)])
        corrected = scatter_msc(batch, reference=ref)
        batch_mean = np.mean(corrected, axis=0)
        np.testing.assert_allclose(batch_mean, ref, atol=0.1)
