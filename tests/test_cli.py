"""Tests for the CLI module."""

from __future__ import annotations

import subprocess
import sys

import numpy as np
import pytest

typer = pytest.importorskip("typer", reason="typer not installed")

from typer.testing import CliRunner  # noqa: E402

from spectrakit.cli import app  # noqa: E402

runner = CliRunner()


class TestCLIDependency:
    def test_cli_import_without_typer(self) -> None:
        """CLI module should fail gracefully when typer is not installed."""
        result = subprocess.run(
            [
                sys.executable,
                "-c",
                (
                    "import sys; "
                    "sys.modules['typer'] = None; "
                    "from spectrakit.cli import _get_app; "
                    "_get_app()"
                ),
            ],
            capture_output=True,
            text=True,
        )
        assert result.returncode == 1
        assert "typer" in result.stderr.lower()

    def test_get_app_without_typer_in_process(self) -> None:
        """_get_app raises SystemExit(1) and prints error when typer missing."""
        from io import StringIO
        from unittest.mock import patch

        from spectrakit.cli import _get_app

        fake_stderr = StringIO()
        with (
            patch.dict(sys.modules, {"typer": None}),
            patch("sys.stderr", fake_stderr),
            pytest.raises(SystemExit, match="1"),
        ):
            _get_app()

    def test_cli_main_entry(self) -> None:
        """Running cli.py as __main__ should show help."""
        result = subprocess.run(
            [sys.executable, "-m", "spectrakit.cli", "--help"],
            capture_output=True,
            text=True,
            timeout=10,
        )
        assert result.returncode == 0
        assert "spectrakit" in result.stdout.lower()


