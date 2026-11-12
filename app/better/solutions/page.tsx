"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { PageShell } from "@/components/PageShell";
import { IMPROVEMENT_SOLUTIONS } from "@/lib/prompts";
import {
  addLittleWin,
  addSavedIdea,
  getBetterProblem,
  setBetterSolution,
} from "@/lib/storage";

function subscribeSession(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("pageshow", handler);
  return () => window.removeEventListener("pageshow", handler);
}

export default function SolutionsPage() {
  const router = useRouter();
  const problem = useSyncExternalStore(
    subscribeSession,
    getBetterProblem,
    () => "",
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    if (!getBetterProblem()) router.replace("/better");
  }, [router]);

  const selectedSolution = IMPROVEMENT_SOLUTIONS.find((s) => s.id === selected);

  const tryImprovement = () => {
    if (!selectedSolution || !problem) return;
    const text = `${problem} — ${selectedSolution.title}: ${selectedSolution.description}`;
    setBetterSolution(selectedSolution.id);
    addLittleWin(text, "better");
    router.push("/better/reflect");
  };

  return (
    <PageShell showBanana={false}>
      <div className="mb-2 flex items-center justify-between">
        <Link href="/better" className="text-sm text-sky-700">
          ← Back
        </Link>
        <h1 className="text-lg font-semibold text-sky-950">Explore solutions</h1>
        <span className="w-12" />
      </div>

      {problem ? (
        <p className="mb-4 rounded-xl bg-white px-3 py-2 text-sm text-slate-600 ring-1 ring-sky-100">
          <span className="font-medium text-slate-800">You named: </span>
          {problem}
        </p>
      ) : null}

      <ul className="flex flex-col gap-3">
        {IMPROVEMENT_SOLUTIONS.map((s) => {
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
                <p className="mt-1 text-sm text-slate-600">{s.description}</p>
              </button>
            </li>
          );
        })}
      </ul>

      {savedToast ? (
        <p className="mt-4 text-center text-sm text-sky-800">Saved to Ideas.</p>
      ) : null}

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          disabled={!selectedSolution}
          onClick={tryImprovement}
          className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Try this improvement
        </button>
        <button
          type="button"
          disabled={!selectedSolution || !problem}
          onClick={() => {
            if (!selectedSolution) return;
            addSavedIdea(`${problem} — ${selectedSolution.title}`, "better");
            setSavedToast(true);
          }}
          className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-sky-900 ring-1 ring-sky-100"
        >
          Save idea for later
        </button>
      </div>
    </PageShell>
  );
}
