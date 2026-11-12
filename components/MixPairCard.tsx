import {
  emojiForAnimal,
  emojiForStuff,
  pairComboLabel,
  type MixPair,
} from "@/lib/mix-and-bump";

type MixPairCardProps = {
  pair: MixPair;
  flipKey?: number;
};

export function MixPairCard({ pair, flipKey = 0 }: MixPairCardProps) {
  const label = pairComboLabel(pair);

  return (
    <div className="grid grid-cols-2 gap-3" aria-label={label}>
      <div
        key={`animal-${flipKey}`}
        className="mix-pair-reveal flex flex-col items-center rounded-2xl border border-bluenana/20 bg-[#EEF4FD]/80 px-3 py-5 shadow-[0_2px_12px_rgba(26,90,215,0.08)]"
      >
        <span className="text-5xl leading-none sm:text-6xl" aria-hidden>
          {emojiForAnimal(pair.animal)}
        </span>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-bluenana">
          Animal
        </p>
        <p className="mt-1 text-center text-sm font-bold text-slate-900">
          {pair.animal}
        </p>
      </div>
      <div
        key={`stuff-${flipKey}`}
        className="mix-pair-reveal flex flex-col items-center rounded-2xl border border-[#FACC15]/50 bg-[#FFF8DB]/70 px-3 py-5 shadow-[0_2px_12px_rgba(250,204,21,0.15)]"
        style={{ animationDelay: "0.06s" }}
      >
        <span className="text-5xl leading-none sm:text-6xl" aria-hidden>
          {emojiForStuff(pair.stuff)}
        </span>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-amber-700">
          Stuff
        </p>
        <p className="mt-1 text-center text-sm font-bold text-slate-900">
          {pair.stuff}
        </p>
      </div>
    </div>
  );
}
