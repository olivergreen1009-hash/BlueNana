import {
  emojiForAnimal,
  emojiForStuff,
  pairComboLabel,
  type MixPair,
} from "@/lib/mix-and-bump";

type MixPairCardProps = {
  pair: MixPair;
};

export function MixPairCard({ pair }: MixPairCardProps) {
  const animalEmoji = emojiForAnimal(pair.animal);
  const stuffEmoji = emojiForStuff(pair.stuff);
  const label = pairComboLabel(pair);

  return (
    <article className="rounded-2xl border border-bluenana/15 bg-gradient-to-br from-[#EEF4FD] to-white p-5 shadow-sm">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-bluenana">
        Animal + Stuff
      </p>
      <div
        className="mt-4 flex items-center justify-center gap-3"
        aria-label={label}
      >
        <span className="text-5xl leading-none sm:text-6xl" aria-hidden>
          {animalEmoji}
        </span>
        <span className="text-2xl font-medium text-slate-300" aria-hidden>
          +
        </span>
        <span className="text-5xl leading-none sm:text-6xl" aria-hidden>
          {stuffEmoji}
        </span>
      </div>
      <p className="mt-4 text-center text-lg font-bold text-slate-900">
        {label}
      </p>
    </article>
  );
}
