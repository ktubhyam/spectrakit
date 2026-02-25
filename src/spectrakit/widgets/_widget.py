"""Anywidget-based interactive spectrum viewer for Jupyter notebooks.

Provides ``SpectrumViewer``, an ``anywidget.AnyWidget`` subclass that
renders spectral data using a React-based SpectraView component. Data
is transferred to the frontend as compact binary buffers via traitlets.

Requires the ``widgets`` extra::

    pip install pyspectrakit[widgets]
"""

from __future__ import annotations

import logging
import pathlib
from typing import TYPE_CHECKING

import anywidget
import traitlets as tl

from spectrakit.widgets._serializers import spectra_to_binary, spectrum_to_binary

if TYPE_CHECKING:
    from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)

# Resolve paths to bundled frontend assets
_FRONTEND_DIR = pathlib.Path(__file__).parent / "_frontend"
_ESM_PATH = _FRONTEND_DIR / "dist" / "index.js"
_CSS_PATH = _FRONTEND_DIR / "dist" / "style.css"

# Default dimensions
DEFAULT_WIDTH = "100%"
DEFAULT_HEIGHT = "500px"


class SpectrumViewer(anywidget.AnyWidget):
    """Interactive spectrum viewer widget for Jupyter notebooks.

    Renders one or more spectra using a React-based SpectraView component
    in the notebook output cell. Spectral data is transferred as a compact
    binary buffer for efficient rendering.

    Attributes:
        _esm: Path to the bundled ES module for the frontend.
        _css: Path to the bundled CSS stylesheet.
        spectrum_data: Binary-encoded spectral data (managed internally).
        title: Chart title displayed above the plot.
        x_label: Label for the x-axis (wavenumber/wavelength).
        y_label: Label for the y-axis (intensity/absorbance).
        width: CSS width of the widget container.
        height: CSS height of the widget container.
        x_reversed: Whether to reverse the x-axis (common for IR spectra).
        show_grid: Whether to display grid lines.
        show_legend: Whether to display the legend.
        theme: Color theme, either ``"light"`` or ``"dark"``.

    Examples:
        >>> import numpy as np
        >>> from spectrakit.spectrum import Spectrum
        >>> from spectrakit.widgets import SpectrumViewer
        >>> spec = Spectrum(
        ...     intensities=np.random.rand(100),
        ...     wavenumbers=np.linspace(400, 4000, 100),
        ...     label="Sample",
        ... )
        >>> viewer = SpectrumViewer(spec, title="IR Spectrum")
        >>> viewer  # displays in Jupyter  # doctest: +SKIP
    """

    _esm = tl.Unicode().tag(sync=True)
    _css = tl.Unicode().tag(sync=True)

    # Binary spectral data — efficient transfer via Bytes traitlet
    spectrum_data = tl.Bytes(b"").tag(sync=True)

    # Display configuration
    title = tl.Unicode("").tag(sync=True)
    x_label = tl.Unicode("Wavenumber (cm\u207b\u00b9)").tag(sync=True)
    y_label = tl.Unicode("Intensity").tag(sync=True)
    width = tl.Unicode(DEFAULT_WIDTH).tag(sync=True)
    height = tl.Unicode(DEFAULT_HEIGHT).tag(sync=True)
    x_reversed = tl.Bool(True).tag(sync=True)
    show_grid = tl.Bool(True).tag(sync=True)
    show_legend = tl.Bool(True).tag(sync=True)
    theme = tl.Unicode("light").tag(sync=True)

    def __init__(
        self,
        spectrum: Spectrum | list[Spectrum] | None = None,
        *,
        title: str = "",
        x_label: str = "Wavenumber (cm\u207b\u00b9)",
        y_label: str = "Intensity",
        width: str = DEFAULT_WIDTH,
        height: str = DEFAULT_HEIGHT,
        x_reversed: bool = True,
        show_grid: bool = True,
        show_legend: bool = True,
        theme: str = "light",
        **kwargs: object,
    ) -> None:
        """Initialize the spectrum viewer.

        Args:
            spectrum: A single Spectrum or list of Spectrum objects to
                display. Can be ``None`` to create an empty viewer.
            title: Chart title displayed above the plot.
            x_label: Label for the x-axis.
            y_label: Label for the y-axis.
            width: CSS width of the widget container.
            height: CSS height of the widget container.
            x_reversed: Whether to reverse the x-axis (default True
                for IR spectra where high wavenumbers are on the left).
            show_grid: Whether to display grid lines.
            show_legend: Whether to display the legend.
            theme: Color theme, either ``"light"`` or ``"dark"``.
            **kwargs: Additional keyword arguments passed to
                ``anywidget.AnyWidget``.
        """
        esm_content = _read_esm()
        css_content = _read_css()

        super().__init__(
            _esm=esm_content,
            _css=css_content,
            spectrum_data=b"",
            title=title,
            x_label=x_label,
            y_label=y_label,
            width=width,
            height=height,
            x_reversed=x_reversed,
            show_grid=show_grid,
            show_legend=show_legend,
            theme=theme,
            **kwargs,
        )

        if spectrum is not None:
            self.set_spectrum(spectrum)

    def set_spectrum(self, spectrum: Spectrum | list[Spectrum]) -> None:
        """Update the displayed spectrum data.

        Serializes the Spectrum object(s) to binary and triggers a
        frontend re-render.

        Args:
            spectrum: A single Spectrum or list of Spectrum objects.

        Examples:
            >>> viewer.set_spectrum(new_spectrum)  # doctest: +SKIP
        """
        if isinstance(spectrum, list):
            self.spectrum_data = spectra_to_binary(spectrum)
            logger.info("Updated viewer with %d spectra", len(spectrum))
        else:
            self.spectrum_data = spectrum_to_binary(spectrum)
            logger.info(
                "Updated viewer with spectrum '%s' (%d points)",
                spectrum.label,
                spectrum.n_points,
            )

    def clear(self) -> None:
        """Remove all spectrum data from the viewer."""
        self.spectrum_data = b""
        logger.info("Cleared spectrum viewer")


