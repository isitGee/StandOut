import { orderedSectionsFor } from "../../data/cvSchema.js";

function formatDate(d) {
  if (!d) return "";
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

function initials(name) {
  if (!name) return "•";
  return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function photoStyle(style, large) {
  if (style === "circle") return { borderRadius: "999px", aspectRatio: large ? undefined : "1/1" };
  if (style === "rounded") return { borderRadius: "10px" };
  if (style === "square") return { borderRadius: "4px" };
  if (style === "portrait") return { borderRadius: "8px", aspectRatio: "3/4", objectFit: "cover" };
  return { borderRadius: "8px" };
}

function Bullets({ items }) {
  if (!items || items.length === 0) return null;
  return <ul className="cv-bullets">{items.map((b, i) => <li key={i}>{b}</li>)}</ul>;
}

/* ---------- Classic (StandOut Editorial ATS) ---------- */
export function ClassicCV({ cv }) {
  const p = cv.personal;
  const order = orderedSectionsFor(cv);
  const hasSummary = p.summary?.trim().length > 0;
  const showPhoto = cv.photo?.enabled && cv.photo?.dataUrl;
  const init = initials(p.fullName);

  return (
    <div className="cv cv-classic">
      <header className="cv-header">
        {showPhoto ? (
          <img src={cv.photo.dataUrl} alt="" className="cv-photo-img" style={photoStyle(cv.photo.style)} />
        ) : (
          <div className="cv-avatar-box">{init}</div>
        )}
        <div>
          <div className="cv-name">{p.fullName || "Your Name"}</div>
          {p.headline && <div className="cv-headline">{p.headline}</div>}
        </div>
        <div className="cv-contact">
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.location && <div>{p.location}</div>}
          {p.website && <div>{p.website}</div>}
          {p.linkedin && <div>{p.linkedin}</div>}
        </div>
      </header>

      <div className="cv-header-rule" />

      <div className="cv-body">
        {hasSummary && (
          <section className="cv-section">
            <div className="cv-sec-title">PROFILE</div>
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
          <div className="cv-sec-title">EXPERIENCE</div>
          <div>
            {cv.experience.map(e => (
              <div key={e.id} className="cv-entry">
                <div className="cv-entry-head">
                  <span className="cv-role">{e.title}</span>
                  <span className="cv-date">{dateRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                {e.company && <div className="cv-org">{e.company}{e.location ? ` · ${e.location}` : ""}</div>}
                {e.description && <p style={{ fontSize: "9pt", color: "var(--cv-muted)", marginTop: 2 }}>{e.description}</p>}
                <Bullets items={e.bullets} />
              </div>
            ))}
          </div>
        </section>
      );
    case "projects":
      if (!cv.projects.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">SELECTED PROJECTS</div>
          <div>
            {cv.projects.map(pr => (
              <div key={pr.id} className="cv-entry">
                <div className="cv-entry-head">
                  <span className="cv-role">{pr.name}</span>
                  {pr.link && <span className="cv-date"><a href={pr.link.startsWith("http") ? pr.link : `https://${pr.link}`} target="_blank" rel="noreferrer">{pr.link}</a></span>}
                </div>
                {(pr.role || pr.technologies) && <div className="cv-meta">{[pr.role, pr.technologies].filter(Boolean).join(" · ")}</div>}
                {pr.description && <p style={{ fontSize: "9pt", color: "var(--cv-muted)", marginTop: 2 }}>{pr.description}</p>}
                <Bullets items={pr.bullets} />
              </div>
            ))}
          </div>
        </section>
      );
    case "education":
      if (!cv.education.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">EDUCATION</div>
          <div>
            {cv.education.map(ed => (
              <div key={ed.id} className="cv-entry">
                <div className="cv-entry-head">
                  <span className="cv-role">{ed.degree}{ed.field ? ` in ${ed.field}` : ""}</span>
                  <span className="cv-date">{dateRange(ed.startDate, ed.endDate, ed.current)}</span>
                </div>
                <div className="cv-org">{ed.school}{ed.location ? ` · ${ed.location}` : ""}{ed.grade ? ` · ${ed.grade}` : ""}</div>
                {ed.description && <p style={{ fontSize: "9pt", color: "var(--cv-muted)", marginTop: 2 }}>{ed.description}</p>}
              </div>
            ))}
          </div>
        </section>
      );
    case "skills":
      if (!(cv.flatSkills?.trim() || cv.skills?.length)) return null;
      const skillList = cv.flatSkills
        ? cv.flatSkills.split(",").map(s => s.trim()).filter(Boolean)
        : cv.skills.map(s => s.items || s.name).filter(Boolean);
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">SKILLS</div>
          <div className="cv-skills">
            {skillList.map((s, idx) => (
              <span key={idx} className="cv-skill">{s}</span>
            ))}
          </div>
        </section>
      );
    case "certifications":
      if (!cv.certifications.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">CERTIFICATIONS</div>
          <div style={{ display: "grid", gap: 5 }}>
            {cv.certifications.map(c => (
              <div key={c.id} style={{ display: "flex", justifySelf: "stretch", justifyContent: "space-between", gap: 12, fontSize: "9pt" }}>
                <span><strong>{c.name}</strong>{c.issuer ? <span style={{ color: "var(--cv-muted)" }}> · {c.issuer}</span> : null}</span>
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
          <div className="cv-sec-title">ACHIEVEMENTS</div>
          <div style={{ display: "grid", gap: 5 }}>
            {cv.achievements.map(a => (
              <div key={a.id} style={{ display: "flex", justifySelf: "stretch", justifyContent: "space-between", gap: 12, fontSize: "9pt" }}>
                <span><strong>{a.title}</strong>{a.issuer ? <span style={{ color: "var(--cv-muted)" }}> · {a.issuer}</span> : null}{a.description ? <span style={{ color: "var(--cv-muted)" }}> — {a.description}</span> : null}</span>
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
          <div className="cv-sec-title">VOLUNTEERING</div>
          <div>
            {cv.volunteering.map(v => (
              <div key={v.id} className="cv-entry">
                <div className="cv-entry-head">
                  <span className="cv-role">{v.role} <span className="cv-org">· {v.organization}</span></span>
                  <span className="cv-date">{dateRange(v.startDate, v.endDate, v.current)}</span>
                </div>
                {v.description && <p style={{ fontSize: "9pt", color: "var(--cv-muted)" }}>{v.description}</p>}
              </div>
            ))}
          </div>
        </section>
      );
    case "languages":
      if (!cv.languages.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">LANGUAGES</div>
          <p style={{ fontSize: "9pt", color: "var(--cv-muted)" }}>
            {cv.languages.map(l => `${l.name}${l.level ? ` (${l.level})` : ""}`).join(" · ")}
          </p>
        </section>
      );
    case "interests":
      if (!cv.interests.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">INTERESTS</div>
          <p style={{ fontSize: "9pt", color: "var(--cv-muted)" }}>
            {cv.interests.map(i => i.name).join(" · ")}
          </p>
        </section>
      );
    case "references":
      if (!cv.references.length) return null;
      return (
        <section key={key} className="cv-section">
          <div className="cv-sec-title">REFERENCES</div>
          <p style={{ fontSize: "9pt", color: "var(--cv-muted)" }}>
            {cv.references.map(r => `${r.name} — ${r.title}${r.contact ? ` (${r.contact})` : ""}`).join(" · ")}
          </p>
        </section>
      );
    default: return null;
  }
}

function CustomSections({ cv, variant }) {
  if (!cv.customSections?.length) return null;
  const filtered = cv.customSections.filter(s => s.entries?.length);
  if (!filtered.length) return null;
  return filtered.map(sec => (
    <section key={sec.id} className="cv-section">
      <div className={variant === "split" ? "cv-sec-title-split" : "cv-sec-title"}>{sec.title}</div>
      <div style={{ display: "grid", gap: 8, marginTop: 6 }}>
        {sec.entries.map(e => (
          <div key={e.id}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <strong style={{ fontSize: "9.5pt" }}>{e.heading}</strong>
              {e.date && <span className="cv-date">{e.date}</span>}
            </div>
            {e.subheading && <div style={{ fontSize: "9pt", color: "var(--cv-accent-coral)" }}>{e.subheading}</div>}
            {e.description && <p style={{ fontSize: "9pt", color: "var(--cv-muted)" }}>{e.description}</p>}
            {e.bullets?.length ? <Bullets items={e.bullets} /> : null}
          </div>
        ))}
      </div>
    </section>
  ));
}

/* ---------- Modern Split ---------- */
export function SplitCV({ cv }) {
  const p = cv.personal;
  const order = orderedSectionsFor(cv);
  return (
    <div className="cv cv-split">
      <aside className="cv-side">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {cv.photo?.enabled && cv.photo?.dataUrl ? (
            <img src={cv.photo.dataUrl} alt="" className="cv-photo" style={photoStyle(cv.photo.style)} />
          ) : (
            <div className="cv-photo" style={{ display: "grid", placeItems: "center", fontSize: "20pt", fontWeight: 700 }}>
              {initials(p.fullName)}
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", display: "grid", gap: 3 }}>
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
            <div className="cv-side-list">
              {cv.flatSkills
                ? cv.flatSkills.split(",").map((s, idx) => <span key={idx}>{s.trim()}</span>)
                : cv.skills.map(s => <span key={s.id}>{s.items || s.name}</span>)}
            </div>
          </div>
        ) : null}

        {cv.languages.length ? (
          <div className="cv-side-section">
            <div className="cv-side-title">Languages</div>
            <div className="cv-side-list">
              {cv.languages.map(l => <span key={l.id}>{l.name}{l.level ? ` — ${l.level}` : ""}</span>)}
            </div>
          </div>
        ) : null}
      </aside>

      <div className="cv-main">
        {p.summary && (
          <section className="cv-section">
            <div className="cv-sec-title-split">Profile</div>
            <p className="cv-summary">{p.summary}</p>
          </section>
        )}
        {order.filter(k => !["skills", "languages"].includes(k)).map(key => renderSplitSection(key, cv))}
        <CustomSections cv={cv} variant="split" />
      </div>
    </div>
  );
}

function renderSplitSection(key, cv) {
  if (key === "experience" && cv.experience.length) {
    return (
      <section key={key} className="cv-section">
        <div className="cv-sec-title-split">Experience</div>
        <div>
          {cv.experience.map(e => (
            <div key={e.id} className="cv-entry-split">
              <div className="cv-entry-top">
                <span className="cv-entry-role">{e.title}</span>
                <span className="cv-entry-date">{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              {e.company && <div className="cv-entry-where">{e.company}{e.location ? ` · ${e.location}` : ""}</div>}
              {e.description && <p style={{ fontSize: "9pt", color: "var(--cv-muted)", marginTop: 2 }}>{e.description}</p>}
              <Bullets items={e.bullets} />
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (key === "education" && cv.education.length) {
    return (
      <section key={key} className="cv-section">
        <div className="cv-sec-title-split">Education</div>
        <div>
          {cv.education.map(ed => (
            <div key={ed.id} className="cv-entry-split">
              <div className="cv-entry-top">
                <span className="cv-entry-role">{ed.degree}{ed.field ? ` in ${ed.field}` : ""}</span>
                <span className="cv-entry-date">{dateRange(ed.startDate, ed.endDate, ed.current)}</span>
              </div>
              <div style={{ fontSize: "9pt", color: "var(--cv-accent-coral)", fontWeight: 600 }}>
                {ed.school}{ed.location ? ` · ${ed.location}` : ""}{ed.grade ? ` · ${ed.grade}` : ""}
              </div>
              {ed.description && <p style={{ fontSize: "9pt", color: "var(--cv-muted)", marginTop: 2 }}>{ed.description}</p>}
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (key === "projects" && cv.projects.length) {
    return (
      <section key={key} className="cv-section">
        <div className="cv-sec-title-split">Projects</div>
        <div>
          {cv.projects.map(pr => (
            <div key={pr.id} className="cv-entry-split">
              <div className="cv-entry-top">
                <span className="cv-entry-role">{pr.name}</span>
                {pr.link && <span className="cv-entry-date"><a href={pr.link.startsWith("http") ? pr.link : `https://${pr.link}`} target="_blank" rel="noreferrer">{pr.link}</a></span>}
              </div>
              {(pr.role || pr.technologies) && <div style={{ fontSize: "8.5pt", color: "var(--cv-muted)" }}>{[pr.role, pr.technologies].filter(Boolean).join(" · ")}</div>}
              {pr.description && <p style={{ fontSize: "9pt", color: "var(--cv-muted)", marginTop: 2 }}>{pr.description}</p>}
              <Bullets items={pr.bullets} />
            </div>
          ))}
        </div>
      </section>
    );
  }
  return renderClassicSection(key, cv);
}

/* ---------- Creative Portfolio ---------- */
export function CreativeCV({ cv }) {
  const p = cv.personal;
  return (
    <div className="cv cv-creative">
      <header className="cv-creative-head">
        <div>
          <div className="cv-creative-name">
            {p.fullName ? p.fullName.split(" ").slice(0, -1).join(" ") + " " : "Your "}
            <span>{p.fullName ? p.fullName.split(" ").slice(-1)[0] : "Name"}</span>
          </div>
          {p.headline && <div className="cv-creative-title">{p.headline}</div>}
          <div className="cv-creative-contact">
            {[p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
          </div>
        </div>
        {cv.photo?.enabled && cv.photo?.dataUrl ? (
          <img src={cv.photo.dataUrl} alt="" className="cv-creative-photo" style={photoStyle(cv.photo.style)} />
        ) : null}
      </header>
      <div className="cv-creative-body">
        {p.summary && (
          <section className="cv-section">
            <div className="cv-creative-sec-title">PROFILE</div>
            <p className="cv-summary">{p.summary}</p>
          </section>
        )}
        {orderedSectionsFor(cv).map(k => renderClassicSection(k, cv))}
        <CustomSections cv={cv} variant="creative" />
      </div>
    </div>
  );
}

/* ---------- Academic Classic ---------- */
export function AcademicCV({ cv }) {
  const p = cv.personal;
  return (
    <div className="cv cv-academic">
      <header className="cv-academic-head">
        <div className="cv-academic-name">{p.fullName || "Your Name"}</div>
        {p.headline && <div style={{ fontSize: "9pt", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: "var(--cv-accent-coral)", marginTop: 4 }}>{p.headline}</div>}
        <div className="cv-academic-contact">
          {[p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
        </div>
      </header>
      {p.summary && (
        <section className="cv-section">
          <div className="cv-sec-academic">Research Profile</div>
          <p style={{ fontSize: "9.5pt", color: "var(--cv-muted)", lineHeight: 1.6 }}>{p.summary}</p>
        </section>
      )}
      {orderedSectionsFor(cv).map(k => renderClassicSection(k, cv))}
      <CustomSections cv={cv} variant="academic" />
    </div>
  );
}

/* ---------- Student / Graduate ---------- */
export function StudentCV({ cv }) {
  const p = cv.personal;
  return (
    <div className="cv cv-student">
      <header className="cv-student-head">
        {cv.photo?.enabled && cv.photo?.dataUrl ? <img src={cv.photo.dataUrl} alt="" className="cv-student-photo" style={photoStyle(cv.photo.style)} /> : null}
        <div>
          <div className="cv-student-name">{p.fullName || "Your Name"}</div>
          {p.headline && <div style={{ fontSize: "9pt", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: "var(--cv-accent-coral)" }}>{p.headline}</div>}
          <div className="cv-student-meta">
            {[p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
          </div>
        </div>
      </header>
      <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
        {p.summary && (
          <section className="cv-section">
            <div className="cv-sec-title">ABOUT</div>
            <p className="cv-summary">{p.summary}</p>
          </section>
        )}
        {orderedSectionsFor(cv).map(k => renderClassicSection(k, cv))}
        <CustomSections cv={cv} variant="classic" />
      </div>
    </div>
  );
}

/* ---------- Professional Photo ---------- */
export function PhotoCV({ cv }) {
  const p = cv.personal;
  const order = orderedSectionsFor(cv);
  return (
    <div className="cv cv-photo">
      <aside className="cv-photo-side">
        {cv.photo?.enabled && cv.photo?.dataUrl ? (
          <img src={cv.photo.dataUrl} alt="" className="cv-photo-img" style={photoStyle(cv.photo.style, true)} />
        ) : (
          <div className="cv-photo-img" style={{ display: "grid", placeItems: "center", fontWeight: 700, fontSize: "24pt", color: "#206062" }}>
            {initials(p.fullName)}
          </div>
        )}
        <div>
          <div style={{ fontWeight: 700, fontSize: "14pt", lineHeight: 1.1 }}>{p.fullName || "Your Name"}</div>
          {p.headline && <div style={{ fontSize: "8pt", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: "#e9795b", marginTop: 4 }}>{p.headline}</div>}
        </div>
        <div style={{ display: "grid", gap: 6, fontSize: "8.5pt", color: "var(--cv-muted)" }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.website && <span>{p.website}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
        {(cv.flatSkills || cv.skills.length) ? (
          <div>
            <div className="cv-sec-title" style={{ fontSize: "8pt" }}>SKILLS</div>
            <p style={{ fontSize: "8.5pt", color: "var(--cv-muted)", lineHeight: 1.5 }}>
              {cv.flatSkills || cv.skills.map(s => s.items || s.name).join(", ")}
            </p>
          </div>
        ) : null}
      </aside>
      <div className="cv-photo-main">
        {p.summary && (
          <section className="cv-section">
            <div className="cv-sec-title">PROFILE</div>
            <p className="cv-summary">{p.summary}</p>
          </section>
        )}
        {order.filter(k => !["skills", "languages"].includes(k)).map(k => renderClassicSection(k, cv))}
        <CustomSections cv={cv} variant="classic" />
      </div>
    </div>
  );
}

// Dispatcher
export function TemplateRenderer({ cv }) {
  const id = cv.design?.templateId || "classic";
  switch(id) {
    case "split": return <SplitCV cv={cv} />;
    case "contemporary": return <ClassicCV cv={cv} />;
    case "creative": return <CreativeCV cv={cv} />;
    case "editorial": return <CreativeCV cv={cv} />;
    case "academic": return <AcademicCV cv={cv} />;
    case "student": return <StudentCV cv={cv} />;
    case "photo": return <PhotoCV cv={cv} />;
    case "executive": return <ClassicCV cv={cv} />;
    default: return <ClassicCV cv={cv} />;
  }
}
