const KEY = "standout:cv:v1";
const THEME_KEY = "standout:theme";

export function saveCV(cv) {
  try { localStorage.setItem(KEY, JSON.stringify(cv)); } catch {}
}
export function loadCV(fallback) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // shallow merge with fallback to allow migrations
    return { ...fallback, ...parsed, personal: { ...fallback.personal, ...(parsed.personal || {}) }, target: { ...fallback.target, ...(parsed.target || {}) }, photo: { ...fallback.photo, ...(parsed.photo || {}) }, design: { ...fallback.design, ...(parsed.design || {}) } };
  } catch { return fallback; }
}
export function clearCV() {
  try { localStorage.removeItem(KEY); } catch {}
}
export function saveTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch {}
}
export function loadTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch { return null; }
}
