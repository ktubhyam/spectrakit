# SpectraKit

> Python toolkit for spectral data processing: format parsers, baseline correction,
> normalization, and spectral similarity matching.

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Installation

```bash
pip install spectrakit
```

With optional dependencies:

```bash
# HDF5 + SPC file support
pip install spectrakit[io]

# CLI
pip install spectrakit[cli]

# Everything
pip install spectrakit[all]
```

## Quick Start

```python
import numpy as np
from spectrakit import (
    Spectrum,
    read_jcamp,
    baseline_als,
    normalize_snv,
    similarity_cosine,
    Pipeline,
)

# Read a JCAMP-DX file
spec = read_jcamp("ethanol.dx")
print(spec.n_points, spec.wavenumbers[:5])

# Baseline correction + normalization
corrected = spec.intensities - baseline_als(spec.intensities)
normalized = normalize_snv(corrected)

# Or use a pipeline
pipe = Pipeline()
pipe.add("baseline", baseline_als, lam=1e6)
pipe.add("normalize", normalize_snv)
result = pipe.transform(spec.intensities)

# Compare two spectra
score = similarity_cosine(spectrum_a, spectrum_b)
```

## Features

### Format Parsers

| Format | Function | Dependencies |
|--------|----------|-------------|
| JCAMP-DX (.dx, .jdx) | `read_jcamp(path)` | None |
| SPC (.spc) | `read_spc(path)` | `spc-spectra` |
| CSV/TSV | `read_csv(path)` | None |
| Bruker OPUS | `read_opus(path)` | Planned |
| HDF5 (.h5) | `read_hdf5(path)` / `write_hdf5(spec, path)` | `h5py` |

### Baseline Correction

| Method | Function | Key Parameters |
|--------|----------|---------------|
| Asymmetric Least Squares | `baseline_als(y, lam, p)` | `lam`: smoothness, `p`: asymmetry |
| SNIP | `baseline_snip(y, max_half_window)` | `max_half_window`: clipping range |
| Polynomial | `baseline_polynomial(y, degree)` | `degree`: polynomial order |
| Rubberband | `baseline_rubberband(y)` | Convex hull, no parameters |

### Normalization

| Method | Function | Description |
|--------|----------|------------|
| SNV | `normalize_snv(y)` | Zero mean, unit variance |
| Min-Max | `normalize_minmax(y)` | Scale to [0, 1] |
| Area | `normalize_area(y)` | Integral = 1 |
| Vector | `normalize_vector(y)` | L2 norm = 1 |

### Similarity Matching

| Metric | Function | Range |
|--------|----------|-------|
| Cosine | `similarity_cosine(a, b)` | [-1, 1] |
| Pearson | `similarity_pearson(a, b)` | [-1, 1] |
| Spectral Angle | `similarity_spectral_angle(a, b)` | [0, pi] |
| Euclidean | `similarity_euclidean(a, b)` | [0, inf) |

All functions accept single spectra `(W,)` or batches `(N, W)`.

## The Spectrum Container

```python
from spectrakit import Spectrum

spec = Spectrum(
    intensities=np.array([...]),       # (W,) or (N, W)
    wavenumbers=np.array([...]),       # (W,), optional
    metadata={"instrument": "Bruker"},
    source_format="jcamp",
    label="ethanol_ir",
)
```

## CLI

```bash
# Show file info
spectrakit info ethanol.dx

# Convert to HDF5
spectrakit convert ethanol.dx ethanol.h5
```

## Development

```bash
git clone https://github.com/ktubhyam/spectrakit.git
cd spectrakit
uv pip install -e ".[all,dev]"
pytest
```

## License

MIT
