# Changelog

All notable changes to SpectraKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.9.0] - 2026-02-26

### Added
- **Jupyter widget** (`spectrakit.widgets`):
  - `SpectrumViewer` anywidget-based interactive viewer for Jupyter notebooks using spectraview frontend
  - Binary data serialization via traitlets for performant Python-to-JS spectrum transfer
  - New `[widgets]` optional dependency group (`pip install pyspectrakit[widgets]`)
- **Auto-detect reader** (`spectrakit.io.auto`):
  - `read_spectrum(path, format=None, **kwargs)` — unified entry point that auto-detects file format from extension or magic bytes
  - `detect_format(path)` — returns format string without reading data
  - Supports JCAMP-DX, SPC, CSV/TSV, Bruker OPUS, and HDF5
  - Magic bytes fallback: `##=JCAMP`, `\x89HDF=HDF5`, `\x0a\x0a=OPUS`
- Refactored CLI `info` and `convert` commands to use `read_spectrum`
- 50 new tests (743 total)

### Fixed
- mypy type-ignore for anywidget optional dependency
- Widget frontend API alignment with spectraview component props
- CI failures: widget dist build, lint errors, similarity epsilon guard

## [1.8.1] - 2026-02-25

### Changed
- Updated PyPI description and keywords to reflect v1.8.0 features (despiking, signal quality, peak analysis)
- Added Codecov integration with coverage upload from CI

## [1.8.0] - 2026-02-25

### Added
- **Despiking subpackage** (`spectrakit.despike`):
  - `despike_whitaker_hayes` — modified Z-score of 2nd derivative with linear interpolation (Whitaker & Hayes 2018)
  - `despike_zscore` — rolling Z-score detection with median replacement
- **Signal quality subpackage** (`spectrakit.quality`):
  - `quality_snr` — signal-to-noise ratio (automatic via 2nd derivative or explicit region-based)
  - `quality_roughness` — RMS of finite differences for noise assessment
- **New spectral operations**:
  - `spectral_correlate` — cross-correlation wrapper with optional L2 normalization
  - `spectral_align` — shift alignment via cross-correlation peak detection
- 67 new tests (692 total, up from 625)
- API documentation pages for despike and quality subpackages

## [1.7.2] - 2026-02-25

### Fixed
- CI: remove `spc` from `[all]` extra and install `spc-spectra` separately with graceful fallback (broken source build in CI)

### Changed
- `[all]` extra no longer includes `[spc]`; install separately with `pip install pyspectrakit[spc]` if needed

## [1.7.1] - 2026-02-25

### Added
- `parallel_jobs(n)` context manager for thread-safe, scoped parallelism (auto-restores previous `n_jobs` on exit)
- ConvergenceInfo docstring usage examples
- Git tags for all releases (v0.1.0 through v1.7.0)

### Changed
- CI actions pinned to SHA hashes for supply-chain hardening
- SECURITY.md supported versions updated to cover all 1.x releases
- `__all__` organized with category section comments for every subpackage
- Unused test imports cleaned up (ruff F401)
- Test suite: 619 tests, 0 mypy strict errors, 0 ruff errors

## [1.7.0] - 2026-02-25

### Added
- **`ConvergenceInfo` return type**: `baseline_als`, `baseline_arpls`, and `baseline_polynomial` accept `return_info=True` to return iteration count, convergence status, final residual, and baseline in a frozen dataclass
- **Parallel batch processing**: `set_n_jobs(n)` / `get_n_jobs()` configure thread-based parallelism for `apply_along_spectra` (scipy releases GIL during LAPACK calls)
- **Hypothesis property-based tests**: 21 tests verifying mathematical invariants — normalization idempotence/bounds, similarity metric axioms, smoothing preservation of constants
- **Golden reference regression tests**: 6 tests comparing ALS, SNIP, rubberband, Whittaker, SNV, and MSC outputs against stored `.npy` fixtures (seed 12345)
- **Adversarial I/O parser tests**: 27 tests covering JCAMP-DX edge cases (empty file, no XYDATA, scientific notation, blank lines), CSV edge cases (single column, TSV, rows orientation), convergence info validation, and parallel batch correctness
- Hatch sdist exclusion configuration (tests/, docs/, notebooks/, Makefile, mkdocs.yml)

### Changed
- Test suite: 617 tests, 0 mypy strict errors, 0 ruff errors

## [1.6.0] - 2026-02-25

### Fixed
- **SNIP inverse transform**: corrected `- EPSILON` to `- 1.0` in inverse LLS transform, matching the mathematical inverse of `y = log(log(sqrt(x+1)+1)+1)`
- **Gap-segment off-by-one**: rewrote derivative to use full `gap` as offset (`arr[gap:] - arr[:-gap]` centered at `gap // 2`), producing correct results for odd gap values

### Added
- `derivative_savgol` parameter validation: window_length (positive odd), polyorder (< window_length), deriv (non-negative), delta (positive)
- `derivative_savgol` `delta` parameter for scaling derivatives by point spacing
- PEP 561 `py.typed` marker file for downstream type checker support
- 58 adversarial edge case tests: minimum-size spectra (n=3), extreme dynamic range, integer input conversion, SNIP roundtrip, gap-segment symmetry, batch caching correctness, degenerate spectra, empty spectrum parametrized tests

### Changed
- **Batch performance**: penalty matrix pre-computed once in `baseline_als`, `baseline_arpls`, and `smooth_whittaker` public functions, eliminating redundant per-row sparse matrix construction
- MSC and EMSC batch dispatch unified with `apply_along_spectra` (replaces ad-hoc list comprehension)
- Test suite: 563 tests, 0 mypy strict errors, 0 ruff errors

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
