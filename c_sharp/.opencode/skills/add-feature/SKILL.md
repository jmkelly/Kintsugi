---
name: add-feature
description: Use when the user asks to add a new feature, capability, or user-facing behavior to the Kintsugi project. Do NOT use for bug fixes, refactors, or documentation-only changes.
---

# add-feature

1. Check `docs/decisions.md` and `docs/conventions.md` for existing context.
2. Study an existing complete feature directory (e.g. `Kintsugi.Web/Features/Items/`)
   to understand layouts, conventions, and patterns.
3. If the feature affects architecture, add a new ADR to `docs/decisions.md` first.
4. Write the test first, then the production code.
5. Verify with `dotnet build && dotnet test`.
6. If the implementation reveals a new convention, add it to `docs/conventions.md`.
7. If this feature type might recur, improve this skill.
