import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: `Background, technical capabilities, journey, and engineering philosophy of ${profile.name}.`,
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="border-b border-border-subtle bg-bg-primary py-16 md:py-24">
        <div className="editorial-container space-y-6">
          <div className="flex items-center gap-3">
            <span className="mono-label text-accent">PROFILE</span>
            <span className="h-px w-8 bg-border-subtle" aria-hidden="true" />
            <span className="mono-label text-text-secondary">{profile.role}</span>
          </div>
          <h1 className="display-hero text-text-primary">{profile.name}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {profile.heroSubheadline}
          </p>
        </div>
      </section>

      <AboutSection showFullLink={false} />
      <ExpertiseSection />
      <JourneySection />
      <PhilosophySection />
      <ContactSection />
    </div>
  );
}
