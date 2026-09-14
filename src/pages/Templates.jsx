import { Link } from "react-router-dom";
import { templates } from "../data/templatesRegistry.js";

export function Templates() {
  return (
    <div className="container" style={{ padding:"1.5rem 0 2.5rem" }}>
      <div className="eyebrow">Templates</div>
      <h1 style={{ fontSize:"2rem", fontWeight:800, letterSpacing:"-0.02em" }}>Choose the presentation that fits your goal</h1>
      <p className="section-lead" style={{ marginTop:"0.6rem" }}>Same information, different presentation. Switch anytime without re-entering data. Every template exports a real A4 PDF with selectable text.</p>

      <div className="template-grid" style={{ marginTop:"1.5rem" }}>
        {templates.map(t=> (
          <div key={t.id} className="template-card">
            <div className="template-thumb" style={{ background:"#fdfcfa", display:"grid", placeItems:"center", padding:"1.1rem" }}>
              <div style={{ width:"78%", aspectRatio:"210/297", background:"#fff", border:"1px solid #e7e0d6", borderRadius:10, boxShadow:"0 6px 20px rgba(28,25,23,0.08)", padding:"12px", display:"grid", gap:8 }}>
                <div style={{ height:10, width:"60%", background:"#1c1917", borderRadius:999 }} />
                <div style={{ height:6, width:"40%", background:t.accent, borderRadius:999, opacity:0.9 }} />
                <div style={{ height:1, background:"#e7e0d6" }} />
                {Array.from({length:4}).map((_,i)=> (
                  <div key={i} style={{ display:"grid", gap:4 }}>
                    <div style={{ height:6, width: 38 - i*4 + "%", background:"#1c1917", borderRadius:999, opacity:0.85 }} />
                    <div style={{ height:5, width:"88%", background:"#e7e0d6", borderRadius:999 }} />
                    <div style={{ height:5, width:"72%", background:"#e7e0d6", borderRadius:999 }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="template-card-body">
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}><span className="tag">{t.category}</span><span className="tag" style={{ background:"var(--brand-soft)", color:"var(--brand)", borderColor:"var(--border)" }}>{t.tag}</span></div>
              <h3 style={{ marginTop:"0.5rem" }}>{t.name}</h3>
              <p>{t.description}</p>
              <p className="small muted" style={{ marginTop:"0.4rem" }}>Best for: {t.bestFor.join(" · ")}</p>
              <Link to="/builder" className="btn btn-primary btn-small" style={{ marginTop:"0.75rem", width:"100%" }}>Use this template</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop:"1.5rem", padding:"1.2rem", background:"var(--brand-soft)" }}>
        <h3 style={{ fontSize:"1rem" }}>Not sure?</h3>
        <p className="small muted" style={{ marginTop:"0.4rem" }}>Answer 5 questions and we’ll recommend one. You can switch after — the recommendation is a starting point, not a lock-in.</p>
        <Link to="/builder" className="btn btn-secondary btn-small" style={{ marginTop:"0.7rem" }}>Get a recommendation</Link>
      </div>
    </div>
  );
}
