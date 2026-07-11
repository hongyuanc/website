import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const description = 'Hong Yuan Cao is a software engineer building systems, ML tooling, and game infrastructure.';
const dependencies = packageJson.dependencies ?? {};

assert(html.includes('<title>Hong Yuan Cao</title>'), 'Document title should use the concise approved identity.');
assert(html.includes(`content="${description}"`), 'Document metadata should use the approved concise description.');
assert(html.includes('<link rel="canonical" href="https://hongyuancao.com/" />'), 'Document should retain the production canonical URL.');
assert(html.includes('<meta property="og:title" content="Hong Yuan Cao" />'), 'Open Graph title should match the document title.');
assert(html.includes('<meta name="twitter:title" content="Hong Yuan Cao" />'), 'Twitter title should match the document title.');
assert(html.includes('<meta name="theme-color" content="#f7f6f2" />'), 'Browser theme color should match the light canvas.');
assert(html.includes('href="/favicon-light.png?v=4"'), 'Light favicon should use the v=4 cache key.');
assert(html.includes('href="/favicon-dark.png?v=4"'), 'Dark favicon should use the v=4 cache key.');
assert(html.includes('href="/favicon.ico?v=4"'), 'Fallback favicon should use the v=4 cache key.');
assert(!html.includes('academic background'), 'Metadata should not advertise removed academic background content.');
assert(!('lucide-react' in dependencies), 'lucide-react should be removed from runtime dependencies.');
assert(!('lodash.throttle' in dependencies), 'lodash.throttle should be removed from runtime dependencies.');
assert(packageJson.scripts?.['check:content'] === 'node scripts/critique-regression-check.mjs', 'Package scripts should expose the content contract.');
assert(packageJson.scripts?.['check:responsive'] === 'node scripts/mobile-responsive-check.mjs', 'Package scripts should expose the responsive contract.');
assert(packageJson.scripts?.['check:shell'] === 'node scripts/site-shell-check.mjs', 'Package scripts should expose the site-shell contract.');
assert(packageJson.scripts?.check === 'npm run check:content && npm run check:responsive && npm run check:shell', 'Package scripts should expose the complete static check.');
assert(existsSync(resolve(root, 'public/resume.pdf')), 'Résumé PDF should remain available.');
assert(existsSync(resolve(root, 'public/favicon-light.png')), 'Light favicon should remain available.');
assert(existsSync(resolve(root, 'public/favicon-dark.png')), 'Dark favicon should remain available.');
assert(existsSync(resolve(root, 'public/favicon.ico')), 'Fallback favicon should remain available.');
assert(!existsSync(resolve(root, 'public/resume-page-1.png')), 'Unused résumé preview image should be removed.');

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log('site shell checks passed');
