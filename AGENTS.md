# Repository guidance for AI agents

## Purpose and technology

Maintain this personal LeetCode study repository using JavaScript, CommonJS, Node.js 20+, native `node:test`, JSON test cases, and Markdown. The repository is organized by topic; every exercise has `solution.js`, `cases.json`, `solution.test.js`, and `NOTES.md`.

## Code, test, and documentation rules

- Preserve each LeetCode function signature and export only the function needed by local tests.
- Use no unnecessary dependencies or permanent debug output.
- Keep test scenarios editable in `cases.json`; never alter expected values simply to make an implementation pass.
- Use semantic validation for problem-specific contracts.
- Keep `NOTES.md` in Brazilian Portuguese and README.md in English.
- Document real time and auxiliary-space complexity, reasoning, edge cases, and test status.
- Run relevant tests after changes and report real failures.

## Adding and changing exercises

Use `NNNN-kebab-case` directories under a topic. The generator creates pending starters. Do not overwrite existing personal work or create nested Git repositories. Update README counts and status only when they reflect actual files and verified active tests.

## Pending work

Never solve an exercise marked **In Progress**, TODO, or skipped without an explicit request. In particular, LeetCode 26 must retain its explicit `Not implemented` placeholder and skipped tests until its owner asks to activate it. Offer only the requested level of assistance for pending problems.

## Change policy and completion

Do not run destructive Git commands, change global Git configuration, or perform push, merge, force-push, publishing, or other remote Git actions without explicit authorization. A solved problem requires implementation, valid cases, active passing tests, complete notes, an accurate README entry, and a passing `npm run validate`.
