"""Interactive Jupyter widgets for spectral visualization.

Provides ``SpectrumViewer``, an anywidget-based widget that renders
spectral data using a React-based SpectraView component inside Jupyter
notebooks.

Requires the ``widgets`` extra::

    pip install pyspectrakit[widgets]

Example::

    from spectrakit import Spectrum
    from spectrakit.widgets import SpectrumViewer

    spec = Spectrum(
        intensities=np.array([0.1, 0.5, 0.9, 0.5, 0.1]),
        wavenumbers=np.array([400, 800, 1200, 1600, 2000]),
        label="sample",
    )
    viewer = SpectrumViewer(spec, title="IR Spectrum")
    viewer  # displays in notebook
"""

from __future__ import annotations

from spectrakit.exceptions import DependencyError

# Serializers are always available (pure numpy + struct)
from spectrakit.widgets._serializers import spectra_to_binary, spectrum_to_binary

__all__ = [
    "SpectrumViewer",
    "spectrum_to_binary",
    "spectra_to_binary",
]


def __getattr__(name: str) -> object:
    """Lazy-load SpectrumViewer to gate the anywidget dependency.

    This avoids importing anywidget/traitlets at module level, so users
    who only need the serializers (or haven't installed the widgets
    extra) don't get an ImportError.

    Args:
        name: The attribute name being accessed.

    Returns:
        The requested attribute.

    Raises:
        DependencyError: If anywidget or traitlets is not installed and
            ``SpectrumViewer`` is requested.
        AttributeError: If the name is not a public export.
    """
    if name == "SpectrumViewer":
        try:
            from spectrakit.widgets._widget import SpectrumViewer
        except ImportError as exc:
            raise DependencyError(
                "anywidget and traitlets are required for interactive widgets. "
                "Install with: pip install pyspectrakit[widgets]"
            ) from exc
        return SpectrumViewer

    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")
