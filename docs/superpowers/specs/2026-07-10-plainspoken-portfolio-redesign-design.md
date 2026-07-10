# Plainspoken portfolio redesign

Date: 2026-07-10

## Context

The project is a one-page React and Vite portfolio for Hong Yuan Cao. The current `main` branch uses oversized editorial headings, a sticky navigation bar, icon-driven actions, long project descriptions, a project archive, coursework groups, and a visual résumé preview.

The redesign should be smaller, quieter, and more personal. It should begin conversationally with “hi, i’m hong.” and read like a concise personal note rather than a portfolio landing page. The user selected the “plainspoken column” direction after reviewing three small-type visual approaches.

The current checkout also contains an older uncommitted redesign on `codex/minimalist-redesign`. That work is preserved. This redesign is isolated on `codex/plainspoken-portfolio`, created from `main`.

## Product intent

The page should let a recruiter, collaborator, or peer understand four things quickly:

1. Who Hong is.
2. What kinds of software he builds.
3. Which projects best represent that work.
4. Where to find his résumé, code, professional profile, or email.

The site should feel calm and self-assured because it is specific and easy to read. It should not feel like a recruiting funnel, a design showcase, a résumé wrapper, or a generic portfolio template.

## Reference boundary

`paco.me` is a directional reference for restraint only. Useful qualities include its narrow reading measure, small and consistent type scale, prose-led introduction, one-line project descriptions, generous vertical rhythm, and low visual noise.

The implementation must not reproduce that site’s exact layout, typography, wording, section sequence, effects, component styling, or distinctive details. Hong’s page will use its own warm palette, lowercase voice, content structure, spacing system, and interaction treatment.

## Approved information architecture

The page contains four visible blocks in this order:

1. Introduction
2. Selected projects
3. Elsewhere links
4. Footer

The following content is removed completely:

- Sticky header and navigation
- Coursework and academic course lists
- Project archive
- Long project case-study copy
- Technology-stack lists
- Project tags and signal labels
- Separate background section
- Separate contact section
- Separate résumé section
- Résumé image preview
- Icon-based buttons and cards
- Repeated calls to action

## Content design

### Introduction

The page opens with a small text heading:

> hi, i’m hong.

It is followed by two concise paragraphs. The first explains the work:

> i’m a software engineer working across systems, ml tooling, and game infrastructure.

The second gives current context without becoming a biography:

> i recently finished computer science and economics at bu, and i’m heading to cornell tech for an meng in computer science.

Use these sentences as the final introduction copy.

### Selected projects

The section label is `selected projects`. It contains exactly four projects:

- `athens` — an inspectable study workspace built around retrieval and source material.
- `loom` — a pipeline for consistent, animation-ready game assets.
- `work-stealing task runtime` — a c++ scheduler for exploring locality, contention, and irregular task graphs.
- `vectordb` — graph-based vector search implemented from scratch and exposed as a service.

Each project uses a linked lowercase title followed by one sentence. Descriptions contain no stack dumps, performance claims, badges, metrics, or separate action labels.

Project destinations remain direct:

- Athens links to the live product.
- Loom links to its source repository.
- The work-stealing runtime links to the repository index until a dedicated repository URL is available.
- VectorDB links to its source repository.

### Elsewhere

The section label is `elsewhere`. It presents four quiet inline links:

- `résumé`
- `github`
- `linkedin`
- `email`

The résumé link opens the existing PDF. GitHub and LinkedIn open their external destinations. Email uses the existing `mailto:` address.

### Footer

The footer contains only `© 2026 hong yuan cao` in muted small text.

## Visual system

### Layout

- One centered reading column with a maximum width of 640px.
- Desktop horizontal padding: 32px minimum.
- Mobile horizontal padding: 24px.
- Desktop top spacing: 128px.
- Mobile top spacing: 64px.
- No multi-column layout, sidebar, card grid, full-width hero, or sticky element.
- Section separation comes from whitespace rather than boxed surfaces.

### Typography

- Use a characterful native sans stack headed by `Avenir Next` and `Helvetica Neue`, with system fallbacks.
- Base text is 16px with 28px line height.
- The introductory heading is 18px and semibold, not display-sized.
- Section labels are 14px and use weight and muted color rather than uppercase or extreme tracking.
- Project titles remain at the body scale and are distinguished through weight and link treatment.
- Visible interface copy is lowercase, including headings, labels, project titles, and footer text.
- Proper nouns in metadata and accessibility text retain conventional capitalization for clarity.

