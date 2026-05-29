# Coding Conventions

Add entries here as patterns emerge.

## How to add

- Find a label that describes the pattern (e.g. "Naming: test files").
- Write a short, concrete rule with an example.
- Keep it brief — one or two sentences per entry.

---

## Architecture: vertical slices + DDD

```
Features/<Name>/  — entity, data extensions, Razor Page, partials
Data/             — EF Core DbContext (shared infrastructure)
```

Every feature is self-contained in one folder. Page models inject
`AppDbContext` directly. Use extension methods on `AppDbContext` for
reusable query/command patterns within a feature.

## Domain entity: encapsulate behavior

Entities protect their invariants through constructors and behavior methods.
Avoid public property setters — use methods like `Toggle()` instead of
`item.IsComplete = !item.IsComplete`. Make EF Core materialization possible
via a private parameterless constructor and private property setters.

## Testing: real DbContext with SQLite in-memory

Do not use mocking frameworks or fakes. Tests create a real `AppDbContext`
backed by a `SqliteConnection("DataSource=:memory:")`. This keeps tests fast,
avoids fake upkeep, and exercises the real persistence path.

## Razor Pages: partial views for HTMX

HTMX handlers (POST actions returning `PartialViewResult`) render a shared
partial view prefixed with `_`. The partial is also callable from the main
page on initial load via `await Html.PartialAsync(...)`.

## Naming: HTMX handler methods

HTMX handler methods are named `OnPost[Action]Async` and return
`PartialViewResult`. They match the `handler` query parameter used in
`hx-post` URLs.
