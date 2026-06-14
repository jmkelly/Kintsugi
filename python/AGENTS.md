# Kintsugi Python — Agent Instructions

## Stack

| Layer | Technology |
|-------|------------|
| Framework | FastAPI |
| Templates | Jinja2 |
| Database | SQLite via aiosqlite (raw SQL) |
| Interactivity | HTMX 2.x |
| Package manager | uv |
| Testing | pytest + pytest-asyncio + httpx |
| Linting | ruff |

## Project structure

```
src/
├── main.py                          # FastAPI app, router mounting
├── db.py                            # aiosqlite connection factory + init
├── templates.py                     # Jinja2Templates instance
├── features/                        # Vertical slices
│   ├── home/                        # GET /
│   ├── pieces/                      # CRUD with HTMX
│   └── error/                       # 404 + 500 handlers
├── templates/layouts/base.html      # Shared Jinja2 layout
└── public/                          # Static assets (css/, js/)
```

## Conventions

- **Vertical slices**: each feature in `src/features/<name>/`
- **Rich domain entity**: `Piece` class (not a plain dict) with behavior (`toggle`, `rename`, `describe`)
- **Raw SQL via aiosqlite**: no ORM; keep the data layer transparent
- **HTMX partials**: prefixed with `_` (`_piece_list.html`), returned without layout
- **No mocking in tests**: use real SQLite `:memory:` database
- **No SPA**: all rendering on the server
- **Craft terminology**: "piece" not "item", "register" not "create", "remove" not "delete"
- **Package management**: use `uv sync` to install, `uv add <pkg>` to add dependencies, `uv run <cmd>` to run scripts

## Workflow

1. Read `docs/conventions.md` and `docs/decisions.md`
2. Understand the vertical slice for the feature being modified
3. Write tests first (pytest, httpx)
4. Implement the feature
5. Run `uv run ruff check .` and `uv run pytest` to verify
