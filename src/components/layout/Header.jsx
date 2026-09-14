import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IconMoon, IconSun } from "../Icons.jsx";

export function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand" aria-label="StandOut home" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden>SO</span>
          <span>Stand<span>Out</span></span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          <NavLink to="/builder" className="nav-link">Builder</NavLink>
          <NavLink to="/templates" className="nav-link">Templates</NavLink>
          <NavLink to="/guide" className="nav-link">Guide</NavLink>
          <NavLink to="/examples" className="nav-link">Examples</NavLink>
          <NavLink to="/faq" className="nav-link">FAQ</NavLink>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={onToggleTheme}
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>
          <Link to="/builder" className="btn btn-primary btn-small" style={{ display: "inline-flex" }}>
            Create my CV
          </Link>
          <button
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(v => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          <Link to="/builder" onClick={() => setOpen(false)}>Builder</Link>
          <Link to="/templates" onClick={() => setOpen(false)}>Templates</Link>
          <Link to="/guide" onClick={() => setOpen(false)}>CV Guide</Link>
          <Link to="/examples" onClick={() => setOpen(false)}>Examples</Link>
          <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          <Link to="/privacy" onClick={() => setOpen(false)}>Privacy</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        </nav>
      )}
    </header>
  );
}
