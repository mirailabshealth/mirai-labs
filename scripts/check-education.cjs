// Source: node scripts/check-education.cjs
// Actual Jekyll output: node scripts/check-education.cjs --site _site
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const repository = path.resolve(__dirname, '..');
const publicFiles = require('./public-files.json');
const retired = [
  'assets/pricing.js', 'assets/vial-sizes.js', 'analytics.js',
  'vial-art.js', 'vial-art.css', 'vial-front.png',
];
const historical = [
  'affiliate-code-source.zip', 'affiliate-tiers-source.zip', 'analytics-source.zip',
  'customer-order-email-source.zip', 'inventory-workflow-source.zip',
  'notification-automation-source.zip', 'owner-order-alerts-source.zip',
  'payment-email-source.zip', 'registration-update-source.zip',
  'standard-shipping-source.zip', 'support-source.zip',
];
const exclusions = [
  '.github', '.gitignore', 'scripts', 'supabase', 'EDUCATION-ONLY.md',
  'OWNER-WORKFLOW.md', 'node_modules', '_site', ...historical, ...retired,
].sort();
// The default GitHub Pages theme may emit this stylesheet. Nothing else is
// implicitly allowed, including unreferenced files, archives or source maps.
const generatedFiles = ['assets/css/style.css'];
const commercialSignals = [
  /\b(?:miraiPrices|miraiPriceVersion|priceQuote|priceMoney|priceFrom|priceText|vialSizes|miraiVial|miraiAnalytics|createClient)\b/i,
  /\bmirai_(?:public_apply|create_order|track|checkout|payment)\b/i,
  /(?:pricing|vial-sizes|vial-art|analytics)\.js|vial-front\.png/i,
  /\.supabase\.(?:co|in)\b|formspree\.io|js\.stripe\.com|paypal\.com\/sdk|buy\.stripe\.com/i,
  /\b(?:price_cents|unit_price_cents|priceCents|unitPriceCents|quantity_tiers|audienceDiscount)\b/i,
  /USD\s+cents\s+per\s+vial|public\s+customer\s+estimates/i,
];

function inventory(root, skip = () => false, dir = '') {
  const result = [];
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const file = dir ? `${dir}/${entry.name}` : entry.name;
    if (skip(file)) continue;
    assert(!entry.isSymbolicLink(), `${file}: symbolic links are not publishable`);
    if (entry.isDirectory()) result.push(...inventory(root, skip, file));
    else {
      assert(entry.isFile(), `${file}: unsupported file type`);
      result.push(file);
    }
  }
  return result.sort();
}

function checkSource(root) {
  assert(!fs.existsSync(path.join(root, '.nojekyll')), '.nojekyll bypasses publication exclusions');
  // JSON is a YAML subset. Keep this config intentionally small and parseable
  // with Node alone, so validation and Jekyll use exactly the same exclusions.
  const config = JSON.parse(fs.readFileSync(path.join(root, '_config.yml'), 'utf8'));
  assert.deepEqual(Object.keys(config).sort(), ['exclude', 'include'], 'Unexpected Pages configuration');
  assert.deepEqual(config.include, [], 'Jekyll include overrides must remain empty');
  assert.deepEqual([...config.exclude].sort(), exclusions, 'Pages exclusions changed; review publication policy');
  for (const file of retired) assert(!fs.existsSync(path.join(root, file)), `${file}: retired commercial asset restored`);
  const files = inventory(root, file => file === '.git' || file === '_config.yml' ||
    exclusions.some(excluded => file === excluded || file.startsWith(`${excluded}/`)));
  assert.deepEqual(files, [...publicFiles].sort(), 'Unexpected or missing public source file; review scripts/public-files.json');
  return files;
}

function checkArtifact(root) {
  const files = inventory(root);
  for (const file of files) {
    assert(publicFiles.includes(file) || generatedFiles.includes(file), `${file}: unexpected published asset`);
  }
  for (const file of publicFiles) assert(files.includes(file), `${file}: missing published asset`);
  return files;
}

function checkContent(root, files) {
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  for (const file of files) {
    const text = read(file);
    for (const signal of commercialSignals) assert(!signal.test(text), `${file}: commercial data or integration (${signal})`);
    if (file.endsWith('.js')) new vm.Script(text, { filename: file });
  }
  const html = files.filter(file => file.endsWith('.html'));
  assert.equal(html.length, 16, 'Educational pages must be preserved');
  for (const file of html) {
    const text = read(file);
    for (const match of text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!match[1].includes('application/ld+json')) new vm.Script(match[2], { filename: file });
    }
    const visible = text.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
    assert(!/\b(buy|cart|checkout|shipping|orders?|prices?|purchase|availability)\b/i.test(visible), `${file}: commercial language`);
    assert(text.includes('assets/age-gate.js'), `${file}: missing age gate`);
    assert(text.includes('safety.html'), `${file}: missing Safety navigation`);
    for (const match of text.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/gi)) {
      const ref = match[1];
      if (/^(?:https?:|mailto:|#)/i.test(ref)) continue;
      const local = decodeURIComponent(ref.split(/[?#]/)[0]);
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), local));
      assert(files.includes(target), `${file}: broken or unpublished local reference ${local}`);
    }
  }
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(read('assets/data.js') + '\n' + read('research-evidence.js') +
    '\nthis.catalog=peptides;this.profiles=researchEvidence;this.combination=getStackNote;this.render=renderEvidence;', ctx);
  assert.equal(ctx.catalog.length, 45);
  assert.equal(new Set(ctx.catalog.map(p => p.id)).size, 45);
  for (const p of ctx.catalog) {
    const e = ctx.profiles[p.id];
    for (const key of ['mechanism', 'findings', 'limits', 'safety']) assert(e[key]?.length > 20, `${p.id}: missing ${key}`);
    assert(e.sources.length, `${p.id}: missing sources`);
    assert(p.researchFocus.length);
    assert(ctx.render(p.id).includes('literature only'));
    for (const source of e.sources) assert(/^https:\/\//.test(source.url));
  }
  const combo = ctx.combination(ctx.catalog.map(p => p.id));
  assert(combo.details.length > 100);
  assert(combo.sources.length > 20);
  assert(ctx.combination(['klow', 'bpc-157']).details.toLowerCase().includes('duplicat'));
  return `${html.length} public pages; 45 evidence profiles; local links; age gate; full-selection combination notes; no commercial UI/integrations`;
}

function validate({ sourceRoot = repository, siteRoot } = {}) {
  const sourceFiles = checkSource(sourceRoot);
  const root = siteRoot || sourceRoot;
  const files = siteRoot ? checkArtifact(siteRoot) : sourceFiles;
  const result = checkContent(root, files);
  if (siteRoot) {
    // These files are buildless: no public content should change during Jekyll.
    for (const file of publicFiles) assert(
      fs.readFileSync(path.join(root, file)).equals(fs.readFileSync(path.join(sourceRoot, file))),
      `${file}: published content differs from reviewed source`);
  }
  return `PASS: ${files.length} ${siteRoot ? 'published' : 'public source'} files; ${result}.`;
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    assert(args.length === 0 || (args.length === 2 && args[0] === '--site'),
      'Usage: node scripts/check-education.cjs [--site PATH]');
    console.log(validate({ siteRoot: args.length ? path.resolve(args[1]) : undefined }));
  } catch (error) {
    console.error(`FAIL: ${error.message}`);
    process.exitCode = 1;
  }
}
module.exports = { validate, publicFiles, retired, historical };
