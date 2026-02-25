"""Tests for the Pipeline class."""

from __future__ import annotations

import numpy as np

from spectrakit.baseline import baseline_als
from spectrakit.normalize import normalize_snv
from spectrakit.pipeline import Pipeline
from spectrakit.spectrum import Spectrum


class TestPipeline:
    def test_empty_pipeline(self, synthetic_spectrum: np.ndarray) -> None:
        pipe = Pipeline()
        result = pipe.transform(synthetic_spectrum)
        assert np.allclose(result, synthetic_spectrum)

    def test_single_step(self, synthetic_spectrum: np.ndarray) -> None:
        pipe = Pipeline()
        pipe.add("normalize", normalize_snv)
        result = pipe.transform(synthetic_spectrum)
        assert abs(np.mean(result)) < 1e-10

    def test_chained_add(self) -> None:
        pipe = Pipeline().add("normalize", normalize_snv)
        assert len(pipe.steps) == 1

    def test_transform_spectrum(self, synthetic_spectrum: np.ndarray) -> None:
        spec = Spectrum(intensities=synthetic_spectrum, label="test")
        pipe = Pipeline().add("normalize", normalize_snv)
        result = pipe.transform_spectrum(spec)
        assert isinstance(result, Spectrum)
        assert result.label == "test"
        assert "pipeline_steps" in result.metadata

    def test_repr(self) -> None:
        pipe = Pipeline().add("baseline", baseline_als).add("normalize", normalize_snv)
        assert "baseline" in repr(pipe)
        assert "normalize" in repr(pipe)
