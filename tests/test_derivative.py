"""Tests for spectral derivative methods."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.derivative import derivative_gap_segment, derivative_savgol
from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError


class TestDerivativeSavgol:
    """Verify Savitzky-Golay derivative."""

    def test_output_shape_1d(self) -> None:
        y = np.random.default_rng(42).random(100)
        result = derivative_savgol(y)
        assert result.shape == y.shape

    def test_output_shape_2d(self) -> None:
        y = np.random.default_rng(42).random((5, 100))
        result = derivative_savgol(y)
        assert result.shape == y.shape

    def test_first_derivative_of_linear(self) -> None:
        """First derivative of a linear function should be roughly constant."""
        y = np.linspace(0, 10, 200)
        deriv1 = derivative_savgol(y, window_length=11, polyorder=3, deriv=1)
        # Ignore edges (boundary effects)
        interior = deriv1[20:-20]
        assert np.std(interior) < 0.01

    def test_second_derivative_of_quadratic(self) -> None:
        """Second derivative of x^2 should be roughly constant."""
        x = np.linspace(-5, 5, 200)
        y = x**2
        deriv2 = derivative_savgol(y, window_length=15, polyorder=4, deriv=2)
        interior = deriv2[30:-30]
        # Should be approximately 2 * dx^2 scaling factor
        assert np.std(interior) / np.mean(np.abs(interior)) < 0.05

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            derivative_savgol(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            derivative_savgol(np.ones((2, 3, 4)))


class TestDerivativeGapSegment:
    """Verify gap-segment derivative."""

    def test_output_shape_1d(self) -> None:
        y = np.random.default_rng(42).random(100)
        result = derivative_gap_segment(y)
        assert result.shape == y.shape

    def test_output_shape_2d(self) -> None:
        y = np.random.default_rng(42).random((5, 100))
        result = derivative_gap_segment(y)
        assert result.shape == y.shape

    def test_first_derivative_detects_slope(self) -> None:
        """Positive slope region should have positive first derivative."""
        y = np.concatenate([np.zeros(50), np.linspace(0, 10, 100), 10 * np.ones(50)])
        deriv1 = derivative_gap_segment(y, gap=5, segment=5, deriv=1)
        # The rising region should have positive derivative
        rising = deriv1[60:140]
        assert np.mean(rising) > 0

    def test_second_derivative(self) -> None:
        y = np.random.default_rng(42).random(100)
        result = derivative_gap_segment(y, deriv=2)
        assert result.shape == y.shape

    def test_invalid_deriv_raises(self) -> None:
        with pytest.raises(ValueError, match="deriv must be 1 or 2"):
            derivative_gap_segment(np.ones(100), deriv=3)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            derivative_gap_segment(np.array([]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            derivative_gap_segment(np.ones((2, 3, 4)))

    def test_zero_gap_raises(self) -> None:
        with pytest.raises(ValueError, match="gap must be >= 1"):
            derivative_gap_segment(np.ones(100), gap=0)

    def test_zero_segment_raises(self) -> None:
        with pytest.raises(ValueError, match="segment must be >= 1"):
            derivative_gap_segment(np.ones(100), segment=0)
