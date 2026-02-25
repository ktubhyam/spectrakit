"""Tests for internal validation utilities."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit._validate import (
    EPSILON,
    MAX_FILE_SIZE,
    apply_along_spectra,
    ensure_float64,
    validate_1d_or_2d,
    validate_file_size,
    warn_if_not_finite,
)
from spectrakit.exceptions import EmptySpectrumError, SpectrumShapeError


class TestEpsilon:
    """Verify the shared epsilon constant."""

    def test_epsilon_is_small_positive(self) -> None:
        assert EPSILON > 0
        assert EPSILON < 1e-6


class TestEnsureFloat64:
    """Verify ensure_float64 conversion."""

    def test_list_to_float64(self) -> None:
        arr = ensure_float64([1, 2, 3])
        assert arr.dtype == np.float64
        np.testing.assert_array_equal(arr, [1.0, 2.0, 3.0])

    def test_int_array_to_float64(self) -> None:
        arr = ensure_float64(np.array([1, 2, 3], dtype=np.int32))
        assert arr.dtype == np.float64

    def test_float32_to_float64(self) -> None:
        arr = ensure_float64(np.array([1.5, 2.5], dtype=np.float32))
        assert arr.dtype == np.float64
        np.testing.assert_allclose(arr, [1.5, 2.5])

    def test_already_float64_returns_contiguous(self) -> None:
        original = np.array([1.0, 2.0, 3.0], dtype=np.float64)
        result = ensure_float64(original)
        assert result.dtype == np.float64
        assert result.flags["C_CONTIGUOUS"]

    def test_nested_list_2d(self) -> None:
        arr = ensure_float64([[1, 2], [3, 4]])
        assert arr.dtype == np.float64
        assert arr.shape == (2, 2)

    def test_non_numeric_raises_type_error(self) -> None:
        with pytest.raises(TypeError, match="Cannot convert"):
            ensure_float64(["hello", "world"])

    def test_none_raises_type_error(self) -> None:
        # np.asarray(None) creates a 0-d object array, but float64 cast
        # should still succeed (produces nan-like); however a truly
        # unconvertible type like a dict will fail.
        with pytest.raises(TypeError, match="Cannot convert"):
            ensure_float64({"a": 1})


class TestValidate1dOr2d:
    """Verify shape validation."""

    def test_1d_passes(self) -> None:
        arr = np.array([1.0, 2.0, 3.0])
        result = validate_1d_or_2d(arr)
        assert result is arr

    def test_2d_passes(self) -> None:
        arr = np.ones((3, 10))
        result = validate_1d_or_2d(arr)
        assert result is arr

    def test_0d_raises(self) -> None:
        arr = np.float64(42.0)
        with pytest.raises(SpectrumShapeError, match="1-D or 2-D"):
            validate_1d_or_2d(arr)

    def test_3d_raises(self) -> None:
        arr = np.ones((2, 3, 4))
        with pytest.raises(SpectrumShapeError, match="3-D"):
            validate_1d_or_2d(arr)

    def test_empty_1d_raises(self) -> None:
        arr = np.array([], dtype=np.float64)
        with pytest.raises(EmptySpectrumError, match="empty"):
            validate_1d_or_2d(arr)

    def test_empty_2d_raises(self) -> None:
        arr = np.ones((0, 10))
        with pytest.raises(EmptySpectrumError, match="empty"):
            validate_1d_or_2d(arr)

    def test_empty_allowed(self) -> None:
        arr = np.array([], dtype=np.float64)
        result = validate_1d_or_2d(arr, allow_empty=True)
        assert result is arr

    def test_custom_name_in_error(self) -> None:
        arr = np.ones((2, 3, 4))
        with pytest.raises(SpectrumShapeError, match="wavenumbers"):
            validate_1d_or_2d(arr, name="wavenumbers")


class TestApplyAlongSpectra:
    """Verify the 2-D dispatch helper."""

    @staticmethod
    def _double(intensities: np.ndarray) -> np.ndarray:
        """Trivial 1-D function that doubles values."""
        return intensities * 2.0

    @staticmethod
    def _add_offset(intensities: np.ndarray, offset: float = 0.0) -> np.ndarray:
        """1-D function with a keyword argument."""
        return intensities + offset

    def test_1d_input(self) -> None:
        arr = np.array([1.0, 2.0, 3.0])
        result = apply_along_spectra(self._double, arr)
        np.testing.assert_array_equal(result, [2.0, 4.0, 6.0])

    def test_2d_input_applies_per_row(self) -> None:
        arr = np.array([[1.0, 2.0], [3.0, 4.0]])
        result = apply_along_spectra(self._double, arr)
        expected = np.array([[2.0, 4.0], [6.0, 8.0]])
        np.testing.assert_array_equal(result, expected)

    def test_kwargs_forwarded(self) -> None:
        arr = np.array([1.0, 2.0, 3.0])
        result = apply_along_spectra(self._add_offset, arr, offset=10.0)
        np.testing.assert_array_equal(result, [11.0, 12.0, 13.0])

    def test_kwargs_forwarded_2d(self) -> None:
        arr = np.array([[1.0, 2.0], [3.0, 4.0]])
        result = apply_along_spectra(self._add_offset, arr, offset=5.0)
        expected = np.array([[6.0, 7.0], [8.0, 9.0]])
        np.testing.assert_array_equal(result, expected)

    def test_preserves_shape(self) -> None:
        arr = np.ones((5, 100))
        result = apply_along_spectra(self._double, arr)
        assert result.shape == (5, 100)


class TestWarnIfNotFinite:
    """Verify NaN/Inf warning helper."""

    def test_finite_array_no_warning(self) -> None:
        import warnings

        arr = np.array([1.0, 2.0, 3.0])
        with warnings.catch_warnings():
            warnings.simplefilter("error")
            # Should not raise any warning
            warn_if_not_finite(arr)

    def test_nan_triggers_warning(self) -> None:
        arr = np.array([1.0, np.nan, 3.0])
        with pytest.warns(UserWarning, match="1 NaN"):
            warn_if_not_finite(arr)

    def test_inf_triggers_warning(self) -> None:
        arr = np.array([1.0, np.inf, -np.inf])
        with pytest.warns(UserWarning, match="2 Inf"):
            warn_if_not_finite(arr)

    def test_nan_and_inf_together(self) -> None:
        arr = np.array([np.nan, np.inf, 1.0])
        with pytest.warns(UserWarning, match="NaN.*Inf"):
            warn_if_not_finite(arr)

    def test_custom_name_in_warning(self) -> None:
        arr = np.array([np.nan])
        with pytest.warns(UserWarning, match="wavenumbers"):
            warn_if_not_finite(arr, name="wavenumbers")


class TestValidateFileSize:
    """Verify file size validation."""

    def test_small_file_passes(self) -> None:
        # Should not raise
        validate_file_size(1024, path_name="test.csv")

    def test_exactly_at_limit_passes(self) -> None:
        validate_file_size(MAX_FILE_SIZE, path_name="test.csv")

    def test_over_limit_raises(self) -> None:
        with pytest.raises(ValueError, match="exceeding the.*limit"):
            validate_file_size(MAX_FILE_SIZE + 1, path_name="huge.opus")

    def test_error_message_contains_filename(self) -> None:
        with pytest.raises(ValueError, match="huge.opus"):
            validate_file_size(MAX_FILE_SIZE + 1, path_name="huge.opus")


class TestMaxFileSizeEnvVar:
    """Verify SPECTRAKIT_MAX_FILE_SIZE environment variable override."""

    def test_env_var_overrides_default(self) -> None:
        from unittest.mock import patch

        from spectrakit._validate import _DEFAULT_MAX_FILE_SIZE, _read_max_file_size

        with patch.dict("os.environ", {"SPECTRAKIT_MAX_FILE_SIZE": "1024"}):
            assert _read_max_file_size() == 1024
        # Without the env var, should return default
        assert _read_max_file_size() == _DEFAULT_MAX_FILE_SIZE

    def test_invalid_env_var_uses_default(self) -> None:
        from unittest.mock import patch

        from spectrakit._validate import _DEFAULT_MAX_FILE_SIZE, _read_max_file_size

        with patch.dict("os.environ", {"SPECTRAKIT_MAX_FILE_SIZE": "not_a_number"}):
            assert _read_max_file_size() == _DEFAULT_MAX_FILE_SIZE
