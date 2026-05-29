---
name: fix-bug
description: Use when the user reports unexpected behavior, crashes, errors, or incorrect output in the Kintsugi project. Do NOT use for adding features or refactoring working code.
---

# fix-bug

1. Write a failing test that reproduces the bug (if tests exist).
2. Fix the root cause with the minimal change possible.
3. Verify with `dotnet build && dotnet test`.
4. If the fix revealed a gap in conventions, update `docs/conventions.md`.
5. If bugs of this type recur, consider adding a lint rule or type improvement.
