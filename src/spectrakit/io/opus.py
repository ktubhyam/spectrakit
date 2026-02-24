"""Bruker OPUS binary file format parser (.0, .1, etc.)."""
from __future__ import annotations

from pathlib import Path

from spectrakit.spectrum import Spectrum


def read_opus(path: str | Path) -> Spectrum:
    """Read a Bruker OPUS binary file and return a Spectrum.

    Args:
        path: Path to the OPUS file.

    Returns:
        Spectrum with intensities shape (W,) and wavenumbers shape (W,).

    Raises:
        NotImplementedError: OPUS parsing is not yet implemented.
    """
    raise NotImplementedError(
        "Bruker OPUS parsing is not yet implemented. "
        "Consider using the brukeropusreader or opusFC library as a bridge."
    )
