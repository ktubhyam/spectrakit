# Pipeline Guide

The `Pipeline` class chains spectral processing steps into a reusable, reproducible
workflow. Steps are executed in order, and each step's output feeds into the next.

## Basic Usage

```python
from spectrakit import baseline_als, normalize_snv, smooth_savgol
from spectrakit.pipeline import Pipeline

pipe = Pipeline()
pipe.add("smooth", smooth_savgol, window_length=11, polyorder=3)
pipe.add("baseline", baseline_als, lam=1e6, p=0.01)
pipe.add("normalize", normalize_snv)

# Apply to data
processed = pipe.transform(raw_spectra)
```

Each `add()` call takes:

1. **name** — A descriptive label for logging and display
2. **fn** — Any function with signature `fn(intensities, **kwargs) -> np.ndarray`
3. **\*\*kwargs** — Arguments forwarded to the function

## Method Chaining

`add()` returns `self`, so you can chain calls:

```python
pipe = Pipeline()
pipe.add("smooth", smooth_savgol, window_length=11).add(
    "baseline", baseline_als, lam=1e6
).add("normalize", normalize_snv)
```

## Working with Spectrum Objects

Use `transform_spectrum()` to process a `Spectrum` container directly.
It returns a new `Spectrum` with processed intensities and updated metadata:

```python
from spectrakit.spectrum import Spectrum
from spectrakit.io import read_jcamp

spectrum = read_jcamp("sample.jdx")
processed = pipe.transform_spectrum(spectrum)

# Metadata records which pipeline steps were applied
print(processed.metadata["pipeline_steps"])
# ['smooth', 'baseline', 'normalize']
```

## Custom Functions

Any callable matching the expected signature works as a pipeline step:

```python
import numpy as np

def clip_negative(intensities: np.ndarray) -> np.ndarray:
    """Replace negative values with zero."""
    return np.clip(intensities, 0, None)

pipe = Pipeline()
pipe.add("clip", clip_negative)
pipe.add("normalize", normalize_snv)
```

## Logging

Pipeline logs each step at the `DEBUG` level. Enable logging to see step execution:

```python
import logging
logging.basicConfig(level=logging.DEBUG)

pipe.transform(spectra)
# DEBUG:spectrakit.pipeline:Pipeline step: smooth
# DEBUG:spectrakit.pipeline:Pipeline step: baseline
# DEBUG:spectrakit.pipeline:Pipeline step: normalize
```

## Inspecting the Pipeline

```python
print(pipe)
# Pipeline(steps=['smooth', 'baseline', 'normalize'])

# Access individual steps
for name, fn, kwargs in pipe.steps:
    print(f"{name}: {fn.__name__}({kwargs})")
```

## Comparison with scikit-learn Pipeline

SpectraKit's `Pipeline` is lightweight and designed for spectral workflows.
For ML integration, use the [sklearn bridge](sklearn.md) instead:

| Feature | `spectrakit.Pipeline` | `sklearn.Pipeline` |
|---------|----------------------|-------------------|
| Dependencies | None (built-in) | Requires scikit-learn |
| Interface | `add()` / `transform()` | `fit()` / `transform()` |
| Use case | Spectral preprocessing | ML model pipelines |
| Stateful | No (pure functions) | Yes (fit stores state) |

Both can be used together — preprocess with SpectraKit's Pipeline, then
feed results into an sklearn Pipeline for modeling.

## Next Steps

- [Processing Workflow](workflow.md) — recommended step order
- [scikit-learn Integration](sklearn.md) — ML pipeline bridge
- [Pipeline API Reference](../api/pipeline.md) — full documentation
