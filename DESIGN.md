# StandOut — DESIGN.md

> Design-system source of truth for StandOut, a guided, privacy-first CV builder.
> Inspired by `awesome-design-md` (semantic tokens, restraint), `GeeQR` execution quality (privacy-first, polished, a11y), and the warm editorial clarity of the Manus/Candid reference (soft paper, terracotta accent, generous whitespace). StandOut keeps its **own** ink-navy + warm-stone identity.

---

## 1. Product Personality

**Keywords:** trustworthy · warm · editorial · calm · slightly premium

StandOut is career-critical. The UI must feel like a serious document tool — not a marketing toy, not a cold admin dashboard.

- **Trustworthy over playful.** No giant emojis, no meme copy.
- **Warm over cold.** Warm stone paper (`#fdfcfa`) instead of cold gray, soft shadows, editorial serif for display. Feels like a well-made paper product.
- **Calm over loud.** Muted surfaces, generous whitespace, small confident type. Color is for meaning, not decoration.
- **Precise over generic.** Every label and helper answers *why*.

If GeeQR is “confident utility,” StandOut is “quiet, editorial confidence” — closer to Linear/Notion restraint with a touch of *Candid/Manus* warmth.

---

## 2. Brand & Color

### 2.1 Brand Ink + Warm Accent

Warm editorial palette — ink for authority, terracotta for humanity (the Manus reference uses a similarly warm, paper-centric palette).

- `--brand: #12213a`  — deep ink (links, selected, primary actions)
- `--brand-strong: #0e1a2e` — pressed
- `--brand-soft: #eef2f8` — subtle selected fill
- `--accent: #b65a2a` — restrained terracotta (eyebrow bar, step numeral, creative template bar). Never large fills.
- `--accent-soft: #fdf0e6`

Dark inverts carefully:
- `--brand: #9bb6ff`
- `--brand-soft: rgba(155,182,255,0.14)`

### 2.2 Surfaces (Light) — warm, not cold

- `--bg: #fdfcfa` — warm paper app canvas (with subtle radial glow)
- `--surface: #ffffff` — cards, editor
- `--surface-2: #f7f3ee` — inset, preview wrap, empty states
- `--surface-3: #efe9e0` — dividers
- `--paper: #ffffff` — CV document itself (always light)

### 2.3 Surfaces (Dark)

- `--bg: #0f141b`
- `--surface: #161e2d`
- `--surface-2: #1c2436`
- `--surface-3: #222e44`

### 2.4 Text

- Light: `--text: #1c1917` (stone 900), `--text-2: #57534e`, `--text-3: #a8a29e`
- Dark: `--text: #eef2f8`, `--text-2: #a8b3c6`, `--text-3: #7a8599`

### 2.5 Borders & States

- Light: `--border: #e7e0d6`, `--border-strong: #d6cbb8`, `--border-soft: #f1ebe3`
- Dark: `--border: rgba(255,255,255,0.08)`, `--border-strong: rgba(255,255,255,0.14)`
- Success/Warning/Error as before, but warm-tinted rings
- **Do:** 1px border + soft shadow for elevation
- **Don't:** heavy drops or neon glows

### 2.6 Shadows — warm, soft

- `--shadow-sm: 0 1px 2px rgba(28,25,23,0.06)`
- `--shadow-md: 0 8px 24px rgba(28,25,23,0.08)`
- `--shadow-lg: 0 18px 48px rgba(28,25,23,0.12)`
- `--shadow-paper: 0 2px 12px rgba(28,25,23,0.07), 0 12px 40px rgba(28,25,23,0.10)`
- Header glass: `rgba(253,252,250,0.88)` with `blur(14px)`

---

## 3. Typography

### 3.1 Families

- **Sans (UI):** `Inter` — forms, body, controls
- **Serif (Display/CV):** `Newsreader` — hero titles, CV headings, section titles. Editorial premium without academic stiffness.
- **Mono:** `JetBrains Mono` — dates, locations, metadata only

### 3.2 Scale

