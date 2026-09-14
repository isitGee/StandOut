// Structured CV data model — shared across templates, builder, and PDF export

export const emptyCV = {
  personal: {
    fullName: "",
    headline: "", // e.g., "Software Developer — Recent Graduate"
    email: "",
    phone: "",
    location: "", // City, Country
    website: "",
    linkedin: "",
    summary: ""
  },
  target: {
    purpose: "", // job | internship | scholarship | graduate | freelance | academic | general | creative | unsure
    industry: "", // technology | healthcare | business | finance | education | engineering | law | design | hospitality | ngo | other
    experienceLevel: "", // student | recent_graduate | entry | experienced | freelancer | career_changer | other
    submissionType: "", // online | email | printed | portfolio | unsure
    stylePreference: "" // simple | ats | modern | creative | academic | recommend
  },
  education: [], // { id, school, degree, field, location, startDate, endDate, current, description, grade }
  experience: [], // { id, title, company, location, startDate, endDate, current, description, bullets[] }
  projects: [], // { id, name, link, role, description, bullets[], technologies }
  skills: [], // { id, category, items } or flat
  skillGroups: [], // alternative grouped
  flatSkills: "", // comma string for simple path
  certifications: [], // { id, name, issuer, date, link }
  achievements: [], // { id, title, issuer, date, description }
  volunteering: [], // { id, role, organization, location, startDate, endDate, description }
  languages: [], // { id, name, level }
  interests: [], // { id, name }
  references: [], // { id, name, title, contact }
  customSections: [], // { id, title, entries: [{ id, heading, subheading, date, description, bullets }] }
  photo: {
    dataUrl: null, // base64
    style: "circle", // circle | rounded | square | portrait | none
    enabled: false
  },
  design: {
    templateId: "classic", // classic | split | creative | academic | student | photo
    accent: "#0f2439",
    fontScale: 1 // reserved
  }
};

export function createId() {
  return Math.random().toString(36).slice(2, 9);
}

export function sectionHasData(cv, key) {
  switch (key) {
    case "education": return cv.education?.length > 0;
    case "experience": return cv.experience?.length > 0;
    case "projects": return cv.projects?.length > 0;
    case "skills": return (cv.flatSkills && cv.flatSkills.trim().length > 0) || cv.skills?.length > 0 || cv.skillGroups?.length > 0;
    case "certifications": return cv.certifications?.length > 0;
    case "achievements": return cv.achievements?.length > 0;
    case "volunteering": return cv.volunteering?.length > 0;
    case "languages": return cv.languages?.length > 0;
    case "interests": return cv.interests?.length > 0;
    case "references": return cv.references?.length > 0;
    case "custom": return cv.customSections?.length > 0 && cv.customSections.some(s => s.entries?.length > 0);
    default: return false;
  }
}

export function orderedSectionsFor(cv) {
  // Returns order based on purpose/level — base heuristics, template may re-order
  const purpose = cv.target?.purpose;
  const level = cv.target?.experienceLevel;

  // Default professional order
  let order = ["summary", "experience", "education", "projects", "skills", "certifications", "achievements", "volunteering", "languages", "interests"];

  if (purpose === "scholarship" || purpose === "academic" || purpose === "graduate") {
    order = ["summary", "education", "achievements", "experience", "projects", "skills", "volunteering", "certifications", "languages", "interests"];
  } else if (level === "student" || level === "recent_graduate" || purpose === "internship") {
    order = ["summary", "education", "projects", "skills", "experience", "certifications", "achievements", "volunteering", "languages"];
  } else if (purpose === "freelance") {
    order = ["summary", "skills", "projects", "experience", "certifications", "achievements", "education", "languages"];
  } else if (purpose === "creative") {
    order = ["summary", "projects", "experience", "skills", "education", "achievements", "languages"];
  }
  // filter out empty sections later at render; keep order stable for preview consistency
  return order;
}
