"""
SpectraKit: Python toolkit for spectral data processing.

Provides format parsers, baseline correction, normalization,
and spectral similarity matching for vibrational spectroscopy data.
"""

from spectrakit._version import __version__

# Baseline correction
from spectrakit.baseline import (
    baseline_als,
    baseline_polynomial,
    baseline_rubberband,
    baseline_snip,
)

# Exceptions
from spectrakit.exceptions import (
    DependencyError,
    EmptySpectrumError,
    FileFormatError,
    SpectraKitError,
    SpectrumShapeError,
)

# I/O
from spectrakit.io import read_csv, read_hdf5, read_jcamp, read_opus, read_spc, write_hdf5

# Normalization
from spectrakit.normalize import normalize_area, normalize_minmax, normalize_snv, normalize_vector

# Pipeline
from spectrakit.pipeline import Pipeline

# Similarity
from spectrakit.similarity import (
    similarity_cosine,
    similarity_euclidean,
    similarity_pearson,
    similarity_spectral_angle,
)

# Smoothing
from spectrakit.smooth import smooth_savgol, smooth_whittaker
from spectrakit.spectrum import Spectrum

__all__ = [
    "__version__",
    # Exceptions
    "SpectraKitError",
    "SpectrumShapeError",
    "FileFormatError",
    "DependencyError",
    "EmptySpectrumError",
    # Core types
    "Spectrum",
    "read_jcamp",
    "read_spc",
    "read_csv",
    "read_opus",
    "read_hdf5",
    "write_hdf5",
    "baseline_als",
    "baseline_snip",
    "baseline_polynomial",
    "baseline_rubberband",
    "normalize_snv",
    "normalize_minmax",
    "normalize_area",
    "normalize_vector",
    "similarity_cosine",
    "similarity_pearson",
    "similarity_spectral_angle",
    "similarity_euclidean",
    "smooth_savgol",
    "smooth_whittaker",
    "Pipeline",
]
