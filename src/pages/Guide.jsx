export function Guide() {
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> CV GUIDE
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>How to build a CV that gets read</h1>
      <p className="section-lead" style={{ marginTop: "0.6rem" }}>Plain language, no jargon. Written for people who have never made a CV before — and useful if you have. StandOut guides you in your browser, privately.</p>

      <div className="prose" style={{ marginTop: "1.8rem" }}>
        <h2>What sections do you actually need?</h2>
        <p>Every CV needs contact info and an overview of what you’ve done — but “what you’ve done” looks different for everyone. A student’s strongest section might be projects; an experienced hire’s is work history; a researcher’s is publications.</p>
        <p>StandOut orders sections based on your goal. If a section is empty we simply hide it — your final CV never shows blank headings.</p>

        <div className="guide-grid">
          <div className="card guide-card">
            <h3>Professional summary</h3>
            <p className="small muted">2–4 lines. Who you are, what you do, what you’re looking for. For students: degree, relevant skills/projects, and the type of opportunity you want.</p>
          </div>
          <div className="card guide-card">
            <h3>Experience</h3>
            <p className="small muted">Employment, internships, freelance, volunteer work. One line of context plus 2–3 bullets starting with verbs. Show outcome, not just duty.</p>
          </div>
          <div className="card guide-card">
            <h3>Projects</h3>
            <p className="small muted">Perfect when formal experience is short. School, personal, or open-source work. Include a link if public.</p>
          </div>
          <div className="card guide-card">
            <h3>Skills</h3>
            <p className="small muted">Tools and strengths relevant to the specific application. Only list what you can discuss in an interview — we never invent them for you.</p>
          </div>
        </div>

        <h2>ATS — what it actually means</h2>
        <p><strong>ATS (Applicant Tracking System)</strong> is software that some employers use to store and search applications. An “ATS-friendly” CV just means it’s easy for that software to read: clean headings, standard section titles, no text inside images, and minimal decoration.</p>
        <p>Designed to be easy for Applicant Tracking Systems and recruiters to read. If you’re applying through an online portal, choose Classic. If you email a person directly, Modern Split or Creative can be more visually engaging. StandOut shows a subtle checklist for this in the builder’s Review step.</p>

        <h2>Should you include a photo?</h2>
        <p>It depends on country, industry, and where the CV will be read. Many online systems and employers in the UK/US prefer no photo. Visual or hospitality roles, or printed portfolios, may expect one. StandOut lets you add, style (circular, rounded, square, portrait), or omit a photo — and will warn you if the combination is risky. You control this choice; we never force it.</p>

        <h2>Tailor to a specific opportunity</h2>
        <p>Paste the job description, target role, and company in StandOut’s Opportunity step. We’ll extract relevant keywords and suggest stronger bullets — all processing happens in your browser, and we never fabricate achievements. Mirror the language only for skills you truly have.</p>

        <h2>How long should a CV be?</h2>
        <p>One page is common for students and early-career. Experienced professionals may use two pages — readability beats ultra-small type. StandOut flows content to additional A4 pages with proper breaks; it never shrinks text to force a single page. Your live preview shows page count.</p>

        <h2>Checklist before you send</h2>
        <ul>
          <li>No empty headings — we hide them, but watch for thin content</li>
          <li>Dates and links are accurate</li>
          <li>Spelling and grammar checked</li>
          <li>File name is professional: <code>Firstname_Lastname_CV.pdf</code></li>
          <li>One PDF per application, tailored to the specific role if possible — use StandOut’s job-specific mode for this</li>
          <li>ATS-friendly checked, readable structure confirmed</li>
        </ul>

        <h2>Privacy</h2>
        <p><strong>Your CV stays in your browser.</strong> StandOut runs locally so your personal information can stay on your device. No account required, no backend storage of your CV content.</p>
      </div>
    </div>
  );
}
