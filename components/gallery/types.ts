import type { SpiralProjectPhoto } from "@/data/projects";

export type SpiralItem = SpiralProjectPhoto;

export interface SpiralAccentColors {
  primary: string;
  flare: string;
  fringeCyan: string;
  fringeMagenta: string;
  border: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
}

export interface SpiralCornerLabels {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
}

export interface SpiralConfig {
  photoWidth: number;
  photoAspectRatio: number; // width / height
  imageSpacing: number; // angular spacing in radians between items
  spiralRadius: number;
  turnHeight: number; // vertical travel per full 2π revolution
  spiralDepth: number; // z-depth multiplier
  perspective: number; // camera focal length
  tilt: number; // subtle x-axis tilt in radians
  backFaceOpacity: number; // minimum opacity on far side
  edgeFlareIntensity: number; // 0..1.5
  smearIntensity: number; // 0..1.5
  chromaticFringeIntensity: number; // 0..1.5
  waveAmplitude: number; // subtle organic vertical wave
  rotationSensitivity: number; // multiplier for user input
  autoplaySpeed: number; // radians per second
  accentColors: SpiralAccentColors;
  cornerLabels: SpiralCornerLabels;
}

export const DEFAULT_SPIRAL_CONFIG: SpiralConfig = {
  photoWidth: 270,
  photoAspectRatio: 1.42,
  imageSpacing: 0.72,
  spiralRadius: 310,
  turnHeight: 330,
  spiralDepth: 1,
  perspective: 980,
  tilt: 0.08,
  backFaceOpacity: 0.2,
  edgeFlareIntensity: 0.9,
  smearIntensity: 0.85,
  chromaticFringeIntensity: 0.8,
  waveAmplitude: 8,
  rotationSensitivity: 1,
  autoplaySpeed: 0.26,
  accentColors: {
    primary: "#D7FF48",
    flare: "#F6FFD1",
    fringeCyan: "#4DE8FF",
    fringeMagenta: "#FF4D8D",
    border: "#282B30",
    surface: "#15171B",
    textPrimary: "#F2F2ED",
    textSecondary: "#A1A4AA",
  },
  cornerLabels: {
    topLeft: "REEL FLUX // 3D SPIRAL",
    topRight: "CANVAS 2D ENGINE",
    bottomLeft: "DRAG · WHEEL · ARROWS",
    bottomRight: "SELECTED WORKS",
  },
};

export interface ProjectedCard {
  index: number;
  item: SpiralItem;
  theta: number;
  screenX: number;
  screenY: number;
  width: number;
  height: number;
  foreshortenX: number;
  scale: number;
  depth: number; // normalized -1 (far) to +1 (front)
  opacity: number;
  edgeZone: number; // 0..1 peak at left/right helix limbs
  edgeSide: -1 | 1; // -1 left limb, +1 right limb
  tangentX: number;
  tangentY: number;
  isFront: boolean;
  isFocused: boolean;
}

export type ImageLoadStatus = "idle" | "loading" | "loaded" | "error";

export interface LoadedImageEntry {
  status: ImageLoadStatus;
  image: HTMLImageElement | null;
}
