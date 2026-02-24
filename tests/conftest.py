"""Shared pytest fixtures for SpectraKit tests."""
from __future__ import annotations

import numpy as np
import pytest


@pytest.fixture
def synthetic_spectrum() -> np.ndarray:
    """A synthetic Gaussian peak spectrum, shape (1000,)."""
    x = np.linspace(0, 10, 1000)
    rng = np.random.default_rng(42)
    peak = np.exp(-0.5 * ((x - 5) / 0.3) ** 2)
    noise = rng.normal(0, 0.01, size=1000)
    return peak + noise


@pytest.fixture
def synthetic_spectrum_with_baseline() -> tuple[np.ndarray, np.ndarray]:
    """Spectrum with known polynomial baseline, shape (1000,).

    Returns:
        Tuple of (spectrum_with_baseline, true_baseline).
    """
    x = np.linspace(0, 10, 1000)
    rng = np.random.default_rng(42)

    peak = np.exp(-0.5 * ((x - 5) / 0.3) ** 2)
    baseline = 0.1 * x + 0.005 * x ** 2
    noise = rng.normal(0, 0.005, size=1000)

    return peak + baseline + noise, baseline


@pytest.fixture
def synthetic_batch() -> np.ndarray:
    """Batch of 5 synthetic spectra, shape (5, 500)."""
    rng = np.random.default_rng(42)
    x = np.linspace(0, 10, 500)

    spectra = []
    for i in range(5):
        center = 3 + i * 1.2
        peak = np.exp(-0.5 * ((x - center) / 0.4) ** 2) * (1 + 0.2 * i)
        noise = rng.normal(0, 0.01, size=500)
        spectra.append(peak + noise)

    return np.array(spectra)


@pytest.fixture
def wavenumbers_1000() -> np.ndarray:
    """Wavenumber axis for 1000-point spectra, shape (1000,)."""
    return np.linspace(400, 4000, 1000)
