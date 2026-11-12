"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Toast } from "@/components/Toast";
import { SuggestionCard } from "@/components/SuggestionCard";
import {
  FILTER_LABELS,
  FILTERS,
  type KindnessFilter,
  promptsForFilter,
} from "@/lib/prompts";
import { addLittleWin, addSavedIdea } from "@/lib/storage";

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

const FILTER_ICONS: Record<KindnessFilter, string> = {
  all: "✦",
  five_min: "⏱",
  low_energy: "🔋",
  free: "◎",
  solo: "👤",
  together: "👥",
};

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
      <PageShell showBanana bananaSize="sm" logoSubtitle="Do a Little Good">
        <p className="text-center text-slate-600">No prompts in this filter.</p>
        <Link href="/" className="mt-4 block text-center text-bluenana">
          ← Home
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell
      showBanana
      bananaSize="sm"
      logoSubtitle="Do a Little Good"
    >
      <h1 className="text-center text-xl font-bold text-bluenana">
        Do a Little Good
      </h1>
      <div className="relative my-4 flex items-center justify-center">
        <div className="h-px w-full bg-slate-200" />
        <span className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 20 C12 20 4 13 4 8.5 C 4 5.5 6.5 3 9.5 3 C 11 3 12 3.8 12 3.8 C 12 3.8 13 3 14.5 3 C 17.5 3 20 5.5 20 8.5 C 20 13 12 20 12 20 Z"
              fill="#1A5AD7"
            />
          </svg>
        </span>
      </div>

      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {FILTERS.filter((f) => f !== "all").map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => resetForFilter(f)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "bg-bluenana text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            <span className="text-xs" aria-hidden>
              {FILTER_ICONS[f]}
            </span>
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      <SuggestionCard body={current.text} />

      {toast ? <Toast message={toast} onDismiss={() => setToast(null)} /> : null}

      <div className="mt-6 flex flex-col gap-2">
        <ActionButton
          primary
          onClick={() => {
            addLittleWin(current.text, "good");
            setToast("Nice—you logged this in My Little Wins.");
          }}
        >
          ✨ Try this
        </ActionButton>
        <ActionButton onClick={anotherIdea}>↻ Another idea</ActionButton>
        <ActionButton
          onClick={() => {
            addSavedIdea(current.text, "good");
            setToast("Saved to Ideas for when you're ready.");
          }}
        >
          ✎ Make it my own
        </ActionButton>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-1 w-full py-2 text-center text-sm font-medium text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline"
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
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
        primary
          ? "bg-bluenana text-white hover:bg-bluenana-dark"
          : "bg-white text-bluenana ring-1 ring-bluenana/25 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}
