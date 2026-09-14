import { useEffect, useState } from "react";
import { loadTheme, saveTheme } from "../engine/storage.js";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = loadTheme();
    if (stored === "light" || stored === "dark") return stored;
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveTheme(theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  return { theme, setTheme, toggle };
}
