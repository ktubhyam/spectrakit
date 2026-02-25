"""Golden reference tests — detect algorithm regressions.

Each test loads a known-good output file and compares the current
algorithm output against it.  Any change to the algorithm that
alters its output (even subtly) will cause these tests to fail,
making regressions immediately visible.

Golden files were generated with SpectraKit v1.6.0 using seed 12345.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
import pytest

from spectrakit import (
    baseline_als,
    baseline_rubberband,
    baseline_snip,
    normalize_snv,
    scatter_msc,
    smooth_whittaker,
)

FIXTURES = Path(__file__).parent / "fixtures"


@pytest.fixture
def golden_input() -> np.ndarray:
    return np.load(FIXTURES / "golden_input.npy")


class TestGoldenReferences:
    """Verify algorithm outputs match stored golden references."""

    def test_als_golden(self, golden_input: np.ndarray) -> None:
        expected = np.load(FIXTURES / "golden_als.npy")
        result = baseline_als(golden_input, lam=1e6)
        np.testing.assert_allclose(result, expected, atol=1e-10)

    def test_snip_golden(self, golden_input: np.ndarray) -> None:
        expected = np.load(FIXTURES / "golden_snip.npy")
        result = baseline_snip(golden_input, max_half_window=30)
        np.testing.assert_allclose(result, expected, atol=1e-10)

    def test_rubberband_golden(self, golden_input: np.ndarray) -> None:
        expected = np.load(FIXTURES / "golden_rubberband.npy")
        result = baseline_rubberband(golden_input)
        np.testing.assert_allclose(result, expected, atol=1e-10)

    def test_whittaker_golden(self, golden_input: np.ndarray) -> None:
        expected = np.load(FIXTURES / "golden_whittaker.npy")
        result = smooth_whittaker(golden_input, lam=1e4)
        np.testing.assert_allclose(result, expected, atol=1e-10)

    def test_snv_golden(self, golden_input: np.ndarray) -> None:
        expected = np.load(FIXTURES / "golden_snv.npy")
        result = normalize_snv(golden_input)
        np.testing.assert_allclose(result, expected, atol=1e-10)

    def test_msc_golden(self) -> None:
        batch = np.load(FIXTURES / "golden_msc_input.npy")
        expected = np.load(FIXTURES / "golden_msc.npy")
        result = scatter_msc(batch)
        np.testing.assert_allclose(result, expected, atol=1e-10)
