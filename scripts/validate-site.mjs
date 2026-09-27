import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'index.html',
  'src/css/main.css',
  'src/js/main.js',
  'src/js/core/state.js',
  'src/js/core/pdf-utils.js',
  'src/js/core/i18n.js',
  'src/js/core/tools.js',
  'src/js/core/dom.js',
  'src/js/core/theme.js',
  'src/js/core/pdf-loader.js',
  'src/js/core/library-loader.js',
  'src/js/core/history.js',
  'src/js/page-theme.js',
  'sw.js',
  'legal/privacy-policy.html',
  'legal/terms-of-service.html',
  'legal/cookie-policy.html',
  'legal/disclaimer.html',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  '404.html',
  'tools/rotate.html',
  'tools/watermark.html',
  'tools/extract.html',
  'tools/pdf-images.html',
  'tools/text.html'
];

const errors = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing required file: ${file}`);
}

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const ref of ['./src/css/main.css', './src/js/main.js', './assets/icons/favicon.svg', './site.webmanifest', './sw.js', 'assets/og-image.svg']) {
  if (!index.includes(ref)) errors.push(`index.html is missing reference: ${ref}`);
}

const main = fs.readFileSync(path.join(root, 'src/js/main.js'), 'utf8');
const imports = [...main.matchAll(/from\s+['"](.+?)['"]/g)].map(m => m[1]);
for (const specifier of imports) {
  if (!specifier.startsWith('.')) continue;
  const target = path.resolve(path.dirname(path.join(root, 'src/js/main.js')), specifier);
  if (!fs.existsSync(target)) errors.push(`Broken JS import: ${specifier}`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const url of [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])) {
  if (!url.startsWith('https://www.wpdf.online/')) continue;
  const relative = url.replace('https://www.wpdf.online/', '') || 'index.html';
  if (relative === '') continue;
  const target = path.join(root, relative);
  if (!fs.existsSync(target)) errors.push(`Sitemap target does not exist: ${relative}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const toolPages=['merge','split','delete','reorder','compress','images','word','excel','ppt','protect','unlock','numbers','rotate','watermark','extract','pdf-images','text'];
for (const id of toolPages) { if (!fs.existsSync(path.join(root,'tools',`${id}.html`))) errors.push(`Missing tool page: ${id}`); }
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Static site validation passed (${required.length} required paths checked, ${toolPages.length} tool pages checked).`);
