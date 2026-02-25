"""Tests for pybaselines contrib backend."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.contrib._pybaselines import list_pybaselines_methods, pybaselines_method

pybaselines = pytest.importorskip("pybaselines", reason="pybaselines not installed")


class TestPybaselinesBackend:
    """Verify pybaselines contrib backend."""

    def test_asls_1d(self) -> None:
        rng = np.random.default_rng(42)
        y = rng.random(200)
        baseline = pybaselines_method(y, method="asls", lam=1e6)
        assert baseline.shape == y.shape

    def test_asls_2d(self) -> None:
        rng = np.random.default_rng(42)
        y = rng.random((3, 200))
        baseline = pybaselines_method(y, method="asls", lam=1e6)
        assert baseline.shape == y.shape

    def test_airpls(self) -> None:
        rng = np.random.default_rng(42)
        y = rng.random(200)
        baseline = pybaselines_method(y, method="airpls", lam=1e6)
        assert baseline.shape == y.shape

    def test_snip(self) -> None:
        rng = np.random.default_rng(42)
        y = rng.random(200)
        baseline = pybaselines_method(y, method="snip", max_half_window=40)
        assert baseline.shape == y.shape

    def test_unknown_method_raises(self) -> None:
        with pytest.raises(ValueError, match="Unknown pybaselines method"):
            pybaselines_method(np.ones(100), method="nonexistent_method")

    def test_list_methods(self) -> None:
        methods = list_pybaselines_methods()
        assert isinstance(methods, dict)
        assert "whittaker" in methods
        assert "asls" in methods["whittaker"]
