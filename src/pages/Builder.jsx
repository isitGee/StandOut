import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { GoalStep } from "../components/builder/GoalStep.jsx";
import { PersonalStep, SummaryStep, EducationStep, ExperienceStep, ProjectsStep, SkillsStep, MoreStep, PhotoStep, DesignStep, TailoringStep } from "../components/builder/Steps.jsx";
import { Preview } from "../components/preview/Preview.jsx";
import { useLocalCV } from "../hooks/useLocalCV.js";
import { recommend } from "../engine/recommendations.js";
import { completenessScore } from "../engine/validation.js";
import { demoCV, demoCVStudentNoExp } from "../data/defaultContent.js";
import { clearCV } from "../engine/storage.js";
import { IconCheck, IconShieldCheck, IconTarget, IconFileText, IconEye, IconDownload, IconSparkles } from "../components/Icons.jsx";

const STEPS = [
  { id: "goal", label: "Goal", hint: "Purpose & style", phase: 1, icon: "◉" },
  { id: "tailoring", label: "Opportunity", hint: "Role & company", phase: 1, icon: "◎" },
  { id: "personal", label: "Personal", phase: 2, icon: "👤" },
  { id: "summary", label: "About", phase: 2, icon: "≡" },
  { id: "education", label: "Education", phase: 3, icon: "🎓" },
  { id: "experience", label: "Experience", phase: 3, icon: "💼" },
  { id: "projects", label: "Projects", phase: 3, icon: "▭" },
  { id: "skills", label: "Skills", phase: 3, icon: "✦" },
  { id: "more", label: "More", phase: 4, hint: "Awards, languages", icon: "+" },
  { id: "photo", label: "Photo", phase: 5, icon: "◐" },
  { id: "design", label: "Design", phase: 6, icon: "⬔" },
];

const PHASES = [
  { n: "01", label: "Choose your goal", desc: "Goal & opportunity" },
  { n: "02", label: "Add your information", desc: "Profile & summary" },
  { n: "03", label: "Build your CV", desc: "Education, experience, skills" },
  { n: "04", label: "Customize", desc: "Design & photo" },
  { n: "05", label: "Review", desc: "ATS & quality check" },
  { n: "06", label: "Export", desc: "Download PDF" },
];

function ATSChecklist({ cv }) {
  const checks = [
    { ok: !!cv.personal.fullName && !!cv.personal.email, label: "Readable contact header with standard labels", hint: "Name, email, location" },
    { ok: (cv.experience.length>0 || cv.projects.length>0 || cv.education.length>0), label: "Standard headings used", hint: "Experience, Education, Skills" },
    { ok: !!cv.flatSkills || cv.skills.length>0, label: "Relevant keywords present", hint: "Match terms from the job description" },
    { ok: (cv.personal.summary||"").length>40, label: "Concise profile summary", hint: "2–4 lines, plain language" },
    { ok: !cv.photo.enabled || cv.target.submissionType!=="online", label: "No risky graphics for online portal", hint: cv.photo.enabled && cv.target.submissionType==="online" ? "Photo + online portal — consider Classic without photo" : "Clean layout, no text in images" },
    { ok: (cv.experience.every(e=> e.bullets?.some(b=>b.trim())) || cv.projects.some(p=>p.description)), label: "Consistent formatting, no empty sections", hint: "Empty sections are auto-hidden" },
  ];
  const pass = checks.filter(c=>c.ok).length;
  return (
    <div className="card ats-card">
      <div className="ats-head">
        <div>
          <div className="eyebrow" style={{color:"var(--brand)"}}><span className="eyebrow-dot">•</span> ATS-FRIENDLY</div>
          <h3 style={{fontSize:"0.98rem", marginTop:"0.25rem"}}>Designed to be easy for Applicant Tracking Systems and recruiters to read.</h3>
          <p className="small muted" style={{marginTop:"0.35rem"}}>ATS is software some employers use to store and search applications. A clean, machine-readable layout helps it parse your CV correctly.</p>
        </div>
        <div className="ats-score">
          <span className="ats-score-num">{pass}/{checks.length}</span>
          <span className="small muted">checks</span>
        </div>
      </div>
      <div className="ats-list">
        {checks.map((c,i)=> (
          <div key={i} className={`ats-item ${c.ok? "ok":"warn"}`}>
            <span className="ats-icon">{c.ok? <IconCheck style={{width:14,height:14}}/> : "○"}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:"0.88rem", fontWeight:600}}>{c.label}</div>
              <div className="small muted">{c.hint}</div>
            </div>
            <span className={`ats-badge ${c.ok? "pass":"todo"}`}>{c.ok? "Good":"To do"}</span>
          </div>
        ))}
      </div>
      <p className="field-hint" style={{marginTop:"0.75rem"}}>Tip: If you’re submitting via an online portal, choose <strong>Classic</strong>. If you’re emailing a person, <strong>Modern Split</strong> or <strong>Creative</strong> can be more engaging.</p>
    </div>
  );
}

