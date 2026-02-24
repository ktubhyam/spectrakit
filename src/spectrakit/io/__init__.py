"""Spectral file format parsers."""
from spectrakit.io.csv import read_csv
from spectrakit.io.hdf5 import read_hdf5, write_hdf5
from spectrakit.io.jcamp import read_jcamp
from spectrakit.io.opus import read_opus
from spectrakit.io.spc import read_spc

__all__ = ["read_jcamp", "read_spc", "read_csv", "read_opus", "read_hdf5", "write_hdf5"]
