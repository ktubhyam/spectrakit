# SpectraKit — Claude Code Instructions

## What This Project Is

SpectraKit is a **Python utility library** for spectral data processing, designed to be
pip-installable (`pip install spectrakit`). It is NOT a model — it is a preprocessing and
analysis toolkit used alongside (or independently of) deep learning projects like Spekron.

**Author:** Tubhyam Karthikeyan (ICT Mumbai)
**Repo:** https://github.com/ktubhyam/spectrakit

### What SpectraKit Does

1. **Format Parsers** — Read spectral files: JCAMP-DX, SPC, CSV, Bruker OPUS, HDF5
2. **Baseline Correction** — ALS, SNIP, polynomial, rubberband
3. **Normalization** — SNV, min-max, area, vector (L2)
4. **Spectral Similarity** — Cosine, Pearson, spectral angle mapper, Euclidean

### Core Design Decisions

- **numpy-based**: All processing uses numpy arrays, not torch tensors
- **Format-agnostic Spectrum container**: The `Spectrum` dataclass wraps intensities `(W,)`
  or `(N, W)` with optional wavenumbers and metadata
- **Functional style**: Processing functions are standalone (`baseline_als(y)`), not methods
  on Spectrum. Matches Spekron's patterns.
- **Pipeline pattern**: `Pipeline` chains processing steps as pure functions
- **Minimal core deps**: Only numpy + scipy. Optional deps gated behind extras `[io]`, `[cli]`
- **src layout**: Package code in `src/spectrakit/` with hatchling build

## Module Structure

```
src/spectrakit/
├── __init__.py          # Public API (re-exports everything)
├── _version.py          # __version__ = "0.1.0"
├── spectrum.py          # Spectrum dataclass container
├── io/                  # Format parsers (one file per format)
│   ├── jcamp.py         # JCAMP-DX (.dx, .jdx)
│   ├── spc.py           # Galactic SPC (requires spc-spectra)
│   ├── csv.py           # CSV/TSV generic loader
│   ├── opus.py          # Bruker OPUS (stub)
│   └── hdf5.py          # HDF5 read/write (requires h5py)
├── baseline/            # One method per file
│   ├── als.py           # Asymmetric Least Squares
│   ├── snip.py          # SNIP peak clipping
│   ├── polynomial.py    # Iterative polynomial
│   └── rubberband.py    # Convex hull
├── normalize/           # One method per file
│   ├── snv.py           # Standard Normal Variate
│   ├── minmax.py        # Min-max [0,1]
│   ├── area.py          # Area normalization
│   └── vector.py        # L2 normalization
├── similarity/          # One method per file
│   ├── cosine.py        # Cosine similarity
│   ├── pearson.py       # Pearson correlation
│   ├── spectral_angle.py # Spectral Angle Mapper
│   └── euclidean.py     # Euclidean distance
├── pipeline.py          # Pipeline chaining class
└── cli.py               # CLI entry point (typer, optional)
```

## Coding Conventions (MUST FOLLOW)

These match the Spekron project:

- **Python 3.10+** — use `X | Y` union syntax, not `Union[X, Y]`
- **`from __future__ import annotations`** in every module
- **Strict type hints** on ALL function signatures
- **Google-style docstrings** with array shape notation: `(W,)`, `(N, W)`, `(N,)`
- **Import order**: stdlib → third-party → relative (enforced by ruff isort)
- **No magic numbers** — named constants with UPPER_CASE at module top
- **One concern per module** — each .py file does one thing
- **Logging via `logging` module** — `logger = logging.getLogger(__name__)`, never `print()`
- **Descriptive variable names** — `intensities` not `y`, `wavenumbers` not `x`

## How to Run Tests

```bash
uv pip install -e ".[dev]"
pytest
pytest --cov=spectrakit --cov-report=term-missing
```

## How to Build and Install

```bash
uv pip install -e ".[all,dev]"   # Dev install
uv build                          # Build wheel
```

## Adding a New Processing Method

1. Create a new `.py` file in the appropriate subpackage
2. Implement with signature: `def method_name(intensities: np.ndarray, ...) -> np.ndarray`
3. Support both `(W,)` and `(N, W)` input shapes
4. Add to the subpackage `__init__.py` re-exports
5. Add to `src/spectrakit/__init__.py` re-exports and `__all__`
6. Write tests in the corresponding test file

## Adding a New File Format

1. Create `src/spectrakit/io/format_name.py`
2. Implement `def read_format_name(path: str | Path) -> Spectrum`
3. Gate third-party deps behind `ImportError` with a helpful message
4. Add to `[project.optional-dependencies]` in `pyproject.toml`
5. Add to `io/__init__.py` and top-level `__init__.py`
6. Add format detection to `cli.py`

## Git Conventions

Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
