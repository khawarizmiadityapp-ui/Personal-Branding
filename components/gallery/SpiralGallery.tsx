"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SpiralCanvas, type SpiralCanvasHandle } from "./SpiralCanvas";
import type { SpiralConfig, SpiralItem } from "./types";

interface SpiralGalleryProps {
  items: SpiralItem[];
  config?: Partial<SpiralConfig>;
}

export function SpiralGallery({ items, config }: SpiralGalleryProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const canvasHandleRef = useRef<SpiralCanvasHandle>(null);

  const boundedItems = useMemo(() => items.slice(0, 20), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sensitivity, setSensitivity] = useState(1);
  const [canvasUnavailable, setCanvasUnavailable] = useState(false);
  const [showStaticFallback, setShowStaticFallback] = useState(false);

  const effectivePlaying = isPlaying && !reducedMotion;
  const activeItem = boundedItems[activeIndex] ?? boundedItems[0];

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleCardActivate = useCallback(
    (item: SpiralItem) => {
      router.push(`/work/${item.slug}`);
    },
    [router]
  );

  if (boundedItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      {/* Main Canvas Stage or Accessible Static Fallback */}
      {canvasUnavailable || showStaticFallback ? (
        <div
          role="region"
          aria-label="Selected Works static gallery fallback"
          className="grid grid-cols-1 gap-4 border border-border-subtle bg-bg-secondary p-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {boundedItems.map((item, idx) => (
            <Link
              key={item.id}
              href={`/work/${item.slug}`}
              className="group border border-border-subtle bg-bg-primary p-3 transition-colors hover:border-accent"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-surface">
                <Image
                  src={item.src}
                  alt={`${item.title} — ${item.frameLabel}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {String(idx + 1).padStart(2, "0")} · {item.category}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold uppercase text-text-primary">
                    {item.title}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-secondary transition-colors group-hover:text-accent" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <SpiralCanvas
          ref={canvasHandleRef}
          items={boundedItems}
          config={config}
          isPlaying={effectivePlaying}
          sensitivity={sensitivity}
          reducedMotion={reducedMotion}
          onActiveIndexChange={setActiveIndex}
          onCardActivate={handleCardActivate}
          onTogglePlay={handleTogglePlay}
          onCanvasUnavailable={() => setCanvasUnavailable(true)}
        />
      )}

      {/* Active Frame Telemetry + Accessible Controls */}
      <div className="grid grid-cols-1 gap-4 border border-border-subtle bg-bg-secondary p-4 md:grid-cols-12 md:items-center md:p-5">
        {/* Active Project Readout */}
        <div className="md:col-span-5 space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(boundedItems.length).padStart(2, "0")}
            </span>
            <span className="text-border-subtle" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
              {activeItem.category}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
              · {activeItem.frameLabel}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-text-primary md:text-2xl">
              {activeItem.title}
            </h3>
            <Link
              href={`/work/${activeItem.slug}`}
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
            >
              <span>Inspect</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Step & Autoplay Controls */}
        <div className="flex flex-wrap items-center gap-2 md:col-span-4 md:justify-center">
          <button
            type="button"
            onClick={() => canvasHandleRef.current?.stepPrev()}
            disabled={canvasUnavailable || showStaticFallback}
            aria-label="Previous project frame"
            className="inline-flex h-10 w-10 items-center justify-center border border-border-subtle bg-bg-primary text-text-primary transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            disabled={canvasUnavailable || showStaticFallback || reducedMotion}
            aria-label={effectivePlaying ? "Pause spiral autoplay" : "Resume spiral autoplay"}
            className="inline-flex h-10 items-center gap-2 border border-border-subtle bg-bg-primary px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-primary transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
          >
            {effectivePlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => canvasHandleRef.current?.stepNext()}
            disabled={canvasUnavailable || showStaticFallback}
            aria-label="Next project frame"
            className="inline-flex h-10 w-10 items-center justify-center border border-border-subtle bg-bg-primary text-text-primary transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Sensitivity + Accessible View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-3 md:justify-end">
          <label className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
            <SlidersHorizontal className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="sr-only">Animation sensitivity</span>
            <input
              type="range"
              min={0.4}
              max={2}
              step={0.1}
              value={sensitivity}
              onChange={(event) => setSensitivity(Number(event.target.value))}
              disabled={canvasUnavailable || showStaticFallback}
              aria-label="Spiral animation sensitivity"
              className="h-1 w-20 cursor-pointer accent-[#D7FF48]"
            />
            <span className="w-8 text-right text-text-primary">
              {sensitivity.toFixed(1)}x
            </span>
          </label>

          {!canvasUnavailable && (
            <button
              type="button"
              onClick={() => setShowStaticFallback((prev) => !prev)}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {showStaticFallback ? "3D Spiral View" : "Grid View"}
            </button>
          )}
        </div>
      </div>

      {reducedMotion && !showStaticFallback && (
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
          Reduced motion preference detected — autoplay paused. Use buttons or arrow keys to step frames.
        </p>
      )}
    </div>
  );
}
