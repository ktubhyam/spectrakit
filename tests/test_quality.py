"""Tests for the quality subpackage (roughness and SNR)."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit import quality_roughness, quality_snr
from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError

# ---------------------------------------------------------------------------
# quality_roughness
# ---------------------------------------------------------------------------


class TestQualityRoughness:
    """Tests for quality_roughness."""

    def test_1d_returns_float(self, synthetic_spectrum: np.ndarray) -> None:
        result = quality_roughness(synthetic_spectrum)
        assert isinstance(result, float)
        assert result > 0

    def test_2d_returns_array(self, synthetic_batch: np.ndarray) -> None:
        result = quality_roughness(synthetic_batch)
        assert isinstance(result, np.ndarray)
        assert result.shape == (synthetic_batch.shape[0],)
        assert np.all(result > 0)

    def test_constant_spectrum_is_zero(self) -> None:
        constant = np.ones(100)
        assert quality_roughness(constant) == 0.0

    def test_noisy_rougher_than_smooth(self) -> None:
        x = np.linspace(0, 2 * np.pi, 200)
        smooth = np.sin(x)
        rng = np.random.default_rng(42)
        noisy = smooth + rng.normal(0, 0.5, size=200)
        assert quality_roughness(noisy) > quality_roughness(smooth)

    def test_order_2(self, synthetic_spectrum: np.ndarray) -> None:
        r1 = quality_roughness(synthetic_spectrum, order=1)
        r2 = quality_roughness(synthetic_spectrum, order=2)
        # Both should be positive; order 2 is typically larger for noisy signals
        assert r1 > 0
        assert r2 > 0

    def test_invalid_order_zero(self) -> None:
        with pytest.raises(ValueError, match="order must be >= 1"):
            quality_roughness(np.ones(10), order=0)

    def test_invalid_order_negative(self) -> None:
        with pytest.raises(ValueError, match="order must be >= 1"):
            quality_roughness(np.ones(10), order=-1)

    def test_order_too_large(self) -> None:
        with pytest.raises(ValueError, match="order.*must be less than spectrum length"):
            quality_roughness(np.ones(5), order=5)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            quality_roughness(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            quality_roughness(np.ones((2, 3, 4)))

    def test_list_input(self) -> None:
        result = quality_roughness([1.0, 2.0, 4.0, 7.0])
        assert isinstance(result, float)
        assert result > 0


# ---------------------------------------------------------------------------
# quality_snr
# ---------------------------------------------------------------------------


class TestQualitySNR:
    """Tests for quality_snr."""

    def test_auto_mode_1d(self, synthetic_spectrum: np.ndarray) -> None:
        result = quality_snr(synthetic_spectrum)
        assert isinstance(result, float)
        assert result > 0

    def test_auto_mode_2d(self, synthetic_batch: np.ndarray) -> None:
        result = quality_snr(synthetic_batch)
        assert isinstance(result, np.ndarray)
        assert result.shape == (synthetic_batch.shape[0],)
        assert np.all(result > 0)

    def test_high_snr_for_clean_spectrum(self) -> None:
        x = np.linspace(0, 10, 500)
        clean = np.exp(-0.5 * ((x - 5) / 0.5) ** 2)
        rng = np.random.default_rng(42)
        noisy = clean + rng.normal(0, 0.5, size=500)
        snr_clean = quality_snr(clean)
        snr_noisy = quality_snr(noisy)
        assert snr_clean > snr_noisy

    def test_explicit_regions_1d(self) -> None:
        rng = np.random.default_rng(42)
        spectrum = np.zeros(200)
        spectrum[80:120] = 5.0  # signal region
        spectrum += rng.normal(0, 0.1, size=200)
        snr = quality_snr(spectrum, signal_range=(80, 120), noise_range=(0, 50))
        assert isinstance(snr, float)
        assert snr > 10  # strong signal relative to noise

    def test_explicit_regions_2d(self) -> None:
        rng = np.random.default_rng(42)
        batch = np.zeros((3, 200))
        batch[:, 80:120] = 5.0
        batch += rng.normal(0, 0.1, size=(3, 200))
        result = quality_snr(batch, signal_range=(80, 120), noise_range=(0, 50))
        assert isinstance(result, np.ndarray)
        assert result.shape == (3,)
        assert np.all(result > 10)

    def test_only_signal_range_raises(self) -> None:
        with pytest.raises(ValueError, match="both be provided or both omitted"):
            quality_snr(np.ones(100), signal_range=(10, 50))

    def test_only_noise_range_raises(self) -> None:
        with pytest.raises(ValueError, match="both be provided or both omitted"):
            quality_snr(np.ones(100), noise_range=(10, 50))

    def test_invalid_range_start_ge_end(self) -> None:
        with pytest.raises(ValueError, match="start.*must be less than end"):
            quality_snr(np.ones(100), signal_range=(50, 10), noise_range=(60, 80))

    def test_range_out_of_bounds(self) -> None:
        with pytest.raises(ValueError, match="out of bounds"):
            quality_snr(np.ones(100), signal_range=(0, 50), noise_range=(80, 120))

    def test_auto_too_short_raises(self) -> None:
        with pytest.raises(ValueError, match="at least 3 points"):
            quality_snr(np.array([1.0, 2.0]))

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            quality_snr(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            quality_snr(np.ones((2, 3, 4)))
