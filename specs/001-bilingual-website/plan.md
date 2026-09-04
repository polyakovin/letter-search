# Implementation Plan: Bilingual website
**Date**: 2026-09-04 · **Spec**: [spec.md](spec.md)

## Summary
Create a self-contained static site in the empty public repository. Render two HTML locale pages at build time, serve shared CSS and JS ES modules, copy only five selected images and pure demo modules to dist. GitHub Actions deploys dist to Pages.

## Technical Context
- Bun 1.1.38, JavaScript ES modules with JSDoc and TypeScript checkJs when available, HTML/CSS. No third-party production dependencies, no lockfile required for a dependency-free package.
- Pure state and validation in src/services/demo.js; DOM boundary in site/app.js; localized public copy and per-scene catalog in site/content.js and site/scenes.js.
- Build scripts/build.js uses an explicit allowlist; no bot imports, credentials, runtime records or full-repository upload.
- Controlled Bun unit tests cover timer deadline, normalization, letter validation, aliases and result state. Static integrity check verifies output links, locales, exact custom image and no source leakage.
- Responsive paper/ink/coral visual design; image loading/error handling, reduced-motion and native accessible dialog.
- Output dist/index.html (ru), dist/en/index.html (en). Relative paths support /letter-search/ on Pages and local root. Language switch navigates and restarts demo with explicit notice.
- Browser answers stay in memory, lost on reload; no analytics or external font service.

## Constitution Check
Use source-project constraints as an operational baseline: spec before code, pure game module, deterministic tests and `bun run verify`, explicit content ownership, no runtime data, scoped authorized Pages deployment. The new website is a separate repository and does not import or amend private source constitution/templates. No production bot actions. Source-project `bun run verify` will also be run as requested in its working agreement. No deviations needed; single standalone web runtime boundary is documented here.

## Project Structure / task-owned paths
`site/`, `src/services/demo.js`, `src/services/demo.test.js`, `scripts/`, `content/`, `specs/001-bilingual-website/`, `.github/workflows/pages.yml`, `package.json`, `.bun-version`, `.gitignore`, `README.md`, `AGENTS.md`. All are new paths in the empty public repository. The private bot worktree has no task-owned modifications.

## Failure and recovery
No network needed during play. Missing image blocks Start and offers Reload. Late submits finish without adding words. Unknown words explain limited dictionary. Failed CI leaves previous Pages deployment intact; fix forward and rerun. No backend, timers, telemetry or external storage are introduced.
