"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, type ComponentType } from "react";
import { PageShell } from "@/components/PageShell";
import { SuggestionCard } from "@/components/SuggestionCard";
import {
  IconBattery,
  IconClock,
  IconHeart,
  IconPencil,
  IconPeople,
  IconPerson,
  IconRefresh,
  IconSparkles,
  IconTag,
} from "@/components/icons";
import {
  FILTER_LABELS,
  FILTERS,
  type KindnessFilter,
  promptsForFilter,
} from "@/lib/prompts";
import { addLittleWin, addSavedIdea } from "@/lib/storage";

const FILTER_ICONS: Record<
  Exclude<KindnessFilter, "all">,
  ComponentType<{ className?: string; size?: number }>
> = {
  five_min: IconClock,
  low_energy: IconBattery,
  free: IconTag,
  solo: IconPerson,
  together: IconPeople,
};

function nextUnshownIndex(
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

export default function GoodPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<KindnessFilter>("five_min");
  const pool = useMemo(() => promptsForFilter(filter), [filter]);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState<Set<number>>(() => new Set([0]));
  const [toast, setToast] = useState<string | null>(null);

  const current = pool[index];

  const resetForFilter = useCallback((nextFilter: KindnessFilter) => {
    setFilter(nextFilter);
    setIndex(0);
    setShown(new Set([0]));
    setToast(null);
  }, []);

  const anotherIdea = () => {
    if (!pool.length) return;
    const next = nextUnshownIndex(pool.length, shown, index);
    setIndex(next);
    setShown((prev) => {
      const copy = new Set(prev);
      copy.add(next);
      return copy;
    });
    setToast(null);
  };

  if (!current) {
    return (
      <PageShell header="good">
        <p className="text-center text-slate-600">No prompts in this filter.</p>
        <Link href="/" className="mt-4 text-center text-[#1A5AD7]">
          ← Home
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell header="good" showLogo={false}>
      <div className="relative mb-6 flex items-center justify-center">
        <h1 className="text-center text-xl font-bold text-[#1A5AD7]">
          Do a Little Good
        </h1>
        <span className="absolute left-0 right-0 top-1/2 -z-10 h-px bg-sky-100" aria-hidden />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-2">
          <IconHeart size={18} className="text-[#1A5AD7]" />
        </span>
      </div>

      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => {
          const FIcon = FILTER_ICONS[f as Exclude<KindnessFilter, "all">];
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => resetForFilter(f)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                active
                  ? "border-[#1A5AD7] bg-[#1A5AD7] text-white"
                  : "border-sky-200 bg-white text-[#1A5AD7] hover:bg-sky-50"
              }`}
            >
              <FIcon size={14} />
              {FILTER_LABELS[f]}
            </button>
          );
        })}
      </div>

      <SuggestionCard body={current.text} />

      {toast ? (
        <p className="mt-4 rounded-xl bg-sky-50 px-3 py-2 text-center text-sm text-[#1A5AD7] ring-1 ring-sky-100">
          {toast}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-2.5">
        <ActionButton
          primary
          onClick={() => {
            addLittleWin(current.text, "good");
            setToast("Nice—you logged this in My Little Wins.");
          }}
          icon={<IconSparkles size={18} />}
        >
          Try this
        </ActionButton>
        <ActionButton onClick={anotherIdea} icon={<IconRefresh size={18} />}>
          Another idea
        </ActionButton>
        <ActionButton
          onClick={() => {
            addSavedIdea(current.text, "good");
            setToast("Saved to Ideas for when you're ready.");
          }}
          icon={<IconPencil size={18} />}
        >
          Make it my own
        </ActionButton>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-1 w-full py-2 text-center text-sm text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-slate-700"
        >
          Not today
        </button>
      </div>
    </PageShell>
  );
}

function ActionButton({
  children,
  onClick,
  primary,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold transition ${
        primary
          ? "bg-[#1A5AD7] text-white hover:bg-[#1550c4]"
          : "border-2 border-[#1A5AD7] bg-white text-[#1A5AD7] hover:bg-sky-50"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
