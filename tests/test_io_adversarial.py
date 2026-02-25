"""Adversarial I/O parser tests.

Tests JCAMP-DX and CSV parsers with malformed, truncated, and
edge-case input files to ensure graceful error handling.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
import pytest

from spectrakit.exceptions import FileFormatError
from spectrakit.io.csv import read_csv, write_csv
from spectrakit.io.jcamp import read_jcamp, write_jcamp
from spectrakit.spectrum import Spectrum


class TestJCAMPAdversarial:
    """Adversarial inputs for the JCAMP-DX parser."""

    def test_empty_file_raises(self, tmp_path: Path) -> None:
        """Empty JCAMP file raises FileFormatError."""
        p = tmp_path / "empty.dx"
        p.write_text("")
        with pytest.raises(FileFormatError, match="No XYDATA"):
            read_jcamp(p)

    def test_no_xydata_block(self, tmp_path: Path) -> None:
        """File with headers but no XYDATA raises FileFormatError."""
        p = tmp_path / "no_data.dx"
        p.write_text("##TITLE=Test\n##JCAMP-DX=5.00\n##XUNITS=1/CM\n##YUNITS=ABSORBANCE\n##END=\n")
        with pytest.raises(FileFormatError, match="No XYDATA"):
            read_jcamp(p)

    def test_single_point(self, tmp_path: Path) -> None:
        """JCAMP with a single data point."""
        p = tmp_path / "single.dx"
        p.write_text("##TITLE=Single\n##XYDATA=(X++(Y..Y))\n400.0 1.5\n##END=\n")
        spec = read_jcamp(p)
        assert spec.n_points == 1
        assert spec.intensities[0] == pytest.approx(1.5)

    def test_multiline_y_values(self, tmp_path: Path) -> None:
        """JCAMP with multiple Y values per X line."""
        p = tmp_path / "multi.dx"
        p.write_text(
            "##TITLE=Multi\n"
            "##FIRSTX=400\n"
            "##LASTX=404\n"
            "##XYDATA=(X++(Y..Y))\n"
            "400.0 1.0 2.0 3.0 4.0 5.0\n"
            "##END=\n"
        )
        spec = read_jcamp(p)
        assert spec.n_points == 5
        np.testing.assert_allclose(spec.intensities, [1.0, 2.0, 3.0, 4.0, 5.0])

    def test_scientific_notation(self, tmp_path: Path) -> None:
        """JCAMP with scientific notation Y values."""
        p = tmp_path / "sci.dx"
        p.write_text(
            "##TITLE=Sci\n"
            "##FIRSTX=400\n"
            "##LASTX=402\n"
            "##XYDATA=(X++(Y..Y))\n"
            "400.0 1.5e-3 2.7e+2 -3.14E1\n"
            "##END=\n"
        )
        spec = read_jcamp(p)
        assert spec.n_points == 3
        np.testing.assert_allclose(spec.intensities, [1.5e-3, 2.7e2, -3.14e1], atol=1e-10)

    def test_extra_blank_lines(self, tmp_path: Path) -> None:
        """JCAMP with extra blank lines between data rows."""
        p = tmp_path / "blanks.dx"
        p.write_text(
            "##TITLE=Blanks\n"
            "##FIRSTX=400\n"
            "##LASTX=401\n"
            "##XYDATA=(X++(Y..Y))\n"
            "\n"
            "400.0 1.0 2.0\n"
            "\n"
            "##END=\n"
        )
        spec = read_jcamp(p)
        assert spec.n_points == 2

    def test_metadata_extraction(self, tmp_path: Path) -> None:
        """Metadata headers are properly extracted."""
        p = tmp_path / "meta.dx"
        p.write_text(
            "##TITLE=My Spectrum\n"
            "##ORIGIN=SpectraKit Test\n"
            "##OWNER=Public Domain\n"
            "##FIRSTX=400\n"
            "##LASTX=401\n"
            "##XYDATA=(X++(Y..Y))\n"
            "400.0 1.0 2.0\n"
            "##END=\n"
        )
        spec = read_jcamp(p)
        assert spec.metadata["TITLE"] == "My Spectrum"
        assert spec.metadata["ORIGIN"] == "SpectraKit Test"

    def test_file_not_found(self) -> None:
        """Nonexistent file raises FileNotFoundError."""
        with pytest.raises(FileNotFoundError):
            read_jcamp("/nonexistent/path/data.dx")

    def test_roundtrip(self, tmp_path: Path) -> None:
        """Write then read a JCAMP file preserves data."""
        wn = np.linspace(400, 4000, 50)
        y = np.sin(wn / 500)
        spec = Spectrum(intensities=y, wavenumbers=wn, label="roundtrip")
        out = tmp_path / "roundtrip.dx"
        write_jcamp(spec, out)
        loaded = read_jcamp(out)
        assert loaded.n_points == 50
        np.testing.assert_allclose(loaded.intensities, y, atol=1e-5)

    def test_negative_values(self, tmp_path: Path) -> None:
        """JCAMP with negative Y values."""
        p = tmp_path / "neg.dx"
        p.write_text(
            "##TITLE=Neg\n"
            "##FIRSTX=400\n"
            "##LASTX=402\n"
            "##XYDATA=(X++(Y..Y))\n"
            "400.0 -1.5 -0.3 2.1\n"
            "##END=\n"
        )
        spec = read_jcamp(p)
        np.testing.assert_allclose(spec.intensities, [-1.5, -0.3, 2.1])


class TestCSVAdversarial:
    """Adversarial inputs for the CSV parser."""

    def test_single_column(self, tmp_path: Path) -> None:
        """CSV with a single column (no wavenumbers)."""
        p = tmp_path / "single_col.csv"
        np.savetxt(p, np.arange(20, dtype=float).reshape(-1, 1), delimiter=",")
        spec = read_csv(p, x_column=-1)
        assert spec.wavenumbers is None

    def test_tsv_delimiter(self, tmp_path: Path) -> None:
        """TSV file with tab delimiter."""
        p = tmp_path / "data.tsv"
        data = np.column_stack([np.arange(10, dtype=float), np.arange(10, 20, dtype=float)])
        np.savetxt(p, data, delimiter="\t")
        spec = read_csv(p, delimiter="\t")
        assert spec.n_points == 10

    def test_rows_orientation(self, tmp_path: Path) -> None:
        """CSV with rows orientation (each row is a spectrum)."""
        p = tmp_path / "rows.csv"
        data = np.random.default_rng(42).random((5, 20))
        np.savetxt(p, data, delimiter=",")
        spec = read_csv(p, x_column=-1, orientation="rows")
        assert spec.intensities.shape == (5, 20)

    def test_write_read_roundtrip_2d(self, tmp_path: Path) -> None:
        """Write and read back a 2D spectrum via CSV."""
        wn = np.linspace(400, 4000, 30)
        y = np.random.default_rng(42).random((3, 30))
        spec = Spectrum(intensities=y, wavenumbers=wn)
        out = tmp_path / "batch.csv"
        write_csv(spec, out)
        loaded = read_csv(out, skip_header=1)
        assert loaded.n_points == 30

    def test_file_not_found(self) -> None:
        """Nonexistent file raises FileNotFoundError."""
        with pytest.raises(FileNotFoundError):
            read_csv("/nonexistent/path/data.csv")

    def test_multiple_y_columns(self, tmp_path: Path) -> None:
        """CSV with multiple Y columns produces 2D output."""
        p = tmp_path / "multi_y.csv"
        wn = np.arange(50, dtype=float)
        y1 = np.ones(50)
        y2 = np.ones(50) * 2
        data = np.column_stack([wn, y1, y2])
        np.savetxt(p, data, delimiter=",")
        spec = read_csv(p)
        # Multiple Y columns → 2D intensities
        assert spec.intensities.ndim == 2


class TestConvergenceInfo:
    """Test ConvergenceInfo return from iterative baselines."""

    def test_als_return_info(self) -> None:
        """ALS with return_info=True returns ConvergenceInfo."""
        from spectrakit import ConvergenceInfo, baseline_als

        y = np.random.default_rng(42).random(200) + 1.0
        info = baseline_als(y, lam=1e6, return_info=True)
        assert isinstance(info, ConvergenceInfo)
        assert info.iterations >= 1
        assert isinstance(info.converged, bool)
        assert info.baseline.shape == y.shape
        assert info.final_residual >= 0

    def test_arpls_return_info(self) -> None:
        """ArPLS with return_info=True returns ConvergenceInfo."""
        from spectrakit import ConvergenceInfo, baseline_arpls

        y = np.random.default_rng(42).random(200) + 1.0
        info = baseline_arpls(y, lam=1e6, return_info=True)
        assert isinstance(info, ConvergenceInfo)
        assert info.iterations >= 1
        assert info.baseline.shape == y.shape

    def test_polynomial_return_info(self) -> None:
        """Polynomial with return_info=True returns ConvergenceInfo."""
        from spectrakit import ConvergenceInfo, baseline_polynomial

        x = np.linspace(0, 10, 200)
        y = 0.5 * x**2 + 3.0 * np.exp(-((x - 5) ** 2) / 0.5)
        info = baseline_polynomial(y, degree=2, return_info=True)
        assert isinstance(info, ConvergenceInfo)
        assert info.iterations >= 1
        assert info.baseline.shape == y.shape

    def test_als_return_info_matches_default(self) -> None:
        """ALS return_info baseline matches default return."""
        from spectrakit import baseline_als

        y = np.random.default_rng(42).random(100) + 1.0
        bl_default = baseline_als(y, lam=1e6)
        info = baseline_als(y, lam=1e6, return_info=True)
        np.testing.assert_allclose(info.baseline, bl_default, atol=1e-14)  # type: ignore[union-attr]

    def test_als_return_info_2d_raises(self) -> None:
        """return_info=True on 2D input raises ValueError."""
        from spectrakit import baseline_als

        y = np.random.default_rng(42).random((3, 100))
        with pytest.raises(ValueError, match="return_info.*only supported for 1-D"):
            baseline_als(y, return_info=True)

    def test_convergence_info_repr(self) -> None:
        """ConvergenceInfo has a useful repr."""
        from spectrakit import ConvergenceInfo

        info = ConvergenceInfo(
            iterations=5,
            converged=True,
            final_residual=1e-8,
            baseline=np.zeros(10),
        )
        r = repr(info)
        assert "converged" in r
        assert "5 iterations" in r


class TestParallelBatch:
    """Test set_n_jobs / get_n_jobs for parallel batch processing."""

    def test_set_get_n_jobs(self) -> None:
        """set_n_jobs / get_n_jobs round-trip."""
        import spectrakit

        original = spectrakit.get_n_jobs()
        try:
            spectrakit.set_n_jobs(4)
            assert spectrakit.get_n_jobs() == 4
            spectrakit.set_n_jobs(1)
            assert spectrakit.get_n_jobs() == 1
        finally:
            spectrakit.set_n_jobs(original)

    def test_set_n_jobs_minus_one(self) -> None:
        """set_n_jobs(-1) uses cpu_count."""
        import os

        import spectrakit

        original = spectrakit.get_n_jobs()
        try:
            spectrakit.set_n_jobs(-1)
            assert spectrakit.get_n_jobs() == (os.cpu_count() or 1)
        finally:
            spectrakit.set_n_jobs(original)

    def test_set_n_jobs_invalid_raises(self) -> None:
        """set_n_jobs(0) raises ValueError."""
        import spectrakit

        with pytest.raises(ValueError, match="n_jobs must be >= 1"):
            spectrakit.set_n_jobs(0)

    def test_parallel_als_matches_sequential(self) -> None:
        """Parallel ALS produces same result as sequential."""
        from spectrakit import baseline_als, parallel_jobs

        rng = np.random.default_rng(42)
        batch = rng.random((6, 100)) + 1.0

        seq = baseline_als(batch, lam=1e5)

        with parallel_jobs(2):
            par = baseline_als(batch, lam=1e5)

        np.testing.assert_allclose(par, seq, atol=1e-10)

    def test_parallel_whittaker_matches_sequential(self) -> None:
        """Parallel Whittaker produces same result as sequential."""
        from spectrakit import parallel_jobs, smooth_whittaker

        rng = np.random.default_rng(42)
        batch = rng.random((6, 100)) + 1.0

        seq = smooth_whittaker(batch, lam=1e4)

        with parallel_jobs(2):
            par = smooth_whittaker(batch, lam=1e4)

        np.testing.assert_allclose(par, seq, atol=1e-10)

    def test_parallel_jobs_context_manager_restores(self) -> None:
        """parallel_jobs restores previous n_jobs on exit."""
        import spectrakit

        spectrakit.set_n_jobs(1)
        assert spectrakit.get_n_jobs() == 1

        with spectrakit.parallel_jobs(4):
            assert spectrakit.get_n_jobs() == 4

        assert spectrakit.get_n_jobs() == 1

    def test_parallel_jobs_context_manager_restores_on_error(self) -> None:
        """parallel_jobs restores n_jobs even if body raises."""
        import spectrakit

        spectrakit.set_n_jobs(1)
        with pytest.raises(RuntimeError), spectrakit.parallel_jobs(4):
            assert spectrakit.get_n_jobs() == 4
            raise RuntimeError("test")

        assert spectrakit.get_n_jobs() == 1
