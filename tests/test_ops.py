"""Tests for spectral operations (subtract, average, interpolate)."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError
from spectrakit.ops import (
    spectral_average,
    spectral_crop,
    spectral_interpolate,
    spectral_subtract,
)


class TestSpectralSubtract:
    """Verify spectral subtraction."""

    def test_1d_subtraction(self) -> None:
        a = np.array([5.0, 10.0, 15.0])
        b = np.array([1.0, 2.0, 3.0])
        result = spectral_subtract(a, b)
        np.testing.assert_array_equal(result, [4.0, 8.0, 12.0])

    def test_1d_with_factor(self) -> None:
        a = np.array([5.0, 10.0, 15.0])
        b = np.array([1.0, 2.0, 3.0])
        result = spectral_subtract(a, b, factor=2.0)
        np.testing.assert_array_equal(result, [3.0, 6.0, 9.0])

    def test_2d_subtraction(self) -> None:
        a = np.array([[5.0, 10.0], [15.0, 20.0]])
        b = np.array([1.0, 2.0])
        result = spectral_subtract(a, b)
        expected = np.array([[4.0, 8.0], [14.0, 18.0]])
        np.testing.assert_array_equal(result, expected)

    def test_self_subtraction_is_zero(self) -> None:
        a = np.array([1.0, 2.0, 3.0])
        result = spectral_subtract(a, a)
        np.testing.assert_array_equal(result, [0.0, 0.0, 0.0])

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            spectral_subtract(np.array([]), np.array([]))

    def test_incompatible_shapes_raises(self) -> None:
        """Subtracting spectra with different point counts should raise."""
        spectrum = np.array([1.0, 2.0, 3.0])
        background = np.array([1.0, 2.0])
        with pytest.raises(SpectrumShapeError, match="3 points.*2 points"):
            spectral_subtract(spectrum, background)

    def test_incompatible_shapes_2d_raises(self) -> None:
        """2D spectrum with wrong background size should raise."""
        spectrum = np.ones((5, 100))
        background = np.ones(50)
        with pytest.raises(SpectrumShapeError, match="100 points.*50 points"):
            spectral_subtract(spectrum, background)

    def test_keyword_arg_names(self) -> None:
        """New parameter names (spectrum, background) work as kwargs."""
        result = spectral_subtract(
            spectrum=np.array([5.0, 10.0]),
            background=np.array([1.0, 2.0]),
            factor=1.0,
        )
        np.testing.assert_array_equal(result, [4.0, 8.0])


class TestSpectralAverage:
    """Verify spectral averaging."""

    def test_2d_mean(self) -> None:
        batch = np.array([[1.0, 2.0, 3.0], [3.0, 4.0, 5.0]])
        result = spectral_average(batch)
        np.testing.assert_array_equal(result, [2.0, 3.0, 4.0])

    def test_1d_returns_copy(self) -> None:
        y = np.array([1.0, 2.0, 3.0])
        result = spectral_average(y)
        np.testing.assert_array_equal(result, y)
        # Should be a copy, not the same object
        assert result is not y

    def test_single_spectrum_batch(self) -> None:
        batch = np.array([[1.0, 2.0, 3.0]])
        result = spectral_average(batch)
        np.testing.assert_array_equal(result, [1.0, 2.0, 3.0])

    def test_output_shape(self) -> None:
        batch = np.ones((10, 200))
        result = spectral_average(batch)
        assert result.shape == (200,)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            spectral_average(np.array([]))


class TestSpectralInterpolate:
    """Verify spectral interpolation."""

    def test_output_shape_1d(self) -> None:
        y = np.array([1.0, 4.0, 9.0, 16.0])
        wn = np.array([400.0, 800.0, 1200.0, 1600.0])
        new_wn = np.linspace(400, 1600, 10)
        result = spectral_interpolate(y, wn, new_wn)
        assert result.shape == (10,)

    def test_output_shape_2d(self) -> None:
        y = np.ones((5, 4))
        wn = np.array([400.0, 800.0, 1200.0, 1600.0])
        new_wn = np.linspace(400, 1600, 10)
        result = spectral_interpolate(y, wn, new_wn)
        assert result.shape == (5, 10)

    def test_identity_interpolation(self) -> None:
        """Interpolating onto the same grid should return the same values."""
        y = np.array([1.0, 4.0, 9.0, 16.0])
        wn = np.array([400.0, 800.0, 1200.0, 1600.0])
        result = spectral_interpolate(y, wn, wn)
        np.testing.assert_allclose(result, y, atol=1e-10)

    def test_linear_interpolation(self) -> None:
        """Linear data should be perfectly interpolated."""
        wn = np.array([0.0, 10.0])
        y = np.array([0.0, 10.0])
        new_wn = np.array([2.5, 5.0, 7.5])
        result = spectral_interpolate(y, wn, new_wn, kind="linear")
        np.testing.assert_allclose(result, [2.5, 5.0, 7.5], atol=1e-10)

    def test_cubic_interpolation(self) -> None:
        wn = np.linspace(0, 10, 20)
        y = np.sin(wn)
        new_wn = np.linspace(0, 10, 100)
        result = spectral_interpolate(y, wn, new_wn, kind="cubic")
        expected = np.sin(new_wn)
        np.testing.assert_allclose(result, expected, atol=0.01)

    def test_empty_raises(self) -> None:
        with pytest.raises(EmptySpectrumError):
            spectral_interpolate(np.array([]), np.array([]), np.array([1.0]))

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            spectral_interpolate(np.ones((2, 3, 4)), np.ones(4), np.ones(10))


class TestSpectralCrop:
    """Verify spectral cropping (wavenumber range selection)."""

    def test_crop_1d(self) -> None:
        """Crop a 1D spectrum to a wavenumber subrange."""
        wn = np.linspace(400, 4000, 1000)
        rng = np.random.default_rng(42)
        y = rng.random(1000)

        cropped_y, cropped_wn = spectral_crop(y, wn, start=800, end=1800)

        # Cropped wavenumbers should all be within [800, 1800]
        assert cropped_wn.min() >= 800.0
        assert cropped_wn.max() <= 1800.0

        # Output shapes should match
        assert cropped_y.shape == cropped_wn.shape
        assert cropped_y.ndim == 1

        # Should be fewer points than the original
        assert len(cropped_wn) < len(wn)
        assert len(cropped_wn) > 0

    def test_crop_2d(self) -> None:
        """Crop a 2D batch of spectra to a wavenumber subrange."""
        wn = np.linspace(400, 4000, 500)
        rng = np.random.default_rng(42)
        batch = rng.random((3, 500))

        cropped_y, cropped_wn = spectral_crop(batch, wn, start=1000, end=2000)

        # Batch dimension preserved
        assert cropped_y.ndim == 2
        assert cropped_y.shape[0] == 3

        # Spectral dimension reduced
        assert cropped_y.shape[1] == len(cropped_wn)
        assert cropped_y.shape[1] < 500

        # Wavenumber bounds respected
        assert cropped_wn.min() >= 1000.0
        assert cropped_wn.max() <= 2000.0

    def test_crop_no_points_raises(self) -> None:
        """Range completely outside data should raise ValueError."""
        wn = np.linspace(400, 4000, 100)
        y = np.ones(100)
        with pytest.raises(ValueError, match="No points in"):
            spectral_crop(y, wn, start=5000, end=6000)

    def test_crop_equal_bounds_raises(self) -> None:
        """start == end should raise ValueError."""
        wn = np.linspace(400, 4000, 100)
        y = np.ones(100)
        with pytest.raises(ValueError, match="start and end must differ"):
            spectral_crop(y, wn, start=1000, end=1000)

    def test_crop_reversed_bounds_ok(self) -> None:
        """start > end should auto-swap and still work."""
        wn = np.linspace(400, 4000, 1000)
        y = np.ones(1000)

        # Passing start=1800, end=800 (reversed) should be equivalent to 800-1800
        cropped_y, cropped_wn = spectral_crop(y, wn, start=1800, end=800)
        assert cropped_wn.min() >= 800.0
        assert cropped_wn.max() <= 1800.0
        assert len(cropped_wn) > 0


class TestInterpolationExtrapolationWarning:
    """Verify extrapolation warning for spectral_interpolate."""

    def test_interpolation_extrapolation_warns(self) -> None:
        """new_wavenumbers beyond the original range should trigger a warning."""
        y = np.array([1.0, 2.0, 3.0, 4.0])
        wn = np.array([400.0, 800.0, 1200.0, 1600.0])
        # New wavenumbers extend beyond the original range on both sides
        new_wn = np.array([200.0, 800.0, 1200.0, 2000.0])
        with pytest.warns(UserWarning, match="extends beyond the original range"):
            spectral_interpolate(y, wn, new_wn)

    def test_interpolation_no_warning_in_range(self) -> None:
        """new_wavenumbers within the original range should not warn."""
        import warnings

        y = np.array([1.0, 2.0, 3.0, 4.0])
        wn = np.array([400.0, 800.0, 1200.0, 1600.0])
        new_wn = np.array([500.0, 800.0, 1200.0, 1500.0])
        with warnings.catch_warnings():
            warnings.simplefilter("error")
            # Should not raise any warning
            spectral_interpolate(y, wn, new_wn)


class TestWavenumberLengthValidation:
    """Verify wavenumber-intensities length mismatch detection."""

    def test_crop_wavenumber_mismatch_1d(self) -> None:
        """crop with mismatched wavenumber length raises ValueError."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 50)  # wrong length
        with pytest.raises(ValueError, match="wavenumbers length.*does not match"):
            spectral_crop(y, wn, start=800, end=1800)

    def test_crop_wavenumber_mismatch_2d(self) -> None:
        """crop with mismatched wavenumber length on 2D raises ValueError."""
        y = np.ones((3, 100))
        wn = np.linspace(400, 4000, 50)  # wrong length
        with pytest.raises(ValueError, match="wavenumbers length.*does not match"):
            spectral_crop(y, wn, start=800, end=1800)

    def test_interpolate_wavenumber_mismatch(self) -> None:
        """interpolate with mismatched wavenumber length raises ValueError."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 50)  # wrong length
        new_wn = np.linspace(500, 3500, 80)
        with pytest.raises(ValueError, match="wavenumbers length.*does not match"):
            spectral_interpolate(y, wn, new_wn)
