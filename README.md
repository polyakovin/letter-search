# Letter Search / Найди на букву

A bilingual picture word game website for [the Letter Search project](https://t.me/letter_search).

- [Русская версия](https://polyakovin.github.io/letter-search/)
- [English version](https://polyakovin.github.io/letter-search/en/)

Two-minute browser demos, group-play ideas and a personalized illustration showcase. The English demos use adapted artwork and English vocabulary. The Telegram game is in Russian.

## Develop

Use **Bun 1.1.38** (see `.bun-version`). There are no external dependencies and no install step.

```sh
bun run verify
bun run dev
```

Open http://127.0.0.1:4173/letter-search/ or `/letter-search/en/`. The local server also supports `/` and `/en/`. Production is static; no Bun runtime runs on GitHub Pages.

`bun run verify` runs focused pure-logic tests, builds both locale pages, checks links/anchors/module syntax, validates scene aliases and checks the deployment allowlist. No real Telegram/network/user data is used.

## Structure

- `site/content.js`: all Russian/English copy and enquiry contact URL.
- `site/scenes.js`: language-specific scenes and object-level accepted aliases.
- `site/template.js`, `site/style.css`: HTML rendering and responsive design.
- `site/app.js`: browser game UI and image loading.
- `site/viewer.js`, `src/services/viewer.js`: accessible picture viewer, reveal/zoom UI and pure geometry.
- `src/services/demo.js`: pure round state, deadline and word checking.
- `content/`: five selected illustrations, six localized SVG annotation maps, licensed handwriting font and provenance.
- `scripts/`: build, preview and integrity checks.
- `specs/`: bilingual website and annotated viewer contracts, plans and validation.

## Demo rules and data

Ready → Start → 120 seconds → results. Input accepts spaces, commas or newlines. Case, Russian ё/е and aliases are normalized; multiple names for one object earn one point. Unknown words are explicitly marked as absent from the limited demo list rather than declared incorrect. Answers remain in memory only. Reload, changing language or changing scene starts fresh. Deadline calculation handles background tabs and late submissions.

The site has no analytics, account system, cookies, remote answer validation or form backend. A contact link opens Telegram; until the owner supplies a dedicated address, it leads to the project's public community. Do not invent a personal handle. `CONTACT` in `site/content.js` is the only enquiry URL setting.

## Picture viewer

Click any hero, demo or personalized picture to open it in a full-viewport dialog. The bottom slider reveals outlines and handwritten object names from left to right; its endpoints switch directly between the original and complete annotations. All four demo pictures have annotations matching their accepted noun IDs. The personalized example has separate К/C lists and does not affect demo scoring.

The viewer supports keyboard range controls, Escape/Close with focus restoration, 2× zoom with native scrolling and optional browser fullscreen where available. Opening it does not pause an active round. If an image fails to load, Retry and the original-file link remain available. Without JavaScript, picture links open the original files.

Artwork remains unchanged: annotations use a normalized SVG layer, and Caveat is served locally under its included SIL Open Font License. See [content/README.md](content/README.md) for annotation maintenance.

## Publish / rollback

The target is this public website repository, `polyakovin/letter-search`. It is independent of the private bot repository. Never copy the bot's `.git`, credentials, runtime records or unselected content.

1. Run `bun run verify` and review the scoped diff.
2. Push to `main`; `.github/workflows/pages.yml` verifies and uploads only `dist/`.
3. Repository Settings → Pages → Source must be **GitHub Actions** (initial setup).
4. Await the Pages workflow for the deployed commit; check the two public URLs and their demo images/modules.

For a failed workflow, fix and push or manually dispatch `pages.yml`. To roll back a deployed change, revert its commit and push normally; never force-push. The last successful deployment remains available if a later build fails.
