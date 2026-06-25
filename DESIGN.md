# Design Language — sawabpsiddiq.com

> **A calm, well-instrumented control room.**
> Deep blue-ink, left-anchored, border-driven. **Mona Sans carries the voice; IBM Plex Mono carries the data.** One dusty-cyan signal color for interaction, a semantic green reserved for "live in production," and one signature element — a hand-built pipeline whose node/edge/packet language doubles as every diagram on the site.

This is the single source of truth for the design language. The implemented tokens live in [`app/globals.css`](app/globals.css) (`@theme` block); this document explains the *why* and the *rules*. Test every new decision against one sentence: **"Does this look like it was designed by someone who ships reliable systems to production?"** If a choice adds noise, decoration, or trend-chasing without serving that, cut it.

---

## 1. Principles (in priority order)

1. **Precision over decoration.** Spacing *is* the aesthetic. Minimal design fails when spacing is sloppy.
2. **Density with breathing room.** Dense where it matters (metrics, stack, spec tables), generous whitespace everywhere else.
3. **One signature, everything else quiet.** A single memorable idea (§6), surrounded by disciplined restraint. Sites feel "AI-generated" when *everything* tries to be interesting.
4. **Motion as feedback, not spectacle.** Animation confirms, orients, and reveals. Nothing loops endlessly, bounces, or floats for no reason.
5. **Semantic color.** Color means something, so the design reads as engineered.
6. **Real numbers are the artwork.** `60%`, `5,000/day`, `300+` set in mono are more striking than any illustration.

---

## 2. Color

The base is a **deep blue-ink**, not pure black — it photographs as black but feels warmer and separates the site from the `#000` + neon default. Surfaces step up in lightness subtly; **borders do the structural work, not shadows.**

### Ink ramp

| Token | Hex | Usage |
|---|---|---|
| `--color-base` | `#0B0E14` | Page background |
| `--color-raised` | `#11151D` | Cards, panels, code blocks (one step up) |
| `--color-overlay` | `#161B26` | Hover states, dropdowns, modals |
| `--color-codebg` | `#0D1117` | Diagram / code-block backgrounds |
| `--color-line` | `#1E2530` | Default 1px borders |
| `--color-line-strong` | `#2C3542` | Hovered/focused borders, dividers that must be seen |
| `--color-fg` | `#E6EAF2` | Headlines, emphasis (never pure `#FFF`) |
| `--color-fg2` | `#9AA4B5` | Body text, descriptions |
| `--color-fg3` | `#5C6677` | Labels, captions, metadata |

### Accent system — the rule that makes the palette feel engineered

| Token | Hex | Meaning | Where |
|---|---|---|---|
| `--color-signal` | `#5FB4D9` | Interactive / focus / "signal" | Links, hover underlines, focus rings, the pipeline packet, the boot cursor |
| `--color-live` | `#4ADE80` | Production status **only** | Pulsing dots beside `PRODUCTION` / `OPEN TO WORK` |
| `--color-warn` | `#E8B45A` | POC / internal / experiment | Non-production status dots, the escalation-branch blink |

**Rules:**

- **Cyan** is the *only* color allowed on interactive elements. Desaturated and dusty — oscilloscope phosphor, not neon. At any viewport it occupies **< 2% of visible pixels**; its scarcity is what makes it intentional.
- **Green** appears *only* next to the word "Production" or "Available/Open to work." A visitor subconsciously learns: green dot = live. Color becomes information.
- **No gradients** anywhere — except one barely-perceptible cyan radial glow (4–6% opacity) behind the hero. Invisible in screenshots, only felt in person.
- **Brand color** (vendor logos) is permitted **only at 14–16px icon scale inside diagram nodes and stack chips**, muted to one shared visual volume (`lib/color.ts` → `muteBrand`). It never appears on text, borders, backgrounds, or metrics.

Functional: `--focus-ring` = `--color-signal` @ 60%, 2px offset 2px (`:focus-visible` only). `::selection` = `--color-signal` @ 25%.

---

## 3. Typography

A **two-family system**: one modern grotesk doing display *and* body duty via weight/width contrast, plus a monospace doing all "system" text. **Every piece of *data* is mono; every piece of *prose* is grotesk. That separation is the typographic identity — zero exceptions.**

| Role | Typeface | Notes |
|---|---|---|
| Display + Body | **Mona Sans** (variable, `--font-mona`) | Self-hosted, subset to ~70KB. Weight `400–600`, width axis `100–110`. |
| System / Data | **IBM Plex Mono** (`--font-plex`) | Weights `400`, `500`. Metrics, eyebrows, chips, dates, statuses, nav, code, diagram labels. |

