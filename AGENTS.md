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

## JavaScript Interactive Reference

The standalone React/TypeScript application lives in `apps/javascript-reference`. Keep it independent of all LeetCode solution logic and the root `node:test` suite. Its educational catalog belongs in `src/data`, reusable deterministic visualizations belong in `src/lib/visualizers.ts`, and UI components must not use `eval`, `new Function`, or execute arbitrary visitor input.

Use Brazilian Portuguese for user-facing application text and English for code identifiers. Document native-method complexity with implementation caveats when ECMAScript does not guarantee a bound. Preserve accessibility: semantic controls, keyboard operation, visible focus, reduced-motion support, and no color-only signals. The Vite base path and `deploy-reference.yml` target GitHub Pages; configure them locally but never push or publish without authorization.
