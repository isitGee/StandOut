# candid — DESIGN.md

> Exact design-system specification for candid, a calm, guided, privacy-first CV builder.
> Directly copied from the Candid reference (`https://manus.im/share/rwO5d1Wq83SaD0jk6cwkHD`): warm stone paper (`#f5f5f0`), rich deep teal action (`#206062`), vibrant warm coral accent (`#e9795b`), editorial serif italic display accent, and precision document typography.

---

## 1. Product Personality

**Keywords:** calm · editorial · trustworthy · warm · crafted · honest

candid is designed as a calm, confident document tool for career-critical work.

- **Calm over loud.** Soft paper canvas (`#f5f5f0`), generous whitespace, no aggressive upsells, no distracting banner noise.
- **Warm over cold.** Warm sage-stone paper instead of clinical gray; human coral accents; dark charcoal pine text instead of stark jet-black.
- **Editorial precision.** Modern geometric sans (`Plus Jakarta Sans`) paired with an elegant, expressive serif italic (`Newsreader`) in the hero headline.
- **Honest privacy.** No login required; document data lives in the user's browser `localStorage`; PDF exports directly through the browser print engine with selectable vector text.

---

## 2. Brand & Color Palette

### 2.1 Core Palette

- **Primary Teal (Action & Brand):** `#206062`  
  - Hover: `#1b5355`
  - Pressed: `#17484a`
  - Soft fill: `#e8f1f0`
  - Ring: `rgba(32, 96, 98, 0.20)`
  - Used for: Primary CTA buttons, italic headline accent (`what you’re trying to achieve`), active stepper states, section indicators.

- **Warm Coral (Terracotta Accent):** `#e9795b`  
  - Line accent: `#ed9e88`
  - Strong: `#d96543`
  - Soft fill: `#fbf0eb`
  - Used for: Logo background, hero eyebrow dot & text, vertical accent bar, CV subtitle role, company names on CV, `✦` callout star.

### 2.2 Surfaces (Light)

- `--bg: #f5f5f0` — warm stone paper canvas
- `--surface: #ffffff` — cards, editor panels, sheets
- `--surface-2: #eeede6` — inset areas, preview wrap, stepper track
- `--surface-3: #e2e0d8` — subtle dividers and progress backgrounds
- `--paper: #ffffff` — CV document sheet itself

### 2.3 Surfaces (Dark)

- `--bg: #141a1a` — deep dark pine-slate
- `--surface: #1c2424` — dark cards
- `--surface-2: #232d2d` — inset preview wrapper
- `--surface-3: #2b3636` — dividers
- `--brand: #368e91` — crisp luminous teal for dark contrast
- `--accent: #f08b71` — luminous warm coral

### 2.4 Typography & Text

- Light:
  - Primary text: `#1b2424` (deep pine-charcoal)
  - Secondary text: `#525866` (muted slate gray)
  - Tertiary / helper: `#8a909d`
- Dark:
  - Primary text: `#f0f3f3`
  - Secondary text: `#9ba8a8`
  - Tertiary / helper: `#6b7878`

### 2.5 Borders & Shadows

- Border: `#e2e0d8` (light warm gray)
- Border strong: `#cfccc2`
- Shadow sm: `0 1px 2px rgba(27, 36, 36, 0.04), 0 1px 3px rgba(27, 36, 36, 0.03)`
- Shadow md: `0 4px 16px rgba(27, 36, 36, 0.06), 0 1px 3px rgba(27, 36, 36, 0.04)`
- Shadow paper: `0 10px 30px rgba(27, 36, 36, 0.06), 0 1px 3px rgba(27, 36, 36, 0.04)`

---

## 3. Typography

- **UI Sans:** `Plus Jakarta Sans`, `Inter`, system-ui — geometric, warm curves, tight tracking on headings (`-0.03em`).
- **Editorial Serif:** `Newsreader` (italic) — used selectively for emotional accent emphasis in display headings.
- **Monospace:** `JetBrains Mono` — dates, locations, technical tags.

---

## 4. Components & Geometry

- **Buttons:** Clean rounded rectangles with `border-radius: 8px` (not 999px pills).
- **Cards:** `border-radius: 12px`, 1px solid `#e2e0d8`, subtle elevation.
- **Inputs:** `border-radius: 8px`, 42px min-height, focus border `#206062` + 3px soft teal ring.
- **Logo Mark:** 32x32 rounded square tilted -5deg with fill `#e9795b` and 3 vertical white pill bars.
- **Hero Document Visual:** Stacked multi-sheet paper effect with circular backdrop (`#eae7df`) and pointer annotations.
- **Document Layout (Maya Chen):**
  - Left avatar badge in pale teal `#dce8e6`
  - Name in bold sans-serif `#111827`
  - Subtitle role in coral `#e9795b` uppercase tracking
  - Solid 1.5px horizontal dividing rule
  - Clean pill skill tags with 1px border
