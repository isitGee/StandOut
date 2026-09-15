export const demoCV = {
  personal: {
    fullName: "Maya Chen",
    headline: "Product Designer",
    email: "maya.chen@email.com",
    phone: "+1 415 555 0182",
    location: "San Francisco, CA",
    website: "mayachen.design",
    linkedin: "linkedin.com/in/mayachen",
    summary:
      "Product designer with 6+ years of experience turning complex workflows into clear, useful products. I partner closely with engineering and research teams to ship thoughtful experiences that move measurable business and customer outcomes."
  },
  target: {
    purpose: "job",
    industry: "tech",
    experienceLevel: "experienced",
    submissionType: "email",
    stylePreference: "modern"
  },
  photo: {
    enabled: false,
    dataUrl: "",
    style: "circle"
  },
  design: {
    templateId: "classic",
    accentColor: "#206062",
    fontPairing: "sans",
    spacing: "normal",
    showPhoto: false
  },
  education: [
    {
      id: "ed1",
      school: "California College of the Arts",
      degree: "BFA, Interaction Design",
      field: "Interaction Design",
      location: "San Francisco, CA",
      startDate: "2015",
      endDate: "2019",
      current: false,
      description: "",
      grade: ""
    }
  ],
  experience: [
    {
      id: "ex1",
      title: "Senior Product Designer",
      company: "Northstar Labs",
      location: "San Francisco, CA",
      startDate: "2022",
      endDate: "",
      current: true,
      description: "",
      bullets: [
        "Lead end-to-end design for the core platform, from discovery through launch. Built a new onboarding experience that improved activation by 28%."
      ]
    },
    {
      id: "ex2",
      title: "Product Designer",
      company: "Tandem Health",
      location: "San Francisco, CA",
      startDate: "2019",
      endDate: "2022",
      current: false,
      description: "",
      bullets: [
        "Designed patient and provider tools used by 40k+ people. Established the company's first shared design system and research practice."
      ]
    }
  ],
  projects: [
    {
      id: "pr1",
      name: "Open Source Design",
      link: "github.com/mayachen/os-design",
      role: "Creator",
      description: "A community resource for designers building accessible, inclusive products.",
      tools: "Figma, Design Systems",
      bullets: []
    }
  ],
  skills: [
    { id: "sk1", name: "Product strategy", category: "Core", items: "Product strategy" },
    { id: "sk2", name: "Interaction design", category: "Core", items: "Interaction design" },
    { id: "sk3", name: "Design systems", category: "Core", items: "Design systems" },
    { id: "sk4", name: "User research", category: "Core", items: "User research" },
    { id: "sk5", name: "Prototyping", category: "Core", items: "Prototyping" },
    { id: "sk6", name: "Figma", category: "Tools", items: "Figma" }
  ],
  flatSkills: "Product strategy, Interaction design, Design systems, User research, Prototyping, Figma",
  certifications: [],
  achievements: [],
  volunteering: [],
  languages: [
    { id: "l1", name: "English", level: "Native" },
    { id: "l2", name: "Mandarin", level: "Conversational" }
  ],
  interests: [],
  references: [],
  customSections: []
};

export const demoCVStudentNoExp = {
  personal: {
    fullName: "Liam Patel",
    headline: "Computer Science Undergraduate — Web & Systems",
    email: "liam.patel@university.ac.uk",
    phone: "+44 7700 900456",
    location: "Manchester, UK",
    website: "github.com/liampatel",
    linkedin: "linkedin.com/in/liampatel-dev",
    summary:
      "Second-year Computer Science student at University of Manchester with hands-on coursework in algorithms, full-stack web development, and database design. Looking for a 12-month software engineering placement to contribute modern React & Node skills to a product team."
  },
  target: {
    purpose: "internship",
    industry: "tech",
    experienceLevel: "student",
    submissionType: "online",
    stylePreference: "modern"
  },
  photo: {
    enabled: false,
    dataUrl: "",
    style: "circle"
  },
  design: {
    templateId: "student",
    accentColor: "#206062",
    fontPairing: "sans",
    spacing: "normal",
    showPhoto: false
  },
  education: [
    {
      id: "ed1",
      school: "University of Manchester",
      degree: "BSc (Hons) Computer Science",
      field: "Software Engineering",
      location: "Manchester, UK",
      startDate: "2023-09",
      endDate: "2027-06",
      current: true,
      description: "Key modules: Data Structures & Algorithms (82%), Distributed Systems, Database Systems, Software Engineering group project.",
      grade: "On track for First Class"
    }
  ],
  experience: [],
  projects: [
    {
      id: "pr1",
      name: "StudySync — Realtime collaborative notes",
      link: "github.com/liampatel/studysync",
      role: "Lead Developer",
      description: "Built a browser-based collaborative markdown editor with WebSockets and local-first SQLite persistence.",
      tools: "React, TypeScript, WebSocket, SQLite",
      bullets: [
        "Implemented operational transformation algorithm handling concurrent edits with under 50ms latency",
        "Used by 80+ university classmates during spring revision period with zero reported data loss"
      ]
    },
    {
      id: "pr2",
      name: "TransitPulse — Live Manchester bus departure board",
      link: "transitpulse.dev",
      role: "Personal Project",
      description: "Lightweight progressive web app parsing TfGM open data to predict bus arrivals.",
      tools: "JavaScript, GTFS API, Tailwind",
      bullets: [
        "Aggregates 14 transit routes with offline caching for frequent stops",
        "Achieved 100/100 Lighthouse performance and accessibility scores"
      ]
    }
  ],
  skills: [
    { id: "sk1", name: "Languages", category: "Languages", items: "TypeScript, JavaScript, Python, Java, SQL" },
    { id: "sk2", name: "Frameworks & Libraries", category: "Frameworks", items: "React, Node.js, Express, Next.js, HTML/CSS" },
    { id: "sk3", name: "Tools & Methods", category: "Tools", items: "Git, Docker, REST APIs, Linux, Agile basics" }
  ],
  flatSkills: "TypeScript, JavaScript, Python, Java, SQL, React, Node.js, Git, Docker, REST APIs",
  certifications: [],
  achievements: [
    {
      id: "ac1",
      title: "First Place — HackManchester Student Track",
      issuer: "Manchester Tech Trust",
      date: "2024-03",
      description: "Built an accessibility screen reader plugin in 24 hours with a team of 4"
    }
  ],
  volunteering: [
    {
      id: "vl1",
      role: "Peer Tutor — Intro to Python",
      organization: "Manchester Computing Society",
      location: "Manchester, UK",
      startDate: "2023-10",
      endDate: "2024-05",
      current: false,
      description: "Mentored 15 first-year students through weekly problem-solving labs"
    }
  ],
  languages: [
    { id: "l1", name: "English", level: "Fluent" }
  ],
  interests: [
    { id: "in1", name: "Open-source contribution" },
    { id: "in2", name: "Bouldering" },
    { id: "in3", name: "Audio synthesis" }
  ],
  references: [],
  customSections: []
};

export const demoCVProfessional = demoCV;
