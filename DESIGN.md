# StandOut — DESIGN.md

> Design-system source of truth for StandOut, a guided, privacy-first CV builder.
> Inspired by the principles reviewed in `awesome-design-md` (semantic tokens, intentional typography, restraint) and by the execution quality of `GeeQR` (privacy-first, client-side, polished micro-interactions, light/dark, a11y, static deploy). This file defines StandOut's **own** visual identity.

---

## 1. Product Personality

**Keywords:** trustworthy · calm · precise · approachable · slightly premium

StandOut is a career-critical tool. People trust it with information that affects their income and education. The UI must feel like a serious product, not a marketing toy.

- **Trustworthy over playful.** No giant emojis, no meme copy, no aggressive sales banners.
- **Calm over loud.** Muted surfaces, generous whitespace, small, confident type. Color is used for meaning, not decoration.
- **Precise over generic.** Every section label, helper text, and button explains *why* the user is doing this step.
- **Approachable for beginners, fast for experts.** Both paths coexist without slowing the other down.

If GeeQR is “confident utility,” StandOut is “quiet confidence.”

---

## 2. Brand & Color

### 2.1 Brand Ink

The brand is **ink-navy**, not electric blue. It signals documents, authority, and print quality while remaining warm enough for screens.

- `--brand: #0f2439`  — primary ink (light theme header actions, links, selected states)
- `--brand-strong: #0a1c2e` — pressed / emphasis
- `--brand-soft: #e8eef5` — subtle backgrounds for selected cards
- `--accent: #b7791f`  — very restrained warm amber for trust badges, publication dots, “recommended” ribbons. Never large fills.
- `--accent-soft: #fdf6e3`

Dark theme inverts carefully:
- `--brand: #86b7ff`  (legible on dark surfaces, still “ink” family)
- `--brand-soft: rgba(134,183,255,0.12)`

### 2.2 Surfaces (Light)

- `--bg: #f6f7f9` — app canvas
- `--surface: #ffffff` — cards, editor panels
- `--surface-2: #f1f4f8` — inset areas, empty states
- `--surface-3: #e9eef3` — dividers that need more weight
- `--paper: #ffffff` — CV document itself (always light, never themed)

### 2.3 Surfaces (Dark)

- `--bg: #0e141e`
- `--surface: #161e2d`
- `--surface-2: #1c2a42`
- `--surface-3: #23324e`

### 2.4 Text

- Light: `--text: #0f172a` (slate-900), `--text-2: #475569`, `--text-3: #94a3b8`
- Dark: `--text: #eef2f8`, `--text-2: #a8b3c6`, `--text-3: #7a8599`

### 2.5 Borders & States

- Light: `--border: #e2e8f0`, `--border-strong: #cbd5e1`
- Dark: `--border: rgba(255,255,255,0.08)`, `--border-strong: rgba(255,255,255,0.16)`
- Success: `#0f7a3d`, Warning: `#92400e`, Error: `#be123c`, Info: `#0f2439`
- Dark variants use softly translucent tints.

**Do:** Use border + shadow for elevation.  
**Don't:** Use heavy drop shadows or neon glows anywhere.

### 2.6 Shadows

- `--shadow-sm: 0 1px 2px rgba(15,36,57,0.06)`
- `--shadow-md: 0 6px 20px rgba(15,36,57,0.08)`
- `--shadow-lg: 0 16px 40px rgba(15,36,57,0.12)`
- Dark shadows use black at 0.4–0.5 opacity.

---

## 3. Typography

### 3.1 Families

- **Sans (UI):** `Inter` — neutral, highly legible at small sizes, excellent for forms. Fallback: `system-ui, -apple-system, Segoe UI, Helvetica, Arial`.
- **Serif (Display/CV):** `Newsreader` — used *only* for CV document headings and for hero titles. Gives a slight editorial premium without feeling academic.
- **Mono:** `JetBrains Mono` — for small metadata (dates, locations), never body.

### 3.2 Scale

- `--text-xs: 0.75rem`  (12) — labels, captions
- `--text-sm: 0.875rem` (14) — helper text, inputs
- `--text-base: 0.9375rem` (15) — body default (slightly smaller than 16 for denser editor)
- `--text-md: 1rem` (16) — preview body, article
- `--text-lg: 1.125rem` (18)
- `--text-xl: 1.375rem` (22) — card titles
- `--text-2xl: 1.75rem` (28) — section titles
- `--text-3xl: clamp(2rem, 1.6rem + 2vw, 2.75rem)` — hero

Line-height: `1.55` body, `1.15` headings. Letter-spacing: `-0.015em` for headings.

### 3.3 Type Rules

- **Do:** Semi-bold (600) for headings, medium (500) for controls. Regular (400) for body.
- **Don't:** Use font-weight 800 in UI except hero numeral (`46.`) style details.
- **Do:** All-caps 11px tracking 0.08em for eyebrows and CV section labels.
- **Don't:** Use serif in form controls.

---

## 4. Spacing & Layout

