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
    baseline = 0.1 * x + 0.005 * x**2
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


@pytest.fixture
def spiked_spectrum() -> np.ndarray:
    """Synthetic spectrum with 3 known spikes, shape (500,)."""
    rng = np.random.default_rng(42)
    x = np.linspace(0, 10, 500)
    clean = np.exp(-0.5 * ((x - 5) / 0.8) ** 2)
    noise = rng.normal(0, 0.005, size=500)
    spiked = clean + noise
    # Insert 3 large spikes at known positions
    spiked[100] += 5.0
    spiked[250] += 8.0
    spiked[400] += 6.0
    return spiked


@pytest.fixture
def clean_reference_500() -> np.ndarray:
    """Clean reference spectrum, shape (500,)."""
    x = np.linspace(0, 10, 500)
    return np.exp(-0.5 * ((x - 5) / 0.8) ** 2)


@pytest.fixture
def shifted_spectrum() -> tuple[np.ndarray, int]:
    """Spectrum shifted by a known amount from clean_reference_500.

    Returns:
        Tuple of (shifted_spectrum, true_shift).
    """
    x = np.linspace(0, 10, 500)
    clean = np.exp(-0.5 * ((x - 5) / 0.8) ** 2)
    shift = 15
    shifted = np.roll(clean, shift)
    shifted[:shift] = clean[0]
    return shifted, shift