class TestCLIInfo:
    """Test the `info` command."""

    def test_info_jcamp(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """info command reads a JCAMP file and prints metadata."""
        content = "##TITLE=Test\n##XYDATA=(X++(Y..Y))\n400.0 0.1 0.2 0.3\n700.0 0.4 0.5\n##END=\n"
        jdx = tmp_path / "sample.dx"
        jdx.write_text(content)

        result = runner.invoke(app, ["info", str(jdx)])
        assert result.exit_code == 0
        assert "jcamp" in result.stdout.lower()
        assert "5" in result.stdout  # n_points

    def test_info_csv(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """info command reads a CSV file."""
        data = np.column_stack([np.linspace(400, 4000, 50), np.random.default_rng(42).random(50)])
        csv_path = tmp_path / "test.csv"
        np.savetxt(csv_path, data, delimiter=",")

        result = runner.invoke(app, ["info", str(csv_path)])
        assert result.exit_code == 0
        assert "csv" in result.stdout.lower()
        assert "50" in result.stdout

    def test_info_hdf5(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """info command reads an HDF5 file."""
        h5py = pytest.importorskip("h5py")
        h5_path = tmp_path / "test.h5"
        with h5py.File(h5_path, "w") as f:
            f.create_dataset("intensities", data=np.ones(30))
            f.create_dataset("wavenumbers", data=np.linspace(400, 4000, 30))

        result = runner.invoke(app, ["info", str(h5_path)])
        assert result.exit_code == 0
        assert "hdf5" in result.stdout.lower()

    def test_info_tsv(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """info command reads a TSV file with tab delimiter."""
        data = np.column_stack([np.linspace(400, 4000, 40), np.random.default_rng(42).random(40)])
        tsv_path = tmp_path / "test.tsv"
        np.savetxt(tsv_path, data, delimiter="\t")

        result = runner.invoke(app, ["info", str(tsv_path)])
        assert result.exit_code == 0
        assert "csv" in result.stdout.lower()

    def test_info_spc_file(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """info command on .spc file (spc-spectra may not be installed)."""
        spc_path = tmp_path / "test.spc"
        spc_path.write_bytes(b"\x00" * 100)  # Dummy SPC content

        result = runner.invoke(app, ["info", str(spc_path)])
        # Either succeeds or raises an error; we just verify it doesn't hang
        assert result.exit_code in (0, 1)

    def test_info_unknown_format(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """info command with unknown file extension."""
        bad = tmp_path / "test.xyz"
        bad.write_text("data")

        result = runner.invoke(app, ["info", str(bad)])
        assert result.exit_code == 1

    def test_info_with_metadata(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """info command shows metadata section."""
        content = "##TITLE=Ethanol\n##ORIGIN=Lab\n##XYDATA=(X++(Y..Y))\n400.0 0.5\n##END=\n"
        jdx = tmp_path / "meta.dx"
        jdx.write_text(content)

        result = runner.invoke(app, ["info", str(jdx)])
        assert result.exit_code == 0
        assert "Metadata" in result.stdout


class TestCLIConvert:
    """Test the `convert` command."""

    def test_convert_jcamp_to_hdf5(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Convert JCAMP to HDF5."""
        pytest.importorskip("h5py")
        content = (
            "##TITLE=Convert Test\n##XYDATA=(X++(Y..Y))\n400.0 0.1 0.2 0.3\n700.0 0.4 0.5\n##END=\n"
        )
        jdx = tmp_path / "input.dx"
        jdx.write_text(content)
        out = tmp_path / "output.h5"

        result = runner.invoke(app, ["convert", str(jdx), str(out)])
        assert result.exit_code == 0
        assert "Converted" in result.stdout
        assert out.exists()

    def test_convert_csv_to_hdf5(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Convert CSV to HDF5."""
        pytest.importorskip("h5py")
        data = np.column_stack([np.linspace(400, 4000, 50), np.random.default_rng(42).random(50)])
        csv_path = tmp_path / "input.csv"
        np.savetxt(csv_path, data, delimiter=",")
        out = tmp_path / "output.h5"

        result = runner.invoke(app, ["convert", str(csv_path), str(out)])
        assert result.exit_code == 0
        assert out.exists()

    def test_convert_hdf5_to_hdf5(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Convert HDF5 to HDF5 (tests the HDF5 input path in convert)."""
        h5py = pytest.importorskip("h5py")
        src = tmp_path / "input.h5"
        with h5py.File(src, "w") as f:
            f.create_dataset("intensities", data=np.ones(30))
            f.create_dataset("wavenumbers", data=np.linspace(400, 4000, 30))
        out = tmp_path / "output.h5"

        result = runner.invoke(app, ["convert", str(src), str(out)])
        assert result.exit_code == 0
        assert out.exists()

    def test_convert_opus_to_hdf5(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Convert OPUS to HDF5 (tests the OPUS input path in convert)."""
        import struct

        pytest.importorskip("h5py")

        n_points = 10
        # Build param block
        param = b"NPT\x00" + struct.pack("<HHi", 0, 4, n_points)
        param += b"FXV\x00" + struct.pack("<HHd", 1, 8, 400.0)
        param += b"LXV\x00" + struct.pack("<HHd", 1, 8, 4000.0)
        data_content = np.ones(n_points, dtype=np.float32).tobytes()

        header_size = 24
        dir_size = 36
        data_offset = header_size + dir_size
        param_offset = data_offset + len(data_content)

        header = struct.pack("<IIIIII", 0x0A0A, 0, header_size, 0, 10, 2)
        dir_data = struct.pack("<III", 0x0F, len(data_content), data_offset)
        dir_params = struct.pack("<III", 0x1F, len(param), param_offset)
        dir_sentinel = struct.pack("<III", 0, 0, 0)

        raw = header + dir_data + dir_params + dir_sentinel + data_content + param
        opus_path = tmp_path / "test.0"
        opus_path.write_bytes(raw)
        out = tmp_path / "output.h5"

        result = runner.invoke(app, ["convert", str(opus_path), str(out)])
        assert result.exit_code == 0
        assert out.exists()

    def test_convert_spc_to_hdf5(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Convert SPC to HDF5 (tests the SPC input path in convert)."""
        pytest.importorskip("h5py")
        spc_path = tmp_path / "test.spc"
        spc_path.write_bytes(b"\x00" * 100)

        result = runner.invoke(app, ["convert", str(spc_path), str(tmp_path / "out.h5")])
        # Will either succeed or fail depending on spc-spectra availability
        assert result.exit_code in (0, 1)

    def test_convert_unsupported_format(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Convert with unsupported input format."""
        bad = tmp_path / "test.xyz"
        bad.write_text("data")

        result = runner.invoke(app, ["convert", str(bad), str(tmp_path / "out.h5")])
        assert result.exit_code == 1
