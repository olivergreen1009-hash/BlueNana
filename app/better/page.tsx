"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { IconHelp, IconLightbulbOutline, IconPeople } from "@/components/icons";
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

const PROBLEM_MAX = 200;

export default function BetterPage() {
  const router = useRouter();
  const [problem, setProblem] = useState("");
  const [who, setWho] = useState<WhoAffects | "">("");
  const [showInspiration, setShowInspiration] = useState(false);

  const continueNext = () => {
    const trimmed = problem.trim();
    if (!trimmed || !who) return;
    setBetterProblem(trimmed);
    setBetterWho(who);
    router.push("/better/solutions");
  };

  return (
    <PageShell
      header="better"
      showLogo={false}
      helpSlot={
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 text-[#1A5AD7]"
          aria-label="Help"
        >
          <IconHelp size={20} />
        </button>
      }
    >
      <h1 className="text-xl font-bold leading-snug text-slate-900">
        What&apos;s a small frustration you&apos;ve noticed?
      </h1>

      <label className="relative mt-5 block">
        <textarea
          value={problem}
          onChange={(e) =>
            setProblem(e.target.value.slice(0, PROBLEM_MAX))
          }
          rows={5}
          placeholder="Type your frustration here..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none focus:ring-2 focus:ring-sky-200"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-slate-400">
          {problem.length}/{PROBLEM_MAX}
        </span>
      </label>

      <button
        type="button"
        onClick={() => setShowInspiration((v) => !v)}
        className="mt-4 flex w-full items-start gap-2 text-left"
      >
        <IconLightbulbOutline
          size={22}
          className="mt-0.5 shrink-0 text-[#1A5AD7]"
        />
        <span>
          <span className="font-semibold text-[#1A5AD7]">Need inspiration?</span>
          <span className="mt-1 block text-sm text-slate-500">
            Think about daily tasks, moments, or situations that feel harder than
            they should.
          </span>
        </span>
      </button>

      {showInspiration ? (
        <ul className="mt-2 space-y-1 rounded-xl border border-sky-100 bg-sky-50/50 p-3 text-sm text-slate-600">
          {INSPIRATION_STARTERS.map((line) => (
            <li key={line}>
              <button
                type="button"
                className="text-left hover:text-[#1A5AD7]"
                onClick={() => setProblem(line)}
              >
                {line}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <fieldset className="mt-6">
        <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
          <IconPeople size={18} className="text-[#1A5AD7]" />
          Who it affects:
        </legend>
        <div className="flex flex-col gap-2">
          {WHO_OPTIONS.map((option) => {
            const active = who === option;
            const id = `who-${option}`;
            return (
              <label
                key={option}
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                  active
                    ? "border-[#1A5AD7] bg-sky-50/50"
                    : "border-slate-200 bg-white hover:border-sky-200"
                }`}
              >
                <input
                  id={id}
                  type="radio"
                  name="who"
                  checked={active}
                  onChange={() => setWho(option)}
                  className="h-4 w-4 accent-[#1A5AD7]"
                />
                <span className="text-sm font-medium text-slate-800">
                  {WHO_AFFECTS_LABELS[option]}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        disabled={!problem.trim() || !who}
        onClick={continueNext}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FACC15] px-4 py-3.5 text-sm font-bold text-slate-900 shadow-sm disabled:opacity-40 hover:bg-[#eab308]"
      >
        Continue to solutions
        <span aria-hidden>→</span>
      </button>
    </PageShell>
  );
}
