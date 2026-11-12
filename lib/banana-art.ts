/** Shared curved-banana silhouette (crescent arc, not a round blob). */

export const BANANA_VIEWBOX = "0 0 64 64";

/** Blue banana body — stem end upper-right, tip lower-left, concave inner edge. */
export const BANANA_BODY_PATH =
  "M 52 10 C 58 8 60 14 58 18 C 64 30 62 46 50 56 C 38 64 20 62 10 50 C 5 44 6 34 14 28 C 22 22 38 20 47 14 C 50 12 51 11 52 10 Z";

/** Darker stem cap at the top of the fruit. */
export const BANANA_STEM_PATH =
  "M 52 8 C 56 5 60 7 59 12 L 55 14 C 54 10 53 9 52 8 Z";

export const BANANA_BLUE = "#3B82F6";
export const BANANA_STEM_BLUE = "#2563EB";
export const BANANA_FACE = "#1e4a7a";
export const HEART_YELLOW = "#FFE566";

/** Gentle smile on the upper inner curve of the banana. */
export const BANANA_SMILE_PATH = "M 22 36 Q 28 42 36 36";

export const BANANA_EYES = [
  { cx: 26, cy: 30, rx: 2.2, ry: 2.8 },
  { cx: 36, cy: 30, rx: 2.2, ry: 2.8 },
] as const;

/** Small yellow heart beside the stem (logo mark). */
export const HEART_PATH =
  "M 12 21 C 12 21 4 14 4 9.5 C 4 6.5 6.5 4 9.5 4 C 11 4 12 4.8 12 4.8 C 12 4.8 13 4 14.5 4 C 17.5 4 20 6.5 20 9.5 C 20 14 12 21 12 21 Z";
