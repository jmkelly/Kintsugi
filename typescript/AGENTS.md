# Kintsugi (TypeScript)

A project built with opencode. The name reflects the philosophy: every fix and
refinement makes the codebase stronger and more beautiful.

## Stack

- Node.js + TypeScript — Express for routing
- HTMX 2.x — HTML-driven interactivity
- SQLite + better-sqlite3 — persistence
- Vitest — testing (real better-sqlite3 :memory: connection, no mocking)
- TDD — tests first, then production code
- DDD — rich domain entities with encapsulated behavior, vertical slices

## Quick start

```bash
cd typescript
npm install
npm run dev
```

## Project structure

```
src/
├── index.ts            — entry point
├── db.ts               — SQLite connection factory (shared infrastructure)
├── features/           — vertical slices (one per feature)
│   ├── items/          — domain entity, repository, routes, views
│   ├── home/
│   └── error/
├── views/              — shared layouts
└── public/             — static assets

tests/
└── features/           — unit tests mirroring feature structure
    └── items/          — real better-sqlite3 :memory: connection
```

## Agent workflow

Before writing any code, follow these steps in order:

1. **Load the matching skill** — Use the skill tool to load the skill for
   your task type (add-feature, fix-bug, refactor).
2. **Read the auto-injected docs** — `docs/decisions.md` and
   `docs/conventions.md` are already in your context. Read them carefully.
3. **Study existing code** — If creating or modifying a feature, read an
   existing complete feature directory (e.g. `src/features/items/`)
   to understand layouts, conventions, and patterns first.
4. **Write the test first** — Always write a failing test before production
   code.
5. **Verify** — Run `npm run build && npm test` after making changes.
6. **Document** — If you discovered a new pattern, add it to
   `docs/conventions.md`; if the change affects architecture, add an ADR to
   `docs/decisions.md`.

## Rules

- Keep things simple. Prefer obvious code over clever code.
- Design domain entities with encapsulated behavior — static factories enforce
  invariants, methods like `toggle()` replace bare property sets.
- Write the test first. Tests use a real better-sqlite3 `:memory:` connection
  — no fakes or mocking frameworks.
