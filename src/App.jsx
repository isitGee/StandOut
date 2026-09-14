import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { Home } from "./pages/Home.jsx";
import { Builder } from "./pages/Builder.jsx";
import { Templates } from "./pages/Templates.jsx";
import { Guide } from "./pages/Guide.jsx";
import { Examples } from "./pages/Examples.jsx";
import { FAQ } from "./pages/FAQ.jsx";
import { Privacy, Terms, About, Contact } from "./pages/StaticPages.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { useToasts, Toasts } from "./components/Toasts.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

export function App() {
  const { theme, toggle } = useTheme();
  const { toasts, push, dismiss } = useToasts();

  return (
    <div id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <Header theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder notify={push} />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div className="container" style={{ padding:"4rem 0", textAlign:"center" }}>
              <h1>Page not found</h1>
              <p className="muted">The page you’re looking for doesn’t exist.</p>
              <a href="#/" className="btn btn-primary" style={{ marginTop:"1rem" }}>Go home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <Toasts toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
