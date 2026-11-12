"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { setBetterProblem } from "@/lib/storage";

export default function BetterPage() {
  const router = useRouter();
  const [problem, setProblem] = useState("");

  const continueNext = () => {
    const trimmed = problem.trim();
    if (!trimmed) return;
    setBetterProblem(trimmed);
    router.push("/better/solutions");
  };

  return (
    <PageShell>
      <div className="mb-2 flex items-center justify-between">
        <Link href="/" className="text-sm text-sky-700">
          ← Home
        </Link>
        <h1 className="text-lg font-semibold text-sky-950">Identify a problem</h1>
        <span className="w-12" />
      </div>

      <p className="mb-4 text-sm leading-relaxed text-slate-600">
        What small thing could work a little better? No need to fix everything—just
        name what you notice.
      </p>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Your problem</span>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={4}
          placeholder="e.g. Our hallway gets cluttered by the door…"
          className="mt-2 w-full rounded-xl border border-sky-100 bg-white px-3 py-3 text-base text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-sky-300"
        />
      </label>

      <button
        type="button"
        disabled={!problem.trim()}
        onClick={continueNext}
        className="mt-6 w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40"
      >
        Explore solutions →
      </button>
    </PageShell>
  );
}
