"""Tests for I/O format parsers."""

from __future__ import annotations

import numpy as np
import pytest


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


class TestReadJCAMP:
    def test_file_not_found(self) -> None:
        from spectrakit.io.jcamp import read_jcamp

        with pytest.raises(FileNotFoundError):
            read_jcamp("/nonexistent/file.dx")


class TestReadOPUS:
    def test_not_implemented(self) -> None:
        from spectrakit.io.opus import read_opus

        with pytest.raises(NotImplementedError):
            read_opus("/fake/file.0")
