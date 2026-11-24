import type { LoadedImageEntry, SpiralItem } from "./types";

/**
 * Preloads and caches HTMLImageElement instances for the Canvas 2D spiral gallery.
 * Handles loading failures gracefully without breaking the render loop.
 */
export class ImageLoader {
  private cache = new Map<string, LoadedImageEntry>();
  private onUpdate?: () => void;

  constructor(onUpdate?: () => void) {
    this.onUpdate = onUpdate;
  }

  preload(items: SpiralItem[]) {
    for (const item of items) {
      if (this.cache.has(item.src)) continue;

      const entry: LoadedImageEntry = {
        status: "loading",
        image: null,
      };
      this.cache.set(item.src, entry);

      if (typeof window === "undefined") continue;

      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        this.cache.set(item.src, { status: "loaded", image: img });
        this.onUpdate?.();
      };
      img.onerror = () => {
        this.cache.set(item.src, { status: "error", image: null });
        this.onUpdate?.();
      };
      img.src = item.src;
    }
  }

  get(src: string): LoadedImageEntry {
    return this.cache.get(src) ?? { status: "idle", image: null };
  }

  dispose() {
    this.cache.clear();
  }
}
