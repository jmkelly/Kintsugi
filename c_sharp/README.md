# Kintsugi

An opinionated ASP.NET Core template for building interactive, well-tested web
apps. Designed for use with [opencode](https://opencode.ai) (skills, ADRs, agent
workflows) but easily adapted to any AI harness. The name comes from the
Japanese art of repairing broken pottery with gold — every fix and refinement
makes the codebase stronger and more beautiful.

## Objectives

- **Opinionated defaults** — DDD with encapsulated domain entities, vertical
  slice architecture, TDD with real SQLite in-memory tests, and HTMX for
  interactivity. No controllers, no SPA, no mocking frameworks.
- **Rapid iteration** — Server-rendered HTML with HTMX means no JS build step
  or client-side state management. Start coding immediately.
- **Testable by design** — Every feature is backed by xUnit tests using a real
  `AppDbContext` on SQLite `:memory:`. Write the test first, then the code.
- **Boring and obvious** — Prioritises clarity over cleverness. Fewer
  abstractions, fewer indirections, less to change.

## Stack

- **.NET 10** — ASP.NET Core Razor Pages
- **HTMX 2.x** — HTML-driven interactivity
- **SQLite + Entity Framework Core 10** — persistence
- **xUnit** — testing (real DbContext, no mocks or fakes)

## Quick start

```bash
dotnet run --project Kintsugi.Web
```

## Project structure

```
Kintsugi.Web/
├── Data/          — EF Core DbContext (shared infrastructure)
├── Features/      — every feature is a self-contained vertical slice
│   ├── Items/
│   ├── Home/
│   ├── Privacy/
│   └── Error/
└── Program.cs

Kintsugi.Tests/
├── Features/      — tests mirror the feature structure
└── Pages/
```

## Related

- [Architecture decisions](docs/decisions.md)
- [Coding conventions](docs/conventions.md)
