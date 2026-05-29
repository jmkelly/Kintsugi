# Kintsugi

A project built with opencode. The name reflects the philosophy: every fix and
refinement makes the codebase stronger and more beautiful.

## Stack

- .NET 10 — ASP.NET Core Razor Pages
- HTMX 2.x — HTML-driven interactivity
- SQLite + Entity Framework Core 10 — persistence
- xUnit — testing
- Fakes over mocks — in-memory service implementations for testing
- TDD — tests first, then production code

## Quick start

```bash
cd kintsugi
dotnet run --project src/Kintsugi.Web
```

## Project structure

```
src/Kintsugi.Web/
├── Data/          — EF Core DbContext
├── Models/        — domain models
├── Services/      — interfaces + real implementations
├── Pages/         — Razor Pages + partial views
├── Fakes/         — (shared with tests via linked files or namespace)
└── Program.cs

tests/Kintsugi.Tests/
├── Fakes/         — fake implementations of service interfaces
├── Services/      — unit + integration tests
└── Pages/         — page model tests
```

## Important rules

- Keep things simple. Prefer boring, obvious code over clever code.
- Before writing significant code, check docs/decisions.md for relevant ADRs.
- When you discover a recurring pattern, note it in docs/conventions.md.
- Before starting a new type of task, check .opencode/skills/ — if no skill
  matches, consider creating one.
- Write the test first. Every interface should have a fake for testing.
- No mocking frameworks. Use Fake* classes.
