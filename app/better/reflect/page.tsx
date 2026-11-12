"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Banana } from "@/components/Banana";
import { PageShell } from "@/components/PageShell";
import { PrivacyHint } from "@/components/PrivacyHint";
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
  const maxLen = 150;

  useEffect(() => {
    if (!getBetterFlowAttempt() && !getBetterProblem()) {
      router.replace("/better");
    }
  }, [router, attempt]);

  const saveWithReflection = (includeReflection: boolean) => {
    const base = attempt.trim();
    if (!base || outcome !== "tried") return;
    const note = includeReflection ? reflection.trim() : "";
    addLittleWin(base, "better", note || undefined);
    clearBetterFlow();
    setSaved(true);
    router.push("/wins");
  };

  const saveProgress = () => {
    const base = attempt.trim();
    if (!base) return;

    if (outcome === "tried") {
      saveWithReflection(true);
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
    <PageShell showLogo={false}>
      <ProgressDots />
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-bluenana">
        Step 3 of 3
      </p>
      <div className="mt-2 flex justify-center">
        <Banana size="md" className="rotate-[-8deg]" />
      </div>
      <h1 className="mt-3 text-center text-2xl font-bold text-slate-900">
        How did it go?
      </h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Whatever you picked is fine. No pressure.
      </p>

      <ReflectCard className="mt-6">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bluenana text-white">
            ✓
          </span>
          What happened when you tried it?
        </p>
        <div className="flex flex-col gap-2">
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
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                outcome === value
                  ? "border-bluenana bg-bluenana/5 text-bluenana"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span
                className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                  outcome === value
                    ? "border-bluenana bg-bluenana"
                    : "border-slate-300"
                }`}
                aria-hidden
              />
              {label}
            </button>
          ))}
        </div>
      </ReflectCard>

      {outcome === "tried" ? (
        <ReflectCard className="mt-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">
              What did you notice?
            </span>
            <p className="mt-0.5 text-xs text-slate-500">Optional—you can skip.</p>
            <PrivacyHint className="mt-2" />
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value.slice(0, maxLen))}
              rows={3}
              placeholder="A small observation, or leave blank…"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bluenana/30"
            />
            <span className="mt-1 block text-right text-xs text-slate-400">
              {reflection.length}/{maxLen}
            </span>
          </label>
          <button
            type="button"
            disabled={saved}
            onClick={() => saveWithReflection(false)}
            className="mt-3 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
          >
            Skip
          </button>
        </ReflectCard>
      ) : null}

      <div className="sticky bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 mt-6 -mx-1 rounded-2xl bg-white/95 px-1 py-2 backdrop-blur-sm">
        <button
          type="button"
          disabled={!outcome || saved}
          onClick={saveProgress}
          className="w-full rounded-xl bg-bluenana px-4 py-3.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-bluenana-dark"
        >
          Save my progress
        </button>
      </div>

      <Link
        href="/"
        className="mt-4 block text-center text-sm font-medium text-bluenana"
      >
        Back to Home
      </Link>
    </PageShell>
  );
}

function ProgressDots() {
  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
            n < 3 ? "bg-bluenana" : "bg-bluenana ring-2 ring-bluenana ring-offset-2"
          }`}
        >
          {n < 3 ? n : "✓"}
        </span>
      ))}
    </div>
  );
}

function ReflectCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
