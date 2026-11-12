"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { PageShell } from "@/components/PageShell";
import {
  formatDisplayDate,
  getLittleWins,
  subscribeStorage,
} from "@/lib/storage";

export default function WinsPage() {
  const wins = useSyncExternalStore(subscribeStorage, getLittleWins, () => []);

  return (
    <PageShell showBanana bananaSize="sm">
      <h1 className="text-xl font-bold text-sky-950">My Little Wins</h1>
      <p className="mt-1 text-sm text-slate-500">
        A private timeline of what you tried—no scores, no rankings.
      </p>

      {wins.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-slate-600">No wins logged yet.</p>
          <Link
            href="/good"
            className="mt-3 inline-block font-medium text-sky-700"
          >
            Try a little good →
          </Link>
        </div>
      ) : (
        <ol className="relative mt-8 border-s border-sky-200 pl-4">
          {wins.map((win) => (
            <li key={win.id} className="relative mb-6 pb-1 last:mb-0">
              <span
                className="absolute -left-[1.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-sky-500 ring-4 ring-sky-50"
                aria-hidden
              />
              <time className="text-xs font-medium uppercase tracking-wide text-sky-600">
                {formatDisplayDate(win.completedAt)}
              </time>
              <p className="mt-1 text-sm leading-relaxed text-slate-800">
                {win.text}
              </p>
              {win.reflection ? (
                <p className="mt-1 text-xs italic text-slate-500">
                  {win.reflection}
                </p>
              ) : null}
              <span className="mt-1 inline-block text-xs text-slate-500">
                {win.kind === "good"
                  ? "Do a Little Good"
                  : "Make Something Better"}
              </span>
            </li>
          ))}
        </ol>
      )}
    </PageShell>
  );
}
