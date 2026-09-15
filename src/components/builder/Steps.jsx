import { Field, TextInput, TextArea, Select } from "./FormFields.jsx";
import { validateEmail, validatePhone, validateUrl } from "../../engine/validation.js";
import { useState } from "react";
import { createId } from "../../data/cvSchema.js";

export function PersonalStep({ cv, updatePersonal }) {
  const p = cv.personal;
  const [touched, setTouched] = useState({});
  const emailErr = touched.email ? validateEmail(p.email) : null;
  const phoneErr = touched.phone ? validatePhone(p.phone) : null;
  const webErr = touched.website ? validateUrl(p.website) : null;
  const linkedErr = touched.linkedin ? validateUrl(p.linkedin) : null;

  return (
    <div style={{ display:"grid", gap:"1rem" }}>
      <div className="helper">This is the header of your CV. Keep it concise — hiring managers scan this first.</div>
      <div style={{ display:"grid", gap:"1rem", gridTemplateColumns: "1fr 1fr" }}>
        <Field label="Full name" htmlFor="fullName" error={!p.fullName && touched.fullName ? "Please enter your full name." : null}>
          <TextInput id="fullName" placeholder="Maya Chen" value={p.fullName} onChange={e=> updatePersonal({ fullName: e.target.value })} onBlur={()=> setTouched(s=> ({...s, fullName:true}))} aria-invalid={!!(!p.fullName && touched.fullName)} />
        </Field>
        <Field label="Professional headline" hint="e.g., Lead Product Designer & Design Strategist" htmlFor="headline" optional>
          <TextInput id="headline" placeholder="Lead Product Designer" value={p.headline} onChange={e=> updatePersonal({ headline: e.target.value })} />
        </Field>
      </div>

      <div style={{ display:"grid", gap:"1rem", gridTemplateColumns: "1fr 1fr" }}>
        <Field label="Email" htmlFor="email" hint="We’ll never share it. Used only on your CV." error={emailErr}>
          <TextInput id="email" type="email" placeholder="maya.chen@designcraft.io" value={p.email} onChange={e=> updatePersonal({ email: e.target.value })} onBlur={()=> setTouched(s=> ({...s,email:true}))} aria-invalid={!!emailErr} aria-describedby="email-hint" />
        </Field>
        <Field label="Phone" htmlFor="phone" optional error={phoneErr}>
          <TextInput id="phone" placeholder="+44 7700 900 128" value={p.phone} onChange={e=> updatePersonal({ phone: e.target.value })} onBlur={()=> setTouched(s=> ({...s,phone:true}))} aria-invalid={!!phoneErr} />
        </Field>
      </div>

      <div style={{ display:"grid", gap:"1rem", gridTemplateColumns: "1fr 1fr" }}>
        <Field label="Location" hint="City and country is usually enough" htmlFor="location" optional>
          <TextInput id="location" placeholder="London, UK (open to remote)" value={p.location} onChange={e=> updatePersonal({ location: e.target.value })} />
        </Field>
        <Field label="Website / Portfolio" htmlFor="website" optional error={webErr}>
          <TextInput id="website" placeholder="mayachen.design" value={p.website} onChange={e=> updatePersonal({ website: e.target.value })} onBlur={()=> setTouched(s=> ({...s,website:true}))} aria-invalid={!!webErr} />
        </Field>
      </div>

      <Field label="LinkedIn" htmlFor="linkedin" optional error={linkedErr}>
        <TextInput id="linkedin" placeholder="linkedin.com/in/mayachen" value={p.linkedin} onChange={e=> updatePersonal({ linkedin: e.target.value })} onBlur={()=> setTouched(s=> ({...s,linkedin:true}))} aria-invalid={!!linkedErr} />
      </Field>
    </div>
  );
}

