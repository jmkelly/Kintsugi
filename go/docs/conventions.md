# Coding Conventions

Add entries here as patterns emerge.

## How to add

- Find a label that describes the pattern (e.g. "Naming: test files").
- Write a short, concrete rule with an example.
- Keep it brief -- one or two sentences per entry.

---

## Architecture: vertical slices + DDD

```
internal/features/<Name>/  -- entity, repository, handlers, templates
internal/db/              -- SQLite connection factory (shared infrastructure)
```

Every feature is self-contained in one folder. Handler functions import
`getDb()` directly. Use repository functions for reusable query/command
patterns within a feature.

## Domain entity: encapsulate behavior

Entities protect their invariants through constructor functions and behavior
methods. Avoid direct struct literal assignment for business state -- use
methods like `Toggle()` instead of `piece.Restored = !piece.Restored`. Use a
`Create` constructor instead of ad-hoc struct creation.

## Testing: real connection with SQLite :memory:

Do not use mocking frameworks or fakes. Tests create a real SQLite `:memory:`
connection via `modernc.org/sqlite`. This keeps tests fast, avoids fake
upkeep, and exercises the real persistence path.

## HTML templates: partials for HTMX

HTMX handlers (POST route handlers) return a rendered partial template
prefixed with `_`. The partial is also callable from the main page on
initial load via `{{template "partial" .}}`.

## Naming: HTMX handler routes

HTMX handler routes are named `/<feature>/<action>` (e.g. `POST /pieces/register`)
and return HTML partials. They match the `hx-post` URL used in templates.
