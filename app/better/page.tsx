"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { INSPIRATION_STARTERS, WHO_AFFECTS_LABELS } from "@/lib/prompts";
import {
  setBetterProblem,
  setBetterWho,
  type WhoAffects,
} from "@/lib/storage";

const WHO_OPTIONS: WhoAffects[] = [
  "myself",
  "someone",
  "community",
  "other",
];

export default function BetterPage() {
  const router = useRouter();
  const [problem, setProblem] = useState("");
  const [who, setWho] = useState<WhoAffects | "">("");

  const continueNext = () => {
    const trimmed = problem.trim();
    if (!trimmed || !who) return;
    setBetterProblem(trimmed);
    setBetterWho(who);
    router.push("/better/solutions");
  };

  return (
    <PageShell showBanana bananaSize="sm">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-sky-600">
        Step 1 of 3
      </p>
      <h1 className="mt-2 text-center text-xl font-bold text-sky-950">
        What&apos;s a small frustration you&apos;ve noticed?
      </h1>

      <label className="mt-6 block">
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={4}
          placeholder="Describe it in your own words…"
          className="mt-1 w-full rounded-xl border border-sky-100 bg-white px-3 py-3 text-base text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-sky-300"
        />
      </label>

      <details className="mt-3 rounded-xl border border-sky-100 bg-sky-50/50 px-3 py-2">
        <summary className="cursor-pointer text-sm font-medium text-sky-800">
          Need inspiration?
        </summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          {INSPIRATION_STARTERS.map((line) => (
            <li key={line}>
              <button
                type="button"
                className="text-left hover:text-sky-800"
                onClick={() => setProblem(line)}
              >
                {line}
              </button>
            </li>
          ))}
        </ul>
      </details>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-slate-700">
          Who it affects
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {WHO_OPTIONS.map((option) => {
            const active = who === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setWho(option)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-sky-600 text-white"
                    : "bg-white text-slate-600 ring-1 ring-sky-100 hover:bg-sky-50"
                }`}
              >
                {WHO_AFFECTS_LABELS[option]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        disabled={!problem.trim() || !who}
        onClick={continueNext}
        className="mt-8 w-full rounded-xl bg-[#FFE566] px-4 py-3.5 text-sm font-semibold text-sky-950 shadow-sm disabled:opacity-40 hover:bg-[#f5d955]"
      >
        Continue to solutions
      </button>
    </PageShell>
  );
}
