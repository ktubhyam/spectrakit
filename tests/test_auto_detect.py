"""Tests for the auto-detect file reader (read_spectrum / detect_format)."""

from __future__ import annotations

import pytest

from spectrakit.exceptions import FileFormatError
from spectrakit.io.auto import detect_format, read_spectrum
from spectrakit.spectrum import Spectrum

# ---------------------------------------------------------------------------
# Helpers — create minimal test files
# ---------------------------------------------------------------------------

JCAMP_CONTENT = """\
##TITLE=Test Spectrum
##JCAMP-DX=4.24
##DATA TYPE=INFRARED SPECTRUM
##XUNITS=1/CM
##YUNITS=ABSORBANCE
##FIRSTX=400
##LASTX=4000
##NPOINTS=5
##XYDATA=(X++(Y..Y))
400.0 0.1 0.2 0.3 0.4 0.5
##END=
"""

CSV_CONTENT = """\
wavenumber,intensity
400.0,0.1
800.0,0.2
1200.0,0.3
1600.0,0.4
2000.0,0.5
"""

TSV_CONTENT = """\
wavenumber\tintensity
400.0\t0.1
800.0\t0.2
1200.0\t0.3
"""


# ---------------------------------------------------------------------------
# Tests: detect_format
# ---------------------------------------------------------------------------


