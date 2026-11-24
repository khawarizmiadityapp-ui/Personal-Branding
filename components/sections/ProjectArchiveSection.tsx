"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { PROJECT_CATEGORIES, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/portfolio";

interface ProjectArchiveSectionProps {
  sectionIndex?: string;
}

export function ProjectArchiveSection({
  sectionIndex = "04",
}: ProjectArchiveSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="works"
      className="border-b border-border-subtle bg-bg-primary py-24 md:py-32"
    >
      <div className="editorial-container space-y-12">
        <Reveal>
          <SectionHeader
            index={sectionIndex}
            eyebrow="Project Archive"
            title="BUILT & EXPLORED"
            description="Starter archive of projects across web, mobile, game, and creative development. Click any entry to inspect its structured case study."
          />
        </Reveal>

        {/* Category Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2 border-b border-border-subtle pb-6"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer",
                  active
                    ? "border-accent bg-accent text-accent-ink font-semibold"
                    : "border-border-subtle bg-bg-secondary text-text-secondary hover:border-text-primary hover:text-text-primary"
                )}
              >
                {category}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
            {String(filteredProjects.length).padStart(2, "0")} Entries
          </span>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.slug}
              className="group flex flex-col border border-border-subtle bg-bg-secondary transition-colors duration-300 hover:border-accent/80"
            >
              <Link
                href={`/work/${project.slug}`}
                className="relative block aspect-[16/10] w-full overflow-hidden border-b border-border-subtle bg-surface"
              >
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <Tag accent={project.featured}>
                    {String(idx + 1).padStart(2, "0")} · {project.category}
                  </Tag>
                </div>
              </Link>

              <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      href={`/work/${project.slug}`}
                      className="font-display text-2xl font-bold uppercase tracking-tight text-text-primary transition-colors group-hover:text-accent"
                    >
                      {project.title}
                    </Link>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-4">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-text-primary transition-colors hover:text-accent"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>

                    <div className="flex items-center gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-accent"
                        >
                          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-accent"
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
