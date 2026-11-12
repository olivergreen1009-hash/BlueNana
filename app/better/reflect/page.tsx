"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { PageShell } from "@/components/PageShell";
import {
  addLittleWin,
  addSavedIdea,
  clearBetterFlow,
  getBetterFlowAttempt,
  getBetterProblem,
  subscribeBetterSession,
} from "@/lib/storage";

type Outcome = "tried" | "later" | "different" | "";

export default function ReflectPage() {
  const router = useRouter();
  const attempt = useSyncExternalStore(
    subscribeBetterSession,
    getBetterFlowAttempt,
    () => "",
  );
  const [outcome, setOutcome] = useState<Outcome>("");
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!getBetterFlowAttempt() && !getBetterProblem()) {
      router.replace("/better");
    }
  }, [router, attempt]);

  const saveProgress = () => {
    const base = attempt.trim();
    if (!base) return;

    if (outcome === "tried") {
      addLittleWin(base, "better", reflection);
      clearBetterFlow();
      setSaved(true);
      router.push("/wins");
      return;
    }

    if (outcome === "later" || outcome === "different") {
      addSavedIdea(
        outcome === "different"
          ? `${base} (want to try something different)`
          : base,
        "better",
      );
      clearBetterFlow();
      setSaved(true);
      if (outcome === "different") {
        router.push("/better");
      } else {
        router.push("/ideas");
      }
    }
  };

  return (
    <PageShell showBanana bananaSize="sm">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-sky-600">
        Step 3 of 3
      </p>
      <h1 className="mt-2 text-center text-2xl font-bold text-sky-950">
        Every little try matters.
      </h1>

      {attempt ? (
        <p className="mt-4 rounded-xl bg-white px-3 py-2 text-sm text-slate-600 ring-1 ring-sky-100">
          {attempt}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-2">
        {(
          [
            ["tried", "I tried it!"],
            ["later", "I'll try it later"],
            ["different", "I want to try something different"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setOutcome(value)}
            className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
              outcome === value
                ? "bg-sky-600 text-white"
                : "bg-white text-sky-900 ring-1 ring-sky-100 hover:bg-sky-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-slate-700">
          Reflection (optional)
        </span>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          placeholder="How did it go? What did you notice?"
          className="mt-2 w-full rounded-xl border border-sky-100 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-300"
        />
      </label>

      <button
        type="button"
        disabled={!outcome || saved}
        onClick={saveProgress}
        className="mt-6 w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-sky-700"
      >
        Save my progress
      </button>

      <p className="mt-6 text-center text-sm leading-relaxed text-slate-500">
        Your experience matters, even when things don&apos;t go as planned.
      </p>

      <Link
        href="/"
        className="mt-4 block text-center text-sm font-medium text-sky-700"
      >
        Back to Home
      </Link>
    </PageShell>
  );
}
