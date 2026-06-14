# Kintsugi (Go)

An opinionated Go template for building interactive, well-tested web apps.
Designed for use with [opencode](https://opencode.ai) but easily adapted to
any AI harness.

## Objectives

- **Opinionated defaults** -- DDD with encapsulated domain entities, vertical
  slice architecture, TDD with real SQLite in-memory tests, and HTMX for
  interactivity. No SPA, no client-side framework.
- **Rapid iteration** -- Server-rendered HTML with HTMX means no JS build step
  for the frontend. Start coding immediately.
- **Testable by design** -- Every feature is backed by tests using a real
  SQLite `:memory:` connection. Write the test first, then the code.
- **Boring and obvious** -- Prioritises clarity over cleverness. Fewer
  abstractions, fewer indirections, less to change.

## Stack

- **Go 1.24** -- net/http for routing
- **HTMX 2.x** -- HTML-driven interactivity
- **SQLite + modernc.org/sqlite** -- persistence (pure Go, no CGO)
- **Standard testing** -- testing (real SQLite :memory: connection, no fakes or mocks)

## Quick start

```bash
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
└── public/             -- static assets

tests/features/         -- tests mirror the feature structure
```

## Related

- [Architecture decisions](docs/decisions.md)
- [Coding conventions](docs/conventions.md)
