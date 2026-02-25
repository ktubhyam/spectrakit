"""Tests for the widgets serialization layer.

Tests the binary serialization round-trip for Spectrum objects,
ensuring data integrity when transferring to the frontend. The
SpectrumViewer widget itself is not tested here (requires anywidget
and a Jupyter kernel), only the pure-Python serializers.
"""

from __future__ import annotations

import struct

import numpy as np
import pytest

from spectrakit.spectrum import Spectrum
from spectrakit.widgets._serializers import (
    _ENTRY_PREFIX_FMT,
    _HEADER_FMT,
    spectra_to_binary,
    spectrum_to_binary,
)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _read_header(data: bytes) -> tuple[int, int]:
    """Read the n_spectra count from binary header.

    Returns:
        Tuple of (n_spectra, offset after header).
    """
    (n_spectra,) = struct.unpack_from(_HEADER_FMT, data, 0)
    return n_spectra, struct.calcsize(_HEADER_FMT)


def _read_entry(data: bytes, offset: int) -> tuple[dict, int]:
    """Read a single spectrum entry from binary data.

    Returns:
        Tuple of (entry_dict, new_offset).
    """
    n_points, has_wavenum, label_len = struct.unpack_from(_ENTRY_PREFIX_FMT, data, offset)
    offset += struct.calcsize(_ENTRY_PREFIX_FMT)

    label = data[offset : offset + label_len].decode("utf-8")
    offset += label_len

    intensities = np.frombuffer(data, dtype=np.float64, count=n_points, offset=offset)
    offset += n_points * 8

    wavenumbers = None
    if has_wavenum:
        wavenumbers = np.frombuffer(data, dtype=np.float64, count=n_points, offset=offset)
        offset += n_points * 8

    return {
        "n_points": n_points,
        "has_wavenumbers": bool(has_wavenum),
        "label": label,
        "intensities": intensities,
        "wavenumbers": wavenumbers,
    }, offset


# ---------------------------------------------------------------------------
# Tests: spectrum_to_binary
# ---------------------------------------------------------------------------


