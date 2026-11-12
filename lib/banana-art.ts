/** Shared curved-banana silhouette (crescent arc, not a round blob). */

export const BANANA_VIEWBOX = "0 0 64 64";
export const BANANA_STANDING_VIEWBOX = "0 0 80 120";

/** Blue banana body — stem end upper-right, tip lower-left, concave inner edge. */
export const BANANA_BODY_PATH =
  "M 52 10 C 58 8 60 14 58 18 C 64 30 62 46 50 56 C 38 64 20 62 10 50 C 5 44 6 34 14 28 C 22 22 38 20 47 14 C 50 12 51 11 52 10 Z";

/** Darker stem cap at the top of the fruit. */
export const BANANA_STEM_PATH =
  "M 52 8 C 56 5 60 7 59 12 L 55 14 C 54 10 53 9 52 8 Z";

/** Yellow tip at the bottom of the crescent banana. */
export const BANANA_TIP_PATH =
  "M 8 48 C 6 52 8 58 14 56 C 12 52 10 50 8 48 Z";

export const BANANA_BLUE = "#1A5AD7";
export const BANANA_BLUE_LIGHT = "#0066CC";
export const BANANA_STEM_BLUE = "#0f47b8";
export const BANANA_FACE = "#0c2d5c";
export const HEART_YELLOW = "#FACC15";
export const BANANA_TIP_YELLOW = "#FFD700";

/** Gentle smile on the upper inner curve of the banana. */
export const BANANA_SMILE_PATH = "M 22 36 Q 28 42 36 36";

export const BANANA_EYES = [
  { cx: 26, cy: 30, rx: 2.2, ry: 2.8 },
  { cx: 36, cy: 30, rx: 2.2, ry: 2.8 },
] as const;

/** Small yellow heart beside the stem (logo mark). */
export const HEART_PATH =
  "M 12 21 C 12 21 4 14 4 9.5 C 4 6.5 6.5 4 9.5 4 C 11 4 12 4.8 12 4.8 C 12 4.8 13 4 14.5 4 C 17.5 4 20 6.5 20 9.5 C 20 14 12 21 12 21 Z";

/** Standing mascot body (vertical crescent). */
export const STANDING_BODY_PATH =
  "M 40 8 C 48 6 54 14 52 24 C 58 44 52 72 40 88 C 28 98 14 94 10 78 C 6 62 12 42 22 28 C 28 18 34 10 40 8 Z";

export const STANDING_STEM_PATH =
  "M 40 6 C 44 3 50 5 49 12 L 44 14 C 43 9 41 7 40 6 Z";

export const STANDING_TIP_PATH =
  "M 10 82 C 8 88 12 94 18 90 C 14 86 12 84 10 82 Z";

/** Wavy underline SVG path for hero headline (relative width ~200). */
export const WAVY_UNDERLINE_PATH =
  "M 0 8 Q 12 2 24 8 T 48 8 T 72 8 T 96 8 T 120 8";
