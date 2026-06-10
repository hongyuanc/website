import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const component = readFileSync(resolve(root, 'src/components/Portfolio.jsx'), 'utf8');
const css = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function getVarFromSource(source, name) {
  const match = source.match(new RegExp(`${name}:\\s*([^;]+);`));
  return match?.[1].trim();
}

function getVar(name) {
  return getVarFromSource(css, name);
}

function mediaBlock(query) {
  const start = css.indexOf(query);
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

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255);
}

function channelToLinear(channel) {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(channelToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

const muted = getVar('--text-muted');
const bgPrimary = getVar('--bg-primary');
const bgSecondary = getVar('--bg-secondary');
const darkMode = mediaBlock('@media (prefers-color-scheme: dark)');
const darkBgPrimary = getVarFromSource(darkMode, '--bg-primary');
const darkBgSecondary = getVarFromSource(darkMode, '--bg-secondary');
const darkTextPrimary = getVarFromSource(darkMode, '--text-primary');
const darkTextSecondary = getVarFromSource(darkMode, '--text-secondary');
const darkTextMuted = getVarFromSource(darkMode, '--text-muted');
const darkAccent = getVarFromSource(darkMode, '--accent');
const darkAccentStrong = getVarFromSource(darkMode, '--accent-strong');
const externalLinkRel = component.match(/rel="([^"]+)"/)?.[1] ?? '';

assert(muted && bgPrimary && contrast(muted, bgPrimary) >= 4.5, '--text-muted must meet AA contrast on --bg-primary.');
assert(muted && bgSecondary && contrast(muted, bgSecondary) >= 4.5, '--text-muted must meet AA contrast on --bg-secondary.');
assert(darkMode.includes('color-scheme: dark'), 'Dark mode should be tied to prefers-color-scheme and advertise dark color-scheme.');
for (const [token, color] of [
  ['--text-primary', darkTextPrimary],
  ['--text-secondary', darkTextSecondary],
  ['--text-muted', darkTextMuted],
  ['--accent', darkAccent],
  ['--accent-strong', darkAccentStrong],
]) {
  assert(color && darkBgPrimary && contrast(color, darkBgPrimary) >= 4.5, `${token} must meet AA contrast on dark --bg-primary.`);
  assert(color && darkBgSecondary && contrast(color, darkBgSecondary) >= 4.5, `${token} must meet AA contrast on dark --bg-secondary.`);
}
assert(!component.includes('animate-bounce'), 'Remove Tailwind animate-bounce from the scroll cue.');
assert(css.includes('prefers-reduced-motion'), 'Respect prefers-reduced-motion for motion-heavy layouts.');
assert(component.includes('id="home"') && component.includes('id="resume"') && component.includes('id="projects"'), 'Anchored sections should expose stable deep links.');
assert(externalLinkRel.includes('noopener') && externalLinkRel.includes('noreferrer'), 'External target blank links must include rel with noopener and noreferrer.');
assert(component.includes('Selected Work'), 'Projects should be reframed as Selected Work.');
assert(!component.includes('<li className="font-medium">•') && !component.includes('<li>•'), 'Semantic lists should not include literal bullet characters.');
assert(!component.includes('rotateX(') && !component.includes('translateZ(-50vh)'), 'Desktop layout should not depend on a 3D cube transform.');
assert(!component.includes('handleWheel'), 'Custom wheel-boundary section navigation should be removed.');
assert(component.includes('href="#resume"') && component.includes('href="#projects"'), 'Hero should expose direct resume and selected work actions.');
assert(component.includes('CASE_STUDIES'), 'Projects should promote a smaller set of flagship case studies.');
assert(component.includes('PROJECT_ARCHIVE'), 'Secondary projects should be collapsed into an archive structure.');
assert(component.includes('Current focus') || component.includes('current-focus'), 'Portfolio should include a current-focus identity motif.');
assert(component.includes('signal:') && component.includes('project-signal'), 'Selected work should expose a concise mobile-readable signal line.');
assert(component.includes('archive-arrow') && css.includes('@media (hover: none)'), 'Touch users should get visible project/archive affordances without relying on hover.');
assert(component.includes('&copy; 2026 Hong Yuan Cao') && css.includes('.site-footer'), 'Portfolio should include a quiet styled copyright footer.');
assert(html.includes('favicon-light.png') && html.includes('prefers-color-scheme: light'), 'Light favicon should be linked for light system preferences.');
assert(html.includes('favicon-dark.png') && html.includes('prefers-color-scheme: dark'), 'Dark favicon should be linked for dark system preferences.');
assert(existsSync(resolve(root, 'public/favicon-light.png')) && existsSync(resolve(root, 'public/favicon-dark.png')), 'Themed favicon PNG assets should exist in public.');
assert(css.includes('.site-nav .nav-home') && css.includes('scroll-margin-top: 76px') && css.includes('scroll-margin-top: 102px'), 'Mobile navigation should stay compact, sticky, and anchor-safe.');
assert(css.includes('justify-content: flex-start') && css.includes('flex-direction: column'), 'Mobile navigation should avoid clipped overflow on narrow phones.');
assert(component.includes('resume-preview') && !css.includes('max-height: min(58vh, 300px)'), 'Mobile resume preview should remain full-height and uncropped.');
assert(!css.includes('transform: translateY(-2%)'), 'Mobile resume image should not be shifted upward or visually cut.');
assert(!component.includes('case-study-index'), 'Project numbering should be removed unless the order itself communicates meaning.');
assert(!css.includes('#f5f4ef'), 'Palette should move away from the prior warm beige default.');
assert(!css.includes('radial-gradient(circle'), 'Avoid ambient radial blobs as personality filler.');
assert(!component.includes('univerisites'), 'Visible copy must not include the universities typo.');
assert(css.includes('.portfolio-main'), 'CSS should define the anchored scroll page shell.');
assert(css.includes('.hero-actions'), 'CSS should style the direct hero actions.');
assert(css.includes('.case-study'), 'CSS should style flagship case studies distinctly from archive entries.');

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log('critique regression checks passed');
