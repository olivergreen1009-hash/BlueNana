"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Banana } from "@/components/Banana";
import { PageShell } from "@/components/PageShell";
import { IconCheck, IconHeart, IconPencil, IconSave } from "@/components/icons";
import {
  addLittleWin,
  addSavedIdea,
  clearBetterFlow,
  getBetterFlowAttempt,
  getBetterProblem,
  subscribeBetterSession,
} from "@/lib/storage";

type Outcome = "tried" | "later" | "different" | "";

const REFLECT_MAX = 150;

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
    <PageShell header="none" showLogo={false}>
      <StepProgress />

      <div className="mt-4 flex justify-center">
        <Banana size="md" variant="leaning" />
      </div>

      <h1 className="mt-4 text-center text-2xl font-bold text-[#1A5AD7]">
        Every little try matters.
      </h1>
      <p className="mt-2 text-center text-sm text-slate-500">
        Take a moment to reflect. You showed up—that counts.
      </p>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <IconCheck size={20} className="text-[#1A5AD7]" />
          How are you feeling about Step 3?
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          {(
            [
              ["tried", "I tried it!"],
              ["later", "I'll try it later"],
              ["different", "I want to try something different"],
            ] as const
          ).map(([value, label]) => {
            const active = outcome === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setOutcome(value)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "border-[#1A5AD7] bg-sky-50/40"
                    : "border-slate-200 bg-white hover:border-sky-200"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    active
                      ? "border-[#1A5AD7] bg-[#1A5AD7] text-white"
                      : "border-slate-300"
                  }`}
                >
                  {active ? <IconCheck size={12} /> : null}
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <IconPencil size={18} className="text-[#1A5AD7]" />
          Reflection (optional)
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          What did you notice? How are you feeling?
        </p>
        <label className="relative mt-2 block">
          <textarea
            value={reflection}
            onChange={(e) =>
              setReflection(e.target.value.slice(0, REFLECT_MAX))
            }
            rows={4}
            placeholder="Example: I felt nervous, but I gave it a try and that felt good."
            className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-200"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-slate-400">
            {reflection.length}/{REFLECT_MAX}
          </span>
        </label>
      </section>

      <button
        type="button"
        disabled={!outcome || saved}
        onClick={saveProgress}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A5AD7] px-4 py-3.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-[#1550c4]"
      >
        <IconSave size={18} className="text-white" />
        Save my progress
      </button>

      <p className="mt-6 flex items-start justify-center gap-1.5 text-center text-sm italic text-[#1A5AD7]">
        <IconHeart size={16} className="mt-0.5 shrink-0 text-[#1A5AD7]" />
        <span>
          Note: Your experience matters, even when things don&apos;t go as
          planned.
        </span>
      </p>
    </PageShell>
  );
}

function StepProgress() {
  return (
    <div className="pt-2">
      <ol className="flex items-center justify-center gap-0">
        {[1, 2, 3].map((step, i) => (
          <li key={step} className="flex items-center">
            {i > 0 ? (
              <span
                className="h-0.5 w-10 bg-[#1A5AD7]"
                aria-hidden
              />
            ) : null}
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                step === 3
                  ? "bg-[#1A5AD7] text-white"
                  : "bg-[#1A5AD7] text-white"
              }`}
            >
              {step === 3 ? <IconCheck size={18} /> : step}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-center text-xs font-semibold tracking-wide text-[#1A5AD7]">
        STEP 3 OF 3
      </p>
    </div>
  );
}
