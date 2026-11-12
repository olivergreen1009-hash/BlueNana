"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Banana } from "@/components/Banana";
import { PageShell } from "@/components/PageShell";
import { IconBack, IconHelp, IconInfo } from "@/components/icons";
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

  const [cardOne, cardTwo] = shownSolutions;

  const anotherPair = useCallback(() => {
    setPairIds((prev) => pickPair(IMPROVEMENT_SOLUTIONS, prev[0]));
    setSavedToast(false);
  }, []);

  const tryImprovement = (solution: (typeof IMPROVEMENT_SOLUTIONS)[number]) => {
    if (!problem) return;
    const text = `${problem} — ${solution.title}: ${solution.description}`;
    setBetterSolution(solution.id);
    setBetterAttempt(text);
    router.push("/better/reflect");
  };

  if (!problem) {
    return (
      <PageShell header="solutions" showLogo={false}>
        <p className="text-center text-slate-600">Loading…</p>
      </PageShell>
    );
  }

  return (
    <PageShell
      header="solutions"
      showLogo={false}
      backSlot={
        <Link
          href="/better"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600"
          aria-label="Back"
        >
          <IconBack />
        </Link>
      }
      helpSlot={
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600"
          aria-label="Help"
        >
          <IconHelp size={20} />
        </button>
      }
    >
      <div className="mb-4 flex justify-center">
        <Banana size="lg" variant="horizontal" />
      </div>

      <h1 className="text-center text-xl font-bold text-slate-900">
        Explore solutions
      </h1>
      <p className="mt-1 text-center text-sm text-slate-500">
        Let&apos;s look at ways to make this better.
      </p>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <IconInfo className="text-[#1A5AD7]" />
          Problem summary
        </h2>
        <div className="mt-3 rounded-xl bg-sky-50 px-4 py-3">
          <p className="text-sm font-semibold text-[#1A5AD7]">{problem}</p>
          <p className="mt-1 text-xs text-slate-500">
            This comes up when there are lots of choices and little time.
          </p>
        </div>
      </section>

      <h3 className="mt-6 text-base font-bold text-slate-900">
        Improvement ideas to test
      </h3>
      <p className="text-sm text-slate-500">
        Pick one to try. You can change it anytime.
      </p>

      {cardOne ? (
        <article className="mt-4 rounded-2xl border-2 border-[#1A5AD7] bg-sky-50/60 p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A5AD7] text-sm font-bold text-white">
              1
            </span>
            <div className="min-w-0">
              <p className="font-bold text-slate-900">{cardOne.title}</p>
              <p className="mt-1 text-sm text-slate-600">{cardOne.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => tryImprovement(cardOne)}
            className="mt-4 w-full rounded-xl bg-[#1A5AD7] py-3 text-sm font-semibold text-white hover:bg-[#1550c4]"
          >
            Try this improvement
          </button>
        </article>
      ) : null}

      {cardTwo ? (
        <article className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FACC15] text-sm font-bold text-white">
              2
            </span>
            <div className="min-w-0">
              <p className="font-bold text-slate-900">{cardTwo.title}</p>
              <p className="mt-1 text-sm text-slate-600">{cardTwo.description}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={anotherPair}
              className="flex-1 rounded-xl border-2 border-[#1A5AD7] py-2.5 text-sm font-semibold text-[#1A5AD7] hover:bg-sky-50"
            >
              Another idea
            </button>
            <button
              type="button"
              onClick={() => {
                addSavedIdea(`${problem} — ${cardTwo.title}`, "better");
                setSavedToast(true);
              }}
              className="flex-1 rounded-xl border-2 border-[#FACC15] py-2.5 text-sm font-semibold text-amber-700 hover:bg-yellow-50"
            >
              Save my idea
            </button>
          </div>
        </article>
      ) : null}

      {savedToast ? (
        <p className="mt-4 text-center text-sm text-[#1A5AD7]">
          Saved to Ideas—you can find it anytime in the nav.
        </p>
      ) : null}
    </PageShell>
  );
}
