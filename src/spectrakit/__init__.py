"""
SpectraKit: Python toolkit for spectral data processing.

Provides format parsers, baseline correction, normalization,
and spectral similarity matching for vibrational spectroscopy data.
"""

from spectrakit._validate import get_n_jobs, parallel_jobs, set_n_jobs
from spectrakit._version import __version__

# Baseline correction
from spectrakit.baseline import (
    baseline_als,
    baseline_arpls,
    baseline_polynomial,
    baseline_rubberband,
    baseline_snip,
)
from spectrakit.convergence import ConvergenceInfo

# Derivative
from spectrakit.derivative import derivative_gap_segment, derivative_savgol

# Exceptions
from spectrakit.exceptions import (
    DependencyError,
    EmptySpectrumError,
    FileFormatError,
    SpectraKitError,
    SpectrumShapeError,
)

# I/O
from spectrakit.io import (
    read_csv,
    read_hdf5,
    read_jcamp,
    read_opus,
    read_spc,
    write_csv,
    write_hdf5,
    write_jcamp,
)

# Normalization
from spectrakit.normalize import normalize_area, normalize_minmax, normalize_snv, normalize_vector

# Operations
from spectrakit.ops import spectral_average, spectral_crop, spectral_interpolate, spectral_subtract

# Peaks
from spectrakit.peaks import PeakResult, peaks_find, peaks_integrate

# Pipeline
from spectrakit.pipeline import Pipeline

# Plotting (requires matplotlib)
from spectrakit.plot import plot_baseline, plot_comparison, plot_spectrum

# Scatter correction
from spectrakit.scatter import scatter_emsc, scatter_msc

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

# Transform
from spectrakit.transform import (
    transform_absorbance_to_transmittance,
    transform_atr_correction,
    transform_kubelka_munk,
    transform_transmittance_to_absorbance,
)

__all__ = [
    "__version__",
    # Exceptions
    "SpectraKitError",
    "SpectrumShapeError",
    "FileFormatError",
    "DependencyError",
    "EmptySpectrumError",
    # Core types and configuration
    "ConvergenceInfo",
    "Spectrum",
    "Pipeline",
    "set_n_jobs",
    "get_n_jobs",
    "parallel_jobs",
    # I/O
    "read_jcamp",
    "read_spc",
    "read_csv",
    "read_opus",
    "read_hdf5",
    "write_hdf5",
    "write_csv",
    "write_jcamp",
    # Baseline correction
    "baseline_als",
    "baseline_arpls",
    "baseline_snip",
    "baseline_polynomial",
    "baseline_rubberband",
    # Normalization
    "normalize_snv",
    "normalize_minmax",
    "normalize_area",
    "normalize_vector",
    # Similarity
    "similarity_cosine",
    "similarity_pearson",
    "similarity_spectral_angle",
    "similarity_euclidean",
    # Smoothing
    "smooth_savgol",
    "smooth_whittaker",
    # Derivatives
    "derivative_savgol",
    "derivative_gap_segment",
    # Scatter correction
    "scatter_msc",
    "scatter_emsc",
    # Spectral transforms
    "transform_kubelka_munk",
    "transform_atr_correction",
    "transform_absorbance_to_transmittance",
    "transform_transmittance_to_absorbance",
    # Spectral operations
    "spectral_subtract",
    "spectral_average",
    "spectral_interpolate",
    "spectral_crop",
    # Peak analysis
    "peaks_find",
    "peaks_integrate",
    "PeakResult",
    # Plotting
    "plot_spectrum",
    "plot_comparison",
    "plot_baseline",
]
