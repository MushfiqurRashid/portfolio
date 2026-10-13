// All portfolio content lives here — edit this file to update the site.

export const site = {
  name: "Md. Mushfiqur Rashid Marmo",
  shortName: "Mushfiqur Rashid",
  firstName: "Mushfiqur",
  lastName: "Rashid",
  role: "Product Manager, Tech",
  company: "Empire Capital BD",
  headline: "Product Manager · Full-Stack Engineer · AI/ML Builder",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  email: "mushfiqur.tech@gmail.com",
  phone: "+8801720097317",
  phoneDisplay: "+880 1720-097317",
  cv: "/cv/Md_Mushfiqur_Rashid_Marmo_CV.pdf",
  description:
    "Portfolio of Md. Mushfiqur Rashid Marmo — Product Manager (Tech) at Empire Capital BD, full-stack developer and AI/ML builder from Dhaka, Bangladesh. Shipped Bangla Blend, Empire Capital and FairFarm BD.",
  socials: {
    github: "https://github.com/MushfiqurRashid",
    linkedin: "https://www.linkedin.com/in/mushfiqur-rashid-5a8583238",
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroRoles = ["digital products", "AI systems", "e-commerce platforms", "web experiences"];

export const marqueeItems = [
  "Product Management",
  "Full-Stack Development",
  "Applied AI",
  "RAG Systems",
  "Machine Learning",
  "Next.js",
  "Explainable AI",
  "Production Deployment",
  "Stakeholder Management",
  "Python",
];

// Words wrapped in *asterisks* are highlighted.
export const aboutText =
  "I'm a Computer Science graduate working where *product thinking* meets *engineering.* I turn business requirements into clear specifications, build the platforms myself, ship them to production — and keep them running. From e-commerce and capital markets to agritech, I bring full-stack craft and *applied AI* to products people actually use.";

export const pillars = [
  {
    title: "Product & Program",
    body: "I translate business requirements into specs, roadmaps and development tasks — and keep stakeholders aligned from kickoff to launch.",
    tags: ["Requirements", "Roadmaps", "Stakeholders"],
  },
  {
    title: "Full-Stack Engineering",
    body: "I build with React, Next.js, Node.js and PostgreSQL, then deploy and operate on Vercel and VPS infrastructure — domains, DNS and all.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Applied AI & ML",
    body: "From RAG assistants to explainable ML and transformer NLP — I take models from notebook to something people can use.",
    tags: ["RAG", "NLP", "XAI"],
  },
];

export const stats = [
  { value: 3, pad: 2, suffix: "", label: "Live production platforms shipped" },
  { value: 22, pad: 2, suffix: "", label: "ML models benchmarked in research" },
  { value: 200, pad: 3, suffix: "+", label: "Structured prompts designed for LLM evaluation" },
  { value: 2, pad: 1, suffix: "nd", label: "Global Runner-Up — NASA Space Apps Challenge 2023" },
];

export type Work = {
  slug: string;
  title: string;
  year: string;
  status: "Live" | "In development";
  category: string;
  url?: string;
  domain?: string;
  image?: string;
  description: string;
  role: string;
  highlights: string[];
  stack: string[];
  tint: string;
  accent: string;
};

export const work: Work[] = [
  {
    slug: "bangla-blend",
    title: "Bangla Blend",
    year: "2026",
    status: "Live",
    category: "E-commerce",
    url: "https://banglablend.store",
    domain: "banglablend.store",
    image: "/images/work/banglablend.jpg",
    description:
      "A Bangladesh-focused e-commerce platform for regional spice blends, gifts, recipes and food-heritage content.",
    role: "Product lead · Full-stack",
    highlights: [
      "Led the full-stack implementation and production deployment",
      "Integrated Google Tag Manager & Meta Pixel for conversion tracking",
      "Commerce plus storytelling — recipes and Bangladeshi food heritage",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Turborepo"],
    tint: "#2b0f0a",
    accent: "#e2643f",
  },
  {
    slug: "empire-capital",
    title: "Empire Capital",
    year: "2026",
    status: "Live",
    category: "Corporate · Finance",
    url: "https://empirecapitalbd.com",
    domain: "empirecapitalbd.com",
    image: "/images/work/empirecapital.jpg",
    description:
      "Corporate platform for a research-led financial and corporate advisory firm — research, market updates and an investor centre.",
    role: "Product Manager, Tech",
    highlights: [
      "Requirements analysis through full-stack implementation",
      "Deployment, domain and DNS configuration on VPS",
      "Ongoing technical operations and maintenance",
    ],
    stack: ["Next.js", "Nginx", "VPS", "DNS & Domains"],
    tint: "#0b1830",
    accent: "#5b8cff",
  },
  {
    slug: "fairfarm",
    title: "FairFarm BD",
    year: "2025 — 26",
    status: "Live",
    category: "Agritech",
    url: "https://fairfarm.com.bd",
    domain: "fairfarm.com.bd",
    image: "/images/work/fairfarm.jpg",
    description:
      "An agritech platform empowering Bangladeshi farmers — from crop intelligence to fair market access.",
    role: "Co-Founder · Product & Engineering",
    highlights: [
      "Led the website, apps and digital product ecosystem",
      "AI agricultural assistant built on retrieval-augmented generation",
      "Owned hosting, deployment and production infrastructure",
    ],
    stack: ["React", "Vite", "RAG Chatbot", "Hostinger"],
    tint: "#0c2416",
    accent: "#f2c94c",
  },
  {
    slug: "empire-philately",
    title: "Empire Philately",
    year: "2026",
    status: "In development",
    category: "E-commerce",
    description:
      "An e-commerce platform for selling philately products — stamps and collectibles for collectors. Currently in active development.",
    role: "Product lead",
    highlights: [
      "Leading product scoping and specifications",
      "Driving development from requirements to launch",
    ],
    stack: ["E-commerce", "Product Strategy", "Full-Stack"],
    tint: "#1d1026",
    accent: "#c792ff",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  type: string;
  current?: boolean;
  url?: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Empire Capital BD",
    role: "Product Manager, Tech",
    period: "Jul 2026 — Present",
    type: "Full-time · Dhaka",
    current: true,
    url: "https://empirecapitalbd.com",
    summary:
      "Leading product and technology implementation across digital platforms — translating business requirements into specifications, development tasks and production-ready solutions.",
    highlights: [
      "Delivered the Empire Capital corporate website end-to-end: requirements analysis, full-stack implementation, deployment, domain configuration and ongoing operations.",
      "Led development of Bangla Blend, a Bangladesh-focused e-commerce platform for regional spice products, gifts, recipes and food-heritage content.",
      "Manage VPS hosting, Vercel deployments, domain & DNS configuration and maintenance across digital products.",
      "Integrated Google Tag Manager and Meta Pixel into Bangla Blend for analytics, conversion tracking and marketing measurement.",
      "Currently leading development of Empire Philately, an e-commerce platform for philately products.",
    ],
    tags: ["Product Strategy", "Full-Stack", "VPS & DNS", "Vercel", "GTM", "Meta Pixel"],
  },
  {
    company: "GramAI",
    role: "Associate Program Manager",
    period: "Jun 2026 — Jul 2026",
    type: "Full-time · Dhaka",
    summary:
      "Supported AI-focused programs and corporate AI training, coordinating initiatives across stakeholders.",
    highlights: [
      "Supported AI-focused programs, corporate AI training, stakeholder engagement, meetings and program execution.",
      "Coordinated technology and AI initiatives across stakeholders, translating program objectives into actionable activities and deliverables.",
    ],
    tags: ["AI Programs", "Corporate AI Training", "Stakeholder Management"],
  },
  {
    company: "FairFarm BD",
    role: "Co-Founder",
    period: "Jan 2025 — Jun 2026",
    type: "Startup · Agritech",
    url: "https://fairfarm.com.bd",
    summary:
      "Co-founded an agritech startup building digital solutions and technology-enabled services for farmers — alongside my final year at university, then full-time after graduating.",
    highlights: [
      "Led development and improvement of the websites, applications and the wider digital product ecosystem.",
      "Contributed across technology, product development, business development, startup operations and agricultural technology initiatives.",
      "Took part in stakeholder, partner and collaborator meetings; supported product execution, hosting, deployment and production infrastructure.",
    ],
    tags: ["Agritech", "Product Development", "Business Development", "Infrastructure"],
  },
];

export type Project = {
  title: string;
  category: string;
  year?: string;
  description: string;
  tags: string[];
  url: string;
  visual: "xai" | "rag" | "crop" | "vision" | "nlp" | "tickets" | "orbit";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Physics-Guided GSM Prediction with Explainable AI",
    category: "Machine Learning · XAI",
    year: "2025",
    description:
      "End-to-end ML pipeline predicting fabric GSM for single-jersey knits — data cleaning, SQL extraction and physics-guided feature engineering. Benchmarked 22 regression models and explained them with SHAP & LIME.",
    tags: ["Python", "Scikit-learn", "SHAP", "LIME", "SQL"],
    url: "https://github.com/MushfiqurRashid/GSM-Prediction-with-XAI",
    visual: "xai",
    featured: true,
  },
  {
    title: "Agriculture RAG Chatbot",
    category: "LLM · RAG",
    description:
      "AI assistant for FairFarm BD that answers crop, soil, irrigation and pest questions by retrieving from agricultural documents before generating.",
    tags: ["FastAPI", "FAISS", "LLMs", "TypeScript"],
    url: "https://github.com/MushfiqurRashid/Agriculture-RAG-Chatbot",
    visual: "rag",
  },
  {
    title: "Intelligent Crop Recommendation",
    category: "ML · Decision Support",
    year: "2025",
    description:
      "Ensemble classifier that recommends the best crop from soil, climate and nutrient parameters — data-driven decisions for farmers.",
    tags: ["Python", "Ensemble Learning", "Scikit-learn"],
    url: "https://github.com/MushfiqurRashid/Intelligent-Crop-Recommendation-System",
    visual: "crop",
  },
  {
    title: "Fire & Smoke Detection",
    category: "Computer Vision",
    description:
      "YOLOv8 detector for fire and smoke with an inference API, tests and Docker packaging — structured to be deployment-ready.",
    tags: ["YOLOv8", "Python", "Docker", "REST API"],
    url: "https://github.com/MushfiqurRashid/fire-smoke-detection-yolov8",
    visual: "vision",
  },
  {
    title: "Bangla Fake News Detection",
    category: "NLP · Transformers",
    description:
      "Fine-tuned BanglaBERT on the BanFakeNews dataset to classify Bangla news as real or fake, outperforming traditional baselines.",
    tags: ["BanglaBERT", "Transformers", "Hugging Face", "NLP"],
    url: "https://github.com/MushfiqurRashid/Fake-News-Detection-in-Bangla-Using-the-BanglaBERT-Model-",
    visual: "nlp",
  },
  {
    title: "AI Ticket Manager",
    category: "Full-Stack · AI",
    description:
      "Support-ticket platform with automatic AI classification, role-based access, admin controls and persistent storage.",
    tags: ["Next.js", "TypeScript", "AI Classification", "RBAC"],
    url: "https://github.com/MushfiqurRashid/ai-ticket-manager",
    visual: "tickets",
  },
  {
    title: "Astral Explorer",
    category: "NASA Space Apps",
    year: "2023",
    description:
      "Interactive 3D star chart and solar-system explorer — students pick an exoplanet, explore its sky and draw their own constellations.",
    tags: ["JavaScript", "3D", "Data Visualization"],
    url: "https://github.com/MushfiqurRashid/astral-explorer",
    visual: "orbit",
  },
];

export const recognition = {
  nasa: {
    title: "NASA International Space Apps Challenge",
    award: "Global 2nd Runner-Up",
    date: "October 2023",
    meta: "Team Leader · Team of 5 · 48 hours",
    body: "Directed end-to-end project development, data analysis, visualization and documentation under a 48-hour deadline — shipping Astral Explorer.",
  },
  research: {
    title: "Team Leader — LLM Research Project",
    date: "Jan 2024 — Dec 2025",
    meta: "North South University",
    body: "Led a 5-member team evaluating large language models for cultural representation; designed 200+ structured prompt templates and coordinated research tasks and milestones.",
  },
  publication: {
    title:
      "Evaluating Inclusivity & Diversity of Large Text-to-Image Models: A Case Study on Bangladeshi Cultural Representation",
    status: "Work in progress · NSU 2025",
  },
  education: {
    degree: "B.Sc. in Computer Science & Engineering",
    school: "North South University, Dhaka",
    year: "2025",
  },
  extras: [
    { title: "UAP Hackathon", detail: "Qualifier", year: "2023" },
    { title: "Machine Learning A–Z: AI, Python & R", detail: "Udemy certification", year: "" },
  ],
};

export const toolkit = [
  {
    title: "Product & Program",
    items: [
      "Product Management",
      "Program Management",
      "Project Management",
      "Requirements Gathering",
      "Stakeholder Management",
      "Corporate AI Training",
      "Cross-functional Coordination",
    ],
  },
  {
    title: "Full-Stack Development",
    items: ["React", "Next.js", "Node.js", "TypeScript", "JavaScript", "REST APIs"],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "Python",
      "Machine Learning",
      "NLP",
      "Transformers",
      "RAG",
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "Explainable AI",
    ],
  },
  {
    title: "Data & Databases",
    items: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Pandas", "NumPy", "Data Modeling", "ETL"],
  },
  {
    title: "Cloud & Deployment",
    items: [
      "VPS Management",
      "Hostinger",
      "Vercel",
      "Domain & DNS",
      "Production Deployment",
      "Git",
      "GitHub",
    ],
  },
  {
    title: "Analytics & MarTech",
    items: ["Google Tag Manager", "Meta Pixel", "Conversion Tracking", "Web Analytics"],
  },
];
