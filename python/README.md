# Kintsugi — Python

A server-rendered web application using FastAPI, Jinja2, and HTMX.

## Quick start

```bash
uv sync --dev
uv run uvicorn src.main:app --reload
```

Open http://localhost:8000

## Running tests

```bash
uv run pytest
uv run ruff check .
```
