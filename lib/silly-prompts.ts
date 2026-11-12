import { randomComboIndex } from "@/lib/mix-and-bump";

export const SILLY_PROMPTS: readonly string[] = [
  "Draw a silly animal for five minutes.",
  "Invent a new use for a paperclip.",
  "Name three ordinary things that look slightly funny right now.",
  "Give an inanimate object a nickname.",
  "Pretend you're a tour guide for your kitchen.",
  "Make up a one-line slogan for your socks.",
  "Describe your day as if you're a nature documentary narrator.",
  "Find something blue and applaud it quietly.",
  "Write a haiku about waiting for water to boil.",
  "Imagine your chair is a spaceship—what's the mission?",
  "List five sounds you can hear from where you sit.",
  "Create a superhero whose power is being pleasantly on time.",
  "Sketch a logo for an imaginary club.",
  "Rename today using only food words.",
  'Whisper "thank you" to something that helped you today.',
  "Hum a made-up theme song for brushing your teeth.",
  "Pick a household object and introduce it like a celebrity.",
  "Draw a face on your fingertip and have it say hello.",
  "Make up a breaking news headline about something tiny.",
  "Assign a royal title to the nearest plant or snack.",
];

export function sillyPromptAt(index: number): string {
  return SILLY_PROMPTS[index] ?? SILLY_PROMPTS[0];
}

export function nextSillyPromptIndex(
  shown: Set<number>,
  current: number,
): number {
  return randomComboIndex(SILLY_PROMPTS.length, shown, current);
}
