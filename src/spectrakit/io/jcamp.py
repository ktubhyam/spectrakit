"""JCAMP-DX file format reader and writer (.dx, .jdx, .jcamp)."""

from __future__ import annotations

import logging
import re
from pathlib import Path

import numpy as np

from spectrakit._validate import validate_file_size
from spectrakit.exceptions import FileFormatError
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

    validate_file_size(path.stat().st_size, path_name=str(path))

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
        raise FileFormatError(f"No XYDATA found in {path}")

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


_VALUES_PER_LINE = 10


def write_jcamp(
    spectrum: Spectrum,
    path: str | Path,
    title: str = "",
    data_type: str = "INFRARED SPECTRUM",
    x_units: str = "1/CM",
    y_units: str = "ABSORBANCE",
) -> None:
    """Write a single-spectrum Spectrum to a JCAMP-DX file.

    Produces a standard JCAMP-DX 5.0 file with ``##XYDATA=(X++(Y..Y))``
    format (AFFN encoding). Only 1-D spectra are supported; for batch
    data, iterate and write each spectrum individually.

    Args:
        spectrum: Spectrum to save (must be 1-D).
        path: Output file path (.dx or .jdx).
        title: Title label for ``##TITLE=``.
        data_type: Value for ``##DATA TYPE=``.
        x_units: Value for ``##XUNITS=``.
        y_units: Value for ``##YUNITS=``.

    Raises:
        ValueError: If *spectrum* intensities are not 1-D or
            wavenumbers are missing.
    """
    if spectrum.intensities.ndim != 1:
        raise ValueError(
            f"write_jcamp requires 1-D intensities, got shape {spectrum.intensities.shape}"
        )
    if spectrum.wavenumbers is None:
        raise ValueError("write_jcamp requires wavenumbers to be set on the Spectrum")

    path = Path(path)
    wn = spectrum.wavenumbers
    y = spectrum.intensities
    n = len(y)

    title = title or spectrum.label or "Spectrum"

    lines: list[str] = [
        f"##TITLE={title}",
        "##JCAMP-DX=5.00",
        f"##DATA TYPE={data_type}",
        f"##XUNITS={x_units}",
        f"##YUNITS={y_units}",
        f"##FIRSTX={wn[0]:.6f}",
        f"##LASTX={wn[-1]:.6f}",
        f"##NPOINTS={n}",
        "##XYDATA=(X++(Y..Y))",
    ]

    # Write data in blocks of _VALUES_PER_LINE Y values per X line
    for i in range(0, n, _VALUES_PER_LINE):
        block = y[i : i + _VALUES_PER_LINE]
        x_val = wn[i]
        y_strs = " ".join(f"{v:.6f}" for v in block)
        lines.append(f"{x_val:.6f} {y_strs}")

    lines.append("##END=")
    lines.append("")  # trailing newline

    path.write_text("\n".join(lines), encoding="utf-8")

    logger.debug("Wrote JCAMP-DX: %d points to %s", n, path)
