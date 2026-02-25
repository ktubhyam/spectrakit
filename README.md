# SpectraKit

> Python toolkit for spectral data processing: smoothing, baseline correction,
> normalization, scatter correction, derivatives, peak analysis, and more.

[![CI](https://github.com/ktubhyam/spectrakit/actions/workflows/ci.yml/badge.svg)](https://github.com/ktubhyam/spectrakit/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ktubhyam/spectrakit/branch/main/graph/badge.svg)](https://codecov.io/gh/ktubhyam/spectrakit)
[![PyPI](https://img.shields.io/pypi/v/pyspectrakit.svg)](https://pypi.org/project/pyspectrakit/)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Typed](https://img.shields.io/badge/typing-strict-blue.svg)](https://peps.python.org/pep-0561/)

SpectraKit is a lightweight, pip-installable library for preprocessing and analyzing
spectral data from IR, Raman, and NIR spectroscopy. It follows a functional design
with NumPy arrays as the primary data type and requires only NumPy + SciPy as core
dependencies.

**[Documentation](https://ktubhyam.github.io/spectrakit/)** |
**[API Reference](https://ktubhyam.github.io/spectrakit/api/)** |
**[Examples](examples/)**

## Installation

```bash
pip install pyspectrakit
```

> **Note:** The PyPI distribution name is `pyspectrakit` (due to a naming conflict).
> The import name is simply `import spectrakit`.

Optional extras for additional functionality:

```bash
pip install pyspectrakit[io]         # HDF5 file support
pip install pyspectrakit[cli]        # Command-line interface
pip install pyspectrakit[baselines]  # pybaselines backend (200+ methods)
pip install pyspectrakit[fitting]    # lmfit peak fitting
pip install pyspectrakit[sklearn]    # scikit-learn integration
pip install pyspectrakit[plot]       # Plotting utilities
pip install pyspectrakit[all]        # Everything above
```

## Quick Start

```python
import numpy as np
from spectrakit import smooth_savgol, baseline_als, normalize_snv

# Load your spectral data (N spectra, W wavelengths)
spectra = np.loadtxt("data.csv", delimiter=",")

# Process with individual functions
smoothed = smooth_savgol(spectra, window_length=11)
corrected = baseline_als(smoothed, lam=1e6, p=0.01)
normalized = normalize_snv(corrected)
```

All functions accept both single spectra `(W,)` and batches `(N, W)`.

### Pipeline

Chain steps for reproducibility:

```python
from spectrakit.pipeline import Pipeline

pipe = Pipeline()
pipe.add("smooth", smooth_savgol, window_length=11)
pipe.add("baseline", baseline_als, lam=1e6)
pipe.add("normalize", normalize_snv)

processed = pipe.transform(spectra)
```

### scikit-learn Integration

Use any SpectraKit function in an sklearn pipeline:

```python
from sklearn.pipeline import Pipeline as SkPipeline
from sklearn.decomposition import PCA
from sklearn.svm import SVC
from spectrakit.sklearn import SpectralTransformer

pipe = SkPipeline([
    ("smooth", SpectralTransformer(smooth_savgol, window_length=11)),
    ("baseline", SpectralTransformer(baseline_als, lam=1e6)),
    ("normalize", SpectralTransformer(normalize_snv)),
    ("pca", PCA(n_components=10)),
    ("svm", SVC()),
])

pipe.fit(X_train, y_train)
predictions = pipe.predict(X_test)
```

## Features

### Smoothing

| Method | Function | Description |
|--------|----------|-------------|
| Savitzky-Golay | `smooth_savgol(y)` | Polynomial least-squares smoothing |
| Whittaker | `smooth_whittaker(y)` | Penalized least-squares smoother |

### Baseline Correction

| Method | Function | Description |
|--------|----------|-------------|
| ALS | `baseline_als(y)` | Asymmetric least squares |
| SNIP | `baseline_snip(y)` | Statistics-sensitive peak clipping |
| Polynomial | `baseline_polynomial(y)` | Iterative polynomial fit |
| Rubberband | `baseline_rubberband(y)` | Convex hull envelope |

### Normalization

| Method | Function | Description |
|--------|----------|-------------|
| SNV | `normalize_snv(y)` | Zero mean, unit variance |
| Min-Max | `normalize_minmax(y)` | Scale to [0, 1] |
| Area | `normalize_area(y)` | Unit area under curve |
| Vector | `normalize_vector(y)` | L2 norm = 1 |

### Derivatives

| Method | Function | Description |
|--------|----------|-------------|
| Savitzky-Golay | `derivative_savgol(y)` | SG polynomial derivative |
| Gap-Segment | `derivative_gap_segment(y)` | Norris-Williams derivative |

### Scatter Correction

| Method | Function | Description |
|--------|----------|-------------|
| MSC | `scatter_msc(y)` | Multiplicative scatter correction |
| EMSC | `scatter_emsc(y)` | Extended MSC with polynomial terms |

### Spectral Transforms

| Method | Function | Description |
|--------|----------|-------------|
| Kubelka-Munk | `transform_kubelka_munk(y)` | Reflectance to K-M units |
| ATR Correction | `transform_atr_correction(y, wn)` | ATR depth-of-penetration |

### Operations

| Function | Description |
|----------|-------------|
| `spectral_subtract(a, b)` | Spectral subtraction |
| `spectral_average(y)` | Mean spectrum from batch |
| `spectral_interpolate(y, wn, new_wn)` | Resample to new axis |

### Peak Analysis

| Function | Description |
|----------|-------------|
| `peaks_find(y)` | Find peaks with scipy.signal |
| `peaks_integrate(y)` | Integrate peak regions |

### Similarity Metrics

| Metric | Function | Range |
|--------|----------|-------|
| Cosine | `similarity_cosine(a, b)` | [-1, 1] |
| Pearson | `similarity_pearson(a, b)` | [-1, 1] |
| Spectral Angle | `similarity_spectral_angle(a, b)` | [0, pi] |
| Euclidean | `similarity_euclidean(a, b)` | [0, inf) |

### I/O Formats

| Format | Function | Dependencies |
|--------|----------|-------------|
| JCAMP-DX | `read_jcamp(path)` | None |
| SPC | `read_spc(path)` | spc-spectra |
| CSV/TSV | `read_csv(path)` | None |
| HDF5 | `read_hdf5(path)` / `write_hdf5(spec, path)` | h5py |
| Bruker OPUS | `read_opus(path)` | None |

### Optional Backends

| Backend | Extra | Description |
|---------|-------|-------------|
| pybaselines | `[baselines]` | 200+ baseline methods via `pybaselines_method()` |
| lmfit | `[fitting]` | Peak fitting with Gaussian, Lorentzian, Voigt models |

### Visualization

```python
from spectrakit.plot import plot_spectrum, plot_comparison, plot_baseline
```

Requires `pip install pyspectrakit[plot]`.

## Spectrum Container

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
pip install pyspectrakit[cli]

spectrakit info ethanol.dx
spectrakit convert ethanol.dx ethanol.h5
```

## Examples

See the [examples/](examples/) directory for Jupyter notebooks:

1. **Quick Start** — basic preprocessing workflow
2. **Baseline Methods** — comparing correction algorithms
3. **Derivatives & Peaks** — derivative analysis and peak finding
4. **Scatter Correction** — MSC vs EMSC vs SNV
5. **sklearn Pipeline** — classification with preprocessing

## Development

```bash
git clone https://github.com/ktubhyam/spectrakit.git
cd spectrakit
pip install -e ".[all,dev]"
pytest
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Citation

If you use SpectraKit in your research, please cite:

```bibtex
@software{spectrakit,
  author = {Karthikeyan, Tubhyam},
  title = {SpectraKit: Python toolkit for spectral data processing},
  url = {https://github.com/ktubhyam/spectrakit},
  license = {MIT}
}
```

## License

MIT
