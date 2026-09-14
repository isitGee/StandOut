export function validateEmail(v) {
  if (!v) return null; // optional
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v)) return "Please enter a valid email address, e.g. name@example.com.";
  return null;
}
export function validatePhone(v) {
  if (!v) return null;
  if (v.replace(/[^0-9]/g, "").length < 7) return "Please enter a valid phone number with at least 7 digits.";
  return null;
}
export function validateUrl(v) {
  if (!v) return null;
  try {
    const u = new URL(v.startsWith("http") ? v : "https://" + v);
    if (!u.hostname.includes(".")) throw new Error("x");
    return null;
  } catch { return "Please enter a valid link, e.g. linkedin.com/in/yourname or https://example.com."; }
}
export function validateRequired(v, label = "This field") {
  if (!v || !String(v).trim()) return `${label} is required.`;
  return null;
}
export function validateDate(v) {
  if (!v) return null;
  // allow YYYY-MM or YYYY
  if (!/^\d{4}(-\d{2})?$/.test(v)) return "Use YYYY-MM or YYYY, e.g. 2024-06.";
  return null;
}

export function completenessScore(cv) {
  let score = 0;
  const max = 7;
  if (cv.personal.fullName) score++;
  if (cv.personal.email || cv.personal.phone) score++;
  if (cv.personal.summary && cv.personal.summary.length > 40) score++;
  if (cv.education.length > 0) score++;
  if (cv.experience.length > 0 || cv.projects.length > 0) score++;
  if (cv.flatSkills || cv.skills.length) score++;
  if (cv.design.templateId) score++;
  return { score, max, pct: Math.round((score / max) * 100) };
}
