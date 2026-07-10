# Quiet h favicon design

Date: 2026-07-11

## Context

The portfolio on `codex/plainspoken-portfolio` is a light-only, small-type personal page with a warm off-white canvas (`#f7f6f2`), charcoal text (`#242521`), and a restrained native sans-serif type system. The current favicon files predate this redesign and should be replaced with a mark that feels native to the new site.

The user selected the “quiet h” direction after comparing three lowercase `h` treatments at large preview size and real 16px browser-tab size.

## Approved concept

Use a single lowercase `h` as the entire mark.

The letter should feel typographic rather than illustrated: semibold, clean, compact, and optically centered. Its silhouette should resemble a refined native sans-serif lowercase `h` with one straight stem and one simple shoulder. The mark should remain immediately recognizable at 16px.

Do not add a period, second letter, frame, border, rounded container, shadow, gradient, texture, pattern, bevel, three-dimensional treatment, or decorative notch.

## Generation approach

Use the built-in image-generation tool in `logo-brand` mode to create one square raster master.

Prompt requirements:

- Asset type: website favicon master.
- Subject: exactly one lowercase `h` and no other text or symbol.
- Style: flat vector-like typographic mark rendered as a raster image.
- Letterform: modern native sans-serif, semibold, balanced stroke weight, simple shoulder.
- Composition: centered with generous even padding and optical correction for the shoulder.
- Palette: charcoal `#242521` on warm off-white `#f7f6f2`.
- Background: perfectly flat solid color.
- Avoid: uppercase letters, additional characters, punctuation, monograms, borders, shadows, gradients, texture, mockups, watermarks, and three-dimensional effects.

Generate at square master resolution. Inspect the result before using it. If the letter is malformed, contains extra marks, or loses clarity when reduced, perform one targeted regeneration that changes only the letterform clarity.

## Color normalization

The generated master provides the selected letterform, but final favicon colors must match the site exactly.

Normalize the light asset locally so that:

- Background pixels are `#f7f6f2`.
- Mark pixels are `#242521`.
- Antialiased edge pixels interpolate only between those two colors.

Create the dark asset as an exact inverse of the normalized light asset:

- Background pixels are `#242521`.
- Mark pixels are `#f7f6f2`.
- The letter geometry, placement, padding, and antialiasing remain identical.

No transparency is required. Both PNGs should fully cover their square canvas.

## Final assets

Replace these existing files in place:

- `public/favicon-light.png`: 256×256 PNG, light palette.
- `public/favicon-dark.png`: 256×256 PNG, exact inverse palette.
- `public/favicon.ico`: multiresolution ICO containing 16, 24, 32, 48, 64, 128, and 256px square frames.

Keep the established filenames so all existing deployment and browser behavior remains stable.

## HTML integration

Keep the existing light and dark `media` favicon links in `index.html`.

Bump all favicon cache query strings from `v=3` to `v=4`:

- `/favicon-light.png?v=4`
- `/favicon-dark.png?v=4`
- `/favicon.ico?v=4`

Do not change the document title, metadata, canonical URL, or theme color.

## Automated contract

Extend `scripts/site-shell-check.mjs` to verify:

- `index.html` references all three favicon paths with `v=4`.
- Both themed PNGs exist.
- The ICO exists.

The automated check should fail against the current `v=3` HTML before the implementation changes are applied, then pass after the cache bump and asset replacement.

## Visual verification

Verify the final mark at these sizes:

- 256px source preview for letterform quality.
- 32px for high-density browser and bookmark contexts.
- 16px for standard browser tabs.

At 16px, the vertical stem and shoulder must remain separate, the counter must remain open, and no antialiasing haze should make the mark look bold or blurred.

Inspect both light and dark variants on contrasting browser chrome. The mark should feel quiet, typographic, and aligned with the portfolio rather than like a standalone corporate logo.

## Technical verification

Implementation is complete only after:

- PNG dimensions and formats are confirmed.
- ICO frame sizes are confirmed as 16, 24, 32, 48, 64, 128, and 256px.
- Light and dark assets have identical geometry and inverse endpoint colors.
- The favicon contract passes.
- `npm run check` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Browser inspection confirms the new favicon loads from the `v=4` URLs.

## Acceptance criteria

- The favicon is exactly one lowercase `h`.
- It matches the site’s warm off-white and charcoal palette.
- The light and dark variants are exact geometric inverses.
- It remains recognizable and crisp at 16px.
- No extra letters, punctuation, container, border, shadow, gradient, texture, or decorative effect appears.
- The existing three favicon files are replaced in place.
- Browser cache references use `v=4`.
