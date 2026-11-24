"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { profile } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HERO_PORTRAIT_PATH = "/images/profile/developer-portrait.png";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitLayerRef = useRef<HTMLDivElement>(null);
  const contentLayerRef = useRef<HTMLDivElement>(null);
  const [portraitMissing, setPortraitMissing] = useState(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", {
        y: 16,
        opacity: 0,
        duration: 0.55,
      })
        .from(
          ".hero-line-inner",
          {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-meta",
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
            stagger: 0.08,
          },
          "-=0.45"
        )
        .from(
          ".hero-portrait-reveal",
          {
            y: 32,
            scale: 1.04,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.85"
        );

      if (portraitLayerRef.current && sectionRef.current) {
        gsap.to(portraitLayerRef.current, {
          yPercent: 8,
          scale: 1.03,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (contentLayerRef.current && sectionRef.current) {
        gsap.to(contentLayerRef.current, {
          y: -24,
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
      className="relative flex min-h-svh flex-col justify-between overflow-hidden border-b border-border-subtle bg-bg-primary pt-22 pb-6 md:pt-26 md:pb-8"
    >
      {/* 1. Architectural Grid Backdrop */}
      <div
        className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
      />

      {/* 2. Subtle Topographic Contour Lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
      >
        <g fill="none" stroke="#282B30" strokeWidth="1">
          <path d="M-80 210 C 180 120, 420 290, 690 210 C 960 130, 1180 260, 1520 170" />
          <path d="M-80 295 C 210 210, 450 375, 740 285 C 1010 200, 1220 335, 1520 250" />
          <path d="M-80 390 C 230 315, 490 465, 780 375 C 1050 290, 1260 420, 1520 345" />
          <path d="M-80 495 C 260 425, 520 570, 820 480 C 1080 400, 1290 520, 1520 445" />
          <path d="M-80 610 C 280 545, 560 680, 860 590 C 1120 515, 1320 620, 1520 555" />
          <path d="M-80 735 C 310 675, 590 795, 900 715 C 1150 645, 1340 735, 1520 680" />
          <ellipse cx="1030" cy="460" rx="340" ry="260" strokeDasharray="3 7" />
          <ellipse cx="1030" cy="460" rx="460" ry="350" opacity="0.65" />
        </g>
        <path
          d="M-60 445 C 245 365, 505 520, 795 430 C 1060 348, 1270 475, 1520 395"
          fill="none"
          stroke="#D7FF48"
          strokeWidth="1"
          strokeOpacity="0.16"
        />
      </svg>

      {/* 3. Restrained Atmospheric Studio Lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_68%_at_74%_48%,rgba(215,255,72,0.065)_0%,rgba(34,38,46,0.36)_38%,rgba(9,10,12,0)_72%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(9,10,12,0.78)_0%,rgba(9,10,12,0)_54%)]"
        aria-hidden="true"
      />

      {/* 4. Top Identity Strip + Left Editorial Typography & CTAs */}
      <div className="editorial-container relative z-20 order-1 flex flex-1 flex-col justify-between gap-8">
        <div className="hero-eyebrow flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-accent" aria-hidden="true" />
            <span className="mono-label text-text-primary">{profile.name}</span>
          </div>
          <span className="mono-label text-text-secondary">{profile.role}</span>
        </div>

        <div
          ref={contentLayerRef}
          className="my-auto max-w-2xl space-y-7 pt-2 md:max-w-[52%] lg:max-w-[50%] md:py-10"
        >
          <h1 className="display-hero text-text-primary">
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">CREATING</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">DIGITAL</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-inner block text-accent">
                EXPERIENCES.
              </span>
            </span>
          </h1>

          <p className="hero-meta max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
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
      </div>

      {/* 5. Oversized Editorial Portrait Stage (Desktop & Tablet: 45-60% viewport width on right) */}
      <div className="hero-portrait-reveal pointer-events-none relative z-10 order-2 mt-6 flex h-[44vh] min-h-[300px] w-full items-end justify-center md:order-none md:mt-0 md:h-auto md:min-h-0 md:absolute md:inset-y-0 md:right-[-2%] md:w-[50vw] md:justify-end lg:right-[0%] lg:w-[52vw] xl:w-[50vw] max-w-[820px]">
        <div
          ref={portraitLayerRef}
          className="relative h-full w-full md:h-[92vh] md:-mb-10 lg:h-[96vh] lg:-mb-12"
        >
          {!portraitMissing ? (
            <Image
              src={HERO_PORTRAIT_PATH}
              alt={`Editorial portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 767px) 92vw, (max-width: 1024px) 50vw, 52vw"
              onError={() => setPortraitMissing(true)}
              className="object-contain object-bottom select-none drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
            />
          ) : (
            /* Frameless Editorial Placeholder when /images/profile/developer-portrait.png is not yet supplied */
            <div className="relative flex h-full w-full flex-col items-center justify-end pb-12 md:items-end md:justify-center md:pr-10 md:pb-0">
              <div
                className="pointer-events-none absolute inset-x-[12%] bottom-0 top-[8%] rounded-full bg-[radial-gradient(ellipse_at_50%_42%,rgba(242,242,237,0.09)_0%,rgba(215,255,72,0.05)_36%,rgba(9,10,12,0)_72%)] blur-2xl"
                aria-hidden="true"
              />
              <div className="relative z-10 max-w-xs space-y-2.5 px-6 text-center md:px-0 md:text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  HERO PORTRAIT STAGE // CUTOUT PNG
                </p>
                <p className="font-display text-lg font-semibold uppercase tracking-tight text-text-primary/85 md:text-xl">
                  Transparent Portrait Asset
                </p>
                <p className="font-mono text-[11px] leading-relaxed text-text-secondary">
                  Place a transparent-background portrait at{" "}
                  <span className="text-text-primary">
                    public/images/profile/developer-portrait.png
                  </span>{" "}
                  to render it here automatically.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom natural blend fade into #090A0C */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-primary via-bg-primary/65 to-transparent md:h-36"
          aria-hidden="true"
        />
      </div>

      {/* 6. Bottom Scroll Indicator */}
      <div className="editorial-container relative z-20 order-3 mt-4 md:mt-0">
        <div className="hero-meta flex items-center justify-between border-t border-border-subtle/80 pt-4">
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
