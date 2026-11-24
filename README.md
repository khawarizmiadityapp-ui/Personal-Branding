# Khawarizmi Aditya Pratama Putra — Personal Branding & Developer Portfolio

Dark cinematic personal branding website and developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, and a custom **HTML Canvas 2D 3D Spiral Gallery** engine.

## Features

- **Dark Cinematic Design System**: Consistent obsidian palette (`#090A0C`, `#15171B`, `#1C1F24`, `#282B30`, `#F2F2ED`, `#A1A4AA`) with selective lime accent (`#D7FF48`) and expressive typography (`Geist Sans`, `Space Grotesk`, `Geist Mono`).
- **Interactive Canvas 2D 3D Spiral Gallery (`components/gallery/`)**:
  - Custom 3D vertical helix geometry & perspective projection (no Three.js).
  - Front/back depth sorting, perspective scaling, horizontal foreshortening, and back-face opacity fade.
  - **REEL FLUX Edge Treatment**: Edge Flare, speed-sensitive Motion Smear, and Chromatic Fringe in the helix limb zones.
  - Mouse drag, touch drag, wheel, keyboard arrows, Prev/Next buttons, Pause/Resume, sensitivity control, reduced-motion support, and accessible static grid fallback.
  - Managed with `ResizeObserver`, `IntersectionObserver`, DPR capping, and zero per-frame React state updates.
- **Full Route Architecture**:
  - `/` — Continuous 8-section homepage storytelling experience.
  - `/about` — Developer profile, education, capabilities, journey, and philosophy.
  - `/work` — Interactive 3D Spiral Gallery and filterable Project Archive.
  - `/work/[slug]` — Dynamically generated project detail pages with per-project metadata.
  - `/contact` — Direct contact and social profile hub.
- **Centralized Editable Data**: All bio, project records, skills, and timeline entries live in `data/`.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
npm run start
```

## Replacing Placeholder Content & Assets

1. **Personal Bio, Education, Philosophy & Contact**: Edit `data/profile.ts`.
   - Replace `location`, `about.education`, `contact.emailPlaceholder`, and add verified `href` values to `contact.socials`.
2. **Projects & Spiral Gallery Frames**: Edit `data/projects.ts`.
   - Update descriptions, years, objectives, challenges, solutions, results, technologies, and optional `github` / `liveDemo` URLs for `Bening Laundry`, `Veloura`, `Whoosh`, `CleanShield`, and `Formula 1 Racing` (or add new projects).
   - The 3D Spiral Gallery automatically consumes frames from `projects` (up to 20 frames).
3. **Skills**: Edit `data/skills.ts`.
4. **Journey / Timeline**: Edit `data/experience.ts`.
5. **Images**:
   - Replace `public/images/profile/developer-portrait.svg` with your real portrait (e.g. `.jpg`, `.png`, or `.webp`) and update `profile.portrait.src` in `data/profile.ts`.
   - Replace placeholder SVGs in `public/images/projects/` with real project screenshots and update `thumbnail` and `gallery` paths in `data/projects.ts`.
"# Personal-Branding" 
