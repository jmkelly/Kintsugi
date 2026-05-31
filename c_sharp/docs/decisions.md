# Architecture Decision Records

## Format

Each entry: `YYYY-MM-DD: Title`

- **Context**: why this decision was needed
- **Decision**: what was chosen
- **Consequences**: trade-offs, what this enables or forecloses

---

## 2026-05-29: Project foundation — .NET 10 + Razor Pages + HTMX

**Context:** Kintsugi needed a web stack that enables rapid, interactive UI
without heavy client-side JavaScript.

**Decision:**
- .NET 10 with Razor Pages for server-rendered HTML
- HTMX 2.x for dynamic interactions via HTML attributes (no JS build step)
- SQLite + Entity Framework Core 10 for persistence
- xUnit for testing
- Fakes (in-memory implementations of interfaces) over mocking frameworks
- TDD-driven design: tests written first, then production code
- DDD-driven design: rich domain models with encapsulated behavior

**Consequences:**
- Simple project structure — no SPA, no client-side framework, no JS toolchain
- HTMX lets us add interactivity with HTML attributes; most handlers return
  partial views
- Fakes keep tests fast and avoid mock verifications; integration tests with
  real SQLite in-memory validate the data layer
- TDD ensures every piece of code has a corresponding test and the design
  stays testable from the start

---

## 2026-05-29: Simple Domain-Driven Design

**Context:** The initial Models/ and Services/ layout treated domain objects as
anemic data bags and mixed persistence with domain logic. A clearer layering
was needed to keep business rules explicit and testable.

**Decision:**
- Move to three-layer structure: **Domain** (entities), **Data** (EF Core
  context + extension methods), **Presentation** (Razor Pages).
- Domain entities encapsulate behavior — constructors enforce invariants,
  methods like `Toggle()` replace property-mutation patterns.
- No repository abstraction — page models operate on the DbContext directly
  via extension methods for reusable query/command logic.
- xUnit tests use the real `AppDbContext` backed by SQLite `:memory:`,
  eliminating the need for fakes or mocks.

**Consequences:**
- Business rules are explicit and testable in the domain entity itself.
- The anemic domain model anti-pattern is avoided.
- No repository layer means fewer files, less indirection, no fake upkeep.
- SQLite in-memory tests are fast enough and test the real persistence path.
- `Models/` and `Services/` folders are replaced by `Domain/` and `Data/`.

---

## 2026-05-29: Vertical slices over technical layering

**Context:** The Domain/Data/Pages layering created coupling by technical
concern — changes to a feature touched files spread across three folders.
This made features hard to reason about in isolation.

**Decision:**
- Move to **vertical slice** organisation: each feature lives in its own
  `Features/<Name>/` directory containing everything it needs (entity,
  data extensions, Razor Page, partial views).
- Shared infrastructure (`AppDbContext`) stays in `Data/`.
- Razor Pages root directory is set to `/Features`.
- Tests mirror the feature structure under `Kintsugi.Tests/Features/<Name>/`.

**Consequences:**
- A feature's complete implementation lives in one folder — easy to find,
  change, or remove.
- Adding a new feature means creating one folder, not touching three.
- The `Domain/` and `Pages/` top-level directories disappear; only
  `Data/` and `Features/` remain at the top.
- `RootDirectory = "/Features"` lets Razor Pages discover feature pages.
