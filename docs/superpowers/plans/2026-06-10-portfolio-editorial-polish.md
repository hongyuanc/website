# Portfolio Editorial Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the current uncommitted linear portfolio redesign into a more premium editorial personal index.

**Architecture:** Keep the existing one-page Vite React app and current section model. Add small structural hooks in `src/components/Portfolio.jsx`, refresh the visual system in `src/index.css`, and improve static document metadata in `index.html`.

**Tech Stack:** React 18, Vite 5, vanilla CSS with existing Tailwind directives, existing `lucide-react` icons, no new runtime dependencies.

---

## File Structure

- Modify `index.html`: add production-ready title, description, canonical, Open Graph, and Twitter card metadata.
- Modify `src/components/Portfolio.jsx`: preserve the current content and components, add section-specific classes and one visual label needed by CSS, and do not add scroll-state logic.
- Modify `src/index.css`: replace the generic system visual layer with editorial type tokens, warm neutral colors, section-local gradient fields, refined ledgers, responsive polish, and accessible interaction states.
- Do not modify `package.json`, routing, public assets, or existing resume files unless verification reveals a broken reference.

## Implementation Notes

The starting point is the current uncommitted working tree, not `HEAD`. Do not revert the existing changes to `src/App.jsx`, `src/components/Portfolio.jsx`, or `src/index.css`.

Avoid a full-page gradient. Gradients must be localized to section pseudo-elements and shaped fields.

Do not add new dependencies. Use CSS font-family fallbacks that improve the local look without requiring a network font download.

---

### Task 1: Baseline Verification

**Files:**
- Read: `src/components/Portfolio.jsx`
- Read: `src/index.css`
- Read: `index.html`
- Verify: current Vite build

- [ ] **Step 1: Confirm working tree scope**

Run:

```bash
git status --short
```

Expected: existing uncommitted UI files are present, including `src/App.jsx`, `src/components/Portfolio.jsx`, and `src/index.css`. Treat them as the baseline.

- [ ] **Step 2: Run the current production build**

Run:

```bash
npm run build
```

Expected: `vite build` completes successfully. If it fails, stop and fix only the failure that blocks the baseline build before continuing.

- [ ] **Step 3: Record current lint behavior**

Run:

```bash
npm run lint
```

Expected: either PASS or actionable lint output. If lint fails on files unrelated to this polish pass, record the failure in the final implementation notes and continue. If lint fails on `src/components/Portfolio.jsx`, `src/index.css`, or `index.html`, fix those issues in the relevant later task.

---

### Task 2: Improve Static Metadata

**Files:**
- Modify: `index.html:3-8`
- Test: `npm run build`

- [ ] **Step 1: Replace the `<head>` content with complete metadata**

In `index.html`, replace the current `<head>` block with:

```html
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico?v=2" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hong Yuan Cao | Software, systems, and ML tooling</title>
    <meta
      name="description"
      content="Hong Yuan Cao is a software engineer and incoming Cornell Tech MEng student building practical systems, ML tooling, and computer vision projects."
    />
    <link rel="canonical" href="https://hongyuancao.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://hongyuancao.com/" />
    <meta property="og:title" content="Hong Yuan Cao | Software, systems, and ML tooling" />
    <meta
      property="og:description"
      content="A calm personal index for Hong Yuan Cao: selected software projects, systems work, academic background, resume, and contact paths."
    />
    <meta property="og:site_name" content="Hong Yuan Cao" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Hong Yuan Cao | Software, systems, and ML tooling" />
    <meta
      name="twitter:description"
      content="Selected software projects, systems work, academic background, resume, and contact paths."
    />
  </head>
```

- [ ] **Step 2: Run the build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Commit metadata change**

Run:

```bash
git add index.html
git commit -m "Polish portfolio metadata"
```

Expected: commit succeeds and includes only `index.html`.

---

### Task 3: Add Minimal Structural Hooks

