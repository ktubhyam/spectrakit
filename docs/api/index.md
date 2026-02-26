# API Reference

SpectraKit's API is organized into subpackages by function category. All core
processing functions are also re-exported from the top-level `spectrakit` namespace.

## Core Containers

| Module | Description |
|--------|-------------|
| [Spectrum](spectrum.md) | Spectral data container |
| [Pipeline](pipeline.md) | Processing pipeline |
| [ConvergenceInfo](convergence.md) | Convergence diagnostics for iterative algorithms |
| [Exceptions](exceptions.md) | Custom exception types |

## Processing Functions

| Module | Functions | Description |
|--------|-----------|-------------|
| [Baseline](baseline.md) | `baseline_als`, `baseline_arpls`, `baseline_snip`, `baseline_polynomial`, `baseline_rubberband` | Baseline correction |
| [Normalize](normalize.md) | `normalize_snv`, `normalize_minmax`, `normalize_area`, `normalize_vector` | Normalization |
| [Smooth](smooth.md) | `smooth_savgol`, `smooth_whittaker` | Smoothing / noise reduction |
| [Derivative](derivative.md) | `derivative_savgol`, `derivative_gap_segment` | Spectral derivatives |
| [Scatter](scatter.md) | `scatter_msc`, `scatter_emsc` | Scatter correction |
| [Transform](transform.md) | `transform_kubelka_munk`, `transform_atr_correction`, `transform_absorbance_to_transmittance`, `transform_transmittance_to_absorbance` | Spectral transforms |
| [Despike](despike.md) | `despike_whitaker_hayes`, `despike_zscore` | Spike removal |
| [Quality](quality.md) | `quality_snr`, `quality_roughness` | Signal quality metrics |
| [Operations](ops.md) | `spectral_subtract`, `spectral_average`, `spectral_interpolate`, `spectral_crop`, `spectral_correlate`, `spectral_align` | Spectral arithmetic |
| [Peaks](peaks.md) | `peaks_find`, `peaks_integrate` | Peak analysis |
| [Similarity](similarity.md) | `similarity_cosine`, `similarity_pearson`, `similarity_spectral_angle`, `similarity_euclidean` | Similarity metrics |

## I/O and Visualization

| Module | Description |
|--------|-------------|
| [IO](io.md) | File format parsers and writers (`read_spectrum`, `detect_format`, format-specific readers/writers) |
| [Plot](plot.md) | Plotting utilities (requires matplotlib) |
| [Widgets](widgets.md) | Interactive Jupyter viewer (requires anywidget) |

## Optional Integrations

| Module | Description |
|--------|-------------|
| [Contrib](contrib.md) | pybaselines and lmfit backends |
| [sklearn](sklearn.md) | scikit-learn transformer bridge |
