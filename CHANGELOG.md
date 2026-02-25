# Changelog

All notable changes to SpectraKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.2.0] - 2026-02-25

### Added
- Batch query support: all 4 similarity functions accept 2-D query × 2-D reference → (M, N) matrix
- Plot functions (`plot_spectrum`, `plot_comparison`, `plot_baseline`) exported from top-level package
- Configurable file size limit via `SPECTRAKIT_MAX_FILE_SIZE` environment variable
- Separated `[spc]` optional extra for `spc-spectra` package
- Performance notes in Euclidean and Pearson docstrings for large 2-D × 2-D inputs

### Changed
- Standardized NaN/Inf handling across all similarity metrics using EPSILON guard pattern
- Pearson similarity rewritten to use direct dot-product (removed `np.corrcoef` dependency)
- Test coverage improved from 97% to 100% (348 tests, 6 skipped)
- Proven-unreachable defensive code annotated with `# pragma: no cover`
- Fixed contrib `__init__.py` docstring referencing non-existent module

## [1.1.0] - 2026-02-25

### Added
- Bruker OPUS binary file reader (`read_opus`) — native parser, no external dependencies
- Notebook gallery in documentation site via mkdocs-jupyter
- CI: Codecov coverage upload, optional dependency test matrix, automated PyPI publishing workflow
- Dependabot configuration for GitHub Actions and pip dependency updates
- Pre-commit configuration with ruff and mypy hooks
- Community standards: CODE_OF_CONDUCT.md, SECURITY.md, PR template
- Makefile with common development commands
- README badges: CI status, Codecov coverage, PyPI version

### Changed
- Test coverage improved from 76% to 97% (242 tests, 6 skipped)
- All mypy strict mode errors resolved (0 errors across 53 source files)
- Fixed ruff formatting and lint issues in notebooks (import sorting, zip strict)
- OPUS entry in README I/O table updated from "Planned" to supported

## [1.0.0] - 2026-02-25

### Added
- Documentation site with mkdocs-material and auto-generated API reference
- Processing workflow, pipeline, and sklearn integration guides
- Five example Jupyter notebooks (quickstart, baselines, derivatives, scatter, sklearn)
- `[docs]` optional extra for documentation tools
- Comprehensive README with full feature overview

### Changed
- README rewritten with complete API tables and usage examples

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