export function Builder({ notify }) {
  const [searchParams] = useSearchParams();
  const { cv, setCV, updatePersonal, updateTarget, updateTailoring } = useLocalCV();
  const [active, setActive] = useState(0);
  const [mobileTab, setMobileTab] = useState("editor"); // editor | preview
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const templateParam = searchParams.get("template");
    if (templateParam) {
      setCV(c => ({ ...c, design: { ...c.design, templateId: templateParam } }));
    }
  }, [searchParams, setCV]);

  const rec = useMemo(() => recommend(cv), [cv.target, cv.photo?.enabled, cv.photo?.style, cv.design.templateId, cv.tailoring]);
  const score = completenessScore(cv);
  const currentPhase = STEPS[active]?.phase || 1;
  const phasePct = Math.round((currentPhase / 6)*100);

  const applyRecommendation = () => {
    setCV(c => ({ ...c, design: { ...c.design, templateId: rec.templateId } }));
    notify(`Applied recommendation: ${rec.templateId} — ${rec.reason.slice(0, 120)}`, "success");
  };

  const next = () => setActive(a => Math.min(STEPS.length - 1, a + 1));
  const prev = () => setActive(a => Math.max(0, a - 1));

  const loadDemo = (which) => {
    if (which === "student") {
      setCV(demoCVStudentNoExp);
      notify("Loaded student example (Liam Patel) — edit it with your own details.", "success");
      setActive(2);
    } else {
      setCV(demoCV);
      notify("Loaded Maya Chen example — replace with your details.", "success");
      setActive(2);
    }
  };

  const step = STEPS[active];

  return (
    <div className="container" style={{ paddingTop: "1.25rem", paddingBottom: "2.5rem" }}>
      {/* Top header with progress phases 01-06 */}
      <div className="builder-top">
        <div>
          <h1 style={{ fontSize: "1.55rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Build your CV</h1>
          <p className="small muted">Your CV stays in your browser. Switch templates anytime without re-typing.</p>
        </div>
        <div className="builder-top-actions">
          <span className="pill" title="Completion">{score.pct}% complete</span>
          <div className="progress" style={{ width: 96 }}><div className="progress-bar" style={{ width: `${score.pct}%` }} /></div>
          <button className="btn btn-ghost btn-small" onClick={()=> { if(confirm("Clear this CV and start fresh?")) { clearCV(); location.reload(); } }} type="button">Reset</button>
        </div>
      </div>

      {/* Phase indicator 01-06 */}
      <div className="phase-bar">
        {PHASES.map(p => (
          <div key={p.n} className={`phase-item ${parseInt(p.n)===currentPhase? "active": parseInt(p.n)<currentPhase? "done":""}`}>
            <span className="phase-num">{p.n}</span>
            <span className="phase-label">{p.label}</span>
            <span className="phase-desc hide-mobile">{p.desc}</span>
          </div>
        ))}
      </div>
      <div className="progress" aria-hidden style={{height:3, borderRadius:0, marginBottom:"1rem"}}><div className="progress-bar" style={{ width: `${phasePct}%` }} /></div>

      {/* Demo loader + privacy */}
      <div className="builder-helpers">
        <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", alignItems:"center"}}>
          <span className="small muted">Try an example:</span>
          <button className="btn btn-secondary btn-small" onClick={() => loadDemo("professional")} type="button">Maya Chen (Designer)</button>
          <button className="btn btn-secondary btn-small" onClick={() => loadDemo("student")} type="button">Student (No exp)</button>
        </div>
        <span className="small muted" style={{ display:"inline-flex", gap:"0.4rem", alignItems:"center"}}>
          <span style={{ width:7,height:7, background:"var(--brand)", borderRadius:999, display:"inline-block"}}/> Private by design · No account needed
        </span>
      </div>

      {/* Recommendation banner */}
      <div className="card" style={{ padding:"0.95rem 1.15rem", display:"flex", flexWrap:"wrap", gap:"0.85rem", alignItems:"center", justifyContent:"space-between", marginBottom:"1.25rem", background:"var(--brand-soft)", borderColor:"var(--border)" }}>
        <div style={{ flex:"1 1 420px"}}>
          <strong style={{ fontSize:"0.92rem", color:"var(--brand)"}}>Recommended: {rec.templateId}</strong>
          <span style={{ color:"var(--text-2)", fontSize:"0.9rem" }}> — {rec.reason}</span>
          {rec.warnings.length ? (
            <div style={{ marginTop:"0.35rem", fontSize:"0.82rem", color:"var(--warning)", background:"var(--surface)", padding:"0.45rem 0.65rem", borderRadius:6, border:"1px solid var(--border)"}}>
              {rec.warnings[0]}
            </div>
          ): null}
        </div>
        <div style={{ display:"flex", gap:"0.5rem", flexShrink:0}}>
          <button className="btn btn-primary btn-small" onClick={applyRecommendation} type="button">Use recommended</button>
          <button className="btn btn-secondary btn-small" onClick={() => setActive(STEPS.findIndex(s => s.id==="design"))} type="button">Choose myself</button>
        </div>
      </div>

      <div className="builder">
        {/* Left nav + Editor */}
        <div className="builder-editor" style={{ display: mobileTab==="preview" ? "none" : "flex" }}>
          {/* Left vertical nav */}
          <nav className="editor-nav" aria-label="CV sections">
            {STEPS.map((s,i)=> {
              const isActive = i===active;
              const completed = i < active;
              return (
                <button key={s.id}
                  className={`editor-nav-item ${isActive?"active":""} ${completed?"completed":""}`}
                  onClick={()=> setActive(i)}
                  aria-current={isActive? "step":undefined}
                  type="button"
                >
                  <span className="nav-item-icon">{completed? "✓": i+1}</span>
                  <span className="nav-item-label">{s.label}</span>
                </button>
              );
            })}
            <div className="editor-nav-foot">
              <button className="btn btn-ghost btn-small" style={{width:"100%"}} onClick={()=> setShowReview(v=>!v)} type="button">
                <IconEye style={{width:14,height:14}}/> {showReview? "Hide review":"Review"}
              </button>
            </div>
          </nav>

          {/* Center editing pane */}
          <div className="editor-pane">
            <div className="builder-tabs-mobile">
              <button className="tab-btn" aria-selected={mobileTab==="editor"} onClick={() => setMobileTab("editor")} type="button">Editor</button>
              <button className="tab-btn" aria-selected={mobileTab==="preview"} onClick={() => setMobileTab("preview")} type="button">Preview & PDF</button>
            </div>

            <div className="editor-header">
              <div>
                <div className="editor-title">{step.label}</div>
                <div className="editor-subtitle">{step.hint || `${active + 1} of ${STEPS.length} · Phase ${currentPhase} of 6`}</div>
              </div>
              <span className="small muted">{active + 1} / {STEPS.length}</span>
            </div>

            <div className="progress" aria-hidden style={{ borderRadius:0, height:3}}><div className="progress-bar" style={{ width: `${((active + 1) / STEPS.length) * 100}%` }} /></div>

            <div className="editor-body">
              {active===0 && <GoalStep cv={cv} updateTarget={updateTarget} onRecommend={applyRecommendation} mode={searchParams.get("mode")} />}
              {active===1 && <TailoringStep cv={cv} updateTailoring={updateTailoring} setCV={setCV} notify={notify} />}
              {active===2 && <PersonalStep cv={cv} updatePersonal={updatePersonal} />}
              {active===3 && <SummaryStep cv={cv} updatePersonal={updatePersonal} notify={notify} />}
              {active===4 && <EducationStep cv={cv} setCV={setCV} />}
              {active===5 && <ExperienceStep cv={cv} setCV={setCV} notify={notify} />}
              {active===6 && <ProjectsStep cv={cv} setCV={setCV} notify={notify} />}
              {active===7 && <SkillsStep cv={cv} setCV={setCV} notify={notify} />}
              {active===8 && <MoreStep cv={cv} setCV={setCV} />}
              {active===9 && <PhotoStep cv={cv} setCV={setCV} notify={notify} />}
              {active===10 && <DesignStep cv={cv} setCV={setCV} />}
              {/* Review expand */}
              {showReview && (
                <div style={{marginTop:"1rem"}}>
                  <ATSChecklist cv={cv} />
                  <div className="card" style={{marginTop:"1rem", padding:"1rem"}}>
                    <h4 style={{fontSize:"0.94rem"}}>Your CV is ready? Checklist</h4>
                    <ul className="small muted" style={{marginTop:"0.5rem", paddingLeft:"1.1rem", display:"grid", gap:"0.3rem"}}>
                      <li>Information complete — {score.pct}%</li>
                      <li>Formatting checked — empty sections hidden automatically</li>
                      <li>Preview reviewed — matches final PDF</li>
                    </ul>
                    <button className="btn btn-primary btn-small" style={{marginTop:"0.8rem"}} onClick={()=> { setMobileTab("preview"); window.scrollTo({top:0, behavior:"smooth"})}} type="button"><IconDownload style={{width:14,height:14}}/> Download PDF</button>
                  </div>
                </div>
              )}
            </div>

            <div className="editor-actions">
              <button className="btn btn-secondary" onClick={prev} disabled={active===0} type="button">Back</button>
              <div style={{ display:"flex", gap:"0.5rem"}}>
                {active < STEPS.length -1 ? (
                  <button className="btn btn-primary" onClick={next} type="button">Continue <span className="btn-arrow" aria-hidden="true">&rarr;</span></button>
                ) : (
                  <button className="btn btn-primary" onClick={() => { setShowReview(true); setMobileTab("preview"); window.scrollTo({ top: 0, behavior: "smooth" }); }} type="button">View preview <span className="btn-arrow" aria-hidden="true">&rarr;</span></button>
                )}
              </div>
            </div>

            <div style={{ padding:"0.85rem 1.2rem", background:"var(--surface-2)", borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <span className="small muted">Data saved locally — your CV stays in your browser</span>
              <button className="link-btn" onClick={()=> { navigator.clipboard?.writeText(JSON.stringify(cv, null, 2)); notify("CV JSON copied to clipboard — keep it as a backup.", "success"); }} type="button">Copy backup JSON</button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="builder-preview" style={{ display: mobileTab==="editor" ? undefined : "block"}}>
          <div style={{ display: mobileTab==="preview" ? "flex" : "none", justifyContent:"flex-end", marginBottom:"0.5rem"}} className="no-print">
            <button className="btn btn-secondary btn-small" onClick={() => setMobileTab("editor")} type="button">← Back to editor</button>
          </div>
          <Preview cv={cv} onDownload={() => notify("Opening print dialog — select “Save as PDF” for your download.", "success")} />

          {/* Export review state */}
          <div className="card" style={{padding:"1rem"}}>
            <h4 style={{fontSize:"0.95rem", display:"flex", gap:"0.5rem", alignItems:"center"}}><IconFileText style={{width:16,height:16, color:"var(--brand)"}}/> Your CV is ready</h4>
            <div style={{marginTop:"0.6rem", display:"grid", gap:"0.35rem", fontSize:"0.88rem", color:"var(--text-2)"}}>
              <span style={{display:"flex", gap:"0.5rem", alignItems:"center"}}><IconCheck style={{width:14,height:14, color:"var(--brand)"}}/> Information {score.pct}% complete</span>
              <span style={{display:"flex", gap:"0.5rem", alignItems:"center"}}><IconCheck style={{width:14,height:14, color:"var(--brand)"}}/> Formatting checked</span>
              <span style={{display:"flex", gap:"0.5rem", alignItems:"center"}}><IconCheck style={{width:14,height:14, color:"var(--brand)"}}/> Preview reviewed</span>
            </div>
            <div style={{display:"flex", gap:"0.5rem", marginTop:"0.9rem"}}>
              <button className="btn btn-primary btn-small" onClick={()=> window.print()} type="button" style={{flex:1}}><IconDownload style={{width:14,height:14}}/> Download PDF</button>
              <button className="btn btn-secondary btn-small" onClick={()=> { navigator.clipboard?.writeText(JSON.stringify(cv,null,2)); notify("CV data copied", "success")}} type="button">Copy JSON</button>
            </div>
            <p className="field-hint" style={{marginTop:"0.6rem"}}>Tip: In the print dialog choose “Save as PDF”, A4 paper, and ensure “Background graphics” is checked for colours.</p>
          </div>

          <ATSChecklist cv={cv} />

          <div className="helper" style={{ fontSize:"0.82rem"}}>
            <strong>Print / PDF Note:</strong> Empty sections are omitted automatically. Use the Download PDF button to open print dialog and select “Save as PDF” with standard A4 paper size.
          </div>
        </div>
      </div>
    </div>
  );
}
