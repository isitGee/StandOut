import { orderedSectionsFor } from "../../data/cvSchema.js";

function formatDate(d) {
  if (!d) return "";
  // expect YYYY-MM or YYYY
  if (/^\d{4}-\d{2}$/.test(d)) {
    const [y, m] = d.split("-");
    const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const idx = parseInt(m,10)-1;
    return `${names[idx] || m} ${y}`;
  }
  return d;
}
function dateRange(s, e, current) {
  const a = formatDate(s);
  const b = current ? "Present" : formatDate(e);
  if (!a && !b) return "";
  if (a && b) return `${a} — ${b}`;
  return a || b || "";
}

function ContactLine({ personal }) {
  const parts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.linkedin
  ].filter(Boolean);
  if (parts.length === 0) return null;
  return <div className="cv-contact">{parts.map((p,i) => <span key={i}>{p}</span>)}</div>;
}

function SectionTitle({ children, variant }) {
  if (variant === "split") return <div className="cv-sec-title-split">{children}</div>;
  if (variant === "creative") return <div className="cv-creative-sec-title">{children}</div>;
  if (variant === "academic") return <div className="cv-sec-academic">{children}</div>;
  return <div className="cv-sec-title">{children}</div>;
}

function Bullets({ items }) {
  if (!items || items.length === 0) return null;
  return <ul className="cv-bullets">{items.map((b,i)=> <li key={i}>{b}</li>)}</ul>;
}

/* ---------- Classic (ATS) ---------- */
export function ClassicCV({ cv }) {
  const p = cv.personal;
  const order = orderedSectionsFor(cv);
  const hasSummary = p.summary?.trim().length > 0;
  return (
    <div className="cv cv-classic">
      <header className="cv-header">
        <div className="cv-name">{p.fullName || "Your Name"}</div>
        {p.headline && <div className="cv-headline">{p.headline}</div>}
        <ContactLine personal={p} />
      </header>
      <div className="cv-body">
        {hasSummary && (
          <section className="cv-section">
            <div className="cv-sec-title">Professional summary</div>
            <p className="cv-summary">{p.summary}</p>
          </section>
        )}
        {order.map(key => renderClassicSection(key, cv))}
        <CustomSections cv={cv} variant="classic" />
      </div>
    </div>
  );
}

