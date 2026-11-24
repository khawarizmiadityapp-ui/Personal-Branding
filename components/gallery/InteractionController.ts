import type { MotionController } from "./MotionController";

interface InteractionCallbacks {
  onClickPoint?: (x: number, y: number) => void;
  onTogglePlay?: () => void;
  onActivateCurrent?: () => void;
}

/**
 * Handles pointer drag (mouse & touch), wheel input, and keyboard navigation
 * for the Canvas 2D spiral gallery while preserving normal page scrolling.
 */
export class InteractionController {
  private element: HTMLCanvasElement;
  private motion: MotionController;
  private callbacks: InteractionCallbacks;
  private activePointerId: number | null = null;
  private lastX = 0;
  private lastY = 0;
  private startX = 0;
  private startY = 0;
  private movedDistance = 0;

  constructor(
    element: HTMLCanvasElement,
    motion: MotionController,
    callbacks: InteractionCallbacks = {}
  ) {
    this.element = element;
    this.motion = motion;
    this.callbacks = callbacks;
    this.bind();
  }

  private bind() {
    this.element.addEventListener("pointerdown", this.handlePointerDown);
    this.element.addEventListener("pointermove", this.handlePointerMove);
    this.element.addEventListener("pointerup", this.handlePointerUp);
    this.element.addEventListener("pointercancel", this.handlePointerUp);
    this.element.addEventListener("wheel", this.handleWheel, { passive: false });
    this.element.addEventListener("keydown", this.handleKeyDown);
  }

  dispose() {
    this.element.removeEventListener("pointerdown", this.handlePointerDown);
    this.element.removeEventListener("pointermove", this.handlePointerMove);
    this.element.removeEventListener("pointerup", this.handlePointerUp);
    this.element.removeEventListener("pointercancel", this.handlePointerUp);
    this.element.removeEventListener("wheel", this.handleWheel);
    this.element.removeEventListener("keydown", this.handleKeyDown);
  }

  private handlePointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    this.activePointerId = event.pointerId;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.movedDistance = 0;
    this.motion.beginDrag();
    try {
      this.element.setPointerCapture(event.pointerId);
    } catch {
      // Ignore capture errors on synthetic pointer events
    }
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (this.activePointerId !== event.pointerId) return;
    const dx = event.clientX - this.lastX;
    const dy = event.clientY - this.lastY;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.movedDistance += Math.hypot(dx, dy);

    // Combine horizontal & vertical drag naturally along the vertical helix
    const combinedDelta = -dx * 0.9 - dy * 0.55;
    this.motion.dragBy(combinedDelta);
  };

  private handlePointerUp = (event: PointerEvent) => {
    if (this.activePointerId !== event.pointerId) return;
    this.activePointerId = null;
    this.motion.endDrag();

    try {
      if (this.element.hasPointerCapture(event.pointerId)) {
        this.element.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore release errors
    }

    // Treat minimal-movement pointer release as a deliberate click/tap on a card
    if (this.movedDistance < 8 && this.callbacks.onClickPoint) {
      const rect = this.element.getBoundingClientRect();
      this.callbacks.onClickPoint(
        event.clientX - rect.left,
        event.clientY - rect.top
      );
    }
  };

  private handleWheel = (event: WheelEvent) => {
    const absX = Math.abs(event.deltaX);
    const absY = Math.abs(event.deltaY);

    // Prevent page scroll ONLY on horizontal trackpad swipe or Shift+Wheel;
    // normal vertical wheel rotates the spiral smoothly without hijacking page scroll.
    if (event.shiftKey || absX > absY) {
      event.preventDefault();
      const delta = absX > absY ? event.deltaX : event.deltaY;
      this.motion.applyWheel(delta);
    } else {
      this.motion.applyWheel(event.deltaY * 0.55);
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        this.motion.stepBy(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        this.motion.stepBy(-1);
        break;
      case " ":
        event.preventDefault();
        this.callbacks.onTogglePlay?.();
        break;
      case "Enter":
        event.preventDefault();
        this.callbacks.onActivateCurrent?.();
        break;
      default:
        break;
    }
  };
}
