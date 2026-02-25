"""Tests for I/O format parsers."""

from __future__ import annotations

import struct
from pathlib import Path

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
