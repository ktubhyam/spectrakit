"""Tests for peak detection and integration."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.peaks import PeakResult, peaks_find, peaks_integrate


class TestPeaksFind:
    """Verify peak detection."""

    def test_detects_obvious_peaks(self) -> None:
        """Detect clear Gaussian peaks."""
        x = np.linspace(0, 100, 500)
        y = np.exp(-((x - 30) ** 2) / 10) + np.exp(-((x - 70) ** 2) / 10)

        result = peaks_find(y, height=0.5)
        assert isinstance(result, PeakResult)
        assert len(result.indices) == 2

    def test_peak_heights_correct(self) -> None:
        x = np.linspace(0, 100, 500)
        y = 2.0 * np.exp(-((x - 50) ** 2) / 10)

        result = peaks_find(y, height=0.1)
        assert len(result.heights) >= 1
        # Tallest peak should be close to 2.0
        assert np.max(result.heights) > 1.5

    def test_with_wavenumbers(self) -> None:
        wn = np.linspace(400, 4000, 500)
        y = np.exp(-((wn - 1000) ** 2) / 1000) + np.exp(-((wn - 3000) ** 2) / 1000)

        result = peaks_find(y, wavenumbers=wn, height=0.5)
        assert result.wavenumbers is not None
        assert len(result.wavenumbers) == len(result.indices)
        # First peak should be near 1000 cm^-1
        assert np.any(np.abs(result.wavenumbers - 1000) < 100)

    def test_without_wavenumbers(self) -> None:
        y = np.sin(np.linspace(0, 4 * np.pi, 200)) + 1.5
        result = peaks_find(y, height=1.0)
        assert result.wavenumbers is None
        assert len(result.indices) > 0

    def test_distance_parameter(self) -> None:
        """Larger distance should reduce the number of detected peaks."""
        rng = np.random.default_rng(42)
        y = np.abs(np.sin(np.linspace(0, 20 * np.pi, 1000))) + rng.normal(0, 0.05, 1000)

        result_close = peaks_find(y, height=0.3, distance=5)
        result_far = peaks_find(y, height=0.3, distance=30)
        assert len(result_far.indices) <= len(result_close.indices)

    def test_prominence_filter(self) -> None:
        x = np.linspace(0, 100, 500)
        # Big peak + small peak
        y = 2.0 * np.exp(-((x - 50) ** 2) / 10) + 0.1 * np.exp(-((x - 80) ** 2) / 10)

        result = peaks_find(y, height=0.05, prominence=0.5)
        # Only the big peak should pass the prominence filter
        assert len(result.indices) == 1

    def test_2d_raises(self) -> None:
        with pytest.raises(ValueError, match="1-D"):
            peaks_find(np.ones((5, 100)))


class TestPeaksIntegrate:
    """Verify peak area integration."""

    def test_full_spectrum_integration(self) -> None:
        """Integrate a uniform spectrum."""
        y = np.ones(100)
        area = peaks_integrate(y)
        # Unit spacing, 100 points → area ≈ 99 (trapezoidal rule)
        assert isinstance(area, float)
        assert abs(area - 99.0) < 0.01

    def test_full_with_wavenumbers(self) -> None:
        wn = np.linspace(400, 4000, 100)
        y = np.ones(100)
        area = peaks_integrate(y, wavenumbers=wn)
        expected = 4000 - 400  # 3600
        assert abs(area - expected) < 1.0

    def test_range_integration(self) -> None:
        wn = np.linspace(0, 100, 1001)
        y = np.ones(1001)

        areas = peaks_integrate(y, wavenumbers=wn, ranges=[(0, 50), (50, 100)])
        assert isinstance(areas, np.ndarray)
        assert len(areas) == 2
        np.testing.assert_allclose(areas, [50.0, 50.0], atol=0.1)

    def test_gaussian_peak_area(self) -> None:
        """Area under a Gaussian should be approximately sigma * sqrt(2*pi)."""
        sigma = 5.0
        wn = np.linspace(-50, 50, 1000)
        y = np.exp(-(wn**2) / (2 * sigma**2))

        area = peaks_integrate(y, wavenumbers=wn)
        expected = sigma * np.sqrt(2 * np.pi)
        np.testing.assert_allclose(area, expected, rtol=0.01)

    def test_empty_range_returns_zero(self) -> None:
        wn = np.linspace(0, 100, 100)
        y = np.ones(100)
        areas = peaks_integrate(y, wavenumbers=wn, ranges=[(200, 300)])
        np.testing.assert_array_equal(areas, [0.0])

    def test_ranges_without_wavenumbers_raises(self) -> None:
        with pytest.raises(ValueError, match="wavenumbers are required"):
            peaks_integrate(np.ones(100), ranges=[(0, 50)])
