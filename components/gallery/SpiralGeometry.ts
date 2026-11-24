import type { ProjectedCard, SpiralConfig, SpiralItem } from "./types";

/**
 * Pure 3D vertical helix geometry & perspective projection for Canvas 2D.
 * No DOM dependencies; easy to resize and adapt for desktop, tablet, and mobile.
 */
export class SpiralGeometry {
  computeResponsiveConfig(
    base: SpiralConfig,
    viewportWidth: number,
    viewportHeight: number
  ): SpiralConfig {
    const minDim = Math.min(viewportWidth, viewportHeight);
    const isMobile = viewportWidth < 640;
    const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

    const scaleFactor = isMobile
      ? Math.max(0.54, Math.min(0.72, viewportWidth / 520))
      : isTablet
        ? Math.max(0.75, Math.min(0.9, viewportWidth / 960))
        : Math.max(0.92, Math.min(1.12, minDim / 640));

    return {
      ...base,
      photoWidth: Math.round(base.photoWidth * scaleFactor),
      spiralRadius: Math.round(
        Math.min(base.spiralRadius * scaleFactor, viewportWidth * (isMobile ? 0.34 : 0.32))
      ),
      turnHeight: Math.round(
        Math.min(base.turnHeight * scaleFactor, viewportHeight * 0.58)
      ),
      perspective: Math.round(base.perspective * Math.max(0.78, scaleFactor)),
    };
  }

  projectItems(
    items: SpiralItem[],
    phase: number,
    timeSec: number,
    viewportWidth: number,
    viewportHeight: number,
    config: SpiralConfig
  ): { cards: ProjectedCard[]; activeIndex: number } {
    const count = items.length;
    if (count === 0) {
      return { cards: [], activeIndex: 0 };
    }

    const totalArc = count * config.imageSpacing;
    const halfArc = totalArc * 0.5;
    const centerX = viewportWidth * 0.5;
    const centerY = viewportHeight * 0.5;
    const baseHeight = config.photoWidth / config.photoAspectRatio;

    const cosTilt = Math.cos(config.tilt);
    const sinTilt = Math.sin(config.tilt);

    const cards: ProjectedCard[] = [];
    let bestFocusScore = -Infinity;
    let activeIndex = 0;

    for (let i = 0; i < count; i++) {
      // Wrap angular offset continuously into [-halfArc, +halfArc] so the helix never runs dry
      let rawTheta = i * config.imageSpacing - phase;
      rawTheta = ((((rawTheta + halfArc) % totalArc) + totalArc) % totalArc) - halfArc;

      const theta = rawTheta;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);

      // Vertical helix coordinates
      const x3d = sinT * config.spiralRadius;
      const waveOffset = Math.sin(theta * 1.5 + timeSec * 0.9) * config.waveAmplitude;
      const y3dRaw = (theta / (Math.PI * 2)) * config.turnHeight + waveOffset;
      const z3dRaw = cosT * config.spiralRadius * config.spiralDepth;

      // Subtle camera X-axis tilt for cinematic elevation
      const y3d = y3dRaw * cosTilt - z3dRaw * sinTilt;
      const z3d = y3dRaw * sinTilt + z3dRaw * cosTilt;

      // Perspective camera projection
      const cameraDistance = config.perspective + config.spiralRadius * 1.15;
      const denom = Math.max(140, cameraDistance - z3d);
      const scale = config.perspective / denom;

      const screenX = centerX + x3d * scale;
      const screenY = centerY + y3d * scale;

      // Foreshorten width smoothly as the card rotates around the helix limb
      const absCos = Math.abs(cosT);
      const foreshortenX = 0.36 + 0.64 * Math.pow(absCos, 0.72);
      const width = config.photoWidth * scale * foreshortenX;
      const height = baseHeight * scale;

      // Depth normalized [-1, 1]
      const depth = Math.max(-1, Math.min(1, cosT));
      const isFront = cosT >= 0;

      // Vertical edge fade so cards entering/leaving the top/bottom of the helix dissolve smoothly
      const verticalNorm = Math.min(1, Math.abs(theta) / Math.max(0.01, halfArc));
      const verticalFade = 1 - Math.pow(Math.max(0, (verticalNorm - 0.62) / 0.38), 1.8);

      // Front half prominent, far half smoothly faded to backFaceOpacity
      const depthOpacity = isFront
        ? 0.52 + 0.48 * Math.pow(cosT, 0.65)
        : config.backFaceOpacity + (0.52 - config.backFaceOpacity) * Math.pow(1 + cosT, 1.5);

      const opacity = Math.max(0.04, Math.min(1, depthOpacity * verticalFade));

      // REEL FLUX Edge Zone: peaks when card rounds left/right limbs (|sin(theta)| -> 1, |cos(theta)| -> 0)
      const limbProximity = Math.max(0, 1 - absCos / 0.56);
      const edgeZone = Math.pow(limbProximity, 1.45) * verticalFade;
      const edgeSide: -1 | 1 = sinT >= 0 ? 1 : -1;

      // Screen-space tangent direction along the helix for directional motion smear
      const tx = cosT * config.spiralRadius;
      const ty = config.turnHeight / (Math.PI * 2);
      const tLen = Math.hypot(tx, ty) || 1;

      // Focus score: closest to front-center (theta = 0)
      const focusScore = cosT - Math.abs(theta) * 0.65;
      if (focusScore > bestFocusScore) {
        bestFocusScore = focusScore;
        activeIndex = i;
      }

      cards.push({
        index: i,
        item: items[i],
        theta,
        screenX,
        screenY,
        width,
        height,
        foreshortenX,
        scale,
        depth,
        opacity,
        edgeZone,
        edgeSide,
        tangentX: tx / tLen,
        tangentY: ty / tLen,
        isFront,
        isFocused: false,
      });
    }

    for (const card of cards) {
      if (card.index === activeIndex) {
        card.isFocused = true;
      }
    }

    // Painter's algorithm: far cards first, front-most cards last
    cards.sort((a, b) => a.depth - b.depth);

    return { cards, activeIndex };
  }
}
