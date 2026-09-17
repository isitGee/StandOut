import { useState } from "react";

const faqs = [
  { q: "Is StandOut free?", a: "Yes. Building and downloading an A4 PDF is completely free with no account or subscription required. Your CV stays in your browser." },
  { q: "Does StandOut store my CV?", a: "No. StandOut is privacy-first and client-side. Your CV data is stored only in your browser’s local storage so you don’t lose work. The PDF is generated directly in your browser via print-to-PDF. No personal CV content is stored on remote servers. You can clear it anytime with Reset." },
  { q: "Can I create an ATS-friendly CV?", a: "Yes. ATS (Applicant Tracking System) is software some employers use to parse applications. StandOut’s Classic template is specifically designed to be ATS-friendly — standard headings, clean typography, machine-readable text, no text locked inside images. The builder also shows an ATS-friendly checklist: readable structure, standard headings, relevant keywords, consistent formatting, no problematic graphics." },
  { q: "Can I add a photo?", a: "Yes — if you want to. CV expectations differ across countries and industries. StandOut lets you upload a photo and choose circular, rounded, square, or portrait positioning, or hide it entirely. We don’t force a photo and will warn you if a photo + online portal combination is risky." },
  { q: "Can I create different CVs for different jobs?", a: "Yes. Use the Opportunity step to tailor this CV to a specific role — paste the job description, target role, company, and optional job URL. StandOut will suggest relevant skills and stronger bullets (on-device only). Duplicate your CV in the workspace and tailor each copy. Your data stays in your browser." },
  { q: "Can I export my CV as PDF?", a: "Yes. Click Download PDF — StandOut opens your browser’s print dialog. Choose “Save as PDF”, A4 paper, and ensure “Background graphics” is checked. The result is a real, selectable-text PDF with proper margins and page breaks — not a screenshot." },
  { q: "Can I use StandOut for internships?", a: "Yes. Choose Internship as your purpose. StandOut elevates education and projects, and the Graduate template puts education first — ideal when work experience is limited. You don’t need to invent experience; projects and coursework carry your CV." },
  { q: "Can I use StandOut for academic applications?", a: "Yes. For scholarships, graduate, or research roles, StandOut surfaces education, achievements, volunteering, and publications, and recommends the Academic template — structured for longer, detailed CVs." },
  { q: "What is an ATS-friendly CV?", a: "ATS (Applicant Tracking System) software stores and searches applications. An ATS-friendly CV uses standard headings, clean typography, machine-readable text, and no text locked inside images so software can index it. Classic in StandOut is designed for this." },
  { q: "Should I include a photo?", a: "Only if it’s expected for your specific context. Many online hiring portals and corporate employers in the UK/US prefer no photo. Creative fields, hospitality, or regional norms may expect one. StandOut lets you choose." },
  { q: "How long should a CV be?", a: "One page for students and early-career, two pages for experienced professionals. StandOut flows to additional A4 pages automatically with clean page separation." },
  { q: "Can I change templates without losing information?", a: "Yes. All templates share the same data. Switch in the Design step or template gallery and your document updates instantly — preview mirrors the final PDF." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem", maxWidth: "46rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> FAQ
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Questions, answered plainly</h1>
      <p className="section-lead" style={{ marginTop: "0.6rem" }}>If you’re new to CVs, start here. StandOut is free, private, and runs in your browser.</p>
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