def _read_esm() -> str:
    """Read the bundled ESM JavaScript file.

    Returns:
        JavaScript module source code as a string.

    Raises:
        FileNotFoundError: If the frontend has not been built yet.
    """
    if not _ESM_PATH.exists():
        logger.warning(
            "Frontend bundle not found at %s. "
            "Run 'npm run build' in %s to build it.",
            _ESM_PATH,
            _FRONTEND_DIR,
        )
        # Return a minimal placeholder that renders an error message
        return _FALLBACK_ESM

    return _ESM_PATH.read_text(encoding="utf-8")


def _read_css() -> str:
    """Read the bundled CSS stylesheet.

    Returns:
        CSS source code as a string, or empty string if not found.
    """
    if not _CSS_PATH.exists():
        return ""
    return _CSS_PATH.read_text(encoding="utf-8")


# Fallback ESM shown when the frontend hasn't been built yet
_FALLBACK_ESM = """
export default {
  render({ model, el }) {
    const container = document.createElement("div");
    container.style.padding = "20px";
    container.style.border = "2px dashed #ccc";
    container.style.borderRadius = "8px";
    container.style.textAlign = "center";
    container.style.color = "#666";
    container.style.fontFamily = "system-ui, sans-serif";
    container.innerHTML = `
      <h3 style="margin: 0 0 8px 0;">SpectrumViewer</h3>
      <p>Frontend not built. Run:</p>
      <pre style="background: #f5f5f5; padding: 8px; border-radius: 4px; display: inline-block;">
cd src/spectrakit/widgets/_frontend && npm install && npm run build</pre>
    `;
    el.appendChild(container);
  }
};
""".strip()
