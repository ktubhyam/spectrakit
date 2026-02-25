"""Tests for I/O format parsers."""

from __future__ import annotations

import struct
import sys
from pathlib import Path
from unittest.mock import patch

import numpy as np
import pytest

from spectrakit.exceptions import DependencyError, FileFormatError

# ── CSV ──────────────────────────────────────────────────────────────


class TestReadCSV:
    def test_read_csv_roundtrip(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Write CSV then read it back."""
        data = np.column_stack(
            [
                np.linspace(400, 4000, 100),
                np.random.default_rng(42).random(100),
            ]
        )
        csv_path = tmp_path / "test.csv"
        np.savetxt(csv_path, data, delimiter=",")

        from spectrakit.io.csv import read_csv

        spec = read_csv(csv_path)

        assert spec.n_points == 100
        assert spec.source_format == "csv"

    def test_read_csv_no_xaxis(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Read CSV with no x-axis column."""
        data = np.random.default_rng(42).random((50,))
        csv_path = tmp_path / "yonly.csv"
        np.savetxt(csv_path, data.reshape(1, -1), delimiter=",")

        from spectrakit.io.csv import read_csv

        spec = read_csv(csv_path, x_column=-1)
        assert spec.wavenumbers is None

    def test_read_csv_file_not_found(self) -> None:
        """Nonexistent CSV path raises FileNotFoundError."""
        from spectrakit.io.csv import read_csv

        with pytest.raises(FileNotFoundError):
            read_csv("/nonexistent/data.csv")

    def test_read_csv_rows_orientation(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """orientation='rows' reads each row as a spectrum."""
        rng = np.random.default_rng(42)
        # 3 spectra with 50 points, first row is wavenumbers
        wn = np.linspace(400, 4000, 50)
        spectra = rng.random((3, 50))
        data = np.vstack([wn, spectra])
        csv_path = tmp_path / "rows.csv"
        np.savetxt(csv_path, data, delimiter=",")

        from spectrakit.io.csv import read_csv

        spec = read_csv(csv_path, orientation="rows", x_column=0)
        assert spec.wavenumbers is not None
        assert spec.n_spectra == 3
        assert spec.n_points == 50

    def test_read_csv_multiple_y_columns(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Multiple y columns should be returned as (N, W) batch."""
        rng = np.random.default_rng(42)
        wn = np.linspace(400, 4000, 80)
        y1 = rng.random(80)
        y2 = rng.random(80)
        data = np.column_stack([wn, y1, y2])
        csv_path = tmp_path / "multi_y.csv"
        np.savetxt(csv_path, data, delimiter=",")

        from spectrakit.io.csv import read_csv

        spec = read_csv(csv_path, x_column=0)
        assert spec.wavenumbers is not None
        assert spec.n_spectra == 2
        assert spec.n_points == 80

    def test_read_csv_1d_data(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Single-column CSV returns 1D intensities."""
        data = np.random.default_rng(42).random(30)
        csv_path = tmp_path / "single.csv"
        np.savetxt(csv_path, data, delimiter=",")

        from spectrakit.io.csv import read_csv

        spec = read_csv(csv_path)
        assert spec.intensities.ndim == 1
        assert spec.n_points == 30

    def test_read_csv_rows_no_xaxis(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """orientation='rows' with x_column=-1 returns no wavenumbers."""
        rng = np.random.default_rng(42)
        data = rng.random((3, 50))
        csv_path = tmp_path / "rows_nox.csv"
        np.savetxt(csv_path, data, delimiter=",")

        from spectrakit.io.csv import read_csv

        spec = read_csv(csv_path, orientation="rows", x_column=-1)
        assert spec.wavenumbers is None

    def test_read_csv_no_xaxis_specific_y_column(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """x_column=-1 with specific y_column reads that column."""
        rng = np.random.default_rng(42)
        data = np.column_stack([rng.random(40), rng.random(40), rng.random(40)])
        csv_path = tmp_path / "no_x.csv"
        np.savetxt(csv_path, data, delimiter=",")

        from spectrakit.io.csv import read_csv

        spec = read_csv(csv_path, x_column=-1, y_column=1)
        assert spec.wavenumbers is None
        assert spec.intensities.ndim == 1
        assert spec.n_points == 40

    def test_read_csv_no_xaxis_no_ycolumn(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """x_column=-1 with y_column=-1 returns entire data matrix."""
        rng = np.random.default_rng(42)
        data = rng.random((20, 5))
        csv_path = tmp_path / "matrix.csv"
        np.savetxt(csv_path, data, delimiter=",")

        from spectrakit.io.csv import read_csv

        spec = read_csv(csv_path, x_column=-1, y_column=-1)
        assert spec.wavenumbers is None
        assert spec.intensities.shape == (20, 5)


# ── JCAMP ────────────────────────────────────────────────────────────


class TestReadJCAMP:
    def test_file_not_found(self) -> None:
        from spectrakit.io.jcamp import read_jcamp

        with pytest.raises(FileNotFoundError):
            read_jcamp("/nonexistent/file.dx")

    def test_basic_xydata(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Parse a minimal JCAMP-DX file with XYDATA block."""
        content = (
            "##TITLE=Test Spectrum\n"
            "##JCAMP-DX=4.24\n"
            "##DATA TYPE=INFRARED SPECTRUM\n"
            "##XUNITS=1/CM\n"
            "##YUNITS=ABSORBANCE\n"
            "##FIRSTX=400\n"
            "##LASTX=800\n"
            "##NPOINTS=5\n"
            "##XYDATA=(X++(Y..Y))\n"
            "400.0 0.1 0.2 0.3\n"
            "700.0 0.4 0.5\n"
            "##END=\n"
        )
        jdx_path = tmp_path / "test.dx"
        jdx_path.write_text(content)

        from spectrakit.io.jcamp import read_jcamp

        spec = read_jcamp(jdx_path)
        assert spec.n_points == 5
        assert spec.source_format == "jcamp"
        assert spec.wavenumbers is not None
        np.testing.assert_allclose(spec.wavenumbers[0], 400.0)
        np.testing.assert_allclose(spec.wavenumbers[-1], 800.0)
        np.testing.assert_allclose(spec.intensities, [0.1, 0.2, 0.3, 0.4, 0.5])

    def test_metadata_extraction(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Verify metadata is extracted from LDR header lines."""
        content = (
            "##TITLE=Ethanol IR\n"
            "##ORIGIN=Test Lab\n"
            "##OWNER=SpectraKit\n"
            "##XYDATA=(X++(Y..Y))\n"
            "400.0 0.5\n"
            "##END=\n"
        )
        jdx_path = tmp_path / "meta.dx"
        jdx_path.write_text(content)

        from spectrakit.io.jcamp import read_jcamp

        spec = read_jcamp(jdx_path)
        assert spec.metadata["TITLE"] == "Ethanol IR"
        assert spec.metadata["ORIGIN"] == "Test Lab"
        assert spec.metadata["OWNER"] == "SpectraKit"

    def test_empty_xydata_raises(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """File without XYDATA values should raise FileFormatError."""
        content = "##TITLE=Empty\n##JCAMP-DX=4.24\n##END=\n"
        jdx_path = tmp_path / "empty.dx"
        jdx_path.write_text(content)

        from spectrakit.io.jcamp import read_jcamp

        with pytest.raises(FileFormatError):
            read_jcamp(jdx_path)

    def test_multiline_xydata(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """XYDATA spread across multiple lines."""
        content = (
            "##TITLE=Multiline\n"
            "##FIRSTX=1000\n"
            "##LASTX=2000\n"
            "##XYDATA=(X++(Y..Y))\n"
            "1000.0 0.10 0.20\n"
            "1200.0 0.30 0.40\n"
            "1400.0 0.50 0.60\n"
            "1600.0 0.70 0.80\n"
            "1800.0 0.90 1.00\n"
            "##END=\n"
        )
        jdx_path = tmp_path / "multi.dx"
        jdx_path.write_text(content)

        from spectrakit.io.jcamp import read_jcamp

        spec = read_jcamp(jdx_path)
        assert spec.n_points == 10
        np.testing.assert_allclose(spec.wavenumbers[0], 1000.0)  # type: ignore[index]
        np.testing.assert_allclose(spec.wavenumbers[-1], 2000.0)  # type: ignore[index]

    def test_label_from_filename(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Label should be set from the file stem."""
        content = "##TITLE=Label Test\n##XYDATA=(X++(Y..Y))\n100.0 1.0\n##END=\n"
        jdx_path = tmp_path / "my_sample.jdx"
        jdx_path.write_text(content)

        from spectrakit.io.jcamp import read_jcamp

        spec = read_jcamp(jdx_path)
        assert spec.label == "my_sample"


# ── HDF5 (dependency error path) ────────────────────────────────────


def _has_h5py() -> bool:
    try:
        import h5py  # noqa: F401

        return True
    except ImportError:
        return False


def _has_spc() -> bool:
    try:
        import spc  # noqa: F401

        return True
    except ImportError:
        return False


class TestReadHDF5:
    @pytest.mark.skipif(_has_h5py(), reason="h5py IS installed, skip dep-error test")
    def test_read_hdf5_without_h5py(self) -> None:
        """read_hdf5 raises DependencyError when h5py is not installed."""
        from spectrakit.io.hdf5 import read_hdf5

        with pytest.raises(DependencyError, match="h5py"):
            read_hdf5("/fake/file.h5")

    @pytest.mark.skipif(_has_h5py(), reason="h5py IS installed, skip dep-error test")
    def test_write_hdf5_without_h5py(self) -> None:
        """write_hdf5 raises DependencyError when h5py is not installed."""
        from spectrakit.io.hdf5 import write_hdf5
        from spectrakit.spectrum import Spectrum

        spec = Spectrum(intensities=np.array([1.0, 2.0, 3.0]))
        with pytest.raises(DependencyError, match="h5py"):
            write_hdf5(spec, "/fake/output.h5")

    def test_read_hdf5_without_h5py_mocked(self) -> None:
        """read_hdf5 raises DependencyError (mock missing import)."""
        from spectrakit.io.hdf5 import read_hdf5

        with patch.dict(sys.modules, {"h5py": None}), pytest.raises(DependencyError, match="h5py"):
            read_hdf5("/fake/file.h5")

    def test_write_hdf5_without_h5py_mocked(self) -> None:
        """write_hdf5 raises DependencyError (mock missing import)."""
        from spectrakit.io.hdf5 import write_hdf5
        from spectrakit.spectrum import Spectrum

        spec = Spectrum(intensities=np.array([1.0, 2.0, 3.0]))
        with patch.dict(sys.modules, {"h5py": None}), pytest.raises(DependencyError, match="h5py"):
            write_hdf5(spec, "/fake/output.h5")

    @pytest.mark.skipif(not _has_h5py(), reason="h5py not installed")
    def test_hdf5_roundtrip(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Write then read back HDF5."""
        from spectrakit.io.hdf5 import read_hdf5, write_hdf5
        from spectrakit.spectrum import Spectrum

        original = Spectrum(
            intensities=np.array([1.0, 2.0, 3.0, 4.0, 5.0]),
            wavenumbers=np.linspace(400, 4000, 5),
            metadata={"instrument": "Bruker", "resolution": 4},
        )
        h5_path = tmp_path / "roundtrip.h5"
        write_hdf5(original, h5_path)

        loaded = read_hdf5(h5_path)
        assert loaded.source_format == "hdf5"
        np.testing.assert_array_equal(loaded.intensities, original.intensities)
        np.testing.assert_array_equal(loaded.wavenumbers, original.wavenumbers)
        assert loaded.metadata["instrument"] == "Bruker"

    @pytest.mark.skipif(not _has_h5py(), reason="h5py not installed")
    def test_hdf5_write_without_wavenumbers(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Write HDF5 without wavenumbers."""
        from spectrakit.io.hdf5 import read_hdf5, write_hdf5
        from spectrakit.spectrum import Spectrum

        spec = Spectrum(intensities=np.array([1.0, 2.0, 3.0]))
        h5_path = tmp_path / "no_wn.h5"
        write_hdf5(spec, h5_path)

        loaded = read_hdf5(h5_path)
        np.testing.assert_array_equal(loaded.intensities, spec.intensities)
        assert loaded.wavenumbers is None

    @pytest.mark.skipif(not _has_h5py(), reason="h5py not installed")
    def test_hdf5_file_not_found(self) -> None:
        """Reading nonexistent HDF5 raises FileNotFoundError."""
        from spectrakit.io.hdf5 import read_hdf5

        with pytest.raises(FileNotFoundError):
            read_hdf5("/nonexistent/file.h5")

    @pytest.mark.skipif(not _has_h5py(), reason="h5py not installed")
    def test_hdf5_metadata_type_error_fallback(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Non-serializable metadata values are stored as strings."""
        from spectrakit.io.hdf5 import read_hdf5, write_hdf5
        from spectrakit.spectrum import Spectrum

        spec = Spectrum(
            intensities=np.array([1.0, 2.0]),
            metadata={"dict_val": {"nested": "dict"}},  # dicts can't be h5 attrs
        )
        h5_path = tmp_path / "meta.h5"
        write_hdf5(spec, h5_path)

        loaded = read_hdf5(h5_path)
        # Dict was stored as string via the TypeError fallback
        assert "dict_val" in loaded.metadata
        assert "nested" in str(loaded.metadata["dict_val"])


# ── SPC (dependency error path) ─────────────────────────────────────


class TestReadSPC:
    @pytest.mark.skipif(_has_spc(), reason="spc IS installed, skip dep-error test")
    def test_read_spc_without_spc_spectra(self) -> None:
        """read_spc raises DependencyError when spc-spectra is not installed."""
        from spectrakit.io.spc import read_spc

        with pytest.raises(DependencyError, match="spc-spectra"):
            read_spc("/fake/file.spc")

    def test_read_spc_file_not_found_mocked(self, tmp_path: Path) -> None:
        """read_spc raises FileNotFoundError for missing file."""
        from types import ModuleType
        from unittest.mock import MagicMock

        fake_spc = ModuleType("spc")
        fake_spc.File = MagicMock()  # type: ignore[attr-defined]

        with patch.dict(sys.modules, {"spc": fake_spc}):
            from spectrakit.io.spc import read_spc

            with pytest.raises(FileNotFoundError, match="SPC file not found"):
                read_spc(tmp_path / "nonexistent.spc")

    def test_read_spc_single_trace_mocked(self, tmp_path: Path) -> None:
        """read_spc with single-trace file via mocked spc module."""
        from types import ModuleType
        from unittest.mock import MagicMock

        fake_spc = ModuleType("spc")
        mock_sub = MagicMock()
        mock_sub.y = [1.0, 2.0, 3.0]
        mock_file = MagicMock()
        mock_file.x = [400.0, 500.0, 600.0]
        mock_file.fnsub = 1
        mock_file.sub = [mock_sub]
        mock_file.fexper = "Absorbance"
        fake_spc.File = MagicMock(return_value=mock_file)  # type: ignore[attr-defined]

        spc_path = tmp_path / "test.spc"
        spc_path.write_bytes(b"\x00" * 100)

        with patch.dict(sys.modules, {"spc": fake_spc}):
            from spectrakit.io.spc import read_spc

            result = read_spc(spc_path)
            assert result.intensities.shape == (3,)
            assert result.source_format == "spc"
            assert result.metadata["fnsub"] == 1

    def test_read_spc_multi_trace_mocked(self, tmp_path: Path) -> None:
        """read_spc with multi-trace file via mocked spc module."""
        from types import ModuleType
        from unittest.mock import MagicMock

        fake_spc = ModuleType("spc")
        sub1 = MagicMock()
        sub1.y = [1.0, 2.0, 3.0]
        sub2 = MagicMock()
        sub2.y = [4.0, 5.0, 6.0]
        mock_file = MagicMock()
        mock_file.x = [400.0, 500.0, 600.0]
        mock_file.fnsub = 2
        mock_file.sub = [sub1, sub2]
        mock_file.fexper = "Absorbance"
        fake_spc.File = MagicMock(return_value=mock_file)  # type: ignore[attr-defined]

        spc_path = tmp_path / "multi.spc"
        spc_path.write_bytes(b"\x00" * 100)

        with patch.dict(sys.modules, {"spc": fake_spc}):
            from spectrakit.io.spc import read_spc

            result = read_spc(spc_path)
            assert result.intensities.shape == (2, 3)
            assert result.metadata["fnsub"] == 2


# ── OPUS ─────────────────────────────────────────────────────────────


def _build_opus_param_entry(tag: str, value: float | int | str) -> bytes:
    """Build a single OPUS parameter entry (tag + type + size + value).

    Layout per entry: tag[3] + pad[1] + type_code[2] + value_size[2] + value[N].
    Entries are padded to 4-byte alignment.
    """
    tag_bytes = tag.encode("ascii")[:3].ljust(3, b"\x00") + b"\x00"

    if isinstance(value, float):
        # Double: type_code=1, size=8
        payload = struct.pack("<HH", 1, 8) + struct.pack("<d", value)
    elif isinstance(value, int):
        # Int: type_code=0, size=4
        payload = struct.pack("<HH", 0, 4) + struct.pack("<i", value)
    elif isinstance(value, str):
        # String: type_code=2, size=len+1 (null-terminated)
        encoded = value.encode("latin-1") + b"\x00"
        # Pad encoded string to 4-byte alignment
        while len(encoded) % 4 != 0:
            encoded += b"\x00"
        payload = struct.pack("<HH", 2, len(encoded)) + encoded
    else:
        payload = b""

    entry = tag_bytes + payload
    # Pad to 4-byte alignment
    while len(entry) % 4 != 0:
        entry += b"\x00"
    return entry


def _build_synthetic_opus(
    n_points: int = 100,
    first_x: float = 400.0,
    last_x: float = 4000.0,
    intensities: np.ndarray | None = None,
) -> bytes:
    """Build a minimal synthetic OPUS binary file for testing.

    Structure:
        - Header (24 bytes): magic[4] + reserved[4] + dir_offset[4] +
          reserved[4] + max_entries[4] + num_entries[4]
        - Directory entries (12 bytes each): type[4] + length[4] + offset[4]
          * Entry 0: AB data block (type 0x0F)
          * Entry 1: Data status parameter block (type 0x1F)
          * Sentinel entry (type 0x00)
        - Data block: float32 array
        - Parameter block: NPT, FXV, LXV entries
    """
    if intensities is None:
        rng = np.random.default_rng(42)
        intensities = rng.random(n_points).astype(np.float32)
    else:
        intensities = intensities.astype(np.float32)
        n_points = len(intensities)

    # Build parameter block content
    param_content = b""
    param_content += _build_opus_param_entry("NPT", n_points)
    param_content += _build_opus_param_entry("FXV", first_x)
    param_content += _build_opus_param_entry("LXV", last_x)

    # Build data block content
    data_content = intensities.tobytes()

    # Layout:
    # [0..23]   Header (24 bytes)
    # [24..59]  Directory: 3 entries x 12 bytes = 36 bytes
    # [60..60+len(data)]  Data block
    # [60+len(data)..]    Parameter block

    header_size = 24
    dir_size = 3 * 12  # 2 entries + 1 sentinel
    data_offset = header_size + dir_size
    param_offset = data_offset + len(data_content)

    # Header: magic(4) + reserved(4) + dir_offset(4) + reserved(4) +
    #         max_entries(4) + num_entries(4)
    header = struct.pack(
        "<IIIIII",
        0x0A0A,  # magic bytes
        0x0000,  # reserved
        header_size,  # directory offset (points to byte 24)
        0x0000,  # reserved
        10,  # max directory entries
        2,  # actual number of entries
    )

    # Directory entry for AB data block (type=0x0F)
    dir_entry_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
    # Directory entry for data status params (type=0x1F)
    dir_entry_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
    # Sentinel entry (type=0)
    dir_sentinel = struct.pack("<III", 0, 0, 0)

    return header + dir_entry_data + dir_entry_params + dir_sentinel + data_content + param_content


class TestReadOPUS:
    def test_file_not_found(self) -> None:
        """Nonexistent OPUS path raises FileNotFoundError."""
        from spectrakit.io.opus import read_opus

        with pytest.raises(FileNotFoundError):
            read_opus("/nonexistent/file.0")

    def test_basic_read(self, tmp_path: Path) -> None:
        """Read a synthetic OPUS file with known data."""
        from spectrakit.io.opus import read_opus

        n_points = 50
        first_x = 400.0
        last_x = 4000.0
        rng = np.random.default_rng(42)
        expected = rng.random(n_points).astype(np.float32)

        opus_bytes = _build_synthetic_opus(
            n_points=n_points,
            first_x=first_x,
            last_x=last_x,
            intensities=expected,
        )
        opus_path = tmp_path / "sample.0"
        opus_path.write_bytes(opus_bytes)

        spec = read_opus(opus_path)

        assert spec.source_format == "opus"
        assert spec.n_points == n_points
        assert spec.wavenumbers is not None
        np.testing.assert_allclose(spec.wavenumbers[0], first_x)
        np.testing.assert_allclose(spec.wavenumbers[-1], last_x)
        np.testing.assert_allclose(spec.intensities, expected.astype(np.float64), rtol=1e-6)

    def test_label_from_filename(self, tmp_path: Path) -> None:
        """Label should be set from the file stem."""
        from spectrakit.io.opus import read_opus

        opus_bytes = _build_synthetic_opus(n_points=10)
        opus_path = tmp_path / "ethanol_ir.0"
        opus_path.write_bytes(opus_bytes)

        spec = read_opus(opus_path)
        assert spec.label == "ethanol_ir"

    def test_metadata_includes_parameters(self, tmp_path: Path) -> None:
        """Metadata should contain NPT, FXV, LXV from data parameters."""
        from spectrakit.io.opus import read_opus

        opus_bytes = _build_synthetic_opus(n_points=20, first_x=500.0, last_x=3500.0)
        opus_path = tmp_path / "meta_test.0"
        opus_path.write_bytes(opus_bytes)

        spec = read_opus(opus_path)
        assert "NPT" in spec.metadata
        assert spec.metadata["NPT"] == 20
        np.testing.assert_allclose(spec.metadata["FXV"], 500.0)
        np.testing.assert_allclose(spec.metadata["LXV"], 3500.0)

    def test_wavenumber_axis_shape(self, tmp_path: Path) -> None:
        """Wavenumber array should have the same length as intensities."""
        from spectrakit.io.opus import read_opus

        n_points = 75
        opus_bytes = _build_synthetic_opus(n_points=n_points)
        opus_path = tmp_path / "wn_shape.0"
        opus_path.write_bytes(opus_bytes)

        spec = read_opus(opus_path)
        assert spec.wavenumbers is not None
        assert spec.wavenumbers.shape == (n_points,)
        assert spec.intensities.shape == (n_points,)

    def test_corrupt_file_too_small(self, tmp_path: Path) -> None:
        """A file that is too small raises FileFormatError."""
        from spectrakit.io.opus import read_opus

        opus_path = tmp_path / "tiny.0"
        opus_path.write_bytes(b"\x0a\x0a\x00\x00")

        with pytest.raises(FileFormatError, match="too small"):
            read_opus(opus_path)

    def test_corrupt_file_no_directory(self, tmp_path: Path) -> None:
        """A file with all zeros (no valid directory) raises FileFormatError."""
        from spectrakit.io.opus import read_opus

        opus_path = tmp_path / "zeros.0"
        opus_path.write_bytes(b"\x00" * 128)

        with pytest.raises(FileFormatError):
            read_opus(opus_path)

    def test_corrupt_file_random_garbage(self, tmp_path: Path) -> None:
        """Random bytes that form no valid blocks raise FileFormatError."""
        from spectrakit.io.opus import read_opus

        rng = np.random.default_rng(99)
        # Build a file with a valid-looking header but garbage directory
        # that points to out-of-bounds offsets or has no matching blocks
        header = struct.pack("<IIIIII", 0x0A0A, 0, 24, 0, 10, 1)
        # Directory entry pointing to non-existent type with huge offset
        dir_entry = struct.pack("<III", 0xFF, 9999, 999999)
        sentinel = struct.pack("<III", 0, 0, 0)
        garbage = rng.integers(0, 256, size=64, dtype=np.uint8).tobytes()

        opus_path = tmp_path / "garbage.0"
        opus_path.write_bytes(header + dir_entry + sentinel + garbage)

        with pytest.raises(FileFormatError):
            read_opus(opus_path)

    def test_truncated_data_block(self, tmp_path: Path) -> None:
        """A data block that is too short for NPT points raises FileFormatError."""
        from spectrakit.io.opus import read_opus

        # Build valid-looking file but truncate the data block
        n_points = 100

        # Parameter block
        param_content = b""
        param_content += _build_opus_param_entry("NPT", n_points)
        param_content += _build_opus_param_entry("FXV", 400.0)
        param_content += _build_opus_param_entry("LXV", 4000.0)

        # Deliberately short data: only 10 float32 values instead of 100
        data_content = np.zeros(10, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 36  # 3 dir entries
        param_offset = data_offset + len(data_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        dir_entry_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_entry_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = (
            header + dir_entry_data + dir_entry_params + dir_sentinel + data_content + param_content
        )

        opus_path = tmp_path / "truncated.0"
        opus_path.write_bytes(raw)

        with pytest.raises(FileFormatError, match="float32"):
            read_opus(opus_path)

    def test_intensities_dtype_float64(self, tmp_path: Path) -> None:
        """Intensities should be promoted from float32 to float64."""
        from spectrakit.io.opus import read_opus

        opus_bytes = _build_synthetic_opus(n_points=30)
        opus_path = tmp_path / "dtype.0"
        opus_path.write_bytes(opus_bytes)

        spec = read_opus(opus_path)
        assert spec.intensities.dtype == np.float64

    def test_no_wavenumber_axis(self, tmp_path: Path) -> None:
        """When FXV/LXV are missing, wavenumbers should be None."""
        from spectrakit.io.opus import read_opus

        # Build OPUS with only NPT in parameter block (no FXV/LXV)
        n_points = 20
        param_content = _build_opus_param_entry("NPT", n_points)
        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 36
        param_offset = data_offset + len(data_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param_content
        opus_path = tmp_path / "no_wn.0"
        opus_path.write_bytes(raw)

        spec = read_opus(opus_path)
        assert spec.wavenumbers is None
        assert spec.n_points == n_points

    def test_string_parameter(self, tmp_path: Path) -> None:
        """String parameters should be parsed correctly."""
        from spectrakit.io.opus import read_opus

        n_points = 10
        param_content = b""
        param_content += _build_opus_param_entry("NPT", n_points)
        param_content += _build_opus_param_entry("FXV", 400.0)
        param_content += _build_opus_param_entry("LXV", 4000.0)
        param_content += _build_opus_param_entry("INS", "Vertex70")

        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 36
        param_offset = data_offset + len(data_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param_content
        opus_path = tmp_path / "str_param.0"
        opus_path.write_bytes(raw)

        spec = read_opus(opus_path)
        assert spec.metadata.get("INS") == "Vertex70"

    def test_no_param_block_raises(self, tmp_path: Path) -> None:
        """Missing parameter block raises FileFormatError."""
        from spectrakit.io.opus import read_opus

        # Build OPUS with only a data block, no parameter block
        n_points = 10
        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 24  # 2 dir entries (data + sentinel)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 1)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_sentinel + data_content
        opus_path = tmp_path / "no_params.0"
        opus_path.write_bytes(raw)

        with pytest.raises(FileFormatError, match="parameter"):
            read_opus(opus_path)

    def test_npt_missing_raises(self, tmp_path: Path) -> None:
        """Parameter block without NPT raises FileFormatError."""
        from spectrakit.io.opus import read_opus

        # Parameter block with FXV and LXV but no NPT
        param_content = b""
        param_content += _build_opus_param_entry("FXV", 400.0)
        param_content += _build_opus_param_entry("LXV", 4000.0)

        data_content = np.ones(10, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 36
        param_offset = data_offset + len(data_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param_content
        opus_path = tmp_path / "no_npt.0"
        opus_path.write_bytes(raw)

        with pytest.raises(FileFormatError, match="NPT"):
            read_opus(opus_path)

    def test_npt_zero_raises(self, tmp_path: Path) -> None:
        """NPT = 0 raises FileFormatError."""
        from spectrakit.io.opus import read_opus

        param_content = _build_opus_param_entry("NPT", 0)
        param_content += _build_opus_param_entry("FXV", 400.0)
        param_content += _build_opus_param_entry("LXV", 4000.0)

        data_content = np.ones(10, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 36
        param_offset = data_offset + len(data_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param_content
        opus_path = tmp_path / "npt_zero.0"
        opus_path.write_bytes(raw)

        with pytest.raises(FileFormatError, match="Invalid NPT"):
            read_opus(opus_path)

    def test_os_error_reading_file(self, tmp_path: Path) -> None:
        """Unreadable file raises FileFormatError."""
        from spectrakit.io.opus import read_opus

        opus_path = tmp_path / "unreadable.0"
        opus_path.write_bytes(b"\x00" * 100)
        opus_path.chmod(0o000)

        try:
            with pytest.raises((FileFormatError, PermissionError)):
                read_opus(opus_path)
        finally:
            opus_path.chmod(0o644)

    def test_fallback_data_block_type(self, tmp_path: Path) -> None:
        """Falls back to single-channel sample block when AB not present."""
        from spectrakit.io.opus import read_opus

        n_points = 15
        param_content = _build_opus_param_entry("NPT", n_points)
        param_content += _build_opus_param_entry("FXV", 400.0)
        param_content += _build_opus_param_entry("LXV", 4000.0)
        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 36
        param_offset = data_offset + len(data_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        # Use SC_SAMPLE (0x07) instead of AB (0x0F) and SC_STATUS (0x17) param
        dir_data = struct.pack("<III", 0x07, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x17, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param_content
        opus_path = tmp_path / "sc_sample.0"
        opus_path.write_bytes(raw)

        spec = read_opus(opus_path)
        assert spec.n_points == n_points

    def test_unpaired_data_and_param_blocks(self, tmp_path: Path) -> None:
        """Data block with non-matching param block type still parses."""
        from spectrakit.io.opus import read_opus

        n_points = 10
        param_content = _build_opus_param_entry("NPT", n_points)
        param_content += _build_opus_param_entry("FXV", 500.0)
        param_content += _build_opus_param_entry("LXV", 3000.0)
        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 36
        param_offset = data_offset + len(data_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        # AB data (0x0F) but RF_STATUS params (0x1B) - mismatched pair
        # Falls through the zip loop, then picks them up separately
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1B, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param_content
        opus_path = tmp_path / "unpaired.0"
        opus_path.write_bytes(raw)

        spec = read_opus(opus_path)
        assert spec.n_points == n_points

    def test_dir_offset_from_header_pointer(self, tmp_path: Path) -> None:
        """Directory pointer at offset 8 is used when it points to valid data."""
        from spectrakit.io.opus import read_opus

        n_points = 10
        param_content = _build_opus_param_entry("NPT", n_points)
        param_content += _build_opus_param_entry("FXV", 400.0)
        param_content += _build_opus_param_entry("LXV", 4000.0)
        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        # Put directory at offset 24 as usual but also set offset 8 to point there
        header_size = 24
        dir_size = 36
        data_offset = header_size + dir_size
        param_offset = data_offset + len(data_content)

        # offset 8 points to 24 (same as default)
        header = struct.pack("<IIIIII", 0x0A0A, 0, 24, 0, 10, 2)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param_content
        opus_path = tmp_path / "dir_ptr.0"
        opus_path.write_bytes(raw)

        spec = read_opus(opus_path)
        assert spec.n_points == n_points

    def test_metadata_block_with_instrument_params(self, tmp_path: Path) -> None:
        """Instrument/sample parameter blocks are collected as metadata."""
        from spectrakit.io.opus import read_opus

        n_points = 10
        # Main param block with NPT, FXV, LXV
        param_content = _build_opus_param_entry("NPT", n_points)
        param_content += _build_opus_param_entry("FXV", 400.0)
        param_content += _build_opus_param_entry("LXV", 4000.0)

        # Instrument metadata block (type 0x20)
        inst_content = _build_opus_param_entry("INS", "Vertex70")
        inst_content += _build_opus_param_entry("RES", 4.0)

        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        header_size = 24
        dir_size = 4 * 12  # 3 entries + sentinel
        data_offset = header_size + dir_size
        param_offset = data_offset + len(data_content)
        inst_offset = param_offset + len(param_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 3)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_inst = struct.pack("<III", 0x20, len(inst_content), inst_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = (
            header
            + dir_data
            + dir_params
            + dir_inst
            + dir_sentinel
            + data_content
            + param_content
            + inst_content
        )
        opus_path = tmp_path / "with_instrument.0"
        opus_path.write_bytes(raw)

        spec = read_opus(opus_path)
        assert spec.metadata.get("INS") == "Vertex70"

    def test_large_num_entries_triggers_scan(self, tmp_path: Path) -> None:
        """num_entries > 200 falls back to scanning mode."""
        from spectrakit.io.opus import read_opus

        n_points = 10
        param_content = _build_opus_param_entry("NPT", n_points)
        param_content += _build_opus_param_entry("FXV", 400.0)
        param_content += _build_opus_param_entry("LXV", 4000.0)
        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        header_size = 24
        data_offset = header_size + 36
        param_offset = data_offset + len(data_content)

        # Set num_entries to 999 (> 200 threshold) to trigger scan mode
        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 999)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param_content
        opus_path = tmp_path / "scan_mode.0"
        opus_path.write_bytes(raw)

        spec = read_opus(opus_path)
        assert spec.n_points == n_points  # noqa: E501

    def test_no_data_block_raises(self, tmp_path: Path) -> None:
        """OPUS file with only parameter blocks (no data) raises FileFormatError."""
        from spectrakit.io.opus import read_opus

        # Build an OPUS file with a parameter block (0x1F) and instrument block (0x20)
        # but NO data blocks (0x0F, 0x07, 0x0B).
        param_content = _build_opus_param_entry("NPT", 10)
        inst_content = _build_opus_param_entry("INS", "Vertex70")

        header_size = 24
        dir_size = 3 * 12  # 2 entries + sentinel
        param_offset = header_size + dir_size
        inst_offset = param_offset + len(param_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        dir_param = struct.pack("<III", 0x1F, len(param_content), param_offset)
        dir_inst = struct.pack("<III", 0x20, len(inst_content), inst_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_param + dir_inst + dir_sentinel + param_content + inst_content
        opus_path = tmp_path / "no_data.0"
        opus_path.write_bytes(raw)

        with pytest.raises(FileFormatError, match="No spectral data block"):
            read_opus(opus_path)


# ── OPUS internal function tests ───────────────────────────────────


class TestOpusParseDirectory:
    """Direct tests for _parse_directory internals."""

    def test_too_small_raises(self) -> None:
        from spectrakit.io.opus import _parse_directory

        with pytest.raises(FileFormatError, match="too small"):
            _parse_directory(b"\x00" * 10)

    def test_no_valid_entries_raises(self) -> None:
        from spectrakit.io.opus import _parse_directory

        # Valid header but all-zero directory entries
        header = struct.pack("<IIIIII", 0x0A0A, 0, 24, 0, 10, 1)
        sentinel = struct.pack("<III", 0, 0, 0)
        with pytest.raises(FileFormatError, match="No valid directory"):
            _parse_directory(header + sentinel)

    def test_truncated_dir_entry_stops_gracefully(self) -> None:
        from spectrakit.io.opus import _parse_directory

        # Header says 2 entries but only room for 1 + partial
        header = struct.pack("<IIIIII", 0x0A0A, 0, 24, 0, 10, 2)
        entry = struct.pack("<III", 0x0F, 100, 60)  # valid entry pointing within file
        # Add enough bytes to make offset 60 valid
        padding = b"\x00" * 60
        raw = header + entry + padding
        entries = _parse_directory(raw)
        assert len(entries) >= 1

    def test_short_file_struct_error_fallback(self) -> None:
        """File exactly at minimum size triggers struct.error fallback in header parsing."""
        from spectrakit.io.opus import _parse_directory

        # 24 bytes: enough to pass size check, but struct fields at offset 8, 16, 20
        # need valid data. Put a valid entry at offset 24 is impossible (no room).
        # This tests the fallback paths.
        raw = b"\x0a\x0a\x00\x00" + b"\x00" * 4 + b"\x00" * 4 + b"\x00" * 12
        with pytest.raises(FileFormatError, match="No valid directory"):
            _parse_directory(raw)

    def test_dir_entry_scanning_stops_at_end(self) -> None:
        """Directory scanning stops when offset + 12 exceeds raw length."""
        from spectrakit.io.opus import _parse_directory

        # Header with num_entries=0 (triggers scan mode), dir at offset 24
        header = struct.pack("<IIIIII", 0x0A0A, 0, 24, 0, 10, 0)
        # One valid entry, then NOT enough room for another
        entry = struct.pack("<III", 0x0F, 100, 36)
        # Add just enough data so offset 36 is valid (within file)
        padding = b"\x00" * 16
        raw = header + entry + padding
        entries = _parse_directory(raw)
        assert len(entries) >= 1

    def test_out_of_bounds_offset_skipped(self) -> None:
        from spectrakit.io.opus import _parse_directory

        header = struct.pack("<IIIIII", 0x0A0A, 0, 24, 0, 10, 2)
        # Entry with offset beyond file size — should be skipped
        bad_entry = struct.pack("<III", 0x0F, 100, 999999)
        # A valid entry
        good_entry = struct.pack("<III", 0x1F, 50, 60)
        sentinel = struct.pack("<III", 0, 0, 0)
        padding = b"\x00" * 60
        raw = header + bad_entry + good_entry + sentinel + padding
        entries = _parse_directory(raw)
        # Only the good entry should survive
        assert len(entries) == 1
        assert entries[0][0] == 0x1F


class TestOpusParseParameterBlock:
    """Direct tests for _parse_parameter_block internals."""

    def test_int_parameter(self) -> None:
        from spectrakit.io.opus import _parse_parameter_block

        entry = _build_opus_param_entry("NPT", 42)
        params = _parse_parameter_block(entry, 0, len(entry))
        assert params["NPT"] == 42

    def test_double_parameter(self) -> None:
        from spectrakit.io.opus import _parse_parameter_block

        entry = _build_opus_param_entry("FXV", 400.0)
        params = _parse_parameter_block(entry, 0, len(entry))
        assert abs(params["FXV"] - 400.0) < 1e-6

    def test_string_parameter(self) -> None:
        from spectrakit.io.opus import _parse_parameter_block

        entry = _build_opus_param_entry("INS", "TestInstr")
        params = _parse_parameter_block(entry, 0, len(entry))
        assert params["INS"] == "TestInstr"

    def test_invalid_tag_skipped(self) -> None:
        from spectrakit.io.opus import _parse_parameter_block

        # Build a block starting with non-alpha bytes (invalid tag)
        bad_block = b"\x00\x00\x00\x00" * 4
        good_entry = _build_opus_param_entry("NPT", 10)
        block = bad_block + good_entry
        params = _parse_parameter_block(block, 0, len(block))
        assert params.get("NPT") == 10

    def test_truncated_value_stops(self) -> None:
        from spectrakit.io.opus import _parse_parameter_block

        # A tag header claiming a value_size larger than remaining bytes
        tag = b"NPT\x00"
        # type_code=0 (int), value_size=9999 (way larger than available)
        header = struct.pack("<HH", 0, 9999)
        block = tag + header
        # Should stop gracefully without error
        params = _parse_parameter_block(block, 0, len(block))
        assert "NPT" not in params

    def test_empty_block(self) -> None:
        from spectrakit.io.opus import _parse_parameter_block

        params = _parse_parameter_block(b"", 0, 0)
        assert params == {}

    def test_float32_parameter(self) -> None:
        """Float param with value_size=4 should be read as float32."""
        from spectrakit.io.opus import _parse_parameter_block

        tag = b"TST\x00"
        # type_code=1 (float), value_size=4 (float32, not double)
        header = struct.pack("<HH", 1, 4)
        value = struct.pack("<f", 3.14)
        entry = tag + header + value
        params = _parse_parameter_block(entry, 0, len(entry))
        assert abs(params["TST"] - 3.14) < 0.01

    def test_enum_parameter(self) -> None:
        """Enum type (code=3) with value_size >= 4 should be read as int."""
        from spectrakit.io.opus import _parse_parameter_block

        tag = b"ENM\x00"
        # type_code=3 (enum), value_size=4
        header = struct.pack("<HH", 3, 4)
        value = struct.pack("<i", 7)
        entry = tag + header + value
        params = _parse_parameter_block(entry, 0, len(entry))
        assert params["ENM"] == 7

    def test_alignment_padding(self) -> None:
        """Entries with non-4-byte-aligned sizes get properly padded."""
        from spectrakit.io.opus import _parse_parameter_block

        # First entry: string with odd size (5 bytes + null, padded to 8)
        entry1 = _build_opus_param_entry("INS", "Hello")
        # Second entry: int
        entry2 = _build_opus_param_entry("NPT", 42)
        block = entry1 + entry2
        params = _parse_parameter_block(block, 0, len(block))
        assert params.get("INS") == "Hello"
        assert params.get("NPT") == 42

    def test_non_aligned_value_size_pads_correctly(self) -> None:
        """value_size not divisible by 4 triggers alignment padding (line 241)."""
        from spectrakit.io.opus import _parse_parameter_block

        # Build a string param with value_size=5 (not 4-byte aligned)
        # tag(3) + pad(1) + type_code(2) + value_size(2) + value(5) = 13 bytes
        # entry_size = 8 + 5 = 13, remainder = 1, padded to 16
        tag1 = b"TST\x00"
        header1 = struct.pack("<HH", 2, 5)  # type=string, size=5
        value1 = b"Hello"  # 5 bytes, not 4-byte aligned
        # Pad the block so the second entry is findable after alignment
        padding1 = b"\x00" * 3  # pad to 16 bytes total

        # Second entry: int param to verify parser advances past alignment
        tag2 = b"NPT\x00"
        header2 = struct.pack("<HH", 0, 4)  # type=int, size=4
        value2 = struct.pack("<i", 42)

        block = tag1 + header1 + value1 + padding1 + tag2 + header2 + value2
        params = _parse_parameter_block(block, 0, len(block))
        assert params.get("TST") == "Hello"
        assert params.get("NPT") == 42

    def test_struct_error_in_type_code(self) -> None:
        """Truncated type_code header triggers struct.error break."""
        from spectrakit.io.opus import _parse_parameter_block

        # Valid 3-char tag + pad, but then only 1 byte instead of 4 (type_code + value_size)
        block = b"NPT\x00\x00"
        params = _parse_parameter_block(block, 0, len(block))
        assert params == {}


class TestOpusReadFloat32Block:
    """Direct tests for _read_float32_block."""

    def test_reads_correct_values(self) -> None:
        from spectrakit.io.opus import _read_float32_block

        expected = np.array([1.0, 2.0, 3.0], dtype=np.float32)
        raw = expected.tobytes()
        result = _read_float32_block(raw, 0, 3)
        np.testing.assert_allclose(result, expected.astype(np.float64))

    def test_insufficient_bytes_raises(self) -> None:
        from spectrakit.io.opus import _read_float32_block

        with pytest.raises(FileFormatError, match="float32"):
            _read_float32_block(b"\x00" * 4, 0, 10)

    def test_offset_respected(self) -> None:
        from spectrakit.io.opus import _read_float32_block

        prefix = b"\xff" * 8
        data = np.array([5.0, 6.0], dtype=np.float32).tobytes()
        raw = prefix + data
        result = _read_float32_block(raw, 8, 2)
        np.testing.assert_allclose(result, [5.0, 6.0])


# ── JCAMP edge cases ──────────────────────────────────────────────


class TestReadJCAMPEdgeCases:
    def test_blank_lines_skipped(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Blank lines in a JCAMP file are silently skipped."""
        content = (
            "##TITLE=Blank Lines Test\n"
            "\n"
            "##XYDATA=(X++(Y..Y))\n"
            "\n"
            "400.0 0.1 0.2\n"
            "\n"
            "600.0 0.3 0.4\n"
            "\n"
            "##END=\n"
        )
        jdx_path = tmp_path / "blanks.dx"
        jdx_path.write_text(content)

        from spectrakit.io.jcamp import read_jcamp

        spec = read_jcamp(jdx_path)
        assert spec.n_points == 4


# ── CSV Writer ──────────────────────────────────────────────────────


class TestWriteCSV:
    def test_write_csv_1d_with_wavenumbers(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Write 1D spectrum with wavenumbers, read back and verify."""
        from spectrakit.io.csv import read_csv, write_csv
        from spectrakit.spectrum import Spectrum

        wn = np.linspace(400, 4000, 50)
        y = np.random.default_rng(42).random(50)
        spec = Spectrum(intensities=y, wavenumbers=wn, label="test")

        out = tmp_path / "out.csv"
        write_csv(spec, out)

        assert out.exists()
        loaded = read_csv(out, skip_header=1)
        np.testing.assert_allclose(loaded.wavenumbers, wn, atol=1e-4)
        np.testing.assert_allclose(loaded.intensities, y, atol=1e-4)

    def test_write_csv_1d_no_wavenumbers(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Write 1D spectrum without wavenumbers."""
        from spectrakit.io.csv import write_csv
        from spectrakit.spectrum import Spectrum

        y = np.array([1.0, 2.0, 3.0])
        spec = Spectrum(intensities=y, label="no_wn")

        out = tmp_path / "nown.csv"
        write_csv(spec, out)

        assert out.exists()
        data = np.genfromtxt(out, delimiter=",", skip_header=1)
        np.testing.assert_allclose(data, y, atol=1e-10)

    def test_write_csv_2d_batch(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Write batch (N, W) spectra to CSV."""
        from spectrakit.io.csv import write_csv
        from spectrakit.spectrum import Spectrum

        wn = np.linspace(400, 4000, 30)
        batch = np.random.default_rng(42).random((3, 30))
        spec = Spectrum(intensities=batch, wavenumbers=wn)

        out = tmp_path / "batch.csv"
        write_csv(spec, out)

        assert out.exists()
        data = np.genfromtxt(out, delimiter=",", skip_header=1)
        # Should have 30 rows (wavenumber points) x 4 cols (wn + 3 spectra)
        assert data.shape == (30, 4)

    def test_write_csv_2d_no_wavenumbers(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Write batch (N, W) spectra without wavenumbers."""
        from spectrakit.io.csv import write_csv
        from spectrakit.spectrum import Spectrum

        batch = np.random.default_rng(42).random((2, 20))
        spec = Spectrum(intensities=batch)

        out = tmp_path / "batch_nowns.csv"
        write_csv(spec, out)

        assert out.exists()
        data = np.genfromtxt(out, delimiter=",", skip_header=1)
        assert data.shape == (20, 2)

    def test_write_csv_tsv(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Write with tab delimiter — uses wavenumbers so multiple columns exist."""
        from spectrakit.io.csv import write_csv
        from spectrakit.spectrum import Spectrum

        wn = np.array([400.0, 800.0, 1200.0])
        y = np.array([1.0, 2.0, 3.0])
        spec = Spectrum(intensities=y, wavenumbers=wn)

        out = tmp_path / "out.tsv"
        write_csv(spec, out, delimiter="\t")

        assert out.exists()
        content = out.read_text()
        assert "\t" in content

    def test_write_csv_no_header(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Write without header row."""
        from spectrakit.io.csv import write_csv
        from spectrakit.spectrum import Spectrum

        y = np.array([1.0, 2.0, 3.0])
        spec = Spectrum(intensities=y)

        out = tmp_path / "noheader.csv"
        write_csv(spec, out, header=False)

        content = out.read_text()
        # Should NOT start with column names
        assert not content.startswith("intensity")


# ── JCAMP Writer ────────────────────────────────────────────────────


class TestWriteJCAMP:
    def test_write_jcamp_roundtrip(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Write JCAMP then read it back — values should roundtrip within tolerance."""
        from spectrakit.io.jcamp import read_jcamp, write_jcamp
        from spectrakit.spectrum import Spectrum

        wn = np.linspace(400, 4000, 100)
        y = np.random.default_rng(42).random(100)
        spec = Spectrum(intensities=y, wavenumbers=wn, label="roundtrip")

        out = tmp_path / "output.dx"
        write_jcamp(spec, out, title="Roundtrip Test")

        assert out.exists()
        loaded = read_jcamp(out)
        assert loaded.n_points == 100
        np.testing.assert_allclose(loaded.wavenumbers, wn, atol=1e-4)
        np.testing.assert_allclose(loaded.intensities, y, atol=1e-4)

    def test_write_jcamp_metadata(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Written JCAMP contains required headers."""
        from spectrakit.io.jcamp import write_jcamp
        from spectrakit.spectrum import Spectrum

        wn = np.linspace(400, 4000, 10)
        y = np.ones(10)
        spec = Spectrum(intensities=y, wavenumbers=wn)

        out = tmp_path / "meta.dx"
        write_jcamp(spec, out, title="My Title", data_type="RAMAN SPECTRUM")

        content = out.read_text()
        assert "##TITLE=My Title" in content
        assert "##JCAMP-DX=5.00" in content
        assert "##DATA TYPE=RAMAN SPECTRUM" in content
        assert "##NPOINTS=10" in content
        assert "##END=" in content

    def test_write_jcamp_2d_raises(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """2D intensities should raise ValueError."""
        from spectrakit.io.jcamp import write_jcamp
        from spectrakit.spectrum import Spectrum

        spec = Spectrum(intensities=np.ones((3, 10)))
        with pytest.raises(ValueError, match="1-D intensities"):
            write_jcamp(spec, tmp_path / "fail.dx")

    def test_write_jcamp_no_wavenumbers_raises(self, tmp_path: Path) -> None:  # type: ignore[no-untyped-def]
        """Missing wavenumbers should raise ValueError."""
        from spectrakit.io.jcamp import write_jcamp
        from spectrakit.spectrum import Spectrum

        spec = Spectrum(intensities=np.ones(10))
        with pytest.raises(ValueError, match="wavenumbers"):
            write_jcamp(spec, tmp_path / "fail.dx")
