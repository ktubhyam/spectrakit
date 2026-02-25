"""Tests for custom exception hierarchy."""
from __future__ import annotations

import pytest

from spectrakit.exceptions import (
    DependencyError,
    EmptySpectrumError,
    FileFormatError,
    SpectraKitError,
    SpectrumShapeError,
)


class TestExceptionHierarchy:
    """Verify that custom exceptions inherit from both SpectraKitError and built-in types."""

    def test_spectrum_shape_error_is_value_error(self) -> None:
        with pytest.raises(ValueError):
            raise SpectrumShapeError("bad shape")

    def test_spectrum_shape_error_is_spectrakit_error(self) -> None:
        with pytest.raises(SpectraKitError):
            raise SpectrumShapeError("bad shape")

    def test_file_format_error_is_value_error(self) -> None:
        with pytest.raises(ValueError):
            raise FileFormatError("parse failed")

    def test_file_format_error_is_spectrakit_error(self) -> None:
        with pytest.raises(SpectraKitError):
            raise FileFormatError("parse failed")

    def test_dependency_error_is_import_error(self) -> None:
        with pytest.raises(ImportError):
            raise DependencyError("missing h5py")

    def test_dependency_error_is_spectrakit_error(self) -> None:
        with pytest.raises(SpectraKitError):
            raise DependencyError("missing h5py")

    def test_empty_spectrum_error_is_value_error(self) -> None:
        with pytest.raises(ValueError):
            raise EmptySpectrumError("empty")

    def test_empty_spectrum_error_is_spectrakit_error(self) -> None:
        with pytest.raises(SpectraKitError):
            raise EmptySpectrumError("empty")

    def test_catch_all_spectrakit_errors(self) -> None:
        """SpectraKitError catches any custom exception."""
        for exc_cls in (SpectrumShapeError, FileFormatError, DependencyError, EmptySpectrumError):
            with pytest.raises(SpectraKitError):
                raise exc_cls("test")

    def test_error_message_preserved(self) -> None:
        msg = "wavenumbers length 500 != intensities length 1000"
        err = SpectrumShapeError(msg)
        assert str(err) == msg
