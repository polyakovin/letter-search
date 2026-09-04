# Tasks: Bilingual website
## Phase 1: Setup
- [x] T001 Verify empty public target and create isolated checkout; record boundaries in specs/001-bilingual-website/plan.md.
- [x] T002 Write specification, design and UI contract in specs/001-bilingual-website/.
## Phase 2: Foundation
- [x] T003 Add dependency-free Bun build, preview and checks in package.json and scripts/; add .gitignore and .bun-version.
- [x] T004 Add reviewed image catalog and asset provenance in content/README.md and site/scenes.js.
## Phase 3: US1 — Russian explanation and demo
- [x] T005 [US1] Test timer, normalization, validation and aliases in src/services/demo.test.js.
- [x] T006 [US1] Implement pure round engine in src/services/demo.js.
- [x] T007 [US1] Build responsive page template/styles and Russian copy in site/; implement accessible demo controller in site/app.js.
## Phase 4: US2 — English
- [x] T008 [US2] Generate and visually review English studio/winter images in content/images/; document prompts in content/prompts.md.
- [x] T009 [US2] Add full English copy and scene vocabulary in site/content.js and site/scenes.js; render /en/ via scripts/build.js.
## Phase 5: US3 — Group and custom use
- [x] T010 [US3] Add group-use cases, exact custom image and confirmed contact to site/content.js and page template.
## Phase 6: Delivery
- [x] T011 Verify built links, asset allowlist and locales in scripts/check.js; browser QA desktop/mobile and both demos.
- [x] T012 Document operation and validation in README.md and AGENTS.md; run bun run verify here and source-project gate.
- [ ] T013 Add .github/workflows/pages.yml; publish target main and enable Pages; verify both public URLs.
- [ ] T014 Perform spec/plan/task convergence and record actual verification in specs/001-bilingual-website/validation.md.

## Dependencies and strategy
T003–T004 precede US1. T005 precedes T006. US2 builds on US1 with images prepared independently; T010 copy can be prepared alongside T008. T011–T014 follow all stories. Deliver full requested scope, starting with playable RU scene. No parallel code writers needed.
