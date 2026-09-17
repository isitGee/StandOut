import { Link } from "react-router-dom";

export function Privacy() {
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem", maxWidth: "46rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> PRIVACY POLICY
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Your CV is yours.</h1>
      <p className="small muted">Last updated: 17 September 2026</p>
      <div className="prose" style={{ marginTop: "1.5rem" }}>
        <p><strong>StandOut is privacy-first by architecture, not just by policy.</strong> The CV builder runs entirely in your browser so your personal information can stay on your device.</p>
        <h2>What we mean by “Your CV stays in your browser”</h2>
        <ul>
          <li>Your CV content (name, experience, education, etc.) is processed locally on your device.</li>
          <li>PDF generation happens locally via the browser’s native print engine — selectable text, A4, crisp margins.</li>
          <li>For convenience, your active CV is cached in <code>localStorage</code> so you don’t lose work between sessions. It is never transmitted to an external database.</li>
          <li>No sign-up, email, or account creation is required to create or download your CV.</li>
        </ul>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not store your personal resume data on remote servers.</li>
          <li>We do not track or sell your personal details to recruiters or advertisers.</li>
          <li>We do not send your job description or tailoring data to a server — tailoring suggestions are done on-device.</li>
        </ul>
        <h2>Third-party infrastructure</h2>
        <ul>
          <li><strong>Hosting:</strong> Standard infrastructure logs (IP, user-agent) may exist at the hosting provider (e.g., GitHub Pages).</li>
          <li><strong>Web fonts:</strong> We load Google Fonts (Plus Jakarta Sans, Newsreader, JetBrains Mono) directly from Google's CDN.</li>
        </ul>
        <h2>Your controls</h2>
        <ul>
          <li>Clear your CV anytime with <em>Reset</em> in the builder.</li>
          <li>Clear <code>localStorage</code> for this site in your browser settings.</li>
          <li>Use the <em>Copy backup JSON</em> feature to save a portable local copy of your CV.</li>
        </ul>
        <h2>Contact</h2>
        <p>Questions? <Link to="/contact">Contact us</Link>.</p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem", maxWidth: "46rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> TERMS
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Terms of Use</h1>
      <p className="small muted">Last updated: 17 September 2026</p>
      <div className="prose" style={{ marginTop: "1.5rem" }}>
        <p>StandOut is provided as a client-side document creation utility. You are responsible for the truthfulness and accuracy of the information you enter.</p>
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not enter fraudulent credentials, employers, degrees, or achievements. The software does not fabricate claims and users should not either.</li>
          <li>Do not attempt to compromise the integrity of the website.</li>
        </ul>
        <h2>No career advice guarantee</h2>
        <p>Template recommendations and layout adjustments are structured guidance, not guaranteed career or legal advice. Verify the formatting preferences of the specific institution or company you are targeting.</p>
        <h2>Availability & Liability</h2>
        <p>As a static, client-side application, StandOut is offered free without uptime guarantees or liability for employment outcomes.</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem", maxWidth: "46rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> ABOUT STANDOUT
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Build a CV that stands out for the opportunity you're actually applying for.</h1>
      <div className="prose" style={{ marginTop: "1.5rem" }}>
        <p>StandOut was created to solve a persistent frustration in career tools: most builders force users into rigid templates, demand logins, or hide PDF downloads behind paywalls.</p>
        <p>StandOut asks <em>what you’re trying to accomplish</em> in plain language, guides you to the right structure, and gives you a professional, privacy-conscious editing experience with a live A4 preview. Your CV stays in your browser.</p>
        <h2>Core Principles</h2>
        <ul>
          <li><strong>Guide both beginners and experienced pros</strong> without friction.</li>
          <li><strong>Plain language</strong> — no unexplained industry buzzwords; ATS is explained simply.</li>
          <li><strong>Privacy-first</strong> — client-side first, no account needed, Your CV stays in your browser.</li>
          <li><strong>Fewer, genuinely different templates</strong> — each crafted for a specific submission context (ATS, Professional, Modern, Creative, Academic, Photo).</li>
          <li><strong>Document craft</strong> — selectable-text PDFs, real A4 margins, clean typography, page count and shadows.</li>
          <li><strong>Tailored, not generic</strong> — job-specific mode to align your CV to a real opportunity, with human control.</li>
        </ul>
        <p><Link to="/builder" className="btn btn-primary" style={{ marginTop: "1rem" }}>Create your CV <span className="btn-arrow" aria-hidden="true">&rarr;</span></Link></p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="container" style={{ padding: "2rem 0 3.5rem", maxWidth: "46rem" }}>
      <div className="eyebrow">
        <span className="eyebrow-dot">•</span> CONTACT
      </div>
      <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Contact & Feedback</h1>
      <div className="prose" style={{ marginTop: "1.5rem" }}>
        <p>We’d love to hear how StandOut works for you — what felt easy, what felt unclear, or what features you’d like to see.</p>
        <h3>GitHub Repository</h3>
        <p><a href="https://github.com/isitGee/StandOut" target="_blank" rel="noreferrer">github.com/isitGee/StandOut</a> — open an issue for bugs or suggestions.</p>
        <h3>What to include in feedback</h3>
        <ul>
          <li>Device and browser used</li>
          <li>What you were trying to accomplish</li>
          <li>Any unexpected formatting or preview issues</li>
        </ul>
        <p className="small muted" style={{marginTop:"1rem"}}>StandOut is free and open — we keep it private by design.</p>
      </div>
    </div>
  );
}