**Files:**
- Modify: `src/components/Portfolio.jsx:173-205`
- Modify: `src/components/Portfolio.jsx:213`
- Modify: `src/components/Portfolio.jsx:245`
- Modify: `src/components/Portfolio.jsx:276`
- Modify: `src/components/Portfolio.jsx:302`
- Modify: `src/components/Portfolio.jsx:329`
- Test: `npm run build`

- [ ] **Step 1: Add section-local visual classes and a hero aside label**

In `src/components/Portfolio.jsx`, update only the affected opening tags and the `intro-panel` content.

Use this hero section:

```jsx
function Hero() {
  return (
    <section id="home" className="hero-section surface-field surface-field-hero section-anchor" aria-labelledby="home-title">
      <div className="hero-intro">
        <p className="current-focus">Personal index</p>
        <h1 id="home-title">Hong Yuan Cao</h1>
        <p className="hero-copy">
          Recent BU CS and Economics graduate heading to Cornell Tech. I build practical software around systems, ML tooling, and vision.
        </p>
        <p className="working-note">
          I tend to like projects where the important behavior stays visible enough to reason about.
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="text-action" href="#projects">
            Selected work
            <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <a className="text-action text-action-muted" href="#resume">
            Resume
            <FileText size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>

      <aside className="intro-panel" aria-label="Personal notes">
        <span className="panel-note">Current notes</span>
        <div>
          <span className="panel-label">Now</span>
          <p>Preparing for Cornell Tech, sharpening systems fundamentals, and building AI tooling with a practical edge.</p>
        </div>
        <div>
          <span className="panel-label">Thread</span>
          <p>Previously worked on autonomous-driving perception systems: low-power perception architecture, radar and lidar drivers, and point-cloud processing.</p>
        </div>
      </aside>
    </section>
  );
}
```

- [ ] **Step 2: Add section classes to case studies and content sections**

Update these class expressions and section opening tags:

```jsx
function CaseStudy({ project }) {
  const className = project.featured
    ? 'case-study case-study-featured surface-field surface-field-work'
    : 'case-study';

  return (
    <article className={className}>
```

```jsx
<section id="projects" className="portfolio-section projects-section section-anchor" aria-labelledby="projects-title">
```

```jsx
<section className="portfolio-section background-section background-ledger" aria-labelledby="background-title">
```

```jsx
<section id="resume" className="portfolio-section resume-section surface-field surface-field-resume section-anchor" aria-labelledby="resume-title">
```

```jsx
<section id="contact" className="contact-section surface-field surface-field-contact section-anchor" aria-labelledby="contact-title">
```

- [ ] **Step 3: Run the build**

Run:

```bash
npm run build
```

Expected: PASS. If JSX fails to compile, check that `className` strings are closed and that the hero still returns one `<section>`.

- [ ] **Step 4: Commit structural hooks**

Run:

```bash
git add src/components/Portfolio.jsx
git commit -m "Add editorial portfolio structure hooks"
```

Expected: commit succeeds and includes only `src/components/Portfolio.jsx`.

---

### Task 4: Replace Visual Tokens and Global Surface

**Files:**
- Modify: `src/index.css:5-143`
- Test: `npm run build`

- [ ] **Step 1: Replace root tokens, dark tokens, and global base styles**

In `src/index.css`, replace everything from `:root {` through `.section-anchor { ... }` with:

