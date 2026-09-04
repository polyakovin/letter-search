import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist', import.meta.url));
const server = Bun.serve({
  hostname: '127.0.0.1',
  port: 4173,
  async fetch(request) {
    try {
      const url = new URL(request.url);
      let name = decodeURIComponent(url.pathname);
      if (name.startsWith('/letter-search/'))
        name = name.slice('/letter-search'.length);
      const path = resolve(
        root,
        `.${name}${name.endsWith('/') ? 'index.html' : ''}`,
      );
      if (!path.startsWith(root + sep))
        return new Response('Not found', { status: 404 });
      const file = Bun.file(path);
      if (!(await file.exists()))
        return new Response('Not found', { status: 404 });
      return new Response(file, { headers: { 'Cache-Control': 'no-store' } });
    } catch {
      return new Response('Bad request', { status: 400 });
    }
  },
});
console.log(`Preview: ${server.url}letter-search/`);
