# Quick Start

This guide walks through a typical spectral preprocessing workflow.

## Loading Data

```python
from spectrakit.io import read_csv, read_jcamp

# From CSV
spectrum = read_csv("data/sample.csv")

# From JCAMP-DX
spectrum = read_jcamp("data/sample.jdx")

# Or work directly with NumPy arrays
import numpy as np
intensities = np.loadtxt("data/raw.txt")
```

## Basic Processing

```python
from spectrakit import smooth_savgol, baseline_als, normalize_snv

# Step 1: Smooth noisy data
smoothed = smooth_savgol(intensities, window_length=11, polyorder=3)

# Step 2: Remove baseline
corrected = baseline_als(smoothed, lam=1e6, p=0.01)

# Step 3: Normalize
normalized = normalize_snv(corrected)
```

All functions accept both 1D `(W,)` and 2D `(N, W)` arrays, where `N` is
the number of spectra and `W` is the number of wavelength points.

## Using the Pipeline

Chain steps together for reproducibility:

```python
from spectrakit.pipeline import Pipeline

pipe = Pipeline()
pipe.add(smooth_savgol, window_length=11)
pipe.add(baseline_als, lam=1e6)
pipe.add(normalize_snv)

# Apply to a batch of spectra
processed = pipe.transform(spectra_batch)
```

## Comparing Spectra

```python
from spectrakit import similarity_cosine, similarity_pearson

score = similarity_cosine(spectrum_a, spectrum_b)
print(f"Cosine similarity: {score:.4f}")
```

## Finding Peaks

```python
from spectrakit import peaks_find, peaks_integrate

wavenumbers = np.linspace(400, 4000, 1000)
result = peaks_find(intensities, wavenumbers, prominence=0.1)
print(f"Found {len(result.indices)} peaks at: {result.wavenumbers}")

# Integrate a peak region
area = peaks_integrate(intensities, wavenumbers, ranges=[(1700, 1750)])
```

## Visualization

```python
from spectrakit.plot import plot_spectrum, plot_comparison

# Plot a single spectrum
plot_spectrum(intensities, wavenumbers, title="My Spectrum")

# Before/after comparison
plot_comparison(original, processed, wavenumbers)
```

## Next Steps

- [Processing Workflow Guide](../guides/workflow.md) — detailed walk-through
- [Pipeline Guide](../guides/pipeline.md) — advanced pipeline usage
- [scikit-learn Integration](../guides/sklearn.md) — using with sklearn
- [API Reference](../api/index.md) — full function documentation
