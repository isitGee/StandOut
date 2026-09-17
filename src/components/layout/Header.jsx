import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { StandOutLogoMark, IconMoon, IconSun } from "../Icons.jsx";

export function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand" aria-label="StandOut home" onClick={() => setOpen(false)}>
          <StandOutLogoMark size={28} />
          <span className="brand-text">StandOut</span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/builder" className="nav-link">Build a CV</NavLink>
          <NavLink to="/templates" className="nav-link">Templates</NavLink>
          <NavLink to="/guide" className="nav-link">CV guide</NavLink>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={onToggleTheme}
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>
          <Link to="/builder" className="btn btn-primary btn-header">
            Create your CV <span className="btn-arrow" aria-hidden="true">&rarr;</span>
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
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/builder" onClick={() => setOpen(false)}>Build a CV</Link>
          <Link to="/templates" onClick={() => setOpen(false)}>Templates</Link>
          <Link to="/guide" onClick={() => setOpen(false)}>CV guide</Link>
          <Link to="/examples" onClick={() => setOpen(false)}>Examples</Link>
          <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          <Link to="/privacy" onClick={() => setOpen(false)}>Privacy</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        </nav>
      )}
    </header>
  );
}
