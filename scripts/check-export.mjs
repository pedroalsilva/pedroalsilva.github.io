import { spawnSync } from 'node:child_process';
import { readFile, stat, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

const production = process.argv.includes('--production');
const prefix = production ? '' : process.env.NEXT_PUBLIC_BASE_PATH || '';
const origin = 'https://pedroalsilva.github.io';
const routes = ['', 'world', 'resume', 'projects/retail-forecasting', 'projects/offshore-logistics', 'projects/fitz'];
let references = 0;
async function checkReference(url, from = '/') {
  if (/^(https?:|data:|mailto:|#|\/\/)/.test(url)) return;
  const clean = url.split(/[?#]/)[0];
  if (!clean) return;
  const resolved = clean.startsWith('/') ? clean : path.posix.join(path.posix.dirname(from), clean);
  assert.ok(!prefix || resolved.startsWith(prefix + '/'), `Missing base path: ${resolved}`);
  const local = decodeURIComponent(resolved.slice(prefix.length));
  assert.ok(!local.includes('..'), 'Unexpected traversal in exported URL');
  let filename = `out${local}`;
  if (local.endsWith('/')) filename += 'index.html';
  const entry = await stat(filename);
  assert.ok(entry.isFile(), `Expected a static file: ${filename}`);
  references++;
}
for (const route of routes) {
  const routePath = `/${route ? route + '/' : ''}`;
  const html = await readFile(`out${routePath}index.html`, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) await checkReference(match[1], `${prefix}${routePath}index.html`);
  assert.ok(!/\/Users\/|file:\/\/|[A-Z]:\\Users\\/.test(html), `Local filesystem path in ${routePath}`);
  if (production) {
    assert.ok(html.includes(`rel="canonical" href="${origin}${routePath}"`), `Incorrect canonical: ${routePath}`);
    assert.ok(!/name="robots" content="[^"]*noindex/.test(html), `Noindex on ${routePath}`);
    assert.ok(html.includes(`${origin}/images/og.png`), `Incorrect Open Graph image: ${routePath}`);
    assert.ok(!html.includes('http://localhost:'), `Localhost metadata on ${routePath}`);
  }
}
async function inspect(directory) {
  for (const file of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, file.name);
    if (file.isDirectory()) await inspect(filename);
    else if (filename.endsWith('.css')) {
      const css = await readFile(filename, 'utf8');
      for (const match of css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) await checkReference(match[1], `/${filename.slice(4)}`);
    }
  }
}
await inspect('out/_next');
const sitemap = await readFile('out/sitemap.xml', 'utf8');
const robots = await readFile('out/robots.txt', 'utf8');
if (production) {
  for (const route of routes) assert.ok(sitemap.includes(`${origin}/${route ? route + '/' : ''}`), `Sitemap missing ${route}`);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(robots.includes('Allow: /') && !robots.includes('Disallow: /'));
}
for (const file of ['images/og.png', '.nojekyll', '404.html']) await stat(`out/${file}`);
const documents = await readdir('public/documents').catch(error => {
  if (error.code === 'ENOENT') return [];
  throw error;
});
for (const file of documents) {
  assert.ok(file.endsWith('.pdf'), `Unexpected public document: ${file}`);
  const data = await readFile(`public/documents/${file}`);
  assert.ok(data.length > 100 && data.subarray(0,5).toString() === '%PDF-', `Invalid or empty PDF: ${file}`);
}
console.log(`Verified ${routes.length} routes, ${references} local HTML/CSS/font references, 404, OG, .nojekyll${production ? ', production canonicals, sitemap and robots' : ''}.`);

const notices = spawnSync(process.execPath, ['scripts/third-party-notices.mjs', '--check'], { stdio: 'inherit' });
assert.equal(notices.status, 0, 'Third-party notice verification failed');
