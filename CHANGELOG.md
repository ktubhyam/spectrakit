# Changelog

All notable changes to SpectraKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.4.0] - 2026-02-25

### Added
- Plotting utilities: `plot_spectrum`, `plot_comparison`, `plot_baseline` (requires matplotlib)
- scikit-learn transformer bridge: `SpectralTransformer` for use in `sklearn.pipeline.Pipeline`
- Contrib backends: `pybaselines_method` (pybaselines wrapper), `fit_peaks` (lmfit wrapper)
- New optional extras: `[sklearn]`, `[plot]`, `[baselines]`, `[fitting]`

## [0.3.0] - 2026-02-25

### Added
- Smoothing: `smooth_savgol` (Savitzky-Golay), `smooth_whittaker` (penalized least squares)
- Derivatives: `derivative_savgol` (SG derivative), `derivative_gap_segment` (Norris-Williams)
- Scatter correction: `scatter_msc` (MSC), `scatter_emsc` (Extended MSC)
- Spectral transforms: `transform_kubelka_munk`, `transform_atr_correction`
- Spectral operations: `spectral_subtract`, `spectral_average`, `spectral_interpolate`
- Peak analysis: `peaks_find` (with `PeakResult` container), `peaks_integrate`

## [0.2.0] - 2026-02-25

### Added
- Custom exception hierarchy: `SpectraKitError`, `SpectrumShapeError`, `FileFormatError`, `DependencyError`, `EmptySpectrumError`
- Internal validation utilities (`_validate.py`): `ensure_float64`, `validate_1d_or_2d`, `apply_along_spectra`, shared `EPSILON`
- PEP 561 `py.typed` marker for type checker support
- GitHub Actions CI workflow (lint + test on Python 3.10-3.13)
- `CONTRIBUTING.md` with development guide
- `CITATION.cff` for academic citation
- GitHub issue templates (bug report, feature request)

### Changed
- Baseline module refactored to use `_validate` helpers (no API changes)
- Normalize module refactored to use shared `EPSILON` and input validation
- Similarity module refactored to use shared `EPSILON` and input validation
- IO module now uses `FileFormatError` and `DependencyError` instead of generic exceptions

## [0.1.0] - 2026-02-25

### Added
- Initial release
- `Spectrum` dataclass container for spectral data
- Format parsers: JCAMP-DX, SPC, CSV, OPUS (stub), HDF5
- Baseline correction: ALS, SNIP, polynomial, rubberband
- Normalization: SNV, min-max, area, vector (L2)
- Spectral similarity: cosine, Pearson, spectral angle, Euclidean
- `Pipeline` class for chaining processing steps
- CLI entry point (typer)
