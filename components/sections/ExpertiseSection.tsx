import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/data/skills";

export function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="border-b border-border-subtle bg-bg-secondary/40 py-24 md:py-32"
    >
      <div className="editorial-container space-y-14">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="Technical Capabilities"
            title="EXPERTISE & STACK"
            description="Core technologies used across frontend engineering, backend web systems, mobile applications, and foundational programming."
          />
        </Reveal>

        <Reveal
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          staggerChildren
        >
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col justify-between border border-border-subtle bg-bg-primary p-6 transition-colors duration-200 hover:border-text-secondary/50 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-text-primary">
                    {group.category}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                    {group.index}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {group.summary}
                </p>

                <ul className="mt-6 divide-y divide-border-subtle border-t border-border-subtle">
                  {group.items.map((skill) => (
                    <li
                      key={`${group.id}-${skill.name}`}
                      className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <span className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-text-primary">
                        {skill.name}
                      </span>
                      <span className="text-xs text-text-secondary sm:text-right">
                        {skill.focus}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
