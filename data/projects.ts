import type { Project, ProjectCategory } from "@/types/portfolio";

export const PROJECT_CATEGORIES: readonly ("All" | ProjectCategory)[] = [
  "All",
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Creative Development",
] as const;

/**
 * Starter project records.
 * Update descriptions, dates, technologies, screenshots, and verified repository/demo URLs
 * in this file. No statistics, client names, or external URLs are fabricated here.
 */
export const projects: Project[] = [
  {
    slug: "bening-laundry",
    title: "Bening Laundry",
    category: "Web Development",
    year: "Editable Year",
    description:
      "Starter project record for Bening Laundry. Replace this summary with your verified project overview, role, and deliverables.",
    overview:
      "This is an editable starter case study for Bening Laundry. Update data/projects.ts with the verified problem context, target users, and system scope.",
    objectives: [
      "Document the core user workflow and primary goals of Bening Laundry.",
      "Outline key application modules, screens, or administrative features.",
      "Replace placeholder imagery with real project screenshots.",
    ],
    thumbnail: "/images/projects/bening-laundry.svg",
    gallery: [
      "/images/projects/bening-laundry.svg",
      "/images/projects/bening-laundry-2.svg",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "Laravel"],
    challenge:
      "Editable placeholder — describe the key technical or UX challenge encountered while building Bening Laundry.",
    solution:
      "Editable placeholder — explain the architectural decisions, interface design, and implementation strategy used to solve it.",
    results:
      "Editable placeholder — add verified outcomes or lessons learned once available.",
    featured: true,
  },
  {
    slug: "veloura",
    title: "Veloura",
    category: "Creative Development",
    year: "Editable Year",
    description:
      "Starter project record for Veloura. Replace this summary with your verified project overview, visual direction, and technical implementation.",
    overview:
      "This is an editable starter case study for Veloura. Update data/projects.ts with the verified concept, layout direction, and technical details.",
    objectives: [
      "Define the brand or product experience behind Veloura.",
      "Detail interactive frontend features and responsive layout decisions.",
      "Attach verified screenshots and live links when ready.",
    ],
    thumbnail: "/images/projects/veloura.svg",
    gallery: [
      "/images/projects/veloura.svg",
      "/images/projects/veloura-2.svg",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    challenge:
      "Editable placeholder — document the primary design or frontend engineering challenge for Veloura.",
    solution:
      "Editable placeholder — outline how typography, motion, and component architecture were structured.",
    results:
      "Editable placeholder — summarize verified project takeaways or deployment notes.",
    featured: true,
  },
  {
    slug: "whoosh",
    title: "Whoosh",
    category: "Mobile Development",
    year: "Editable Year",
    description:
      "Starter project record for Whoosh. Replace this summary with your verified mobile application overview and core features.",
    overview:
      "This is an editable starter case study for Whoosh. Update data/projects.ts with the verified platform details, user journeys, and technical stack.",
    objectives: [
      "Describe the mobile experience and user problem addressed by Whoosh.",
      "Highlight navigation structure, state handling, and UI responsiveness.",
      "Replace placeholder visuals with device screenshots.",
    ],
    thumbnail: "/images/projects/whoosh.svg",
    gallery: [
      "/images/projects/whoosh.svg",
      "/images/projects/whoosh-2.svg",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Flutter"],
    challenge:
      "Editable placeholder — note key mobile UI, performance, or architecture challenges faced during development.",
    solution:
      "Editable placeholder — describe the component architecture, data flow, and mobile interaction patterns implemented.",
    results:
      "Editable placeholder — record verified testing outcomes or personal engineering milestones.",
    featured: true,
  },
  {
    slug: "cleanshield",
    title: "CleanShield",
    category: "Mobile Development",
    year: "Editable Year",
    description:
      "Starter project record for CleanShield. Replace this summary with your verified project purpose, architecture, and functionality.",
    overview:
      "This is an editable starter case study for CleanShield. Update data/projects.ts with accurate project context and implementation notes.",
    objectives: [
      "Clarify the core utility and user goals of CleanShield.",
      "Document key modules, interface screens, and technical integrations.",
      "Add verified repository or demo links when published.",
    ],
    thumbnail: "/images/projects/cleanshield.svg",
    gallery: [
      "/images/projects/cleanshield.svg",
      "/images/projects/cleanshield-2.svg",
    ],
    technologies: ["Kotlin", "Jetpack Compose"],
    challenge:
      "Editable placeholder — capture the main engineering or interface challenge solved in CleanShield.",
    solution:
      "Editable placeholder — explain the technical approach, modular structure, and UI decisions.",
    results:
      "Editable placeholder — add verified reflections or project outcomes.",
    featured: true,
  },
  {
    slug: "formula-1-racing",
    title: "Formula 1 Racing",
    category: "Game Development",
    year: "Editable Year",
    description:
      "Starter project record for Formula 1 Racing. Replace this summary with your verified gameplay mechanics, engine details, and visuals.",
    overview:
      "This is an editable starter case study for Formula 1 Racing. Update data/projects.ts with verified details about gameplay, controls, and rendering.",
    objectives: [
      "Describe the gameplay loop, controls, and visual direction of Formula 1 Racing.",
      "Document physics, input handling, or rendering logic.",
      "Replace placeholder frames with actual gameplay captures.",
    ],
    thumbnail: "/images/projects/formula-1-racing.svg",
    gallery: [
      "/images/projects/formula-1-racing.svg",
      "/images/projects/formula-1-racing-2.svg",
    ],
    technologies: ["C++", "JavaScript"],
    challenge:
      "Editable placeholder — describe the game loop, rendering, or control responsiveness challenge.",
    solution:
      "Editable placeholder — explain the core mechanics, state management, and optimization techniques.",
    results:
      "Editable placeholder — note verified gameplay milestones or technical learnings.",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects.filter((project) => project.slug !== currentSlug).slice(0, limit);
}

/**
 * Derive spiral gallery items directly from centralized project data (max 20 photos).
 * Each project contributes its gallery frames so there is no duplication of project data.
 */
export interface SpiralProjectPhoto {
  id: string;
  src: string;
  title: string;
  category: ProjectCategory;
  year: string;
  slug: string;
  frameLabel: string;
}

export const MAX_SPIRAL_PHOTOS = 20;

export function getSpiralGalleryPhotos(maxItems: number = MAX_SPIRAL_PHOTOS): SpiralProjectPhoto[] {
  const clampedMax = Math.max(1, Math.min(maxItems, MAX_SPIRAL_PHOTOS));
  const frames: SpiralProjectPhoto[] = [];

  for (const project of projects) {
    const sources = project.gallery.length > 0 ? project.gallery : [project.thumbnail];
    sources.forEach((src, frameIndex) => {
      if (frames.length < clampedMax) {
        frames.push({
          id: `${project.slug}-frame-${frameIndex + 1}`,
          src,
          title: project.title,
          category: project.category,
          year: project.year,
          slug: project.slug,
          frameLabel: `FRAME ${String(frameIndex + 1).padStart(2, "0")}`,
        });
      }
    });
  }

  return frames;
}
