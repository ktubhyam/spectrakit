"""Tests for scatter correction methods."""

from __future__ import annotations

import numpy as np
import pytest

from spectrakit.exceptions import SpectrumShapeError
from spectrakit.scatter import scatter_emsc, scatter_msc


class TestScatterMSC:
    """Verify Multiplicative Scatter Correction."""

    def test_batch_output_shape(self) -> None:
        rng = np.random.default_rng(42)
        y = rng.random((10, 100))
        result = scatter_msc(y)
        assert result.shape == y.shape

    def test_corrects_multiplicative_effect(self) -> None:
        """Spectra differing only by a scaling factor should become similar."""
        rng = np.random.default_rng(42)
        base = rng.random(100)
        # Create batch with multiplicative scatter
        scales = np.array([0.5, 1.0, 1.5, 2.0])
        batch = np.array([s * base + rng.normal(0, 0.01, 100) for s in scales])

        corrected = scatter_msc(batch)

        # After MSC, all spectra should be very similar
        stds = np.std(corrected, axis=0)
        assert np.mean(stds) < 0.1

    def test_single_with_reference(self) -> None:
        rng = np.random.default_rng(42)
        reference = rng.random(100)
        spectrum = 2.0 * reference + 0.5

        result = scatter_msc(spectrum, reference=reference)
        assert result.shape == (100,)
        # Should be close to the reference after correction
        np.testing.assert_allclose(result, reference, atol=0.1)

    def test_single_without_reference_raises(self) -> None:
        with pytest.raises(ValueError, match="reference is required"):
            scatter_msc(np.ones(100))

    def test_custom_reference(self) -> None:
        rng = np.random.default_rng(42)
        batch = rng.random((5, 100))
        ref = rng.random(100)
        result = scatter_msc(batch, reference=ref)
        assert result.shape == (5, 100)

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            scatter_msc(np.ones((2, 3, 4)))


class TestScatterEMSC:
    """Verify Extended Multiplicative Signal Correction."""

    def test_batch_output_shape(self) -> None:
        rng = np.random.default_rng(42)
        y = rng.random((10, 100))
        result = scatter_emsc(y)
        assert result.shape == y.shape

    def test_corrects_scatter_with_baseline(self) -> None:
        """EMSC should handle both multiplicative scatter and baseline shift."""
        rng = np.random.default_rng(42)
        base = rng.random(100)
        x = np.linspace(0, 1, 100)

        # Create spectra with scatter + polynomial baseline
        batch = np.array(
            [
                s * base + a * x + b
                for s, a, b in [
                    (0.8, 0.1, 0.2),
                    (1.0, 0.0, 0.0),
                    (1.2, -0.1, 0.3),
                    (1.5, 0.2, -0.1),
                ]
            ]
        )

        corrected = scatter_emsc(batch, poly_order=1)

        # After EMSC, spectra should be more similar
        std_before = np.mean(np.std(batch, axis=0))
        std_after = np.mean(np.std(corrected, axis=0))
        assert std_after < std_before

    def test_single_with_reference(self) -> None:
        rng = np.random.default_rng(42)
        reference = rng.random(100)
        spectrum = 2.0 * reference + 0.5

        result = scatter_emsc(spectrum, reference=reference, poly_order=0)
        assert result.shape == (100,)

    def test_single_without_reference_raises(self) -> None:
        with pytest.raises(ValueError, match="reference is required"):
            scatter_emsc(np.ones(100))

    def test_poly_order_zero_like_msc(self) -> None:
        """With poly_order=0, EMSC should behave similarly to MSC."""
        rng = np.random.default_rng(42)
        base = rng.random(100)
        batch = np.array([s * base for s in [0.5, 1.0, 1.5]])

        msc_result = scatter_msc(batch)
        emsc_result = scatter_emsc(batch, poly_order=0)

        # Results should be similar (not identical due to different implementations)
        np.testing.assert_allclose(emsc_result, msc_result, atol=0.5)

    def test_3d_raises(self) -> None:
        with pytest.raises(SpectrumShapeError):
            scatter_emsc(np.ones((2, 3, 4)))

    def test_batch_with_explicit_reference(self) -> None:
        """Batch EMSC with an explicit reference spectrum."""
        rng = np.random.default_rng(42)
        batch = rng.random((5, 80))
        ref = rng.random(80)
        result = scatter_emsc(batch, reference=ref, poly_order=1)
        assert result.shape == (5, 80)
