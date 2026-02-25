"""Tests for spectral transformation methods."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError
from spectrakit.transform import transform_atr_correction, transform_kubelka_munk


class TestTransformKubelkaMunk:
    """Verify Kubelka-Munk transformation."""

    def test_output_shape_1d(self) -> None:
        r = np.array([0.1, 0.5, 0.8, 0.95])
        result = transform_kubelka_munk(r)
        assert result.shape == r.shape

    def test_output_shape_2d(self) -> None:
        r = np.random.default_rng(42).uniform(0.1, 0.9, (5, 100))
        result = transform_kubelka_munk(r)
        assert result.shape == r.shape

    def test_known_values(self) -> None:
        """K/S = (1-R)^2 / (2R) for known reflectance values."""
        # R = 0.5 → K/S = (0.5)^2 / (2*0.5) = 0.25
        result = transform_kubelka_munk(np.array([0.5]))
        np.testing.assert_allclose(result, [0.25], atol=1e-6)

    def test_low_reflectance_high_km(self) -> None:
        """Low reflectance (dark sample) should give high K/S."""
        r = np.array([0.01, 0.5, 0.99])
        km = transform_kubelka_munk(r)
        assert km[0] > km[1] > km[2]

    def test_non_negative(self) -> None:
        """K/S should always be non-negative for valid reflectance."""
        r = np.random.default_rng(42).uniform(0.01, 0.99, 1000)
        km = transform_kubelka_munk(r)
        assert np.all(km >= 0)

    def test_accepts_list(self) -> None:
        result = transform_kubelka_munk([0.1, 0.5, 0.9])
        assert isinstance(result, np.ndarray)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            transform_kubelka_munk(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            transform_kubelka_munk(np.ones((2, 3, 4)))


class TestTransformATRCorrection:
    """Verify ATR path-length correction."""

    def test_output_shape_1d(self) -> None:
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        result = transform_atr_correction(y, wn)
        assert result.shape == y.shape

    def test_output_shape_2d(self) -> None:
        y = np.ones((5, 100))
        wn = np.linspace(400, 4000, 100)
        result = transform_atr_correction(y, wn)
        assert result.shape == y.shape

    def test_higher_wavenumber_stronger(self) -> None:
        """After correction, higher wavenumber peaks should be enhanced."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        corrected = transform_atr_correction(y, wn)
        # The correction should scale with wavenumber
        assert corrected[-1] > corrected[0]

    def test_correction_factor_at_max_wavenumber(self) -> None:
        """At the maximum wavenumber, correction factor should be 1.0."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        corrected = transform_atr_correction(y, wn)
        np.testing.assert_allclose(corrected[-1], 1.0, atol=1e-10)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            transform_atr_correction(np.array([]), np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            transform_atr_correction(np.ones((2, 3, 4)), np.ones(4))
