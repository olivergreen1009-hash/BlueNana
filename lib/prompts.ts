export type KindnessFilter = "all" | "people" | "places" | "everyday";

export type KindnessPrompt = {
  text: string;
  filter: Exclude<KindnessFilter, "all">;
};

export const KINDNESS_PROMPTS: KindnessPrompt[] = [
  {
    text: "Send a genuine thank-you to someone whose work often goes unnoticed.",
    filter: "people",
  },
  {
    text: "Hold the door and make eye contact with the person behind you.",
    filter: "everyday",
  },
  {
    text: "Text someone you haven't spoken to in a while and ask how they're really doing.",
    filter: "people",
  },
  {
    text: "Leave a kind note for a neighbor or coworker.",
    filter: "people",
  },
  {
    text: "Offer to help someone carry something heavy.",
    filter: "everyday",
  },
  {
    text: "Compliment a stranger's effort (not just their appearance).",
    filter: "people",
  },
  {
    text: "Let someone go ahead of you in line.",
    filter: "everyday",
  },
  {
    text: "Share a useful resource or tip with someone who could use it.",
    filter: "people",
  },
  {
    text: "Check on an older neighbor with a simple, no-pressure visit or call.",
    filter: "people",
  },
  {
    text: "Pick up litter in a small area you walk through regularly.",
    filter: "places",
  },
];

export const FILTER_LABELS: Record<KindnessFilter, string> = {
  all: "All",
  people: "People",
  places: "Places",
  everyday: "Everyday",
};

export function promptsForFilter(filter: KindnessFilter): KindnessPrompt[] {
  if (filter === "all") return KINDNESS_PROMPTS;
  return KINDNESS_PROMPTS.filter((p) => p.filter === filter);
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
