"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ImageLoader } from "./ImageLoader";
import { InteractionController } from "./InteractionController";
import { MotionController } from "./MotionController";
import { SpiralGeometry } from "./SpiralGeometry";
import { SpiralRenderer } from "./SpiralRenderer";
import {
  DEFAULT_SPIRAL_CONFIG,
  type ProjectedCard,
  type SpiralConfig,
  type SpiralItem,
} from "./types";

export interface SpiralCanvasHandle {
  stepNext: () => void;
  stepPrev: () => void;
  focusIndex: (index: number) => void;
}

interface SpiralCanvasProps {
  items: SpiralItem[];
  config?: Partial<SpiralConfig>;
  isPlaying: boolean;
  sensitivity: number;
  reducedMotion: boolean;
  onActiveIndexChange?: (index: number) => void;
  onCardActivate?: (item: SpiralItem) => void;
  onTogglePlay?: () => void;
  onCanvasUnavailable?: () => void;
}

export const SpiralCanvas = forwardRef<SpiralCanvasHandle, SpiralCanvasProps>(
  function SpiralCanvas(
    {
      items,
      config,
      isPlaying,
      sensitivity,
      reducedMotion,
      onActiveIndexChange,
      onCardActivate,
      onTogglePlay,
      onCanvasUnavailable,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDraggingUI, setIsDraggingUI] = useState(false);

    // Mutable engine refs (zero per-frame React re-renders)
    const motionRef = useRef<MotionController | null>(null);
    const geometryRef = useRef(new SpiralGeometry());
    const rendererRef = useRef(new SpiralRenderer());
    const imageLoaderRef = useRef<ImageLoader | null>(null);
    const projectedCardsRef = useRef<ProjectedCard[]>([]);
    const lastActiveIndexRef = useRef<number>(-1);
    const isVisibleRef = useRef<boolean>(true);
    const sizeRef = useRef({ width: 960, height: 580, dpr: 1 });

    // Keep latest callbacks in refs so rAF loop never restarts unnecessarily
    const callbacksRef = useRef({
      onActiveIndexChange,
      onCardActivate,
      onTogglePlay,
      onCanvasUnavailable,
    });
    callbacksRef.current = {
      onActiveIndexChange,
      onCardActivate,
      onTogglePlay,
      onCanvasUnavailable,
    };

    const mergedConfigRef = useRef<SpiralConfig>({
      ...DEFAULT_SPIRAL_CONFIG,
      ...config,
      accentColors: {
        ...DEFAULT_SPIRAL_CONFIG.accentColors,
        ...config?.accentColors,
      },
      cornerLabels: {
        ...DEFAULT_SPIRAL_CONFIG.cornerLabels,
        ...config?.cornerLabels,
      },
    });
    mergedConfigRef.current = {
      ...DEFAULT_SPIRAL_CONFIG,
      ...config,
      accentColors: {
        ...DEFAULT_SPIRAL_CONFIG.accentColors,
        ...config?.accentColors,
      },
      cornerLabels: {
        ...DEFAULT_SPIRAL_CONFIG.cornerLabels,
        ...config?.cornerLabels,
      },
    };

    const itemsRef = useRef<SpiralItem[]>(items);
    itemsRef.current = items;

    useImperativeHandle(ref, () => ({
      stepNext: () => motionRef.current?.stepBy(1),
      stepPrev: () => motionRef.current?.stepBy(-1),
      focusIndex: (index: number) =>
        motionRef.current?.focusIndex(index, itemsRef.current.length),
    }));

    // Sync discrete controls without resetting engine
    useEffect(() => {
      motionRef.current?.setAutoplay(isPlaying);
    }, [isPlaying]);

    useEffect(() => {
      motionRef.current?.setSensitivity(sensitivity);
    }, [sensitivity]);

    useEffect(() => {
      motionRef.current?.setReducedMotion(reducedMotion);
    }, [reducedMotion]);

    // Preload images whenever items change
    useEffect(() => {
      imageLoaderRef.current?.preload(items);
    }, [items]);

    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        callbacksRef.current.onCanvasUnavailable?.();
        return;
      }

      const baseConfig = mergedConfigRef.current;
      const motion = new MotionController({
        autoplay: isPlaying,
        autoplaySpeed: baseConfig.autoplaySpeed,
        sensitivity,
        spacing: baseConfig.imageSpacing,
        reducedMotion,
      });
      motionRef.current = motion;

      const loader = new ImageLoader();
      loader.preload(itemsRef.current);
      imageLoaderRef.current = loader;

      const interaction = new InteractionController(canvas, motion, {
        onTogglePlay: () => callbacksRef.current.onTogglePlay?.(),
        onActivateCurrent: () => {
          const active = itemsRef.current[Math.max(0, lastActiveIndexRef.current)];
          if (active) callbacksRef.current.onCardActivate?.(active);
        },
        onClickPoint: (x, y) => {
          const hit = rendererRef.current.hitTest(projectedCardsRef.current, x, y);
          if (!hit) return;
          if (hit.isFocused) {
            callbacksRef.current.onCardActivate?.(hit.item);
          } else {
            motion.focusIndex(hit.index, itemsRef.current.length);
          }
        },
      });

      const handlePointerCursorDown = () => setIsDraggingUI(true);
      const handlePointerCursorUp = () => setIsDraggingUI(false);
      canvas.addEventListener("pointerdown", handlePointerCursorDown);
      window.addEventListener("pointerup", handlePointerCursorUp);

      const resizeCanvas = () => {
        const rect = container.getBoundingClientRect();
        const width = Math.max(280, Math.floor(rect.width));
        const height = Math.max(380, Math.floor(rect.height));
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        sizeRef.current = { width, height, dpr };
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resizeCanvas();
      const resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(container);

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isVisibleRef.current = entry ? entry.isIntersecting : true;
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(container);

      const handleVisibilityChange = () => {
        if (document.hidden) {
          isVisibleRef.current = false;
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      let rafId = 0;
      let lastTime = performance.now();

      const tick = (now: number) => {
        rafId = window.requestAnimationFrame(tick);

        const dt = (now - lastTime) / 1000;
        lastTime = now;

        if (!isVisibleRef.current || document.hidden) {
          return;
        }

        const { width, height } = sizeRef.current;
        const responsiveConfig = geometryRef.current.computeResponsiveConfig(
          mergedConfigRef.current,
          width,
          height
        );

        motion.setSpacing(responsiveConfig.imageSpacing);
        const { phase, velocity } = motion.update(dt);

        const { cards, activeIndex } = geometryRef.current.projectItems(
          itemsRef.current,
          phase,
          now * 0.001,
          width,
          height,
          responsiveConfig
        );

        projectedCardsRef.current = cards;

        rendererRef.current.render(
          ctx,
          width,
          height,
          cards,
          velocity,
          responsiveConfig,
          loader,
          activeIndex,
          itemsRef.current.length
        );

        if (activeIndex !== lastActiveIndexRef.current) {
          lastActiveIndexRef.current = activeIndex;
          callbacksRef.current.onActiveIndexChange?.(activeIndex);
        }
      };

      rafId = window.requestAnimationFrame(tick);

      return () => {
        window.cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        canvas.removeEventListener("pointerdown", handlePointerCursorDown);
        window.removeEventListener("pointerup", handlePointerCursorUp);
        interaction.dispose();
        loader.dispose();
      };
      // Engine mounts once and reads live values from refs
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={containerRef}
        className="relative h-[460px] w-full overflow-hidden border border-border-subtle bg-bg-primary sm:h-[540px] lg:h-[640px]"
      >
        <canvas
          ref={canvasRef}
          tabIndex={0}
          role="region"
          aria-roledescription="interactive 3D spiral gallery"
          aria-label="Selected Works 3D Spiral Gallery. Use left and right arrow keys to navigate frames, space to pause or resume, and enter to open the active project."
          className={`block h-full w-full touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
            isDraggingUI ? "cursor-grabbing" : "cursor-grab"
          }`}
        />
      </div>
    );
  }
);
