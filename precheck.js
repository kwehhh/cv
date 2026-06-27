/**
 * Precheck
 *
 * Make sure Node + npm versions match the supported toolchain for this repo.
 * Same policy as imageslicer — keeps lockfile/npm install consistent across machines.
 *
 * Policy:
 * - Node: ^22.0.0  (>=22.0.0 <23.0.0)
 * - npm:  ^10.9.0  (>=10.9.0 <11.0.0)
 */
const { execSync } = require('node:child_process');

const REQUIRED = {
  node: { min: { major: 22, minor: 0, patch: 0 }, maxMajorExclusive: 23 },
  npm: { min: { major: 10, minor: 9, patch: 0 }, maxMajorExclusive: 11 },
};

function parseSemver(versionLike) {
  const raw = String(versionLike || '').trim();
  const cleaned = raw.startsWith('v') ? raw.slice(1) : raw;
  const match = cleaned.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]), raw };
}

function gte(a, b) {
  if (a.major !== b.major) return a.major > b.major;
  if (a.minor !== b.minor) return a.minor > b.minor;
  return a.patch >= b.patch;
}

function inCaretRange(v, range) {
  return (
    v.major < range.maxMajorExclusive &&
    v.major >= range.min.major &&
    gte(v, range.min)
  );
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

const nodeParsed = parseSemver(process.version);
if (!nodeParsed) {
  fail(`Precheck failed: unable to parse Node version from "${process.version}".`);
}

let npmVersionRaw = null;
try {
  npmVersionRaw = execSync('npm --version', { stdio: ['ignore', 'pipe', 'pipe'] })
    .toString()
    .trim();
} catch (e) {
  fail(`Precheck failed: unable to execute "npm --version". Is npm installed and on PATH?\n${e?.message || e}`);
}

const npmParsed = parseSemver(npmVersionRaw);
if (!npmParsed) {
  fail(`Precheck failed: unable to parse npm version from "${npmVersionRaw}".`);
}

const nodeOk = inCaretRange(nodeParsed, REQUIRED.node);
const npmOk = inCaretRange(npmParsed, REQUIRED.npm);

if (!nodeOk || !npmOk) {
  fail(
    [
      'Precheck failed: unsupported toolchain detected.',
      '- Required: Node ^22.0.0 (>=22.0.0 <23.0.0), npm ^10.9.0 (>=10.9.0 <11.0.0)',
      `- Detected: Node ${nodeParsed.raw}, npm ${npmParsed.raw}`,
      '',
      'Fix: nvm use 22 (or asdf/Volta), npm install -g npm@10, then re-run.',
    ].join('\n'),
  );
}

console.log(`Precheck OK: Node ${nodeParsed.raw}, npm ${npmParsed.raw}`);
