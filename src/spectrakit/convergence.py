"""Convergence metadata for iterative algorithms."""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np


@dataclass(frozen=True)
class ConvergenceInfo:
    """Convergence diagnostics for iterative baseline algorithms.

    Returned by ``baseline_als``, ``baseline_arpls``, and
    ``baseline_polynomial`` when called with ``return_info=True``.

    Attributes:
        iterations: Number of iterations actually performed.
        converged: Whether the algorithm converged before hitting
            ``max_iter``.
        final_residual: Sum of absolute weight changes (ALS/ArPLS) or
            fraction of points changed (polynomial) at the last iteration.
        baseline: The estimated baseline array, same shape as input.
    """

    iterations: int
    converged: bool
    final_residual: float
    baseline: np.ndarray

    def __repr__(self) -> str:
        status = "converged" if self.converged else "not converged"
        return (
            f"ConvergenceInfo({status} in {self.iterations} iterations, "
            f"residual={self.final_residual:.2e}, "
            f"baseline shape={self.baseline.shape})"
        )
