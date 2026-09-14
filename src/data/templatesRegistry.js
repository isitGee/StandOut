export const templates = [
  {
    id: "classic",
    name: "Classic",
    category: "ATS / Professional",
    tag: "ATS-friendly",
    description: "Clean typography, strong hierarchy. Passes screening systems and prints perfectly.",
    bestFor: ["Job application", "Online submission", "Conservative industries"],
    accent: "#0f2439",
    preview: "classic"
  },
  {
    id: "executive",
    name: "Executive",
    category: "ATS / Professional",
    tag: "Professional",
    description: "More presence for experienced professionals, still machine-readable.",
    bestFor: ["Experienced", "Finance", "Management"],
    accent: "#0f2439",
    preview: "classic"
  },
  {
    id: "split",
    name: "Modern Split",
    category: "Modern",
    tag: "Modern",
    description: "Sidebar for skills and contact. Polished for human recruiters.",
    bestFor: ["Technology", "Business", "Email applications"],
    accent: "#0f2439",
    preview: "split"
  },
  {
    id: "contemporary",
    name: "Contemporary",
    category: "Modern",
    tag: "Modern",
    description: "Balanced two-column with subtle colour. Versatile and scannable.",
    bestFor: ["General-purpose", "Internship", "Graduate"],
    accent: "#16425b",
    preview: "split"
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    category: "Creative",
    tag: "Creative",
    description: "Expressive header and warm accent. For designers and direct human reading.",
    bestFor: ["Design", "Creative", "Freelance"],
    accent: "#b7791f",
    preview: "creative"
  },
  {
    id: "editorial",
    name: "Editorial",
    category: "Creative",
    tag: "Portfolio",
    description: "Editorial rhythm with serif headings. Great for printed portfolios.",
    bestFor: ["Portfolio", "Freelance", "Printed CV"],
    accent: "#7c3a2b",
    preview: "creative"
  },
  {
    id: "academic",
    name: "Academic Classic",
    category: "Academic",
    tag: "Academic",
    description: "Structured for education, publications, research, and teaching.",
    bestFor: ["Academic", "Research", "Scholarship"],
    accent: "#0f2439",
    preview: "academic"
  },
  {
    id: "student",
    name: "Graduate",
    category: "Student",
    tag: "Student",
    description: "Education and projects first. Ideal when work experience is limited.",
    bestFor: ["Student", "Internship", "No experience"],
    accent: "#0f766e",
    preview: "student"
  },
  {
    id: "photo",
    name: "Professional Photo",
    category: "Photo",
    tag: "Photo optional",
    description: "Optional photo with balanced layout. Choose photo style or hide it.",
    bestFor: ["Hospitality", "Regional norms", "Portfolio print"],
    accent: "#0f2439",
    preview: "photo"
  }
];

export function getTemplate(id) {
  return templates.find(t => t.id === id) || templates[0];
}
