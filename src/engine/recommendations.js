// Recommendation engine — maps user goals to template + section rules
// Plain language explanations — no jargon leaks to UI without definition

import { templates } from "../data/templatesRegistry.js";

export function recommend(cv) {
  const p = cv.target?.purpose || "unsure";
  const ind = cv.target?.industry || "other";
  const lvl = cv.target?.experienceLevel || "other";
  const sub = cv.target?.submissionType || "unsure";
  const style = cv.target?.stylePreference || "recommend";

  // If user explicitly chose a style, honour it directly
  if (style !== "recommend") {
    const styleMap = {
      simple: "classic",
      ats: "classic",
      modern: "split",
      creative: "creative",
      academic: "academic"
    };
    const tid = styleMap[style];
    if (tid) {
      const tpl = templates.find(t => t.id === tid);
      return {
        templateId: tpl.id,
        reason: reasonFor(tpl, cv),
        confidence: "high",
        warnings: warningsFor(cv, tpl)
      };
    }
  }

  // Heuristic rules — keep small, explainable
  let templateId = "classic";

  if (p === "academic" || p === "scholarship" || p === "graduate") {
    templateId = "academic";
  } else if (p === "creative" || ind === "design") {
    templateId = "creative";
  } else if (lvl === "student" || lvl === "recent_graduate" || p === "internship") {
    // Student but wants modern → split is fine
    templateId = style === "modern" ? "split" : "student";
    if (p === "internship" && sub === "online") templateId = "classic";
  } else if (p === "freelance") {
    templateId = "creative";
  } else if (sub === "online") {
    // online => prioritise ATS / machine readable
    templateId = "classic";
  } else if (sub === "printed" || sub === "portfolio") {
    templateId = "split";
  } else if (ind === "technology" || ind === "business" || ind === "finance") {
    templateId = "split";
  }

  // safety override: if they have no experience but chose executive feel, keep them on student/ classic
  if ((lvl === "student" || lvl === "recent_graduate") && templateId === "executive") templateId = "student";

  const tpl = templates.find(t => t.id === templateId);
  return {
    templateId: tpl.id,
    reason: reasonFor(tpl, cv),
    confidence: p === "unsure" || style === "recommend" ? "medium" : "high",
    warnings: warningsFor(cv, tpl)
  };
}

function reasonFor(tpl, cv) {
  const p = cv.target?.purpose;
  const sub = cv.target?.submissionType;
  if (tpl.id === "classic") {
    if (sub === "online") return "You’ll submit through an online portal. Classic is machine-readable and widely accepted — it keeps your content intact in screening systems.";
    return "Classic is conservative and widely trusted. It works for almost any application where clarity matters more than colour.";
  }
  if (tpl.id === "split") return "Modern Split is polished for human readers while staying professional. Good when you email a person or share a PDF directly.";
  if (tpl.id === "creative") return "Creative is expressive — best when a person (not a system) will read it, like design, media, or freelance work.";
  if (tpl.id === "academic") return "Academic surfaces education, research, and publications — the sections selection panels expect.";
  if (tpl.id === "student") return "Graduate puts education and projects first — so you look strong even without long work history.";
  if (tpl.id === "photo") return "Photo keeps a balanced layout when you choose to include one. You can hide the photo any time.";
  return `${tpl.name} matches your goal and keeps the structure appropriate for where it will be read.`;
}

function warningsFor(cv, tpl) {
  const warns = [];
  if (cv.photo?.enabled && tpl.id === "classic" && cv.target?.submissionType === "online") {
    warns.push("You’ll add a photo to an online-submission CV. Many screening systems and employers prefer no photo for that route — consider Classic without a photo, or use Split/Creative when sharing directly with a person.");
  }
  if (tpl.id === "creative" && cv.target?.submissionType === "online") {
    warns.push("Creative uses more visual styling. If this goes through an automated portal, consider downloading a Classic copy as well.");
  }
  return warns;
}

// Section visibility helper for builder
export function recommendedSections(cv) {
  const p = cv.target?.purpose;
  const lvl = cv.target?.experienceLevel;
  const all = ["education", "experience", "projects", "skills", "certifications", "achievements", "volunteering", "languages", "interests", "references"];
  let required = [];
  let recommended = [];
  let optional = [];

  if (p === "scholarship" || p === "academic") {
    required = ["education", "achievements"];
    recommended = ["experience", "volunteering", "skills", "projects"];
    optional = all.filter(k => ![...required, ...recommended].includes(k));
  } else if (lvl === "student" || p === "internship") {
    required = ["education", "projects", "skills"];
    recommended = ["achievements", "volunteering", "experience"];
    optional = all.filter(k => ![...required, ...recommended].includes(k));
  } else if (p === "freelance") {
    required = ["skills", "projects"];
    recommended = ["experience", "certifications", "achievements"];
    optional = all.filter(k => ![...required, ...recommended].includes(k));
  } else {
    required = ["experience", "education"];
    recommended = ["skills", "projects", "certifications"];
    optional = all.filter(k => ![...required, ...recommended].includes(k));
  }

  return { required, recommended, optional };
}
