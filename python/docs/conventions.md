# Kintsugi Python — Conventions

## Architecture

- **Vertical slice architecture**: features live in `src/features/<name>/`
- **Server-rendered HTML**: no SPA, all rendering via Jinja2 templates
- **HTMX 2.x**: for dynamic interactions without JavaScript build step
- **Raw SQL via aiosqlite**: transparent, debuggable data layer

## Code conventions

- **Rich domain objects**: `Piece` class with `toggle()`, `rename()`, static `describe()` factory
- **No repository abstraction**: top-level query functions in `db.py` or feature modules
- **HTMX partials**: file names prefixed with `_` (e.g. `_piece_list.html`)
- **Partial rendering**: initial load uses `{% include %}`, HTMX responses render the partial alone
- **Static assets**: served from `src/public/` at `/static/`
- **Package management**: `uv` for dependency management (`uv sync`, `uv add`, `uv remove`, `uv run`)

## Domain terminology

| Term | Meaning |
|------|---------|
| Piece | A kintsugi-repaired item |
| describe | Create a new piece |
| register | Persist a piece |
| remove | Delete a piece |

## Testing

- Use `uv run pytest` to run tests with `pytest-asyncio` and `httpx` for async HTTP tests
- Use real SQLite `:memory:` databases — no mocking
- Test file structure mirrors source: `tests/features/pieces/test_piece.py`
