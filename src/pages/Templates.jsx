import { Link } from "react-router-dom";
import { templates } from "../data/templatesRegistry.js";

export function Templates() {
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> TEMPLATES
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Choose the presentation that fits your goal</h1>
      <p className="section-lead" style={{ marginTop: "0.6rem" }}>
        Same information, different presentation. Switch anytime without re-entering data. Every template exports a real A4 PDF with selectable text.
      </p>

      <div className="template-grid" style={{ marginTop: "2rem" }}>
        {templates.map(t => (
          <div key={t.id} className="template-card">
            <div className="template-thumb">
              <div style={{ width: "80%", aspectRatio: "210/297", background: "#fff", border: "1px solid #e2e0d8", borderRadius: 4, padding: "12px", display: "grid", gap: 6, boxShadow: "0 4px 14px rgba(27,36,36,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ height: 9, width: "50%", background: "#111827", borderRadius: 2 }} />
                  <div style={{ height: 6, width: "25%", background: t.accent || "#206062", borderRadius: 2 }} />
                </div>
                <div style={{ height: 1.5, background: "#111827" }} />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ display: "grid", gap: 3 }}>
                    <div style={{ height: 6, width: 40 - i * 4 + "%", background: "#4b5563", borderRadius: 2 }} />
                    <div style={{ height: 4.5, width: "95%", background: "#e5e7eb", borderRadius: 2 }} />
                    <div style={{ height: 4.5, width: "80%", background: "#e5e7eb", borderRadius: 2 }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="template-card-body">
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <span className="tag">{t.category}</span>
                <span className="tag" style={{ background: "var(--brand-soft)", color: "var(--brand)" }}>{t.tag}</span>
              </div>
              <h3 style={{ marginTop: "0.6rem" }}>{t.name}</h3>
              <p>{t.description}</p>
              <p className="small muted" style={{ marginTop: "0.5rem" }}>Best for: {t.bestFor.join(" · ")}</p>
              <Link to={`/builder?template=${t.id}`} className="btn btn-primary btn-small" style={{ marginTop: "0.85rem", width: "100%" }}>
                Use this template <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--surface)" }}>
        <h3 style={{ fontSize: "1.05rem" }}>Not sure which template to choose?</h3>
        <p className="small muted" style={{ marginTop: "0.35rem" }}>
          Answer 5 quick questions and we’ll recommend the best structure. You can switch after — the recommendation is a starting point, not a lock-in.
        </p>
        <Link to="/builder?mode=guided" className="btn btn-secondary btn-small" style={{ marginTop: "0.9rem" }}>
          Get a guided recommendation <span className="btn-arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
