"""CSV/TSV spectral data loader."""
from __future__ import annotations

import logging
from pathlib import Path
from typing import Literal

import numpy as np

from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)


def read_csv(
    path: str | Path,
    delimiter: str = ",",
    x_column: int = 0,
    y_column: int = 1,
    skip_header: int = 0,
    orientation: Literal["columns", "rows"] = "columns",
) -> Spectrum:
    """Read spectral data from a CSV or TSV file.

    Args:
        path: Path to the CSV file.
        delimiter: Column separator. Use "\\t" for TSV.
        x_column: Index of the wavenumber/wavelength column. Set to -1
            to indicate no x-axis column (y data only).
        y_column: Index of the intensity column (for single-spectrum files).
            Ignored when orientation="rows".
        skip_header: Number of header lines to skip.
        orientation: "columns" means each column is a variable (x, y1, y2...);
            "rows" means each row is a full spectrum.

    Returns:
        Spectrum with intensities and optional wavenumbers.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"CSV file not found: {path}")

    data = np.genfromtxt(
        path,
        delimiter=delimiter,
        skip_header=skip_header,
        dtype=np.float64,
    )

    if data.ndim == 1:
        return Spectrum(
            intensities=data,
            source_format="csv",
            label=path.stem,
        )

    wavenumbers: np.ndarray | None = None

    if orientation == "columns":
        if x_column >= 0:
            wavenumbers = data[:, x_column]
            y_cols = [i for i in range(data.shape[1]) if i != x_column]
            if len(y_cols) == 1:
                intensities = data[:, y_cols[0]]
            else:
                intensities = data[:, y_cols].T  # (N, W)
        else:
            if y_column >= 0 and data.shape[1] > 1:
                intensities = data[:, y_column]
            else:
                intensities = data
    else:
        if x_column >= 0:
            wavenumbers = data[x_column, :]
            intensities = np.delete(data, x_column, axis=0)
        else:
            intensities = data

    logger.debug("Read CSV: shape %s from %s", intensities.shape, path.name)

    return Spectrum(
        intensities=intensities,
        wavenumbers=wavenumbers,
        source_format="csv",
        label=path.stem,
    )
