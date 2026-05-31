# Kintsugi

A project built with opencode. The name reflects the philosophy: every fix and
refinement makes the codebase stronger and more beautiful.

## Stack

- .NET 10 — ASP.NET Core Razor Pages
- HTMX 2.x — HTML-driven interactivity
- SQLite + Entity Framework Core 10 — persistence
- xUnit — testing
- Real DbContext with SQLite `:memory:` — no mocking frameworks or fakes
- TDD — tests first, then production code
- DDD — rich domain entities with encapsulated behavior, vertical slices

## Quick start

```bash
cd kintsugi
dotnet run --project Kintsugi.Web
```

## Project structure

```
Kintsugi.Web/
├── Data/          — EF Core DbContext (shared infrastructure)
├── Features/      — vertical slices (one per feature)
│   ├── Items/     — domain entity, data extensions, page, partials
│   ├── Home/
│   ├── Privacy/
│   └── Error/
└── Program.cs

Kintsugi.Tests/
├── Features/      — unit tests mirroring feature structure
│   └── Items/     — real DbContext with SQLite :memory:
└── Pages/         — page model tests
```

## Agent workflow

Before writing any code, follow these steps in order:

1. **Load the matching skill** — Use the skill tool to load the skill for
   your task type (add-feature, fix-bug, refactor).
2. **Read the auto-injected docs** — `docs/decisions.md` and
   `docs/conventions.md` are already in your context. Read them carefully.
3. **Study existing code** — If creating or modifying a feature, read an
   existing complete feature directory (e.g. `Kintsugi.Web/Features/Items/`)
   to understand layouts, conventions, and patterns first.
4. **Write the test first** — Always write a failing test before production
   code.
5. **Verify** — Run `dotnet build && dotnet test` after making changes.
6. **Document** — If you discovered a new pattern, add it to
   `docs/conventions.md`; if the change affects architecture, add an ADR to
   `docs/decisions.md`; if the task type might recur, improve the skill.

## Rules

- Keep things simple. Prefer boring, obvious code over clever code.
- Design domain entities with encapsulated behavior — constructors enforce
  invariants, methods like `Toggle()` replace bare property sets.
- Write the test first. Tests use a real `AppDbContext` backed by SQLite
  `:memory:` — no fakes or mocking frameworks.
