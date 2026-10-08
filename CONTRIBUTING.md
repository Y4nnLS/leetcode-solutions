# Contributing

This is a personal study repository, but a consistent workflow protects its learning history.

## Structure and naming

Organize problems by topic. Exercise folders use `NNNN-problem-name` in kebab case and contain exactly `solution.js`, `cases.json`, `solution.test.js`, and `NOTES.md`. Reusable test-only data-structure helpers belong in `shared/`; automation belongs in `scripts/`.

## Solution and test conventions

- Keep `solution.js` compatible with the LeetCode signature and export its function through CommonJS.
- Do not add logging, test code, external dependencies, or local-only algorithm logic to solutions.
- Keep `cases.json` valid JSON. Every scenario needs `name`, `input`, and `expected`.
- Make `solution.test.js` load cases dynamically and use `node:test` plus `node:assert/strict`.
- Copy mutable inputs before testing when needed. Validate special contracts semantically instead of relying on one incidental output order.
- Explain time and auxiliary-space complexity accurately in the notes.

## Notes and completion

Write `NOTES.md` in Brazilian Portuguese. It should explain the problem, reasoning, chosen approach, walkthrough, correctness, complexity, edge cases, mistakes, and review questions. Update the English README entry only after the implementation and active tests pass.

A problem is solved only when its solution is implemented, its JSON cases are valid, its active tests pass, its notes are complete, and `npm run validate` succeeds. Do not mark skipped or TODO tests as passed.

## Workflow

1. Create a starter with `npm run new:exercise` or follow the existing layout.
2. Implement the solution and add representative cases.
3. Run `npm run test:exercise -- NUMBER` while iterating, or `npm run test:exercise -- NUMBER --case N` to execute only the Nth JSON scenario (one-based) and inspect local logs.
4. Review complexity and complete `NOTES.md`.
5. Update README status and run `npm run validate`.
6. Review local changes in GitHub Desktop and commit them when ready.

Do not overwrite another personal attempt, change expected values merely to pass a failing test, perform destructive Git operations, or run remote Git operations without explicit authorization.

## Suggested commits

```text
feat(arrays): solve LeetCode 1 - Two Sum
feat(math): solve LeetCode 9 - Palindrome Number
feat(stack): solve LeetCode 20 - Valid Parentheses
docs(linked-lists): add notes for LeetCode 21
test(arrays): add edge cases for LeetCode 26
chore: configure automated test runner
```
