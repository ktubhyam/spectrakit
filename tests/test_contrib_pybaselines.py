"""Tests for pybaselines contrib backend."""

from __future__ import annotations

import sys
from unittest.mock import patch

import numpy as np
import pytest

from spectrakit.contrib._pybaselines import (
    _get_pybaselines,
    list_pybaselines_methods,
    pybaselines_method,
)
from spectrakit.exceptions import DependencyError


def _has_pybaselines() -> bool:
    try:
        import pybaselines  # noqa: F401

        return True
    except ImportError:
        return False


class TestPybaselinesDependencyError:
    """Tests that run when pybaselines is NOT installed."""

    @pytest.mark.skipif(_has_pybaselines(), reason="pybaselines IS installed")
    def test_pybaselines_method_without_pybaselines(self) -> None:
        with pytest.raises(DependencyError, match="pybaselines"):
            pybaselines_method(np.ones(100), method="asls")

    @pytest.mark.skipif(_has_pybaselines(), reason="pybaselines IS installed")
    def test_get_pybaselines_raises(self) -> None:
        with pytest.raises(DependencyError, match="pybaselines"):
            _get_pybaselines()

    def test_get_pybaselines_raises_mocked(self) -> None:
        """_get_pybaselines raises DependencyError (mock missing import)."""
        with (
            patch.dict(sys.modules, {"pybaselines": None, "pybaselines.Baseline": None}),
            pytest.raises(DependencyError, match="pybaselines"),
        ):
            _get_pybaselines()


class TestPybaselinesMetadata:
    """Tests that run regardless of pybaselines availability."""

    def test_list_methods(self) -> None:
        methods = list_pybaselines_methods()
        assert isinstance(methods, dict)
        assert "whittaker" in methods
        assert "asls" in methods["whittaker"]


class TestPybaselinesBackend:
    """Verify pybaselines contrib backend (skipped if not installed)."""

    pybaselines = pytest.importorskip("pybaselines", reason="pybaselines not installed")  # type: ignore[assignment]

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
