import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { profile } from "@/data/profile";

interface AboutSectionProps {
  showFullLink?: boolean;
}

export function AboutSection({ showFullLink = true }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="border-b border-border-subtle bg-bg-primary py-24 md:py-32"
    >
      <div className="editorial-container space-y-14">
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="About Me"
            title="THE DEVELOPER BEHIND THE CODE"
            description="Personal introduction, technical mindset, and approach to building thoughtful web and mobile software."
            action={
              showFullLink ? (
                <LinkButton href="/about" variant="secondary" size="sm">
                  <span>Full Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </LinkButton>
              ) : undefined
            }
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Asymmetric editorial lead + bio */}
          <Reveal className="lg:col-span-7 space-y-8">
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-text-primary md:text-3xl">
              {profile.about.lead}
            </p>

            <div className="space-y-5 text-base leading-relaxed text-text-secondary">
              {profile.about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Education & Focus Areas */}
            <div className="grid grid-cols-1 gap-6 border-t border-border-subtle pt-8 sm:grid-cols-2">
              <div className="space-y-2 border border-border-subtle bg-bg-secondary p-5">
                <p className="mono-label text-accent">{profile.about.education.label}</p>
                <p className="font-display text-lg font-semibold text-text-primary">
                  {profile.about.education.value}
                </p>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {profile.about.education.note}
                </p>
              </div>

              <div className="space-y-3 border border-border-subtle bg-bg-secondary p-5">
                <p className="mono-label text-text-secondary">Development Interests</p>
                <div className="flex flex-wrap gap-2">
                  {profile.about.focusAreas.map((area) => (
                    <Tag key={area}>{area}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right column: editorial image + characteristics */}
          <Reveal className="lg:col-span-5 space-y-6" delay={0.08}>
            <div className="relative overflow-hidden border border-border-subtle bg-bg-secondary">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="border-t border-border-subtle px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary">
                {profile.portrait.caption}
              </div>
            </div>

            <div className="divide-y divide-border-subtle border border-border-subtle bg-bg-secondary">
              {profile.about.traits.map((trait, idx) => (
                <div key={trait.label} className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-base font-semibold uppercase tracking-wide text-text-primary">
                      {trait.label}
                    </h3>
                    <span className="font-mono text-xs text-accent">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
