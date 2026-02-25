"""Property-based tests using Hypothesis.

Uses random generation to stress-test mathematical invariants that
must hold for ANY valid input, not just hand-picked examples.
"""

from __future__ import annotations

import numpy as np
from hypothesis import HealthCheck, given, settings
from hypothesis import strategies as st
from hypothesis.extra.numpy import arrays

from spectrakit import (
    normalize_area,
    normalize_minmax,
    normalize_snv,
    normalize_vector,
    similarity_cosine,
    similarity_euclidean,
    similarity_pearson,
    similarity_spectral_angle,
    smooth_savgol,
    smooth_whittaker,
)

# ---------------------------------------------------------------------------
# Strategies
# ---------------------------------------------------------------------------

# Non-degenerate 1-D spectra: at least 11 points (SG window), no NaN/Inf
spectrum_1d = arrays(
    dtype=np.float64,
    shape=st.integers(min_value=20, max_value=200),
    elements=st.floats(min_value=-1e6, max_value=1e6, allow_nan=False, allow_infinity=False),
).filter(lambda a: float(np.ptp(a)) > 1e-6)  # non-constant (ptp = max - min)

# Non-zero vector (for similarity metrics).
# Norm threshold must exceed the EPSILON guard (1e-10) used in similarity
# functions by a comfortable margin to avoid false failures on near-zero vectors.
nonzero_vector = arrays(
    dtype=np.float64,
    shape=st.integers(min_value=3, max_value=100),
    elements=st.floats(min_value=-1e4, max_value=1e4, allow_nan=False, allow_infinity=False),
).filter(lambda a: np.linalg.norm(a) > 1e-6)

# Positive spectrum (for area normalization)
positive_spectrum = arrays(
    dtype=np.float64,
    shape=st.integers(min_value=10, max_value=200),
    elements=st.floats(min_value=0.01, max_value=1e4, allow_nan=False, allow_infinity=False),
)

# Shared hypothesis settings
FAST = settings(max_examples=30, deadline=5000, suppress_health_check=[HealthCheck.too_slow])


# ---------------------------------------------------------------------------
# Normalization Invariants
# ---------------------------------------------------------------------------


class TestHypothesisNormalization:
    """Property-based tests for normalization methods."""

    @given(data=spectrum_1d)
    @FAST
    def test_snv_zero_mean(self, data: np.ndarray) -> None:
        """SNV output always has mean zero."""
        result = normalize_snv(data)
        assert abs(np.mean(result)) < 1e-10

    @given(data=spectrum_1d)
    @FAST
    def test_snv_unit_std(self, data: np.ndarray) -> None:
        """SNV output always has unit standard deviation."""
        result = normalize_snv(data)
        np.testing.assert_allclose(np.std(result), 1.0, atol=1e-10)

    @given(data=spectrum_1d)
    @FAST
    def test_snv_idempotent(self, data: np.ndarray) -> None:
        """SNV applied twice gives the same result."""
        once = normalize_snv(data)
        twice = normalize_snv(once)
        np.testing.assert_allclose(twice, once, atol=1e-10)

    @given(data=spectrum_1d, scale=st.floats(min_value=0.01, max_value=100.0))
    @FAST
    def test_snv_scale_invariant(self, data: np.ndarray, scale: float) -> None:
        """SNV(a * y) == SNV(y) for a > 0."""
        ref = normalize_snv(data)
        scaled = normalize_snv(data * scale)
        np.testing.assert_allclose(scaled, ref, atol=1e-8)

    @given(data=spectrum_1d)
    @FAST
    def test_minmax_bounds(self, data: np.ndarray) -> None:
        """Min-max output is always in [0, 1]."""
        result = normalize_minmax(data)
        assert np.min(result) >= -1e-14
        assert np.max(result) <= 1.0 + 1e-14

    @given(data=spectrum_1d)
    @FAST
    def test_minmax_idempotent(self, data: np.ndarray) -> None:
        """Min-max applied twice gives the same result."""
        once = normalize_minmax(data)
        twice = normalize_minmax(once)
        np.testing.assert_allclose(twice, once, atol=1e-12)

    @given(data=spectrum_1d)
    @FAST
    def test_vector_unit_norm(self, data: np.ndarray) -> None:
        """Vector-normalized output has L2 norm == 1."""
        result = normalize_vector(data)
        np.testing.assert_allclose(np.linalg.norm(result), 1.0, atol=1e-12)

    @given(data=spectrum_1d)
    @FAST
    def test_vector_idempotent(self, data: np.ndarray) -> None:
        """Vector normalization applied twice gives same result."""
        once = normalize_vector(data)
        twice = normalize_vector(once)
        np.testing.assert_allclose(twice, once, atol=1e-12)

    @given(data=positive_spectrum)
    @FAST
    def test_area_integral_is_one(self, data: np.ndarray) -> None:
        """Area-normalized positive spectrum integrates to 1."""
        result = normalize_area(data)
        integral = np.trapezoid(np.abs(result))
        np.testing.assert_allclose(integral, 1.0, atol=1e-10)


