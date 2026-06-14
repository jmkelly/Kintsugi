# Coding Conventions

Add entries here as patterns emerge.

## How to add

- Find a label that describes the pattern (e.g. "Naming: test files").
- Write a short, concrete rule with an example.
- Keep it brief — one or two sentences per entry.

---

## Architecture: vertical slices + DDD

```
src/features/<Name>/  — entity, repository, routes, views
src/db.ts             — SQLite connection factory (shared infrastructure)
```

Every feature is self-contained in one folder. Route handlers import
`getDb()` directly. Use repository functions for reusable query/command
patterns within a feature.

## Domain entity: encapsulate behavior

Entities protect their invariants through static factory methods and behavior
methods. Avoid public property assignment — use methods like `toggle()` instead
of `piece.restored = !piece.restored`. Use a static `describe()` factory
instead of `new`.

## Testing: real connection with better-sqlite3 :memory:

Do not use mocking frameworks or fakes. Tests create a real better-sqlite3
`:memory:` connection via `getDb()`. This keeps tests fast, avoids fake
upkeep, and exercises the real persistence path.

## Handlebars partials for HTMX

HTMX handlers (POST route handlers) return a rendered partial view
prefixed with `_`. The partial is also callable from the main page on
initial load via `{{> path/to/_partial }}`.

## Naming: HTMX handler routes

HTMX handler routes are named `/<feature>/<action>` (e.g. `POST /pieces/register`)
and return HTML partials. They match the `hx-post` URL used in templates.

## Domain naming: thematic consistency

Entities and features are named after the Kintsugi craft. Use domain-specific
language — "piece" instead of "item", "register" instead of "create",
"remove" instead of "delete". This keeps the code aligned with the project's
identity.