### Type scale (voice classes in `globals.css`)

| Class | Size (clamp) | Weight / axis | Tracking | Used for |
|---|---|---|---|---|
| `.display-xl` | `40 → 72px` | 600 / wdth 110 | -0.025em | Hero headline only |
| `.display-lg` | `32 → 48px` | 600 / wdth 105 | -0.02em | Section H2s, case-study titles |
| `.heading` | `22 → 28px` | 600 | -0.01em | Card titles, H3s |
| `.mono-metric` | `32 → 50px` | 500 (mono) | -0.02em | The big numbers — `tabular-nums` |
| `.mono-label` | `12px` | 500 (mono) | +0.08em, UPPER | Eyebrows, statuses, chips, nav |
| `.mono-body` | `13 → 14px` | 400 (mono) | 0 | Code, diagram labels, timestamps |
| body-lg / body | `18 / 16px` | 400 | 0 | Prose |

**Rules:** Headline max **18ch**; body max **62ch**. All `mono-label` text is uppercase + tracked — the recurring "system label" voice (`FEATURED WORK`, `STATUS: PRODUCTION`). Tabular figures on all metrics so count-ups don't jitter. **No italics, no text-shadow, no gradient text.**

---

## 4. Space · Grid · Radius

- **Spacing scale** (4px base): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`. Section vertical padding: **128px desktop / 80px mobile**. Eyebrow → headline → body rhythm: `16px → 24px`, identical everywhere.
- **Grid:** max content width **1152px** (`max-w-6xl`), gutters 24px mobile / 48px desktop. 12-column, used **asymmetrically** — prose and headers occupy the left columns, leaving deliberate right-side whitespace. **Left-anchored** is the quiet differentiator from centered templates.
- **Section marker:** a **1px left border + mono eyebrow** starts each section (a log-entry tick), never a centered heading with a decorative underline.
- **Radius — only these three, ever:**

  | Token | Value | Usage |
  |---|---|---|
  | `--radius-sm` | 6px | Chips, buttons, status pills |
  | `--radius-md` | 10px | Cards, code blocks, inputs |
  | `--radius-lg` | 14px | Modals, large media frames |

- **Elevation** is communicated by background-step + border strength (`raised` + `line` → hover `overlay` + `line-strong`), **not shadows**. A single soft shadow is permitted only on the lightbox.

---

## 5. Motion — a system with shared physics

**Two easings, three durations. Total.**

| Token | Value | Used for |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | All entrances, reveals, hovers |
| `--ease-inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | The packet, underline slide, lightbox |
| `--dur-fast` | 180ms | Hovers, color/border transitions |
| `--dur-base` | 450ms | Scroll reveals, card transitions |
| `--dur-slow` | 800ms | Hero choreography, count-ups, SVG edge draws |

**Patterns:**

- **One hero choreography** — eyebrow → headline by line → buttons → pipeline edges draw → packet → proof row (~1.2s, once).
- **One scroll-reveal** — opacity `0→1` + translateY `16px→0`, `--dur-base`, triggered once at 20% viewport entry. Children stagger 50ms, capped at 6.
- **Flat hovers** — background + border-color transition only; an internal `→` nudges 4px. **No lift, no glow, no scale.**
- **Status dots** pulse 2s. **Links** draw a 1px underline left→right. **Nav** underline slides between items.
- **Section dividers** fire one packet along the line as they enter view.
- **Cursor tracking** (mouse only): the hero dot-grid canvas brightens around the pointer (`HeroCanvas`); a monochrome sheen follows it across featured rows and metrics (`Tracked`).
- **Reduced motion** (`prefers-reduced-motion`) → all reveals render in final state, packet hidden, count-ups print final values, pulses static. Wired through one shared hook (`lib/motion.tsx`).
- **Performance:** animate only `transform` / `opacity` (+ SVG stroke/clip). All loops pause when the tab is hidden or scrolled off-screen.

---

## 6. The signature — the live pipeline

> A schematic node-graph of an AI workflow, drawn live in the hero with a packet of light traversing it — and that same node/edge/label language reused for **every** architecture diagram on the site.

