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
  const maxLen = 200;

  const continueNext = () => {
    const trimmed = problem.trim();
    if (!trimmed || !who) return;
    setBetterProblem(trimmed);
    setBetterWho(who);
    router.push("/better/solutions");
  };

  return (
    <PageShell showBanana bananaSize="sm">
      <h1 className="text-lg font-bold text-slate-900">
        What&apos;s a small frustration you&apos;ve noticed?
      </h1>

      <label className="mt-5 block">
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value.slice(0, maxLen))}
          rows={4}
          placeholder="Type your frustration here…"
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-bluenana/30"
        />
        <span className="mt-1 block text-right text-xs text-slate-400">
          {problem.length}/{maxLen}
        </span>
      </label>

      <div className="mt-3 rounded-xl border border-bluenana/15 bg-[#EEF4FD]/60 px-3 py-3">
        <p className="flex items-center gap-2 text-sm font-medium text-bluenana">
          <span aria-hidden>💡</span> Need inspiration?
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Think about daily tasks, moments, or situations that feel harder than
          they should.
        </p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          {INSPIRATION_STARTERS.slice(0, 3).map((line) => (
            <li key={line}>
              <button
                type="button"
                className="text-left hover:text-bluenana"
                onClick={() => setProblem(line)}
              >
                {line}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <fieldset className="mt-6">
        <legend className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <span aria-hidden>👥</span> Who it affects
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {WHO_OPTIONS.map((option) => {
            const active = who === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setWho(option)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "border-bluenana bg-bluenana/5 text-bluenana ring-1 ring-bluenana/30"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <span
                  className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                    active
                      ? "border-bluenana bg-bluenana"
                      : "border-slate-300"
                  }`}
                  aria-hidden
                />
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
        className="mt-8 w-full rounded-xl bg-[#FACC15] px-4 py-3.5 text-sm font-semibold text-slate-900 shadow-sm disabled:opacity-40 hover:bg-[#EAB308]"
      >
        Continue to solutions →
      </button>
    </PageShell>
  );
}