### Color

- Canvas: warm off-white near `#f7f6f2`.
- Primary text: charcoal near `#242521`.
- Secondary text: warm gray near `#74746c`.
- Focus ring: a dark neutral or muted moss that meets WCAG 2.2 AA contrast requirements.
- No gradients, colored panels, neon accents, dark hero field, or glassmorphism.
- The palette is intentionally light-only; set `color-scheme: light` and do not add an automatic dark theme.

### Surfaces and decoration

- No cards, heavy borders, drop shadows, large-radius containers, illustrations, photos, or icon library.
- Links use a restrained underline with a clear hover change.
- Project entries are separated by whitespace with no divider lines.
- The page should feel complete through proportion, type, and exact spacing rather than decorative effects.

## Interaction and motion

- All links have visible keyboard focus states.
- External project, GitHub, and LinkedIn links open in a new tab with safe `rel` attributes and screen-reader context.
- The résumé remains directly accessible as the existing PDF.
- Hover states adjust text or underline color without moving layout.
- Major blocks use one initial fade-and-rise from `opacity: 0` and `translateY(8px)` over 500ms, staggered by 80ms.
- Motion is disabled under `prefers-reduced-motion: reduce`.
- No scroll listeners, active navigation tracking, parallax, animated backgrounds, or interaction dependencies.

## Component architecture

Keep the existing one-page application and reduce it to small, explicit units:

- `Portfolio`: page shell and semantic main/footer structure.
- `Intro`: heading and two short paragraphs.
- `Projects`: section label and mapped project entries.
- `ProjectLink`: one project’s external link and description.
- `Elsewhere`: résumé, GitHub, LinkedIn, and email links.
- `ExternalLink`: safe external-link behavior and screen-reader note.

Project and elsewhere content remain small static arrays in `Portfolio.jsx`. The page has no application state, network requests, form submission, route changes, or runtime data flow.

## Dependency and asset cleanup

- Remove `lucide-react` because the approved design uses no icons.
- Remove `lodash.throttle`; it is unused by the current source and the redesign.
- Keep the existing résumé PDF and favicon assets.
- Remove the tracked résumé preview PNG because the redesign no longer renders it; keep the résumé PDF.
- Do not add a font package, component library, animation library, or new runtime dependency.

## Metadata

Keep or refine the current canonical, Open Graph, Twitter, and description tags. The browser title and description should use conventional capitalization where useful for search and sharing, even though the visible page is lowercase.

## Responsive behavior

- The same one-column composition is used at every width.
- At small widths, reduce page padding and top spacing without shrinking body text below 16px.
- Inline elsewhere links wrap naturally with consistent gaps.
- Long project titles and descriptions wrap without overflow.
- Touch targets remain comfortably usable even though the visual treatment is text-only.

## Accessibility

- Target WCAG 2.2 AA contrast.
- Use semantic `main`, `section`, headings, lists, and `footer` elements.
- Preserve a keyboard-accessible skip link.
- Do not rely on color alone for link recognition.
- Provide visible `:focus-visible` treatment.
- Keep document language and accessible names conventional and understandable.
- Verify the résumé, email, external links, and project links with keyboard navigation.

## Verification

Implementation is complete only after:

- `npm run lint` passes.
- `npm run build` passes.
- Repository-specific critique and responsive checks are updated to assert the new approved invariants and then pass.
- Desktop browser review confirms the 640px reading measure, small hierarchy, and generous rhythm.
- Mobile browser review confirms readable type, natural wrapping, and usable links.
- Light presentation is checked under both light and dark operating-system settings to confirm that the intentional `color-scheme: light` remains consistent.
- Reduced-motion behavior is verified.
- The résumé PDF, email link, external project links, GitHub, and LinkedIn destinations are checked.

## Acceptance criteria

- The first visible line is “hi, i’m hong.”
- No prominent text is display-sized.
- The page contains only the introduction, four selected projects, elsewhere links, and footer.
- Coursework, archive content, technology stacks, résumé preview, cards, icon buttons, and sticky navigation are absent.
- All visible interface copy is lowercase.
- The experience reads as an original, concise personal note rather than a copy of the reference site.
- The implementation remains fast, accessible, responsive, and dependency-light.
