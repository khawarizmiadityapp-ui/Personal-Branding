import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    index: "01",
    category: "Frontend Development",
    summary:
      "Semantic interfaces, responsive layout architecture, and expressive web interactions.",
    items: [
      { name: "HTML", focus: "Semantic structure & accessible document hierarchy" },
      { name: "CSS", focus: "Responsive grids, layout systems & visual precision" },
      { name: "JavaScript", focus: "Interactive UI logic, DOM & Canvas 2D rendering" },
      { name: "Tailwind CSS", focus: "Scalable utility-first design systems" },
    ],
  },
  {
    id: "backend",
    index: "02",
    category: "Backend Development",
    summary:
      "Structured server-side workflows, MVC architecture, and maintainable web applications.",
    items: [
      { name: "PHP", focus: "Server-side application logic & web backends" },
      { name: "Laravel", focus: "Structured MVC architecture, routing & web systems" },
    ],
  },
  {
    id: "mobile",
    index: "03",
    category: "Mobile Development",
    summary:
      "Native and cross-platform mobile applications with clean, responsive interfaces.",
    items: [
      { name: "Kotlin", focus: "Modern Android application development" },
      { name: "Jetpack Compose", focus: "Declarative Android UI components" },
      { name: "Flutter", focus: "Cross-platform mobile application interfaces" },
    ],
  },
  {
    id: "programming",
    index: "04",
    category: "Programming",
    summary:
      "Algorithmic problem solving, structured logic, and foundational software engineering.",
    items: [
      { name: "C++", focus: "Core programming fundamentals & performance-oriented logic" },
      { name: "JavaScript", focus: "General-purpose scripting & interactive web engineering" },
    ],
  },
];
