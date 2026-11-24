import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { SpiralGallery } from "@/components/gallery/SpiralGallery";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSpiralGalleryPhotos } from "@/data/projects";

export function SelectedWorksSection() {
  const spiralItems = getSpiralGalleryPhotos();

  return (
    <section
      id="selected-works"
      className="border-b border-border-subtle bg-bg-secondary/40 py-24 md:py-32"
    >
      <div className="editorial-container space-y-12">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="Selected Works · Interactive Canvas 2D"
            title="3D SPIRAL REEL"
            description="Drag, scroll, or use arrow keys to rotate through featured project frames rendered on a custom Canvas 2D vertical helix with REEL FLUX edge flare, motion smear, and chromatic fringe."
            action={
              <LinkButton href="/work" variant="secondary" size="sm">
                <span>All Projects</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </LinkButton>
            }
          />
        </Reveal>

        <SpiralGallery items={spiralItems} />
      </div>
    </section>
  );
}
