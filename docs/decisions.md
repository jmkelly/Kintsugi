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

**Consequences:**
- Simple project structure — no SPA, no client-side framework, no JS toolchain
- HTMX lets us add interactivity with HTML attributes; most handlers return
  partial views
- Fakes keep tests fast and avoid mock verifications; integration tests with
  real SQLite in-memory validate the data layer
- TDD ensures every piece of code has a corresponding test and the design
  stays testable from the start
