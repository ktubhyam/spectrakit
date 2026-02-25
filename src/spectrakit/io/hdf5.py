"""HDF5 spectral data reader and writer."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import numpy as np

from spectrakit._validate import validate_file_size
from spectrakit.exceptions import DependencyError
from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)


def read_hdf5(
    path: str | Path,
    intensities_key: str = "intensities",
    wavenumbers_key: str = "wavenumbers",
) -> Spectrum:
    """Read spectral data from an HDF5 file.

    Args:
        path: Path to the .h5 / .hdf5 file.
        intensities_key: Dataset key for intensity values.
        wavenumbers_key: Dataset key for wavenumber values.

    Returns:
        Spectrum loaded from the HDF5 datasets.

    Raises:
        ImportError: If h5py is not installed.
        FileNotFoundError: If path does not exist.
    """
    try:
        import h5py
    except ImportError as e:
        raise DependencyError(
            "h5py is required for HDF5 files. Install with: pip install spectrakit[io]"
        ) from e

    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"HDF5 file not found: {path}")

    validate_file_size(path.stat().st_size, path_name=str(path))

    with h5py.File(path, "r") as f:
        intensities = np.array(f[intensities_key], dtype=np.float64)
        wavenumbers = None
        if wavenumbers_key in f:
            wavenumbers = np.array(f[wavenumbers_key], dtype=np.float64)

        metadata: dict[str, Any] = {}
        for key, value in f.attrs.items():
            metadata[key] = value

    logger.debug("Read HDF5: shape %s from %s", intensities.shape, path.name)

    return Spectrum(
        intensities=intensities,
        wavenumbers=wavenumbers,
        metadata=metadata,
        source_format="hdf5",
        label=path.stem,
    )


def write_hdf5(
    spectrum: Spectrum,
    path: str | Path,
    intensities_key: str = "intensities",
    wavenumbers_key: str = "wavenumbers",
) -> None:
    """Write a Spectrum to an HDF5 file.

    Args:
        spectrum: Spectrum to save.
        path: Output file path.
        intensities_key: Dataset key for intensity values.
        wavenumbers_key: Dataset key for wavenumber values.
    """
    try:
        import h5py
    except ImportError as e:
        raise DependencyError(
            "h5py is required for HDF5 files. Install with: pip install spectrakit[io]"
        ) from e

    path = Path(path)
    with h5py.File(path, "w") as f:
        f.create_dataset(intensities_key, data=spectrum.intensities)
        if spectrum.wavenumbers is not None:
            f.create_dataset(wavenumbers_key, data=spectrum.wavenumbers)
        for key, value in spectrum.metadata.items():
            try:
                f.attrs[key] = value
            except TypeError:
                f.attrs[key] = str(value)

    logger.debug("Wrote HDF5: %s", path)
