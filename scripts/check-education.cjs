// Run: node scripts/check-education.cjs (Node.js, no packages needed).
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
for(const f of fs.readdirSync('.').filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(f,'utf8');for(const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){if(!m[1].includes('application/ld+json'))new vm.Script(m[2],{filename:f});}}
for(const f of ['guide.html','peptide.html','stack.html']){const h=fs.readFileSync(f,'utf8');assert(!/priceFrom\(|miraiVial.render|portal.html\?view=client|assets\/pricing.js/.test(h),f+' contains a sales route');}
const affiliate=fs.readFileSync('affiliates.html','utf8');assert(!/<form|mirai_public_apply|createClient/.test(affiliate));assert(affiliate.includes('Affiliate program closed'));
const portal=fs.readFileSync('portal.html','utf8');assert(portal.includes('registrationOpen:false'));assert(portal.includes('Prior order records'));assert(portal.includes('async function renderSupport('));assert(!portal.includes('Pay approved order'));
assert(fs.readFileSync('assets/age-gate.js','utf8').includes('Existing account / owner sign-in'));
console.log('PASS: scripts parse; public sales routes/art/prices removed; affiliate intake removed; historical support retained.');