function renderClassicSection(key, cv) {
  switch(key) {
    case "experience":
      if (!cv.experience.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Experience</div>
          <div>
            {cv.experience.map(e => (
              <div key={e.id} className="cv-entry">
                <div className="cv-entry-head">
                  <div>
                    <div className="cv-role">{e.title}{e.company ? <span className="cv-org"> · {e.company}</span> : null}</div>
                    {(e.location) && <div className="cv-meta"><span>{e.location}</span></div>}
                  </div>
                  <div className="cv-date">{dateRange(e.startDate, e.endDate, e.current)}</div>
                </div>
                {e.description && <p style={{ fontSize: "9.5pt", color:"#334155" }}>{e.description}</p>}
                <Bullets items={e.bullets} />
              </div>
            ))}
          </div>
        </section>
      );
    case "education":
      if (!cv.education.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Education</div>
          <div>
            {cv.education.map(ed => (
              <div key={ed.id} className="cv-entry">
                <div className="cv-entry-head">
                  <div>
                    <div className="cv-role">{ed.degree}{ed.field ? ` in ${ed.field}` : ""}</div>
                    <div className="cv-meta"><span>{ed.school}</span>{ed.location ? <span>· {ed.location}</span> : null}{ed.grade ? <span>· {ed.grade}</span> : null}</div>
                    {ed.description && <p style={{ fontSize:"9pt", color:"#475569", marginTop:2 }}>{ed.description}</p>}
                  </div>
                  <div className="cv-date">{dateRange(ed.startDate, ed.endDate, ed.current)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    case "projects":
      if (!cv.projects.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Projects</div>
          <div>
            {cv.projects.map(pr => (
              <div key={pr.id} className="cv-entry">
                <div className="cv-entry-head">
                  <div>
                    <div className="cv-role">{pr.name}{pr.link ? <span style={{ fontWeight:400, fontSize:"9pt", color:"#475569" }}> · {pr.link}</span> : null}</div>
                    {(pr.role || pr.technologies) && <div className="cv-meta">{pr.role && <span>{pr.role}</span>}{pr.technologies && <span>{pr.technologies}</span>}</div>}
                  </div>
                </div>
                {pr.description && <p style={{ fontSize:"9.5pt", color:"#334155" }}>{pr.description}</p>}
                <Bullets items={pr.bullets} />
              </div>
            ))}
          </div>
        </section>
      );
    case "skills":
      if (!(cv.flatSkills?.trim() || cv.skills?.length)) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Skills</div>
          {cv.flatSkills ? <p style={{ fontSize:"9.5pt", color:"#334155", lineHeight:1.6 }}>{cv.flatSkills}</p> : <div className="cv-skills">{cv.skills.map(s=> <span key={s.id} className="cv-skill">{s.items || s.name}</span>)}</div>}
        </section>
      );
    case "certifications":
      if (!cv.certifications.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Certifications</div>
          <div style={{ display:"grid", gap:6 }}>
            {cv.certifications.map(c=> (
              <div key={c.id} style={{ display:"flex", justifyContent:"space-between", gap:12, fontSize:"9.5pt" }}>
                <span><strong>{c.name}</strong>{c.issuer ? <span style={{ color:"#475569" }}> · {c.issuer}</span> : null}</span>
                <span className="cv-date">{formatDate(c.date)}</span>
              </div>
            ))}
          </div>
        </section>
      );
    case "achievements":
      if (!cv.achievements.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Achievements</div>
          <div style={{ display:"grid", gap:6 }}>
            {cv.achievements.map(a=> (
              <div key={a.id} style={{ display:"flex", justifyContent:"space-between", gap:12, fontSize:"9.5pt" }}>
                <span><strong>{a.title}</strong>{a.issuer ? <span style={{ color:"#475569" }}> · {a.issuer}</span> : null}{a.description ? <span style={{ color:"#475569" }}> — {a.description}</span> : null}</span>
                <span className="cv-date">{formatDate(a.date)}</span>
              </div>
            ))}
          </div>
        </section>
      );
    case "volunteering":
      if (!cv.volunteering.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Volunteering</div>
          <div>
            {cv.volunteering.map(v=> (
              <div key={v.id} className="cv-entry">
                <div className="cv-entry-head">
                  <div><div className="cv-role">{v.role} <span className="cv-org">· {v.organization}</span></div>{v.description && <p style={{ fontSize:"9pt", color:"#334155" }}>{v.description}</p>}</div>
                  <div className="cv-date">{dateRange(v.startDate, v.endDate, v.current)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    case "languages":
      if (!cv.languages.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Languages</div>
          <p style={{ fontSize:"9.5pt", color:"#334155" }}>{cv.languages.map(l=> `${l.name}${l.level ? ` (${l.level})` : ""}` ).join(" · ")}</p>
        </section>
      );
    case "interests":
      if (!cv.interests.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">Interests</div>
          <p style={{ fontSize:"9.5pt", color:"#334155" }}>{cv.interests.map(i=> i.name).join(" · ")}</p>
        </section>
      );
    case "references":
      if (!cv.references.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">References</div>
          <p style={{ fontSize:"9.5pt", color:"#334155" }}>{cv.references.map(r=> `${r.name} — ${r.title}${r.contact ? ` (${r.contact})`:""}`).join(" · ")}</p>
        </section>
      );
    default: return null;
  }
}

function CustomSections({ cv, variant }) {
  if (!cv.customSections?.length) return null;
  const filtered = cv.customSections.filter(s=> s.entries?.length);
  if (!filtered.length) return null;
  return filtered.map(sec => (
    <section key={sec.id} className="cv-section">
      <SectionTitle variant={variant}>{sec.title}</SectionTitle>
      <div style={{ display:"grid", gap:8, marginTop:8 }}>
        {sec.entries.map(e=> (
          <div key={e.id}>
            <div style={{ display:"flex", justifyContent:"space-between", gap:12 }}>
              <strong style={{ fontSize:"9.5pt" }}>{e.heading}</strong>
              {e.date && <span className="cv-date">{e.date}</span>}
            </div>
            {e.subheading && <div style={{ fontSize:"9pt", color:"#475569" }}>{e.subheading}</div>}
            {e.description && <p style={{ fontSize:"9pt", color:"#334155" }}>{e.description}</p>}
            {e.bullets?.length ? <Bullets items={e.bullets} /> : null}
          </div>
        ))}
      </div>
    </section>
  ));
}

/* ---------- Split ---------- */
export function SplitCV({ cv }) {
  const p = cv.personal;
  const order = orderedSectionsFor(cv);
  return (
    <div className="cv cv-split">
      <aside className="cv-side">
        <div className="cv-photo-wrap">
          {cv.photo?.enabled && cv.photo?.dataUrl ? (
            <img src={cv.photo.dataUrl} alt="" className="cv-photo" style={photoStyle(cv.photo.style)} />
          ) : (
            <div className="cv-photo" style={{ display:"grid", placeItems:"center", fontSize:"22pt", fontWeight:700, background:"#1e3a5a" }}>{initials(p.fullName)}</div>
          )}
        </div>
        <div style={{ textAlign:"center", display:"grid", gap:4 }}>
          <div className="cv-side-name">{p.fullName || "Your Name"}</div>
          {p.headline && <div className="cv-side-role">{p.headline}</div>}
        </div>

        <div className="cv-side-section">
          <div className="cv-side-title">Contact</div>
          <div className="cv-side-list">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.website && <span>{p.website}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
          </div>
        </div>

        {(cv.flatSkills || cv.skills.length) ? (
          <div className="cv-side-section">
            <div className="cv-side-title">Skills</div>
            <div className="cv-side-list" style={{ fontSize:"8.5pt" }}>
              {cv.flatSkills ? <span>{cv.flatSkills}</span> : cv.skills.map(s=> <span key={s.id}>{s.items || s.name}</span>)}
            </div>
          </div>
        ) : null}

        {cv.languages.length ? (
          <div className="cv-side-section">
            <div className="cv-side-title">Languages</div>
            <div className="cv-side-list">{cv.languages.map(l=> <span key={l.id}>{l.name}{l.level? ` — ${l.level}`:""}</span>)}</div>
          </div>
        ) : null}

        {cv.education.length ? (
          <div className="cv-side-section">
            <div className="cv-side-title">Education</div>
            <div className="cv-side-list">
              {cv.education.slice(0,2).map(ed=> (
                <div key={ed.id}>
                  <strong>{ed.degree}</strong>
                  <div style={{ opacity:0.8 }}>{ed.school}</div>
                  <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"7.5pt", opacity:0.7 }}>{dateRange(ed.startDate, ed.endDate, ed.current)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </aside>

      <div className="cv-main">
        {p.summary && (
          <section className="cv-section">
            <div className="cv-sec-title-split">Profile</div>
            <p className="cv-summary-split">{p.summary}</p>
          </section>
        )}
        {order.filter(k=> !["skills","languages"].includes(k)).map(key=> renderSplitSection(key, cv))}
        <CustomSections cv={cv} variant="split" />
      </div>
    </div>
  );
}

function renderSplitSection(key, cv) {
  if (key==="experience" && cv.experience.length) {
    return (
      <section key={key} className="cv-section">
        <div className="cv-sec-title-split">Experience</div>
        <div>
          {cv.experience.map(e=> (
            <div key={e.id} className="cv-entry-split">
              <div className="cv-entry-top">
                <div><span className="cv-entry-role">{e.title}</span> <span className="cv-entry-where">· {e.company}</span></div>
                <span className="cv-entry-date">{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              {e.location && <div style={{ fontSize:"8.5pt", color:"#64748b" }}>{e.location}</div>}
              {e.description && <p style={{ fontSize:"9pt", color:"#334155" }}>{e.description}</p>}
              <Bullets items={e.bullets} />
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (key==="education" && cv.education.length && cv.education.length>2) {
    // already side shows 2, show rest plus all details? we show all here for completeness if many
    return (
      <section key={key} className="cv-section">
        <div className="cv-sec-title-split">Education</div>
        <div>
          {cv.education.map(ed=> (
            <div key={ed.id} className="cv-entry-split">
              <div className="cv-entry-top"><span className="cv-entry-role">{ed.degree}{ed.field? ` in ${ed.field}`:""}</span><span className="cv-entry-date">{dateRange(ed.startDate, ed.endDate, ed.current)}</span></div>
              <div style={{ fontSize:"9pt", color:"#475569" }}>{ed.school}{ed.location? ` · ${ed.location}`:""}{ed.grade? ` · ${ed.grade}`:""}</div>
              {ed.description && <p style={{ fontSize:"9pt", color:"#334155" }}>{ed.description}</p>}
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (key==="education" && cv.education.length && cv.education.length<=2) return null; // side already covers
  if (key==="projects" && cv.projects.length) {
    return (
      <section key={key} className="cv-section">
        <div className="cv-sec-title-split">Projects</div>
        <div>
          {cv.projects.map(pr=> (
            <div key={pr.id} className="cv-entry-split">
              <div style={{ fontWeight:700, fontSize:"9.5pt" }}>{pr.name} {pr.link && <span style={{ fontWeight:400, color:"#475569" }}>· {pr.link}</span>}</div>
              {(pr.role || pr.technologies) && <div style={{ fontSize:"8.5pt", color:"#64748b" }}>{[pr.role, pr.technologies].filter(Boolean).join(" · ")}</div>}
              {pr.description && <p style={{ fontSize:"9pt", color:"#334155" }}>{pr.description}</p>}
              <Bullets items={pr.bullets} />
            </div>
          ))}
        </div>
      </section>
    );
  }
  // fallback to classic renderers for other keys but with split header
  const node = renderClassicSection(key, cv);
  if (!node) return null;
  // replace title class manually? easier to just return node but visually classic inside split is okay
  return node;
}

/* ---------- Creative ---------- */
export function CreativeCV({ cv }) {
  const p = cv.personal;
  return (
    <div className="cv cv-creative">
      <header className="cv-creative-head">
        <div>
          <div className="cv-creative-name">{(p.fullName || "Your Name").split(" ").map((w,i,arr)=> i===arr.length-1 ? <span key={i}>{w}</span> : w+" ").reduce((acc,c)=> acc, null) || p.fullName}
            {/* fallback simple */}
            {p.fullName ? p.fullName.split(" ").slice(0,-1).join(" ") + " " : "Your "}<span>{p.fullName ? p.fullName.split(" ").slice(-1)[0] : "Name"}</span>
          </div>
          {p.headline && <div className="cv-creative-title">{p.headline}</div>}
          <div className="cv-creative-contact">
            {[p.email,p.phone,p.location,p.website,p.linkedin].filter(Boolean).map((v,i)=> <span key={i}>{v}</span>)}
          </div>
        </div>
        {cv.photo?.enabled && cv.photo?.dataUrl ? (
          <img src={cv.photo.dataUrl} alt="" className="cv-creative-photo" style={photoStyle(cv.photo.style)} />
        ) : null}
      </header>
      <div className="cv-creative-body">
        {p.summary && (
          <section className="cv-section">
            <div className="cv-creative-sec-title">Profile</div>
            <p className="cv-creative-summary" style={{ marginTop:8 }}>{p.summary}</p>
          </section>
        )}
        {orderedSectionsFor(cv).map(k=> {
          const n = renderClassicSection(k,cv);
          if (!n) return null;
          // inject creative title wrapper: we need to override title manually by cloning? simpler: just render classic but creative body already good
          return <div key={k}>{n}</div>;
        })}
        <CustomSections cv={cv} variant="creative" />
      </div>
    </div>
  );
}

/* ---------- Academic ---------- */
export function AcademicCV({ cv }) {
  const p = cv.personal;
  return (
    <div className="cv cv-academic">
      <header className="cv-academic-head">
        <div className="cv-academic-name">{p.fullName || "Your Name"}</div>
        {p.headline && <div style={{ fontSize:"9pt", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:700, color:"#475569", marginTop:4 }}>{p.headline}</div>}
        <div className="cv-academic-contact">
          {[p.email,p.phone,p.location,p.website,p.linkedin].filter(Boolean).map((v,i)=> <span key={i}>{v}</span>)}
        </div>
      </header>
      {p.summary && (
        <section className="cv-section">
          <div className="cv-sec-academic">Research Profile</div>
          <p style={{ fontSize:"9.5pt", color:"#334155", lineHeight:1.65 }}>{p.summary}</p>
        </section>
      )}
      {cv.education.length? (
        <section className="cv-section">
          <div className="cv-sec-academic">Education</div>
          <div>
            {cv.education.map(ed=> (
              <div key={ed.id} className="cv-entry" style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", gap:12 }}>
                  <div><strong>{ed.degree}{ed.field? ` in ${ed.field}`:""}</strong> — {ed.school} {ed.location? `, ${ed.location}`:""}</div>
                  <span className="cv-date">{dateRange(ed.startDate, ed.endDate, ed.current)}</span>
                </div>
                {(ed.grade||ed.description) && <div style={{ fontSize:"9pt", color:"#475569" }}>{[ed.grade, ed.description].filter(Boolean).join(" · ")}</div>}
              </div>
            ))}
          </div>
        </section>
      ):null}
      {cv.experience.length? (
        <section className="cv-section">
          <div className="cv-sec-academic">Academic & Professional Experience</div>
          <div>
            {cv.experience.map(e=> (
              <div key={e.id} className="cv-entry" style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", gap:12 }}><strong>{e.title} · {e.company}</strong><span className="cv-date">{dateRange(e.startDate, e.endDate, e.current)}</span></div>
                {e.location && <div style={{ fontSize:"9pt", color:"#475569" }}>{e.location}</div>}
                {e.description && <p style={{ fontSize:"9pt", color:"#334155" }}>{e.description}</p>}
                <Bullets items={e.bullets} />
              </div>
            ))}
          </div>
        </section>
      ):null}
      {cv.projects.length? (
        <section className="cv-section">
          <div className="cv-sec-academic">Research & Projects</div>
          <div>
            {cv.projects.map(pr=> (
              <div key={pr.id} className="cv-entry" style={{ marginBottom:10 }}>
                <strong>{pr.name}</strong>{pr.link? <span style={{ color:"#475569" }}> · {pr.link}</span>:null}
                {pr.description && <p style={{ fontSize:"9pt", color:"#334155" }}>{pr.description}</p>}
                <Bullets items={pr.bullets} />
                {pr.technologies && <div style={{ fontSize:"8.5pt", color:"#94a3b8" }}>{pr.technologies}</div>}
              </div>
            ))}
          </div>
        </section>
      ):null}
      {(cv.flatSkills || cv.skills.length)? (
        <section className="cv-section">
          <div className="cv-sec-academic">Skills</div>
          <p style={{ fontSize:"9.5pt", color:"#334155" }}>{cv.flatSkills || cv.skills.map(s=> s.items).join(" · ")}</p>
        </section>
      ):null}
      {orderedSectionsFor(cv).filter(k=> !["education","experience","projects","skills"].includes(k)).map(k=> renderClassicSection(k,cv))}
      <CustomSections cv={cv} variant="academic" />
      {cv.references.length? (
        <section className="cv-section">
          <div className="cv-sec-academic">References</div>
          <p style={{ fontSize:"9.5pt", color:"#334155" }}>Available upon request</p>
        </section>
      ):null}
    </div>
  );
}

/* ---------- Student ---------- */
export function StudentCV({ cv }) {
  const p = cv.personal;
  return (
    <div className="cv cv-student">
      <header className="cv-student-head">
        {cv.photo?.enabled && cv.photo?.dataUrl ? <img src={cv.photo.dataUrl} alt="" className="cv-student-photo" style={photoStyle(cv.photo.style)} /> : null}
        <div>
          <div className="cv-student-name">{p.fullName || "Your Name"}</div>
          {p.headline && <div style={{ fontSize:"9pt", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:700, color:"#475569" }}>{p.headline}</div>}
          <div className="cv-student-meta">
            {[p.email,p.phone,p.location].filter(Boolean).map((v,i)=> <span key={i}>{v}</span>)}
            {[p.website,p.linkedin].filter(Boolean).map((v,i)=> <span key={i}>{v}</span>)}
          </div>
        </div>
      </header>
      <div style={{ marginTop:16, display:"grid", gap:14 }}>
        {p.summary && (
          <section className="cv-section">
            <div className="cv-sec-title">About</div>
            <p style={{ fontSize:"9.5pt", color:"#292524", lineHeight:1.65, background:"#fdfcfa", border:"1px solid #e7e0d6", borderRadius:10, padding:"10px 12px" }}>{p.summary}</p>
          </section>
        )}
        {orderedSectionsFor(cv).map(k=> renderClassicSection(k,cv))}
        <CustomSections cv={cv} variant="classic" />
      </div>
    </div>
  );
}

/* ---------- Photo ---------- */
export function PhotoCV({ cv }) {
  const p = cv.personal;
  return (
    <div className="cv cv-photo">
      <aside className="cv-photo-side">
        {cv.photo?.enabled && cv.photo?.dataUrl ? (
          <img src={cv.photo.dataUrl} alt="" className="cv-photo-img" style={photoStyle(cv.photo.style, true)} />
        ) : (
          <div className="cv-photo-img" style={{ display:"grid", placeItems:"center", fontWeight:800, fontSize:"28pt", color:"#0f2439" }}>{initials(p.fullName)}</div>
        )}
        <div>
          <div style={{ fontFamily:"Newsreader, serif", fontWeight:600, fontSize:"14pt", lineHeight:1 }}>{p.fullName || "Your Name"}</div>
          {p.headline && <div style={{ fontSize:"8pt", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:700, color:"#475569", marginTop:4 }}>{p.headline}</div>}
        </div>
        <div style={{ display:"grid", gap:8, fontSize:"8.5pt", color:"#475569" }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.website && <span>{p.website}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
        {(cv.flatSkills || cv.skills.length) && (
          <div>
            <div className="cv-sec-title" style={{ fontSize:"8pt" }}>Skills</div>
            <p style={{ fontSize:"8.5pt", color:"#334155", lineHeight:1.6 }}>{cv.flatSkills}</p>
          </div>
        )}
        {cv.languages.length ? (
          <div>
            <div className="cv-sec-title" style={{ fontSize:"8pt" }}>Languages</div>
            <p style={{ fontSize:"8.5pt", color:"#334155" }}>{cv.languages.map(l=> `${l.name}${l.level? ` (${l.level})`:""}`).join(" · ")}</p>
          </div>
        ):null}
      </aside>
      <div className="cv-photo-main">
        {p.summary && (
          <section className="cv-section">
            <div className="cv-sec-title">Profile</div>
            <p style={{ fontSize:"9.5pt", color:"#334155", lineHeight:1.65 }}>{p.summary}</p>
          </section>
        )}
        {orderedSectionsFor(cv).filter(k=> !["skills","languages"].includes(k)).map(k=> renderClassicSection(k,cv))}
        <CustomSections cv={cv} variant="classic" />
      </div>
    </div>
  );
}

function initials(name) {
  if (!name) return "•";
  return name.split(" ").filter(Boolean).slice(0,2).map(w=> w[0].toUpperCase()).join("");
}
function photoStyle(style, large) {
  if (style === "circle") return { borderRadius: "999px", aspectRatio: large ? undefined : "1/1" };
  if (style === "rounded") return { borderRadius: "14px" };
  if (style === "square") return { borderRadius: "8px" };
  if (style === "portrait") return { borderRadius: "12px", aspectRatio: "3/4", objectFit:"cover" };
  return { borderRadius: "12px" };
}

// Dispatcher
export function TemplateRenderer({ cv }) {
  const id = cv.design?.templateId || "classic";
  switch(id) {
    case "split": return <SplitCV cv={cv} />;
    case "contemporary": return <SplitCV cv={cv} />;
    case "creative": return <CreativeCV cv={cv} />;
    case "editorial": return <CreativeCV cv={cv} />;
    case "academic": return <AcademicCV cv={cv} />;
    case "student": return <StudentCV cv={cv} />;
    case "photo": return <PhotoCV cv={cv} />;
    case "executive": return <ClassicCV cv={cv} />;
    default: return <ClassicCV cv={cv} />;
  }
}