# ---------------------------------------------------------------------------
# Similarity Metric Axioms
# ---------------------------------------------------------------------------


class TestHypothesisSimilarity:
    """Property-based tests for similarity metrics."""

    @given(v=nonzero_vector)
    @FAST
    def test_cosine_self_is_one(self, v: np.ndarray) -> None:
        """cos(v, v) == 1 for any non-zero v."""
        np.testing.assert_allclose(similarity_cosine(v, v), 1.0, atol=1e-12)

    @given(v=nonzero_vector, scale=st.floats(min_value=0.01, max_value=100.0))
    @FAST
    def test_cosine_positive_scale_invariant(self, v: np.ndarray, scale: float) -> None:
        """cos(v, a*v) == 1 for a > 0."""
        np.testing.assert_allclose(similarity_cosine(v, v * scale), 1.0, atol=1e-12)

    @given(
        a=nonzero_vector,
        b=nonzero_vector,
    )
    @FAST
    def test_cosine_symmetric(self, a: np.ndarray, b: np.ndarray) -> None:
        """cos(a, b) == cos(b, a)."""
        if len(a) != len(b):
            return  # skip mismatched lengths
        np.testing.assert_allclose(similarity_cosine(a, b), similarity_cosine(b, a), atol=1e-14)

    @given(v=nonzero_vector)
    @FAST
    def test_pearson_self_is_one(self, v: np.ndarray) -> None:
        """r(v, v) == 1 for any non-constant v."""
        if np.std(v) < 1e-10:
            return
        np.testing.assert_allclose(similarity_pearson(v, v), 1.0, atol=1e-12)

    @given(
        v=nonzero_vector,
        scale=st.floats(min_value=0.01, max_value=100.0),
        offset=st.floats(min_value=-100.0, max_value=100.0),
    )
    @FAST
    def test_pearson_affine_invariant(self, v: np.ndarray, scale: float, offset: float) -> None:
        """r(v, a*v + b) == 1 for a > 0."""
        if np.std(v) < 1e-10:
            return
        np.testing.assert_allclose(similarity_pearson(v, v * scale + offset), 1.0, atol=1e-8)

    @given(v=nonzero_vector)
    @FAST
    def test_euclidean_self_is_zero(self, v: np.ndarray) -> None:
        """d(v, v) == 0."""
        np.testing.assert_allclose(similarity_euclidean(v, v), 0.0, atol=1e-14)

    @given(
        a=nonzero_vector,
        b=nonzero_vector,
    )
    @FAST
    def test_euclidean_non_negative(self, a: np.ndarray, b: np.ndarray) -> None:
        """d(a, b) >= 0."""
        if len(a) != len(b):
            return
        assert similarity_euclidean(a, b) >= -1e-14

    @given(
        a=nonzero_vector,
        b=nonzero_vector,
    )
    @FAST
    def test_euclidean_symmetric(self, a: np.ndarray, b: np.ndarray) -> None:
        """d(a, b) == d(b, a)."""
        if len(a) != len(b):
            return
        np.testing.assert_allclose(
            similarity_euclidean(a, b), similarity_euclidean(b, a), atol=1e-14
        )

    @given(v=nonzero_vector)
    @FAST
    def test_spectral_angle_self_is_zero(self, v: np.ndarray) -> None:
        """SAM(v, v) == 0."""
        np.testing.assert_allclose(similarity_spectral_angle(v, v), 0.0, atol=1e-7)


# ---------------------------------------------------------------------------
# Smoothing Properties
# ---------------------------------------------------------------------------


class TestHypothesisSmoothing:
    """Property-based tests for smoothing methods."""

    @given(
        const=st.floats(min_value=-1e4, max_value=1e4, allow_nan=False, allow_infinity=False),
        n=st.integers(min_value=11, max_value=200),
    )
    @FAST
    def test_savgol_preserves_constant(self, const: float, n: int) -> None:
        """SG filter preserves constant signals."""
        y = np.full(n, const)
        result = smooth_savgol(y, window_length=11, polyorder=3)
        np.testing.assert_allclose(result, const, atol=1e-8)

    @given(
        const=st.floats(min_value=-1e4, max_value=1e4, allow_nan=False, allow_infinity=False),
        n=st.integers(min_value=5, max_value=200),
    )
    @FAST
    def test_whittaker_preserves_constant(self, const: float, n: int) -> None:
        """Whittaker preserves constant signals."""
        y = np.full(n, const)
        result = smooth_whittaker(y, lam=1e4)
        np.testing.assert_allclose(result, const, atol=1e-6)

    @given(data=spectrum_1d)
    @FAST
    def test_smoothing_reduces_roughness(self, data: np.ndarray) -> None:
        """Smoothing should reduce second-derivative roughness."""
        if len(data) < 15:
            return
        smoothed = smooth_whittaker(data, lam=1e6)
        roughness_orig = float(np.sum(np.diff(data, n=2) ** 2))
        roughness_smooth = float(np.sum(np.diff(smoothed, n=2) ** 2))
        assert roughness_smooth <= roughness_orig + 1e-6
