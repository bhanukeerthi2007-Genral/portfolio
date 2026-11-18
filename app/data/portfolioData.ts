export interface Project {
  id: string;
  name: string;
  description: string;
  realTimeTag?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  stickyColor: "yellow" | "green" | "pink" | "blue" | "purple" | "orange";
  rotation: number;
}

export interface EducationItem {
  period: string;
  school: string;
  degree: string;
  location: string;
  details: string;
  stickyColor: "yellow" | "green" | "pink" | "blue";
  rotation: number;
}

export const portfolioData = {
  about: {
    name: "Bhanukeerthi vinod",
    footerName: "Bhanukeerthi",
    oneLineIntro: "1st-year CS student at Bangalore Institute of Technology passionate about AI, embedded hardware, robotics & full-stack development.",
    shortBio: "I am a first-year Computer Science Engineering student at Bangalore Institute of Technology (BIT), Bengaluru. I previously graduated from Sri Kumaran Children's Home Composite PU College in PCMCs. My passions sit at the intersection of embedded IoT hardware (Arduino, ESP32, Raspberry Pi), robotics, mathematics, and building intelligent AI-driven full-stack web systems.",
    photoUrl: "/profile.jpg",
    location: "Bengaluru, Karnataka, India",
    email: "bhanukeerthi.2007@gmail.com",
    github: "https://github.com/bhanukeerthi2007-Genral",
    linkedin: "https://www.linkedin.com/in/bhanukeerthi-vinod-8384652b3/",
    twitter: "https://x.com",
  },

  skills: [
    "Arduino",
    "ESP32",
    "Raspberry Pi",
    "C++ (DSA)",
    "Python (AI & ML)",
    "Linux",
    "Git & GitHub",
    "JavaScript",
    "React",
    "Next.js",
    "HTML5 & CSS3",
    "Tailwind CSS",
    "Applied Mathematics",
    "Robotics & Sensors",
    "IoT Telemetry",
  ],

  skillLevels: [
    { name: "Embedded Systems (Arduino, ESP32, RPi)", level: 88, label: "Advanced" },
    { name: "Full-Stack Web (React, Next.js, JS, Tailwind)", level: 86, label: "Proficient" },
    { name: "C++ & Data Structures (DSA)", level: 82, label: "Active Learning" },
    { name: "Linux Administration & Git/GitHub", level: 80, label: "Proficient" },
    { name: "Python, AI & Applied Mathematics", level: 78, label: "Active Learning" },
    { name: "Robotics & Hardware Prototyping", level: 75, label: "Hands-on" },
  ],

  currentlyLearning: [
    {
      topic: "Data Structures & Algorithms in C++",
      note: "Rigorous problem solving, graph algorithms, dynamic programming, and complexity optimization for technical mastery.",
      badge: "Core Focus",
    },
    {
      topic: "Python for Artificial Intelligence & Machine Learning",
      note: "Neural network architectures, model training, computer vision pipelines, and intelligent agent development.",
      badge: "In Progress",
    },
    {
      topic: "Linux Power Workflows & Git Automation",
      note: "Terminal mastery, bash scripting, kernel understanding, and enterprise-grade collaborative Git architectures.",
      badge: "Daily Practice",
    },
    {
      topic: "Applied Mathematics for AI & Robotics",
      note: "Linear algebra, multivariable calculus, and probability matrices powering intelligent robotic systems.",
      badge: "Foundation",
    },
  ],

  futureAspirations: [
    {
      title: "AI Full-Stack Systems Architect",
      desc: "To bridge cutting-edge deep learning models down to seamless, lightning-fast full-stack web applications with high visual polish.",
      icon: "🧠",
    },
    {
      title: "Robotics & Edge Intelligent Systems",
      desc: "Architecting autonomous robotic platforms combining microcontrollers (ESP32, RPi), sensor telemetry, and physical-world AI interaction.",
      icon: "🤖",
    },
    {
      title: "Open Source Hardware & IoT Tooling",
      desc: "Publishing accessible embedded firmware, developer macro productivity devices, and clean solar IoT telemetry systems.",
      icon: "⚡",
    },
  ],

  educationTimeline: [
    {
      period: "2024 - Present",
      school: "Bangalore Institute of Technology (BIT)",
      degree: "B.E. in Computer Science & Engineering (1st Year)",
      location: "Bengaluru, Karnataka",
      details: "Pursuing 1st year CSE. Actively focusing on Data Structures & Algorithms in C++, Full-Stack Web Development, embedded systems with ESP32/Raspberry Pi, and AI fundamentals.",
      stickyColor: "yellow",
      rotation: -1,
    },
    {
      period: "2022 - 2024",
      school: "Sri Kumaran Children's Home Composite PU College",
      degree: "Pre-University Course (PUC) &mdash; PCMCs",
      location: "Bengaluru, Karnataka",
      details: "Completed Pre-University education in Physics, Chemistry, Mathematics, and Computer Science (PCMCs) with distinction. Built early programming foundations in C++ and web technologies.",
      stickyColor: "blue",
      rotation: 1.2,
    },
  ] as EducationItem[],

  projects: [
    {
      id: "edge-cctv",
      name: "EdgeGuardian: Air-Gapped Remote CCTV System",
      description: "An offline edge-computing surveillance camera designed to stream and record video without requiring active external internet or cloud subscriptions. Built with an ESP32-CAM / Raspberry Pi unit featuring local Wi-Fi AP streaming, onboard circular SD storage, and motion detection triggers.",
      realTimeTag: "🛡️ Local RTSP & Motion Detection",
      technologies: ["Raspberry Pi", "ESP32-CAM", "Python", "C++", "OpenCV / RTSP", "Linux"],
      githubUrl: "https://github.com/bhanukeerthi2007-Genral",
      liveUrl: "https://github.com/bhanukeerthi2007-Genral",
      stickyColor: "yellow",
      rotation: -1.2,
    },
    {
      id: "macrodeck-hid",
      name: "MacroDeck HID: Custom ESP32 Mechanical Macro Keypad",
      description: "A custom programmable mechanical productivity keypad powered by an ESP32 running custom C++ firmware. Acts as a native USB and Bluetooth Human Interface Device (HID) for instantaneous developer shortcut macros, media controls, and multi-layer key bindings.",
      realTimeTag: "⚡ Sub-5ms HID Keystroke Response",
      technologies: ["ESP32", "C++", "Arduino", "USB / Bluetooth HID", "Hardware Design"],
      githubUrl: "https://github.com/bhanukeerthi2007-Genral",
      liveUrl: "https://github.com/bhanukeerthi2007-Genral",
      stickyColor: "blue",
      rotation: 1.5,
    },
    {
      id: "class-sync",
      name: "ClassSync: Dynamic Live Timetable & Classroom Portal",
      description: "Created during lockdown: A smart automated timetable web application that directly linked students and teachers to their live virtual classes (Google Meet/Zoom) with zero link confusion, real-time schedule countdowns, and automated period status.",
      realTimeTag: "⏱️ Real-Time Schedule Linking",
      technologies: ["JavaScript", "HTML5", "CSS3", "Web APIs", "LocalStorage"],
      githubUrl: "https://github.com/bhanukeerthi2007-Genral",
      liveUrl: "https://github.com/bhanukeerthi2007-Genral",
      stickyColor: "green",
      rotation: -1.6,
    },
    {
      id: "heliosense-solar",
      name: "HelioSense: Smart Solar Photovoltaic Telemetry & Optimizer",
      description: "An intelligent solar energy telemetry and monitoring station tracking real-time photovoltaic output, panel voltage, current generation, and battery charge states using embedded sensor microcontrollers to evaluate clean energy efficiency.",
      realTimeTag: "☀️ Live PV Solar Yield Monitoring",
      technologies: ["Arduino", "ESP32", "IoT Telemetry", "C++", "Sensors (INA219)"],
      githubUrl: "https://github.com/bhanukeerthi2007-Genral",
      liveUrl: "https://github.com/bhanukeerthi2007-Genral",
      stickyColor: "purple",
      rotation: 1.1,
    },
  ] as Project[],
};
