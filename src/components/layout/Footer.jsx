import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontWeight: 800 }}>
              <span className="brand-mark">SO</span> StandOut
            </div>
            <p>
              Create the right CV for what you’re trying to achieve — guided, private, and free.
              No account required. Your information stays in your browser.
            </p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <Link to="/builder">Builder</Link>
            <Link to="/templates">Templates</Link>
            <Link to="/examples">Examples</Link>
            <Link to="/guide">CV Guide</Link>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact / Feedback</Link>
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
          <span style={{ display: "inline-flex", gap: "0.7rem", alignItems: "center" }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "#0f7a3d", display: "inline-block" }} aria-hidden /> No account required
          </span>
        </div>
      </div>
    </footer>
  );
}
