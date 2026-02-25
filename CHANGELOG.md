# Changelog

All notable changes to SpectraKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.5.0] - 2026-02-25

### Added
- **Wavenumber-aware Whittaker smoothing**: optional `wavenumbers` parameter builds non-uniform finite-difference penalty matrices that account for actual point spacing on non-uniform grids
- **Legendre polynomial basis for EMSC**: replaced monomial powers with orthogonal Legendre polynomials for improved numerical conditioning of the design matrix
- **Convex hull normal-based rubberband**: replaced median heuristic with hull facet normal analysis for mathematically correct lower hull vertex identification (fixes skewed spectra)
- ATR correction wavenumber-length validation
- `baseline_polynomial` tolerance validation (must be positive)
- `scatter_emsc` poly_order validation (must be non-negative)
- 51 new tests: mathematical invariant properties (normalization idempotence, similarity axioms, smoothing preservation), pipeline integration, and wavenumber-aware smoothing

### Changed
- `apply_along_spectra` uses pre-allocated output array instead of Python list comprehension (reduced memory overhead for batch processing)
- `plot.py` uses `TYPE_CHECKING` for proper matplotlib type annotations (`Axes`) instead of `Any`
- Test suite: 505 tests, 99% coverage, 0 mypy errors, 0 ruff errors

## [1.4.0] - 2026-02-25

### Added
- Native `baseline_arpls` (Asymmetrically Reweighted PLS) — adaptive reweighting without fixed asymmetry parameter
- `write_csv` — export Spectrum to CSV/TSV with optional header and delimiter control
- `write_jcamp` — export single-spectrum to JCAMP-DX 5.0 format with metadata
- Parameter validation for `smooth_whittaker` (lam, differences), `smooth_savgol` (window_length, polyorder), and `derivative_gap_segment` (gap, segment)
- Wavenumber-length mismatch validation in `spectral_crop` and `spectral_interpolate`
- Quantitative correctness tests: SNIP RMS, rubberband RMS, ArPLS recovery, Whittaker preservation, MSC exact recovery

### Changed
- Vectorized gap-segment derivative inner loop (numpy slicing replaces Python for-loop)
- Vectorized area normalization 2D path (`np.trapezoid` with `axis=1`)
- ArPLS sigmoid exponent clamped to prevent overflow warnings

## [1.3.0] - 2026-02-25

### Added
- Absorbance ↔ transmittance conversions: `transform_absorbance_to_transmittance`, `transform_transmittance_to_absorbance`
- Spectral cropping: `spectral_crop(intensities, wavenumbers, start, end)`
- Spectral width validation: all similarity functions now raise `SpectrumShapeError` on mismatched point counts
- Memory guard: Euclidean 2D×2D falls back to chunked computation when intermediate array would exceed ~4 GB
- Parameter validation: `baseline_als` validates p∈(0,1), lam>0, max_iter≥1; `baseline_polynomial` validates degree≥0; `baseline_snip` validates max_half_window≥1
- ATR correction physics validation: checks refractive indices, angle range, and critical angle condition
- Kubelka-Munk warns when reflectance values fall outside [0, 1]
- Interpolation warns when target wavenumbers extend beyond original range
- `peaks_integrate` rejects 2D input with a clear error message
- CLI `convert` command now supports SPC, HDF5, and OPUS input formats
- 29 mathematical correctness tests verifying known analytical solutions
- 42 validation tests for new parameter checks and width validation
- Batch query support: all 4 similarity functions accept 2-D query × 2-D reference → (M, N) matrix

### Fixed
- **ATR correction was scientifically wrong**: discriminant was computed but discarded; correction now uses `ν * √(sin²θ - (n₂/n₁)²)` as per Harrick (1967)
- **Normalization 2D degenerate count**: replaced `== 1.0` sentinel check with explicit boolean mask to avoid false positives when a spectrum genuinely has range/std/norm = 1.0
- **Pearson 2D×2D**: eliminated duplicate `norms_q @ norms_r.T` computation

### Changed
- SNIP inner loop vectorized with numpy (was pure Python, ~100x faster)
- Pearson similarity rewritten to use direct dot-product (removed `np.corrcoef` dependency)
- Test coverage: 418 tests, 100% line coverage across 55 source files
- Standardized NaN/Inf handling across all similarity metrics using EPSILON guard pattern

## [1.2.0] - 2026-02-25

### Added
- Plot functions (`plot_spectrum`, `plot_comparison`, `plot_baseline`) exported from top-level package
- Configurable file size limit via `SPECTRAKIT_MAX_FILE_SIZE` environment variable
- Separated `[spc]` optional extra for `spc-spectra` package
- Performance notes in Euclidean and Pearson docstrings for large 2-D × 2-D inputs

### Changed
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
