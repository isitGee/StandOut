import { Link } from "react-router-dom";
import { IconShieldCheck, IconBriefcase, IconCompass, IconCheck, IconArrowRight } from "../components/Icons.jsx";
import { templates } from "../data/templatesRegistry.js";

export function Home() {
  return (
    <>
      {/* ---------- Hero Section ---------- */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-eyebrow-wrap">
                <div className="hero-accent-line" aria-hidden="true" />
                <div>
                  <div className="hero-eyebrow">
                    <span className="eyebrow-dot">•</span> A CALMER WAY TO MAKE A CV
                  </div>
                  <h1 className="hero-title">
                    Create the right<br />
                    CV for <em className="hero-serif-teal">what</em><br />
                    <em className="hero-serif-teal">you’re trying to</em><br />
                    <em className="hero-serif-teal">achieve.</em>
                  </h1>
                </div>
              </div>

              <p className="hero-subtitle">
                Whether you know exactly what you need or have no idea where to start, candid helps you build a CV that fits your goal.
              </p>

              <div className="hero-actions">
                <Link to="/builder" className="btn btn-primary btn-hero">
                  Create my CV <span className="btn-arrow" aria-hidden="true">&rarr;</span>
                </Link>
                <Link to="/templates" className="btn btn-secondary btn-hero">
                  Explore templates
                </Link>
              </div>

              <div className="hero-trust">
                <IconShieldCheck className="trust-icon" />
                <span>Private by design. No account needed.</span>
              </div>
            </div>

            {/* Right Visual: Stacked Papers with Maya Chen CV */}
            <div className="hero-visual-wrap">
              <div className="hero-visual-backdrop" aria-hidden="true" />

              {/* Left callout */}
              <div className="hero-callout hero-callout-left">
                <span className="callout-line" aria-hidden="true" />
                <span className="callout-text">
                  Structure that fits<br />your next step
                </span>
              </div>

              {/* Stacked sheets */}
              <div className="hero-paper-stack">
                <div className="hero-sheet hero-sheet-back" aria-hidden="true" />
                <div className="hero-sheet hero-sheet-middle" aria-hidden="true" />

                <div className="hero-sheet hero-sheet-front">
                  {/* Document Header */}
                  <div className="cv-hero-doc-header">
                    <div className="cv-hero-avatar">MC</div>
                    <div className="cv-hero-identity">
                      <div className="cv-hero-name">Maya Chen</div>
                      <div className="cv-hero-role">PRODUCT DESIGNER</div>
                    </div>
                    <div className="cv-hero-contacts">
                      <div>maya.chen@email.com</div>
                      <div>+1 415 555 0182</div>
                      <div>San Francisco, CA</div>
                      <div>mayachen.design</div>
                    </div>
                  </div>

                  <div className="cv-hero-doc-rule" />

                  {/* Profile */}
                  <div className="cv-hero-doc-section">
                    <div className="cv-hero-sec-title">PROFILE</div>
                    <p className="cv-hero-sec-p">
                      Product designer with 6+ years of experience turning complex workflows into clear, useful products. I partner closely with engineering and research teams to ship thoughtful experiences that move measurable business and customer outcomes.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="cv-hero-doc-section">
                    <div className="cv-hero-sec-title">EXPERIENCE</div>
                    <div className="cv-hero-job">
                      <div className="cv-hero-job-head">
                        <span className="cv-hero-job-role">Senior Product Designer</span>
                        <span className="cv-hero-job-date">2022 — Present</span>
                      </div>
                      <div className="cv-hero-job-company">Northstar Labs</div>
                      <p className="cv-hero-job-desc">
                        Lead end-to-end design for the core platform, from discovery through launch. Built a new onboarding experience that improved activation by 28%.
                      </p>
                    </div>

                    <div className="cv-hero-job" style={{ marginTop: "8px" }}>
                      <div className="cv-hero-job-head">
                        <span className="cv-hero-job-role">Product Designer</span>
                        <span className="cv-hero-job-date">2019 — 2022</span>
                      </div>
                      <div className="cv-hero-job-company">Tandem Health</div>
                      <p className="cv-hero-job-desc">
                        Designed patient and provider tools used by 40k+ people. Established the company's first shared design system and research practice.
                      </p>
                    </div>
                  </div>

                  {/* Selected Projects */}
                  <div className="cv-hero-doc-section">
                    <div className="cv-hero-sec-title">SELECTED PROJECTS</div>
                    <div className="cv-hero-job-head">
                      <span className="cv-hero-job-role">Open Source Design</span>
                      <span className="cv-hero-job-link">github.com/mayachen/os-design</span>
                    </div>
                    <p className="cv-hero-job-desc">
                      A community resource for designers building accessible, inclusive products.
                    </p>
                  </div>

                  {/* Education */}
                  <div className="cv-hero-doc-section">
                    <div className="cv-hero-sec-title">EDUCATION</div>
                    <div className="cv-hero-job-head">
                      <span className="cv-hero-job-role">BFA, Interaction Design</span>
                      <span className="cv-hero-job-date">2015 — 2019</span>
                    </div>
                    <div className="cv-hero-job-company">California College of the Arts</div>
                  </div>

                  {/* Skills */}
                  <div className="cv-hero-doc-section">
                    <div className="cv-hero-sec-title">SKILLS</div>
                    <div className="cv-hero-skills-row">
                      <span className="cv-hero-skill-tag">Product strategy</span>
                      <span className="cv-hero-skill-tag">Interaction design</span>
                      <span className="cv-hero-skill-tag">Design systems</span>
                      <span className="cv-hero-skill-tag">User research</span>
                      <span className="cv-hero-skill-tag">Prototyping</span>
                      <span className="cv-hero-skill-tag">Figma</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right callout */}
              <div className="hero-callout hero-callout-right">
                <span className="callout-star" aria-hidden="true">✦</span>
                <span className="callout-text">
                  Made for real<br />people, not robots.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Start Where You Are (Two Ways In) ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow">
              <span className="eyebrow-dot">•</span> START WHERE YOU ARE
            </div>
            <h2 className="section-title">Two ways in. One CV that fits your goal.</h2>
            <p className="section-lead">
              Whether you want to jump straight into editing or need guidance finding the right structure, start wherever feels easiest.
            </p>
          </div>

          <div className="two-ways-grid">
            <Link to="/builder" className="way-card">
              <div>
                <div className="way-card-icon quick">
                  <IconBriefcase />
                </div>
                <h3>I know what I want</h3>
                <p>
                  Pick your purpose, style, and photo settings directly. Jump straight into the editor with recommended sections already set up.
                </p>
                <div className="way-card-pills">
                  <span className="tag">Quick setup</span>
                  <span className="tag">ATS or modern</span>
                  <span className="tag">Switch anytime</span>
                </div>
              </div>
              <div className="way-card-cta">
                Start with quick setup <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </div>
            </Link>

            <Link to="/builder?mode=guided" className="way-card">
              <div>
                <div className="way-card-icon guided">
                  <IconCompass />
                </div>
                <h3>Help me choose</h3>
                <p>
                  Not sure which format fits your industry or experience level? Answer 5 simple questions in plain language and we'll recommend the optimal CV structure.
                </p>
                <div className="way-card-pills">
                  <span className="tag">5 plain questions</span>
                  <span className="tag">Always "I'm not sure"</span>
                  <span className="tag">Honest guidance</span>
                </div>
              </div>
              <div className="way-card-cta" style={{ color: "var(--accent)" }}>
                Take the 5-question guide <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- How It Works ---------- */}
      <section className="section alt">
        <div className="container">
          <div className="section-head-center">
            <div className="eyebrow">
              <span className="eyebrow-dot">•</span> HOW IT WORKS
            </div>
            <h2 className="section-title">Tell us your goal → get the right structure</h2>
            <p className="section-lead">No CV jargon. We ask in plain language and keep every step focused.</p>
          </div>

          <div className="steps">
            <div className="step-card">
              <div className="step-num">1</div>
              <h3>Answer 5 simple questions</h3>
              <p>What you’re applying for, your field, experience level, and how you’ll submit it. The “I’m not sure” option is always there.</p>
            </div>
            <div className="step-card">
              <div className="step-num">2</div>
              <h3>Fill in what matters</h3>
              <p>Guided form with conditional sections — students aren’t forced to invent work experience, projects get emphasis when they should.</p>
            </div>
            <div className="step-card">
              <div className="step-num">3</div>
              <h3>Preview & download</h3>
              <p>Live A4 preview that mirrors the PDF. Change templates without re-typing, add a photo only if it’s appropriate for your context.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Templates Showcase ---------- */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot">•</span> TEMPLATES
              </div>
              <h2 className="section-title" style={{ marginTop: "0.4rem" }}>Fewer templates, genuinely different</h2>
              <p className="section-lead" style={{ marginTop: "0.5rem" }}>
                No 50 mediocre variations. Each template has a clear purpose — from screening systems to printed portfolios.
              </p>
            </div>
            <Link to="/templates" className="btn btn-secondary">View all templates</Link>
          </div>

          <div className="template-grid">
            {templates.slice(0, 6).map(t => (
              <Link to={`/builder?template=${t.id}`} key={t.id} className="template-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="template-thumb">
                  <div style={{ width: "82%", aspectRatio: "210/297", background: "#fff", border: "1px solid #e2e0d8", borderRadius: 4, padding: "12px", display: "grid", gap: 7, boxShadow: "0 4px 14px rgba(27,36,36,0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ height: 9, width: "45%", background: "#111827", borderRadius: 2 }} />
                      <div style={{ height: 6, width: "25%", background: t.accent || "#206062", borderRadius: 2 }} />
                    </div>
                    <div style={{ height: 1.5, background: "#111827" }} />
                    <div style={{ display: "grid", gap: 4 }}>
                      <div style={{ height: 6, width: "30%", background: "#4b5563", borderRadius: 2 }} />
                      <div style={{ height: 5, width: "95%", background: "#e5e7eb", borderRadius: 2 }} />
                      <div style={{ height: 5, width: "85%", background: "#e5e7eb", borderRadius: 2 }} />
                    </div>
                    <div style={{ display: "grid", gap: 4, marginTop: 4 }}>
                      <div style={{ height: 6, width: "35%", background: "#4b5563", borderRadius: 2 }} />
                      <div style={{ height: 5, width: "90%", background: "#e5e7eb", borderRadius: 2 }} />
                      <div style={{ height: 5, width: "75%", background: "#e5e7eb", borderRadius: 2 }} />
                    </div>
                  </div>
                </div>
                <div className="template-card-body">
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <span className="tag">{t.category}</span>
                    <span className="tag" style={{ background: "var(--brand-soft)", color: "var(--brand)" }}>{t.tag}</span>
                  </div>
                  <h3 style={{ marginTop: "0.6rem" }}>{t.name}</h3>
                  <p>{t.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Privacy Section ---------- */}
      <section className="section alt">
        <div className="container">
          <div className="privacy-grid">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot">•</span> PRIVACY-FIRST
              </div>
              <h2 className="section-title" style={{ marginTop: "0.4rem" }}>Your CV belongs to you.</h2>
              <p className="section-lead" style={{ marginTop: "0.6rem" }}>
                Create and download without creating an account. Whenever possible, your information is processed locally in your browser rather than uploaded to a server.
              </p>
              <div className="checklist">
                <div className="check-item"><IconCheck /> No account required to build or download</div>
                <div className="check-item"><IconCheck /> CV data saved locally in this browser (you can clear it anytime)</div>
                <div className="check-item"><IconCheck /> No backend storage of your personal CV content</div>
                <div className="check-item"><IconCheck /> Export is a real print-to-PDF with selectable text — not a screenshot</div>
              </div>
              <p className="small muted" style={{ marginTop: "1rem" }}>
                We’re honest about what “private” means: candid doesn’t upload your CV to an external server. Standard hosting logs may exist at the infrastructure level. See <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>

            <div className="card" style={{ padding: "1.6rem" }}>
              <h3 style={{ fontSize: "1.05rem" }}>Built for real scenarios</h3>
              <ul style={{ marginTop: "0.9rem", display: "grid", gap: "0.65rem", color: "var(--text-2)", fontSize: "0.92rem", paddingLeft: "1.1rem" }}>
                <li>Student with no formal work experience</li>
                <li>Experienced developer tailoring for ATS</li>
                <li>Healthcare or hospitality professional wanting a photo</li>
                <li>Scholarship applicant highlighting leadership</li>
                <li>Freelancer showcasing projects and clients</li>
                <li>First-time CV creator needing plain guidance</li>
              </ul>
              <Link to="/builder" className="btn btn-primary" style={{ marginTop: "1.4rem", width: "100%" }}>
                Start building my CV
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2 className="section-title">Ready to build a CV that fits your goal?</h2>
            <p className="section-lead" style={{ marginInline: "auto", marginTop: "0.75rem" }}>
              No login, no subscriptions, no tracking. Start where you are and leave with a clean PDF in minutes.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", marginTop: "1.6rem", flexWrap: "wrap" }}>
              <Link to="/builder" className="btn btn-primary btn-large">
                Create my CV <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link to="/templates" className="btn btn-secondary btn-large">
                Explore templates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
