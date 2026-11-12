"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SuggestionCard } from "@/components/SuggestionCard";
import {
  FILTER_LABELS,
  type KindnessFilter,
  promptsForFilter,
} from "@/lib/prompts";
import { addLittleWin, addSavedIdea } from "@/lib/storage";

const FILTERS: KindnessFilter[] = ["all", "people", "places", "everyday"];

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
  const [filter, setFilter] = useState<KindnessFilter>("all");
  const pool = useMemo(() => promptsForFilter(filter), [filter]);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState<Set<number>>(() => new Set([index]));
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
      <PageShell>
        <p className="text-center text-slate-600">No prompts in this filter.</p>
        <Link href="/" className="mt-4 text-center text-sky-700">
          ← Home
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell showBanana={false}>
      <div className="mb-2 flex items-center justify-between">
        <Link href="/" className="text-sm text-sky-700">
          ← Home
        </Link>
        <h1 className="text-lg font-semibold text-sky-950">Do a Little Good</h1>
        <span className="w-12" />
      </div>

      <p className="mb-4 text-center text-sm text-slate-500">
        Pick a filter, then choose what feels right today.
      </p>

      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => resetForFilter(f)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "bg-sky-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-sky-100"
            }`}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      <SuggestionCard
        body={current.text}
        meta={`Theme: ${FILTER_LABELS[current.filter]}`}
      />

      {toast ? (
        <p className="mt-4 rounded-xl bg-sky-100 px-3 py-2 text-center text-sm text-sky-900">
          {toast}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-2">
        <ActionButton
          primary
          onClick={() => {
            addLittleWin(current.text, "good");
            setToast("Logged to My Little Wins. Nice.");
          }}
        >
          Try this
        </ActionButton>
        <ActionButton onClick={anotherIdea}>Another idea</ActionButton>
        <ActionButton
          onClick={() => {
            addSavedIdea(current.text, "good");
            setToast("Saved to Ideas for later.");
          }}
        >
          Make it my own
        </ActionButton>
        <ActionButton onClick={() => anotherIdea()} muted>
          Not today
        </ActionButton>
      </div>
    </PageShell>
  );
}

function ActionButton({
  children,
  onClick,
  primary,
  muted,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
        primary
          ? "bg-sky-600 text-white hover:bg-sky-700"
          : muted
            ? "bg-transparent text-slate-500 hover:bg-slate-100"
            : "bg-white text-sky-900 ring-1 ring-sky-100 hover:bg-sky-50"
      }`}
    >
      {children}
    </button>
  );
}
