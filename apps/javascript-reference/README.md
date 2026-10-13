# JavaScript Interactive Reference

A static Brazilian Portuguese learning library for JavaScript APIs, data structures, algorithms, and complexity. It is independent from this repository's LeetCode solutions.

## Stack and architecture

- React, TypeScript, and Vite
- Tailwind CSS for the responsive UI
- HashRouter so direct links work on GitHub Pages without a server-side fallback
- Vitest and React Testing Library for logic and UI
- Playwright for the essential E2E flow

Structured metadata lives in `src/data/catalog.ts`; presentation components do not mix educational content with logic. Visualizers in `src/lib/visualizers.ts` are deterministic simulations and never use `eval`, `new Function`, or visitor-supplied executable code.

## Development

```bash
npm install
npm run dev
npm run test
npm run typecheck
npm run lint
npm run build
```

For E2E testing, install the browser once and run:

```bash
npx playwright install chromium
npm run test:e2e
```

## Adding content

1. Add structured content to `src/data/catalog.ts`.
2. Include a correct description, signature, example, complexity caveat, and official reference.
3. Set `visualizer` only when a matching deterministic simulation exists in `src/lib/visualizers.ts`.
4. Add search, metadata, or visualizer tests whenever behavior changes.

## Complexity and limitations

The calculator displays illustrative `T(n) = c × f(n)` models, not benchmarks. Native APIs include caveats whenever ECMAScript does not guarantee an asymptotic bound. Entries without a specialized visualizer clearly present static examples instead of a fictional animation.

## GitHub Pages

Vite uses the `/leetcode-solutions/` base path and `deploy-reference.yml` publishes only `dist`. After pushing the workflow, enable **Settings > Pages > Build and deployment > Source > GitHub Actions** if needed. The expected URL is `https://y4nnls.github.io/leetcode-solutions/`.
