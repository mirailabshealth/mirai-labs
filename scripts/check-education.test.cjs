'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { validate, publicFiles, retired, historical } = require('./check-education.cjs');
const repository = path.resolve(__dirname, '..');

function fixture(t) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mirai-education-'));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const sourceRoot = path.join(temp, 'source');
  const siteRoot = path.join(temp, 'site');
  for (const dir of [sourceRoot, siteRoot]) {
    for (const file of publicFiles) write(dir, file, fs.readFileSync(path.join(repository, file)));
  }
  write(sourceRoot, '_config.yml', fs.readFileSync(path.join(repository, '_config.yml')));
  return { sourceRoot, siteRoot };
}
function write(root, file, content) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), content);
}

test('educational source and complete buildless artifact pass', t => {
  const f = fixture(t);
  assert.match(validate({ sourceRoot: f.sourceRoot }), /45 evidence profiles/);
  assert.match(validate(f), /19 published files/);
});

for (const file of retired) test(`unreferenced retired source fails: ${file}`, t => {
  const f = fixture(t);
  write(f.sourceRoot, file, 'obsolete');
  assert.throws(() => validate(f), /retired commercial asset restored/);
});

for (const file of [...retired, ...historical, 'supabase/portal.sql', 'OWNER-WORKFLOW.html',
  'scripts/check-education.cjs', 'nested/renamed-table.json']) {
  test(`unlinked artifact fails: ${file}`, t => {
    const f = fixture(t);
    write(f.siteRoot, file, 'obsolete');
    assert.throws(() => validate(f), /unexpected published asset/);
  });
}

test('unknown nested source files fail without an HTML reference', t => {
  const f = fixture(t);
  write(f.sourceRoot, 'assets/legacy/rates.json', '{"tiers":[100,90,80]}');
  assert.throws(() => validate(f), /Unexpected or missing public source file/);
});

test('renamed pricing data inside an approved script fails', t => {
  const f = fixture(t);
  fs.appendFileSync(path.join(f.sourceRoot, 'assets/data.js'), '\nconst miraiPrices = {};');
  assert.throws(() => validate({ sourceRoot: f.sourceRoot }), /commercial data or integration/);
});

test('published integration added to an approved script fails', t => {
  const f = fixture(t);
  fs.appendFileSync(path.join(f.siteRoot, 'assets/age-gate.js'), '\ncreateClient("test");');
  assert.throws(() => validate(f), /commercial data or integration/);
});

test('currency amounts and structured offers fail in approved public files', t => {
  for (const payload of ['<p>$99 per month</p>', '<p>USD 99</p>',
    '<script type="application/ld+json">{"@type":"Offer"}</script>']) {
    const f = fixture(t);
    fs.appendFileSync(path.join(f.sourceRoot, 'index.html'), payload);
    assert.throws(() => validate({ sourceRoot: f.sourceRoot }), /commercial data or integration/);
  }
});

test('broken local section anchors fail', t => {
  const f = fixture(t);
  fs.appendFileSync(path.join(f.sourceRoot, 'index.html'), '<a href="context.html#missing-section">Context</a>');
  assert.throws(() => validate({ sourceRoot: f.sourceRoot }), /missing anchor/);
});

test('stale inventory summaries cannot disagree with the evidence layer', t => {
  const f = fixture(t);
  const file = path.join(f.sourceRoot, 'assets/data.js');
  fs.appendFileSync(file, '\npeptides[0].keyFindings="An obsolete trial summary.";');
  assert.throws(() => validate({ sourceRoot: f.sourceRoot }), /inventory findings are stale/);
});

test('missing pages and scientific assets fail', t => {
  const f = fixture(t);
  fs.unlinkSync(path.join(f.siteRoot, 'research-evidence.js'));
  assert.throws(() => validate(f), /missing published asset/);
});

test('changed artifact content fails even if structurally valid', t => {
  const f = fixture(t);
  fs.appendFileSync(path.join(f.siteRoot, 'index.html'), '\n<!-- unreviewed -->');
  assert.throws(() => validate(f), /published content differs/);
});

test('local links cannot point to excluded historical records', t => {
  const f = fixture(t);
  fs.appendFileSync(path.join(f.sourceRoot, 'index.html'), '<a href="./OWNER-WORKFLOW.md">History</a>');
  assert.throws(() => validate({ sourceRoot: f.sourceRoot }), /broken or unpublished local reference/);
});

test('Jekyll bypass, lost exclusions and include overrides fail', t => {
  const f = fixture(t);
  write(f.sourceRoot, '.nojekyll', '');
  assert.throws(() => validate(f), /nojekyll bypasses/);
  fs.unlinkSync(path.join(f.sourceRoot, '.nojekyll'));
  const config = JSON.parse(fs.readFileSync(path.join(f.sourceRoot, '_config.yml')));
  write(f.sourceRoot, '_config.yml', JSON.stringify({ ...config, include: ['payment-email-source.zip'] }));
  assert.throws(() => validate(f), /include overrides/);
  write(f.sourceRoot, '_config.yml', JSON.stringify({ ...config, exclude: config.exclude.filter(x => x !== 'supabase') }));
  assert.throws(() => validate(f), /Pages exclusions changed/);
});

test('symlinks cannot smuggle historical files into the artifact', t => {
  const f = fixture(t);
  fs.unlinkSync(path.join(f.siteRoot, 'assets/data.js'));
  fs.symlinkSync(path.join(f.sourceRoot, 'assets/data.js'), path.join(f.siteRoot, 'assets/data.js'));
  assert.throws(() => validate(f), /symbolic links are not publishable/);
});
