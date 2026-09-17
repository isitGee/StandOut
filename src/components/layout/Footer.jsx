import { Link } from "react-router-dom";
import { StandOutLogoMark } from "../Icons.jsx";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand" style={{ display: "inline-flex", textDecoration: "none" }}>
              <StandOutLogoMark size={24} />
              <span className="brand-text">StandOut</span>
            </Link>
            <p>
              Build a CV that stands out for the opportunity you're actually applying for — guided, private, and free.
              No account required. Your CV stays in your browser.
            </p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <Link to="/builder">Build a CV</Link>
            <Link to="/templates">Templates</Link>
            <Link to="/examples">Examples</Link>
            <Link to="/guide">CV guide</Link>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact & Feedback</Link>
            <a href="https://github.com/isitGee/StandOut" target="_blank" rel="noreferrer">GitHub</a>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/about">About</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} StandOut. Built client-side, privacy-first.</span>
          <span style={{ display: "inline-flex", gap: "0.6rem", alignItems: "center" }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--brand)", display: "inline-block" }} aria-hidden /> Your CV stays in your browser
          </span>
        </div>
      </div>
    </footer>
  );
}