class TestDetectFormat:
    """Test format detection from file extensions."""

    @pytest.mark.parametrize(
        ("filename", "expected"),
        [
            ("sample.jdx", "jcamp"),
            ("sample.dx", "jcamp"),
            ("sample.jcamp", "jcamp"),
            ("data.spc", "spc"),
            ("data.csv", "csv"),
            ("data.tsv", "csv"),
            ("data.txt", "csv"),
            ("data.h5", "hdf5"),
            ("data.hdf5", "hdf5"),
        ],
    )
    def test_extension_detection(self, filename: str, expected: str) -> None:
        """Known extensions map to the correct format."""
        assert detect_format(filename) == expected

    @pytest.mark.parametrize("ext", [".0", ".1", ".5", ".99"])
    def test_opus_numeric_extensions(self, ext: str) -> None:
        """Numeric extensions (.0-.99) are detected as OPUS."""
        assert detect_format(f"spectrum{ext}") == "opus"

    def test_unknown_extension_raises(self) -> None:
        """Unknown extensions raise FileFormatError."""
        with pytest.raises(FileFormatError, match="Cannot determine format"):
            detect_format("unknown.xyz")

    def test_case_insensitive(self) -> None:
        """Extension detection is case-insensitive."""
        assert detect_format("SAMPLE.JDX") == "jcamp"

    def test_magic_bytes_jcamp(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Files starting with ## are detected as JCAMP."""
        dat_file = tmp_path / "unknown.dat"
        dat_file.write_text(JCAMP_CONTENT)
        assert detect_format(dat_file) == "jcamp"

    def test_magic_bytes_hdf5(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Files with HDF5 magic bytes are detected correctly."""
        hdf_file = tmp_path / "unknown.dat"
        hdf_file.write_bytes(b"\x89HDF\r\n\x1a\n" + b"\x00" * 100)
        assert detect_format(hdf_file) == "hdf5"


# ---------------------------------------------------------------------------
# Tests: read_spectrum — extension-based
# ---------------------------------------------------------------------------


class TestReadSpectrumByExtension:
    """Test read_spectrum dispatches correctly by extension."""

    def test_read_jcamp(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """JCAMP files are read via read_jcamp."""
        jdx_file = tmp_path / "test.jdx"
        jdx_file.write_text(JCAMP_CONTENT)
        spec = read_spectrum(jdx_file)
        assert isinstance(spec, Spectrum)
        assert spec.n_points == 5

    def test_read_dx(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """.dx extension also dispatches to JCAMP reader."""
        dx_file = tmp_path / "test.dx"
        dx_file.write_text(JCAMP_CONTENT)
        spec = read_spectrum(dx_file)
        assert spec.n_points == 5

    def test_read_csv(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """CSV files are read via read_csv."""
        csv_file = tmp_path / "test.csv"
        csv_file.write_text(CSV_CONTENT)
        spec = read_spectrum(csv_file)
        assert isinstance(spec, Spectrum)
        assert spec.wavenumbers is not None

    def test_read_tsv_auto_delimiter(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """TSV files get tab delimiter automatically."""
        tsv_file = tmp_path / "test.tsv"
        tsv_file.write_text(TSV_CONTENT)
        spec = read_spectrum(tsv_file)
        assert isinstance(spec, Spectrum)
        # Verify tab delimiter was used (data is parseable)
        assert spec.n_points >= 3

    def test_file_not_found(self) -> None:
        """Non-existent file raises FileNotFoundError."""
        with pytest.raises(FileNotFoundError, match="File not found"):
            read_spectrum("/nonexistent/path/file.jdx")

    def test_unknown_extension(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Unknown extension raises FileFormatError."""
        unk_file = tmp_path / "data.xyz"
        unk_file.write_text("some data")
        with pytest.raises(FileFormatError, match="Cannot determine format"):
            read_spectrum(unk_file)


# ---------------------------------------------------------------------------
# Tests: read_spectrum — explicit format
# ---------------------------------------------------------------------------


class TestReadSpectrumExplicitFormat:
    """Test read_spectrum with format= parameter."""

    def test_format_override(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """format= overrides extension detection."""
        # File has .txt extension but content is JCAMP
        txt_file = tmp_path / "spectrum.txt"
        txt_file.write_text(JCAMP_CONTENT)
        spec = read_spectrum(txt_file, format="jcamp")
        assert spec.n_points == 5

    def test_format_jdx_alias(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """format='jdx' works as alias for jcamp."""
        jdx_file = tmp_path / "test.jdx"
        jdx_file.write_text(JCAMP_CONTENT)
        spec = read_spectrum(jdx_file, format="jdx")
        assert spec.n_points == 5

    def test_unknown_format_raises(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Unknown format string raises FileFormatError."""
        f = tmp_path / "data.jdx"
        f.write_text(JCAMP_CONTENT)
        with pytest.raises(FileFormatError, match="Unknown format"):
            read_spectrum(f, format="xyzformat")

    def test_case_insensitive_format(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """format= is case-insensitive."""
        jdx_file = tmp_path / "test.jdx"
        jdx_file.write_text(JCAMP_CONTENT)
        spec = read_spectrum(jdx_file, format="JCAMP")
        assert spec.n_points == 5


# ---------------------------------------------------------------------------
# Tests: read_spectrum — magic bytes fallback
# ---------------------------------------------------------------------------


class TestReadSpectrumMagicBytes:
    """Test read_spectrum falls back to magic bytes for unknown extensions."""

    def test_jcamp_magic_with_unknown_extension(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """JCAMP files with unrecognized extensions are detected by ## header."""
        dat_file = tmp_path / "spectrum.dat"
        dat_file.write_text(JCAMP_CONTENT)
        spec = read_spectrum(dat_file)
        assert isinstance(spec, Spectrum)
        assert spec.n_points == 5


# ---------------------------------------------------------------------------
# Tests: read_spectrum — kwargs passthrough
# ---------------------------------------------------------------------------


class TestReadSpectrumKwargs:
    """Test that extra kwargs are passed to underlying readers."""

    def test_csv_delimiter_kwarg(self, tmp_path) -> None:  # type: ignore[no-untyped-def]
        """Custom delimiter is passed to read_csv."""
        content = "wavenumber;intensity\n400.0;0.1\n800.0;0.2\n"
        csv_file = tmp_path / "semicolon.csv"
        csv_file.write_text(content)
        spec = read_spectrum(csv_file, delimiter=";")
        assert isinstance(spec, Spectrum)
        # Verify semicolon delimiter was used (data is parseable)
        assert spec.n_points >= 2


# ---------------------------------------------------------------------------
# Tests: top-level import
# ---------------------------------------------------------------------------


class TestTopLevelImport:
    """Verify read_spectrum and detect_format are importable from spectrakit."""

    def test_read_spectrum_importable(self) -> None:
        from spectrakit import read_spectrum as rs

        assert callable(rs)

    def test_detect_format_importable(self) -> None:
        from spectrakit import detect_format as df

        assert callable(df)
