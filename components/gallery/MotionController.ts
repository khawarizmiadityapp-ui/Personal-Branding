/**
 * Smooth physics & motion controller for the 3D Spiral Gallery.
 * Handles inertia, drag/wheel impulses, autoplay, step navigation, and smooth settling.
 */
export class MotionController {
  private phase = 0;
  private velocity = 0;
  private targetPhase: number | null = null;
  private isDragging = false;
  private autoplay = true;
  private autoplaySpeed = 0.26;
  private sensitivity = 1;
  private spacing = 0.72;
  private reducedMotion = false;
  private settleCooldown = 0;

  constructor(options?: {
    autoplay?: boolean;
    autoplaySpeed?: number;
    sensitivity?: number;
    spacing?: number;
    reducedMotion?: boolean;
  }) {
    if (options?.autoplay !== undefined) this.autoplay = options.autoplay;
    if (options?.autoplaySpeed !== undefined) this.autoplaySpeed = options.autoplaySpeed;
    if (options?.sensitivity !== undefined) this.sensitivity = options.sensitivity;
    if (options?.spacing !== undefined) this.spacing = options.spacing;
    if (options?.reducedMotion !== undefined) this.reducedMotion = options.reducedMotion;
  }

  setSpacing(spacing: number) {
    this.spacing = spacing;
  }

  setAutoplay(enabled: boolean) {
    this.autoplay = enabled;
    if (enabled) {
      this.targetPhase = null;
    }
  }

  setSensitivity(sensitivity: number) {
    this.sensitivity = Math.max(0.3, Math.min(2.5, sensitivity));
  }

  setReducedMotion(reduced: boolean) {
    this.reducedMotion = reduced;
    if (reduced) {
      this.velocity = 0;
    }
  }

  beginDrag() {
    this.isDragging = true;
    this.targetPhase = null;
    this.velocity *= 0.25;
  }

  dragBy(deltaPixels: number) {
    const deltaPhase = deltaPixels * 0.0052 * this.sensitivity;
    this.phase += deltaPhase;
    this.velocity = this.velocity * 0.55 + deltaPhase * 28 * 0.45;
  }

  endDrag() {
    this.isDragging = false;
    this.settleCooldown = 0.45;
  }

  applyWheel(delta: number) {
    this.targetPhase = null;
    const impulse = delta * 0.0028 * this.sensitivity;
    this.velocity = Math.max(-6.5, Math.min(6.5, this.velocity + impulse));
    this.settleCooldown = 0.55;
  }

  stepBy(steps: number) {
    const currentIndex = Math.round(this.phase / this.spacing);
    const nextPhase = (currentIndex + steps) * this.spacing;
    if (this.reducedMotion) {
      this.phase = nextPhase;
      this.velocity = 0;
      this.targetPhase = null;
      return;
    }
    this.targetPhase = nextPhase;
    this.settleCooldown = 1.1;
  }

  focusIndex(index: number, itemCount: number) {
    if (itemCount <= 0) return;
    const totalArc = itemCount * this.spacing;
    const desiredMod = index * this.spacing;
    const currentMod = ((this.phase % totalArc) + totalArc) % totalArc;
    let diff = desiredMod - currentMod;
    if (diff > totalArc * 0.5) diff -= totalArc;
    if (diff < -totalArc * 0.5) diff += totalArc;

    const target = this.phase + diff;
    if (this.reducedMotion) {
      this.phase = target;
      this.velocity = 0;
      this.targetPhase = null;
      return;
    }
    this.targetPhase = target;
    this.settleCooldown = 1.2;
  }

  update(dtSeconds: number): { phase: number; velocity: number } {
    const dt = Math.min(0.05, Math.max(0.001, dtSeconds));

    if (this.settleCooldown > 0) {
      this.settleCooldown = Math.max(0, this.settleCooldown - dt);
    }

    if (this.isDragging) {
      this.velocity *= Math.exp(-6 * dt);
      return { phase: this.phase, velocity: this.velocity };
    }

    if (this.targetPhase !== null) {
      const diff = this.targetPhase - this.phase;
      const stiffness = 11.5;
      const damping = 7.2;
      this.velocity += diff * stiffness * dt;
      this.velocity *= Math.exp(-damping * dt);
      this.phase += this.velocity * dt;

      if (Math.abs(diff) < 0.002 && Math.abs(this.velocity) < 0.004) {
        this.phase = this.targetPhase;
        this.velocity = 0;
        this.targetPhase = null;
      }
      return { phase: this.phase, velocity: this.velocity };
    }

    // Apply inertia decay
    const friction = Math.exp(-3.4 * dt);
    this.velocity *= friction;

    // Gentle autoplay drift when idle and motion is allowed
    if (this.autoplay && !this.reducedMotion && this.settleCooldown <= 0) {
      const targetCruise = this.autoplaySpeed * this.sensitivity;
      this.velocity += (targetCruise - this.velocity) * Math.min(1, dt * 2.2);
    } else if (Math.abs(this.velocity) < 0.001) {
      this.velocity = 0;
    }

    this.phase += this.velocity * dt;

    return { phase: this.phase, velocity: this.velocity };
  }

  getState() {
    return {
      phase: this.phase,
      velocity: this.velocity,
      isDragging: this.isDragging,
    };
  }
}
