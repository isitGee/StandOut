import { Link } from "react-router-dom";

const examples = [
  { title: "Student — Computer Science (no formal experience)", need: "Internship", template: "Graduate", points: ["Education first", "Projects carry weight", "Skills tuned to role"] },
  { title: "Healthcare — Nurse", need: "Job application", template: "Classic", points: ["Clear hierarchy", "Certifications visible", "Photo optional"] },
  { title: "Software Developer — 4 years", need: "Online application", template: "Modern Split", points: ["Experience before education", "Skills + projects"] },
  { title: "Scholarship — Undergraduate", need: "Fellowship", template: "Academic", points: ["Leadership & volunteering", "Achievements"] },
  { title: "Freelance Designer", need: "Client work", template: "Creative", points: ["Portfolio links", "Services"] },
  { title: "Business Graduate", need: "Graduate scheme", template: "Classic / Contemporary", points: ["Internship bullets with impact"] },
];

export function Examples() {
  return (
    <div className="container" style={{ padding:"1.5rem 0 2.5rem" }}>
      <div className="eyebrow">CV Examples</div>
      <h1 style={{ fontSize:"2rem", fontWeight:800, letterSpacing:"-0.02em" }}>Examples by use case</h1>
      <p className="section-lead" style={{ marginTop:"0.6rem" }}>See how the same builder adapts structure, ordering, and template for different goals. Load any example in the builder and replace it with your data.</p>

      <div className="template-grid" style={{ marginTop:"1.5rem" }}>
        {examples.map(ex=> (
          <div key={ex.title} className="card" style={{ padding:"1.2rem", display:"grid", gap:"0.5rem" }}>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              <span className="tag">{ex.need}</span>
              <span className="tag" style={{ background:"var(--brand-soft)", color:"var(--brand)" }}>{ex.template}</span>
            </div>
            <h3 style={{ fontSize:"1rem", lineHeight:1.3 }}>{ex.title}</h3>
            <ul style={{ paddingLeft:"1.1rem", color:"var(--text-2)", fontSize:"0.9rem", display:"grid", gap:"0.25rem" }}>
              {ex.points.map(p=> <li key={p}>{p}</li>)}
            </ul>
            <Link to="/builder" className="btn btn-secondary btn-small" style={{ marginTop:"0.4rem" }}>Open in builder</Link>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop:"1.5rem", padding:"1.2rem" }}>
        <h3 style={{ fontSize:"1rem" }}>Want a tailored example?</h3>
        <p className="small muted" style={{ marginTop:"0.4rem" }}>Build your CV in the editor — the preview updates as you type. Try switching templates to see the same data in different lights.</p>
        <Link to="/builder" className="btn btn-primary btn-small" style={{ marginTop:"0.7rem" }}>Create my CV</Link>
      </div>
    </div>
  );
}
