export interface Project {
  id: string;
  title: string;
  description: string;
  realTimeHighlight?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  stickyColor: "yellow" | "green" | "pink" | "blue" | "purple" | "orange";
  rotation: number;
  pinStyle: "pin" | "tape" | "clip";
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  color: "yellow" | "green" | "pink" | "blue" | "purple" | "orange";
  rotation: number;
  skills: {
    name: string;
    level: number; // 0 to 100
    levelLabel: "Mastery" | "Proficient" | "Comfortable" | "Exploring";
  }[];
}

export interface EducationMilestone {
  period: string;
  institution: string;
  degree: string;
  location: string;
  highlights: string[];
  color: "yellow" | "green" | "pink" | "blue" | "purple" | "orange";
  rotation: number;
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
  icon: string;
  noteColor: "yellow" | "green" | "pink" | "blue" | "purple" | "orange";
  rotation: number;
}

export const portfolioData = {
  personal: {
    name: "Bhanukerthi",
    role: "Full-Stack Developer & CS Enthusiast",
    oneLinerIntro: "Crafting reactive real-time web applications and exploring intelligent distributed systems in harmony with nature.",
    shortBio: "Hi there! I am a passionate Computer Science student and software crafter. I love bringing together playful tactile designs, real-time architectures, and clean code. When I'm not coding, you'll find me exploring quiet green nature trails, tinkering with embedded hardware, and brainstorming curious ideas.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", // placeholder pleasant photo
    status: "🌱 Open for high-impact internships & open-source collabs",
    location: "Karnataka, India",
  },

  heroButtons: {
    primary: {
      text: "📌 View My Projects",
      href: "#projects",
    },
    secondary: {
      text: "📬 Leave a Note / Contact",
      href: "#contact",
    },
    resume: {
      text: "📄 Download CV",
      href: "#",
    },
  },

  projects: [
    {
      id: "sync-board",
      title: "SyncFlow: Real-Time Collaborative Canvas",
      description: "An infinite digital sticky-note workspace with multi-user cursor tracking, live audio rooms, and end-to-end WebSocket synchronization.",
      realTimeHighlight: "⚡ Sub-50ms WebSocket Broadcasts",
      technologies: ["Next.js", "WebSockets", "Node.js", "Redis", "TailwindCSS"],
      liveUrl: "https://example.com/syncflow",
      githubUrl: "https://github.com/example/syncflow",
      stickyColor: "yellow",
      rotation: -1.5,
      pinStyle: "pin",
      featured: true,
    },
    {
      id: "nature-iot",
      title: "EcoPulse: Campus IoT & Telemetry Dashboard",
      description: "Live environmental telemetry hub monitoring microclimate sensor readings (CO2, humidity, ambient sunlight) across university gardens.",
      realTimeHighlight: "🍃 Real-Time MQTT Sensor Stream",
      technologies: ["ESP32", "C++", "Next.js", "MQTT", "Chart.js"],
      liveUrl: "https://example.com/ecopulse",
      githubUrl: "https://github.com/example/ecopulse",
      stickyColor: "green",
      rotation: 1.2,
      pinStyle: "tape",
      featured: true,
    },
    {
      id: "algo-lens",
      title: "AlgoLens: Interactive Algorithm Playground",
      description: "Step-by-step visual debugger for graph traversals, pathfinding algorithms (A*, Dijkstra), and dynamic memory allocation with audio feedback.",
      realTimeHighlight: "🎯 Real-Time Step-by-Step State Machine",
      technologies: ["TypeScript", "React", "Canvas API", "TailwindCSS"],
      liveUrl: "https://example.com/algolens",
      githubUrl: "https://github.com/example/algolens",
      stickyColor: "blue",
      rotation: -2,
      pinStyle: "clip",
      featured: true,
    },
    {
      id: "study-grove",
      title: "StudyGrove: AI Smart Note Synthesizer",
      description: "Transforms dense lecture recordings and slides into structured digital memory-cards and contextual study roadmaps using streaming LLMs.",
      realTimeHighlight: "🧠 Real-Time Token Streaming Inference",
      technologies: ["Next.js", "FastAPI", "Python", "Vector DB", "OpenAI"],
      liveUrl: "https://example.com/studygrove",
      githubUrl: "https://github.com/example/studygrove",
      stickyColor: "purple",
      rotation: 1.8,
      pinStyle: "pin",
      featured: false,
    },
  ] as Project[],

  skillCategories: [
    {
      category: "Frontend & UI Crafts",
      color: "yellow",
      rotation: -1,
      skills: [
        { name: "Next.js & React", level: 90, levelLabel: "Proficient" },
        { name: "TypeScript / JavaScript", level: 88, levelLabel: "Proficient" },
        { name: "Tailwind CSS & Animation", level: 92, levelLabel: "Mastery" },
        { name: "HTML5 & Responsive Canvas", level: 85, levelLabel: "Proficient" },
      ],
    },
    {
      category: "Backend & Systems",
      color: "green",
      rotation: 1.5,
      skills: [
        { name: "Node.js & Express", level: 82, levelLabel: "Comfortable" },
        { name: "Python / FastAPI", level: 80, levelLabel: "Comfortable" },
        { name: "C++ & Systems Basics", level: 78, levelLabel: "Comfortable" },
        { name: "REST APIs & WebSockets", level: 86, levelLabel: "Proficient" },
      ],
    },
    {
      category: "Databases & DevOps",
      color: "blue",
      rotation: -1.8,
      skills: [
        { name: "PostgreSQL & Prisma", level: 75, levelLabel: "Comfortable" },
        { name: "MongoDB & Redis", level: 72, levelLabel: "Comfortable" },
        { name: "Git, GitHub & CI/CD", level: 85, levelLabel: "Proficient" },
        { name: "Docker & Linux CLI", level: 70, levelLabel: "Comfortable" },
      ],
    },
  ] as SkillCategory[],

  learningAndAspirations: {
    currentlyLearning: [
      {
        topic: "Rust & High-Performance Distributed Systems",
        notes: "Deepening memory safety, async runtimes (Tokio), and low-latency network engines.",
        badge: "Active",
        color: "orange",
        rotation: 1.2,
      },
      {
        topic: "Autonomous AI Agents & Local LLMs",
        notes: "Exploring quantized model serving (Ollama/vLLM) and deterministic tool orchestration.",
        badge: "In Progress",
        color: "pink",
        rotation: -1.5,
      },
      {
        topic: "Modern Shaders & WebGL Nature Simulations",
        notes: "Crafting fluid leaf drift, water ripple physics, and botanical procedural art.",
        badge: "Experimenting",
        color: "green",
        rotation: 0.8,
      },
    ],
    futureAspirations: [
      {
        title: "Architecting Resilient Real-Time Systems",
        description: "To lead the design of real-time collaborative infrastructure that powers millions of creative minds smoothly across low-bandwidth networks.",
        icon: "⚡",
        color: "yellow",
        rotation: -1,
      },
      {
        title: "Tech for Environmental & Climate Harmony",
        description: "Applying IoT telemetry, edge ML, and intuitive human interfaces to aid biodiversity conservation and renewable campus microgrids.",
        icon: "🌿",
        color: "green",
        rotation: 1.6,
      },
      {
        title: "Open Source Ecosystem Contribution",
        description: "Becoming a core maintainer in the developer tools space, authoring open-source packages that inspire tactile and accessible web experiences.",
        icon: "🚀",
        color: "purple",
        rotation: -1.4,
      },
    ],
  },

  educationTimeline: [
    {
      period: "2023 - Present",
      institution: "University Institute of Technology",
      degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      location: "India",
      highlights: [
        "Core Coursework: Data Structures & Algorithms, Operating Systems, Database Management, Computer Networks, Object-Oriented Programming (C++/Java).",
        "Active member of University Coding Club & Technical Innovation Cell.",
        "Built embedded IoT prototypes & presented academic projects.",
      ],
      color: "yellow",
      rotation: -1.2,
    },
    {
      period: "2021 - 2023",
      institution: "Pre-University College / Higher Secondary School",
      degree: "Senior Secondary (PCMC - Physics, Chemistry, Math, Computer Science)",
      location: "India",
      highlights: [
        "Distinction in Mathematics and Computer Science.",
        "Discovered foundational passion for algorithms, C++, and web development.",
        "Winner in Inter-School Science & Computing Exhibition.",
      ],
      color: "blue",
      rotation: 1.4,
    },
    {
      period: "2021",
      institution: "High School Academy",
      degree: "Secondary School Examination (10th Standard)",
      location: "India",
      highlights: [
        "Graduated with High Academic Honors.",
        "Represented school in state-level science quizzes and debate forums.",
      ],
      color: "pink",
      rotation: -0.8,
    },
  ] as EducationMilestone[],

  socialLinks: [
    {
      platform: "GitHub",
      username: "@vinod-a",
      url: "https://github.com",
      icon: "github",
      noteColor: "yellow",
      rotation: -2,
    },
    {
      platform: "LinkedIn",
      username: "Vinod A",
      url: "https://linkedin.com",
      icon: "linkedin",
      noteColor: "blue",
      rotation: 1.5,
    },
    {
      platform: "Twitter / X",
      username: "@vinod_dev",
      url: "https://x.com",
      icon: "twitter",
      noteColor: "pink",
      rotation: -1.2,
    },
    {
      platform: "Email",
      username: "vinod.dev@example.com",
      url: "mailto:vinod.dev@example.com",
      icon: "mail",
      noteColor: "green",
      rotation: 2,
    },
    {
      platform: "Discord / Community",
      username: "vinod#1234",
      url: "https://discord.com",
      icon: "discord",
      noteColor: "purple",
      rotation: -1.6,
    },
  ] as SocialLink[],
};
