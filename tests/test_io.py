"""Tests for I/O format parsers."""

from __future__ import annotations

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
        content = (
            "##TITLE=Empty\n"
            "##JCAMP-DX=4.24\n"
            "##END=\n"
        )
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
        content = (
            "##TITLE=Label Test\n"
            "##XYDATA=(X++(Y..Y))\n"
            "100.0 1.0\n"
            "##END=\n"
        )
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


# ── SPC (dependency error path) ─────────────────────────────────────


class TestReadSPC:
    @pytest.mark.skipif(_has_spc(), reason="spc IS installed, skip dep-error test")
    def test_read_spc_without_spc_spectra(self) -> None:
        """read_spc raises DependencyError when spc-spectra is not installed."""
        from spectrakit.io.spc import read_spc

        with pytest.raises(DependencyError, match="spc-spectra"):
            read_spc("/fake/file.spc")


# ── OPUS ─────────────────────────────────────────────────────────────


class TestReadOPUS:
    def test_not_implemented(self) -> None:
        from spectrakit.io.opus import read_opus

        with pytest.raises(NotImplementedError):
            read_opus("/fake/file.0")
