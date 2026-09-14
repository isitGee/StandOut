import { Link } from "react-router-dom";

export function Privacy() {
  return (
    <div className="container" style={{ padding:"1.5rem 0 2.5rem", maxWidth:"44rem" }}>
      <h1 style={{ fontSize:"2rem", fontWeight:800 }}>Privacy Policy</h1>
      <p className="small muted">Last updated: 14 September 2026</p>
      <div className="prose" style={{ marginTop:"1rem" }}>
        <p><strong>StandOut is privacy-first by architecture, not just by promise.</strong> In V1, the CV builder runs entirely in your browser.</p>
        <h2>What we mean by “privacy-first”</h2>
        <ul>
          <li>Your CV content (name, experience, education, etc.) is processed locally in your browser.</li>
          <li>PDF generation happens locally via the browser’s print-to-PDF.</li>
          <li>For convenience, your last CV is saved in <code>localStorage</code> in this browser so you don’t lose progress. It never goes to our application server.</li>
          <li>No account is required to create or download a CV.</li>
        </ul>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not store your CV content on a backend database in V1.</li>
          <li>We do not sell your data.</li>
        </ul>
        <h2>What may still involve third parties</h2>
        <p>Even with a client-side app, some infrastructure touches data:</p>
        <ul>
          <li><strong>Hosting/CDN logs:</strong> Standard web-server logs (IP, user-agent) may exist at the hosting provider (e.g., GitHub Pages / Vercel / Netlify).</li>
          <li><strong>Fonts:</strong> We load Google Fonts (Inter, Newsreader, JetBrains Mono). Your browser requests those font files from Google’s servers; refer to Google’s privacy notice.</li>
          <li><strong>Analytics (if enabled in future):</strong> If we add analytics, we will update this policy before collecting.</li>
        </ul>
        <h2>Your controls</h2>
        <ul>
          <li>Clear your CV anytime with <em>Reset</em> in the builder.</li>
          <li>Clear <code>localStorage</code> for this site in your browser settings.</li>
          <li>Use the <em>Copy backup</em> JSON feature to keep your own offline copy.</li>
        </ul>
        <h2>Contact</h2>
        <p>Questions? <Link to="/contact">Contact us</Link>.</p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="container" style={{ padding:"1.5rem 0 2.5rem", maxWidth:"44rem" }}>
      <h1 style={{ fontSize:"2rem", fontWeight:800 }}>Terms of Use</h1>
      <p className="small muted">Last updated: 14 September 2026</p>
      <div className="prose" style={{ marginTop:"1rem" }}>
        <p>StandOut is provided as-is for creating CVs. You are responsible for the accuracy of the information you enter.</p>
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not enter false credentials, employers, degrees, or achievements. The tool never fabricates them and you shouldn’t either.</li>
          <li>Do not upload unlawful content or attempt to abuse the service.</li>
        </ul>
        <h2>No professional advice</h2>
        <p>Template recommendations and section ordering are guidance, not career or legal advice. Validate expectations with the employer or institution you’re applying to.</p>
        <h2>Availability</h2>
        <p>As a static, client-side app, StandOut aims for high availability but offers no uptime guarantee. We may update templates and guidance over time.</p>
        <h2>Liability</h2>
        <p>To the extent permitted by law, StandOut is not liable for application outcomes.</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="container" style={{ padding:"1.5rem 0 2.5rem", maxWidth:"44rem" }}>
      <h1 style={{ fontSize:"2rem", fontWeight:800 }}>About StandOut</h1>
      <div className="prose" style={{ marginTop:"1rem" }}>
        <p>StandOut exists to solve a simple but overlooked problem: people often have the information for a CV but don’t know what structure, sections, or style is appropriate for their actual goal — a job, internship, scholarship, or freelance work.</p>
        <p>Instead of “choose a template → fill 50 fields → download,” StandOut asks <em>what you’re trying to accomplish</em> in plain language, guides you to the right structure, and gives you a professional, privacy-first editing experience.</p>
        <h2>Principles</h2>
        <ul>
          <li><strong>Guide both beginners and experts</strong> without slowing either down.</li>
          <li><strong>Plain language</strong> — no assumed knowledge of “ATS,” “chronological,” or “functional.”</li>
          <li><strong>Privacy-first</strong> — client-side first, no account required.</li>
          <li><strong>Less but better templates</strong> — each has a clear purpose.</li>
          <li><strong>Craft</strong> — selectable-text PDFs, proper A4 margins, correct page breaks.</li>
        </ul>
        <p>Build quality inspired by our reference projects and the design-system discipline of <code>awesome-design-md</code>. StandOut has its own calm, premium identity — trustworthy enough for career information.</p>
        <p><Link to="/builder" className="btn btn-primary btn-small">Start building</Link></p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="container" style={{ padding:"1.5rem 0 2.5rem", maxWidth:"44rem" }}>
      <h1 style={{ fontSize:"2rem", fontWeight:800 }}>Contact / Feedback</h1>
      <div className="prose" style={{ marginTop:"1rem" }}>
        <p>We’d love to hear how StandOut works for you — what helped, what confused you, or what template you wish existed.</p>
        <h3>GitHub</h3>
        <p><a href="https://github.com/isitGee/StandOut" target="_blank" rel="noreferrer">isitGee/StandOut</a> — open an issue for bugs or feature ideas.</p>
        <h3>Email</h3>
        <p>For now, please use GitHub issues. A direct contact form is on the roadmap with the same privacy-first constraints.</p>
        <h3>What to include in feedback</h3>
        <ul>
          <li>Device and browser (e.g., “iPhone 13, Safari”)</li>
          <li>What you were trying to achieve</li>
          <li>What felt unclear</li>
        </ul>
        <p>Thank you for helping make StandOut better for everyone — especially first-time CV builders.</p>
      </div>
    </div>
  );
}
