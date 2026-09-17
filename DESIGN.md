# StandOut — DESIGN.md

> Design-system specification for StandOut — a premium, calm, guided, privacy-first CV builder that helps you create the right CV for what you're trying to achieve. Builds on a warm stone paper (`#f5f5f0`), deep teal action (`#206062`), warm coral accent (`#e9795b`), editorial serif italic display accent, and precision document typography. Your CV stays in your browser.

---

## 1. Product Personality

**Keywords:** premium · calm · editorial · trustworthy · warm · crafted · honest · human

StandOut is designed as a premium career tool that happens to be free and privacy-conscious.

- **Clarity over decoration.** Generous whitespace, strong typography hierarchy, intentional colour — not gradients or glassmorphism.
- **Warm over cold.** Warm sage-stone paper `#f5f5f0` instead of clinical gray; human coral accents; dark charcoal pine text `#1b2424` instead of jet-black.
- **Editorial precision.** Modern geometric sans `Plus Jakarta Sans` paired with elegant serif italic `Newsreader` for emotional emphasis in the hero headline.
- **Private by design.** No login required; document data lives in the user's browser `localStorage`; PDF exports directly through the browser print engine with selectable vector text. Your CV stays in your browser.
- **Guided, not overwhelming.** Progressive workflow 01–06, live preview, ATS checklist, job-specific tailoring — all on-device.

**Tagline:** *Build a CV that stands out for the opportunity you're actually applying for.*

---

## 2. Brand & Color Palette

### 2.1 Core Palette

- **Primary Teal (Action & Brand):** `#206062`  
  - Hover: `#1b5355`
  - Pressed: `#17484a`
  - Soft fill: `#e8f1f0`
  - Ring: `rgba(32, 96, 98, 0.20)`
  - Used for: Primary CTA buttons (Create your CV, Download PDF), italic headline accent (`what you’re trying to achieve`), active stepper states, section indicators, ATS checks.

- **Warm Coral (Terracotta Accent):** `#e9795b`  
  - Line accent: `#ed9e88`
  - Strong: `#d96543`
  - Soft fill: `#fbf0eb`
  - Used for: Logo background, hero eyebrow dot & text, vertical accent bar, CV subtitle role, company names on CV, `✦` callout star.

- **StandOut wordmark:** Semibold sans `Plus Jakarta Sans` at `-0.03em` tracking, colour `var(--text)`. The mark is the coral square with three white pills, rotated `-5deg`.

### 2.2 Surfaces (Light)

- `--bg: #f5f5f0` — warm stone paper canvas
- `--surface: #ffffff` — cards, editor panels, sheets
- `--surface-2: #eeede6` — inset areas, preview wrap, stepper track
- `--surface-3: #e2e0d8` — subtle dividers and progress backgrounds
- `--paper: #ffffff` — CV document sheet itself (always white, printable)

### 2.3 Surfaces (Dark)

- `--bg: #141a1a` — deep dark pine-slate
- `--surface: #1c2424` — dark cards
- `--surface-2: #232d2d` — inset preview wrapper
- `--surface-3: #2b3636` — dividers
- `--brand: #368e91` — luminous teal for dark contrast
- `--accent: #f08b71` — luminous warm coral

### 2.4 Typography & Text

- Light: Primary `#1b2424`, secondary `#525866`, tertiary `#8a909d`
- Dark: Primary `#f0f3f3`, secondary `#9ba8a8`, tertiary `#6b7878`

### 2.5 Borders & Shadows

- Border: `#e2e0d8`, strong `#cfccc2`, shadow sm/md/paper as per tokens.css — soft, natural, not huge.

---

## 3. Typography

- **UI Sans:** `Plus Jakarta Sans`, `Inter`, system-ui — geometric, warm curves, tight tracking on headings (`-0.03em`).
- **Editorial Serif:** `Newsreader` (italic) — selective accent in hero headline: *what you’re trying to achieve*.
- **Monospace:** `JetBrains Mono` — dates, locations, technical tags, phase numbers `01`–`06`.
- **Hierarchy:** 1.06 leading tight for display, 1.6 for body, 700 for headings, 500–600 for UI labels.

---

## 4. Components & Geometry

- **Buttons:** Clean rounded rectangles `8px`, 42px height, 46px hero, 36px small. Primary teal, secondary border, ghost minimal.
- **Cards:** `12px` radius, 1px solid `#e2e0d8`, subtle elevation, hover lift `translateY(-2px)`.
- **Inputs:** `8px` radius, 42px min-height, focus border teal + 3px ring. Errors in red soft.
- **Logo Mark:** 32×32 rounded square tilted `-5deg`, fill `#e9795b`, 3 vertical white pill bars.
- **Hero:** Accent line `1.5px` coral left of eyebrow, stacked paper with circular backdrop `#eae7df`, pointer annotations, Maya Chen document inside.
- **Goals grid:** 4-col cards with icon, label, desc, arrow — hover lifts and tints.
- **Editor:** Left vertical nav (148px) + center pane + right live preview; phases `01`–`06` progress; ATS checklist card; photo uploader with styles; template groups by ATS/Professional/Modern/Creative/Academic/Photo.

## 5. Builder Workflow

- **Phases:** 01 Choose your goal (Goal + Opportunity), 02 Add your information (Personal + About), 03 Build your CV (Education/Experience/Projects/Skills), 04 Customize (More/Photo/Design), 05 Review (ATS checklist, formatting), 06 Export (Download PDF, page count, selectable text).
- **Persistent progress:** Phase bar + progress bar + left nav stepper + percent complete.
- **Live preview:** A4 proportions (794×1123), document shadow, zoom controls, page count, template name, responsive scaling via CSS transforms per breakpoint, photo support.

## 6. Privacy & Export

- **Your CV stays in your browser.** No backend storage, no account. `localStorage` only for convenience; JSON backup.
- **Export:** Prominent Download PDF (primary), secondary Copy JSON. Review state shows Information complete / Formatting checked / Preview reviewed. Print dialog → Save as PDF, A4, Background graphics.

