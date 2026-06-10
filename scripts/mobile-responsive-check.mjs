import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const component = readFileSync(resolve(root, 'src/components/Portfolio.jsx'), 'utf8');
const css = readFileSync(resolve(root, 'src/index.css'), 'utf8');

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function mediaBlock(maxWidth) {
  const start = css.indexOf(`@media (max-width: ${maxWidth}px)`);
  if (start === -1) return '';

  let depth = 0;
  for (let index = start; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1;
    if (css[index] === '}') {
      depth -= 1;
      if (depth === 0) return css.slice(start, index + 1);
    }
  }

  return '';
}

const mobile = mediaBlock(640);
const smallMobile = mediaBlock(380);

function hasRule(block, selector, declaration) {
  const selectorIndex = block.indexOf(selector);
  if (selectorIndex === -1) return false;
  const ruleEnd = block.indexOf('}', selectorIndex);
  return ruleEnd !== -1 && block.slice(selectorIndex, ruleEnd).includes(declaration);
}

assert(component.includes('className={item.href === \'#home\' ? \'nav-home\' : undefined}'), 'Mobile nav should treat the wordmark as Home and remove duplicate Home from the nav row.');
assert(component.includes('project.signal') && component.includes('project-signal'), 'Selected work needs a short mobile-readable signal line.');
assert(component.includes('archive-arrow'), 'Archive rows need a persistent touch-visible external-link affordance.');
assert(component.includes('archive-intro'), 'Project archive should include a styled brief description paragraph.');
assert(css.includes('.archive-intro'), 'Project archive description should have dedicated styling.');
assert(component.includes('&copy; 2026 Hong Yuan Cao'), 'Portfolio should include the quiet copyright footer.');
assert(css.includes('.site-footer'), 'Copyright footer should have dedicated styling.');
assert(css.includes('@media (prefers-color-scheme: dark)') && css.includes('color-scheme: dark'), 'Portfolio should honor system dark mode without changing the light default.');
assert(component.includes('Download resume'), 'Resume download action should name the object being downloaded.');
assert(hasRule(mobile, '.site-header', 'position: sticky'), 'Mobile header should remain sticky for fast section access.');
assert(hasRule(mobile, '.site-nav', 'justify-content: flex-start'), 'Mobile nav should avoid flex-end clipping when it overflows.');
assert(hasRule(mobile, '.nav-home', 'display: none'), 'Mobile nav should hide the duplicate Home item.');
assert(mobile.includes('.project-signal') && mobile.includes('display: block'), 'Project signal line should appear on mobile.');
assert(!mobile.includes('max-height: min(58vh, 300px)'), 'Mobile should keep the full resume preview visible instead of cropping it.');
assert(!mobile.includes('transform: translateY(-2%)'), 'Mobile resume image should not be shifted upward or visually cut.');
assert(hasRule(mobile, '.background-section', 'padding: 46px 0 50px'), 'Mobile background section should be condensed compared with standard sections.');
assert(hasRule(mobile, '.background-section .section-heading', 'margin-bottom: 0'), 'Mobile background heading should sit closer to the course grid.');
assert(hasRule(mobile, '.background-section .course-group', 'grid-template-columns'), 'Mobile course groups should use a compact two-column row structure.');
assert(hasRule(mobile, '.background-section .course-group', 'padding: 16px 0'), 'Mobile course groups should use tighter row padding.');
assert(mobile.includes('@media (hover: none)') && mobile.includes('.archive-arrow'), 'Touch devices should get affordances that do not depend on hover.');
assert(hasRule(smallMobile, '.site-header', 'flex-direction: column'), 'Very small phones should switch to a two-line sticky header rather than clipped nav.');
assert(hasRule(smallMobile, '.site-nav', 'width: 100%'), 'Very small phone nav should expose all section links across the full content width.');
assert(hasRule(smallMobile, '.site-nav a', 'min-height: 44px'), 'Very small phones should keep nav tap targets usable.');

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log('mobile responsive checks passed');
