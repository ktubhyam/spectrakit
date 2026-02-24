"""Spectrum container: the core data type for SpectraKit."""
from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any

import numpy as np

logger = logging.getLogger(__name__)


@dataclass
class Spectrum:
    """Format-agnostic spectral data container.

    Wraps intensity values and optional wavenumber/wavelength axis with
    metadata. All processing functions accept and return numpy arrays,
    but this container provides a convenient way to keep data and
    metadata together.

    Attributes:
        intensities: Spectral intensity values, shape (W,) for a single
            spectrum or (N, W) for a collection.
        wavenumbers: X-axis values (cm^-1, nm, etc.), shape (W,).
            None if not available.
        metadata: Arbitrary key-value metadata from the source file.
        source_format: Original file format (e.g., "jcamp", "spc", "csv").
        label: Human-readable label for display/logging.

    Examples:
        >>> spec = Spectrum(
        ...     intensities=np.array([0.1, 0.5, 0.9, 0.5, 0.1]),
        ...     wavenumbers=np.array([400, 800, 1200, 1600, 2000]),
        ...     label="ethanol_ir",
        ... )
        >>> spec.n_points
        5
    """

    intensities: np.ndarray
    wavenumbers: np.ndarray | None = None
    metadata: dict[str, Any] = field(default_factory=dict)
    source_format: str = "unknown"
    label: str = ""

    def __post_init__(self) -> None:
        """Validate array shapes on construction."""
        if not isinstance(self.intensities, np.ndarray):
            self.intensities = np.asarray(self.intensities, dtype=np.float64)
        if self.wavenumbers is not None:
            if not isinstance(self.wavenumbers, np.ndarray):
                self.wavenumbers = np.asarray(self.wavenumbers, dtype=np.float64)
            if self.intensities.ndim == 1:
                if self.wavenumbers.shape[0] != self.intensities.shape[0]:
                    raise ValueError(
                        f"wavenumbers length {self.wavenumbers.shape[0]} != "
                        f"intensities length {self.intensities.shape[0]}"
                    )
            elif self.intensities.ndim == 2:
                if self.wavenumbers.shape[0] != self.intensities.shape[1]:
                    raise ValueError(
                        f"wavenumbers length {self.wavenumbers.shape[0]} != "
                        f"intensities width {self.intensities.shape[1]}"
                    )

    @property
    def n_points(self) -> int:
        """Number of spectral data points (W)."""
        if self.intensities.ndim == 1:
            return self.intensities.shape[0]
        return self.intensities.shape[1]

    @property
    def n_spectra(self) -> int:
        """Number of spectra (N). Returns 1 for single spectrum."""
        if self.intensities.ndim == 1:
            return 1
        return self.intensities.shape[0]

    @property
    def shape(self) -> tuple[int, ...]:
        """Shape of the intensities array."""
        return self.intensities.shape

    def copy(self) -> Spectrum:
        """Return a deep copy."""
        return Spectrum(
            intensities=self.intensities.copy(),
            wavenumbers=self.wavenumbers.copy() if self.wavenumbers is not None else None,
            metadata=dict(self.metadata),
            source_format=self.source_format,
            label=self.label,
        )
