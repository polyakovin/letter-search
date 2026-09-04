import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { render } from '../site/template.js';
import { scenes } from '../site/scenes.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = `${root}dist`;
await rm(dist, { recursive: true, force: true });
await mkdir(`${dist}/en`, { recursive: true });
await mkdir(`${dist}/assets`, { recursive: true });
for (const locale of ['ru', 'en']) {
  await writeFile(
    `${dist}/${locale === 'en' ? 'en/' : ''}index.html`,
    render(locale),
  );
}
for (const file of [
  'style.css',
  'app.js',
  'content.js',
  'scenes.js',
  'viewer.js',
]) {
  await cp(`${root}site/${file}`, `${dist}/assets/${file}`);
}
await cp(`${root}src/services/demo.js`, `${dist}/assets/demo.js`);
await cp(`${root}content/annotations.js`, `${dist}/assets/annotations.js`);
await cp(`${root}src/services/viewer.js`, `${dist}/assets/viewer-model.js`);
await cp(`${root}content/fonts/Caveat.ttf`, `${dist}/assets/Caveat.ttf`);
await cp(`${root}content/fonts/OFL.txt`, `${dist}/assets/Caveat-OFL.txt`);
const images = [
  ...new Set(
    Object.values(scenes)
      .flat()
      .map((scene) => scene.image),
  ),
  '6b06919d-8891-45b4-80e6-f37995adb02c.jpg',
];
for (const file of images)
  await cp(`${root}content/images/${file}`, `${dist}/assets/${file}`);
await writeFile(
  `${dist}/assets/favicon.svg`,
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="13" fill="#d94d29"/><text x="32" y="47" text-anchor="middle" font-family="Georgia,serif" font-size="47" fill="#fff5df">L</text><circle cx="50" cy="50" r="5" fill="#efd586"/></svg>',
);
await writeFile(
  `${dist}/robots.txt`,
  'User-agent: *\nAllow: /\nSitemap: https://polyakovin.github.io/letter-search/sitemap.xml\n',
);
await writeFile(
  `${dist}/sitemap.xml`,
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://polyakovin.github.io/letter-search/</loc></url><url><loc>https://polyakovin.github.io/letter-search/en/</loc></url></urlset>',
);
console.log('Built Russian and English pages with 5 selected images in dist/.');
