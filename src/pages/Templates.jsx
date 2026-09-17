import { Link } from "react-router-dom";
import { templates } from "../data/templatesRegistry.js";

const categories = [
  { id:"ATS", label:"ATS", desc:"Clean, highly readable layouts — pass screening systems", ids:["classic","executive"] },
  { id:"Professional", label:"Professional", desc:"Corporate and traditional layouts for human readers", ids:["split","contemporary"] },
  { id:"Modern", label:"Modern", desc:"Contemporary layouts with stronger visual hierarchy", ids:["split","contemporary"] },
  { id:"Creative", label:"Creative", desc:"More expressive layouts for design & freelance", ids:["creative","editorial"] },
  { id:"Academic", label:"Academic", desc:"Research/education-focused layouts", ids:["academic"] },
  { id:"Student", label:"Student", desc:"Education and projects first", ids:["student"] },
  { id:"Photo", label:"Photo", desc:"Layouts that support professional profile photos", ids:["photo"] },
];

export function Templates() {
  // dedupe and keep order as per templates list but grouped
  const grouped = [
    { title:"ATS / Professional", category:"ATS / Professional", items: templates.filter(t=> ["classic","executive"].includes(t.id)) },
    { title:"Modern", category:"Modern", items: templates.filter(t=> ["split","contemporary"].includes(t.id)) },
    { title:"Creative", category:"Creative", items: templates.filter(t=> ["creative","editorial"].includes(t.id)) },
    { title:"Academic", category:"Academic", items: templates.filter(t=> t.id==="academic") },
    { title:"Student", category:"Student", items: templates.filter(t=> t.id==="student") },
    { title:"Photo", category:"Photo", items: templates.filter(t=> t.id==="photo") },
  ];

  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> TEMPLATES
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Choose the presentation that fits your goal</h1>
      <p className="section-lead" style={{ marginTop: "0.6rem" }}>
        Same information, different presentation — StandOut keeps your data while you switch designs. Every template exports a real A4 PDF with selectable text on your device.
      </p>

      <div className="card" style={{marginTop:"1.2rem", padding:"1rem", display:"flex", gap:"1rem", flexWrap:"wrap", alignItems:"center"}}>
        <span className="small muted">Filter by:</span>
        <span className="tag">ATS</span><span className="tag">Professional</span><span className="tag">Modern</span><span className="tag">Creative</span><span className="tag">Academic</span><span className="tag">Photo</span>
        <span className="small muted" style={{marginLeft:"auto"}}>All templates produce a professional document — none look like posters.</span>
      </div>

      {grouped.map(group=> (
        <div key={group.title} style={{marginTop:"2rem"}}>
          <div style={{display:"flex", gap:"0.6rem", alignItems:"baseline"}}>
            <h2 style={{fontSize:"1.05rem", fontWeight:800}}>{group.title}</h2>
            <span className="small muted">{group.items[0]?.description.slice(0,80)}</span>
          </div>
          <div className="template-grid" style={{ marginTop:"1rem" }}>
            {group.items.map(t => (
              <div key={t.id} className="template-card">
                <div className="template-thumb">
                  <div style={{ width:"80%", aspectRatio:"210/297", background:"#fff", border:"1px solid #e2e0d8", borderRadius:4, padding:"12px", display:"grid", gap:6, boxShadow:"0 4px 14px rgba(27,36,36,0.06)" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ height:9, width:"50%", background:"#111827", borderRadius:2 }} />
                      <div style={{ height:6, width:"25%", background:t.accent || "#206062", borderRadius:2 }} />
                    </div>
                    <div style={{ height:1.5, background:"#111827" }} />
                    {Array.from({ length:4 }).map((_, i) => (
                      <div key={i} style={{ display:"grid", gap:3 }}>
                        <div style={{ height:6, width:40 - i * 4 + "%", background:"#4b5563", borderRadius:2 }} />
                        <div style={{ height:4.5, width:"95%", background:"#e5e7eb", borderRadius:2 }} />
                        <div style={{ height:4.5, width:"80%", background:"#e5e7eb", borderRadius:2 }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="template-card-body">
                  <div style={{ display:"flex", gap:"0.4rem", alignItems:"center" }}>
                    <span className="tag">{t.category}</span>
                    <span className="tag" style={{ background:"var(--brand-soft)", color:"var(--brand)" }}>{t.tag}</span>
                  </div>
                  <h3 style={{ marginTop:"0.6rem" }}>{t.name}</h3>
                  <p>{t.description}</p>
                  <p className="small muted" style={{ marginTop:"0.5rem" }}>Best for: {t.bestFor.join(" · ")}</p>
                  <Link to={`/builder?template=${t.id}`} className="btn btn-primary btn-small" style={{ marginTop:"0.85rem", width:"100%" }}>
                    Use this template <span className="btn-arrow" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card" style={{ marginTop:"2rem", padding:"1.5rem", background:"var(--surface)" }}>
        <h3 style={{ fontSize:"1.05rem" }}>Not sure which template to choose?</h3>
        <p className="small muted" style={{ marginTop:"0.35rem" }}>
          Answer 5 quick questions and StandOut will recommend the best structure. You can switch after — the recommendation is a starting point, not a lock-in. Your CV stays in your browser either way.
        </p>
        <Link to="/builder?mode=guided" className="btn btn-secondary btn-small" style={{ marginTop:"0.9rem" }}>
          Get a guided recommendation <span className="btn-arrow" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
