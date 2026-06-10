# Portfolio editorial polish design

Date: 2026-06-10

## Context

The project is a Vite React personal portfolio for Hong Yuan Cao. The current working tree already replaces the previous cube-style interface with a linear personal-index layout built from `Header`, `Hero`, `Projects`, `Background`, `Resume`, and `Contact` sections in `src/components/Portfolio.jsx`, with vanilla CSS in `src/index.css`.

The approved baseline is the current uncommitted redesign. This spec is a focused polish pass, not a restart or framework migration.

## Product Intent

The site should feel like a calm personal index: a refined place to understand Hong's current chapter, selected work, academic background, resume, and contact paths. It should remain useful for recruiters and collaborators without sounding or looking like a recruiting funnel.

The target visual direction is more premium and editorial. The page should feel composed, personal, and technically credible, with visible restraint.

## Audit Findings

- The current linear structure is readable and aligned with the product notes.
- The cube interaction has been removed, which improves scanning and reduces interface risk.
- The typography still depends on a system sans stack, so the page lacks a distinctive editorial voice.
- The section rhythm is very even, making the page feel assembled rather than art-directed.
- Several surfaces use similar border/card treatments, which weakens hierarchy.
- The background is clean but flat; it needs localized visual depth without becoming a page-wide gradient.
- Header navigation has hover and focus states but no active location treatment.
- HTML metadata is minimal and should be improved during implementation.
- The resume preview asset exists and builds successfully.

## Approved Direction

Use an editorial ledger approach.

Keep the current one-page structure and plainspoken copy. Improve the visual system, spacing, hierarchy, and section treatments so the page feels more like a refined personal publication than a template portfolio.

Do not add a new route structure, 3D concept, full-page gradient, heavy animation layer, or dependency-heavy design system.

## Visual System

Use a characterful editorial type pairing. Major headings should move away from the current generic sans treatment and gain more presence through a serif or editorial display face. Body and UI text should remain highly readable.

Use a simple premium base color across the whole site, closer to warm paper or soft stone than pure white. Retain a restrained muted blue-green accent family and avoid purple-blue AI gradients.

Gradients should be localized section accents only:

- The hero may use a soft off-center radial wash behind or near the marginal notes.
- The featured work area may use a faint tinted field around the primary case study.
- The resume or contact section may use a quieter document-shadow style gradient.
- The whole page must not receive a single overall gradient overlay.

Add subtle texture or grain only if it remains low contrast and does not reduce readability.

## Layout and Components

Keep the page order:

1. Header
2. Hero
3. Selected work
4. Background
5. Resume
6. Contact

Hero:

- Keep the personal-index framing.
- Make the name and intro feel more editorial through type scale, line-height, and spacing.
- Treat the right-side notes as marginal annotations, not a generic card.

Selected work:

- Preserve the case-study row model.
- Give the featured project stronger hierarchy.
- Treat proof and artifact blocks like field notes or project evidence rather than ordinary cards.
- Keep project copy concise and specific.

Background:

- Keep coursework available but make it lighter than the project section.
- Prefer ledger/list treatments over heavy bordered card grids.

Resume:

- Preserve direct view and download paths.
- Frame the preview like a document artifact with better spacing, shadow, and surface treatment.

Contact:

- Keep it quiet and easy to use.
- Reduce generic button feel where possible and rely on refined link typography and focus states.

## Interaction and Accessibility

Maintain visible focus states for keyboard users. Keep hover and active states subtle, using color, transform, or underline changes rather than large motion.

Respect reduced-motion preferences. Any animation should use `transform` and `opacity`, and the design should remain complete with motion disabled.

Hash navigation should continue to work. Add an active navigation state only if it can be implemented cleanly without fragile scroll code. If active state is not added, improve hover, focus, and section anchor behavior.

Target WCAG 2.2 AA contrast for text and interactive elements.

## Content and Metadata

Keep the current content structure and tone. Avoid inflated portfolio language and AI-copywriting cliches.

Improve document metadata during implementation:

- Page title
- Description
- Open Graph basics
- Twitter card metadata that mirrors the Open Graph title and description

Do not introduce fake metrics, generic testimonials, stock imagery, or recruiting-heavy calls to action.

## Implementation Boundaries

Work with the existing stack:

- React 18
- Vite
- Tailwind is installed, but the current implementation uses vanilla CSS in `src/index.css`
- `lucide-react` is already installed and may remain in use

Keep changes focused to:

- `src/components/Portfolio.jsx`
- `src/index.css`
- `index.html`
- Existing public assets only if needed

Avoid unrelated refactors, new routing, large content rewrites, or framework migration.

## Verification

Implementation should be verified with:

- `npm run build`
- `npm run lint` if it runs cleanly or produces actionable output
- Browser inspection on desktop and mobile widths
- A quick check that resume view/download links still work
- A quick check that external links still open correctly

Visual acceptance criteria:

- The site still reads as a calm personal index.
- The design feels more premium and editorial than the current baseline.
- Gradients are section-local accents, not an overall page effect.
- Projects remain easy to scan and technically credible.
- The resume and contact paths stay obvious without dominating the page.
