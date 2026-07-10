# Quiet h Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a lowercase `h` favicon matching the plainspoken portfolio, show a processed real-size preview for approval, then replace the light PNG, dark PNG, and multiresolution ICO only after approval.

**Architecture:** Use the built-in image-generation tool to create one square raster master in ignored preview storage. Normalize that master with the bundled Pillow runtime into exact light/dark palette variants and a multiscale preview sheet; after the user approves the preview, run the same pipeline into `public/`, update cache-version references and the shell contract, and verify the committed result without staging the user’s unrelated copy edits.

**Tech Stack:** Built-in image generation, bundled Python 3, Pillow 12.2, React/Vite repository checks, Playwright CLI for final browser inspection.

## Global Constraints

- The mark is exactly one lowercase `h` with no other text or symbol.
- Use a semibold, clean native-sans letterform with one straight stem and one simple shoulder.
- Use light colors `#242521` on `#f7f6f2` and an exact dark inverse.
- Use no transparency, frame, border, baked corner radius, shadow, gradient, texture, punctuation, second letter, decorative notch, mockup effect, or watermark.
- Preserve identical geometry and antialiasing between light and dark variants.
- Final PNGs are exactly 256×256.
- Final ICO contains exactly 16, 24, 32, 48, 64, 128, and 256px frames.
- Keep existing filenames: `favicon-light.png`, `favicon-dark.png`, and `favicon.ico`.
- Bump all three HTML cache query strings from `v=3` to `v=4`.
- Do not modify or stage `src/components/Portfolio.jsx`; its current `resume` and `some projects` edits belong to the user.
- Do not write any file under `public/` before the user approves the generated preview.
- Add no project dependency.

---

## File Structure

- Create ignored `.superpowers/favicon-preview/quiet-h-source.png`: copied built-in generation result.
- Create ignored `.superpowers/favicon-preview/favicon_pipeline.py`: deterministic color normalization, resizing, ICO assembly, and preview composition.
- Create ignored `.superpowers/favicon-preview/favicon-light.png`: processed preview candidate.
- Create ignored `.superpowers/favicon-preview/favicon-dark.png`: processed inverse preview candidate.
- Create ignored `.superpowers/favicon-preview/favicon.ico`: processed multiresolution preview candidate.
- Create ignored `.superpowers/favicon-preview/quiet-h-preview.png`: approval sheet with 256, 32, and actual 16px renderings.
- Modify `scripts/site-shell-check.mjs`: assert exact `v=4` themed and fallback favicon URLs.
- Modify `index.html`: bump only the three favicon query strings.
- Replace `public/favicon-light.png`, `public/favicon-dark.png`, and `public/favicon.ico` after preview approval.

---

### Task 1: Generate and Present the Preview Without Replacing Public Assets

**Files:**
- Create: `.superpowers/favicon-preview/quiet-h-source.png`
- Create: `.superpowers/favicon-preview/favicon_pipeline.py`
- Create: `.superpowers/favicon-preview/favicon-light.png`
- Create: `.superpowers/favicon-preview/favicon-dark.png`
- Create: `.superpowers/favicon-preview/favicon.ico`
- Create: `.superpowers/favicon-preview/quiet-h-preview.png`
- Verify unchanged: `public/favicon-light.png`
- Verify unchanged: `public/favicon-dark.png`
- Verify unchanged: `public/favicon.ico`

**Interfaces:**
- Consumes: one built-in image-generation result with a flat light background and dark lowercase `h`.
- Produces: a normalized preview set and approval sheet under `.superpowers/favicon-preview/`; no tracked or public asset changes.

- [ ] **Step 1: Record public-asset hashes before generation**

Run:

```bash
shasum -a 256 public/favicon-light.png public/favicon-dark.png public/favicon.ico
```

Expected: three hashes are printed and retained for comparison after preview creation.

- [ ] **Step 2: Generate one square favicon master with the built-in image tool**

Use this prompt verbatim:

```text
Use case: logo-brand
Asset type: website favicon master
Primary request: exactly one lowercase letter "h" as a quiet personal monogram
Scene/backdrop: perfectly flat solid warm off-white #f7f6f2 background
Subject: a single charcoal #242521 lowercase "h" with one straight stem and one simple shoulder
Style/medium: flat vector-like typographic mark rendered as a crisp raster image; modern native sans-serif; semibold; balanced stroke weight
Composition/framing: square canvas; optically centered; generous even padding; immediately recognizable at 16px
Text (verbatim): "h"
Constraints: render exactly one lowercase h; no other character or symbol; no transparency; no border; no frame; no container; no baked corner radius; no shadow; no gradient; no texture; no watermark; no mockup; no 3D
Avoid: uppercase H, punctuation, second letters, monograms, decorative notches, serif letterforms, calligraphy, handwriting, icons, patterns
```

