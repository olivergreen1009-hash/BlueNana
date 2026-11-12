export type MixPair = {
  animal: string;
  stuff: string;
  sillyName: string;
  tinyAction: string;
  isStarter: boolean;
};

export const STARTER_PAIRS: MixPair[] = [
  {
    animal: "Penguin",
    stuff: "Teapot",
    sillyName: "The Penguin Pourer, who serves tea to everyone on the ice",
    tinyAction:
      "Invite a friend or coworker for a 5-minute tea or water break.",
    isStarter: true,
  },
  {
    animal: "Owl",
    stuff: "Flashlight",
    sillyName: "The Owlight, whose eyes light the way home",
    tinyAction:
      "Offer to walk a coworker to the door at the end of the day.",
    isStarter: true,
  },
  {
    animal: "Elephant",
    stuff: "Umbrella",
    sillyName: "The Umbrellaphant, with an umbrella big enough for a whole class",
    tinyAction:
      "Offer to share your umbrella, or hold the door for someone on a rainy day.",
    isStarter: true,
  },
  {
    animal: "Crocodile",
    stuff: "Vacuum",
    sillyName: "The Crocovac, who gobbles up crumbs and stray socks",
    tinyAction:
      "Tidy one shared space, such as a counter or table, for the next person.",
    isStarter: true,
  },
  {
    animal: "Octopus",
    stuff: "Garden Hose",
    sillyName: "The Octohose, who waters eight plants at once",
    tinyAction: "Water a plant at home or at work.",
    isStarter: true,
  },
  {
    animal: "Giraffe",
    stuff: "Balloon",
    sillyName: "The Lookout Giraffe, who floats up to spot who needs a hello",
    tinyAction: "Say hello to someone who seems to be on their own.",
    isStarter: true,
  },
  {
    animal: "Snail",
    stuff: "Skateboard",
    sillyName: "The Slow-Mo Snail, who rolls down hills at a gentle pace",
    tinyAction:
      "Take the slow way somewhere and notice three things around you.",
    isStarter: true,
  },
  {
    animal: "Kangaroo",
    stuff: "Backpack",
    sillyName: "The Backpack Roo, who carries lunch for the whole class",
    tinyAction: "Bring an extra snack and share it with someone.",
    isStarter: true,
  },
  {
    animal: "Bunny",
    stuff: "Balloon",
    sillyName: "The Cheer-Up Bunny, who floats a balloon to a friend who's had a rough day",
    tinyAction: "Send a short cheer-up message to someone.",
    isStarter: true,
  },
  {
    animal: "Fox",
    stuff: "Flashlight",
    sillyName: "The Trail Fox, who finds a brand-new path after dark",
    tinyAction:
      "Take a different route today, or try a new lunch spot.",
    isStarter: true,
  },
  {
    animal: "Bear Cub",
    stuff: "Umbrella",
    sillyName: "The Steady Bear, who keeps calm under a storm",
    tinyAction:
      "Take three slow breaths before answering your next message.",
    isStarter: true,
  },
  {
    animal: "Puppy",
    stuff: "Skateboard",
    sillyName: "The Zoomy Puppy, who rolls to every friend's door to say hi",
    tinyAction: "Call or text a friend just to say hi.",
    isStarter: true,
  },
  {
    animal: "Kitten",
    stuff: "Garden Hose",
    sillyName: "The Try-It Kitten, who tries to water the whole garden at once",
    tinyAction:
      "Try one small new thing today, like a new drink or a new song.",
    isStarter: true,
  },
  {
    animal: "Penguin",
    stuff: "Backpack",
    sillyName: "The Penguin Packer, who slides lunches to friends across the ice",
    tinyAction: "Write a short thank-you note to someone who helped you.",
    isStarter: true,
  },
  {
    animal: "Owl",
    stuff: "Teapot",
    sillyName: "The Night Owl Tea, which helps everyone settle down for sleep",
    tinyAction:
      "Put your phone away 15 minutes before bed and have a calm drink.",
    isStarter: true,
  },
  {
    animal: "Elephant",
    stuff: "Vacuum",
    sillyName: "The Trunk Vac, who sucks up spills with a long nose",
    tinyAction: "Offer to help someone with a chore.",
    isStarter: true,
  },
  {
    animal: "Crocodile",
    stuff: "Balloon",
    sillyName: "The Calm Croc, who floats gently above a noisy pond",
    tinyAction: "Give someone a genuine compliment about their effort.",
    isStarter: true,
  },
  {
    animal: "Giraffe",
    stuff: "Garden Hose",
    sillyName: "The Leafy Giraffe, who waters the tallest treetops",
    tinyAction: "Offer to help someone carry or reach something.",
    isStarter: true,
  },
  {
    animal: "Octopus",
    stuff: "Backpack",
    sillyName: "The Octopack, with eight pockets for eight friends",
    tinyAction: 'Ask someone, "Is there anything I can help with today?"',
    isStarter: true,
  },
  {
    animal: "Snail",
    stuff: "Teapot",
    sillyName: "The Snail Tea Party, where nobody is in a hurry",
    tinyAction: "Enjoy one drink with no phone in your hand.",
    isStarter: true,
  },
];

