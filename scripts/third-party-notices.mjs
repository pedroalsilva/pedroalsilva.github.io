import { readFile, readdir, writeFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Include the complete installed production dependency tree, plus vendored
// notices (notably Next.js). This deliberately includes build-only notices too.
export async function collectNotices() {
  const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
  const records = [];
  async function walk(directory) {
    for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name, 'en'))) {
      if (entry.name === 'node_modules' || entry.isSymbolicLink()) continue;
      const filename = `${directory}/${entry.name}`;
      if (entry.isDirectory()) await walk(filename);
      else if (/^(licen[cs]e|copying|notice|copyright)([.-]|$)/i.test(entry.name)) {
        records.push({ file: filename.replace(/^node_modules\//, ''), text: await readFile(filename, 'utf8') });
      }
    }
  }
  for (const [directory, metadata] of Object.entries(lock.packages).sort()) {
    if (!directory || metadata.dev) continue;
    // Platform-native compiler/image binaries are build tools, never exported.
    if (/node_modules\/(?:@img\/|@next\/swc-|@tailwindcss\/oxide-|lightningcss-)/.test(directory)) continue;
    try { await stat(directory); } catch (error) {
      if (error.code === 'ENOENT' && metadata.optional) continue;
      throw error;
    }
    if (directory === 'node_modules/client-only') {
      records.push({ file: 'client-only (React MIT license)', text: await readFile('node_modules/react/LICENSE', 'utf8') });
      continue;
    }
    if (directory === 'node_modules/@next/env') {
      records.push({ file: '@next/env (Next.js MIT license)', text: await readFile('node_modules/next/license.md', 'utf8') });
      continue;
    }
    const before = records.length;
    await walk(directory);
    assert.ok(records.length > before, `Missing license notice for ${directory}; review before distributing.`);
  }
  assert.ok(records.length > 0, 'No third-party notices collected');
  return 'THIRD-PARTY LICENSE NOTICES\n\nFull notices from installed locked production dependencies and their vendored components.\nThis conservative inventory also includes build dependencies; inclusion does not imply every component is shipped to the browser.\nOriginal project artwork is described in ASSETS.md.\n\n' + records.map(record => `===== ${record.file} =====\n${record.text}\n`).join('\n');
}

const expected = await collectNotices();
if (process.argv.includes('--check')) {
  assert.equal(await readFile('public/THIRD_PARTY_NOTICES.txt', 'utf8'), expected, 'Source notices are stale');
  assert.equal(await readFile('out/THIRD_PARTY_NOTICES.txt', 'utf8'), expected, 'Export notices missing or incomplete');
  console.log('Verified full dependency and vendored notices in static output.');
} else {
  await writeFile('public/THIRD_PARTY_NOTICES.txt', expected);
  console.log(`Generated third-party notices (${Buffer.byteLength(expected)} bytes).`);
}
