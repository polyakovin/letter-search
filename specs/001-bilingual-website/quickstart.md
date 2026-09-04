# Validation
1. Use Bun 1.1.38; run `bun run verify` then `bun run build`.
2. Run `bun run dev` and open the printed localhost URL; test RU and /en/.
3. At desktop and phone sizes: start, enter accepted/repeated/wrong-letter/unlisted nouns; finish; replay; change scenes; enlarge and Escape-close image; switch language; confirm image load/error handling.
4. Check expiry at 120 seconds and after backgrounding. Pure tests also validate exact deadline boundary without waiting.
5. Push scoped verified files to target main, enable GitHub Pages workflow builds, await success and open both public locale URLs with images and demo scripts loading.
