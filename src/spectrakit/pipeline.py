"""Pipeline for chaining spectral processing operations."""
from __future__ import annotations

import logging
from collections.abc import Callable
from typing import Any

import numpy as np

from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)


class Pipeline:
    """Chain spectral processing steps into a reusable pipeline.

    Each step is a callable that takes a numpy array (W,) or (N, W)
    and returns the same shape. Steps are executed in order.

    Examples:
        >>> from spectrakit import Pipeline, baseline_als, normalize_snv
        >>> pipe = Pipeline()
        >>> pipe.add("baseline", baseline_als, lam=1e6)
        >>> pipe.add("normalize", normalize_snv)
        >>> corrected = pipe.transform(raw_intensities)
    """

    def __init__(
        self,
        steps: list[tuple[str, Callable[..., np.ndarray], dict[str, Any]]] | None = None,
    ) -> None:
        """Initialize pipeline with optional named steps.

        Args:
            steps: List of (name, callable, kwargs) tuples.
        """
        self.steps: list[tuple[str, Callable[..., np.ndarray], dict[str, Any]]] = steps or []

    def add(
        self,
        name: str,
        fn: Callable[..., np.ndarray],
        **kwargs: Any,
    ) -> Pipeline:
        """Add a processing step to the pipeline.

        Args:
            name: Human-readable step name for logging.
            fn: Processing function (e.g., baseline_als, normalize_snv).
            **kwargs: Keyword arguments passed to fn.

        Returns:
            Self, for method chaining.
        """
        self.steps.append((name, fn, kwargs))
        return self

    def transform(self, intensities: np.ndarray) -> np.ndarray:
        """Apply all pipeline steps to the input.

        Args:
            intensities: Input spectral data, shape (W,) or (N, W).

        Returns:
            Processed spectral data, same shape.
        """
        result = intensities.copy()
        for name, fn, kwargs in self.steps:
            logger.debug("Pipeline step: %s", name)
            result = fn(result, **kwargs)
        return result

    def transform_spectrum(self, spectrum: Spectrum) -> Spectrum:
        """Apply pipeline to a Spectrum, returning a new Spectrum.

        Args:
            spectrum: Input Spectrum.

        Returns:
            New Spectrum with processed intensities.
        """
        new_intensities = self.transform(spectrum.intensities)
        return Spectrum(
            intensities=new_intensities,
            wavenumbers=spectrum.wavenumbers.copy() if spectrum.wavenumbers is not None else None,
            metadata={**spectrum.metadata, "pipeline_steps": [s[0] for s in self.steps]},
            source_format=spectrum.source_format,
            label=spectrum.label,
        )

    def __repr__(self) -> str:
        step_names = [name for name, _, _ in self.steps]
        return f"Pipeline(steps={step_names})"
