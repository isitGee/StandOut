import { Link } from "react-router-dom";
import { IconCheck, IconShield, IconSparkles, IconBriefcase, IconArrowRight } from "../components/Icons.jsx";

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Guided CV builder — private & free</div>
              <h1>Create the right CV <span>for what you’re trying to achieve.</span></h1>
              <p className="hero-lead">
                Whether you know exactly what you need or have no idea where to start, StandOut guides you to the right structure, lets you customize it, and gives you a professional PDF — all in your browser.
              </p>
              <div className="hero-ctas">
                <Link to="/builder" className="btn btn-primary btn-large">Create my CV <IconArrowRight style={{ width:16, height:16 }} /></Link>
                <Link to="/templates" className="btn btn-secondary btn-large">Explore templates</Link>
              </div>
              <div className="hero-meta">
                <span>No account required</span> <span className="dot" /> <span>Privacy-first</span> <span className="dot" /> <span>ATS-friendly option</span> <span className="dot" /> <span>Works on mobile</span>
              </div>
              <div className="trust-row">
                <span className="pill"><IconCheck /> No sign-up</span>
                <span className="pill"><IconShield /> Data stays in your browser</span>
                <span className="pill"><IconSparkles /> 9 polished templates</span>
              </div>

              <div style={{ marginTop:"1.6rem", display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                <Link to="/builder" className="card" style={{ padding:"0.85rem 1rem", display:"flex", gap:"0.8rem", alignItems:"center", flex:"1 1 200px", textDecoration:"none", color:"var(--text)" }}>
                  <span style={{ width:36, height:36, borderRadius:10, background:"var(--brand-soft)", display:"grid", placeItems:"center", border:"1px solid var(--border)", flexShrink:0 }}><IconBriefcase style={{ width:16, height:16, color:"var(--brand)" }}/></span>
                  <span>
                    <strong style={{ display:"block", fontSize:"0.9rem" }}>I know what I want</strong>
                    <span className="small muted">Pick purpose, style, photo — fast</span>
                  </span>
                </Link>
                <Link to="/builder" className="card" style={{ padding:"0.85rem 1rem", display:"flex", gap:"0.8rem", alignItems:"center", flex:"1 1 200px", textDecoration:"none", color:"var(--text)" }}>
                  <span style={{ width:36, height:36, borderRadius:10, background:"var(--accent-soft)", display:"grid", placeItems:"center", border:"1px solid #fde68a", flexShrink:0 }}><IconSparkles style={{ width:16, height:16, color:"var(--accent)" }}/></span>
                  <span>
                    <strong style={{ display:"block", fontSize:"0.9rem" }}>Help me choose</strong>
                    <span className="small muted">Short guided questionnaire</span>
                  </span>
                </Link>
              </div>
              <p className="small muted" style={{ marginTop:"0.6rem" }}>
                <Link to="/builder">Not sure where to start? →</Link> We’ll ask 5 simple questions and recommend a template.
              </p>
            </div>

            <div className="hero-preview-wrap">
              <div className="hero-card">
                <div className="floating-badge">✓ Live preview</div>
                <div className="mini-cv" aria-hidden>
                  <div className="mini-cv-head">
                    <div className="mini-cv-photo" />
                    <div className="mini-cv-lines">
                      <div className="l1" /><div className="l2" /><div className="l3" />
                    </div>
                  </div>
                  <div className="mini-cv-body">
                    <div><div className="mini-section-title" /><div className="mini-lines" style={{ marginTop:8 }}><span style={{ width:"92%" }} /><span style={{ width:"85%" }} /><span style={{ width:"78%" }} /></div></div>
                    <div><div className="mini-section-title" /><div className="mini-lines" style={{ marginTop:8 }}><span style={{ width:"88%" }} /><span style={{ width:"70%" }} /><span style={{ width:"80%" }} /></div></div>
                    <div><div className="mini-section-title" /><div className="mini-lines" style={{ marginTop:8 }}><span style={{ width:"76%" }} /><span style={{ width:"62%" }} /></div></div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.85rem", flexWrap:"wrap" }}>
                  <span className="pill" style={{ background:"var(--bg)" }}>A4 · selectable text</span>
                  <span className="pill" style={{ background:"var(--bg)" }}>Proper margins</span>
                  <span className="pill" style={{ background:"var(--bg)" }}>No clipped content</span>
                </div>
              </div>
              <div className="card" style={{ marginTop:"0.75rem", padding:"0.85rem 1rem", display:"flex", gap:"0.7rem", alignItems:"center" }}>
                <span style={{ width:32, height:32, borderRadius:999, background:"#fef3c7", display:"grid", placeItems:"center", color:"#92400e", fontWeight:800, fontSize:"0.8rem" }}>A4</span>
                <span style={{ fontSize:"0.88rem", color:"var(--text-2)" }}><strong style={{ color:"var(--text)" }}>Professional PDF</strong> — crisp text, correct page breaks, ready to send.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="eyebrow">How it works</div>
          <h2 className="section-title">Tell us your goal → get the right structure</h2>
          <p className="section-lead">No CV jargon. We ask in plain language and keep every step focused.</p>
          <div className="steps">
            <div className="step-card">
              <div className="step-num">1</div>
              <h3>Answer 5 simple questions</h3>
              <p>What you’re applying for, your field, experience, and how you’ll submit it. The “I’m not sure” option is always there.</p>
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

      <section className="section">
        <div className="container">
          <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"space-between", alignItems:"end" }}>
            <div>
              <div className="eyebrow">Templates</div>
              <h2 className="section-title">Fewer templates, genuinely different</h2>
              <p className="section-lead">No 50 mediocre variations. Each template has a clear purpose — from screening systems to printed portfolios.</p>
            </div>
            <Link to="/templates" className="btn btn-secondary">View all templates</Link>
          </div>
          <div className="template-grid">
            {[
              { name:"Classic", tag:"ATS-friendly", desc:"Machine-readable, minimal. Best for online portals." },
              { name:"Modern Split", tag:"Modern", desc:"Sidebar for skills & contact. Polished for email." },
              { name:"Creative Portfolio", tag:"Creative", desc:"Warm accent, expressive. For human readers." },
              { name:"Academic Classic", tag:"Academic", desc:"Publications, research, teaching." },
              { name:"Graduate", tag:"Student", desc:"Education & projects first." },
              { name:"Professional Photo", tag:"Photo", desc:"Optional photo, balanced layout." },
            ].map(t=> (
              <div key={t.name} className="template-card">
                <div className="template-thumb" style={{ padding:"10px" }}>
                  <div style={{ height:"100%", border:"1px solid #eef1f4", borderRadius:8, background:"#fff", padding:"10px", display:"grid", gap:8 }}>
                    <div style={{ height:10, width:"45%", background:"#0f172a", borderRadius:999 }} />
                    <div style={{ height:6, width:"30%", background:"#94a3b8", borderRadius:999 }} />
                    <div style={{ height:1, background:"#e2e8f0" }} />
                    <div style={{ display:"grid", gap:6 }}>
                      <div style={{ height:6, width:"28%", background:"#0f172a", borderRadius:999, opacity:0.8 }} />
                      {Array.from({length:3}).map((_,i)=> <div key={i} style={{ height:5, background:"#e2e8f0", borderRadius:999, width: 70 - i*8 + "%" }} />)}
                    </div>
                  </div>
                </div>
                <div className="template-card-body">
                  <div className="tag">{t.tag}</div>
                  <h3>{t.name}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="privacy-grid">
            <div>
              <div className="eyebrow">Privacy-first</div>
              <h2 className="section-title">Your CV belongs to you.</h2>
              <p className="section-lead">Create and download without creating an account. Whenever possible, your information is processed locally in your browser rather than uploaded to a server.</p>
              <div className="checklist">
                <div className="check-item"><IconCheck /> No account required to build or download</div>
                <div className="check-item"><IconCheck /> CV data saved locally in this browser (you can clear it anytime)</div>
                <div className="check-item"><IconCheck /> No backend storage of your personal CV content in V1</div>
                <div className="check-item"><IconCheck /> Export is a real PDF with selectable text — not a screenshot</div>
              </div>
              <p className="small muted" style={{ marginTop:"0.9rem" }}>We’re honest about what “private” means: the builder itself doesn’t upload your CV to a server. Standard analytics or hosting logs may still exist at the infrastructure level. See <Link to="/privacy">Privacy Policy</Link>.</p>
            </div>
            <div className="card" style={{ padding:"1.2rem" }}>
              <h3 style={{ fontSize:"1rem" }}>Built for real scenarios</h3>
              <ul style={{ marginTop:"0.7rem", display:"grid", gap:"0.5rem", color:"var(--text-2)", fontSize:"0.92rem", paddingLeft:"1.1rem" }}>
                <li>Student with no work experience</li>
                <li>Experienced developer tailoring for ATS</li>
                <li>Healthcare professional who wants a photo</li>
                <li>Scholarship applicant highlighting leadership</li>
                <li>Freelancer showing projects and clients</li>
                <li>Someone who has never made a CV before</li>
              </ul>
              <Link to="/builder" className="btn btn-primary" style={{ marginTop:"1rem", width:"100%" }}>Start building</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign:"center", maxWidth:"44rem", marginInline:"auto" }}>
          <h2 className="section-title">Ready when you are.</h2>
          <p className="section-lead" style={{ marginInline:"auto" }}>2 minutes to a first draft, or take your time and refine every section. Your progress is saved automatically.</p>
          <div style={{ marginTop:"1.2rem", display:"flex", gap:"0.75rem", justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/builder" className="btn btn-primary btn-large">Create my CV — free</Link>
            <Link to="/guide" className="btn btn-secondary btn-large">Read the CV guide</Link>
          </div>
        </div>
      </section>
    </>
  );
}
