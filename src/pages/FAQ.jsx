import { useState } from "react";

const faqs = [
  { q: "What is an ATS-friendly CV?", a: "ATS (Applicant Tracking System) is software some employers use to parse and filter applications. An ATS-friendly CV uses standard headings, clean typography, machine-readable text, and no text locked inside images so software can index it. Classic in candid is specifically designed for this." },
  { q: "Should I include a photo?", a: "Only if it’s expected for your specific context. Many online hiring portals and corporate employers in the UK/US prefer no photo to comply with anti-bias policies. Creative fields, hospitality, or regional norms may expect one. candid lets you add a photo and choose its styling (circle, rounded, square, portrait) — or leave it off entirely." },
  { q: "How long should a CV be?", a: "One page is standard for students and early-career jobseekers; two pages is standard for experienced professionals. candid formats to clean A4 pages automatically without squishing text." },
  { q: "Can students create a CV without work experience?", a: "Yes. Use education, projects, technical skills, academic achievements, volunteering, and coursework. Personal and academic projects demonstrate real skills. The Graduate template prioritizes education and projects." },
  { q: "What’s the difference between a CV and a resume?", a: "In many countries the terms are used interchangeably. Where differentiated, a CV (curriculum vitae) is more comprehensive, covering research, publications, and teaching. candid’s Academic template supports that thorough format." },
  { q: "Can I use this for scholarships and academic grants?", a: "Yes. Scholarship committees look for academic distinction, leadership, volunteering, awards, and community service. candid elevates those sections when you select Scholarship as your purpose." },
  { q: "Is my personal data stored or uploaded?", a: "candid is built privacy-first and client-side. Your CV data is stored exclusively in your browser’s local storage so you don’t lose work. The PDF is generated directly in your browser. No personal CV content is stored on remote servers." },
  { q: "Can I edit my CV later?", a: "Yes — as long as you return in the same browser without clearing data, your CV loads automatically. You can also copy a JSON backup in the editor to save locally." },
  { q: "Is candid free to use?", a: "Yes. Building and downloading an A4 PDF is completely free with no account or subscription required." },
  { q: "Can I change templates without losing information?", a: "Yes. All templates share the same unified data schema. Switch in the Design step or template gallery and your document updates instantly." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem", maxWidth: "46rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> FAQ
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Questions, answered plainly</h1>
      <p className="section-lead" style={{ marginTop: "0.6rem" }}>If you’re new to CVs, start here.</p>
      <div className="faq">
        {faqs.map((f, i) => (
          <div key={f.q} className="faq-item">
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{f.q}</span>
              <span aria-hidden style={{ transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
            </button>
            {open === i && <div className="faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
