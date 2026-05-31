# Kintsugi (TypeScript)

An opinionated TypeScript + Express template for building interactive,
well-tested web apps. Designed for use with [opencode](https://opencode.ai)
but easily adapted to any AI harness.

## Objectives

- **Opinionated defaults** — DDD with encapsulated domain entities, vertical
  slice architecture, TDD with real SQLite in-memory tests, and HTMX for
  interactivity. No SPA, no client-side framework.
- **Rapid iteration** — Server-rendered HTML with HTMX means no JS build step
  for the frontend. Start coding immediately.
- **Testable by design** — Every feature is backed by Vitest tests using a real
  better-sqlite3 `:memory:` connection. Write the test first, then the code.
- **Boring and obvious** — Prioritises clarity over cleverness. Fewer
  abstractions, fewer indirections, less to change.

## Stack

- **Node.js + TypeScript** — Express 5 for routing
- **HTMX 2.x** — HTML-driven interactivity
- **SQLite + better-sqlite3** — persistence
- **Vitest** — testing (real connection, no fakes or mocks)

## Quick start

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── index.ts        — Express app setup and startup
├── db.ts           — SQLite connection factory (better-sqlite3)
├── features/       — every feature is a self-contained vertical slice
│   ├── items/
│   ├── home/
│   └── error/
├── views/          — shared EJS layouts
└── public/         — static assets (css, js, lib)

tests/
└── features/       — tests mirror the feature structure
```

## Related

- [Architecture decisions](docs/decisions.md)
- [Coding conventions](docs/conventions.md)
