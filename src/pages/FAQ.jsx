import { useState } from "react";

const faqs = [
  { q: "What is an ATS-friendly CV?", a: "ATS (Applicant Tracking System) is software some employers use to store applications. An ATS-friendly CV uses standard headings, clean typography, and no text locked inside images so that software can read it. Classic in StandOut is designed for this." },
  { q: "Should I include a photo?", a: "Only if it’s expected for your context. Many online hiring systems and employers in the UK/US prefer no photo. Creative fields, hospitality, or regional norms may expect one. StandOut lets you add a photo and style it (circle, rounded, square, portrait) — or leave it off. We’ll warn you if a photo + online submission is risky." },
  { q: "How long should a CV be?", a: "One page is typical for students and early-career; two pages is fine for experienced professionals. StandOut flows to additional A4 pages automatically and never shrinks text to force a single page." },
  { q: "Can students create a CV without work experience?", a: "Yes. Use education, projects, skills, achievements, volunteering, and coursework. Projects can be school or personal work — they show what you can do. The Graduate template puts those sections first." },
  { q: "What’s the difference between a CV and a resume?", a: "In many countries they’re used interchangeably. When there is a distinction, a CV (curriculum vitae) is often more detailed, especially in academia — publications, research, teaching. StandOut’s Academic template supports that longer format." },
  { q: "Can I use the CV for scholarships?", a: "Yes. Scholarship committees often value education, leadership, volunteering, awards, and community involvement. StandOut orders those sections higher when you choose Scholarship as your purpose." },
  { q: "Is my information stored?", a: "V1 is privacy-first and client-side. Your CV data is saved in your browser’s local storage so you don’t lose progress, and the PDF is generated locally. We don’t store your CV content on a server. You can clear it anytime in the builder. See Privacy Policy for the honest nuance about hosting logs and analytics." },
  { q: "Can I edit my CV later?", a: "Yes — as long as you use the same browser and don’t clear site data, your last CV loads automatically. You can also copy a JSON backup in the builder and re-paste it later." },
  { q: "Is the service free?", a: "Yes. Building and downloading a PDF is free and requires no account in V1." },
  { q: "Can I change templates without re-typing?", a: "Yes. All templates share the same data model. Switch in the Design step and the preview updates instantly." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="container" style={{ padding:"1.5rem 0 2.5rem", maxWidth:"44rem" }}>
      <div className="eyebrow">FAQ</div>
      <h1 style={{ fontSize:"2rem", fontWeight:800, letterSpacing:"-0.02em" }}>Questions, answered plainly</h1>
      <p className="section-lead" style={{ marginTop:"0.6rem" }}>If you’re new to CVs, start here.</p>
      <div className="faq">
        {faqs.map((f,i)=> (
          <div key={f.q} className="faq-item">
            <button className="faq-q" onClick={()=> setOpen(open===i? -1 : i)} aria-expanded={open===i}>
              <span>{f.q}</span>
              <span aria-hidden style={{ transform: open===i ? "rotate(180deg)" : "rotate(0)", transition:"transform 0.2s" }}>▾</span>
            </button>
            {open===i && <div className="faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