```css
:root {
  color-scheme: light dark;
  --bg-primary: #f3f0e8;
  --bg-secondary: #e9e3d7;
  --bg-elevated: #fbf8ef;
  --bg-wash: #dce9e6;
  --text-primary: #171614;
  --text-secondary: #36342f;
  --text-muted: #6b675e;
  --accent: #2f5d59;
  --accent-strong: #1f4744;
  --accent-soft: #d8e6e1;
  --line: #d9d1c2;
  --line-strong: #a79d8c;
  --shadow: 0 22px 70px rgba(55, 47, 36, 0.13);
  --shadow-soft: 0 12px 34px rgba(59, 50, 38, 0.09);
  --font-display: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
  --font-sans: "Avenir Next", Avenir, "Segoe UI", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  --radius: 8px;
  --radius-soft: 18px;
  --content: min(1180px, calc(100vw - 48px));
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #121311;
    --bg-secondary: #1b1b18;
    --bg-elevated: #181815;
    --bg-wash: #1f3533;
    --text-primary: #f4efe4;
    --text-secondary: #ddd6c8;
    --text-muted: #aaa292;
    --accent: #9cc8bd;
    --accent-strong: #c2ded6;
    --accent-soft: #1f3533;
    --line: #333027;
    --line-strong: #5d574c;
    --shadow: 0 22px 70px rgba(0, 0, 0, 0.32);
    --shadow-soft: 0 12px 34px rgba(0, 0, 0, 0.24);
  }
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--bg-primary);
}

body,
#root {
  min-height: 100%;
  margin: 0;
}

body {
  background:
    linear-gradient(90deg, transparent 0, transparent calc(50% - 0.5px), color-mix(in srgb, var(--line) 58%, transparent) calc(50% - 0.5px), color-mix(in srgb, var(--line) 58%, transparent) calc(50% + 0.5px), transparent calc(50% + 0.5px)),
    radial-gradient(circle at 8% 10%, color-mix(in srgb, var(--bg-elevated) 70%, transparent) 0 8rem, transparent 23rem),
    var(--bg-primary);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 16px;
  font-variant-numeric: oldstyle-nums;
  line-height: 1.65;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  content: "";
  opacity: 0.38;
  background-image:
    linear-gradient(rgba(23, 22, 20, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 22, 20, 0.018) 1px, transparent 1px);
  background-size: 6px 6px, 6px 6px;
}

button,
a {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 5px;
}

img {
  display: block;
  max-width: 100%;
}

.portfolio-shell {
  min-height: 100dvh;
  color: var(--text-secondary);
}

.portfolio-main {
  width: var(--content);
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  width: var(--content);
  min-height: 72px;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  margin: 0 auto;
  border-bottom: 1px solid color-mix(in srgb, var(--line) 78%, transparent);
  background: color-mix(in srgb, var(--bg-primary) 84%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.wordmark {
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1;
  white-space: nowrap;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(14px, 3vw, 34px);
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

.site-nav a {
  position: relative;
  transition: color 180ms ease;
}

.site-nav a::after {
  position: absolute;
  right: 0;
  bottom: -7px;
  left: 0;
  height: 1px;
  content: "";
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.site-nav a:hover {
  color: var(--text-primary);
}

.site-nav a:hover::after {
  transform: scaleX(1);
}

.section-anchor {
  scroll-margin-top: 96px;
}
```

- [ ] **Step 2: Run the build**

Run:

```bash
npm run build
```

Expected: PASS.

---

### Task 5: Polish Hero, Buttons, and Local Gradient Fields

**Files:**
- Modify: `src/index.css:145-284`
- Test: `npm run build`

- [ ] **Step 1: Replace hero and action CSS**

In `src/index.css`, replace the existing `.hero-section` through `.portfolio-section` block with:

