"""Tests for the CLI module."""

from __future__ import annotations

import subprocess
import sys


class TestCLIDependency:
    def test_cli_import_without_typer(self) -> None:
        """CLI module should fail gracefully when typer is not installed."""
        # Run in subprocess to isolate the import
        result = subprocess.run(
            [
                sys.executable,
                "-c",
                (
                    "import sys; "
                    "sys.modules['typer'] = None; "  # Block typer import
                    "from spectrakit.cli import _get_app; "
                    "_get_app()"
                ),
            ],
            capture_output=True,
            text=True,
        )
        # _get_app() calls sys.exit(1) when typer is unavailable
        assert result.returncode == 1
        assert "typer" in result.stderr.lower()

    def test_cli_main_entry(self) -> None:
        """Running cli.py as __main__ should not crash (just exit on missing typer or show help)."""
        result = subprocess.run(
            [sys.executable, "-m", "spectrakit.cli", "--help"],
            capture_output=True,
            text=True,
            timeout=10,
        )
        # Either typer is installed (exit 0 with help) or not (exit 1 with message)
        assert result.returncode in (0, 1)
