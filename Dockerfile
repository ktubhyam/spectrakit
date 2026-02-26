FROM python:3.12-slim

LABEL org.opencontainers.image.source="https://github.com/ktubhyam/spectrakit"
LABEL org.opencontainers.image.description="Python toolkit for spectral data processing"
LABEL org.opencontainers.image.licenses="MIT"

RUN pip install --no-cache-dir pyspectrakit[all]

ENTRYPOINT ["python"]
