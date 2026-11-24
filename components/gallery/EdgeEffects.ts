import type { ProjectedCard, SpiralConfig } from "./types";

/**
 * REEL FLUX Edge Treatment for Canvas 2D:
 * 1. Motion Smear — speed-sensitive directional streak along helix tangent.
 * 2. Chromatic Fringe — controlled RGB-style edge displacement in the limb edge zone.
 * 3. Edge Flare — brief directional specular light flare with smooth fade-out.
 */
export class EdgeEffects {
  renderMotionSmear(
    ctx: CanvasRenderingContext2D,
    card: ProjectedCard,
    image: HTMLImageElement | null,
    velocity: number,
    config: SpiralConfig
  ) {
    if (config.smearIntensity <= 0) return;

    const speed = Math.min(3.5, Math.abs(velocity));
    const trigger = card.edgeZone * 0.72 + Math.min(1, speed * 0.35) * 0.28;
    const smearStrength = trigger * Math.min(1.4, speed * 0.48 + card.edgeZone * 0.45) * config.smearIntensity;

    if (smearStrength < 0.08) return;

    const dir = velocity >= 0 ? -1 : 1;
    const steps = 3;
    const maxOffset = Math.min(34, (10 + speed * 9) * config.smearIntensity * card.scale);
    const halfW = card.width * 0.5;
    const halfH = card.height * 0.5;

    ctx.save();
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const offsetX = card.tangentX * maxOffset * t * dir;
      const offsetY = card.tangentY * maxOffset * t * dir * 0.45;
      const alpha = card.opacity * smearStrength * (0.22 * (1 - t * 0.68));
      if (alpha < 0.01) continue;

      ctx.globalAlpha = alpha;
      if (image) {
        ctx.drawImage(
          image,
          card.screenX - halfW + offsetX,
          card.screenY - halfH + offsetY,
          card.width,
          card.height
        );
      } else {
        ctx.fillStyle = config.accentColors.surface;
        ctx.fillRect(
          card.screenX - halfW + offsetX,
          card.screenY - halfH + offsetY,
          card.width,
          card.height
        );
      }
    }
    ctx.restore();
  }

  renderChromaticFringe(
    ctx: CanvasRenderingContext2D,
    card: ProjectedCard,
    velocity: number,
    config: SpiralConfig
  ) {
    if (config.chromaticFringeIntensity <= 0 || card.edgeZone < 0.08) return;

    const speedBoost = 1 + Math.min(1.2, Math.abs(velocity) * 0.35);
    const strength = Math.min(1, card.edgeZone * speedBoost * config.chromaticFringeIntensity);
    const shift = Math.min(7, (1.8 + 3.4 * strength) * card.scale);
    const halfW = card.width * 0.5;
    const halfH = card.height * 0.5;
    const x = card.screenX - halfW;
    const y = card.screenY - halfH;

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.lineWidth = Math.max(1, 1.5 * card.scale);

    // Cyan channel displacement
    ctx.globalAlpha = Math.min(0.65, 0.48 * strength * card.opacity);
    ctx.strokeStyle = config.accentColors.fringeCyan;
    ctx.strokeRect(x - shift * card.edgeSide, y - shift * 0.2, card.width, card.height);

    // Magenta / warm channel displacement
    ctx.globalAlpha = Math.min(0.55, 0.42 * strength * card.opacity);
    ctx.strokeStyle = config.accentColors.fringeMagenta;
    ctx.strokeRect(x + shift * card.edgeSide, y + shift * 0.2, card.width, card.height);

    // Subtle lime accent fringe on leading vertical edge
    const leadingX = card.edgeSide > 0 ? x + card.width : x;
    ctx.globalAlpha = Math.min(0.75, 0.55 * strength * card.opacity);
    ctx.strokeStyle = config.accentColors.primary;
    ctx.beginPath();
    ctx.moveTo(leadingX, y);
    ctx.lineTo(leadingX, y + card.height);
    ctx.stroke();

    ctx.restore();
  }

  renderEdgeFlare(
    ctx: CanvasRenderingContext2D,
    card: ProjectedCard,
    velocity: number,
    config: SpiralConfig
  ) {
    if (config.edgeFlareIntensity <= 0 || card.edgeZone < 0.12) return;

    const speedFactor = 0.65 + Math.min(0.85, Math.abs(velocity) * 0.35);
    const intensity = Math.min(
      1,
      Math.pow(card.edgeZone, 1.15) * speedFactor * config.edgeFlareIntensity
    );
    if (intensity < 0.05) return;

    const halfW = card.width * 0.5;
    const halfH = card.height * 0.5;
    const flareX = card.screenX + halfW * card.edgeSide;
    const flareY = card.screenY;
    const radius = Math.max(24, card.height * 0.56);

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    // Soft radial specular flare at the limb edge
    const radial = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, radius);
    radial.addColorStop(0, `rgba(215, 255, 72, ${(0.42 * intensity * card.opacity).toFixed(3)})`);
    radial.addColorStop(0.35, `rgba(246, 255, 209, ${(0.22 * intensity * card.opacity).toFixed(3)})`);
    radial.addColorStop(1, "rgba(215, 255, 72, 0)");

    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(flareX, flareY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Thin vertical light streak along the card edge
    const streakGrad = ctx.createLinearGradient(
      flareX,
      flareY - halfH * 1.15,
      flareX,
      flareY + halfH * 1.15
    );
    streakGrad.addColorStop(0, "rgba(215, 255, 72, 0)");
    streakGrad.addColorStop(0.5, `rgba(246, 255, 209, ${(0.65 * intensity * card.opacity).toFixed(3)})`);
    streakGrad.addColorStop(1, "rgba(215, 255, 72, 0)");

    ctx.strokeStyle = streakGrad;
    ctx.lineWidth = Math.max(1.2, 2.2 * card.scale);
    ctx.beginPath();
    ctx.moveTo(flareX, flareY - halfH * 1.12);
    ctx.lineTo(flareX, flareY + halfH * 1.12);
    ctx.stroke();

    ctx.restore();
  }
}