- **Nodes:** rounded-rect chips (`raised`, 1px `line`, `radius-sm`) with `mono-label` text and a muted brand icon where the stage is a real service (WhatsApp, Postgres, …). Concept stages (INTENT, RAG) stay text-only — the distinction is deliberate.
- **Edges:** 1px `line-strong`, orthogonal with rounded corners (n8n-style), drawn on load via `stroke-dashoffset`.
- **The packet:** a 3px `signal` dot with a short fading trail, traversing every ~7s, pulsing each node it passes (and flashing that node's brand icon to full color).
- **Escalation easter egg:** every third cycle the packet routes to `HUMAN ESCALATION` and that node's dot blinks amber. Positioning encoded in motion. Clicking the node scrolls to contact.
- **Reuse:** the hero (`PipelineSVG` / `MobilePipeline`), every case-study architecture diagram and card media (`FlowDiagram`), the section dividers, the boot screen, and the 404 (`ROUTE NOT FOUND → ESCALATING`) all speak this language. The site feels like one coherent system.

Implementation: hand-written inline SVG + a small rAF loop. No canvas, no Three.js, no particle library.

---

## 7. Component inventory

Build exactly these; resist inventing more. A small, consistent kit is what "clean" means in practice.

- **UI** (`components/ui/`): `Button` (primary signal-border / ghost), `Chip` (stack tag, non-interactive), `StatusDot` (live-pulse / warn / neutral), `SectionHeader` + `SectionDivider`, `MediaFrame` (device-neutral frame with three mono dots + filename), `Tracked` (cursor sheen).
- **Sections** (`components/sections/`): `Hero`, `Metrics` (count-up strip), `FeaturedWork` (full-width rows, not a card grid), `Archive` (compact table), `Experience` (left rail + node-dots), `Stack` (two-tone definition list), `About` (the one blockquote), `Contact` (mailto as the design element).
- **Pipeline** (`components/pipeline/`): `PipelineSVG`, `MobilePipeline`, `FlowDiagram`, `HeroCanvas`.
- **Chrome:** `NavBar` (sliding underline, scroll-border), `Footer` (live `UPTIME` + `VIEW SOURCE`), `ReadingProgress`, `BootSequence` (sci-fi cold-boot), `JsonLd`.
- **Logic** (`lib/`): `motion.tsx` (Reveal, useReducedMotion, useCountUp), `schema.ts` (JSON-LD), `color.ts` (muteBrand), `brand-icons.ts`, `work.ts` (MDX loader). Content lives in `data/site.ts` + `content/work/*.mdx`.

---

## 8. Accessibility floor (itself a credibility signal)

- One `<h1>` per page; sectioned `<h2>`s; real `<nav>` / `<main>`; rows that navigate are `<a>`.
- Full keyboard nav; visible 2px focus ring (`:focus-visible` only); skip-to-content link.
- Every diagram has a meaningful `aria-label`; decorative motion is `aria-hidden`.
- Color is **never** the only carrier of status — dots are always paired with a text label.
- Contrast: `--color-fg2` on `--color-base` ≥ 4.5:1; `--color-fg3` reserved for non-essential metadata.
- The boot overlay sets the app `inert` so focus can't strand behind it; reduced-motion skips it entirely.

---

## 9. The discipline — what's refused

The anti-template audit. The site contains **none** of:

- ✕ Gradients (except the one hero glow), glassmorphism, icon-in-circle feature cards
- ✕ Anything center-aligned except the lightbox
- ✕ Emoji in headings/labels · "passionate developer" · "crafting digital experiences"
- ✕ More than **3 radii / 2 easings / 3 durations** in shipped CSS — grep for strays
- ✕ Cyan > 2% of any viewport · green anywhere but `PRODUCTION` / `OPEN TO WORK`
- ✕ Hover lift, glow, or scale — border/background shift only
- ✕ Stock 3D illustrations, "AI brain" imagery, particle-network backgrounds
- ✕ Typewriter job-title hero · scroll-jacking · parallax · alternating fly-ins
- ✕ Logo walls / 60 individual chips · fake-clickable cards

---

## 10. How to extend

When adding a section or component:

1. Pull colors, radii, type, and motion **only** from the tokens above (`@theme` in `globals.css`). Never hardcode a hex, duration, or radius.
2. Lead the section with a `1px left border + mono-label` eyebrow; left-anchor the content; keep prose ≤ 62ch.
3. Data → mono, prose → Mona Sans. Numbers get `tabular-nums`.
4. Reuse the `Reveal` wrapper for scroll-in; reuse `FlowDiagram` for any architecture graphic.
5. Hover = border/background only. New interactive color = cyan, and only if it's truly interactive.
6. Run the §9 audit before shipping: `grep` for stray radii/easings/gradients; verify reduced-motion; keyboard-walk the focus rings.

**Stack:** Next.js (App Router, static export) · Tailwind v4 + CSS custom properties · self-hosted fonts · MDX case studies · deployed on Vercel at `www.sawabpsiddiq.com`.
