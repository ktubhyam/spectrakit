.PHONY: help test lint format typecheck docs docs-serve build clean

help:  ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

test:  ## Run tests with coverage
	python -m pytest --cov=spectrakit --cov-report=term-missing

lint:  ## Run ruff linter
	ruff check src/ tests/ examples/
	ruff format --check src/ tests/ examples/

format:  ## Auto-format code
	ruff check --fix src/ tests/ examples/
	ruff format src/ tests/ examples/

typecheck:  ## Run mypy strict type checking
	python -m mypy src/spectrakit/ --strict

docs:  ## Build documentation site
	cp examples/*.ipynb docs/examples/
	python -m mkdocs build

docs-serve:  ## Serve docs locally with live reload
	cp examples/*.ipynb docs/examples/
	python -m mkdocs serve

build:  ## Build sdist and wheel
	uv build

clean:  ## Remove build artifacts
	rm -rf dist/ build/ site/ docs/examples/*.ipynb
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
