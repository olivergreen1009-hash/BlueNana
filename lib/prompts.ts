export type KindnessFilter =
  | "all"
  | "five_min"
  | "low_energy"
  | "free"
  | "solo"
  | "together";

export type KindnessPrompt = {
  text: string;
  tags: Exclude<KindnessFilter, "all">[];
};

export const KINDNESS_PROMPTS: KindnessPrompt[] = [
  {
    text: "Send a genuine thank-you to someone whose work often goes unnoticed.",
    tags: ["five_min", "low_energy", "free", "solo"],
  },
  {
    text: "Hold the door and make eye contact with the person behind you.",
    tags: ["five_min", "low_energy", "free", "solo", "together"],
  },
  {
    text: "Text someone you haven't spoken to in a while and ask how they're really doing.",
    tags: ["five_min", "low_energy", "free", "solo"],
  },
  {
    text: "Leave a kind note for a neighbor or coworker.",
    tags: ["five_min", "low_energy", "free", "solo"],
  },
  {
    text: "Offer to help someone carry something heavy.",
    tags: ["five_min", "free", "solo", "together"],
  },
  {
    text: "Compliment a stranger's effort (not just their appearance).",
    tags: ["five_min", "low_energy", "free", "solo", "together"],
  },
  {
    text: "Let someone go ahead of you in line.",
    tags: ["five_min", "low_energy", "free", "solo", "together"],
  },
  {
    text: "Share a useful resource or tip with someone who could use it.",
    tags: ["five_min", "low_energy", "free", "solo"],
  },
  {
    text: "Check on an older neighbor with a simple, no-pressure visit or call.",
    tags: ["five_min", "low_energy", "free", "solo", "together"],
  },
  {
    text: "Pick up litter in a small area you walk through regularly.",
    tags: ["five_min", "free", "solo"],
  },
];

export const FILTER_LABELS: Record<KindnessFilter, string> = {
  all: "All",
  five_min: "5 min",
  low_energy: "Low energy",
  free: "Free",
  solo: "Solo",
  together: "Together",
};

export const FILTERS: KindnessFilter[] = [
  "five_min",
  "low_energy",
  "free",
  "solo",
  "together",
];

export function promptsForFilter(filter: KindnessFilter): KindnessPrompt[] {
  if (filter === "all") return KINDNESS_PROMPTS;
  return KINDNESS_PROMPTS.filter((p) => p.tags.includes(filter));
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
