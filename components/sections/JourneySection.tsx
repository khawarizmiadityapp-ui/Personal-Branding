import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { journeyEntries } from "@/data/experience";

export function JourneySection() {
  return (
    <section
      id="journey"
      className="border-b border-border-subtle bg-bg-primary py-24 md:py-32"
    >
      <div className="editorial-container space-y-14">
        <Reveal>
          <SectionHeader
            index="06"
            eyebrow="My Journey"
            title="TIMELINE & MILESTONES"
            description="An editable timeline covering education, development practice, internship experience, and personal projects."
          />
        </Reveal>

        <div className="relative border-l border-border-subtle pl-6 md:pl-10">
          <div className="space-y-10">
            {journeyEntries.map((entry, idx) => (
              <Reveal key={entry.id} delay={idx * 0.04}>
                <article className="relative border border-border-subtle bg-bg-secondary p-6 md:p-8">
                  {/* Timeline node marker */}
                  <span
                    className="absolute -left-[31px] top-8 h-3 w-3 border border-accent bg-bg-primary md:-left-[47px]"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-4 space-y-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs text-accent">
                          0{idx + 1}
                        </span>
                        <Tag>{entry.type}</Tag>
                      </div>
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-secondary">
                        {entry.period}
                      </p>
                      <p className="text-xs leading-relaxed text-text-secondary">
                        {entry.organization}
                      </p>
                    </div>

                    <div className="lg:col-span-8 space-y-4">
                      <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-text-primary">
                        {entry.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                        {entry.summary}
                      </p>
                      <ul className="space-y-2 border-t border-border-subtle pt-4">
                        {entry.highlights.map((item, highlightIdx) => (
                          <li
                            key={highlightIdx}
                            className="flex items-start gap-3 text-sm text-text-secondary"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 bg-accent"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
