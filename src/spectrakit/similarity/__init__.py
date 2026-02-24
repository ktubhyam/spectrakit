"""Spectral similarity metrics."""
from spectrakit.similarity.cosine import similarity_cosine
from spectrakit.similarity.euclidean import similarity_euclidean
from spectrakit.similarity.pearson import similarity_pearson
from spectrakit.similarity.spectral_angle import similarity_spectral_angle

__all__ = [
    "similarity_cosine",
    "similarity_pearson",
    "similarity_spectral_angle",
    "similarity_euclidean",
]
