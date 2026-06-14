# Kintsugi (Go)

A project built with opencode. The name reflects the philosophy: every fix and
refinement makes the codebase stronger and more beautiful.

## Stack

- Go 1.24 -- net/http for routing
- HTMX 2.x -- HTML-driven interactivity
- SQLite + modernc.org/sqlite -- persistence (pure Go, no CGO)
- Standard testing package -- testing (real SQLite :memory: connection, no mocking)
- TDD -- tests first, then production code
- DDD -- rich domain entities with encapsulated behavior, vertical slices

## Quick start

```bash
cd go
go run ./cmd/kintsugi
```

## Project structure

```
cmd/kintsugi/           -- entry point
internal/
├── db/                 -- SQLite connection factory (shared infrastructure)
├── features/           -- vertical slices (one per feature)
│   ├── pieces/         -- domain entity, repository, handlers, templates
│   ├── home/
│   └── error/
├── views/layouts/      -- shared layout templates
└── public/             -- static assets (css, js)

tests/features/         -- unit tests mirroring feature structure
└── pieces/             -- real SQLite :memory: connection
```

## Agent workflow

Before writing any code, follow these steps in order:

1. **Load the matching skill** -- Use the skill tool to load the skill for
   your task type (add-feature, fix-bug, refactor).
2. **Read the auto-injected docs** -- `docs/decisions.md` and
   `docs/conventions.md` are already in your context. Read them carefully.
3. **Study existing code** -- If creating or modifying a feature, read an
   existing complete feature directory (e.g. `internal/features/pieces/`)
   to understand layouts, conventions, and patterns first.
4. **Write the test first** -- Always write a failing test before production
   code.
5. **Verify** -- Run `go build ./... && go test ./...` after making changes.
6. **Document** -- If you discovered a new pattern, add it to
   `docs/conventions.md`; if the change affects architecture, add an ADR to
   `docs/decisions.md`.

## Rules

- Keep things simple. Prefer obvious code over clever code.
- Design domain entities with encapsulated behavior -- constructor functions
  enforce invariants, methods like `Toggle()` replace bare property sets.
- Write the test first. Tests use a real SQLite `:memory:` connection
  via modernc.org/sqlite -- no fakes or mocking frameworks.
