import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { scenes } from '../site/scenes.js';
import { normalize } from '../src/services/demo.js';
const root = resolve(import.meta.dir, '../dist');
for (const locale of ['ru', 'en']) {
  const page = join(root, locale === 'ru' ? 'index.html' : 'en/index.html');
  const html = await readFile(page, 'utf8');
  assert(html.includes(`<html lang="${locale}">`));
  assert(!/undefined|null|TODO|NEEDS CLARIFICATION/.test(html));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|data:)/.test(ref)) continue;
    if (ref.startsWith('#')) {
      assert(ids.includes(ref.slice(1)), `Missing anchor ${ref}`);
      continue;
    }
    const path = resolve(dirname(page), ref);
    assert(path.startsWith(root), `Escaped dist ${ref}`);
    assert(
      (await stat(path)).isFile() ||
        (await stat(join(path, 'index.html'))).isFile(),
    );
  }
  for (const scene of scenes[locale]) {
    const aliases = new Map();
    const objectIds = new Set();
    for (const object of scene.objects) {
      assert(!objectIds.has(object.id));
      objectIds.add(object.id);
      for (const alias of object.aliases) {
        const norm = normalize(alias);
        assert(
          norm.startsWith(normalize(scene.letter)),
          `Wrong letter ${alias}`,
        );
        assert(
          !aliases.has(norm) || aliases.get(norm) === object.id,
          `Alias collision ${alias}`,
        );
        aliases.set(norm, object.id);
      }
    }
    assert(scene.objects.length >= 10);
  }
  assert(html.includes('6b06919d-8891-45b4-80e6-f37995adb02c.jpg'));
  assert.equal((html.match(/class="case"/g) ?? []).length, 4);
}
const allowed = new Set([
  'index.html',
  'en/index.html',
  'robots.txt',
  'sitemap.xml',
  'assets/favicon.svg',
  'assets/style.css',
  'assets/app.js',
  'assets/content.js',
  'assets/scenes.js',
  'assets/demo.js',
  ...Object.values(scenes)
    .flat()
    .map((s) => `assets/${s.image}`),
  'assets/6b06919d-8891-45b4-80e6-f37995adb02c.jpg',
]);
async function walk(path, prefix = '') {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const rel = `${prefix}${entry.name}`;
    if (entry.isDirectory()) await walk(join(path, entry.name), `${rel}/`);
    else assert(allowed.has(rel), `Unexpected deployed file ${rel}`);
  }
}
await walk(root);
for (const file of ['app.js', 'content.js', 'scenes.js', 'demo.js']) {
  const source = await readFile(join(root, 'assets', file), 'utf8');
  new Bun.Transpiler({ loader: 'js' }).transformSync(source);
  for (const [, relative] of source.matchAll(/from ['"](\.\/[^'"]+)['"]/g)) {
    assert((await stat(resolve(root, 'assets', relative))).isFile());
  }
}
console.log(
  'Verified locales, relative links, anchors, modules, 4 scenes, aliases and deployment allowlist.',
);