export function SummaryStep({ cv, updatePersonal }) {
  const isStudent = cv.target.experienceLevel === "student" || cv.target.purpose === "internship";
  return (
    <div style={{ display:"grid", gap:"1rem" }}>
      <div className="helper">
        <strong>What to write:</strong> {isStudent
          ? "Mention your degree, relevant skills, projects or interests, and the type of opportunity you’re seeking. 2–3 sentences is enough."
          : "A short introduction describing who you are, what you do, and what you’re looking for. Keep it to 2–4 lines."}
      </div>
      <Field label="Professional summary" hint={`${cv.personal.summary.length} characters — aim for 200–400.`} htmlFor="summary">
        <TextArea id="summary" rows={5} placeholder={isStudent ? "Second-year Computer Science student with projects in..." : "Product designer with 6+ years of experience leading 0-to-1 web applications, scalable design systems, and cross-functional teams across health-tech and fintech."} value={cv.personal.summary} onChange={e=> updatePersonal({ summary: e.target.value })} />
      </Field>
      <div className="helper" style={{ background:"var(--surface-2)" }}>
        Tip: Write in plain language. We don’t invent achievements — use your own words. You can refine the wording later.
      </div>
    </div>
  );
}


export function EducationStep({ cv, setCV }) {
  const list = cv.education;
  const add = () => {
    const id = createId();
    setCV(c=> ({...c, education:[...c.education, { id, school:"", degree:"", field:"", location:"", startDate:"", endDate:"", current:false, description:"", grade:"" }]}));
  };
  const update = (id, patch) => setCV(c=> ({...c, education: c.education.map(e=> e.id===id? {...e,...patch}: e)}));
  const remove = (id) => setCV(c=> ({...c, education: c.education.filter(e=> e.id!==id)}));
  const move = (id, dir) => {
    setCV(c=>{
      const idx = c.education.findIndex(e=> e.id===id);
      const nidx = idx + dir;
      if (nidx <0 || nidx>=c.education.length) return c;
      const arr = [...c.education];
      const [item] = arr.splice(idx,1);
      arr.splice(nidx,0,item);
      return {...c, education: arr};
    });
  };

  return (
    <div style={{ display:"grid", gap:"1rem" }}>
      <div className="repeatable-head">
        <h3 style={{ fontSize:"1rem" }}>Education</h3>
        <button className="btn btn-secondary btn-small" onClick={add} type="button">+ Add education</button>
      </div>
      {list.length===0 && <div className="empty"><strong>No education yet.</strong><p className="small muted">Add your most recent qualification first.</p><button className="btn btn-primary btn-small" onClick={add} type="button" style={{ marginTop:"0.6rem" }}>Add education</button></div>}
      {list.map(ed=> (
        <div key={ed.id} className="entry-card">
          <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
            <Field label="School / University" htmlFor={`ed-school-${ed.id}`}>
              <TextInput id={`ed-school-${ed.id}`} value={ed.school} onChange={e=> update(ed.id, { school: e.target.value })} placeholder="University of Bath" />
            </Field>
            <Field label="Degree" htmlFor={`ed-degree-${ed.id}`}>
              <TextInput id={`ed-degree-${ed.id}`} value={ed.degree} onChange={e=> update(ed.id, { degree: e.target.value })} placeholder="BSc (Hons) Interactive Media & Design" />
            </Field>
          </div>
          <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
            <Field label="Field of study" optional htmlFor={`ed-field-${ed.id}`}>
              <TextInput id={`ed-field-${ed.id}`} value={ed.field} onChange={e=> update(ed.id, { field: e.target.value })} placeholder="Human-Computer Interaction" />
            </Field>
            <Field label="Location" optional htmlFor={`ed-loc-${ed.id}`}>
              <TextInput id={`ed-loc-${ed.id}`} value={ed.location} onChange={e=> update(ed.id, { location: e.target.value })} placeholder="Bath, UK" />
            </Field>
          </div>
          <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr 1fr" }}>
            <Field label="Start" hint="YYYY-MM" htmlFor={`ed-start-${ed.id}`}>
              <TextInput id={`ed-start-${ed.id}`} value={ed.startDate} onChange={e=> update(ed.id,{ startDate:e.target.value })} placeholder="2016-09" />
            </Field>
            <Field label="End" hint={ed.current? "Present" : "YYYY-MM"} htmlFor={`ed-end-${ed.id}`}>
              <TextInput id={`ed-end-${ed.id}`} value={ed.endDate} onChange={e=> update(ed.id,{ endDate:e.target.value })} placeholder="2020-06" disabled={ed.current} />
            </Field>
            <label style={{ display:"flex", gap:"0.5rem", alignItems:"center", marginTop:"1.4rem", fontSize:"0.85rem" }}>
              <input type="checkbox" checked={ed.current} onChange={e=> update(ed.id,{ current:e.target.checked })} /> Currently studying
            </label>
          </div>
          <Field label="Description" optional htmlFor={`ed-desc-${ed.id}`} hint="Grade, honours, dissertation, relevant coursework">
            <TextArea id={`ed-desc-${ed.id}`} value={ed.description} onChange={e=> update(ed.id,{ description:e.target.value })} placeholder="First-Class Honours. Major project on accessible multi-brand design systems." rows={2} />
          </Field>
          <Field label="Grade" optional htmlFor={`ed-grade-${ed.id}`}>
            <TextInput id={`ed-grade-${ed.id}`} value={ed.grade} onChange={e=> update(ed.id,{ grade:e.target.value })} placeholder="First Class Honours (1st)" />
          </Field>
          <div className="entry-actions">
            <button className="btn btn-ghost btn-small" onClick={()=> move(ed.id,-1)} type="button">↑ Move up</button>
            <button className="btn btn-ghost btn-small" onClick={()=> move(ed.id,1)} type="button">↓ Move down</button>
            <button className="btn btn-secondary btn-small" onClick={()=> remove(ed.id)} type="button" style={{ color:"var(--error)", borderColor:"#fecdd3" }}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ExperienceStep({ cv, setCV }) {
  const list = cv.experience;
  const add = () => {
    const id = createId();
    setCV(c=> ({...c, experience:[...c.experience, { id, title:"", company:"", location:"", startDate:"", endDate:"", current:false, description:"", bullets:[""] }]}));
  };
  const update = (id, patch) => setCV(c=> ({...c, experience: c.experience.map(e=> e.id===id? {...e,...patch}: e)}));
  const remove = (id) => setCV(c=> ({...c, experience: c.experience.filter(e=> e.id!==id)}));
  const hasNoExp = list.length===0;

  return (
    <div style={{ display:"grid", gap:"1rem" }}>
      <div className="helper">Include employment, internships, freelance, or volunteer work that’s relevant. If you have no formal experience, you can leave this empty — projects and education will carry your CV.</div>
      <div className="repeatable-head">
        <h3 style={{ fontSize:"1rem" }}>Experience</h3>
        <div style={{ display:"flex", gap:"0.5rem" }}>
          <button className="btn btn-secondary btn-small" onClick={add} type="button">+ Add experience</button>
        </div>
      </div>
      {hasNoExp && (
        <div className="empty">
          <strong>No work experience added.</strong>
          <p className="small muted">That’s okay — many students and career changers start without it. Add projects instead, or click “Add experience” if you have any.</p>
          <div style={{ marginTop:"0.7rem", display:"flex", gap:"0.5rem", justifyContent:"center" }}>
            <button className="btn btn-primary btn-small" onClick={add} type="button">Add experience</button>
            <button className="btn btn-ghost btn-small" onClick={()=> document.getElementById("exp-skip")?.scrollIntoView({behavior:"smooth"})} type="button">Skip for now</button>
          </div>
        </div>
      )}
      {list.map(exp=> (
        <div key={exp.id} className="entry-card" id="exp-skip">
          <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
            <Field label="Job title" htmlFor={`ex-title-${exp.id}`}>
              <TextInput id={`ex-title-${exp.id}`} value={exp.title} onChange={e=> update(exp.id,{ title:e.target.value })} placeholder="Lead Product Designer" />
            </Field>
            <Field label="Company / Organisation" htmlFor={`ex-company-${exp.id}`}>
              <TextInput id={`ex-company-${exp.id}`} value={exp.company} onChange={e=> update(exp.id,{ company:e.target.value })} placeholder="Northstar Labs" />
            </Field>
          </div>
          <Field label="Location" optional htmlFor={`ex-loc-${exp.id}`}>
            <TextInput id={`ex-loc-${exp.id}`} value={exp.location} onChange={e=> update(exp.id,{ location:e.target.value })} placeholder="London, UK" />
          </Field>
          <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr 1fr" }}>
            <Field label="Start" htmlFor={`ex-start-${exp.id}`}>
              <TextInput id={`ex-start-${exp.id}`} value={exp.startDate} onChange={e=> update(exp.id,{ startDate:e.target.value })} placeholder="2021-03" />
            </Field>
            <Field label="End" htmlFor={`ex-end-${exp.id}`}>
              <TextInput id={`ex-end-${exp.id}`} value={exp.endDate} onChange={e=> update(exp.id,{ endDate:e.target.value })} placeholder="Present" disabled={exp.current} />
            </Field>
            <label style={{ display:"flex", gap:"0.5rem", alignItems:"center", marginTop:"1.4rem", fontSize:"0.85rem" }}>
              <input type="checkbox" checked={exp.current} onChange={e=> update(exp.id,{ current:e.target.checked })} /> I currently work here
            </label>
          </div>
          <Field label="Description" optional htmlFor={`ex-desc-${exp.id}`} hint="Optional one-line summary">
            <TextInput id={`ex-desc-${exp.id}`} value={exp.description} onChange={e=> update(exp.id,{ description:e.target.value })} placeholder="Design system lead across multi-platform clinical products" />
          </Field>
          <Field label="Key achievements / responsibilities" hint="One per line. Start with a verb. Focus on impact.">
            <div style={{ display:"grid", gap:"0.5rem" }}>
              {(exp.bullets || [""]).map((b, idx)=> (
                <div key={idx} style={{ display:"flex", gap:"0.5rem" }}>
                  <TextInput
                    value={b}
                    onChange={e=> {
                      const arr = [...(exp.bullets||[])];
                      arr[idx]=e.target.value;
                      update(exp.id,{ bullets: arr });
                    }}
                    placeholder="Led 0-to-1 design system adopted by 18 engineering teams, reducing UI defect rates by 42%"
                    style={{ flex:1 }}
                  />
                  <button className="btn btn-ghost btn-small" onClick={()=> {
                    const arr = [...exp.bullets];
                    arr.splice(idx,1);
                    update(exp.id,{ bullets: arr.length? arr : [""] });
                  }} type="button" aria-label="Remove bullet">×</button>
                </div>
              ))}
              <button className="link-btn" onClick={()=> update(exp.id,{ bullets:[...(exp.bullets||[]), ""] })} type="button">+ Add bullet</button>
            </div>
          </Field>
          <div className="entry-actions">
            <button className="btn btn-secondary btn-small" onClick={()=> remove(exp.id)} type="button" style={{ color:"var(--error)", borderColor:"#fecdd3" }}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectsStep({ cv, setCV }) {
  const list = cv.projects;
  const add = () => {
    const id = createId();
    setCV(c=> ({...c, projects:[...c.projects, { id, name:"", link:"", role:"", description:"", bullets:[""], technologies:"" }]}));
  };
  const update = (id, patch) => setCV(c=> ({...c, projects: c.projects.map(p=> p.id===id? {...p,...patch}: p)}));
  const remove = (id) => setCV(c=> ({...c, projects: c.projects.filter(p=> p.id!==id)}));

  return (
    <div style={{ display:"grid", gap:"1rem" }}>
      <div className="helper">Great for students and anyone without long work history. Add school, personal, or open-source projects. Include the link if it’s public.</div>
      <div className="repeatable-head">
        <h3 style={{ fontSize:"1rem" }}>Projects</h3>
        <button className="btn btn-secondary btn-small" onClick={add} type="button">+ Add project</button>
      </div>
      {list.length===0 && <div className="empty"><strong>No projects yet.</strong><p className="small muted">Add a project to show what you can do.</p><button className="btn btn-primary btn-small" onClick={add} type="button" style={{ marginTop:"0.6rem" }}>Add project</button></div>}
      {list.map(pr=> (
        <div key={pr.id} className="entry-card">
          <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
            <Field label="Project name" htmlFor={`pr-name-${pr.id}`}>
              <TextInput id={`pr-name-${pr.id}`} value={pr.name} onChange={e=> update(pr.id,{ name:e.target.value })} placeholder="Pulse Design System" />
            </Field>
            <Field label="Link" optional htmlFor={`pr-link-${pr.id}`}>
              <TextInput id={`pr-link-${pr.id}`} value={pr.link} onChange={e=> update(pr.id,{ link:e.target.value })} placeholder="mayachen.design/pulse" />
            </Field>
          </div>
          <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
            <Field label="Your role" optional htmlFor={`pr-role-${pr.id}`}>
              <TextInput id={`pr-role-${pr.id}`} value={pr.role} onChange={e=> update(pr.id,{ role:e.target.value })} placeholder="Lead Designer & Architect" />
            </Field>
            <Field label="Technologies" optional htmlFor={`pr-tech-${pr.id}`}>
              <TextInput id={`pr-tech-${pr.id}`} value={pr.technologies} onChange={e=> update(pr.id,{ technologies:e.target.value })} placeholder="Figma, React, Storybook, Design Tokens" />
            </Field>
          </div>
          <Field label="Description" htmlFor={`pr-desc-${pr.id}`}>
            <TextArea id={`pr-desc-${pr.id}`} value={pr.description} onChange={e=> update(pr.id,{ description:e.target.value })} placeholder="Open-source multi-brand design token system and component library" rows={2} />
          </Field>
          <Field label="Highlights" hint="One per line (optional)">
            <div style={{ display:"grid", gap:"0.5rem" }}>
              {(pr.bullets || [""]).map((b, idx)=> (
                <div key={idx} style={{ display:"flex", gap:"0.5rem" }}>
                  <TextInput value={b} onChange={e=> { const arr=[...(pr.bullets||[])]; arr[idx]=e.target.value; update(pr.id,{ bullets:arr }); }} placeholder="Adopted by 1,200+ active repositories with WCAG AAA accessibility contrast" style={{ flex:1 }} />
                  <button className="btn btn-ghost btn-small" onClick={()=> { const arr=[...pr.bullets]; arr.splice(idx,1); update(pr.id,{ bullets: arr.length? arr:[""] }); }} type="button">×</button>
                </div>
              ))}
              <button className="link-btn" onClick={()=> update(pr.id,{ bullets:[...(pr.bullets||[]), ""] })} type="button">+ Add highlight</button>
            </div>
          </Field>
          <div className="entry-actions"><button className="btn btn-secondary btn-small" onClick={()=> remove(pr.id)} type="button" style={{ color:"var(--error)", borderColor:"#fecdd3" }}>Remove</button></div>
        </div>
      ))}
    </div>
  );
}

export function SkillsStep({ cv, setCV }) {
  return (
    <div style={{ display:"grid", gap:"1rem" }}>
      <div className="helper">List the skills relevant to this opportunity. Group them if helpful, or just list them separated by commas. Don’t list skills you can’t discuss in an interview.</div>
      <Field label="Skills" hint="Separate with commas. Example: Design Systems, Figma, User Research, Prototyping, React & CSS, Accessibility (WCAG 2.1)" htmlFor="skills">
        <TextArea id="skills" value={cv.flatSkills} onChange={e=> setCV(c=> ({...c, flatSkills: e.target.value}))} placeholder="Design Systems, Figma, User Research, Prototyping, React & CSS, Accessibility (WCAG 2.1), Interaction Design" rows={3} />
      </Field>
      <div className="helper" style={{ background:"var(--surface-2)" }}>
        Tip: Tailor this section to the role. If a job description mentions specific tools, include them here only if you have experience with them — never fabricate.
      </div>
    </div>
  );
}

export function MoreStep({ cv, setCV }) {
  const add = (key, factory) => {
    const id = createId();
    setCV(c=> ({...c, [key]: [...c[key], factory(id)]}));
  };
  const update = (key, id, patch) => setCV(c=> ({...c, [key]: c[key].map(x=> x.id===id? {...x,...patch}: x)}));
  const remove = (key, id) => setCV(c=> ({...c, [key]: c[key].filter(x=> x.id!==id)}));

  return (
    <div style={{ display:"grid", gap:"1.6rem" }}>
      <section>
        <div className="repeatable-head"><h3 style={{ fontSize:"0.98rem" }}>Certifications</h3><button className="btn btn-secondary btn-small" onClick={()=> add("certifications", id=> ({ id, name:"", issuer:"", date:"", link:"" }))} type="button">+ Add</button></div>
        {cv.certifications.length===0 && <p className="small muted" style={{ marginTop:"0.6rem" }}>No certifications added — skip if not relevant.</p>}
        {cv.certifications.map(c=> (
          <div key={c.id} className="entry-card" style={{ marginTop:"0.7rem" }}>
            <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
              <Field label="Name"><TextInput value={c.name} onChange={e=> update("certifications", c.id, { name:e.target.value })} placeholder="Google Data Analytics — Foundations" /></Field>
              <Field label="Issuer" optional><TextInput value={c.issuer} onChange={e=> update("certifications", c.id, { issuer:e.target.value })} placeholder="Coursera" /></Field>
            </div>
            <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
              <Field label="Date" optional><TextInput value={c.date} onChange={e=> update("certifications", c.id, { date:e.target.value })} placeholder="2023-11" /></Field>
              <Field label="Link" optional><TextInput value={c.link} onChange={e=> update("certifications", c.id, { link:e.target.value })} placeholder="https://..." /></Field>
            </div>
            <div className="entry-actions"><button className="btn btn-secondary btn-small" onClick={()=> remove("certifications", c.id)} type="button" style={{ color:"var(--error)", borderColor:"#fecdd3" }}>Remove</button></div>
          </div>
        ))}
      </section>

      <section>
        <div className="repeatable-head"><h3 style={{ fontSize:"0.98rem" }}>Achievements</h3><button className="btn btn-secondary btn-small" onClick={()=> add("achievements", id=> ({ id, title:"", issuer:"", date:"", description:"" }))} type="button">+ Add</button></div>
        {cv.achievements.length===0 && <p className="small muted" style={{ marginTop:"0.6rem" }}>Awards, competitions, measurable accomplishments.</p>}
        {cv.achievements.map(a=> (
          <div key={a.id} className="entry-card" style={{ marginTop:"0.7rem" }}>
            <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
              <Field label="Title"><TextInput value={a.title} onChange={e=> update("achievements", a.id, { title:e.target.value })} placeholder="Dean’s List" /></Field>
              <Field label="Issuer" optional><TextInput value={a.issuer} onChange={e=> update("achievements", a.id, { issuer:e.target.value })} placeholder="University of Leeds" /></Field>
            </div>
            <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
              <Field label="Date" optional><TextInput value={a.date} onChange={e=> update("achievements", a.id, { date:e.target.value })} placeholder="2023-06" /></Field>
              <Field label="Description" optional><TextInput value={a.description} onChange={e=> update("achievements", a.id, { description:e.target.value })} placeholder="Top 10% of cohort" /></Field>
            </div>
            <div className="entry-actions"><button className="btn btn-secondary btn-small" onClick={()=> remove("achievements", a.id)} type="button" style={{ color:"var(--error)", borderColor:"#fecdd3" }}>Remove</button></div>
          </div>
        ))}
      </section>

      <section>
        <div className="repeatable-head"><h3 style={{ fontSize:"0.98rem" }}>Languages</h3><button className="btn btn-secondary btn-small" onClick={()=> add("languages", id=> ({ id, name:"", level:"" }))} type="button">+ Add</button></div>
        {cv.languages.length===0 && <p className="small muted" style={{ marginTop:"0.6rem" }}>Add languages you can use professionally.</p>}
        {cv.languages.map(l=> (
          <div key={l.id} className="entry-card" style={{ marginTop:"0.7rem" }}>
            <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr 0.6fr" }}>
              <Field label="Language"><TextInput value={l.name} onChange={e=> update("languages", l.id, { name:e.target.value })} placeholder="French" /></Field>
              <Field label="Level" optional>
                <Select value={l.level} onChange={e=> update("languages", l.id, { level:e.target.value })}>
                  <option value="">Select level</option>
                  <option>Native</option><option>Fluent</option><option>Advanced</option><option>Intermediate</option><option>Basic</option>
                </Select>
              </Field>
              <div style={{ display:"flex", alignItems:"end" }}><button className="btn btn-secondary btn-small" onClick={()=> remove("languages", l.id)} type="button" style={{ color:"var(--error)", borderColor:"#fecdd3" }}>Remove</button></div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="repeatable-head"><h3 style={{ fontSize:"0.98rem" }}>Volunteering</h3><button className="btn btn-secondary btn-small" onClick={()=> add("volunteering", id=> ({ id, role:"", organization:"", location:"", startDate:"", endDate:"", current:false, description:"" }))} type="button">+ Add</button></div>
        {cv.volunteering.length===0 && <p className="small muted" style={{ marginTop:"0.6rem" }}>Often valued for scholarships and early-career roles.</p>}
        {cv.volunteering.map(v=> (
          <div key={v.id} className="entry-card" style={{ marginTop:"0.7rem" }}>
            <div style={{ display:"grid", gap:"0.9rem", gridTemplateColumns:"1fr 1fr" }}>
              <Field label="Role"><TextInput value={v.role} onChange={e=> update("volunteering", v.id, { role:e.target.value })} placeholder="Food Bank Coordinator" /></Field>
              <Field label="Organisation"><TextInput value={v.organization} onChange={e=> update("volunteering", v.id, { organization:e.target.value })} placeholder="Leeds Community Food Bank" /></Field>
            </div>
            <Field label="Description" optional><TextArea value={v.description} onChange={e=> update("volunteering", v.id, { description:e.target.value })} placeholder="What you did and its impact" rows={2} /></Field>
            <div className="entry-actions"><button className="btn btn-secondary btn-small" onClick={()=> remove("volunteering", v.id)} type="button" style={{ color:"var(--error)", borderColor:"#fecdd3" }}>Remove</button></div>
          </div>
        ))}
      </section>

      <section>
        <div className="repeatable-head"><h3 style={{ fontSize:"0.98rem" }}>Custom sections</h3><button className="btn btn-secondary btn-small" onClick={()=> add("customSections", id=> ({ id, title:"Community Leadership", entries:[{ id:createId(), heading:"", subheading:"", date:"", description:"", bullets:[] }]}))} type="button">+ Add section</button></div>
        <p className="small muted" style={{ marginTop:"0.6rem" }}>Need something else? Create a custom section title and add entries.</p>
        {cv.customSections.map(sec=> (
          <div key={sec.id} className="entry-card" style={{ marginTop:"0.7rem" }}>
            <Field label="Section title"><TextInput value={sec.title} onChange={e=> update("customSections", sec.id, { title:e.target.value })} placeholder="Community Leadership" /></Field>
            <div className="entry-actions"><button className="btn btn-secondary btn-small" onClick={()=> remove("customSections", sec.id)} type="button" style={{ color:"var(--error)", borderColor:"#fecdd3" }}>Remove section</button></div>
          </div>
        ))}
      </section>
    </div>
  );
}

export function PhotoStep({ cv, setCV, notify }) {
  const photo = cv.photo;
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { notify("Please upload an image file (JPG or PNG).", "error"); return; }
    if (file.size > 3 * 1024 * 1024) { notify("Image is too large — please use a file under 3 MB.", "error"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setCV(c=> ({...c, photo:{ ...c.photo, dataUrl: reader.result, enabled:true }}));
      notify("Photo added. You can change the style or remove it anytime.", "success");
    };
    reader.readAsDataURL(file);
  };
  const styles = [
    { id:"circle", label:"Circular" },
    { id:"rounded", label:"Rounded" },
    { id:"square", label:"Square" },
    { id:"portrait", label:"Portrait" }
  ];
  return (
    <div style={{ display:"grid", gap:"1rem" }}>
      <div className="helper">
        A photo can work well for some visual or regional CV formats, but many online recruitment systems and employers prefer CVs without photos. Choose based on where you’re applying — you can change this anytime.
      </div>
      <label style={{ display:"flex", gap:"0.7rem", alignItems:"center", cursor:"pointer", fontWeight:600 }}>
        <input type="checkbox" checked={photo.enabled} onChange={e=> setCV(c=> ({...c, photo:{ ...c.photo, enabled:e.target.checked }}))} />
        Include a profile photo
      </label>

      {photo.enabled && (
        <div className="photo-uploader">
          <div style={{ display:"flex", gap:"1rem", alignItems:"center", flexWrap:"wrap" }}>
            <div className="photo-preview" style={photoPreviewStyle(photo.style)}>
              {photo.dataUrl ? <img src={photo.dataUrl} alt="Profile preview" /> : <span className="small muted" style={{ padding:"1rem", textAlign:"center" }}>No photo yet</span>}
            </div>
            <div>
              <label className="btn btn-secondary btn-small" style={{ cursor:"pointer" }}>
                Upload photo
                <input type="file" accept="image/*" onChange={onFile} style={{ display:"none" }} />
              </label>
              {photo.dataUrl && <button className="btn btn-ghost btn-small" onClick={()=> setCV(c=> ({...c, photo:{ ...c.photo, dataUrl:null }}))} type="button" style={{ marginLeft:"0.5rem" }}>Remove</button>}
              <p className="field-hint" style={{ marginTop:"0.5rem" }}>JPG or PNG, up to 3 MB. Cropping is applied automatically; for precise crops edit before uploading.</p>
            </div>
          </div>

          <div>
            <div className="field-label">Photo style</div>
            <div className="photo-styles" style={{ marginTop:"0.5rem" }}>
              {styles.map(s=> (
                <button
                  key={s.id}
                  type="button"
                  onClick={()=> setCV(c=> ({...c, photo:{ ...c.photo, style:s.id }}))}
                  className="btn btn-small"
                  style={{
                    background: photo.style===s.id ? "var(--brand)" : "var(--surface)",
                    color: photo.style===s.id ? "var(--on-brand)" : "var(--text)",
                    borderColor: photo.style===s.id ? "var(--brand)" : "var(--border)"
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function photoPreviewStyle(style) {
  if (style==="circle") return { borderRadius:"999px" };
  if (style==="rounded") return { borderRadius:"16px" };
  if (style==="square") return { borderRadius:"8px" };
  if (style==="portrait") return { borderRadius:"14px" };
  return {};
}

export function DesignStep({ cv, setCV }) {
  const templates = [
    { id:"classic", name:"Classic", desc:"ATS-friendly, minimal" },
    { id:"split", name:"Modern Split", desc:"Sidebar, human-read" },
    { id:"creative", name:"Creative", desc:"Expressive, portfolio" },
    { id:"academic", name:"Academic", desc:"Research-focused" },
    { id:"student", name:"Graduate", desc:"Education first" },
    { id:"photo", name:"Photo", desc:"Balanced photo layout" }
  ];
  return (
    <div style={{ display:"grid", gap:"1rem" }}>
      <div className="helper">The same information can look different. Switch templates without re-entering data — the preview updates instantly.</div>
      <div className="choice-grid cols-2">
        {templates.map(t=> {
          const active = cv.design.templateId === t.id;
          return (
            <button key={t.id} type="button" className="choice-card" aria-checked={active} onClick={()=> setCV(c=> ({...c, design:{ ...c.design, templateId:t.id }}))}>
              <span className="choice-icon"><span style={{ width:8, height:8, borderRadius:999, background: active? "#fff":"#94a3b8", display:"block" }} /></span>
              <span style={{ flex:1 }}>
                <h4>{t.name}</h4>
                <p>{t.desc}</p>
              </span>
              {active && <span style={{ color:"var(--brand)", fontWeight:800 }}>✓</span>}
            </button>
          );
        })}
      </div>
      <p className="field-hint">All templates generate A4 PDFs with proper margins and selectable text. You can also download a second template as a comparison.</p>
    </div>
  );
}
