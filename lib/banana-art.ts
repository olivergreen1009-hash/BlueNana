/** Classic curved banana silhouette — elongated crescent, not a teardrop blob. */

export const BANANA_VIEWBOX = "0 0 44 112";

/** Stem upper-right; tip lower-left; concave inner edge on the left. */
export const BANANA_BODY_PATH =
  "M 31 8 C 34 6 36 9 35.5 13 C 39 24 39.5 52 36.5 78 C 34 96 26 107 15 106 C 9 105 8 97 11 87 C 14 72 17 48 21 28 C 24 16 27 10 29 9 C 30 8 31 8 Z";

export const BANANA_STEM_PATH =
  "M 30 5 C 34 3 37 6 36 10 C 35 11 33 10 32 9 C 31 7 30 6 30 5 Z";

/** Yellow tapered tip at the lower-left end. */
export const BANANA_TIP_PATH =
  "M 10 100 C 7 103 6 106 9 107 C 12 108 16 106 18 102 C 16 99 13 98 10 100 Z";

/** Subtle highlight along the outer convex edge. */
export const BANANA_HIGHLIGHT_PATH =
  "M 35 20 C 37 42 36 68 32 90";

export const BANANA_BLUE = "#1A5AD7";
export const BANANA_BLUE_DARK = "#1447B3";
export const BANANA_STEM = "#5C3D1E";
export const BANANA_TIP = "#FFE566";
export const BANANA_TIP_YELLOW = BANANA_TIP;
export const BANANA_FACE = "#0f3d7a";
export const HEART_YELLOW = "#FACC15";

/** Face on the inner (concave) side of the curve. */
export const BANANA_SMILE_PATH = "M 13 66 Q 19 71 25 66";

export const BANANA_EYES = [
  { cx: 14, cy: 60, r: 1.7 },
  { cx: 22, cy: 62, r: 1.7 },
] as const;

export const HEART_PATH =
  "M 12 21 C 12 21 4 14 4 9.5 C 4 6.5 6.5 4 9.5 4 C 11 4 12 4.8 12 4.8 C 12 4.8 13 4 14.5 4 C 17.5 4 20 6.5 20 9.5 C 20 14 12 21 12 21 Z";

/** Heart anchored beside the stem (logo / hero). */
export const BANANA_HEART_TRANSFORM = "translate(26, 8) scale(0.36)";

export type BananaVariant = "logo" | "hero" | "standing" | "inline" | "default";

export const BANANA_VARIANTS: Record<
  BananaVariant,
  { width: number; height: number; transform?: string; showHeart?: boolean }
> = {
  logo: { width: 28, height: 32, transform: "rotate(-28 22 56)", showHeart: true },
  hero: { width: 118, height: 148, transform: "rotate(14 22 56)", showHeart: true },
  standing: { width: 72, height: 120, transform: "rotate(6 22 56)", showHeart: false },
  inline: { width: 36, height: 52, transform: "rotate(-12 22 56)", showHeart: false },
  default: { width: 64, height: 88, showHeart: false },
};

export const BANANA_STEM_BLUE = BANANA_STEM;
