# Contributing to SpectraKit

Thank you for your interest in contributing to SpectraKit!

## Development Setup

```bash
# Clone the repository
git clone https://github.com/ktubhyam/spectrakit.git
cd spectrakit

# Install in development mode
uv pip install -e ".[dev]"

# Verify installation
pytest
```

## Running Quality Checks

```bash
# Lint
ruff check src/ tests/

# Format
ruff format src/ tests/

# Type check
mypy src/spectrakit/

# Tests with coverage
pytest --cov=spectrakit --cov-report=term-missing
```

## Adding a New Processing Method

1. Create a new `.py` file in the appropriate subpackage (e.g., `src/spectrakit/baseline/`)
2. Follow the existing pattern (see `als.py` as reference):
   - `from __future__ import annotations`
   - `logger = logging.getLogger(__name__)`
   - Named constants at module top (`DEFAULT_*`)
   - Google-style docstrings with shape notation `(W,)`, `(N, W)`
   - Use `ensure_float64`, `validate_1d_or_2d`, `apply_along_spectra` from `_validate`
3. Add to the subpackage `__init__.py` re-exports
4. Add to `src/spectrakit/__init__.py` re-exports and `__all__`
5. Write tests in the corresponding `tests/test_*.py` file

## Adding a New File Format

1. Create `src/spectrakit/io/format_name.py`
2. Implement `def read_format_name(path: str | Path) -> Spectrum`
3. Gate optional deps behind `DependencyError` with install instructions
4. Add to `[project.optional-dependencies]` in `pyproject.toml`
5. Add to `io/__init__.py` and top-level `__init__.py`

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `docs:` — documentation only
- `test:` — adding or updating tests
- `chore:` — build, CI, or tooling changes

## Code Style

- Python 3.10+ — use `X | Y` union syntax
- Strict type hints on all function signatures
- One concern per module
- No magic numbers — use named constants
