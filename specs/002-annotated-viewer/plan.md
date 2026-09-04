# Plan
- Keep raster sources unchanged. Version hand-authored vector contours/label positions in content/annotations.js using a shared 1000×750 image coordinate space and locale-specific maps. Generate SVG DOM overlays at runtime; clip them horizontally according to a native bottom range slider.
- Use locally served Caveat font (Latin/Cyrillic) from Google Fonts under OFL with license included. No third-party JavaScript/dependencies.
- site/viewer.js owns a native modal dialog expanded to viewport, zoom/fit controls, optional browser fullscreen on documentElement (dialog itself is not eligible), safe closing and async image loading. Range resets on every open. Fullscreen failure retains viewport dialog. Object overlay geometry and normalized range are pure/testable in src/services/viewer.js.
- site/template.js wraps hero/custom imagery in links enhanced by viewer; main game image and enlarge control open the current scene. Preserve no-JS original links and English/Russian copy. Viewer does not mutate round state or deadline.
- Fit stage uses matching image and SVG bounds; at 2× scale stage scrolls under fixed header/footer. Include accessible annotated word list only when annotations are revealed.
- scripts/build.js and check.js explicitly allow font and overlay modules. Focused tests validate all vocabulary IDs, target letters, geometry bounds, unique labels, slider extremes, localization and all entry point markup.
- Checks: bun run verify, browser desktop/mobile, six annotated compositions, full screen/fallback, Esc/focus, slider and zoom, unchanged demo; push and verify Pages.

Task-owned paths: site/viewer.js, site/template.js, site/style.css, site/app.js, site/content.js, content/annotations.js, content/fonts/, content/README.md, src/services/viewer.js, src/services/viewer.test.js, scripts/build.js, scripts/check.js, README.md, specs/002-annotated-viewer/.
