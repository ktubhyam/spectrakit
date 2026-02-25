# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in SpectraKit, please report it
responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please email **takarthikeyan25@gmail.com** with:

1. A description of the vulnerability
2. Steps to reproduce the issue
3. The potential impact
4. Any suggested fixes (optional)

You can expect an initial response within 48 hours. We will work with you to
understand the issue and coordinate a fix before any public disclosure.

## Scope

SpectraKit is a data processing library. Security concerns most relevant to
this project include:

- **File parsing vulnerabilities** (JCAMP-DX, SPC, HDF5, CSV) — malicious
  input files that could cause crashes, memory exhaustion, or code execution
- **Dependency vulnerabilities** — issues in numpy, scipy, or optional
  dependencies (h5py, lmfit, pybaselines)
- **Path traversal** — file I/O operations that could access unintended paths