Expected: one square raster with a single readable lowercase `h`, flat background, and no extra marks.

- [ ] **Step 3: Inspect the generated source before processing**

Load the generated image with the local image viewer and reject it if any of these are present:

- More than one character.
- An uppercase letter.
- Punctuation or an icon.
- A rounded tile, border, shadow, gradient, or texture.
- A closed or muddy counter at preview scale.

Expected: the source passes all five checks. If it fails, issue one targeted image edit that requests only a clearer single lowercase `h` while repeating every prohibition from Step 2.

- [ ] **Step 4: Copy the selected source into ignored preview storage**

Copy the selected built-in result to:

```text
.superpowers/favicon-preview/quiet-h-source.png
```

Expected: the source exists inside the workspace while `git status --short` still shows no new favicon file.

- [ ] **Step 5: Create the complete normalization and preview pipeline**

Create `.superpowers/favicon-preview/favicon_pipeline.py` with:

```python
from __future__ import annotations

import argparse
import json
import statistics
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

LIGHT_BG = (247, 246, 242)
LIGHT_FG = (36, 37, 33)
DARK_BG = LIGHT_FG
DARK_FG = LIGHT_BG
ICO_SIZES = (16, 24, 32, 48, 64, 128, 256)


def percentile(values: list[int], fraction: float) -> int:
    ordered = sorted(values)
    index = min(len(ordered) - 1, max(0, round((len(ordered) - 1) * fraction)))
    return ordered[index]


def load_square_source(path: Path) -> Image.Image:
    source = Image.open(path).convert("RGB")
    edge = min(source.size)
    return ImageOps.fit(source, (edge, edge), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def extract_mark_mask(source: Image.Image) -> tuple[Image.Image, dict[str, object]]:
    gray = ImageOps.grayscale(source)
    width, height = gray.size
    border = max(2, round(width * 0.025))
    pixels = list(gray.getdata())
    border_pixels: list[int] = []

    for y in range(height):
        for x in range(width):
            if x < border or x >= width - border or y < border or y >= height - border:
                border_pixels.append(gray.getpixel((x, y)))

    background_luma = round(statistics.median(border_pixels))
    foreground_luma = percentile(pixels, 0.02)
    span = max(24, background_luma - foreground_luma)
    normalized: list[int] = []

    for value in pixels:
        coverage = max(0.0, min(1.0, (background_luma - value) / span))
        if coverage < 0.035:
            coverage = 0.0
        elif coverage > 0.965:
            coverage = 1.0
        else:
            coverage = coverage * coverage * (3.0 - 2.0 * coverage)
        normalized.append(round(coverage * 255))

    mask = Image.new("L", source.size)
    mask.putdata(normalized)
    threshold = mask.point(lambda value: 255 if value >= 64 else 0)
    bbox = threshold.getbbox()
    coverage = sum(1 for value in normalized if value >= 32) / len(normalized)

    if bbox is None:
        raise ValueError("No foreground mark was detected in the generated source.")
    if not 0.035 <= coverage <= 0.42:
        raise ValueError(f"Foreground coverage {coverage:.4f} is outside the expected favicon range.")

    return mask, {
        "source_size": source.size,
        "background_luma": background_luma,
        "foreground_luma": foreground_luma,
        "coverage": round(coverage, 4),
        "bbox": bbox,
    }


def render_variant(mask: Image.Image, background: tuple[int, int, int], foreground: tuple[int, int, int]) -> Image.Image:
    resized_mask = mask.resize((256, 256), Image.Resampling.LANCZOS)
    background_image = Image.new("RGB", (256, 256), background)
    foreground_image = Image.new("RGB", (256, 256), foreground)
    return Image.composite(foreground_image, background_image, resized_mask)


def build_preview(light: Image.Image, dark: Image.Image, output: Path) -> None:
    canvas = Image.new("RGB", (1200, 720), (234, 233, 228))
    draw = ImageDraw.Draw(canvas)
    title_font = ImageFont.load_default(size=28)
    label_font = ImageFont.load_default(size=18)
    tab_font = ImageFont.load_default(size=16)

    draw.text((64, 42), "quiet h favicon preview", fill=(36, 37, 33), font=title_font)
    draw.text((64, 86), "normalized palette · actual 32px and 16px browser-tab renderings", fill=(102, 102, 95), font=label_font)

    cards = ((88, light, "light"), (856, dark, "dark"))
    for x, icon, label in cards:
        draw.rounded_rectangle((x - 24, 144, x + 280, 448), radius=28, fill=(250, 249, 246))
        canvas.paste(icon, (x, 168))
        draw.text((x, 426), label, fill=(102, 102, 95), font=label_font)

    for index, size in enumerate((32, 16)):
        y = 504 + index * 82
        draw.rounded_rectangle((64, y, 1136, y + 60), radius=12, fill=(250, 249, 246), outline=(215, 214, 208), width=1)
        resized = light.resize((size, size), Image.Resampling.LANCZOS)
        canvas.paste(resized, (88, y + (60 - size) // 2))
        draw.text((144, y + 18), f"{size}px  hong yuan cao", fill=(72, 73, 68), font=tab_font)

    canvas.save(output, format="PNG", optimize=True)


def verify_geometry(light: Image.Image, dark: Image.Image, ico_path: Path) -> dict[str, object]:
    if light.size != (256, 256) or dark.size != (256, 256):
        raise ValueError("Themed PNGs must both be 256×256.")

    light_pixels = list(light.getdata())
    dark_pixels = list(dark.getdata())
    inverse_failures = 0
    for light_pixel, dark_pixel in zip(light_pixels, dark_pixels, strict=True):
        expected = tuple(LIGHT_BG[channel] + LIGHT_FG[channel] - light_pixel[channel] for channel in range(3))
        if dark_pixel != expected:
            inverse_failures += 1

    if inverse_failures:
        raise ValueError(f"Dark asset has {inverse_failures} pixels that are not exact endpoint inverses.")

    with Image.open(ico_path) as ico:
        ico_sizes = sorted(ico.ico.sizes())
    expected_sizes = sorted((size, size) for size in ICO_SIZES)
    if ico_sizes != expected_sizes:
        raise ValueError(f"ICO sizes {ico_sizes} do not match {expected_sizes}.")

    return {
        "png_size": light.size,
        "ico_sizes": ico_sizes,
        "inverse_failures": inverse_failures,
        "light_corner": light.getpixel((0, 0)),
        "dark_corner": dark.getpixel((0, 0)),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--out-dir", type=Path, required=True)
    parser.add_argument("--preview", action="store_true")
    args = parser.parse_args()

    args.out_dir.mkdir(parents=True, exist_ok=True)
    source = load_square_source(args.source)
    mask, mask_report = extract_mark_mask(source)
    light = render_variant(mask, LIGHT_BG, LIGHT_FG)
    dark = render_variant(mask, DARK_BG, DARK_FG)

    light_path = args.out_dir / "favicon-light.png"
    dark_path = args.out_dir / "favicon-dark.png"
    ico_path = args.out_dir / "favicon.ico"
    light.save(light_path, format="PNG", optimize=True)
    dark.save(dark_path, format="PNG", optimize=True)
    light.save(ico_path, format="ICO", sizes=[(size, size) for size in ICO_SIZES])

    preview_path = args.out_dir / "quiet-h-preview.png"
    if args.preview:
        build_preview(light, dark, preview_path)

    report = {
        "mask": mask_report,
        "assets": verify_geometry(light, dark, ico_path),
        "paths": {
            "light": str(light_path),
            "dark": str(dark_path),
            "ico": str(ico_path),
            "preview": str(preview_path) if args.preview else None,
        },
    }
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
```

