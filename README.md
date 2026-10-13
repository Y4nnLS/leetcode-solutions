# LeetCode Solutions

## About

This is a personal study repository for LeetCode problems. It keeps each JavaScript solution, editable JSON test cases, automated local tests, and Portuguese learning notes together.

## Goals

- Practice algorithms, data structures, and problem solving.
- Record the reasoning behind each solution, not only its final code.
- Prepare for technical interviews through consistent, testable exercises.

## Technologies

- JavaScript with CommonJS
- Node.js 20 or later
- Native `node:test` and `node:assert/strict`
- npm and GitHub Actions

## JavaScript Interactive Reference

The repository also includes a standalone educational web application for studying JavaScript APIs, data structures, algorithms, and complexity. Its source is in [apps/javascript-reference](apps/javascript-reference/README.md). It is configured for GitHub Pages at `https://y4nnls.github.io/leetcode-solutions/` after the repository workflow is pushed and Pages is enabled.

From the repository root:

```bash
npm run reference:dev
npm run reference:test
npm run reference:build
```

The application does not execute or alter LeetCode solutions.

## Repository Structure

```text
.
├── arrays-and-strings/
│   ├── 0001-two-sum/
│   ├── 0014-longest-common-prefix/
│   └── 0026-remove-duplicates-from-sorted-array/
├── linked-lists/0021-merge-two-sorted-lists/
├── math/{0009-palindrome-number,0013-roman-to-integer}/
├── shared/list-node.js
├── stack/0020-valid-parentheses/
├── scripts/
└── .github/workflows/tests.yml
```

Every exercise directory contains `solution.js`, `cases.json`, `solution.test.js`, and `NOTES.md`.

## Getting Started

Install a current Node.js LTS release (Node.js 20+). This project has no external runtime dependencies, so no installation step is necessary. From the repository root, run:

```bash
npm test
```

On Windows systems where PowerShell blocks `npm.ps1`, use `npm.cmd test` or change the execution policy according to your local policy.

## Running Tests

| Command | Purpose |
| --- | --- |
| `npm test` | Runs all active tests; pending tests are shown as skipped. |
| `npm run test:watch` | Runs active tests again when files change. |
| `npm run test:coverage` | Runs active tests with Node's native experimental coverage report. |
| `npm run validate` | Checks repository structure and then runs the active suite. |

Coverage is a signal for untested paths, not proof of correctness.

## Running a Single Exercise

Pass the problem number with or without leading zeroes:

```bash
npm run test:exercise -- 26
npm run test:exercise -- 26 --case 1
npm run test:exercise -- 26 --case 2
```

Without `--case`, every case in `cases.json` runs. With `--case N`, only the Nth object in that file runs; numbering starts at 1. The runner validates the position and reports the available range when it does not exist. Output from `console.log()` and errors from `solution.js` are inherited by the terminal, which makes the command suitable for debugging.

When an exercise is still pending, its tests may remain skipped even when selected. Activate them only after its implementation and cases are ready.

## Adding a New Exercise

Run the interactive generator and enter the requested metadata:

```bash
npm run new:exercise
```

It creates a topic directory and four starter files without overwriting an existing problem number. The generated solution starts as a placeholder, but its test file runs every case added to `cases.json`; add real cases and implementation, write the notes, update this table, and run `npm run validate` before calling the problem solved.

## Solved Problems

| Number | Problem | Difficulty | Topic | Status | Solution | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Two Sum | Easy | Arrays and Strings | Solved | [solution](arrays-and-strings/0001-two-sum/solution.js) | [notes](arrays-and-strings/0001-two-sum/NOTES.md) |
| 9 | Palindrome Number | Easy | Math | Solved | [solution](math/0009-palindrome-number/solution.js) | [notes](math/0009-palindrome-number/NOTES.md) |
| 13 | Roman to Integer | Easy | Math | Solved | [solution](math/0013-roman-to-integer/solution.js) | [notes](math/0013-roman-to-integer/NOTES.md) |
| 14 | Longest Common Prefix | Easy | Arrays and Strings | Solved | [solution](arrays-and-strings/0014-longest-common-prefix/solution.js) | [notes](arrays-and-strings/0014-longest-common-prefix/NOTES.md) |
| 20 | Valid Parentheses | Easy | Stack | Solved | [solution](stack/0020-valid-parentheses/solution.js) | [notes](stack/0020-valid-parentheses/NOTES.md) |
| 21 | Merge Two Sorted Lists | Easy | Linked Lists | Solved | [solution](linked-lists/0021-merge-two-sorted-lists/solution.js) | [notes](linked-lists/0021-merge-two-sorted-lists/NOTES.md) |
| 26 | Remove Duplicates from Sorted Array | Easy | Arrays and Strings | Solved | [solution](arrays-and-strings/0026-remove-duplicates-from-sorted-array/solution.js) | [notes](arrays-and-strings/0026-remove-duplicates-from-sorted-array/NOTES.md) |

## Progress

- Solved: 7
- In progress: 0
- Registered: 7

## Continuous Integration

The GitHub Actions workflow runs `npm run validate` for every push and pull request. It uses Node.js 20 and only reads repository contents. Its remote outcome can be checked after the workflow is pushed to GitHub.

## Learning Notes

Each `NOTES.md` is written in Brazilian Portuguese and explains the problem, reasoning, implementation, complexity, edge cases, and review questions. They are intended to be revisited while studying rather than copied directly into LeetCode.

## Resources

- [LeetCode](https://leetcode.com/)
- [LeetCode 75](https://leetcode.com/studyplan/leetcode-75/)
- [Node.js documentation](https://nodejs.org/docs/latest/api/)
- [Node.js Test Runner documentation](https://nodejs.org/docs/latest/api/test.html)
