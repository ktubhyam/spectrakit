"""JCAMP-DX file format parser (.dx, .jdx, .jcamp)."""
from __future__ import annotations

import logging
import re
from pathlib import Path

import numpy as np

from spectrakit.spectrum import Spectrum

logger = logging.getLogger(__name__)

_LDR_PATTERN = re.compile(r"^##([^=]+)=\s*(.*)")
_AFFN_NUMBER = re.compile(r"[+-]?\d+\.?\d*(?:[eE][+-]?\d+)?")


def read_jcamp(path: str | Path) -> Spectrum:
    """Read a JCAMP-DX file and return a Spectrum.

    Parses ##XYDATA=(X++(Y..Y)) format. Supports AFFN (ASCII free-format
    numeric) encoding.

    Args:
        path: Path to the .dx / .jdx / .jcamp file.

    Returns:
        Spectrum with intensities shape (W,) and wavenumbers shape (W,).

    Raises:
        FileNotFoundError: If path does not exist.
        ValueError: If the file cannot be parsed.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"JCAMP file not found: {path}")

    metadata: dict[str, str] = {}
    x_values: list[float] = []
    y_values: list[float] = []
    in_xydata = False

    with open(path, encoding="utf-8", errors="replace") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue

            ldr_match = _LDR_PATTERN.match(line)
            if ldr_match:
                key = ldr_match.group(1).strip().upper()
                value = ldr_match.group(2).strip()

                if key == "XYDATA":
                    in_xydata = True
                    continue
                elif key == "END":
                    in_xydata = False
                    continue
                else:
                    metadata[key] = value
                    in_xydata = False
                    continue

            if in_xydata:
                numbers = _AFFN_NUMBER.findall(line)
                if len(numbers) >= 2:
                    x_values.append(float(numbers[0]))
                    for y_str in numbers[1:]:
                        y_values.append(float(y_str))

    if not y_values:
        raise ValueError(f"No XYDATA found in {path}")

    first_x = float(metadata.get("FIRSTX", str(x_values[0])))
    last_x = float(metadata.get("LASTX", str(x_values[-1])))
    n_points = len(y_values)

    wavenumbers = np.linspace(first_x, last_x, n_points)
    intensities = np.array(y_values, dtype=np.float64)

    logger.debug("Read JCAMP: %d points from %s", n_points, path.name)

    return Spectrum(
        intensities=intensities,
        wavenumbers=wavenumbers,
        metadata=metadata,
        source_format="jcamp",
        label=path.stem,
    )
