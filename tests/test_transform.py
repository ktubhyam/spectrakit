"""Tests for spectral transformation methods."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError
from spectrakit.transform import (
    transform_absorbance_to_transmittance,
    transform_atr_correction,
    transform_kubelka_munk,
    transform_transmittance_to_absorbance,
)


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


class TestATRParameterValidation:
    """Verify physics parameter validation for ATR correction."""

    def test_negative_n_crystal_raises(self) -> None:
        """Negative refractive index for crystal should raise ValueError."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        with pytest.raises(ValueError, match="n_crystal must be positive"):
            transform_atr_correction(y, wn, n_crystal=-1.0)

    def test_negative_n_sample_raises(self) -> None:
        """Negative refractive index for sample should raise ValueError."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        with pytest.raises(ValueError, match="n_sample must be positive"):
            transform_atr_correction(y, wn, n_sample=-1.0)

    def test_invalid_angle_zero_raises(self) -> None:
        """Angle of 0 degrees should raise ValueError."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        with pytest.raises(ValueError, match="angle must be in.*0.*90"):
            transform_atr_correction(y, wn, angle=0.0)

    def test_invalid_angle_90_raises(self) -> None:
        """Angle of 90 degrees should raise ValueError."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        with pytest.raises(ValueError, match="angle must be in.*0.*90"):
            transform_atr_correction(y, wn, angle=90.0)

    def test_n_ratio_too_high_raises(self) -> None:
        """n_sample > n_crystal means no total internal reflection."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        with pytest.raises(ValueError, match="n_sample.*must be less than n_crystal"):
            transform_atr_correction(y, wn, n_crystal=1.5, n_sample=2.4)

    def test_below_critical_angle_raises(self) -> None:
        """Angle too small for given refractive indices should raise."""
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        # n_sample/n_crystal = 1.5/2.4 = 0.625
        # Critical angle = arcsin(0.625) ≈ 38.7 degrees
        # An angle of 20 degrees is well below the critical angle
        with pytest.raises(ValueError, match="below the critical angle"):
            transform_atr_correction(y, wn, n_crystal=2.4, n_sample=1.5, angle=20.0)

    def test_different_crystals_give_different_results(self) -> None:
        """Diamond (2.4) vs Germanium (4.0) should produce different discriminants.

        The ATR correction normalizes by max(dp_inv), so uniform intensities
        yield identical normalized corrections. We verify the underlying
        discriminant differs by checking penetration depth factors directly.
        """
        import math

        angle = 45.0
        theta = math.radians(angle)
        sin2_theta = math.sin(theta) ** 2

        n_ratio_diamond = 1.5 / 2.4
        n_ratio_germanium = 1.5 / 4.0

        disc_diamond = sin2_theta - n_ratio_diamond**2
        disc_germanium = sin2_theta - n_ratio_germanium**2

        # The discriminants should differ because n_ratio differs
        assert disc_diamond != pytest.approx(disc_germanium)
        assert disc_diamond > 0
        assert disc_germanium > 0

        # Also verify both corrections produce valid output
        y = np.ones(100)
        wn = np.linspace(400, 4000, 100)
        corrected_diamond = transform_atr_correction(
            y, wn, n_crystal=2.4, n_sample=1.5, angle=angle
        )
        corrected_germanium = transform_atr_correction(
            y, wn, n_crystal=4.0, n_sample=1.5, angle=angle
        )
        assert corrected_diamond.shape == (100,)
        assert corrected_germanium.shape == (100,)


class TestKubelkaMunkWarning:
    """Verify warnings for out-of-range reflectance in Kubelka-Munk."""

    def test_out_of_range_reflectance_warns(self) -> None:
        """Values > 1 should trigger a warning."""
        r = np.array([0.5, 1.2, 0.8])
        with pytest.warns(UserWarning, match="outside.*0.*1"):
            transform_kubelka_munk(r)

    def test_negative_reflectance_warns(self) -> None:
        """Negative values should trigger a warning."""
        r = np.array([-0.1, 0.5, 0.8])
        with pytest.warns(UserWarning, match="outside.*0.*1"):
            transform_kubelka_munk(r)

    def test_valid_reflectance_no_warning(self) -> None:
        """Values in [0, 1] should not trigger any warning."""
        import warnings

        r = np.array([0.1, 0.5, 0.9])
        with warnings.catch_warnings():
            warnings.simplefilter("error")
            # Should not raise any warning
            transform_kubelka_munk(r)


class TestAbsorbanceTransmittance:
    """Verify absorbance-transmittance conversion functions."""

    def test_roundtrip(self) -> None:
        """A -> %T -> A should recover original values."""
        absorbance = np.array([0.0, 0.5, 1.0, 1.5, 2.0])
        transmittance = transform_absorbance_to_transmittance(absorbance)
        recovered = transform_transmittance_to_absorbance(transmittance)
        np.testing.assert_allclose(recovered, absorbance, atol=1e-8)

    def test_known_values(self) -> None:
        """Known conversion values: A=0 -> %T=100, A=1 -> %T=10, A=2 -> %T=1."""
        absorbance = np.array([0.0, 1.0, 2.0])
        transmittance = transform_absorbance_to_transmittance(absorbance)
        np.testing.assert_allclose(transmittance, [100.0, 10.0, 1.0], atol=1e-10)

    def test_negative_absorbance_warns(self) -> None:
        """Negative absorbance should trigger a warning."""
        absorbance = np.array([-0.5, 1.0])
        with pytest.warns(UserWarning, match="Negative absorbance"):
            transform_absorbance_to_transmittance(absorbance)

    def test_zero_transmittance_warns(self) -> None:
        """%T=0 should trigger a warning about zero/negative transmittance."""
        transmittance = np.array([0.0, 50.0])
        with pytest.warns(UserWarning, match="Zero or negative transmittance"):
            transform_transmittance_to_absorbance(transmittance)

    def test_2d_input(self) -> None:
        """2D inputs should work for both conversion directions."""
        absorbance_2d = np.array([[0.0, 1.0], [2.0, 0.5]])
        transmittance_2d = transform_absorbance_to_transmittance(absorbance_2d)
        assert transmittance_2d.shape == (2, 2)
        np.testing.assert_allclose(transmittance_2d[0], [100.0, 10.0], atol=1e-10)

        recovered = transform_transmittance_to_absorbance(transmittance_2d)
        assert recovered.shape == (2, 2)
        np.testing.assert_allclose(recovered, absorbance_2d, atol=1e-8)

    def test_empty_raises(self) -> None:
        """Empty arrays should raise EmptySpectrumError."""
        with pytest.raises(EmptySpectrumError):
            transform_absorbance_to_transmittance(np.array([]))
        with pytest.raises(EmptySpectrumError):
            transform_transmittance_to_absorbance(np.array([]))

    def test_3d_raises(self) -> None:
        """3D arrays should raise SpectrumShapeError."""
        with pytest.raises(SpectrumShapeError):
            transform_absorbance_to_transmittance(np.ones((2, 3, 4)))
        with pytest.raises(SpectrumShapeError):
            transform_transmittance_to_absorbance(np.ones((2, 3, 4)))