Base unit 4px. Canonical stack: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 64`.

- `--space-1: 0.25rem` … `--space-16: 4rem`
- Max content width: `--max: 72rem` (1152px). Marketing sections may use `--max-narrow: 44rem` for reading.
- Header height: `--header-h: 4rem`
- Radius: `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 14px`, `--radius-xl: 18px`, `--radius-full: 999px`
- CV paper radius in preview: `10px` on desktop (soft shadow), `0` in print.

**Layout grid:**

- Marketing pages: 12-col implicit, centered container with 16px gutters mobile, 24px desktop.
- Builder: split `min(560px, 48%)` editor + `1fr` preview on >=1024px. Below that, toggle tabs.

---

## 5. Components

### 5.1 Buttons

- **Primary:** filled ink (`--brand`). Height 40–44px. Font 14px medium. Radius 10px. Shadow-sm on default, no shadow on pressed. Hover: slightly lighter ink, not brand-blue.
- **Secondary:** surface with border, same height. Hover: `--surface-2`.
- **Ghost:** text only, used for “Skip” and tertiary actions.
- **Destructive:** outlined red, used only for Delete entry.
- Icon buttons: 36px touch target, 20px icon, border on hover.

Focus: 2px solid `--brand` offset 2px, never removed.

### 5.2 Cards

White surface (dark: `--surface`), 1px `--border`, `radius-lg`, `shadow-sm`. No border heavier than 1px. Selected state: `border: 1.5px solid var(--brand)` + `--brand-soft` fill.

### 5.3 Inputs

- Height 42px, radius 10px, border 1px `--border`, background `--surface` (light) / `--surface-2` (dark).
- Focus: border becomes `--brand` + 3px soft ring `rgba(15,36,57,0.12)`.
- Error: border `#be123c`, ring `rgba(190,18,60,0.12)`, error text 13px red with icon.
- Helper text: 13px `--text-2`.
- Textarea min-height 96px, resize vertical.

### 5.4 Segmented Control / Radio Cards

Large radio cards (used for purpose/industry selectors) behave like GeeQR's segmented control but bigger: icon (20px) + label + description. Checked state has ink border + tiny check dot. Full keyboard roving.

### 5.5 Badges & Tags

Rounded-full, 11px uppercase tracking 0.06em or 13px regular. Used for “Recommended”, “ATS-friendly” etc.

### 5.6 Elevation

- Cards rest at `shadow-sm`
- Floating preview toolbar at `shadow-md`
- Modal/sheet at `shadow-lg`

No glassmorphism. Header is translucent only to reduce visual weight: `backdrop-filter: blur(12px)` with `rgba(255,255,255,0.84)` light, `rgba(14,20,30,0.84)` dark.

---

## 6. CV Document Visual Rules

The CV paper is **always** light, because the PDF is light. The preview uses true A4 proportions (210×297mm) scaled to fit. Shades:

- Body: `Inter` 9–10pt equivalent (approx 13–14px screen)
- Headings: `Newsreader` or `Inter` semi-bold depending on template
- Margins: 14–18mm
- Colors: ink (#0f172a) + muted slate + single accent per template (never more than one accent hue)
- Rules: 1px hairlines `rgba(15,36,57,0.12)` for section separators

Templates each have a distinct purpose — see `TEMPLATE CATEGORIES` — but share the same underlying data.

---

## 7. Motion

- `--ease: cubic-bezier(0.22,1,0.36,1)` (gentle spring)
- `--dur-fast: 120ms` (hover, focus)
- `--dur: 200ms` (transitions, card select)
- `--dur-slow: 320ms` (panel enter)

Never auto-animate preview typing character-by-character. Update is immediate. Step transitions slide 8px + fade 160ms, respecting `prefers-reduced-motion`.

---

## 8. Responsive & A11y

- Mobile first. Touch targets >=44px. No horizontal scroll at 320px.
- Builder: toggle Editor/Preview tabs on mobile; floating “Download PDF” sticky bar.
- Tablet 768–1023: editor full-width, preview below as collapsible sheet.
- Desktop >=1024: side-by-side editor + sticky preview.
- Keyboard: full roving focus, skip link, visible focus rings, no focus traps.
- Forms: `<label>` + `aria-describedby` for helper/error, `aria-invalid` on error.
- Color is never the only signal: errors have icon + text.

---

## 9. Imagery & Illustration

No stock hero photo of people shaking hands. If illustration is needed, use thin-line icons (Lucide-style 1.6px stroke) and subtle paper texture on preview shadow. Template thumbnails are miniature renderings of real CV HTML, not pre-made images.

---

## 10. Do / Don't

| Do | Don't |
|---|---|
| Use small, honest helper text under inputs | Use placeholder as label |
| Show real empty states (“No projects yet — add your first”) | Leave blank white space |
| Keep primary CTA to one per section (“Create my CV”) | Put three competing CTAs side by side |
| Use sentence case everywhere | Use Title Case for buttons |
| Make privacy claims that match implementation | Claim “we never see your data” while loading third-party fonts that do — document it honestly |
| Reveal progressive disclosure (e.g., “Do you have work experience?” → if yes show fields) | Show 50 fields on one page |

---

## 11. Implementation Notes

- Tokens live in `src/styles/tokens.css` and are the single source of truth.
- No inline color values in components. Import tokens via CSS variables only.
- Dark theme toggles via `html.dark` class, persisted in `localStorage` under `standout:theme`.
- CV templates import `src/styles/templates.css` but keep document colors isolated from app theme.
- All pages wrap with `.container` and semantic landmarks: `<header>`, `<main>`, `<section>`, `<footer>`.
- Respect `prefers-reduced-motion` globally.

---

*This document is intentionally opinionated. StandOut should be recognizable as a calm, premium document tool — closer to Linear/Notion's restraint than to a neon AI landing page.*
