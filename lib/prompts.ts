export type KindnessFilterChip =
  | "five_min"
  | "low_energy"
  | "free"
  | "solo"
  | "together";

export type KindnessPrompt = {
  text: string;
  timeMinutes: 5 | 15 | 30;
  lowEnergy: boolean;
  free: boolean;
  solo: boolean;
  together: boolean;
};

export const KINDNESS_PROMPTS: KindnessPrompt[] = [
  {
    text: "Send a genuine thank-you to someone whose work often goes unnoticed.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Hold the door and make eye contact with the person behind you.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Text someone you haven't spoken to in a while and ask how they're really doing.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Leave a kind note for a neighbor or coworker.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Offer to help someone carry something heavy.",
    timeMinutes: 5,
    lowEnergy: false,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Compliment a stranger's effort (not just their appearance).",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Let someone go ahead of you in line.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Share a useful resource or tip with someone who could use it.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Check on an older neighbor with a simple, no-pressure visit or call.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Pick up litter in a small area you walk through regularly.",
    timeMinutes: 5,
    lowEnergy: false,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Take three slow breaths before replying to a tense message.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Refill the office water cooler or coffee station.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Send a voice note instead of a rushed text to someone you care about.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Leave a sticky note of encouragement on a mirror at home.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Donate one unused item to a local bin or charity drop.",
    timeMinutes: 15,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Thank a cashier or driver by name if they share it (no need to repeat).",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Share your seat on transit when someone looks tired.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Water a shared plant or tidy a shared space.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Message a colleague one specific thing you appreciated this week.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Walk a neighbor's dog or take out their trash once.",
    timeMinutes: 15,
    lowEnergy: false,
    free: true,
    solo: false,
    together: true,
  },
  {
    text: "Double-check a calendar invite so someone isn't surprised.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Pause before posting online—reply with kindness or skip.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Offer to proofread something short for a friend.",
    timeMinutes: 15,
    lowEnergy: false,
    free: true,
    solo: false,
    together: true,
  },
  {
    text: "Bring an extra snack to share at work or class.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: false,
    together: true,
  },
  {
    text: "Write down one small win from today (keep private).",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Clear expired food from a shared fridge.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: true,
  },
  {
    text: "Ask someone new a genuine question about their day.",
    timeMinutes: 5,
    lowEnergy: false,
    free: true,
    solo: false,
    together: true,
  },
  {
    text: "Turn off notifications for one hour to be present with someone.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "Return a lost item you found to a front desk or desk.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
  {
    text: "End the day by naming one thing you're grateful for out loud.",
    timeMinutes: 5,
    lowEnergy: true,
    free: true,
    solo: true,
    together: false,
  },
];

export const FILTER_LABELS: Record<KindnessFilterChip, string> = {
  five_min: "5 min",
  low_energy: "Low energy",
  free: "Free",
  solo: "Solo",
  together: "Together",
};

export const FILTER_CHIPS: KindnessFilterChip[] = [
  "five_min",
  "low_energy",
  "free",
  "solo",
  "together",
];

function matchesChip(prompt: KindnessPrompt, chip: KindnessFilterChip): boolean {
  switch (chip) {
    case "five_min":
      return prompt.timeMinutes <= 5;
    case "low_energy":
      return prompt.lowEnergy;
    case "free":
      return prompt.free;
    case "solo":
      return prompt.solo;
    case "together":
      return prompt.together;
    default:
      return true;
  }
}

export function promptsForFilters(
  selected: KindnessFilterChip[],
): KindnessPrompt[] {
  if (selected.length === 0) return KINDNESS_PROMPTS;
  return KINDNESS_PROMPTS.filter((p) =>
    selected.every((chip) => matchesChip(p, chip)),
  );
}

export type ImprovementSolution = {
  id: string;
  title: string;
  description: string;
};

export const IMPROVEMENT_SOLUTIONS: ImprovementSolution[] = [
  {
    id: "small-step",
    title: "One tiny step today",
    description:
      "Do the smallest possible version of the fix—five minutes, one item, one message.",
  },
  {
    id: "ask-input",
    title: "Ask someone affected",
    description:
      "Check in with one person who feels this problem and listen without fixing yet.",
  },
  {
    id: "remove-friction",
    title: "Remove one friction point",
    description:
      "Find one annoyance you can simplify—fewer steps, clearer label, or better placement.",
  },
  {
    id: "celebrate-existing",
    title: "Notice what already works",
    description:
      "Name something that is going well nearby and build from that small win.",
  },
  {
    id: "pair-up",
    title: "Invite a buddy",
    description:
      "Share the problem with someone who might enjoy tackling it together.",
  },
];

export const WHO_AFFECTS_LABELS: Record<
  "myself" | "someone" | "community" | "other",
  string
> = {
  myself: "Myself",
  someone: "Someone I know",
  community: "My community",
  other: "Other",
};

export const INSPIRATION_STARTERS = [
  "The entryway always ends up cluttered by the door.",
  "Our team meetings run long without clear next steps.",
  "I never remember to drink water during a busy day.",
  "The bus stop feels unsafe after dark.",
];
