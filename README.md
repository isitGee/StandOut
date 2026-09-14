# StandOut — Create the right CV for what you’re trying to achieve

StandOut is a guided, privacy-first CV/resume builder that helps two very different users: those who know exactly what they want, and those who just know *“I need a CV.”*

Tell us what you’re trying to accomplish — we’ll guide you to the right structure, let you customize it, show a live A4 preview, and give you a professional PDF with selectable text. No account required. Your data stays in your browser.

**Live demo:** https://isitgee.github.io/StandOut/

## Features

- **Two paths, one builder** — *Quick* (pick purpose/style/photo yourself) and *Guided* (5 plain-language questions with an “I’m not sure” option)
- **Plain-language guidance** — no assumed knowledge of ATS, chronological/functional, or recruiter jargon — helpers explain every section
- **9 polished templates with clear purpose** — ATS Classic, Executive, Modern Split, Contemporary, Creative Portfolio, Editorial, Academic Classic, Graduate (student), Professional Photo — switch without re-typing
- **Conditional form** — multi-step editor (Goal → Personal → About → Education → Experience → Projects → Skills → More → Photo → Design) that hides what you don’t need; empty sections are omitted from the final CV
- **Photo support done right** — upload, style (circle/rounded/square/portrait), remove; with honest guidance about when a photo is (and isn’t) appropriate
- **Live A4 preview** — side-by-side on desktop, toggle on mobile; preview mirrors the final PDF
- **Professional PDF export** — A4, crisp selectable text, proper margins and page breaks, no clipped content; via browser print-to-PDF (client-side)
- **Privacy-first, client-side** — no account, no backend storage of CV content in V1; progress is saved in `localStorage` for convenience
- **Light & dark themes**, responsive (mobile-first), keyboard-navigable, screen-reader-friendly, reduced-motion aware, touch targets ≥44px
- **SEO-ready** — semantic HTML, meta descriptions, canonical URL, Open Graph, structured data (WebApplication), `robots.txt`, `sitemap.xml`, crawlable informational pages

## Who it’s for

- Students with no experience
- Recent graduates, internships, scholarships & fellowships
- Experienced professionals targeting ATS or human readers
- Healthcare professionals who want a photo, freelancers showing portfolios, career changers, and anyone who has never made a CV before

All nine scenarios produce a sensible result — sensible ordering, appropriate template, and intentional empty-state handling.

## Tech stack

- React 18 + Vite 5 + React Router 6
- Modern CSS with design tokens (CSS variables), no UI framework — `DESIGN.md` is the source of truth
- Client-side PDF via `@media print` (no server, no rasterization) — selectable, crisp text
- Static deploy (GitHub Pages, Vercel, Netlify)

## Quick start

Requires Node.js 18+.

```bash
git clone https://github.com/isitGee/StandOut.git
cd StandOut
npm install
npm run dev
# open the printed local URL (http://localhost:5173)
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (host 0.0.0.0:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the built site |
| `npm test` | Smoke checks (no browser needed) |

## Deployment

Static build — any host works.

- **GitHub Pages:** push to `main` triggers `.github/workflows/deploy.yml` (build → `dist/` → Pages). HashRouter keeps deep links working on a project site.
- **Vercel/Netlify:** framework “Vite”, build `npm run build`, output `dist`.

## Project structure

```text
src/
├── components/
│   ├── layout/        # Header, Footer
│   ├── builder/       # GoalStep, PersonalStep, ... PhotoStep, DesignStep, FormFields
│   ├── preview/       # Preview (live A4 + print)
│   ├── templates/     # CVTemplates (Classic, Split, Creative, Academic, Student, Photo)
│   └── Icons.jsx, Toasts.jsx
├── data/              # cvSchema, purposes, industries, templatesRegistry, defaultContent
├── engine/            # recommendations, validation, storage
├── hooks/             # useTheme, useLocalCV
├── styles/            # tokens, base, app, templates, print
├── pages/             # Home, Builder, Templates, Guide, Examples, FAQ, StaticPages
├── App.jsx
└── main.jsx
public/
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── og-image.svg
DESIGN.md               # design-system source of truth
```

## Information architecture

- Home, Builder, Templates, Guide, Examples, FAQ, Privacy, Terms, About, Contact
- Builder is the interactive core; informational pages are crawlable and semantic

## Data model (concept)

```js
{
  personal: { fullName, headline, email, phone, location, website, linkedin, summary },
  target: { purpose, industry, experienceLevel, submissionType, stylePreference },
  education: [], experience: [], projects: [], flatSkills: "",
  certifications: [], achievements: [], volunteering: [], languages: [], interests: [], references: [],
  customSections: [], photo: { dataUrl, style, enabled }, design: { templateId }
}
```

See `src/data/cvSchema.js` and `src/engine/recommendations.js` for the template-selection heuristics.

## Privacy

V1 runs entirely in the browser. PDF generation and recommendation happen locally. Your CV JSON is stored in `localStorage` (`standout:cv:v1`) so you don’t lose work — it never goes to an application server. You can reset or copy a JSON backup in the builder. Note: standard hosting/CDN logs and Google Fonts requests still occur at the infrastructure level — see Privacy Policy in the app for the honest nuance.

## License

MIT

## Author

Built by George Mwanga — https://github.com/isitGee
