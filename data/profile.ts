import type { ProfileData } from "@/types/portfolio";

export const profile: ProfileData = {
  name: "Khawarizmi Aditya Pratama Putra",
  shortName: "Khawarizmi Aditya",
  initials: "KAPP",
  role: "Software Developer | Web & Mobile Application Developer",
  heroHeadline: "CREATING DIGITAL EXPERIENCES.",
  heroSubheadline:
    "Software Developer focused on building meaningful digital products through code, creativity, and technology.",
  location: "Indonesia (Update in data/profile.ts)",
  availability: "Open to collaboration & software engineering opportunities",
  portrait: {
    src: "/images/profile/my foto gw2.jpeg",
    alt: "Portrait of Khawarizmi Aditya Pratama Putra",
    caption: "KHAWARIZMI ADITYA PRATAMA PUTRA // DEVELOPER PORTRAIT",
  },
  about: {
    eyebrow: "02 // ABOUT ME",
    lead: "Engineering interfaces and applications where precision meets expressive digital craft.",
    paragraphs: [
      "I am Khawarizmi Aditya Pratama Putra, a Software Developer working across web and mobile application development. My work centers on translating ideas into reliable, structured, and visually intentional digital products.",
      "I approach software development with curiosity and discipline—breaking complex problems into clear, maintainable systems while paying close attention to interaction quality, readability, and performance.",
      "This biography is centralized in data/profile.ts so personal background, academic details, and focus areas can be updated anytime without touching component code.",
    ],
    education: {
      label: "Educational Background",
      value: "Software & Computing Studies — Editable Entry",
      note: "Replace with your verified institution, program, and graduation timeline in data/profile.ts.",
    },
    focusAreas: [
      "Web Application Engineering",
      "Mobile Application Development",
      "Interactive Frontend Systems",
      "Clean Architecture & Problem Solving",
    ],
    traits: [
      {
        label: "Curiosity-Driven",
        description:
          "Continuously exploring modern web, mobile, and creative engineering patterns to sharpen technical judgment.",
      },
      {
        label: "Structured Problem Solving",
        description:
          "Decomposing requirements into clean, modular components with clear boundaries and predictable behavior.",
      },
      {
        label: "Detail-Oriented Execution",
        description:
          "Treating typography, responsiveness, accessibility, and code hygiene as integral parts of the product.",
      },
    ],
  },
  philosophy: {
    headline: "CRAFTED WITH PRECISION. BUILT TO ENDURE.",
    subheadline:
      "Guiding principles that shape how I write code, design interfaces, and approach every engineering challenge.",
    pillars: [
      {
        index: "01",
        title: "Continuous Learning",
        statement:
          "Technology evolves quickly; staying sharp means studying fundamentals deeply while adapting thoughtfully to new tools.",
      },
      {
        index: "02",
        title: "Problem Solving",
        statement:
          "Great software begins with understanding the real problem clearly before writing a single line of implementation.",
      },
      {
        index: "03",
        title: "Attention to Detail",
        statement:
          "Spacing, state transitions, edge cases, and error handling separate forgettable templates from memorable products.",
      },
      {
        index: "04",
        title: "Responsibility",
        statement:
          "Owning code quality, accessibility, and maintainability ensures what ships today stays dependable tomorrow.",
      },
      {
        index: "05",
        title: "Useful Digital Experiences",
        statement:
          "Visual craft exists to serve clarity and utility—never to obscure content or frustrate the person using it.",
      },
      {
        index: "06",
        title: "Creativity Through Technology",
        statement:
          "Code is both an engineering discipline and a creative medium capable of expressive, tactile interactions.",
      },
    ],
  },
  contact: {
    heading: "LET'S BUILD SOMETHING MEANINGFUL.",
    invitation:
      "Available for web and mobile development projects, creative technical collaborations, and software engineering conversations. Update your verified email and social URLs in data/profile.ts.",
    emailPlaceholder: "your.email@example.com (update in data/profile.ts)",
    socials: [
      {
        label: "GitHub",
        handle: "@khawarizmiadityapp-ui",
        href: "https://github.com/khawarizmiadityapp-ui",
        placeholder: "github.com/khawarizmiadityapp-ui",
      },
      {
        label: "LinkedIn",
        handle: "Add your LinkedIn profile URL",
        placeholder: "linkedin.com/in/your-profile",
      },
      {
        label: "Instagram",
        handle: "@rizmidicaprio_",
        href: "https://www.instagram.com/rizmidicaprio_/",
        placeholder: "instagram.com/rizmidicaprio_",
      },
    ],
  },
};