class TestSpectrumToBinary:
    """Verify single-Spectrum binary serialization."""

    def test_1d_with_wavenumbers(self) -> None:
        """Serialize a 1D spectrum with wavenumbers."""
        intensities = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
        wavenumbers = np.array([400.0, 800.0, 1200.0, 1600.0, 2000.0])
        spec = Spectrum(
            intensities=intensities,
            wavenumbers=wavenumbers,
            label="ethanol",
        )

        data = spectrum_to_binary(spec)
        n_spectra, offset = _read_header(data)
        assert n_spectra == 1

        entry, offset = _read_entry(data, offset)
        assert entry["n_points"] == 5
        assert entry["has_wavenumbers"] is True
        assert entry["label"] == "ethanol"
        np.testing.assert_array_almost_equal(entry["intensities"], intensities)
        np.testing.assert_array_almost_equal(entry["wavenumbers"], wavenumbers)
        assert offset == len(data)

    def test_1d_without_wavenumbers(self) -> None:
        """Serialize a 1D spectrum without wavenumbers."""
        intensities = np.array([0.5, 1.5, 2.5])
        spec = Spectrum(intensities=intensities, label="no_wavenum")

        data = spectrum_to_binary(spec)
        n_spectra, offset = _read_header(data)
        assert n_spectra == 1

        entry, offset = _read_entry(data, offset)
        assert entry["n_points"] == 3
        assert entry["has_wavenumbers"] is False
        assert entry["label"] == "no_wavenum"
        np.testing.assert_array_almost_equal(entry["intensities"], intensities)
        assert entry["wavenumbers"] is None
        assert offset == len(data)

    def test_2d_expands_rows(self) -> None:
        """A 2D spectrum should be expanded into N separate entries."""
        intensities = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])
        wavenumbers = np.array([400.0, 800.0])
        spec = Spectrum(
            intensities=intensities,
            wavenumbers=wavenumbers,
            label="batch",
        )

        data = spectrum_to_binary(spec)
        n_spectra, offset = _read_header(data)
        assert n_spectra == 3

        for i in range(3):
            entry, offset = _read_entry(data, offset)
            assert entry["label"] == f"batch_{i}"
            np.testing.assert_array_almost_equal(entry["intensities"], intensities[i])
            np.testing.assert_array_almost_equal(entry["wavenumbers"], wavenumbers)

        assert offset == len(data)

    def test_empty_label_gets_default(self) -> None:
        """Empty label should default to 'spectrum'."""
        spec = Spectrum(intensities=np.array([1.0]), label="")
        data = spectrum_to_binary(spec)
        _, offset = _read_header(data)
        entry, _ = _read_entry(data, offset)
        assert entry["label"] == "spectrum"

    def test_unicode_label(self) -> None:
        """Labels with non-ASCII characters should be preserved."""
        spec = Spectrum(intensities=np.array([1.0]), label="sample_\u03b1\u03b2\u03b3")
        data = spectrum_to_binary(spec)
        _, offset = _read_header(data)
        entry, _ = _read_entry(data, offset)
        assert entry["label"] == "sample_\u03b1\u03b2\u03b3"

    def test_3d_raises_value_error(self) -> None:
        """3D intensities should raise ValueError."""
        spec = Spectrum.__new__(Spectrum)
        spec.intensities = np.zeros((2, 3, 4))
        spec.wavenumbers = None
        spec.label = "bad"
        spec.metadata = {}
        spec.source_format = "unknown"

        with pytest.raises(ValueError, match="Expected 1D or 2D"):
            spectrum_to_binary(spec)

    def test_returns_bytes(self) -> None:
        """Output must be bytes, not bytearray or memoryview."""
        spec = Spectrum(intensities=np.array([1.0, 2.0]))
        result = spectrum_to_binary(spec)
        assert isinstance(result, bytes)

    def test_float32_input_converted(self) -> None:
        """Float32 input should be upcast to float64 in binary."""
        intensities = np.array([1.0, 2.0, 3.0], dtype=np.float32)
        spec = Spectrum(intensities=intensities)
        data = spectrum_to_binary(spec)
        _, offset = _read_header(data)
        entry, _ = _read_entry(data, offset)
        # Decoded as float64 should match original values
        np.testing.assert_array_almost_equal(entry["intensities"], [1.0, 2.0, 3.0])

    def test_large_spectrum(self) -> None:
        """Serialize a spectrum with 10,000 points."""
        rng = np.random.default_rng(42)
        intensities = rng.random(10_000)
        wavenumbers = np.linspace(400, 4000, 10_000)
        spec = Spectrum(
            intensities=intensities,
            wavenumbers=wavenumbers,
            label="large",
        )

        data = spectrum_to_binary(spec)
        n_spectra, offset = _read_header(data)
        assert n_spectra == 1

        entry, offset = _read_entry(data, offset)
        assert entry["n_points"] == 10_000
        np.testing.assert_array_almost_equal(entry["intensities"], intensities)
        np.testing.assert_array_almost_equal(entry["wavenumbers"], wavenumbers)
        assert offset == len(data)


# ---------------------------------------------------------------------------
# Tests: spectra_to_binary
# ---------------------------------------------------------------------------


