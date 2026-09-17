const KEY_CANDID = "candid:cv:v1";
const KEY_STANDOUT = "standout:cv:v1";
const THEME_KEY = "candid:theme";

export function saveCV(cv) {
  try {
    const serialized = JSON.stringify(cv);
    localStorage.setItem(KEY_CANDID, serialized);
    localStorage.setItem(KEY_STANDOUT, serialized);
  } catch {}
}

export function loadCV(fallback) {
  try {
    const raw = localStorage.getItem(KEY_STANDOUT) || localStorage.getItem(KEY_CANDID);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      ...fallback,
      ...parsed,
      personal: { ...fallback.personal, ...(parsed.personal || {}) },
      target: { ...fallback.target, ...(parsed.target || {}) },
      tailoring: { ...(fallback.tailoring||{}), ...(parsed.tailoring || {}) },
      photo: { ...fallback.photo, ...(parsed.photo || {}) },
      design: { ...fallback.design, ...(parsed.design || {}) }
    };
  } catch {
    return fallback;
  }
}

export function clearCV() {
  try {
    localStorage.removeItem(KEY_CANDID);
    localStorage.removeItem(KEY_STANDOUT);
  } catch {}
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem("standout:theme", theme);
  } catch {}
}

export function loadTheme() {
  try {
    return localStorage.getItem("standout:theme") || localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}