export const MIX_ANIMALS = [
  "Penguin",
  "Owl",
  "Elephant",
  "Crocodile",
  "Octopus",
  "Giraffe",
  "Snail",
  "Kangaroo",
  "Bunny",
  "Fox",
  "Bear Cub",
  "Puppy",
  "Kitten",
] as const;

export const MIX_STUFF = [
  "Teapot",
  "Flashlight",
  "Umbrella",
  "Vacuum Cleaner",
  "Garden Hose",
  "Balloon",
  "Skateboard",
  "Backpack",
] as const;

export const MIX_ANIMAL_EMOJI: Record<(typeof MIX_ANIMALS)[number], string> = {
  Penguin: "🐧",
  Owl: "🦉",
  Elephant: "🐘",
  Crocodile: "🐊",
  Octopus: "🐙",
  Giraffe: "🦒",
  Snail: "🐌",
  Kangaroo: "🦘",
  Bunny: "🐰",
  Fox: "🦊",
  "Bear Cub": "🐻",
  Puppy: "🐶",
  Kitten: "🐱",
};

export const MIX_STUFF_EMOJI: Record<(typeof MIX_STUFF)[number], string> = {
  Teapot: "🫖",
  Flashlight: "🔦",
  Umbrella: "☂️",
  "Vacuum Cleaner": "🧹",
  "Garden Hose": "💧",
  Balloon: "🎈",
  Skateboard: "🛹",
  Backpack: "🎒",
};

const GENERIC_TINY_ACTION =
  "Do something small and kind that your Mix and Bump character might do.";

function pairKey(animal: string, stuff: string): string {
  return `${animal}::${stuff}`;
}

const starterByKey = new Map(
  STARTER_PAIRS.map((p) => [pairKey(p.animal, normalizeStuff(p.stuff)), p]),
);

/** Map starter "Vacuum" labels to deck naming. */
function normalizeStuff(stuff: string): string {
  return stuff === "Vacuum" ? "Vacuum Cleaner" : stuff;
}

function displayStuff(stuff: string): string {
  return stuff === "Vacuum Cleaner" ? "Vacuum" : stuff;
}

export function resolveMixPair(animal: string, stuff: string): MixPair {
  const key = pairKey(animal, stuff);
  const starter = starterByKey.get(key);
  if (starter) {
    return { ...starter, stuff: displayStuff(starter.stuff) };
  }
  return {
    animal,
    stuff: displayStuff(stuff),
    sillyName: `The ${animal} + ${displayStuff(stuff)} friend`,
    tinyAction: GENERIC_TINY_ACTION,
    isStarter: false,
  };
}

export function pairComboLabel(pair: MixPair): string {
  return `${pair.animal} + ${pair.stuff}`;
}

export function emojiForAnimal(animal: string): string {
  return (
    MIX_ANIMAL_EMOJI[animal as (typeof MIX_ANIMALS)[number]] ?? "🐾"
  );
}

export function emojiForStuff(stuff: string): string {
  const normalized = stuff === "Vacuum" ? "Vacuum Cleaner" : stuff;
  return (
    MIX_STUFF_EMOJI[normalized as (typeof MIX_STUFF)[number]] ?? "📦"
  );
}

export function randomComboIndex(
  poolSize: number,
  shown: Set<number>,
  current: number,
): number {
  const remaining: number[] = [];
  for (let i = 0; i < poolSize; i++) {
    if (i !== current && !shown.has(i)) remaining.push(i);
  }
  if (remaining.length === 0) {
    for (let i = 0; i < poolSize; i++) {
      if (i !== current) remaining.push(i);
    }
  }
  return remaining[Math.floor(Math.random() * remaining.length)] ?? 0;
}

/** Random animal+stuff from full deck (64 combos); resolves starter or generic copy. */
export function randomMixPair(): MixPair {
  const animal =
    MIX_ANIMALS[Math.floor(Math.random() * MIX_ANIMALS.length)] ?? "Penguin";
  const stuff =
    MIX_STUFF[Math.floor(Math.random() * MIX_STUFF.length)] ?? "Teapot";
  return resolveMixPair(animal, stuff);
}

/** Shuffle indices for the 20 starter pairs without immediate repeat. */
export function nextStarterIndex(
  shown: Set<number>,
  current: number,
): number {
  return randomComboIndex(STARTER_PAIRS.length, shown, current);
}

export function starterPairAt(index: number): MixPair {
  const raw = STARTER_PAIRS[index] ?? STARTER_PAIRS[0];
  return resolveMixPair(raw.animal, normalizeStuff(raw.stuff));
}

export function winTextForPair(pair: MixPair, inventNote?: string): string {
  const namePart = inventNote?.trim()
    ? `${pair.sillyName} (${inventNote.trim()})`
    : pair.sillyName;
  return `${namePart} — ${pair.tinyAction}`;
}
