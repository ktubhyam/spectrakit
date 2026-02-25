# Spectral Processing Workflow

This guide walks through a complete spectral preprocessing workflow, from raw
data to analysis-ready spectra. The order of operations matters — this guide
presents the standard sequence used in chemometrics.

## Typical Processing Order

```
Raw Spectra
  │
  ├─ 1. Smoothing (noise reduction)
  ├─ 2. Scatter Correction (MSC/EMSC)
  ├─ 3. Baseline Correction (ALS, SNIP, etc.)
  ├─ 4. Normalization (SNV, min-max, area)
  ├─ 5. Derivatives (optional, SG or gap-segment)
  └─ 6. Transform (optional, Kubelka-Munk, ATR)
       │
       └─ Analysis-ready spectra
```

!!! tip
    Not every dataset requires all steps. Start simple and add steps as needed.

## Step 1: Smoothing

Smoothing reduces high-frequency noise without distorting spectral features.

```python
from spectrakit import smooth_savgol, smooth_whittaker

# Savitzky-Golay: good general-purpose smoother
smoothed = smooth_savgol(spectra, window_length=11, polyorder=3)

# Whittaker: penalized least-squares, tunable via lambda
smoothed = smooth_whittaker(spectra, lam=1e4)
```

**When to use:**

- `smooth_savgol` — Well-understood, preserves peak shapes. Start here.
- `smooth_whittaker` — Better for heavy noise. Increase `lam` for more smoothing.

**Parameters to tune:**

- `window_length`: Larger = smoother but may broaden peaks. Must be odd.
- `polyorder`: Higher = preserves more features. Usually 2 or 3.
- `lam`: Whittaker smoothing penalty. Range: 1e2 (light) to 1e6 (heavy).

## Step 2: Scatter Correction

Multiplicative scatter effects are common in diffuse reflectance (NIR) spectra.

```python
from spectrakit import scatter_msc, scatter_emsc

# MSC: standard correction
corrected = scatter_msc(spectra)

# EMSC: includes polynomial baseline terms
corrected = scatter_emsc(spectra, poly_order=2)
```

**When to use:**

- `scatter_msc` — Standard for NIR diffuse reflectance. Requires 2D batch.
- `scatter_emsc` — Better when scatter varies with wavelength (adds polynomial terms).

!!! note
    MSC and EMSC require a reference spectrum. For batch data `(N, W)`, the mean
    spectrum is used by default. For single spectra, pass `reference` explicitly.

## Step 3: Baseline Correction

Remove broad baseline contributions from the spectrum.

```python
from spectrakit import baseline_als, baseline_snip, baseline_polynomial

# ALS: asymmetric least squares (most popular)
corrected = baseline_als(spectra, lam=1e6, p=0.01)

# SNIP: peak clipping (good for spectra with many sharp peaks)
corrected = baseline_snip(spectra, num_iterations=40)

# Polynomial: iterative polynomial fit
corrected = baseline_polynomial(spectra, poly_order=3)
```

**When to use:**

- `baseline_als` — Most versatile. High `lam` = smoother baseline. Low `p` = asymmetric.
- `baseline_snip` — Fast, good for Raman and XRF with sharp peaks.
- `baseline_polynomial` — Simple, works well for gentle baselines.
- `baseline_rubberband` — Convex hull approach, no parameters to tune.

## Step 4: Normalization

Scale spectra to a common range or standard for meaningful comparison.

```python
from spectrakit import normalize_snv, normalize_minmax, normalize_area

# SNV: zero mean, unit variance per spectrum
normalized = normalize_snv(spectra)

# Min-max: scale to [0, 1]
normalized = normalize_minmax(spectra)

# Area: unit area under the curve
normalized = normalize_area(spectra)
```

**When to use:**

- `normalize_snv` — Removes multiplicative and additive scatter. Standard for NIR.
- `normalize_minmax` — Good for visualization and when absolute scale matters.
- `normalize_area` — Preserves relative peak intensities.
- `normalize_vector` — L2 normalization, useful before cosine similarity.

## Step 5: Derivatives (Optional)

Derivatives resolve overlapping peaks and remove constant/linear baselines.

```python
from spectrakit import derivative_savgol, derivative_gap_segment

# SG first derivative
d1 = derivative_savgol(spectra, window_length=11, polyorder=3, deriv=1)

# SG second derivative (enhances peak resolution)
d2 = derivative_savgol(spectra, window_length=11, polyorder=3, deriv=2)

# Gap-segment derivative (Norris-Williams)
d1_gap = derivative_gap_segment(spectra, gap=5, segment=5, deriv=1)
```

!!! warning
    Derivatives amplify noise. Always smooth first, or use a large enough
    `window_length` in `derivative_savgol`.

## Step 6: Transforms (Optional)

Apply physics-based spectral transforms.

```python
import numpy as np
from spectrakit import transform_kubelka_munk, transform_atr_correction

# Kubelka-Munk: convert reflectance to absorption-like units
km = transform_kubelka_munk(reflectance_spectra)

# ATR correction: compensate for depth of penetration
wavenumbers = np.linspace(400, 4000, 1000)
corrected = transform_atr_correction(spectra, wavenumbers)
```

## Putting It All Together

```python
from spectrakit import (
    baseline_als,
    normalize_snv,
    smooth_savgol,
)
from spectrakit.pipeline import Pipeline

# Define a reusable processing pipeline
pipe = Pipeline()
pipe.add(smooth_savgol, window_length=11, polyorder=3)
pipe.add(baseline_als, lam=1e6, p=0.01)
pipe.add(normalize_snv)

# Apply to new data
processed = pipe.transform(raw_spectra)
```

## Visualizing Each Step

```python
from spectrakit.plot import plot_comparison

import numpy as np

wavenumbers = np.linspace(400, 4000, 1000)

# Compare raw vs. smoothed
plot_comparison(raw, smoothed, wavenumbers, labels=("Raw", "Smoothed"))

# Compare original vs. baseline-corrected
plot_comparison(smoothed, corrected, wavenumbers, labels=("Smoothed", "Corrected"))
```

## Next Steps

- [Pipeline Guide](pipeline.md) — advanced pipeline features
- [scikit-learn Integration](sklearn.md) — use in ML workflows
- [API Reference](../api/index.md) — full documentation