```css
.surface-field {
  position: relative;
  isolation: isolate;
}

.surface-field::before {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  content: "";
}

.surface-field-hero::before {
  top: 16%;
  right: -7%;
  width: min(34vw, 390px);
  aspect-ratio: 1 / 1.25;
  border-radius: 48% 52% 42% 58%;
  opacity: 0.62;
  background:
    radial-gradient(circle at 45% 38%, color-mix(in srgb, var(--accent-soft) 82%, transparent) 0 28%, transparent 66%),
    radial-gradient(circle at 68% 72%, color-mix(in srgb, var(--bg-elevated) 76%, transparent) 0 20%, transparent 62%);
  filter: blur(4px);
}

.hero-section {
  display: grid;
  min-height: calc(100dvh - 72px);
  grid-template-columns: minmax(0, 1.58fr) minmax(300px, 0.82fr);
  gap: clamp(42px, 8vw, 116px);
  align-items: center;
  padding: clamp(82px, 12vw, 148px) 0 clamp(66px, 9vw, 112px);
}

.hero-intro {
  max-width: 820px;
}

.current-focus,
.project-type,
.panel-label {
  color: var(--accent-strong);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-section h1 {
  max-width: 820px;
  margin: 18px 0 28px;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(54px, 8.3vw, 112px);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 0.92;
  text-wrap: balance;
}

.hero-copy {
  max-width: 680px;
  margin: 0;
  color: var(--text-secondary);
  font-size: clamp(18px, 2vw, 23px);
  line-height: 1.55;
  text-wrap: pretty;
}

.working-note {
  max-width: 560px;
  margin: 20px 0 0;
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.75;
  text-wrap: pretty;
}

.hero-actions,
.resume-actions,
.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-actions {
  margin-top: 38px;
}

.text-action,
.contact-link {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px solid var(--text-primary);
  border-radius: var(--radius);
  padding: 10px 15px;
  color: var(--bg-primary);
  background: var(--text-primary);
  box-shadow: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease;
}

.text-action:hover,
.contact-link:hover {
  transform: translateY(-1px);
  border-color: var(--accent-strong);
  background: var(--accent-strong);
  box-shadow: var(--shadow-soft);
  color: var(--bg-primary);
}

.text-action:active,
.contact-link:active {
  transform: translateY(0);
}

.text-action-muted {
  border-color: var(--line-strong);
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-elevated) 48%, transparent);
}

.text-action-muted:hover {
  color: var(--bg-primary);
}

.intro-panel {
  position: relative;
  display: grid;
  gap: 0;
  align-self: stretch;
  border-left: 1px solid var(--line-strong);
  background: linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 58%, transparent), transparent 92%);
  box-shadow: none;
}

.panel-note {
  position: absolute;
  top: 4px;
  right: 0;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

.intro-panel > div {
  display: flex;
  min-height: 190px;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 32px;
}

.intro-panel > div + div {
  border-top: 1px solid var(--line);
}

.intro-panel p {
  margin: 12px 0 0;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.7;
  text-wrap: pretty;
}

.portfolio-section {
  padding: clamp(82px, 11vw, 138px) 0 clamp(92px, 12vw, 154px);
  border-top: 1px solid color-mix(in srgb, var(--line) 82%, transparent);
}
```

- [ ] **Step 2: Run the build**

Run:

```bash
npm run build
```

Expected: PASS.

---

### Task 6: Polish Section Headings and Project Case Studies

**Files:**
- Modify: `src/index.css:286-465`
- Test: `npm run build`

- [ ] **Step 1: Replace heading and project CSS**

In `src/index.css`, replace `.section-heading` through `.project-link:hover` with:

