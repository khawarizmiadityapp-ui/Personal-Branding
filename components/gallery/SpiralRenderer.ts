import { EdgeEffects } from "./EdgeEffects";
import type { ImageLoader } from "./ImageLoader";
import type { ProjectedCard, SpiralConfig } from "./types";

/**
 * Canvas 2D renderer for the 3D Spiral Image Gallery.
 * Renders subtle helix guide geometry, depth-sorted project photographs,
 * REEL FLUX edge treatments, crisp metadata overlays, and corner HUD labels.
 */
export class SpiralRenderer {
  private edgeEffects = new EdgeEffects();

  render(
    ctx: CanvasRenderingContext2D,
    viewportWidth: number,
    viewportHeight: number,
    cards: ProjectedCard[],
    velocity: number,
    config: SpiralConfig,
    imageLoader: ImageLoader,
    activeIndex: number,
    totalItems: number
  ) {
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);

    // Subtle atmospheric vignette + central helix guide
    this.renderBackdrop(ctx, viewportWidth, viewportHeight, config);

    // Render depth-sorted cards (back -> front)
    for (const card of cards) {
      this.renderCard(ctx, card, velocity, config, imageLoader);
    }

    // Minimal editorial corner labels
    this.renderCornerLabels(ctx, viewportWidth, viewportHeight, config, activeIndex, totalItems);
  }

  private renderBackdrop(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    config: SpiralConfig
  ) {
    const cx = w * 0.5;
    const cy = h * 0.5;

    // Subtle center ambient depth
    const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.62);
    bgGrad.addColorStop(0, "rgba(28, 31, 36, 0.45)");
    bgGrad.addColorStop(0.55, "rgba(15, 17, 21, 0.25)");
    bgGrad.addColorStop(1, "rgba(9, 10, 12, 0)");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle vertical spine & elliptical orbital ring guide
    ctx.save();
    ctx.strokeStyle = "rgba(40, 43, 48, 0.55)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(cx, 36);
    ctx.lineTo(cx, h - 36);
    ctx.stroke();

    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.ellipse(
      cx,
      cy,
      Math.min(config.spiralRadius * 1.02, w * 0.44),
      Math.max(44, config.spiralRadius * 0.2),
      0,
      0,
      Math.PI * 2
    );
    ctx.stroke();
    ctx.restore();
  }

  private renderCard(
    ctx: CanvasRenderingContext2D,
    card: ProjectedCard,
    velocity: number,
    config: SpiralConfig,
    imageLoader: ImageLoader
  ) {
    if (card.width < 6 || card.height < 6 || card.opacity < 0.02) return;

    const entry = imageLoader.get(card.item.src);
    const img = entry.status === "loaded" ? entry.image : null;

    // 1. REEL FLUX Motion Smear (behind card)
    this.edgeEffects.renderMotionSmear(ctx, card, img, velocity, config);

    const x = card.screenX - card.width * 0.5;
    const y = card.screenY - card.height * 0.5;

    ctx.save();
    ctx.globalAlpha = card.opacity;

    // Surface base
    ctx.fillStyle = config.accentColors.surface;
    ctx.fillRect(x, y, card.width, card.height);

    // Draw image (cover crop) or editorial fallback when loading/error
    if (img) {
      this.drawCoverImage(ctx, img, x, y, card.width, card.height);
    } else {
      this.drawFallbackCard(ctx, x, y, card, entry.status === "error", config);
    }

    // Subtle dark tonal veil on far-facing cards so front cards command focus
    if (!card.isFront) {
      ctx.fillStyle = `rgba(9, 10, 12, ${(0.52 * (1 - (card.depth + 1) * 0.5)).toFixed(3)})`;
      ctx.fillRect(x, y, card.width, card.height);
    }

    // Crisp editorial border (lime accent on focused front card)
    ctx.strokeStyle = card.isFocused
      ? config.accentColors.primary
      : card.isFront
        ? "rgba(242, 242, 237, 0.24)"
        : config.accentColors.border;
    ctx.lineWidth = card.isFocused ? 1.5 : 1;
    ctx.strokeRect(x, y, card.width, card.height);

    // Subtle bottom metadata strip on front-facing cards
    if (card.isFront && card.width > 95) {
      const stripH = Math.min(34, card.height * 0.22);
      const grad = ctx.createLinearGradient(x, y + card.height - stripH * 1.4, x, y + card.height);
      grad.addColorStop(0, "rgba(9, 10, 12, 0)");
      grad.addColorStop(1, "rgba(9, 10, 12, 0.88)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y + card.height - stripH * 1.4, card.width, stripH * 1.4);

      const fontSize = Math.max(9, Math.min(11, Math.round(10 * card.scale)));
      ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = card.isFocused
        ? config.accentColors.primary
        : config.accentColors.textPrimary;
      ctx.textBaseline = "bottom";
      ctx.fillText(
        `${String(card.index + 1).padStart(2, "0")} · ${card.item.title.toUpperCase()}`,
        x + 10,
        y + card.height - 8,
        Math.max(20, card.width - 20)
      );
    }

    ctx.restore();

    // 2. REEL FLUX Chromatic Fringe
    this.edgeEffects.renderChromaticFringe(ctx, card, velocity, config);

    // 3. REEL FLUX Edge Flare
    this.edgeEffects.renderEdgeFlare(ctx, card, velocity, config);
  }

  private drawCoverImage(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    const imgW = img.naturalWidth || img.width || 1200;
    const imgH = img.naturalHeight || img.height || 840;
    const targetRatio = w / h;
    const sourceRatio = imgW / imgH;

    let sx = 0;
    let sy = 0;
    let sw = imgW;
    let sh = imgH;

    if (sourceRatio > targetRatio) {
      sw = imgH * targetRatio;
      sx = (imgW - sw) * 0.5;
    } else {
      sh = imgW / targetRatio;
      sy = (imgH - sh) * 0.5;
    }

    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  private drawFallbackCard(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    card: ProjectedCard,
    isError: boolean,
    config: SpiralConfig
  ) {
    ctx.fillStyle = "#12151A";
    ctx.fillRect(x, y, card.width, card.height);

    // Minimal diagonal grid line
    ctx.strokeStyle = config.accentColors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + card.width, y + card.height);
    ctx.stroke();

    if (card.width > 90) {
      ctx.fillStyle = isError ? config.accentColors.primary : config.accentColors.textSecondary;
      ctx.font = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "middle";
      ctx.fillText(
        isError ? "ASSET FALLBACK" : "LOADING FRAME",
        x + 12,
        y + card.height * 0.5,
        Math.max(20, card.width - 24)
      );
    }
  }

  private renderCornerLabels(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    config: SpiralConfig,
    activeIndex: number,
    totalItems: number
  ) {
    const padX = w < 640 ? 16 : 24;
    const padY = w < 640 ? 18 : 22;

    ctx.save();
    ctx.font = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillStyle = "rgba(161, 164, 170, 0.78)";

    // Top-left
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(config.cornerLabels.topLeft, padX, padY);

    // Top-right
    ctx.textAlign = "right";
    ctx.fillText(
      `${config.cornerLabels.topRight} · ${String(activeIndex + 1).padStart(2, "0")}/${String(totalItems).padStart(2, "0")}`,
      w - padX,
      padY
    );

    // Bottom labels (hide on very narrow screens to avoid clutter)
    if (w >= 520) {
      ctx.textBaseline = "bottom";
      ctx.textAlign = "left";
      ctx.fillText(config.cornerLabels.bottomLeft, padX, h - padY);

      ctx.textAlign = "right";
      ctx.fillStyle = config.accentColors.primary;
      ctx.fillText(config.cornerLabels.bottomRight, w - padX, h - padY);
    }

    ctx.restore();
  }

  hitTest(cards: ProjectedCard[], x: number, y: number): ProjectedCard | null {
    // Check front-to-back
    for (let i = cards.length - 1; i >= 0; i--) {
      const card = cards[i];
      if (!card.isFront) continue;
      const halfW = card.width * 0.5;
      const halfH = card.height * 0.5;
      if (
        x >= card.screenX - halfW &&
        x <= card.screenX + halfW &&
        y >= card.screenY - halfH &&
        y <= card.screenY + halfH
      ) {
        return card;
      }
    }
    return null;
  }
}
