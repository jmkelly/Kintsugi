---
description: Stage and commit related changes with conventional commits
---

# Commit

Intelligently analyze uncommitted changes and create logical commits that group related functionality.

## Instructions

1. **Gather information**:
   - `!git status --short`
   - `!git diff --name-status`
   - `!git diff --name-status --cached`
   - `!git diff --stat`
   - `!git log --oneline -20`

2. **Identify logical groupings** based on file paths, diff content, and how changes work together.

3. **For each group**, create a conventional commit: `<type>(scope): <description>`

    **Types:** `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`, `ci`, `build`, `revert`

    **Description:** imperative mood, lowercase, no period, max 50 chars.

4. **Stage and commit each group**: `git add <files>` then `git commit -m "<message>"`

5. Show result: `!git log --oneline -5`

## Notes

- Do not commit secrets (.env, credentials.json, etc.)
- If a commit hook fails, fix the issue and create a new commit (do not amend)
- Ensure each commit is atomic and focused on a single logical change
