# Installation

## Basic Install

SpectraKit requires Python 3.10+ and depends only on NumPy and SciPy:

```bash
pip install pyspectrakit
```

> **Note:** The PyPI distribution name is `pyspectrakit` (due to a naming conflict).
> The import name is simply `import spectrakit`.

## Optional Dependencies

SpectraKit uses optional extras for features that require additional packages:

```bash
# File format support (h5py for HDF5)
pip install pyspectrakit[io]

# Command-line interface
pip install pyspectrakit[cli]

# pybaselines backend (200+ baseline methods)
pip install pyspectrakit[baselines]

# lmfit backend (peak fitting)
pip install pyspectrakit[fitting]

# scikit-learn transformer bridge
pip install pyspectrakit[sklearn]

# Plotting utilities
pip install pyspectrakit[plot]

# Everything
pip install pyspectrakit[all]
```

## Development Install

For contributing to SpectraKit:

```bash
git clone https://github.com/ktubhyam/spectrakit.git
cd spectrakit
pip install -e ".[all,dev,docs]"
```

This installs all optional dependencies plus development tools (pytest, ruff, mypy)
and documentation tools (mkdocs, mkdocs-material).

## Verifying Installation

```python
import spectrakit
print(spectrakit.__version__)
```
