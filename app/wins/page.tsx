"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { PageShell } from "@/components/PageShell";
import {
  clearAllLittleWins,
  formatDisplayDate,
  getLittleWins,
  removeLittleWin,
  subscribeStorage,
} from "@/lib/storage";

export default function WinsPage() {
  const wins = useSyncExternalStore(subscribeStorage, getLittleWins, () => []);
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <PageShell showBanana bananaSize="sm">
      <div className="flex items-center justify-between gap-3">
        <div className="w-9 shrink-0" aria-hidden />
        <h1 className="flex-1 text-center text-xl font-bold text-bluenana">
          My Little Wins
        </h1>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bluenana/30 text-bluenana"
          aria-label="Private"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
            <rect
              x={5}
              y={11}
              width={14}
              height={10}
              rx={2}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 11V8a4 4 0 0 1 8 0v3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </div>

      <article className="mt-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <h2 className="text-base font-bold text-bluenana">Private timeline</h2>
        <p className="mt-1 text-sm text-slate-500">
          Your wins, only on this device.
        </p>

        {wins.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-slate-600">No wins logged yet.</p>
            <Link
              href="/good"
              className="mt-3 inline-block font-medium text-bluenana"
            >
              Try a little good →
            </Link>
          </div>
        ) : (
          <>
            <ol className="relative mt-6 border-s border-bluenana/30 pl-5">
              {wins.map((win, idx) => (
                <li
                  key={win.id}
                  className={`relative pb-5 last:pb-0 ${
                    idx < wins.length - 1 ? "mb-5 border-b border-slate-100" : ""
                  }`}
                >
                  <span
                    className="absolute -left-[1.6rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-bluenana text-[10px] text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {win.kind === "mix-and-bump" ? (
                        <span className="mb-1 inline-block rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
                          Mix and Bump
                        </span>
                      ) : null}
                      <p className="text-sm leading-relaxed text-slate-800">
                        {win.text}
                      </p>
                    </div>
                    <time className="shrink-0 text-xs font-medium text-bluenana">
                      {formatDisplayDate(win.completedAt)}
                    </time>
                  </div>
                  {win.reflection ? (
                    <p className="mt-1 text-xs italic text-slate-500">
                      {win.reflection}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => removeLittleWin(win.id)}
                    className="mt-2 text-xs font-medium text-slate-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-6 border-t border-slate-100 pt-4">
              {!confirmClear ? (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="text-xs font-medium text-slate-500 hover:text-red-600"
                >
                  Delete everything
                </button>
              ) : (
                <div className="rounded-xl border border-red-100 bg-red-50/80 p-3">
                  <p className="text-sm text-slate-700">
                    Remove all wins from this device?
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        clearAllLittleWins();
                        setConfirmClear(false);
                      }}
                      className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                    >
                      Yes, delete all
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClear(false)}
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </article>
    </PageShell>
  );
}
