import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const css = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function getVar(name) {
  const match = css.match(new RegExp(`${name}:\\s*([^;]+);`));
  return match?.[1].trim();
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

function ruleBlock(source, selector) {
  const start = source.indexOf(`${selector} {`);
  if (start === -1) return '';
  const end = source.indexOf('}', start);
  return end === -1 ? '' : source.slice(start, end + 1);
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

const canvas = getVar('--canvas');
const text = getVar('--text');
const muted = getVar('--muted');
const focus = getVar('--focus');
const measure = getVar('--measure');
const body = ruleBlock(css, 'body');
const introHeading = ruleBlock(css, '.intro h1');
const portfolioMain = ruleBlock(css, '.portfolio-main');
const mobile = mediaBlock('@media (max-width: 640px)');
const reducedMotion = mediaBlock('@media (prefers-reduced-motion: reduce)');

assert(canvas === '#f7f6f2', '--canvas should use the approved warm off-white.');
assert(text && canvas && contrast(text, canvas) >= 7, '--text should meet enhanced contrast on --canvas.');
assert(muted && canvas && contrast(muted, canvas) >= 4.5, '--muted should meet AA contrast on --canvas.');
assert(focus && canvas && contrast(focus, canvas) >= 4.5, '--focus should meet AA contrast on --canvas.');
assert(measure === 'min(640px, calc(100% - 64px))', '--measure should cap the desktop reading column at 640px with 32px side padding.');
assert(css.includes('color-scheme: light'), 'Portfolio should advertise the intentional light-only color scheme.');
assert(!css.includes('@media (prefers-color-scheme: dark)'), 'Portfolio should not add an automatic dark theme.');
assert(body.includes('font-size: 16px') && body.includes('line-height: 1.75'), 'Body should use 16px text with a 28px line height.');
assert(introHeading.includes('font-size: 18px'), 'Intro heading should remain a small 18px heading.');
assert(portfolioMain.includes('padding: 128px 0 96px'), 'Desktop composition should begin with 128px top spacing.');
assert(css.includes('max-width: 36rem'), 'Introductory copy should retain a comfortable short measure.');
assert(css.includes('animation: enter 500ms'), 'Major blocks should use the approved 500ms initial entry.');
assert(reducedMotion.includes('animation: none'), 'Reduced-motion users should receive no entry animation.');
assert(reducedMotion.includes('scroll-behavior: auto'), 'Reduced-motion users should not receive smooth scrolling.');

for (const banned of [
  'linear-gradient',
  'radial-gradient',
  'box-shadow',
  'backdrop-filter',
  'position: sticky',
  'text-transform: uppercase',
  '.card',
]) {
  assert(!css.includes(banned), `Banned visual treatment should be absent: ${banned}`);
}

assert(mobile.includes('--measure: calc(100% - 48px)'), 'Mobile should use 24px side margins.');
assert(mobile.includes('padding: 64px 0 72px'), 'Mobile composition should begin with 64px top spacing.');
assert(mobile.includes('margin-top: 52px'), 'Mobile sections should use the approved compact section rhythm.');
assert(!mobile.includes('font-size: 15px'), 'Mobile should not shrink body text below 16px.');

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log('mobile responsive checks passed');
