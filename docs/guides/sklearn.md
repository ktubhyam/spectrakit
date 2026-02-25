# scikit-learn Integration

SpectraKit provides `SpectralTransformer`, a scikit-learn compatible wrapper
that lets you use any SpectraKit function inside an `sklearn.pipeline.Pipeline`.

## Installation

```bash
pip install spectrakit[sklearn]
```

## Basic Usage

```python
from spectrakit.sklearn import SpectralTransformer
from spectrakit import smooth_savgol, normalize_snv

# Wrap a SpectraKit function
smoother = SpectralTransformer(smooth_savgol, window_length=11)

# Use the standard sklearn interface
X_smooth = smoother.fit_transform(X_raw)
```

## Building an sklearn Pipeline

Combine multiple SpectraKit steps with sklearn estimators:

```python
from sklearn.pipeline import Pipeline as SkPipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.svm import SVC

from spectrakit.sklearn import SpectralTransformer
from spectrakit import smooth_savgol, baseline_als, normalize_snv

pipe = SkPipeline([
    # Spectral preprocessing
    ("smooth", SpectralTransformer(smooth_savgol, window_length=11)),
    ("baseline", SpectralTransformer(baseline_als, lam=1e6)),
    ("normalize", SpectralTransformer(normalize_snv)),
    # ML modeling
    ("scaler", StandardScaler()),
    ("pca", PCA(n_components=10)),
    ("svm", SVC()),
])

# Fit and predict
pipe.fit(X_train, y_train)
predictions = pipe.predict(X_test)
```

## Cross-Validation

Since `SpectralTransformer` follows the sklearn API, it works with all sklearn
utilities:

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(pipe, X, y, cv=5)
print(f"Accuracy: {scores.mean():.3f} +/- {scores.std():.3f}")
```

## Grid Search

Tune SpectraKit parameters alongside ML hyperparameters:

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "smooth__window_length": [7, 11, 15],
    "baseline__lam": [1e5, 1e6, 1e7],
    "pca__n_components": [5, 10, 20],
    "svm__C": [0.1, 1, 10],
}

grid = GridSearchCV(pipe, param_grid, cv=5, scoring="accuracy")
grid.fit(X_train, y_train)
print(f"Best params: {grid.best_params_}")
```

!!! note
    GridSearchCV accesses parameters via `get_params()` / `set_params()`.
    The `SpectralTransformer` exposes both the wrapped function and its
    keyword arguments as parameters.

## How SpectralTransformer Works

`SpectralTransformer` wraps any function with signature
`func(intensities, **kwargs) -> np.ndarray`:

- **`fit(X, y=None)`** — No-op (returns self). All SpectraKit functions are stateless.
- **`transform(X)`** — Calls `func(X, **kwargs)`.
- **`get_params()`** — Returns `{"func": ..., **kwargs}`.
- **`set_params(**params)`** — Updates function or kwargs.

## Parameter Access

```python
transformer = SpectralTransformer(smooth_savgol, window_length=11)

# Inspect parameters
print(transformer.get_params())
# {'func': <function smooth_savgol>, 'window_length': 11}

# Update parameters
transformer.set_params(window_length=15)
```

## Repr

```python
>>> SpectralTransformer(smooth_savgol, window_length=11)
SpectralTransformer(smooth_savgol, window_length=11)
```

## Next Steps

- [Pipeline Guide](pipeline.md) — SpectraKit's native pipeline
- [Processing Workflow](workflow.md) — recommended step order
- [SpectralTransformer API](../api/sklearn.md) — full documentation
