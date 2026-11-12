"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { PageShell } from "@/components/PageShell";
import {
  formatDisplayDate,
  getSavedIdeas,
  removeSavedIdea,
  subscribeStorage,
} from "@/lib/storage";

export default function IdeasPage() {
  const ideas = useSyncExternalStore(
    subscribeStorage,
    getSavedIdeas,
    () => [],
  );

  return (
    <PageShell showBanana bananaSize="sm">
      <h1 className="text-xl font-bold text-sky-950">Ideas</h1>
      <p className="mt-1 text-sm text-slate-500">
        Saved for later—not the same as wins. Try them when you feel ready.
      </p>

      {ideas.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-slate-600">No saved ideas yet.</p>
          <Link
            href="/good"
            className="mt-3 inline-block font-medium text-sky-700"
          >
            Find a small idea →
          </Link>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-slate-800">
                {idea.text}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {idea.source === "good" ? "Little Good" : "Make Better"} ·{" "}
                  {formatDisplayDate(idea.createdAt)}
                </span>
                <button
                  type="button"
                  onClick={() => removeSavedIdea(idea.id)}
                  className="font-medium text-sky-700"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
