"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { profile } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", {
        y: 18,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-line-inner",
          {
            yPercent: 108,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .from(
          ".hero-meta",
          {
            y: 22,
            opacity: 0,
            duration: 0.65,
            stagger: 0.08,
          },
          "-=0.45"
        )
        .from(
          ".hero-visual",
          {
            scale: 1.05,
            opacity: 0,
            duration: 1.0,
            ease: "power3.out",
          },
          "-=0.7"
        );

      if (visualRef.current && sectionRef.current) {
        gsap.to(visualRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden border-b border-border-subtle bg-bg-primary pt-24 pb-8 md:pt-28 md:pb-10"
    >
      {/* Subtle architectural grid backdrop */}
      <div
        className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(215,255,72,0.06),transparent_48%)]"
        aria-hidden="true"
      />

      <div className="editorial-container relative z-10 flex flex-1 flex-col justify-between gap-12">
        {/* Top identity strip */}
        <div className="hero-eyebrow flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle/80 pb-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-accent" aria-hidden="true" />
            <span className="mono-label text-text-primary">{profile.name}</span>
          </div>
          <span className="mono-label text-text-secondary">{profile.role}</span>
        </div>

        {/* Main editorial grid */}
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 space-y-8">
            <h1 className="display-hero text-text-primary">
              <span className="block overflow-hidden">
                <span className="hero-line-inner block">CREATING</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line-inner block">
                  DIGITAL{" "}
                  <span className="text-accent">EXPERIENCES.</span>
                </span>
              </span>
            </h1>

            <p className="hero-meta max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              {profile.heroSubheadline}
            </p>

            <div className="hero-meta flex flex-wrap items-center gap-4 pt-1">
              <LinkButton href="/#selected-works" variant="primary" size="lg">
                <span>Explore My Work</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/about" variant="secondary" size="lg">
                <span>About Me</span>
              </LinkButton>
            </div>
          </div>

          {/* Right editorial visual composition */}
          <div className="lg:col-span-4">
            <div className="hero-visual relative overflow-hidden border border-border-subtle bg-bg-secondary">
              <div ref={visualRef} className="relative aspect-[4/5] w-full">
                <Image
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between border-t border-border-subtle bg-bg-primary/95 px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  ID // {profile.initials}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary">
                  WEB &amp; MOBILE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="hero-meta flex items-center justify-between border-t border-border-subtle/80 pt-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
            01 // INTRODUCTION
          </span>
          <a
            href="#about"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-accent"
          >
            <span>Scroll to Explore</span>
            <ArrowDown
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
