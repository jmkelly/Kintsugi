# Kintsugi

An opinionated collection of web app templates for building interactive,
well-tested applications across ecosystems. Designed for use with
[opencode](https://opencode.ai) (skills, ADRs, agent workflows) but easily
adapted to any AI harness.

The name comes from the Japanese art of repairing broken pottery with gold —
every fix and refinement makes the codebase stronger and more beautiful.

## Templates

| Ecosystem | Stack | Directory |
|-----------|-------|-----------|
| **C#** | .NET 10 + ASP.NET Core Razor Pages + HTMX + SQLite/EF Core + xUnit | [`c_sharp/`](c_sharp/) |
| **TypeScript** | Node.js + Express + HTMX + SQLite/better-sqlite3 + Vitest | [`typescript/`](typescript/) |

## Common philosophy

All templates share the same opinionated conventions:

- **DDD with encapsulated domain entities** — entities protect their invariants
  through constructors/factories and behavior methods. No anemic data bags.
- **Vertical slice architecture** — each feature is a self-contained folder
  with its entity, data access, routes, and views. No cross-cutting layers.
- **HTMX for interactivity** — server-rendered HTML with HTMX attributes.
  No SPA, no client-side framework, no JS build step.
- **Testable by design** — every feature is backed by tests using a real
  database connection (`:memory:`). No mocking frameworks or fakes. Use test containers for test isolation.
- **TDD workflow** — write the test first, then the production code.
- **Boring and obvious** — clarity over cleverness. Fewer abstractions, less
  indirection, less to change.

## Quick start

```bash
# C#
cd c_sharp
dotnet run --project Kintsugi.Web

# TypeScript
cd typescript
npm install
npm run dev
```

## Adding a new ecosystem

1. Create a new directory at the root (e.g. `python/`, `rust/`).
2. Add a `README.md` documenting the stack and project structure.
3. Add a row to this root README's template table.
4. Follow the common conventions above for consistency.
