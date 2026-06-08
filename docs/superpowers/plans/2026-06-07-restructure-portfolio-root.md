# Portfolio Root Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the live Vite/React portfolio from `my-portfolio/` to the repository root and remove the obsolete root static site.

**Architecture:** The repository root becomes the Vite app root containing `package.json`, `index.html`, `src/`, `public/`, and config files. The old static site files at the root are removed from version control. Generated local artifacts are either moved to their equivalent root locations or ignored so no source work is lost.

**Tech Stack:** React 18, Vite 5, Tailwind CSS, ESLint, npm, GitHub Pages via `gh-pages`.

---

### Task 1: Baseline And Safety

**Files:**
- Read: `my-portfolio/package.json`
- Read: `my-portfolio/vite.config.js`
- Read: `my-portfolio/src/components/Portfolio.jsx`
- Read: `my-portfolio/src/index.css`
- Create: `docs/superpowers/plans/2026-06-07-restructure-portfolio-root.md`

- [ ] **Step 1: Record branch and dirty state**

Run:

```bash
git branch --show-current
git status --short
```

Expected: branch is `codex/restructure-portfolio-root`; existing dirty edits under `my-portfolio/src/` are preserved.

- [ ] **Step 2: Verify the live site before moving it**

Run:

```bash
npm run build
npm run lint
```

Expected from `my-portfolio/`: both commands exit `0`; build writes `my-portfolio/dist/`.

### Task 2: Remove Obsolete Root Static Site

**Files:**
- Delete tracked: `.DS_Store`
- Delete tracked: `CNAME`
- Delete tracked: `README.md`
- Delete tracked: `index.html`
- Delete tracked: `styles.css`
- Delete tracked: `theme-switch.js`
- Delete tracked: `particle-background.js`
- Delete tracked: `assets/`
- Delete tracked: `images/`
- Delete tracked: `old-ver/`

- [ ] **Step 1: Remove obsolete tracked files**

Run:

```bash
git rm .DS_Store CNAME README.md index.html styles.css theme-switch.js particle-background.js
git rm -r assets images old-ver
```

Expected: those paths show as deleted in `git status --short`.

### Task 3: Move Live Website To Repository Root

**Files:**
- Move: `my-portfolio/.gitignore` -> `.gitignore`
- Move: `my-portfolio/README.md` -> `README.md`
- Move: `my-portfolio/eslint.config.js` -> `eslint.config.js`
- Move: `my-portfolio/index.html` -> `index.html`
- Move: `my-portfolio/package-lock.json` -> `package-lock.json`
- Move: `my-portfolio/package.json` -> `package.json`
- Move: `my-portfolio/postcss.config.js` -> `postcss.config.js`
- Move: `my-portfolio/public/` -> `public/`
- Move: `my-portfolio/src/` -> `src/`
- Move: `my-portfolio/tailwind.config.js` -> `tailwind.config.js`
- Move: `my-portfolio/vite.config.js` -> `vite.config.js`

- [ ] **Step 1: Move tracked live app files except `src/`**

Run:

```bash
git mv my-portfolio/.gitignore .gitignore
git mv my-portfolio/README.md README.md
git mv my-portfolio/eslint.config.js eslint.config.js
git mv my-portfolio/index.html index.html
git mv my-portfolio/package-lock.json package-lock.json
git mv my-portfolio/package.json package.json
git mv my-portfolio/postcss.config.js postcss.config.js
git mv my-portfolio/public public
git mv my-portfolio/tailwind.config.js tailwind.config.js
git mv my-portfolio/vite.config.js vite.config.js
```

Expected: moved paths show as renames or delete/add pairs.

- [ ] **Step 2: Move source files while preserving the pre-existing `test2.jsx` deletion**

Run:

```bash
mkdir -p src/components src/assets
git mv my-portfolio/src/App.css my-portfolio/src/App.jsx my-portfolio/src/index.css my-portfolio/src/main.jsx src/
git mv my-portfolio/src/components/Portfolio.jsx src/components/Portfolio.jsx
git mv my-portfolio/src/assets/react.svg src/assets/react.svg
git rm my-portfolio/src/components/test2.jsx
```

Expected: the existing edits to `Portfolio.jsx` and `index.css` are now under `src/`, and `my-portfolio/src/components/test2.jsx` remains deleted.

### Task 4: Preserve Local Generated Artifacts

**Files:**
- Move ignored: `my-portfolio/node_modules/` -> `node_modules/`
- Move ignored: `my-portfolio/dist/` -> `dist/`
- Move untracked: `my-portfolio/scripts/` -> `scripts/`
- Merge untracked: `my-portfolio/.playwright-cli/` -> `.playwright-cli/my-portfolio/`
- Modify: `.gitignore`
- Modify: `eslint.config.js`

- [ ] **Step 1: Move generated and untracked support folders**

Run:

```bash
mv my-portfolio/node_modules node_modules
mv my-portfolio/dist dist
mv my-portfolio/scripts scripts
mkdir -p .playwright-cli/my-portfolio
mv my-portfolio/.playwright-cli/* .playwright-cli/my-portfolio/
rmdir my-portfolio/.playwright-cli
rmdir my-portfolio
```

Expected: `my-portfolio/` no longer exists; generated folders remain local and untracked. If an old browser automation process recreates a generated log under `my-portfolio/.playwright-cli/`, stop the browser automation if available, then remove only the generated leftover after confirming no source files remain in `my-portfolio/`.

- [ ] **Step 2: Ignore local browser artifacts**

Add this entry to `.gitignore`:

```gitignore
.playwright-cli/
```

Expected: root `.playwright-cli/` no longer appears in `git status --short`.

- [ ] **Step 3: Keep root lint scoped to website code**

Update the first `eslint.config.js` entry to ignore local tooling and generated folders:

```js
{
  ignores: [
    'dist',
    'node_modules',
    '.agents',
    '.claude',
    '.cursor',
    '.impeccable',
    '.playwright-cli',
  ],
},
```

Expected: `npm run lint` from root does not scan Codex/tooling folders that were outside the old `my-portfolio/` app root.

### Task 5: Verify Root Website

**Files:**
- Read: `package.json`
- Read: `vite.config.js`
- Read: `src/components/Portfolio.jsx`
- Read: `src/index.css`

- [ ] **Step 1: Verify root lint**

Run:

```bash
npm run lint
```

Expected: ESLint exits `0` from the repository root.

- [ ] **Step 2: Verify root production build**

Run:

```bash
npm run build
```

Expected: Vite exits `0` from the repository root and emits `dist/index.html` plus built assets.

- [ ] **Step 3: Review final Git state**

Run:

```bash
git status --short
find . -maxdepth 2 -mindepth 1 -not -path './.git*' -print | sort
```

Expected: tracked changes reflect only the static-site removal, live-site move, `.gitignore` update, and this plan file; `my-portfolio/` is absent.
