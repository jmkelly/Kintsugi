# Kintsugi

An opinionated collection of web app templates for building interactive,
well-tested applications across ecosystems. Designed for use with
[opencode](https://opencode.ai) (skills, ADRs, agent workflows) but easily
adapted to any AI harness.

The name comes from the Japanese art of repairing broken pottery with gold —
every fix and refinement makes the codebase stronger and more beautiful.

## Templates

| Ecosystem | Stack | Directory |
|-----------|-------|-----------|
| **C#** | .NET 10 + ASP.NET Core Razor Pages + HTMX + SQLite/EF Core + xUnit | [`c_sharp/`](c_sharp/) |
| **TypeScript** | Node.js + Express + HTMX + SQLite/better-sqlite3 + Vitest | [`typescript/`](typescript/) |
| **Go** | Go 1.24 + net/http + HTMX + SQLite/modernc.org + testing | [`go/`](go/) |
| **Python** | Python 3.12 + FastAPI + Jinja2 + HTMX + SQLite/aiosqlite + pytest | [`python/`](python/) |

## Common philosophy

All templates share the same opinionated conventions:

- **DDD with encapsulated domain entities** — entities protect their invariants
  through constructors/factories and behavior methods. No anemic data bags.
- **Vertical slice architecture** — each feature is a self-contained folder
  with its entity, data access, routes, and views. No cross-cutting layers.
- **HTMX for interactivity** — server-rendered HTML with HTMX attributes.
  No SPA, no client-side framework, no JS build step.
- **Testable by design** — every feature is backed by tests using a real
  database connection (`:memory:`). No mocking frameworks or fakes. Use test containers for test isolation.
- **TDD workflow** — write the test first, then the production code.
- **Boring and obvious** — clarity over cleverness. Fewer abstractions, less
  indirection, less to change.

## Quick start

```bash
# C#
cd c_sharp
dotnet run --project Kintsugi.Web

# TypeScript
cd typescript
npm install
npm run dev

# Go
cd go
go run ./cmd/kintsugi

# Python
cd python
uv sync --extra dev
uv run uvicorn src.main:app --reload
```

## Using a template

Each template is a standalone starter project with opencode agent config baked in.

### Clone-as template (simplest)

Use the whole repo, keep your chosen template, delete the rest:

```bash
git clone https://github.com/YOUR-ORG/Kintsugi.git my-app
cd my-app
rm -rf typescript .git          # keep C#
# or: rm -rf c_sharp .git       # keep TypeScript
(cd .opencode && npm install)   # opencode runtime deps
```

The `.opencode/` directory is already at the root — you're done.

### Copy from a local clone

```bash
cp -r /path/to/Kintsugi/c_sharp /path/to/my-app      # or typescript
cp -r /path/to/Kintsugi/.opencode /path/to/my-app/.opencode
cd /path/to/my-app
(cd .opencode && npm install)
```

The `.opencode/` directory provides:
- **Skills** (`add-feature`, `fix-bug`, `refactor`) — loaded by your AI agent
- **Commands** (e.g. `commit`) — custom agent workflows
- **Runtime** (`@opencode-ai/plugin`) — enables opencode integration

Templates ship with their own `opencode.json`, `AGENTS.md`, and `docs/` — no extra setup needed.

## Adding a new ecosystem

1. Create a new directory at the root (e.g. `python/`, `rust/`).
2. Add a `README.md` documenting the stack and project structure.
3. Add a row to this root README's template table.
4. Follow the common conventions above for consistency.
