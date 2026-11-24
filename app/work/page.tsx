import type { Metadata } from "next";
import { SelectedWorksSection } from "@/components/sections/SelectedWorksSection";
import { ProjectArchiveSection } from "@/components/sections/ProjectArchiveSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Selected Works",
  description:
    "Interactive 3D Spiral Gallery and project archive spanning web, mobile, game, and creative development.",
};

export default function WorkPage() {
  return (
    <div className="pt-20">
      <section className="border-b border-border-subtle bg-bg-primary py-16 md:py-24">
        <div className="editorial-container space-y-6">
          <div className="flex items-center gap-3">
            <span className="mono-label text-accent">PORTFOLIO</span>
            <span className="h-px w-8 bg-border-subtle" aria-hidden="true" />
            <span className="mono-label text-text-secondary">
              WEB · MOBILE · GAME · CREATIVE
            </span>
          </div>
          <h1 className="display-hero text-text-primary">SELECTED WORKS.</h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Explore featured project frames in the interactive Canvas 2D 3D spiral or
            filter the full archive by discipline below.
          </p>
        </div>
      </section>

      <SelectedWorksSection />
      <ProjectArchiveSection sectionIndex="02" />
      <ContactSection />
    </div>
  );
}
