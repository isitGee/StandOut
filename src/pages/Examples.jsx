import { Link } from "react-router-dom";

const examples = [
  { title: "Product Designer — 6 years", need: "Tech / Product", template: "Classic", points: ["Experience before education", "Selected projects highlighted", "Skills pill tags"] },
  { title: "Student — Computer Science (no formal experience)", need: "Internship", template: "Graduate", points: ["Education first", "Projects carry weight", "Technical coursework"] },
  { title: "Healthcare — Registered Nurse", need: "Job application", template: "Classic", points: ["Clinical certifications visible", "Shift and hospital experience", "Clear hierarchy"] },
  { title: "Software Developer — 4 years", need: "Online application", template: "Modern Split", points: ["Sidebar contact & skills", "Quantified engineering impact", "ATS-compatible"] },
  { title: "Scholarship & Fellowship Applicant", need: "Fellowship", template: "Academic", points: ["Research & publications", "Leadership & volunteering", "Academic honors"] },
  { title: "Freelance Brand & Web Designer", need: "Client work", template: "Creative Portfolio", points: ["Live portfolio links", "Client case studies", "Warm visual palette"] },
];

export function Examples() {
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> CV EXAMPLES
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Examples by use case</h1>
      <p className="section-lead" style={{ marginTop: "0.6rem" }}>
        See how StandOut adapts structure, ordering, and template for different goals. Load any example in the builder and replace it with your own details. Your CV stays in your browser.
      </p>

      <div className="template-grid" style={{ marginTop: "2rem" }}>
        {examples.map(ex => (
          <div key={ex.title} className="card" style={{ padding: "1.4rem", display: "grid", gap: "0.6rem" }}>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              <span className="tag">{ex.need}</span>
              <span className="tag" style={{ background: "var(--brand-soft)", color: "var(--brand)" }}>{ex.template}</span>
            </div>
            <h3 style={{ fontSize: "1.02rem", lineHeight: 1.3, marginTop: "0.3rem" }}>{ex.title}</h3>
            <ul style={{ paddingLeft: "1.1rem", color: "var(--text-2)", fontSize: "0.9rem", display: "grid", gap: "0.3rem" }}>
              {ex.points.map(p => <li key={p}>{p}</li>)}
            </ul>
            <Link to="/builder" className="btn btn-secondary btn-small" style={{ marginTop: "0.6rem" }}>
              Open in builder <span className="btn-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: "2rem", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.05rem" }}>Your CVs</h3>
        <p className="small muted" style={{marginTop:"0.35rem"}}>StandOut saves your current CV locally in this browser. Build in the editor — the preview updates live as you type. Duplicate by copying JSON and reloading.</p>
        <div style={{display:"flex", gap:"0.6rem", marginTop:"0.9rem", flexWrap:"wrap"}}>
          <Link to="/builder" className="btn btn-primary btn-small">+ Create new CV</Link>
          <Link to="/templates" className="btn btn-secondary btn-small">Explore templates</Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: "1.2rem", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.05rem" }}>Want a tailored example?</h3>
        <p className="small muted" style={{ marginTop: "0.35rem" }}>
          Paste a job description in the builder’s Opportunity step and see how StandOut tailors keywords and suggests stronger bullets — all on-device.
        </p>
        <Link to="/builder" className="btn btn-primary btn-small" style={{ marginTop: "0.85rem" }}>
          Create your CV <span className="btn-arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
