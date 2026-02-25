"""Plotting utilities for spectral data.

Requires matplotlib to be installed::

    pip install spectrakit[plot]

Provides convenience functions for common spectral visualizations:
- Single spectrum or overlay plots
- Before/after comparison
- Baseline correction visualization
"""

from __future__ import annotations

import logging
import types
from typing import TYPE_CHECKING, Any

import numpy as np

from spectrakit._validate import ensure_float64, validate_1d_or_2d
from spectrakit.exceptions import DependencyError

if TYPE_CHECKING:
    from matplotlib.axes import Axes

logger = logging.getLogger(__name__)


def _get_matplotlib() -> types.ModuleType:
    """Import matplotlib, raising DependencyError if missing."""
    try:
        import matplotlib.pyplot as plt

        return plt
    except ImportError as e:
        raise DependencyError(
            "matplotlib is required for plotting. Install with: pip install spectrakit[plot]"
        ) from e


def plot_spectrum(
    intensities: np.ndarray,
    wavenumbers: np.ndarray | None = None,
    *,
    ax: Axes | None = None,
    title: str | None = None,
    xlabel: str = "Wavenumber",
    ylabel: str = "Intensity",
    invert_x: bool = True,
    labels: list[str] | None = None,
    **kwargs: Any,
) -> Axes:
    """Plot one or more spectra.

    Args:
        intensities: Spectral data, shape ``(W,)`` or ``(N, W)``.
        wavenumbers: Wavenumber axis, shape ``(W,)``. If None, uses
            integer indices.
        ax: Matplotlib Axes to plot on. If None, creates a new figure.
        title: Plot title.
        xlabel: X-axis label.
        ylabel: Y-axis label.
        invert_x: Whether to invert the x-axis (standard for IR spectra).
        labels: Legend labels for each spectrum. Only used for 2D input.
        **kwargs: Additional keyword arguments passed to ``ax.plot()``.

    Returns:
        Matplotlib Axes object.
    """
    plt = _get_matplotlib()
    intensities = ensure_float64(intensities)
    intensities = validate_1d_or_2d(intensities)

    if ax is None:
        _, ax = plt.subplots()

    x = wavenumbers if wavenumbers is not None else np.arange(intensities.shape[-1])

    if intensities.ndim == 1:
        label = labels[0] if labels else None
        ax.plot(x, intensities, label=label, **kwargs)
    else:
        for i, spectrum in enumerate(intensities):
            label = labels[i] if labels and i < len(labels) else None
            ax.plot(x, spectrum, label=label, **kwargs)

    if title:
        ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)

    if invert_x and wavenumbers is not None:
        ax.invert_xaxis()

    if labels:
        ax.legend()

    return ax


def plot_comparison(
    original: np.ndarray,
    processed: np.ndarray,
    wavenumbers: np.ndarray | None = None,
    *,
    ax: Axes | None = None,
    labels: tuple[str, str] = ("Original", "Processed"),
    title: str | None = None,
    xlabel: str = "Wavenumber",
    ylabel: str = "Intensity",
    invert_x: bool = True,
    **kwargs: Any,
) -> Axes:
    """Plot before/after comparison of spectral processing.

    Args:
        original: Original spectrum, shape ``(W,)``.
        processed: Processed spectrum, shape ``(W,)``.
        wavenumbers: Wavenumber axis, shape ``(W,)``. If None, uses
            integer indices.
        ax: Matplotlib Axes to plot on. If None, creates a new figure.
        labels: Legend labels for original and processed spectra.
        title: Plot title.
        xlabel: X-axis label.
        ylabel: Y-axis label.
        invert_x: Whether to invert the x-axis.
        **kwargs: Additional keyword arguments passed to ``ax.plot()``.

    Returns:
        Matplotlib Axes object.
    """
    plt = _get_matplotlib()
    original = ensure_float64(original)
    processed = ensure_float64(processed)

    if ax is None:
        _, ax = plt.subplots()

    x = wavenumbers if wavenumbers is not None else np.arange(len(original))

    ax.plot(x, original, label=labels[0], alpha=0.7, **kwargs)
    ax.plot(x, processed, label=labels[1], **kwargs)

    if title:
        ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)

    if invert_x and wavenumbers is not None:
        ax.invert_xaxis()

    ax.legend()

    return ax


def plot_baseline(
    intensities: np.ndarray,
    baseline: np.ndarray,
    wavenumbers: np.ndarray | None = None,
    *,
    ax: Axes | None = None,
    show_corrected: bool = True,
    title: str | None = None,
    xlabel: str = "Wavenumber",
    ylabel: str = "Intensity",
    invert_x: bool = True,
    **kwargs: Any,
) -> Axes:
    """Plot a spectrum with its estimated baseline.

    Args:
        intensities: Original spectrum, shape ``(W,)``.
        baseline: Estimated baseline, shape ``(W,)``.
        wavenumbers: Wavenumber axis, shape ``(W,)``. If None, uses
            integer indices.
        ax: Matplotlib Axes to plot on. If None, creates a new figure.
        show_corrected: If True, also plots the corrected spectrum.
        title: Plot title.
        xlabel: X-axis label.
        ylabel: Y-axis label.
        invert_x: Whether to invert the x-axis.
        **kwargs: Additional keyword arguments passed to ``ax.plot()``.

    Returns:
        Matplotlib Axes object.
    """
    plt = _get_matplotlib()
    intensities = ensure_float64(intensities)
    baseline = ensure_float64(baseline)

    if ax is None:
        _, ax = plt.subplots()

    x = wavenumbers if wavenumbers is not None else np.arange(len(intensities))

    ax.plot(x, intensities, label="Original", alpha=0.7, **kwargs)
    ax.plot(x, baseline, label="Baseline", linestyle="--", color="red", **kwargs)

    if show_corrected:
        corrected = intensities - baseline
        ax.plot(x, corrected, label="Corrected", alpha=0.8, **kwargs)

    if title:
        ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)

    if invert_x and wavenumbers is not None:
        ax.invert_xaxis()

    ax.legend()

    return ax
