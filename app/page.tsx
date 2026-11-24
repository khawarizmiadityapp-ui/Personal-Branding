import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SelectedWorksSection } from "@/components/sections/SelectedWorksSection";
import { ProjectArchiveSection } from "@/components/sections/ProjectArchiveSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SelectedWorksSection />
      <ProjectArchiveSection />
      <ExpertiseSection />
      <JourneySection />
      <PhilosophySection />
      <ContactSection />
    </>
  );
}
