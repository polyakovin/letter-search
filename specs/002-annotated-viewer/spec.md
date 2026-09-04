# Fullscreen annotated picture viewer
Created: 2026-09-04. Follow-up to [001-bilingual-website](../001-bilingual-website/spec.md).

## User stories
- US1: Open any project illustration (hero, either current demo scene, custom example) in a screen-filling viewer by click/tap or keyboard. Close returns focus and page position.
- US2: Move the bottom slider from Original (0) to With words (100). A continuous left-to-right reveal exposes hand-drawn outlines and handwritten names aligned to the same unchanged picture. Initial state is always original.
- US3: Read labels in the current locale and for the picture's target letter. All demo vocabulary objects have a matching annotation. The custom example uses К in Russian, C in English; it is a showcase rather than a new scored round.

## Requirements and acceptance
- FR1: All visible illustrative images are keyboard-accessible viewer entry points; no-JS links still open original files.
- FR2: Viewer fills the viewport, offers browser fullscreen where available, and remains usable if fullscreen is unavailable/denied. Close/Escape and focus restoration work without moving the underlying page.
- FR3: Bottom native range 0–100 controls annotation reveal; endpoints are also buttons. Keyboard Home/End/arrows and pointer/touch work. Original pixels and dimensions do not change.
- FR4: Each prepared target object has an accurately positioned outline, optional leader and handwritten readable localized name. Different locale compositions have separate coordinates. All five images and six localized views are covered.
- FR5: Bottom controls remain visible on phones; users can zoom and pan the image for readable small details. Labels and outlines scale together. Loading failures show a retry with close still available.
- FR6: Existing scoring, timer and locale navigation remain compatible. Timer continues in viewer; hints are explicitly available in this demonstration and remain user-controlled.
- FR7: Existing source images remain byte-identical. No API runtime, answer upload or external font requests. Publish the verified update to existing GitHub Pages.

## Success criteria
All 3 illustration surfaces × 2 languages open; both demo scenes use the correct overlay. 0/50/100 states match source coordinates. Desktop 1440×900 and phone 375×812 retain visible controls, no clipped image at fit, accessible close. Demo tests and build gate pass; actual live site reviewed.

## Non-goals
No exhaustive dictionary/image recognition promise, image regeneration, custom-image scoring, persistence or changes to Telegram. This supersedes only the demo-only enlargement contract from 001; the rest of that feature remains compatible.
