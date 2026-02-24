"""SpectraKit command-line interface."""
from __future__ import annotations

import sys
from pathlib import Path


def _get_app():  # type: ignore[no-untyped-def]
    """Lazy-import typer to avoid hard dependency."""
    try:
        import typer
    except ImportError:
        print(
            "CLI requires typer. Install with: pip install spectrakit[cli]",
            file=sys.stderr,
        )
        sys.exit(1)
    return typer.Typer(
        name="spectrakit",
        help="SpectraKit: spectral data processing toolkit.",
        add_completion=False,
    )


app = _get_app()


@app.command()
def info(path: str) -> None:
    """Print metadata and summary statistics for a spectral file."""
    file_path = Path(path)
    suffix = file_path.suffix.lower()

    if suffix in (".dx", ".jdx", ".jcamp"):
        from spectrakit.io.jcamp import read_jcamp
        spec = read_jcamp(file_path)
    elif suffix == ".spc":
        from spectrakit.io.spc import read_spc
        spec = read_spc(file_path)
    elif suffix in (".csv", ".tsv", ".txt"):
        from spectrakit.io.csv import read_csv
        delimiter = "\t" if suffix == ".tsv" else ","
        spec = read_csv(file_path, delimiter=delimiter)
    elif suffix in (".h5", ".hdf5"):
        from spectrakit.io.hdf5 import read_hdf5
        spec = read_hdf5(file_path)
    else:
        print(f"Unknown format: {suffix}", file=sys.stderr)
        sys.exit(1)

    print(f"File:       {file_path.name}")
    print(f"Format:     {spec.source_format}")
    print(f"Shape:      {spec.shape}")
    print(f"N spectra:  {spec.n_spectra}")
    print(f"N points:   {spec.n_points}")
    if spec.wavenumbers is not None:
        print(f"X range:    {spec.wavenumbers.min():.2f} - {spec.wavenumbers.max():.2f}")
    print(f"Y range:    {spec.intensities.min():.6f} - {spec.intensities.max():.6f}")
    print(f"Y mean:     {spec.intensities.mean():.6f}")
    print(f"Y std:      {spec.intensities.std():.6f}")
    if spec.metadata:
        print("Metadata:")
        for key, value in list(spec.metadata.items())[:10]:
            print(f"  {key}: {value}")


@app.command()
def convert(input_path: str, output_path: str) -> None:
    """Convert a spectral file to HDF5 format."""
    file_path = Path(input_path)
    suffix = file_path.suffix.lower()

    if suffix in (".dx", ".jdx", ".jcamp"):
        from spectrakit.io.jcamp import read_jcamp
        spec = read_jcamp(file_path)
    elif suffix in (".csv", ".tsv", ".txt"):
        from spectrakit.io.csv import read_csv
        spec = read_csv(file_path)
    else:
        print(f"Unsupported input format: {suffix}", file=sys.stderr)
        sys.exit(1)

    from spectrakit.io.hdf5 import write_hdf5
    write_hdf5(spec, output_path)
    print(f"Converted {file_path.name} -> {output_path}")


if __name__ == "__main__":
    app()
