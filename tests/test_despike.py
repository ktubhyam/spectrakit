"""Tests for the despike subpackage (Whitaker-Hayes and Z-score)."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit import despike_whitaker_hayes, despike_zscore
from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError

# ---------------------------------------------------------------------------
# despike_zscore
# ---------------------------------------------------------------------------


class TestDespikeZscore:
    """Tests for despike_zscore."""

    def test_output_shape_1d(self, spiked_spectrum: np.ndarray) -> None:
        result = despike_zscore(spiked_spectrum)
        assert result.shape == spiked_spectrum.shape

    def test_output_shape_2d(self, synthetic_batch: np.ndarray) -> None:
        result = despike_zscore(synthetic_batch)
        assert result.shape == synthetic_batch.shape

    def test_removes_known_spikes(self, spiked_spectrum: np.ndarray) -> None:
        clean = despike_zscore(spiked_spectrum, threshold=3.0)
        # Spikes were at indices 100, 250, 400 with amplitudes +5, +8, +6
        # After despiking, values should be much closer to the baseline
        for idx in [100, 250, 400]:
            assert abs(clean[idx]) < abs(spiked_spectrum[idx])

    def test_preserves_clean_spectrum(self, synthetic_spectrum: np.ndarray) -> None:
        clean = despike_zscore(synthetic_spectrum, threshold=5.0)
        np.testing.assert_allclose(clean, synthetic_spectrum, atol=0.05)

    def test_single_spike_replaced_with_median(self) -> None:
        data = np.ones(100)
        data[50] = 100.0  # huge spike
        result = despike_zscore(data, threshold=3.0)
        assert abs(result[50] - 1.0) < 0.1

    def test_constant_spectrum_unchanged(self) -> None:
        data = np.full(100, 5.0)
        result = despike_zscore(data)
        np.testing.assert_array_equal(result, data)

    def test_returns_copy(self, spiked_spectrum: np.ndarray) -> None:
        result = despike_zscore(spiked_spectrum)
        assert result is not spiked_spectrum

    def test_invalid_threshold_zero(self) -> None:
        with pytest.raises(ValueError, match="threshold must be positive"):
            despike_zscore(np.ones(10), threshold=0)

    def test_invalid_threshold_negative(self) -> None:
        with pytest.raises(ValueError, match="threshold must be positive"):
            despike_zscore(np.ones(10), threshold=-1.0)

    def test_invalid_window_size_too_small(self) -> None:
        with pytest.raises(ValueError, match="window_size must be >= 3"):
            despike_zscore(np.ones(10), window_size=1)

    def test_invalid_window_size_even(self) -> None:
        with pytest.raises(ValueError, match="window_size must be odd"):
            despike_zscore(np.ones(10), window_size=4)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            despike_zscore(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            despike_zscore(np.ones((2, 3, 4)))


# ---------------------------------------------------------------------------
# despike_whitaker_hayes
# ---------------------------------------------------------------------------


class TestDespikeWhitakerHayes:
    """Tests for despike_whitaker_hayes."""

    def test_output_shape_1d(self, spiked_spectrum: np.ndarray) -> None:
        result = despike_whitaker_hayes(spiked_spectrum)
        assert result.shape == spiked_spectrum.shape

    def test_output_shape_2d(self, synthetic_batch: np.ndarray) -> None:
        result = despike_whitaker_hayes(synthetic_batch)
        assert result.shape == synthetic_batch.shape

    def test_removes_known_spikes(self, spiked_spectrum: np.ndarray) -> None:
        clean = despike_whitaker_hayes(spiked_spectrum, threshold=3.0)
        for idx in [100, 250, 400]:
            assert abs(clean[idx]) < abs(spiked_spectrum[idx])

    def test_preserves_clean_spectrum(self) -> None:
        x = np.linspace(0, 10, 200)
        clean = np.sin(x)
        result = despike_whitaker_hayes(clean, threshold=5.0)
        np.testing.assert_allclose(result, clean, atol=0.01)

    def test_interpolates_spike(self) -> None:
        """Verify spike is replaced by interpolation, not median."""
        data = np.linspace(0, 10, 100)
        data[50] += 50.0  # spike on a linear ramp
        result = despike_whitaker_hayes(data, threshold=3.0)
        # Interpolated value should be close to the linear ramp value
        expected = 50 * 10 / 99  # linear interpolation
        assert abs(result[50] - expected) < 0.5

    def test_adjacent_spikes(self) -> None:
        """Multiple adjacent spikes should be partially reduced."""
        data = np.ones(100)
        data[48:53] = 50.0  # 5 adjacent spikes
        result = despike_whitaker_hayes(data, threshold=3.0)
        # Edge spike points (48, 52) detected via 2nd derivative should be fixed
        # Interior points may remain high since their 2nd derivative is zero
        # At minimum, the treated points should be closer to 1.0 than 50.0
        assert np.mean(result[48:53]) < np.mean(data[48:53])

    def test_returns_copy(self, spiked_spectrum: np.ndarray) -> None:
        result = despike_whitaker_hayes(spiked_spectrum)
        assert result is not spiked_spectrum

    def test_windowed_mode(self, spiked_spectrum: np.ndarray) -> None:
        result = despike_whitaker_hayes(spiked_spectrum, threshold=3.0, window_size=21)
        assert result.shape == spiked_spectrum.shape
        for idx in [100, 250, 400]:
            assert abs(result[idx]) < abs(spiked_spectrum[idx])

    def test_invalid_threshold(self) -> None:
        with pytest.raises(ValueError, match="threshold must be positive"):
            despike_whitaker_hayes(np.ones(10), threshold=0)

    def test_too_short_spectrum(self) -> None:
        with pytest.raises(ValueError, match="at least 4 points"):
            despike_whitaker_hayes(np.ones(3))

    def test_invalid_window_size_even(self) -> None:
        with pytest.raises(ValueError, match="window_size must be odd"):
            despike_whitaker_hayes(np.ones(20), window_size=4)

    def test_invalid_window_size_too_small(self) -> None:
        with pytest.raises(ValueError, match="window_size must be >= 3"):
            despike_whitaker_hayes(np.ones(20), window_size=1)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            despike_whitaker_hayes(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            despike_whitaker_hayes(np.ones((2, 3, 4)))

    def test_no_spikes_returns_copy(self) -> None:
        data = np.ones(50)
        result = despike_whitaker_hayes(data)
        np.testing.assert_array_equal(result, data)
        assert result is not data
