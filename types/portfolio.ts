export type ProjectCategory =
  | "Web Development"
  | "Mobile Development"
  | "Game Development"
  | "Creative Development";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  overview?: string;
  objectives?: string[];
  thumbnail: string;
  gallery: string[];
  technologies: string[];
  challenge?: string;
  solution?: string;
  results?: string;
  github?: string;
  liveDemo?: string;
  featured: boolean;
}

export interface SkillGroup {
  id: string;
  index: string;
  category: string;
  summary: string;
  items: {
    name: string;
    focus: string;
  }[];
}

export interface JourneyEntry {
  id: string;
  period: string;
  type: "Education" | "Development" | "Internship" | "Milestone" | "Personal Project";
  title: string;
  organization: string;
  summary: string;
  highlights: string[];
}

export interface PhilosophyPillar {
  index: string;
  title: string;
  statement: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  href?: string;
  placeholder: string;
}

export interface ProfileData {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  heroHeadline: string;
  heroSubheadline: string;
  location: string;
  availability: string;
  portrait: {
    src: string;
    alt: string;
    caption: string;
  };
  about: {
    eyebrow: string;
    lead: string;
    paragraphs: string[];
    education: {
      label: string;
      value: string;
      note: string;
    };
    focusAreas: string[];
    traits: {
      label: string;
      description: string;
    }[];
  };
  philosophy: {
    headline: string;
    subheadline: string;
    pillars: PhilosophyPillar[];
  };
  contact: {
    heading: string;
    invitation: string;
    emailPlaceholder: string;
    socials: SocialLink[];
  };
}
