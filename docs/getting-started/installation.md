# Installation

## Basic Install

SpectraKit requires Python 3.10+ and depends only on NumPy and SciPy:

```bash
pip install spectrakit
```

## Optional Dependencies

SpectraKit uses optional extras for features that require additional packages:

```bash
# File format support (h5py for HDF5)
pip install spectrakit[io]

# Command-line interface
pip install spectrakit[cli]

# pybaselines backend (200+ baseline methods)
pip install spectrakit[baselines]

# lmfit backend (peak fitting)
pip install spectrakit[fitting]

# scikit-learn transformer bridge
pip install spectrakit[sklearn]

# Plotting utilities
pip install spectrakit[plot]

# Everything
pip install spectrakit[all]
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