- [ ] **Step 6: Process the source and create the approval sheet**

Run:

```bash
/Users/hong/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 \
  .superpowers/favicon-preview/favicon_pipeline.py \
  --source .superpowers/favicon-preview/quiet-h-source.png \
  --out-dir .superpowers/favicon-preview \
  --preview
```

Expected: JSON reports 256×256 PNGs, the seven exact ICO sizes, zero inverse failures, light corner `[247, 246, 242]`, dark corner `[36, 37, 33]`, and a preview path.

- [ ] **Step 7: Confirm public assets are still unchanged**

Run the Step 1 hash command again.

Expected: all three hashes exactly match the pre-generation values.

- [ ] **Step 8: Show the preview and stop for explicit approval**

Display `.superpowers/favicon-preview/quiet-h-preview.png` inline and also show the processed light and dark 256px PNGs.

Expected: the user can inspect the mark before replacement. Do not begin Task 2 until the user explicitly approves this preview.

---

### Task 2: Replace the Public Assets After Preview Approval

**Files:**
- Modify: `scripts/site-shell-check.mjs`
- Modify: `index.html`
- Replace: `public/favicon-light.png`
- Replace: `public/favicon-dark.png`
- Replace: `public/favicon.ico`
- Preserve unstaged: `src/components/Portfolio.jsx`