```css
.section-heading {
  max-width: 720px;
  margin-bottom: clamp(42px, 6vw, 66px);
}

.section-heading h2,
.resume-copy h2,
.contact-section h2 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(40px, 5.6vw, 72px);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 0.98;
  text-wrap: balance;
}

.section-heading p,
.resume-copy p,
.contact-section p {
  max-width: 640px;
  margin: 18px 0 0;
  color: var(--text-muted);
  font-size: 16px;
  line-height: 1.75;
  text-wrap: pretty;
}

.compact-heading {
  margin-bottom: 34px;
}

.case-study-list {
  display: grid;
  gap: 0;
}

.case-study {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(300px, 0.82fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: start;
  border-top: 1px solid var(--line);
  padding: clamp(36px, 5vw, 56px) 0;
}

.case-study-featured {
  grid-template-columns: minmax(0, 1.04fr) minmax(340px, 0.92fr);
  margin-bottom: 12px;
  border-top-color: var(--line-strong);
  padding: clamp(54px, 7vw, 76px) clamp(20px, 4vw, 38px);
}

.surface-field-work::before {
  inset: 18px -2% 12px auto;
  width: min(48vw, 560px);
  border-radius: 24px;
  opacity: 0.78;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent-soft) 56%, transparent), transparent 62%),
    radial-gradient(circle at 74% 24%, color-mix(in srgb, var(--bg-elevated) 84%, transparent), transparent 58%);
}

.case-study:last-child {
  border-bottom: 1px solid var(--line);
}

.case-study h3,
.archive-block h3,
.course-group h3 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(28px, 3.4vw, 42px);
  font-weight: 500;
  line-height: 1.04;
  text-wrap: balance;
}

.case-study-featured h3 {
  max-width: 11ch;
  font-size: clamp(44px, 6vw, 76px);
  letter-spacing: 0;
  line-height: 0.93;
}

.project-summary {
  max-width: 610px;
  margin: 18px 0 20px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.7;
  text-wrap: pretty;
}

.stack-line {
  max-width: 620px;
  margin: 0;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.02em;
  line-height: 1.7;
}

.project-proof {
  display: grid;
  gap: 20px;
}

.project-artifact {
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg-elevated) 48%, transparent);
  padding: 22px 0;
}

.project-artifact span {
  display: block;
  margin-bottom: 14px;
  color: var(--accent-strong);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-artifact strong {
  display: block;
  max-width: 32rem;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(21px, 2.4vw, 28px);
  font-weight: 500;
  line-height: 1.18;
  text-wrap: balance;
}

.project-artifact p {
  margin: 14px 0 0;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.7;
  text-wrap: pretty;
}

.technical-notes {
  padding-left: 0;
}

.technical-notes h4 {
  margin: 0 0 12px;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 700;
}

.technical-notes ul,
.course-group ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.technical-notes li {
  position: relative;
  padding-left: 17px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.7;
}

.technical-notes li::before {
  position: absolute;
  top: 0.84em;
  left: 0;
  width: 7px;
  height: 1px;
  content: "";
  background: var(--accent);
}

.technical-notes li + li {
  margin-top: 8px;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  margin-top: 18px;
  color: var(--accent-strong);
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--accent) 34%, transparent);
  text-underline-offset: 5px;
  transition:
    color 180ms ease,
    text-decoration-color 180ms ease,
    transform 180ms ease;
}

.project-link:hover {
  color: var(--text-primary);
  text-decoration-color: var(--accent-strong);
  transform: translateX(2px);
}
```

- [ ] **Step 2: Run the build**

Run:

```bash
npm run build
```

Expected: PASS.

---

### Task 7: Polish Archive, Background, Resume, Contact, and Responsive States

**Files:**
- Modify: `src/index.css:467-709`
- Test: `npm run build`
- Test: `npm run lint`

- [ ] **Step 1: Replace archive through reduced-motion CSS**

In `src/index.css`, replace `.archive-block` through the final `@media (prefers-reduced-motion: reduce)` block with:

