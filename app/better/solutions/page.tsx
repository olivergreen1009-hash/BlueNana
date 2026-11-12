"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Banana } from "@/components/Banana";
import { PageShell } from "@/components/PageShell";
import { Toast } from "@/components/Toast";
import { IMPROVEMENT_SOLUTIONS } from "@/lib/prompts";
import {
  addSavedIdea,
  getBetterProblem,
  setBetterAttempt,
  setBetterSolution,
  subscribeBetterSession,
} from "@/lib/storage";

function pickPair(
  pool: typeof IMPROVEMENT_SOLUTIONS,
  avoid?: string,
): [string, string] {
  const ids = pool.map((s) => s.id);
  const first =
    ids.find((id) => id !== avoid) ?? ids[0] ?? IMPROVEMENT_SOLUTIONS[0].id;
  const second =
    ids.find((id) => id !== first && id !== avoid) ??
    ids.find((id) => id !== first) ??
    first;
  return [first, second];
}

export default function SolutionsPage() {
  const router = useRouter();
  const problem = useSyncExternalStore(
    subscribeBetterSession,
    getBetterProblem,
    () => "",
  );
  const [pairIds, setPairIds] = useState<[string, string]>(() =>
    pickPair(IMPROVEMENT_SOLUTIONS),
  );
  const [selected, setSelected] = useState<string | null>(() => pairIds[0]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!problem) router.replace("/better");
  }, [problem, router]);

  const shownSolutions = useMemo(
    () =>
      pairIds
        .map((id) => IMPROVEMENT_SOLUTIONS.find((s) => s.id === id))
        .filter(Boolean) as typeof IMPROVEMENT_SOLUTIONS,
    [pairIds],
  );

  const selectedSolution = shownSolutions.find((s) => s.id === selected);

  const anotherPair = useCallback(() => {
    setPairIds((prev) => {
      const next = pickPair(IMPROVEMENT_SOLUTIONS, prev[0]);
      setSelected(next[0]);
      return next;
    });
    setToast(null);
  }, []);

  const tryImprovement = () => {
    if (!selectedSolution || !problem) return;
    const text = `${problem} — ${selectedSolution.title}: ${selectedSolution.description}`;
    setBetterSolution(selectedSolution.id);
    setBetterAttempt(text);
    router.push("/better/reflect");
  };

  if (!problem) {
    return (
      <PageShell showBanana bananaSize="sm">
        <p className="text-center text-slate-600">Loading…</p>
      </PageShell>
    );
  }

  return (
    <PageShell showLogo={false}>
      <div className="mb-2 flex justify-center">
        <Banana size="md" />
      </div>
      <h1 className="text-center text-xl font-bold text-slate-900">
        Explore solutions
      </h1>
      <p className="mt-1 text-center text-sm text-slate-500">
        Let&apos;s look at ways to make this better.
      </p>

      <article className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="flex items-center gap-2 text-sm font-semibold text-bluenana">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bluenana text-[10px] font-bold text-white">
            i
          </span>
          Problem summary
        </p>
        <p className="mt-3 rounded-xl bg-[#EEF4FD] px-3 py-3 text-sm leading-relaxed text-slate-800">
          <span className="font-semibold text-slate-900">{problem}</span>
        </p>
      </article>

      <h2 className="mt-6 text-sm font-bold text-slate-900">
        Improvement ideas to test
      </h2>
      <p className="text-xs text-slate-500">Pick one to try. You can change it anytime.</p>

      <ul className="mt-4 flex flex-col gap-3">
        {shownSolutions.map((s, idx) => {
          const active = selected === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setSelected(s.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-bluenana bg-[#EEF4FD] ring-1 ring-bluenana/30"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span
                  className={`mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                    idx === 0 ? "bg-bluenana" : "bg-[#FACC15] text-slate-900"
                  }`}
                >
                  {idx + 1}
                </span>
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {toast ? (
        <Toast message={toast} onDismiss={() => setToast(null)} />
      ) : null}

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          disabled={!selectedSolution}
          onClick={tryImprovement}
          className="w-full rounded-xl bg-bluenana px-4 py-3.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-bluenana-dark"
        >
          Try this improvement
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={anotherPair}
            className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-bluenana ring-1 ring-bluenana/30 hover:bg-slate-50"
          >
            Another idea
          </button>
          <button
            type="button"
            disabled={!selectedSolution}
            onClick={() => {
              if (!selectedSolution) return;
              addSavedIdea(
                `${problem} — ${selectedSolution.title}`,
                "better",
              );
              setToast("Saved to Ideas—you can find it anytime in the nav.");
            }}
            className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 ring-2 ring-[#FACC15] disabled:opacity-40 hover:bg-slate-50"
          >
            Save my idea
          </button>
        </div>
        <Link
          href="/better"
          className="py-2 text-center text-sm text-slate-500 hover:text-slate-700"
        >
          ← Edit problem
        </Link>
      </div>
    </PageShell>
  );
}