- `--text-xs: 0.72rem`, `--text-sm: 0.875rem`, `--text-base: 0.9375rem`, `--text-md: 1rem`
- `--text-xl: 1.375rem`, `--text-2xl: 1.75rem`, `--text-3xl: clamp(2.2rem, 1.8rem + 2.4vw, 3.15rem)` — hero display
- Line-height: `1.60` body, `1.08` display. Letter-spacing: `-0.02em` display, `-0.025em` hero

### 3.3 Type Rules

- **Do:** Newsreader 600 for display, Inter 600 for controls, 400 for body
- **Don't:** extra-bold UI
- **Do:** All-caps 11px tracking 0.11em for eyebrows
- **Don't:** serif in form controls

---

## 4. Spacing & Layout

Base 4px. Stack `4/8/12/16/20/24/32/40/64`.

- `--max: 72rem`, `--max-narrow: 44rem`, `--header-h: 4.25rem`
- Radius softer: `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-lg: 16px`, `--radius-xl: 22px`, `--radius-full: 999px` — editorial roundness from Manus reference
- CV paper radius `12px` in preview, `0` in print

**Grid:**
- Marketing: centered container, 16px gutters mobile, 28px desktop
- Builder: 560px editor + `1fr` preview ≥1024px, otherwise tabs

---

## 5. Components

### 5.1 Buttons — pill, softer

- **Primary:** filled ink, 42–48px, `999px` radius, `0 2px 10px rgba(18,33,58,0.12)` shadow, hover lifts
- **Secondary:** white with warm border, same height
- **Ghost:** text only
- **Destructive:** outlined red for Delete

### 5.2 Cards

White, 1px warm border, `16px` radius, `shadow-sm`. Selected: `1.5px solid var(--brand)` + `#eef2f8` fill. Hover lifts 1px.

### 5.3 Inputs

- 44px height, 12px radius, warm border, white bg
- Focus: ink border + 3px `#eef2f8` ring
- Error: red border + soft ring
- Helper 13px stone-500

### 5.4 Choice Cards (purpose/industry etc.)

Large radio-cards, 16px radius, 38px icon, warm bg. Checked: ink border + ` #eef2f8` fill + ink icon with white check. Hover: slight lift to `surface-2`.

### 5.5 Tags

Pill, 11px uppercase tracking 0.06em, warm border

### 5.6 Elevation

- Cards `shadow-sm`
- Preview paper `shadow-paper`
- Header translucent, no glassmorphism elsewhere

---

## 6. CV Document — always light paper

A4 proportions scaled, warm paper rules (`#1c1917` + stone muted + single terracotta accent per template). Margins 14–18mm, 9–10pt body, 1px hairlines `#e7e0d6`.

---

## 7. Motion

- `--ease: cubic-bezier(0.22,1,0.36,1)`
- `--dur-fast: 140ms`, `--dur: 220ms`, `--dur-slow: 360ms`
- No typewriter preview; immediate update; respect `prefers-reduced-motion`

---

## 8. Responsive & A11y

- Mobile-first, 44px targets, no scroll at 320px
- Builder tabs on mobile, split sticky on desktop
- Keyboard roving, skip link, focus rings, `aria-describedby`/`aria-invalid`, color not sole signal

---

## 9. Imagery

No stock handshakes. Thin-line icons (1.6px), paper texture via subtle radial gradients, thumbnails are miniature real CVs.

---

## 10. Do / Don't

| Do | Don't |
|---|---|
| Warm, honest helper text | Placeholder as label |
| Real empty states | Blank white space |
| One primary CTA per section | Three competing CTAs |
| Sentence case | Title Case buttons |
| Honest privacy claims | “We never see your data” while loading fonts — document it |
| Progressive disclosure | 50 fields on one page |

---

## 11. Implementation

- Tokens in `src/styles/tokens.css` — single source
- No inline colors, only CSS vars
- Dark via `html.dark`, persisted `standout:theme`
- Templates isolate document colors from app theme
- Respect reduced-motion

*This revision leans warm-editorial, learning from the Manus/Candid reference’s paper-centric, terracotta-accented, generously spaced aesthetic — while keeping StandOut’s ink-navy authority.*