class TestSpectraToBinary:
    """Verify multi-Spectrum binary serialization."""

    def test_two_spectra(self) -> None:
        """Serialize a list of two independent spectra."""
        spec_a = Spectrum(
            intensities=np.array([1.0, 2.0, 3.0]),
            wavenumbers=np.array([400.0, 800.0, 1200.0]),
            label="alpha",
        )
        spec_b = Spectrum(
            intensities=np.array([4.0, 5.0]),
            wavenumbers=np.array([500.0, 1000.0]),
            label="beta",
        )

        data = spectra_to_binary([spec_a, spec_b])
        n_spectra, offset = _read_header(data)
        assert n_spectra == 2

        entry_a, offset = _read_entry(data, offset)
        assert entry_a["label"] == "alpha"
        assert entry_a["n_points"] == 3
        np.testing.assert_array_almost_equal(entry_a["intensities"], [1.0, 2.0, 3.0])

        entry_b, offset = _read_entry(data, offset)
        assert entry_b["label"] == "beta"
        assert entry_b["n_points"] == 2
        np.testing.assert_array_almost_equal(entry_b["intensities"], [4.0, 5.0])

        assert offset == len(data)

    def test_empty_list(self) -> None:
        """Empty list should produce minimal header with zero count."""
        data = spectra_to_binary([])
        n_spectra, offset = _read_header(data)
        assert n_spectra == 0
        assert offset == len(data)

    def test_mixed_1d_2d(self) -> None:
        """List with both 1D and 2D spectra should expand 2D rows."""
        spec_1d = Spectrum(
            intensities=np.array([1.0, 2.0]),
            label="single",
        )
        spec_2d = Spectrum(
            intensities=np.array([[3.0, 4.0], [5.0, 6.0]]),
            label="batch",
        )

        data = spectra_to_binary([spec_1d, spec_2d])
        n_spectra, offset = _read_header(data)
        # 1 from spec_1d + 2 rows from spec_2d = 3
        assert n_spectra == 3

        entry_0, offset = _read_entry(data, offset)
        assert entry_0["label"] == "single"

        entry_1, offset = _read_entry(data, offset)
        assert entry_1["label"] == "batch_0"

        entry_2, offset = _read_entry(data, offset)
        assert entry_2["label"] == "batch_1"

        assert offset == len(data)

    def test_different_point_counts(self) -> None:
        """Spectra with different numbers of points should serialize correctly."""
        spec_short = Spectrum(intensities=np.array([1.0]), label="short")
        spec_long = Spectrum(intensities=np.array([1.0, 2.0, 3.0, 4.0, 5.0]), label="long")

        data = spectra_to_binary([spec_short, spec_long])
        n_spectra, offset = _read_header(data)
        assert n_spectra == 2

        entry_short, offset = _read_entry(data, offset)
        assert entry_short["n_points"] == 1

        entry_long, offset = _read_entry(data, offset)
        assert entry_long["n_points"] == 5

        assert offset == len(data)


# ---------------------------------------------------------------------------
# Tests: gated import
# ---------------------------------------------------------------------------


class TestGatedImport:
    """Verify the widgets __init__.py lazy import gate."""

    def test_serializers_importable_without_anywidget(self) -> None:
        """Serializer functions should be importable without anywidget."""
        from spectrakit.widgets import spectra_to_binary, spectrum_to_binary  # noqa: F811

        assert callable(spectrum_to_binary)
        assert callable(spectra_to_binary)

    def test_all_exports_listed(self) -> None:
        """The __all__ list should contain expected names."""
        from spectrakit.widgets import __all__

        assert "SpectrumViewer" in __all__
        assert "spectrum_to_binary" in __all__
        assert "spectra_to_binary" in __all__


# ---------------------------------------------------------------------------
# Tests: binary format invariants
# ---------------------------------------------------------------------------


class TestBinaryFormatInvariants:
    """Verify structural properties of the binary format."""

    def test_header_is_4_bytes(self) -> None:
        """The global header should be exactly 4 bytes (uint32)."""
        data = spectra_to_binary([])
        assert len(data) == 4

    def test_deterministic_output(self) -> None:
        """Same input should produce identical bytes."""
        spec = Spectrum(
            intensities=np.array([1.0, 2.0, 3.0]),
            wavenumbers=np.array([100.0, 200.0, 300.0]),
            label="deterministic",
        )
        data_1 = spectrum_to_binary(spec)
        data_2 = spectrum_to_binary(spec)
        assert data_1 == data_2

    def test_expected_byte_size_no_wavenumbers(self) -> None:
        """Verify exact byte count for a known spectrum without wavenumbers."""
        n_points = 5
        label = "test"
        label_bytes = label.encode("utf-8")

        spec = Spectrum(intensities=np.ones(n_points), label=label)
        data = spectrum_to_binary(spec)

        expected_size = (
            4  # header: n_spectra
            + 4
            + 4
            + 4  # entry prefix: n_points, has_wavenum, label_len
            + len(label_bytes)  # label
            + n_points * 8  # intensities (float64)
        )
        assert len(data) == expected_size

    def test_expected_byte_size_with_wavenumbers(self) -> None:
        """Verify exact byte count for a known spectrum with wavenumbers."""
        n_points = 5
        label = "test"
        label_bytes = label.encode("utf-8")

        spec = Spectrum(
            intensities=np.ones(n_points),
            wavenumbers=np.linspace(400, 4000, n_points),
            label=label,
        )
        data = spectrum_to_binary(spec)

        expected_size = (
            4  # header: n_spectra
            + 4
            + 4
            + 4  # entry prefix
            + len(label_bytes)  # label
            + n_points * 8  # intensities
            + n_points * 8  # wavenumbers
        )
        assert len(data) == expected_size
