# Website illustration sources

Only the five files listed here are published. Images are used at the project owner's request; this repository does not grant a separate image reuse license.

| Website file | Source / purpose | Demo letter |
| --- | --- | --- |
| images/studio-ru.jpg | Existing public illustration `74faec6e-c036-45a7-bd31-7c2023ce1c90` — artist studio | К |
| images/winter-ru.jpg | Existing public illustration `ed7120a5-7ff9-4755-8ffc-62793f8515dc` — winter evening | С |
| images/studio-en.png | English adaptation of studio; generated with built-in imagegen, 2026-09-04 | C |
| images/winter-en.png | English adaptation of winter; generated with built-in imagegen, 2026-09-04 | S |
| images/6b06919d-8891-45b4-80e6-f37995adb02c.jpg | Exact personalized “Gugark” example requested by owner; unchanged | Showcase |

Russian sources and custom sample are byte-identical copies of existing published images. English source prompts: [prompts.md](prompts.md). The English adaptations add visible C/S objects; the vocabulary in `site/scenes.js` is manually curated and intentionally non-exhaustive. The faint/missing requested smoke was excluded from winter answers after inspection. Russian and English rounds are separate local demo games, not translations of production scoring.

## Annotation layers

`annotations.js` stores contours, label positions and optional leader endpoints in a 1000 × 750 plane. The viewer scales that SVG plane with the original image; it never changes source raster files. Four demo maps cover every object ID in `site/scenes.js`, with names resolved from the corresponding locale. The custom example has separate hand-curated К/C showcase lists. They illustrate possible answers, rather than claim an exhaustive inventory of everything a player may name.

For a new demo object, add its contour and label position to the matching map. Prefer a close polygon for an irregular object and an ellipse for round objects or regions. Check alignment and label spacing in the viewer at 100% and intermediate reveal, at desktop and phone sizes, then run `bun run verify`.

`fonts/Caveat.ttf` is the Cyrillic/Latin variable Caveat handwriting font from the [official Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/caveat), downloaded 2026-09-04. The SIL Open Font License is retained at `fonts/OFL.txt` and deployed alongside the font. No external font service is contacted at runtime.
