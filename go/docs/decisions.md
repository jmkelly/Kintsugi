# Architecture Decision Records

## Format

Each entry: `YYYY-MM-DD: Title`

- **Context**: why this decision was needed
- **Decision**: what was chosen
- **Consequences**: trade-offs, what this enables or forecloses

---

## 2026-06-14: Project foundation -- Go + net/http + HTMX

**Context:** Kintsugi needed a Go web stack that enables rapid, interactive
UI without heavy client-side JavaScript, mirroring the C# and TypeScript
templates' philosophy.

**Decision:**
- Go 1.24 with net/http for server-rendered HTML
- HTMX 2.x for dynamic interactions via HTML attributes (no JS build step)
- SQLite + modernc.org/sqlite for persistence (pure Go, no CGO)
- Standard testing package for testing
- TDD-driven design: tests written first, then production code
- DDD-driven design: rich domain models with encapsulated behavior

**Consequences:**
- Simple project structure -- no SPA, no client-side framework, no JS toolchain
- HTMX lets us add interactivity with HTML attributes; most handlers return
  rendered HTML partials
- modernc.org/sqlite is pure Go -- no CGO cross-compilation headaches
- Integration tests with real `:memory:` connection validate the data layer
- TDD ensures every piece of code has a corresponding test and the design
  stays testable from the start

---

## 2026-06-14: Simple Domain-Driven Design

**Context:** A clear layering was needed to keep business rules explicit
and testable, avoiding anemic data objects mixed with persistence logic.

**Decision:**
- Three-layer structure: **Domain** (entities), **Data** (SQL + repository
  functions), **Presentation** (http handlers + HTML templates).
- Domain entities encapsulate behavior -- `NewPiece()` constructor enforces
  invariants, methods like `Toggle()` replace property-mutation patterns.
- No repository abstraction -- handler functions import repository functions
  directly.
- Tests use a real SQLite `:memory:` connection.

**Consequences:**
- Business rules are explicit and testable in the domain entity itself.
- The anemic domain model anti-pattern is avoided.
- No repository abstraction means fewer files, less indirection.

---

## 2026-06-14: Vertical slices over technical layering

**Context:** Grouping by technical concern creates coupling -- changes to a
feature touch files spread across folders.

**Decision:**
- Move to **vertical slice** organisation: each feature lives in its own
  `internal/features/<Name>/` directory containing everything it needs
  (entity, repository, http handlers, HTML templates).
- Shared infrastructure (`db.go`) stays at `internal/db/`.
- Tests mirror the feature structure under `tests/features/<Name>/`.

**Consequences:**
- A feature's complete implementation lives in one folder -- easy to find,
  change, or remove.
- Adding a new feature means creating one folder, not touching three.
