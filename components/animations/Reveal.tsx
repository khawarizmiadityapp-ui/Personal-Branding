"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  staggerChildren?: boolean;
}

export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  duration = 0.75,
  staggerChildren = false,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const targets = staggerChildren ? Array.from(el.children) : el;

      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger: staggerChildren ? 0.08 : 0,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
