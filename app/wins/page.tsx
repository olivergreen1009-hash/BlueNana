"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { PageShell } from "@/components/PageShell";
import { IconCheck, IconLock } from "@/components/icons";
import { getLittleWins, subscribeStorage } from "@/lib/storage";

export default function WinsPage() {
  const wins = useSyncExternalStore(subscribeStorage, getLittleWins, () => []);

  return (
    <PageShell
      header="wins"
      showLogo={false}
      helpSlot={
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 text-[#1A5AD7]"
          aria-label="Private"
        >
          <IconLock size={18} />
        </span>
      }
    >
      <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <h2 className="text-lg font-bold text-[#1A5AD7]">Private timeline</h2>
        <p className="mt-1 text-sm text-slate-500">
          Your wins. Your growth. Private to you.
        </p>

        {wins.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-slate-600">No wins logged yet.</p>
            <Link
              href="/good"
              className="mt-3 inline-block font-medium text-[#1A5AD7]"
            >
              Try a little good →
            </Link>
          </div>
        ) : (
          <ol className="relative mt-8 space-y-0 pl-2">
            <span
              className="absolute bottom-4 left-[1.15rem] top-4 w-0.5 bg-sky-200"
              aria-hidden
            />
            {wins.map((win, i) => (
              <li
                key={win.id}
                className={`relative flex items-start gap-4 py-4 ${
                  i < wins.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A5AD7] text-white">
                  <IconCheck size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug text-slate-900">
                      {win.text}
                    </p>
                    <time className="shrink-0 text-xs font-medium text-[#1A5AD7]">
                      {formatDisplayDateShort(win.completedAt)}
                    </time>
                  </div>
                  {win.reflection ? (
                    <p className="mt-1 text-xs italic text-slate-500">
                      {win.reflection}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </PageShell>
  );
}

function formatDisplayDateShort(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso.slice(5, 10);
  }
}
