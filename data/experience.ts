import type { JourneyEntry } from "@/types/portfolio";

/**
 * Editable timeline entries.
 * Replace period labels, organizations, and highlights with your verified history.
 * No dates, job titles, awards, or credentials are fabricated here.
 */
export const journeyEntries: JourneyEntry[] = [
  {
    id: "education-foundation",
    period: "EDITABLE PERIOD",
    type: "Education",
    title: "Educational Background",
    organization: "Add Institution & Program in data/experience.ts",
    summary:
      "Building a strong foundation in software engineering principles, algorithms, and application development across web and mobile platforms.",
    highlights: [
      "Replace with verified academic program, focus areas, or coursework.",
      "Document foundational software development skills and collaborative studio projects.",
    ],
  },
  {
    id: "professional-development",
    period: "EDITABLE PERIOD",
    type: "Development",
    title: "Web & Mobile Development Practice",
    organization: "Independent Learning & Engineering",
    summary:
      "Expanding technical depth across frontend architecture, Laravel backend workflows, Kotlin with Jetpack Compose, and Flutter.",
    highlights: [
      "Practicing modular architecture, responsive layout design, and clean code habits.",
      "Exploring interactive graphics and animation systems for modern web experiences.",
    ],
  },
  {
    id: "internship-experience",
    period: "EDITABLE PERIOD",
    type: "Internship",
    title: "Internship Experience",
    organization: "Add Company / Studio Name in data/experience.ts",
    summary:
      "Editable placeholder for verified internship or industrial training experience. Update this entry with your actual role, responsibilities, and team context.",
    highlights: [
      "Document verified contributions, tools used, and engineering practices learned.",
      "Remove or hide this entry if not applicable yet.",
    ],
  },
  {
    id: "selected-milestones",
    period: "EDITABLE PERIOD",
    type: "Milestone",
    title: "Selected Technical Milestones",
    organization: "Software Craft & Portfolio Evolution",
    summary:
      "Consolidating personal projects, interactive frontend experiments, and cross-platform builds into a cohesive developer identity.",
    highlights: [
      "Designing and engineering interactive web experiences from first principles.",
      "Establishing reusable, maintainable project structures across repositories.",
    ],
  },
  {
    id: "personal-projects",
    period: "ONGOING",
    type: "Personal Project",
    title: "Personal Project Development",
    organization: "Bening Laundry · Veloura · Whoosh · CleanShield · Formula 1 Racing",
    summary:
      "Hands-on exploration across web applications, mobile apps, game development, and creative frontend work.",
    highlights: [
      "Iterating on real application concepts spanning multiple platforms and languages.",
      "Continuously refining UI clarity, code quality, and performance.",
    ],
  },
];
