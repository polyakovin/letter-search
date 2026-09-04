# Validation — 2026-09-04

## Local release gate
- Bun 1.1.38: `bun run verify` passed: 12 tests, 2166 assertions, both locale builds and the deployment allowlist/link/module check.
- Every accepted demo object ID appears exactly once in its corresponding annotation map; all six localized views have valid coordinates and target-letter labels. No source raster changed.
- Browser inspection: all six annotated compositions; corrected label collisions and outlines against original pictures. Caveat loads locally and covers both scripts.
- Desktop 1440×1000 and 1440×900; portrait phone 375×812; landscape phone 812×375. Fit shows the whole picture; 2× zoom expands a scrollable stage. Bottom controls remain visible, including during zoom.
- Original, 50% reveal and full annotations reviewed. Home/End/arrows/PageUp update both slider and clip. Range resets to original on each open.
- Hero, current demo and custom-image entry points work in RU and EN; switching scenes changes the picture, letter and annotations. Close/Escape restore opener focus and remove page scroll lock. Browser fullscreen enters/exits; the full-viewport viewer remains the baseline.
- An active RU round continued from 02:00 to 01:41 with the viewer open; after closing, submitting “кот кисть” yielded 2 points. Existing deadline and scoring tests remain unchanged and pass.
- A deliberately missing local winter image displayed the localized error and Retry while Close stayed available. After restoring the preview asset, Retry loaded the 1451-pixel image and enabled the 100% overlay. The source raster was untouched.

## Convergence
FR1–FR6 are implemented and checked above. FR7 has unchanged image files, local font/license, a restricted static deployment, and publication as the final gate. No new product scope or backend work is required.

## Publication
Pending the scoped commit's existing GitHub Pages workflow and live RU/EN smoke check.
