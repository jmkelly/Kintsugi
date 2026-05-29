---
name: refactor
description: Use when the user asks to restructure, simplify, or improve existing code without changing external behavior in the Kintsugi project. Do NOT use for adding features or fixing bugs.
---

# refactor

1. Understand what the refactor aims to improve (readability, performance, testability).
2. Write the refactored code.
3. Verify existing behavior is preserved (run tests if they exist).
4. Update `docs/conventions.md` with any new patterns the refactor establishes.
5. If this kind of refactor becomes common, extract it into this skill.
