import { useEffect, useMemo, useState } from "react";
import { GoalStep } from "../components/builder/GoalStep.jsx";
import { PersonalStep, SummaryStep, EducationStep, ExperienceStep, ProjectsStep, SkillsStep, MoreStep, PhotoStep, DesignStep } from "../components/builder/Steps.jsx";
import { Preview } from "../components/preview/Preview.jsx";
import { useLocalCV } from "../hooks/useLocalCV.js";
import { recommend } from "../engine/recommendations.js";
import { completenessScore } from "../engine/validation.js";
import { demoCV, demoCVStudentNoExp } from "../data/defaultContent.js";

const STEPS = [
  { id: "goal", label: "Goal", hint: "Purpose & style" },
  { id: "personal", label: "Personal" },
  { id: "summary", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "more", label: "More" },
  { id: "photo", label: "Photo" },
  { id: "design", label: "Design" },
];

export function Builder({ notify }) {
  const { cv, setCV, updatePersonal, updateTarget, updatePhoto, updateDesign } = useLocalCV();
  const [active, setActive] = useState(0);
  const [mobileTab, setMobileTab] = useState("editor"); // editor | preview
  const [showRec, setShowRec] = useState(false);

  const rec = useMemo(() => recommend(cv), [cv.target, cv.photo.enabled, cv.photo.style]);
  const score = completenessScore(cv);

  // auto-apply recommendation when user clicks
  const applyRecommendation = () => {
    setCV(c => ({ ...c, design: { ...c.design, templateId: rec.templateId } }));
    setShowRec(true);
    notify(`Applied recommendation: ${rec.templateId} — ${rec.reason.slice(0,120)}`, "success");
    // move to design if they want to see
  };

  useEffect(() => {
    // if visited first time and empty, optionally show demo hint
  }, []);

  const next = () => setActive(a => Math.min(STEPS.length - 1, a + 1));
  const prev = () => setActive(a => Math.max(0, a - 1));

  const loadDemo = (which) => {
    if (which === "student") {
      setCV(demoCVStudentNoExp);
      notify("Loaded student example — edit it with your own information.", "success");
      setActive(1);
    } else {
      setCV(demoCV);
      notify("Loaded professional example — replace with your details.", "success");
      setActive(1);
    }
  };

  const step = STEPS[active];

  return (
    <div className="container" style={{ paddingTop:"1rem", paddingBottom:"2rem" }}>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
        <div>
          <h1 style={{ fontSize:"1.4rem", fontWeight:800 }}>Build your CV</h1>
          <p className="small muted">All data stays in your browser. Switch templates anytime — no re-typing.</p>
        </div>
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <span className="pill" title="Completion">
            {score.pct}% complete
          </span>
          <div className="progress" style={{ width:96 }}>
            <div className="progress-bar" style={{ width: `${score.pct}%` }} />
          </div>
          <button className="btn btn-ghost btn-small" onClick={()=> { if(confirm("Clear this CV and start fresh?")) { localStorage.removeItem("standout:cv:v1"); location.reload(); } }} type="button">Reset</button>
        </div>
      </div>

      {/* quick demo loader */}
      <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"0.9rem" }}>
        <span className="small muted" style={{ alignSelf:"center" }}>Try an example:</span>
        <button className="btn btn-secondary btn-small" onClick={()=> loadDemo("professional")} type="button">Professional</button>
        <button className="btn btn-secondary btn-small" onClick={()=> loadDemo("student")} type="button">Student (no experience)</button>
        <span className="small muted" style={{ marginLeft:"auto", display:"inline-flex", gap:"0.4rem", alignItems:"center" }}>
          <span style={{ width:8, height:8, background:"#0f7a3d", borderRadius:999, display:"inline-block" }} /> Privacy-first · No account
        </span>
      </div>

      {/* recommendation banner */}
      <div className="card" style={{ padding:"0.9rem 1rem", display:"flex", flexWrap:"wrap", gap:"0.8rem", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem", background:"var(--brand-soft)" }}>
        <div style={{ flex:"1 1 420px" }}>
          <strong style={{ fontSize:"0.92rem" }}>Recommended: {rec.templateId}</strong>
          <span style={{ color:"var(--text-2)", fontSize:"0.9rem" }}> — {rec.reason}</span>
          {rec.warnings.length ? <div style={{ marginTop:"0.35rem", fontSize:"0.82rem", color:"var(--warning)", background:"rgba(255,255,255,0.7)", padding:"0.45rem 0.6rem", borderRadius:8, border:"1px solid #fde68a" }}>{rec.warnings[0]}</div> : null}
        </div>
        <div style={{ display:"flex", gap:"0.5rem", flexShrink:0 }}>
          <button className="btn btn-primary btn-small" onClick={applyRecommendation} type="button">Use recommended</button>
          <button className="btn btn-secondary btn-small" onClick={()=> setActive(STEPS.findIndex(s=> s.id==="design"))} type="button">Choose myself</button>
        </div>
      </div>

      <div className="builder">
        {/* Editor */}
        <div className="builder-editor" style={{ display: mobileTab === "preview" ? "none" : "block" }}>
          <div className="builder-tabs-mobile">
            <button className="tab-btn" aria-selected={mobileTab==="editor"} onClick={()=> setMobileTab("editor")} type="button">Editor</button>
            <button className="tab-btn" aria-selected={mobileTab==="preview"} onClick={()=> setMobileTab("preview")} type="button">Preview & PDF</button>
          </div>

          <div className="editor-header">
            <div>
              <div className="editor-title">{step.label}</div>
              <div className="editor-subtitle">{step.hint || `${active + 1} of ${STEPS.length}`}</div>
            </div>
            <div style={{ display:"flex", gap:"0.4rem", alignItems:"center" }}>
              <span className="small muted">{active+1}/{STEPS.length}</span>
            </div>
          </div>

          <div className="stepper" role="tablist" aria-label="Builder steps">
            {STEPS.map((s, i)=> {
              const completed = i < active;
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-current={isActive ? "step" : undefined}
                  className={`step-chip ${completed ? "completed" : ""}`}
                  onClick={()=> setActive(i)}
                  type="button"
                >
                  {completed ? "✓" : i+1} {s.label}
                </button>
              );
            })}
          </div>

          <div className="progress" aria-hidden style={{ borderRadius:0 }}>
            <div className="progress-bar" style={{ width: `${((active+1)/STEPS.length)*100}%` }} />
          </div>

          <div className="editor-body">
            {active===0 && <GoalStep cv={cv} updateTarget={updateTarget} onRecommend={applyRecommendation} />}
            {active===1 && <PersonalStep cv={cv} updatePersonal={updatePersonal} />}
            {active===2 && <SummaryStep cv={cv} updatePersonal={updatePersonal} />}
            {active===3 && <EducationStep cv={cv} setCV={setCV} />}
            {active===4 && <ExperienceStep cv={cv} setCV={setCV} />}
            {active===5 && <ProjectsStep cv={cv} setCV={setCV} />}
            {active===6 && <SkillsStep cv={cv} setCV={setCV} />}
            {active===7 && <MoreStep cv={cv} setCV={setCV} />}
            {active===8 && <PhotoStep cv={cv} setCV={setCV} notify={notify} />}
            {active===9 && <DesignStep cv={cv} setCV={setCV} />}
          </div>

          <div className="editor-actions">
            <button className="btn btn-secondary" onClick={prev} disabled={active===0} type="button">Back</button>
            <div style={{ display:"flex", gap:"0.5rem" }}>
              {active< STEPS.length-1 ? (
                <button className="btn btn-primary" onClick={next} type="button">Continue</button>
              ) : (
                <button className="btn btn-primary" onClick={()=> { setMobileTab("preview"); window.scrollTo({ top: 0, behavior:"smooth"}); }} type="button">View preview</button>
              )}
            </div>
          </div>

          <div style={{ padding:"0.75rem 1.1rem", background:"var(--surface-2)", borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span className="small muted">Your data is saved locally in this browser.</span>
            <button className="link-btn" onClick={()=> { navigator.clipboard?.writeText(JSON.stringify(cv, null, 2)); notify("CV JSON copied — keep it as a backup.", "success"); }} type="button">Copy backup</button>
          </div>
        </div>

        {/* Preview */}
        <div className="builder-preview" style={{ display: mobileTab === "editor" ? undefined : "block" }}>
          <div style={{ display: mobileTab==="preview" ? "flex" : "none", justifyContent:"flex-end" }} className="no-print">
            <button className="btn btn-secondary btn-small" onClick={()=> setMobileTab("editor")} type="button">← Back to editor</button>
          </div>
          <Preview cv={cv} onDownload={()=> notify("Opening print dialog — choose “Save as PDF” for the final file.", "success")} />
          <div className="helper" style={{ fontSize:"0.82rem" }}>
            <strong>Before you download:</strong> Check for empty sections — they’re automatically hidden — and make sure dates and links are accurate. Spelling matters more than design.
          </div>
        </div>
      </div>
    </div>
  );
}
