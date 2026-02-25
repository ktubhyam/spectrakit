"""Tests for plotting utilities."""

from __future__ import annotations

import numpy as np
import pytest

matplotlib = pytest.importorskip("matplotlib", reason="matplotlib not installed")

from spectrakit.plot import plot_baseline, plot_comparison, plot_spectrum  # noqa: E402


@pytest.fixture(autouse=True)
def _use_agg_backend() -> None:
    """Use non-interactive backend for tests."""
    matplotlib.use("Agg")


class TestPlotSpectrum:
    """Verify plot_spectrum function."""

    def test_1d_returns_axes(self) -> None:
        y = np.random.default_rng(42).random(100)
        ax = plot_spectrum(y)
        assert ax is not None

    def test_1d_with_wavenumbers(self) -> None:
        y = np.random.default_rng(42).random(100)
        x = np.linspace(400, 4000, 100)
        ax = plot_spectrum(y, x)
        assert ax is not None

    def test_2d_multiple_spectra(self) -> None:
        y = np.random.default_rng(42).random((5, 100))
        ax = plot_spectrum(y)
        assert len(ax.lines) == 5

    def test_with_labels(self) -> None:
        y = np.random.default_rng(42).random((3, 100))
        ax = plot_spectrum(y, labels=["A", "B", "C"])
        legend = ax.get_legend()
        assert legend is not None
        assert len(legend.get_texts()) == 3

    def test_with_title(self) -> None:
        y = np.random.default_rng(42).random(100)
        ax = plot_spectrum(y, title="Test Spectrum")
        assert ax.get_title() == "Test Spectrum"

    def test_custom_axis(self) -> None:
        import matplotlib.pyplot as plt

        _, custom_ax = plt.subplots()
        y = np.random.default_rng(42).random(100)
        result = plot_spectrum(y, ax=custom_ax)
        assert result is custom_ax

    def test_no_invert_x(self) -> None:
        y = np.random.default_rng(42).random(100)
        ax = plot_spectrum(y, invert_x=False)
        assert ax is not None


class TestPlotComparison:
    """Verify plot_comparison function."""

    def test_returns_axes(self) -> None:
        original = np.random.default_rng(42).random(100)
        processed = original * 0.8
        ax = plot_comparison(original, processed)
        assert ax is not None
        assert len(ax.lines) == 2

    def test_with_wavenumbers(self) -> None:
        x = np.linspace(400, 4000, 100)
        original = np.random.default_rng(42).random(100)
        processed = original * 0.8
        ax = plot_comparison(original, processed, x)
        assert ax is not None

    def test_custom_labels(self) -> None:
        original = np.random.default_rng(42).random(100)
        processed = original * 0.8
        ax = plot_comparison(original, processed, labels=("Raw", "Smoothed"))
        legend = ax.get_legend()
        texts = [t.get_text() for t in legend.get_texts()]
        assert "Raw" in texts
        assert "Smoothed" in texts


class TestPlotBaseline:
    """Verify plot_baseline function."""

    def test_returns_axes(self) -> None:
        y = np.random.default_rng(42).random(100)
        bl = np.ones(100) * 0.5
        ax = plot_baseline(y, bl)
        assert ax is not None

    def test_with_corrected(self) -> None:
        y = np.random.default_rng(42).random(100)
        bl = np.ones(100) * 0.5
        ax = plot_baseline(y, bl, show_corrected=True)
        # Original + baseline + corrected = 3 lines
        assert len(ax.lines) == 3

    def test_without_corrected(self) -> None:
        y = np.random.default_rng(42).random(100)
        bl = np.ones(100) * 0.5
        ax = plot_baseline(y, bl, show_corrected=False)
        # Original + baseline = 2 lines
        assert len(ax.lines) == 2

    def test_with_wavenumbers(self) -> None:
        x = np.linspace(400, 4000, 100)
        y = np.random.default_rng(42).random(100)
        bl = np.ones(100) * 0.5
        ax = plot_baseline(y, bl, x)
        assert ax is not None
