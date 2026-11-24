import { Reveal } from "@/components/animations/Reveal";
import { profile } from "@/data/profile";

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="border-b border-border-subtle bg-bg-secondary/50 py-24 md:py-32"
    >
      <div className="editorial-container space-y-16">
        <Reveal className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="mono-label text-accent">07</span>
            <span className="h-px w-8 bg-border-subtle" aria-hidden="true" />
            <span className="mono-label text-text-secondary">Personal Philosophy</span>
          </div>

          <h2 className="display-hero max-w-5xl text-text-primary">
            {profile.philosophy.headline}
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {profile.philosophy.subheadline}
          </p>
        </Reveal>

        <Reveal
          className="grid grid-cols-1 gap-px border border-border-subtle bg-border-subtle md:grid-cols-2 lg:grid-cols-3"
          staggerChildren
        >
          {profile.philosophy.pillars.map((pillar) => (
            <div
              key={pillar.index}
              className="flex flex-col justify-between gap-6 bg-bg-primary p-7 md:p-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                {pillar.index}
              </span>
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-text-primary">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {pillar.statement}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
