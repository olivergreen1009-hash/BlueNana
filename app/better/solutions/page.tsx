"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { PageShell } from "@/components/PageShell";
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
  const [selected, setSelected] = useState<string | null>(null);
  const [savedToast, setSavedToast] = useState(false);

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
    setPairIds((prev) => pickPair(IMPROVEMENT_SOLUTIONS, prev[0]));
    setSelected(null);
    setSavedToast(false);
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
    <PageShell showBanana bananaSize="sm">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-sky-600">
        Step 2 of 3
      </p>
      <h1 className="mt-2 text-center text-lg font-semibold text-sky-950">
        Explore solutions
      </h1>

      <p className="mt-4 rounded-xl bg-sky-50 px-3 py-3 text-sm text-slate-700 ring-1 ring-sky-100">
        <span className="font-medium text-slate-900">Your problem: </span>
        {problem}
      </p>

      <ul className="mt-5 flex flex-col gap-3">
        {shownSolutions.map((s) => {
          const active = selected === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setSelected(s.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-sky-400 bg-sky-50 ring-2 ring-sky-200"
                    : "border-sky-100 bg-white hover:border-sky-200"
                }`}
              >
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {savedToast ? (
        <p className="mt-4 text-center text-sm text-sky-800">
          Saved to Ideas—you can find it anytime in the nav.
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          disabled={!selectedSolution}
          onClick={tryImprovement}
          className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-sky-700"
        >
          Try this improvement
        </button>
        <button
          type="button"
          onClick={anotherPair}
          className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-sky-900 ring-1 ring-sky-100 hover:bg-sky-50"
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
            setSavedToast(true);
          }}
          className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-sky-900 ring-1 ring-sky-100 disabled:opacity-40 hover:bg-sky-50"
        >
          Save my idea
        </button>
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