**Interfaces:**
- Consumes: the exact approved `.superpowers/favicon-preview/quiet-h-source.png` and pipeline from Task 1.
- Produces: themed 256px PNG favicons, a seven-frame ICO, `v=4` cache references, and a passing favicon shell contract.

- [ ] **Step 1: Add the failing `v=4` favicon assertions**

In `scripts/site-shell-check.mjs`, insert these assertions immediately after the theme-color assertion:

```js
assert(html.includes('href="/favicon-light.png?v=4"'), 'Light favicon should use the v=4 cache key.');
assert(html.includes('href="/favicon-dark.png?v=4"'), 'Dark favicon should use the v=4 cache key.');
assert(html.includes('href="/favicon.ico?v=4"'), 'Fallback favicon should use the v=4 cache key.');
```

- [ ] **Step 2: Run the shell contract and verify the cache-key test fails**

Run:

```bash
npm run check:shell
```

Expected: exit code 1 with all three `v=4 cache key` messages because `index.html` still references `v=3`.

- [ ] **Step 3: Generate the approved assets directly into `public/`**

Run:

```bash
/Users/hong/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 \
  .superpowers/favicon-preview/favicon_pipeline.py \
  --source .superpowers/favicon-preview/quiet-h-source.png \
  --out-dir public
```

Expected: JSON reports 256×256 PNGs, seven exact ICO sizes, zero inverse failures, and exact endpoint corner colors.

- [ ] **Step 4: Bump only the favicon cache keys in `index.html`**

Replace the three favicon lines with:

```html
    <link rel="icon" type="image/png" href="/favicon-light.png?v=4" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/png" href="/favicon-dark.png?v=4" media="(prefers-color-scheme: dark)" />
    <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
```

- [ ] **Step 5: Run focused verification in the current working tree**

Run:

```bash
npm run check:shell
npm run check:responsive
npm run lint
npm run build
```

Expected: both focused contracts pass, ESLint exits with code 0, and Vite reports a successful build. Do not use `npm run check:content` in this working tree because the user’s preserved copy edits intentionally differ from its committed assertions.

- [ ] **Step 6: Verify formats, inverse geometry, and ICO frames**

Run the pipeline again against the approved source with `--out-dir public`, then run:

```bash
file public/favicon-light.png public/favicon-dark.png public/favicon.ico
sips -g pixelWidth -g pixelHeight -g format public/favicon-light.png public/favicon-dark.png public/favicon.ico
```

Expected: both PNGs report 256×256 PNG; the ICO reports an icon resource with the expected multiresolution frames; the pipeline JSON reports zero inverse failures.

- [ ] **Step 7: Review the exact commit scope before staging**

Run:

```bash
git status --short
git diff -- scripts/site-shell-check.mjs index.html
```

Expected: the favicon files, shell check, and HTML are the only task changes. `src/components/Portfolio.jsx` remains modified but unstaged and unchanged by this task.

- [ ] **Step 8: Commit only favicon-scoped files**

Run:

```bash
git add scripts/site-shell-check.mjs index.html public/favicon-light.png public/favicon-dark.png public/favicon.ico
git commit -m "Replace favicon with quiet h mark"
```

Expected: the commit includes exactly five favicon-scoped paths and excludes `src/components/Portfolio.jsx`.

- [ ] **Step 9: Verify the committed branch independently of user edits**

Create a temporary detached verification worktree from the new commit, install dependencies there, run `npm run check`, `npm run lint`, and `npm run build`, then remove the temporary worktree from the main repository directory.

Expected: the clean committed branch passes all checks while the user’s original working-directory copy edits remain present and unstaged.

- [ ] **Step 10: Verify browser favicon integration**

Start Vite, open the local page with Playwright CLI, and inspect all `link[rel~="icon"]` elements.

Expected URLs:

```text
/favicon-light.png?v=4
/favicon-dark.png?v=4
/favicon.ico?v=4
```

Open each URL directly and confirm it returns successfully. Capture one browser screenshot showing the final page for handoff and close the browser/server session.