```css
.archive-block {
  margin-top: clamp(58px, 8vw, 92px);
}

.archive-block h3 {
  margin-bottom: 22px;
  font-size: clamp(30px, 3.4vw, 44px);
}

.archive-list {
  display: grid;
  border-top: 1px solid var(--line);
}

.archive-item {
  display: grid;
  grid-template-columns: minmax(180px, 0.34fr) minmax(0, 1fr);
  gap: clamp(18px, 4vw, 38px);
  border-bottom: 1px solid var(--line);
  padding: 20px 0;
  transition:
    color 180ms ease,
    padding-left 180ms ease;
}

.archive-item:hover {
  padding-left: 6px;
}

.archive-item:hover span:first-child {
  color: var(--accent-strong);
}

.archive-item span:first-child {
  color: var(--text-primary);
  font-weight: 700;
}

.archive-item span:last-child {
  color: var(--text-muted);
  line-height: 1.6;
}

.background-section {
  display: grid;
  grid-template-columns: minmax(260px, 0.7fr) minmax(0, 1fr);
  gap: clamp(40px, 8vw, 104px);
}

.background-ledger {
  border-top-color: color-mix(in srgb, var(--line) 72%, transparent);
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 clamp(24px, 5vw, 52px);
  border-top: 1px solid var(--line);
}

.course-group {
  border-bottom: 1px solid var(--line);
  padding: 24px 0;
  background: transparent;
}

.course-group h3 {
  margin-bottom: 16px;
  font-size: 22px;
}

.course-group li {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.72;
}

.course-group li + li {
  margin-top: 4px;
}

.resume-section {
  display: grid;
  grid-template-columns: minmax(260px, 0.72fr) minmax(320px, 1fr);
  gap: clamp(42px, 8vw, 104px);
  align-items: start;
}

.surface-field-resume::before {
  top: 10%;
  right: -6%;
  width: min(44vw, 520px);
  height: 62%;
  border-radius: 32px;
  opacity: 0.62;
  background:
    linear-gradient(135deg, transparent, color-mix(in srgb, var(--bg-wash) 62%, transparent) 42%, transparent 82%),
    radial-gradient(circle at 80% 18%, color-mix(in srgb, var(--bg-elevated) 86%, transparent), transparent 54%);
}

.resume-copy {
  position: sticky;
  top: 112px;
}

.resume-actions {
  margin-top: 30px;
}

.resume-preview {
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--line-strong) 78%, transparent);
  border-radius: var(--radius);
  background: var(--bg-elevated);
  box-shadow: var(--shadow);
  transform: rotate(0.35deg);
}

.resume-preview img {
  width: 100%;
  background: var(--bg-elevated);
}

.contact-section {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto;
  gap: 30px;
  align-items: end;
  padding: clamp(62px, 9vw, 104px) 0;
  border-top: 1px solid var(--line);
}

.surface-field-contact::before {
  bottom: 8%;
  left: -8%;
  width: min(38vw, 460px);
  height: 44%;
  border-radius: 999px;
  opacity: 0.5;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent-soft) 68%, transparent), transparent 68%);
}

.contact-link {
  border-color: color-mix(in srgb, var(--line-strong) 84%, transparent);
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-elevated) 34%, transparent);
}

.contact-link:hover {
  color: var(--bg-primary);
}

@media (max-width: 900px) {
  :root {
    --content: min(100vw - 32px, 720px);
  }

  .site-header {
    min-height: 64px;
  }

  .hero-section,
  .background-section,
  .resume-section,
  .contact-section {
    grid-template-columns: 1fr;
  }

  .hero-section {
    min-height: auto;
    padding-top: 78px;
  }

  .surface-field-hero::before {
    top: 6%;
    right: -20%;
    width: 320px;
  }

  .intro-panel {
    align-self: auto;
  }

  .intro-panel > div {
    min-height: auto;
  }

  .case-study,
  .case-study-featured {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .case-study-featured {
    padding-right: 0;
    padding-left: 0;
  }

  .case-study-featured h3 {
    max-width: 100%;
  }

  .resume-copy {
    position: static;
  }

  .resume-preview {
    transform: none;
  }

  .contact-section {
    align-items: start;
  }

  .contact-links {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  body {
    background: var(--bg-primary);
  }

  body::before {
    opacity: 0.24;
  }

  .site-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    padding: 16px 0 13px;
  }

  .site-nav {
    width: 100%;
    justify-content: space-between;
    gap: 12px;
    font-size: 13px;
  }

  .section-anchor {
    scroll-margin-top: 116px;
  }

  .hero-section h1 {
    font-size: clamp(48px, 16vw, 66px);
  }

  .hero-copy {
    font-size: 17px;
  }

  .hero-actions,
  .resume-actions,
  .contact-links {
    width: 100%;
  }

  .text-action,
  .contact-link {
    flex: 1 1 100%;
  }

  .portfolio-section {
    padding: 70px 0 78px;
  }

  .section-heading {
    margin-bottom: 36px;
  }

  .archive-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .course-grid {
    grid-template-columns: 1fr;
  }

  .panel-note {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS. If lint reports `react/prop-types` only because of the existing file-level disable, do not change behavior for this polish pass. Fix any new lint errors introduced by the CSS/JSX work.

- [ ] **Step 4: Commit CSS polish**

Run:

```bash
git add src/index.css
git commit -m "Apply editorial portfolio visual polish"
```

Expected: commit succeeds and includes only `src/index.css`.

---

### Task 8: Browser QA and Final Adjustment Pass

**Files:**
- Modify on visual QA failure: `src/index.css`
- Modify on visual QA failure: `src/components/Portfolio.jsx`
- Verify: local browser at Vite dev server URL

- [ ] **Step 1: Start the dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite starts and prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 2: Inspect desktop viewport**

Open the local URL in the browser at roughly `1440x1000`.

Expected:

- Hero name is prominent and readable.
- Hero localized gradient sits near the side note area and does not wash the whole page.
- The right-side notes read as annotations rather than a generic card.
- Featured project has stronger hierarchy than the following case studies.
- Resume preview looks like a framed document artifact.
- No text overlaps or overflows.

- [ ] **Step 3: Inspect mobile viewport**

Use a mobile viewport around `390x844`.

Expected:

- Header nav wraps cleanly and does not overlap.
- Hero name fits without clipping.
- Local gradients do not obscure text.
- Buttons are full-width and text fits.
- Course groups collapse into one column.
- Resume preview is not rotated on mobile.

- [ ] **Step 4: Verify links**

Click or inspect these links:

```text
#projects
#resume
/resume.pdf
download="Hong_Yuan_Cao_Resume.pdf"
mailto:hc2343@cornell.edu
https://github.com/hongyuanc
https://www.linkedin.com/in/hong-yuan-cao/
```

Expected: hash links scroll to the right sections, resume opens/downloads, and external/contact links remain correct.

- [ ] **Step 5: Make only targeted visual fixes**

If browser QA reveals spacing or contrast issues, edit only the smallest affected CSS block. Examples:

```css
.surface-field-hero::before {
  opacity: 0.5;
}
```

```css
.hero-section h1 {
  font-size: clamp(46px, 15vw, 66px);
}
```

```css
.site-nav {
  gap: 10px;
}
```

- [ ] **Step 6: Re-run final verification**

Run:

```bash
npm run build
npm run lint
```

Expected: both pass, or any pre-existing lint noise is explicitly documented.

- [ ] **Step 7: Commit final QA fixes**

If Step 5 changed files, run:

```bash
git add src/index.css src/components/Portfolio.jsx
git commit -m "Refine portfolio responsive polish"
```

Expected: commit succeeds with only QA-driven frontend changes.

If Step 5 did not change files, do not create an empty commit.

---

## Self-Review

Spec coverage:

- Premium editorial direction is covered by Tasks 4, 5, 6, and 7.
- Localized section gradients are covered by `.surface-field-*` classes in Tasks 3, 5, and 7.
- Existing structure and copy are preserved by Task 3's minimal hooks.
- Metadata is covered by Task 2.
- Accessibility, reduced motion, and focus behavior are covered by Tasks 4, 7, and 8.
- Verification is covered by Tasks 1, 2, 3, 4, 5, 6, 7, and 8.

Placeholder scan:

- This plan contains no deferred placeholders or unspecified implementation steps.
- QA edits in Task 8 include concrete examples and are constrained to browser-discovered issues.

Type and naming consistency:

- JSX class names added in Task 3 match CSS selectors in Tasks 5 and 7.
- Existing component names remain unchanged.
- Existing link data structures remain unchanged.
