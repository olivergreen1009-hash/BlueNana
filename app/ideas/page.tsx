"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { PageShell } from "@/components/PageShell";
import { IconLightbulbOutline, IconPencil } from "@/components/icons";
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
    <PageShell showLogo={false} className="bg-white">
      <header className="mb-2 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100">
          <IconLightbulbOutline size={26} className="text-[#FACC15]" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-[#1A5AD7]">Ideas</h1>
          <p className="text-sm text-slate-500">
            Saved for later—not the same as wins.
          </p>
        </div>
      </header>

      {ideas.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-sky-200 bg-sky-50/40 px-6 py-10 text-center">
          <IconLightbulbOutline
            size={40}
            className="mx-auto text-slate-300"
          />
          <p className="mt-4 text-slate-600">No saved ideas yet.</p>
          <p className="mt-1 text-sm text-slate-500">
            Try them when you feel ready.
          </p>
          <Link
            href="/good"
            className="mt-4 inline-block font-semibold text-[#1A5AD7]"
          >
            Find a small idea →
          </Link>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <p className="flex gap-2 text-sm leading-relaxed text-slate-800">
                <IconPencil size={16} className="mt-0.5 shrink-0 text-[#1A5AD7]" />
                {idea.text}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {idea.source === "good" ? "Little Good" : "Make Better"} ·{" "}
                  {formatDisplayDate(idea.createdAt)}
                </span>
                <button
                  type="button"
                  onClick={() => removeSavedIdea(idea.id)}
                  className="font-semibold text-[#1A5AD7]"
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
