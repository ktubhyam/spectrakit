# SpectraKit

**Python toolkit for spectral data processing.**

SpectraKit provides a comprehensive, pip-installable library for preprocessing and analyzing
spectral data from IR, Raman, and NIR spectroscopy.

## Features

- **Format Parsers** — Read JCAMP-DX, SPC, CSV, Bruker OPUS, HDF5 files
- **Baseline Correction** — ALS, SNIP, polynomial, rubberband
- **Normalization** — SNV, min-max, area, vector (L2)
- **Smoothing** — Savitzky-Golay, Whittaker
- **Derivatives** — Savitzky-Golay, gap-segment (Norris-Williams)
- **Scatter Correction** — MSC, Extended MSC
- **Spectral Transforms** — Kubelka-Munk, ATR correction
- **Spectral Operations** — Subtract, average, interpolate
- **Peak Analysis** — Peak finding, integration
- **Similarity Metrics** — Cosine, Pearson, spectral angle, Euclidean
- **Pipeline** — Chain processing steps as pure functions
- **Plotting** — Spectrum, comparison, and baseline visualizations
- **scikit-learn Bridge** — Use any function in `sklearn.pipeline.Pipeline`
- **Optional Backends** — pybaselines (200+ methods), lmfit (peak fitting)

## Quick Example

```python
import numpy as np
from spectrakit import (
    baseline_als,
    normalize_snv,
    smooth_savgol,
)
from spectrakit.pipeline import Pipeline

# Load or create spectral data
spectra = np.random.default_rng(42).random((10, 1000))

# Process with individual functions
smoothed = smooth_savgol(spectra, window_length=11)
corrected = baseline_als(smoothed, lam=1e6)
normalized = normalize_snv(corrected)

# Or use a Pipeline
pipe = Pipeline()
pipe.add(smooth_savgol, window_length=11)
pipe.add(baseline_als, lam=1e6)
pipe.add(normalize_snv)
result = pipe.transform(spectra)
```

## Installation

```bash
pip install spectrakit
```

See the [installation guide](getting-started/installation.md) for optional dependencies.
