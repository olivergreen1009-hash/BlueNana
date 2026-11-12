/** Shared curved-banana silhouette — crescent arc, not a teardrop or berry blob. */

export const BANANA_VIEWBOX = "0 0 80 80";

export const BANANA_BLUE = "#1A5AD7";
export const BANANA_BLUE_DARK = "#1447B3";
export const BANANA_FACE = "#0f2d5c";
export const HEART_YELLOW = "#FACC15";
export const BANANA_TIP_YELLOW = "#FFE566";

/**
 * Crescent body: stem upper-right, tip lower-left, concave inner edge on the left.
 */
export const BANANA_BODY_PATH =
  "M 54 8 C 63 10 71 22 69 36 C 65 52 48 68 26 66 C 18 65 12 58 16 50 C 22 38 38 24 48 14 C 52 10 54 8 54 8 Z";

/** Darker stem nub at the top-right. */
export const BANANA_STEM_PATH =
  "M 54 6 C 59 4 63 6 62 11 L 58 13 C 57 9 56 7 54 6 Z";

/** Yellow tip accent at the lower-left end. */
export const BANANA_TIP_PATH =
  "M 16 50 C 14 54 16 62 22 66 C 18 62 16 56 16 50 Z";

export const BANANA_SMILE_PATH = "M 30 46 Q 38 52 48 46";

export const BANANA_EYES = [
  { cx: 34, cy: 40, rx: 2.4, ry: 3 },
  { cx: 46, cy: 40, rx: 2.4, ry: 3 },
] as const;

/** Yellow heart floated near the stem (logo / hero). */
export const HEART_PATH =
  "M 62 18 C 62 18 54 11 54 6.5 C 54 3.5 56.5 1 59.5 1 C 61 1 62 1.8 62 1.8 C 62 1.8 63 1 64.5 1 C 67.5 1 70 3.5 70 6.5 C 70 11 62 18 62 18 Z";

export const HEART_POSITION = { x: 52, y: 0, scale: 0.42 } as const;
