# Architecture Decision Records

## ADR-001: Raw SQL via aiosqlite

**Status**: Accepted

**Context**: The C# project uses EF Core ORM, while the TypeScript project chose raw SQL for transparency.

**Decision**: Use raw SQL via aiosqlite (async SQLite library), matching the TypeScript project's philosophy. No ORM abstraction.

**Consequences**: Simpler dependency graph, fully transparent SQL, slightly more boilerplate for complex queries.

## ADR-002: Jinja2 with FastAPI

**Status**: Accepted

**Context**: Need a server-side template engine for HTML rendering.

**Decision**: Use Jinja2, the de facto standard template engine for Python web apps. FastAPI has first-class Jinja2 support via `Jinja2Templates`.

**Consequences**: Familiar template syntax, excellent FastAPI integration, no additional template engine dependencies.

## ADR-003: async def routes with aiosqlite

**Status**: Accepted

**Context**: FastAPI is built on async, and SQLite access should not block the event loop.

**Decision**: Use `async def` for all route handlers and aiosqlite's async API. FastAPI dependency injection provides per-request database connections.

**Consequences**: Non-blocking I/O, clean connection lifecycle management via FastAPI's `Depends`.

## ADR-004: Dynamic template dispatch for HTMX

**Status**: Accepted

**Context**: HTMX interactions need to return partial templates without the base layout.

**Decision**: Check `HX-Request` header in route handlers to determine whether to return the full page or just the partial. This avoids duplicating render logic.

**Consequences**: Single route handler for both full page load and HTMX request; cleaner code than separate endpoints.

## ADR-005: uv for package management

**Status**: Accepted

**Context**: Python packaging has historically been fragmented (pip, pipenv, poetry, pdm). The TypeScript project uses npm and the C# project uses the .NET SDK directly.

**Decision**: Use `uv` — a fast, modern Python package manager built in Rust. It provides `uv sync` for installing, `uv add`/`uv remove` for dependency management, and `uv run` for executing scripts in the project's virtual environment.

**Consequences**: Faster installs than pip, built-in virtual environment management, lockfile (uv.lock) for reproducible builds, single tool for all packaging needs.
