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

## Important rules

- Keep things simple. Prefer boring, obvious code over clever code.
- Before writing significant code, check docs/decisions.md for relevant ADRs.
- When you discover a recurring pattern, note it in docs/conventions.md.
- Before starting a new type of task, check .opencode/skills/ — if no skill
  matches, consider creating one.
- Write the test first. Tests use a real `AppDbContext` backed by SQLite
  `:memory:` — no fakes or mocking frameworks.
- Design domain entities with encapsulated behavior — constructors enforce
  invariants, methods like `Toggle()` replace bare property sets.
