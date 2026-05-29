# Coding Conventions

Add entries here as patterns emerge.

## How to add

- Find a label that describes the pattern (e.g. "Naming: test files").
- Write a short, concrete rule with an example.
- Keep it brief — one or two sentences per entry.

---

## Architecture: service interface with fakes

Every service interface (`I*Repository`, `I*Service`) has two implementations:
the real one (EF Core, HTTP client, etc.) and a fake (`Fake*`) that uses
in-memory storage. Tests use the fake for speed; integration tests use the
real implementation with SQLite `:memory:`.

## Testing: fakes over mocks

Do not use mocking frameworks. Create `Fake*` classes that implement the
interface with simple in-memory state. This makes tests:
- Readable (no setup/verify noise)
- Resilient to refactoring (no brittle mock expectations)
- Reusable across test classes

## Razor Pages: partial views for HTMX

HTMX handlers (POST actions returning `PartialViewResult`) render a shared
partial view prefixed with `_`. The partial is also callable from the main
page on initial load via `await Html.PartialAsync(...)`.

## Naming: HTMX handler methods

HTMX handler methods are named `OnPost[Action]Async` and return
`PartialViewResult`. They match the `handler` query parameter used in
`hx-post` URLs.
