/**
 * Static asset sanity check — no build step; just confirm deployable files exist.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;

const REQUIRED = [
  'index.html',
  'index.js',
  'styles.css',
  'avatar.png',
  'fonts/InterVariable.woff2',
  'node_modules/@nurvus/spawn/index.js',
  'node_modules/particleground/jquery.particleground.min.js',
];

const missing = REQUIRED.filter((rel) => !fs.existsSync(path.join(ROOT, rel)));

if (missing.length) {
  console.error('Verify failed: missing files required for deploy:\n' + missing.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}

console.log(`Verify OK: ${REQUIRED.length} deploy assets present.`);
