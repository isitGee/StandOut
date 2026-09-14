export const demoCV = {
  personal: {
    fullName: "Amara Johnson",
    headline: "Business Graduate — Operations & Data",
    email: "amara.j@example.com",
    phone: "+44 7700 900123",
    location: "Leeds, United Kingdom",
    website: "amara-johnson.example.com",
    linkedin: "linkedin.com/in/amarajohnson",
    summary:
      "Business Management graduate with internship experience in operations and strong analytical skills. Built inventory dashboards and process improvements that reduced stock discrepancies by 18%. Seeking an entry-level operations analyst role where I can combine process thinking with data."
  },
  target: {
    purpose: "job",
    industry: "business",
    experienceLevel: "recent_graduate",
    submissionType: "online",
    stylePreference: "modern"
  },
  education: [
    {
      id: "ed1",
      school: "University of Leeds",
      degree: "BSc Business Management",
      field: "",
      location: "Leeds, UK",
      startDate: "2021-09",
      endDate: "2024-06",
      current: false,
      description: "First-Class Honours. Dissertation: Operational efficiency in SME supply chains.",
      grade: "First Class"
    }
  ],
  experience: [
    {
      id: "ex1",
      title: "Operations Intern",
      company: "Northbridge Retail",
      location: "Leeds, UK",
      startDate: "2023-06",
      endDate: "2023-08",
      current: false,
      description: "",
      bullets: [
        "Built an inventory tracking sheet used by 12 store staff; cut weekly stock-check time by 3 hours",
        "Analysed delivery discrepancies and proposed rerouting that saved an estimated £4k per quarter",
        "Shadowed the operations manager and documented SOPs for new starters"
      ]
    },
    {
      id: "ex2",
      title: "Student Volunteer — Food Bank Coordinator",
      company: "Leeds Community Food Bank",
      location: "Leeds, UK",
      startDate: "2022-10",
      endDate: "2024-05",
      current: false,
      description: "",
      bullets: ["Coordinated a team of 8 volunteers; organised two campus food drives reaching 300+ students"]
    }
  ],
  projects: [
    {
      id: "pr1",
      name: "SME Inventory Dashboard (Excel & Power BI)",
      link: "",
      role: "",
      description: "Course project with a local bakery chain. Cleaned sales data and built a reorder-point dashboard.",
      bullets: ["Modelled reorder points and safety stock; presented findings to the owner"],
      technologies: "Excel, Power BI, SQL"
    }
  ],
  flatSkills: "Operations, Excel (advanced), Power BI, SQL (basic), Stakeholder communication, Process mapping, Data analysis",
  skills: [],
  certifications: [
    { id: "c1", name: "Google Data Analytics — Foundations", issuer: "Coursera", date: "2023-11", link: "" }
  ],
  achievements: [
    { id: "a1", title: "Dean’s List", issuer: "University of Leeds", date: "2023-06", description: "Top 10% of cohort" }
  ],
  volunteering: [],
  languages: [
    { id: "l1", name: "English", level: "Native" },
    { id: "l2", name: "French", level: "Intermediate" }
  ],
  interests: [{ id: "i1", name: "Long-distance running" }, { id: "i2", name: "Photography" }],
  references: [],
  customSections: [],
  photo: { dataUrl: null, style: "circle", enabled: false },
  design: { templateId: "classic", accent: "#0f2439", fontScale: 1 }
};

export const demoCVStudentNoExp = {
  personal: {
    fullName: "Samira Patel",
    headline: "Computer Science Student — Web & Data Projects",
    email: "samira.patel@example.com",
    phone: "+44 7700 900456",
    location: "Manchester, UK",
    website: "",
    linkedin: "",
    summary:
      "Second-year Computer Science student seeking a summer internship in software development. Built three web projects with React and Python, including a campus event finder used by 200+ students. Strong fundamentals in data structures and keen to learn in a professional team."
  },
  target: {
    purpose: "internship",
    industry: "technology",
    experienceLevel: "student",
    submissionType: "online",
    stylePreference: "modern"
  },
  education: [
    {
      id: "ed1",
      school: "University of Manchester",
      degree: "BSc Computer Science",
      field: "",
      location: "Manchester, UK",
      startDate: "2023-09",
      endDate: "",
      current: true,
      description: "Relevant coursework: Data Structures, Web Development, Databases. GPA 3.8/4.0",
      grade: ""
    }
  ],
  experience: [],
  projects: [
    {
      id: "pr1",
      name: "Campus Event Finder",
      link: "github.com/samira/event-finder",
      role: "Builder",
      description: "React + Firebase app aggregating campus events. Implemented filters and bookmarking.",
      bullets: ["200+ active users during pilot; reduced event discovery time in testing"],
      technologies: "React, Firebase, Tailwind"
    },
    {
      id: "pr2",
      name: "Expense Tracker CLI",
      link: "",
      role: "",
      description: "Python CLI that parses bank CSVs and categorises spending.",
      bullets: [],
      technologies: "Python, SQLite"
    }
  ],
  flatSkills: "JavaScript, React, Python, Git, SQL (basic), Problem solving, Team collaboration",
  skills: [],
  certifications: [],
  achievements: [{ id: "a1", title: "HackManchester — Runner up", issuer: "HackManchester", date: "2024-03", description: "" }],
  volunteering: [{ id: "v1", role: "Code Club Mentor", organization: "Local Secondary School", location: "Manchester", startDate: "2024-01", endDate: "", description: "Mentor Year 8 students in Scratch and Python basics" }],
  languages: [],
  interests: [],
  references: [],
  customSections: [],
  photo: { dataUrl: null, style: "circle", enabled: false },
  design: { templateId: "student", accent: "#0f766e", fontScale: 1 }
};
