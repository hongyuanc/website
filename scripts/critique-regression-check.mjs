import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const component = readFileSync(resolve(root, 'src/components/Portfolio.jsx'), 'utf8');

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const projectStart = component.indexOf('const PROJECTS');
const projectEnd = component.indexOf('const ELSEWHERE_LINKS');
const projectBlock = projectStart >= 0 && projectEnd > projectStart
  ? component.slice(projectStart, projectEnd)
  : '';
const projectCount = projectBlock.match(/title:/g)?.length ?? 0;
const elsewhereStart = component.indexOf('const ELSEWHERE_LINKS');
const elsewhereEnd = component.indexOf('function ExternalLink');
const elsewhereBlock = elsewhereStart >= 0 && elsewhereEnd > elsewhereStart
  ? component.slice(elsewhereStart, elsewhereEnd)
  : '';
const elsewhereCount = elsewhereBlock.match(/label:/g)?.length ?? 0;
const externalLinkRel = component.match(/rel="([^"]+)"/)?.[1] ?? '';

assert(component.includes('hi, i’m hong.'), 'Page should open with the approved lowercase greeting.');
assert(
  component.includes('i’m a software engineer working across systems, ml tooling, and game infrastructure.'),
  'Introduction should use the approved work description.',
);
assert(
  component.includes("i recently finished computer science and economics at{' '}")
    && component.includes('<ExternalLink href="https://www.bu.edu/">bu</ExternalLink>')
    && component.includes("and i’m heading to{' '}")
    && component.includes('<ExternalLink href="https://tech.cornell.edu/">cornell tech</ExternalLink> for an meng in computer science.'),
  'Introduction should use the approved current-context sentence.',
);
assert(projectCount === 4, 'Selected projects should contain exactly four entries.');
for (const title of ['athens', 'loom', 'work-stealing task runtime', 'vectordb']) {
  assert(projectBlock.includes(`title: '${title}'`), `Selected projects should include ${title}.`);
}
assert(elsewhereCount === 4, 'Elsewhere should contain exactly four links.');
for (const label of ['resume', 'github', 'linkedin', 'email']) {
  assert(component.includes(`label: '${label}'`), `Elsewhere links should include ${label}.`);
}
assert(component.includes('<h2 id="projects-title">some projects</h2>'), 'Projects section should use the lowercase some projects label.');
assert(component.includes('<h2 id="elsewhere-title">elsewhere</h2>'), 'Elsewhere section should use the lowercase elsewhere label.');
assert(component.includes("href: '/resume.pdf'"), 'Elsewhere should retain direct résumé PDF access.');
assert(component.includes('href="#main-content"'), 'Page should expose a skip link to the main content.');
assert(component.includes('tabIndex="-1"'), 'Main content should be programmatically focusable from the skip link.');
assert(component.includes('target="_blank"'), 'External destinations should open in a new tab.');
assert(externalLinkRel.includes('noopener') && externalLinkRel.includes('noreferrer'), 'External links should use noopener and noreferrer.');
assert(component.includes('<span className="sr-only"> opens in a new tab</span>'), 'External links should explain new-tab behavior to screen readers.');
assert(component.includes('&copy; 2026 hong yuan cao'), 'Footer should use the approved lowercase copyright line.');

for (const removed of [
  'PROJECT_ARCHIVE',
  'COURSE_GROUPS',
  'resume-preview',
  'resume-page-1.png',
  'lucide-react',
  'site-header',
  'NAV_ITEMS',
  'stack:',
  'signal:',
  'archive-block',
  'course-grid',
  'contact-section',
]) {
  assert(!component.includes(removed), `Legacy concept should be removed from Portfolio.jsx: ${removed}`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log('critique regression checks passed');
