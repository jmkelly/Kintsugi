# Architecture Decision Records

## Format

Each entry: `YYYY-MM-DD: Title`

- **Context**: why this decision was needed
- **Decision**: what was chosen
- **Consequences**: trade-offs, what this enables or forecloses

---

## 2026-05-31: Project foundation — Express + TypeScript + HTMX

**Context:** Kintsugi needed a TypeScript web stack that enables rapid,
interactive UI without heavy client-side JavaScript, mirroring the C#
template's philosophy.

**Decision:**
- Node.js + TypeScript with Express 5 for server-rendered HTML
- HTMX 2.x for dynamic interactions via HTML attributes (no JS build step)
- SQLite + better-sqlite3 for persistence
- Vitest for testing
- TDD-driven design: tests written first, then production code
- DDD-driven design: rich domain models with encapsulated behavior

**Consequences:**
- Simple project structure — no SPA, no client-side framework, no JS toolchain
- HTMX lets us add interactivity with HTML attributes; most handlers return
   rendered Handlebars partials
- Raw SQL via better-sqlite3 keeps the data layer transparent and debuggable
- Integration tests with real `:memory:` connection validate the data layer
- TDD ensures every piece of code has a corresponding test and the design
  stays testable from the start

---

## 2026-05-31: Simple Domain-Driven Design

**Context:** A clear layering was needed to keep business rules explicit
and testable, avoiding anemic data objects mixed with persistence logic.

**Decision:**
- Three-layer structure: **Domain** (entities), **Data** (SQL +
  repository functions), **Presentation** (Express routes + Handlebars views).
- Domain entities encapsulate behavior — static `create()` factory enforces
  invariants, methods like `toggle()` replace property-mutation patterns.
- No repository abstraction — route handlers import repository functions
  directly.
- Vitest tests use a real better-sqlite3 `:memory:` connection.

**Consequences:**
- Business rules are explicit and testable in the domain entity itself.
- The anemic domain model anti-pattern is avoided.
- No repository layer means fewer files, less indirection.

---

## 2026-05-31: Vertical slices over technical layering

**Context:** Grouping by technical concern creates coupling — changes to a
feature touch files spread across folders.

**Decision:**
- Move to **vertical slice** organisation: each feature lives in its own
  `src/features/<Name>/` directory containing everything it needs (entity,
  repository, routes, Handlebars views).
- Shared infrastructure (`db.ts`) stays at the `src/` level.
- Tests mirror the feature structure under `tests/features/<Name>/`.

**Consequences:**
- A feature's complete implementation lives in one folder — easy to find,
  change, or remove.
- Adding a new feature means creating one folder, not touching three.
