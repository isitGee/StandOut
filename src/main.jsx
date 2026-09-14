import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { App } from "./App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/app.css";
import "./styles/templates.css";
import "./styles/print.css";

// Use HashRouter for GitHub Pages compatibility (or BrowserRouter with base). 
// We auto-choose: if hosted on github.io, hash is safer. For now use HashRouter.
const Router = HashRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
