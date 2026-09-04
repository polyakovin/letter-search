# Letter Search website

- This is the public static website repository `polyakovin/letter-search`, separate from the private Telegram bot. Resolve Git root and inspect status before changes.
- Bun 1.1.38; dependency-free ES modules. Use `bun run verify` as the gate and `bun run dev` for local preview. Do not introduce an alternative package manager or lockfile without a justified dependency change.
- Pure demo rules live in `src/services/demo.js`; DOM/timers are in `site/app.js`. Add focused tests for behavioral changes. No bot modules or production state.
- RU root and `/en/` must both work at the Pages `/letter-search/` prefix. Keep all UI copy localized, game answers in memory and answer-list limits explicit.
- Images and provenance live in `content/`. Build copies only selected assets to `dist/`; never publish repository root, private source code, `.env`, logs, credentials or user records.
- Enquiry URL is `CONTACT` in `site/content.js`. Preserve user-confirmed contacts; don't guess personal addresses. Scope deployment to this site's GitHub Pages workflow.
- Read `specs/001-bilingual-website/` and update a bounded spec/plan/tasks for behavior changes. Verify desktop/phone layout, both locales and the actual Pages deployment before declaring publication successful.
