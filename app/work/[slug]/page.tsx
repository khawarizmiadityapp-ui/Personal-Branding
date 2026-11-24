import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { getProjectBySlug, getRelatedProjects, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project.slug, 3);

  return (
    <article className="pt-20">
      {/* 1. Project Hero */}
      <section className="border-b border-border-subtle bg-bg-primary py-14 md:py-20">
        <div className="editorial-container space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-3">
              <Tag accent>{project.category}</Tag>
              <Tag>{project.year}</Tag>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8 space-y-5">
              <h1 className="display-hero text-text-primary">{project.title}</h1>
              <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              {project.github && (
                <LinkButton href={project.github} external variant="secondary" size="md">
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub Repository</span>
                </LinkButton>
              )}
              {project.liveDemo && (
                <LinkButton href={project.liveDemo} external variant="primary" size="md">
                  <span>Live Demo</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              )}
              {!project.github && !project.liveDemo && (
                <span className="border border-border-subtle bg-bg-secondary px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                  Repository &amp; Demo Links — Editable in data/projects.ts
                </span>
              )}
            </div>
          </div>

          {/* Primary Hero Frame */}
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-border-subtle bg-bg-secondary">
            <Image
              src={project.thumbnail}
              alt={`${project.title} hero visual`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Overview, Objectives, Technologies */}
      <section className="border-b border-border-subtle bg-bg-secondary/40 py-16 md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="mono-label text-accent">01 // Project Overview</p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-text-primary">
                Context &amp; Scope
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                {project.overview ?? project.description}
              </p>
            </div>

            {project.objectives && project.objectives.length > 0 && (
              <div className="space-y-4 border-t border-border-subtle pt-8">
                <p className="mono-label text-text-secondary">02 // Project Objectives</p>
                <ul className="space-y-3">
                  {project.objectives.map((objective, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary md:text-base"
                    >
                      <span className="font-mono text-xs text-accent mt-1">
                        0{idx + 1}
                      </span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          <Reveal className="lg:col-span-5 space-y-6" delay={0.06}>
            <div className="border border-border-subtle bg-bg-primary p-6 space-y-4">
              <p className="mono-label text-accent">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>

            <div className="border border-border-subtle bg-bg-primary p-6 space-y-3">
              <p className="mono-label text-text-secondary">Record Status</p>
              <p className="text-sm leading-relaxed text-text-secondary">
                This page is generated dynamically from{" "}
                <code className="font-mono text-xs text-text-primary">data/projects.ts</code>.
                Replace placeholder text, screenshots, and optional repository/demo links as
                your verified case study details are finalized.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Challenges, Solutions, Results */}
      <section className="border-b border-border-subtle bg-bg-primary py-16 md:py-24">
        <div className="editorial-container">
          <Reveal
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
            staggerChildren
          >
            <div className="border border-border-subtle bg-bg-secondary p-7 space-y-3">
              <p className="mono-label text-accent">03 // Challenge</p>
              <h3 className="font-display text-xl font-bold uppercase text-text-primary">
                Problem Space
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {project.challenge ??
                  "Add verified technical or product challenges in data/projects.ts."}
              </p>
            </div>

            <div className="border border-border-subtle bg-bg-secondary p-7 space-y-3">
              <p className="mono-label text-accent">04 // Solution</p>
              <h3 className="font-display text-xl font-bold uppercase text-text-primary">
                Engineering Approach
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {project.solution ??
                  "Add verified architectural and UI solutions in data/projects.ts."}
              </p>
            </div>

            <div className="border border-border-subtle bg-bg-secondary p-7 space-y-3">
              <p className="mono-label text-accent">05 // Outcomes</p>
              <h3 className="font-display text-xl font-bold uppercase text-text-primary">
                Key Takeaways
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {project.results ??
                  "Add verified outcomes or reflections in data/projects.ts."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Project Screenshots */}
      <section className="border-b border-border-subtle bg-bg-secondary/40 py-16 md:py-24">
        <div className="editorial-container space-y-8">
          <div className="flex items-center justify-between border-b border-border-subtle pb-5">
            <div>
              <p className="mono-label text-accent">06 // Visual Frames</p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase text-text-primary">
                Project Screenshots
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-secondary">
              {String(project.gallery.length).padStart(2, "0")} Frames
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.gallery.map((src, idx) => (
              <figure
                key={`${project.slug}-img-${idx}`}
                className="overflow-hidden border border-border-subtle bg-bg-primary"
              >
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-border-subtle px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  Frame {String(idx + 1).padStart(2, "0")} · {project.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Related Projects */}
      <section className="bg-bg-primary py-16 md:py-24">
        <div className="editorial-container space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border-subtle pb-6">
            <div>
              <p className="mono-label text-accent">07 // Continue Exploring</p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase text-text-primary">
                Related Projects
              </h2>
            </div>
            <LinkButton href="/work" variant="secondary" size="sm">
              <span>All Projects</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </LinkButton>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="group border border-border-subtle bg-bg-secondary transition-colors hover:border-accent"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border-subtle">
                  <Image
                    src={item.thumbnail}
                    alt={`${item.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {item.category}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold uppercase text-text-primary group-hover:text-accent">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-text-secondary group-hover:text-accent" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
