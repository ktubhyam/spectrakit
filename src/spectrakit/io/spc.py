"""Galactic SPC file format parser (.spc)."""

from __future__ import annotations

import logging
from pathlib import Path

import numpy as np

from spectrakit._validate import validate_file_size
from spectrakit.exceptions import DependencyError
from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)


def read_spc(path: str | Path) -> Spectrum:
    """Read a Galactic SPC file and return a Spectrum.

    Requires the ``spc-spectra`` package (install via
    ``pip install spectrakit[io]``).

    Args:
        path: Path to the .spc file.

    Returns:
        Spectrum with intensities shape (W,) or (N, W) for multi-trace files.

    Raises:
        ImportError: If spc-spectra is not installed.
        FileNotFoundError: If path does not exist.
    """
    try:
        import spc
    except ImportError as e:
        raise DependencyError(
            "spc-spectra is required for SPC files. Install with: pip install spectrakit[io]"
        ) from e

    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"SPC file not found: {path}")

    validate_file_size(path.stat().st_size, path_name=str(path))

    f = spc.File(str(path))

    if f.fnsub == 1:
        wavenumbers = np.array(f.x, dtype=np.float64)
        intensities = np.array(f.sub[0].y, dtype=np.float64)
    else:
        wavenumbers = np.array(f.x, dtype=np.float64)
        intensities = np.array([sub.y for sub in f.sub], dtype=np.float64)

    metadata = {
        "fnsub": f.fnsub,
        "fexper": getattr(f, "fexper", ""),
    }

    logger.debug("Read SPC: %s sub-spectra from %s", f.fnsub, path.name)

    return Spectrum(
        intensities=intensities,
        wavenumbers=wavenumbers,
        metadata=metadata,
        source_format="spc",
        label=path.stem,
    )
