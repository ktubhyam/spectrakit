"""Tests for the Spectrum container."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.spectrum import Spectrum


class TestSpectrum:
    def test_creation_1d(self) -> None:
        s = Spectrum(intensities=np.ones(100))
        assert s.n_points == 100
        assert s.n_spectra == 1
        assert s.shape == (100,)

    def test_creation_2d(self) -> None:
        s = Spectrum(intensities=np.ones((5, 100)))
        assert s.n_points == 100
        assert s.n_spectra == 5
        assert s.shape == (5, 100)

    def test_wavenumber_validation_mismatch(self) -> None:
        with pytest.raises(ValueError, match="wavenumbers length"):
            Spectrum(intensities=np.ones(100), wavenumbers=np.ones(50))

    def test_wavenumber_validation_2d_mismatch(self) -> None:
        with pytest.raises(ValueError, match="wavenumbers length"):
            Spectrum(intensities=np.ones((5, 100)), wavenumbers=np.ones(50))

    def test_copy(self) -> None:
        original = Spectrum(
            intensities=np.array([1.0, 2.0, 3.0]),
            wavenumbers=np.array([100.0, 200.0, 300.0]),
            label="test",
        )
        copied = original.copy()
        copied.intensities[0] = 999.0
        assert original.intensities[0] == 1.0

    def test_auto_convert_list(self) -> None:
        s = Spectrum(intensities=[1.0, 2.0, 3.0])
        assert isinstance(s.intensities, np.ndarray)

    def test_metadata(self) -> None:
        s = Spectrum(
            intensities=np.ones(10),
            metadata={"instrument": "Bruker", "resolution": 4},
        )
        assert s.metadata["instrument"] == "Bruker"

    def test_wavenumbers_auto_convert_list(self) -> None:
        """Wavenumbers passed as a list are auto-converted to ndarray."""
        s = Spectrum(
            intensities=np.array([1.0, 2.0, 3.0]),
            wavenumbers=[100.0, 200.0, 300.0],
        )
        assert isinstance(s.wavenumbers, np.ndarray)
        np.testing.assert_array_equal(s.wavenumbers, [100.0, 200.0, 300.0])
