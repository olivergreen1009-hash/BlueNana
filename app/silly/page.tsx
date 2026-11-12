"use client";

import Link from "next/link";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import {
  nextSillyPromptIndex,
  sillyPromptAt,
} from "@/lib/silly-prompts";

export default function SillyPage() {
  const [session, setSession] = useState({ index: 0, shown: new Set([0]) });
  const { index } = session;
  const prompt = sillyPromptAt(index);

  const anotherOne = () => {
    const next = nextSillyPromptIndex(session.shown, index);
    setSession((prev) => {
      const copy = new Set(prev.shown);
      copy.add(next);
      return { index: next, shown: copy };
    });
  };

  return (
    <PageShell showBanana bananaSize="sm" logoSubtitle="Random silly prompt">
      <h1 className="text-center text-xl font-bold text-bluenana">
        Random silly prompt
      </h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        A playful nudge—no homework, no scoreboard.
      </p>

      <article className="mt-6 rounded-2xl border border-bluenana/15 bg-[#EEF4FD]/70 px-5 py-8 text-center shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <span
          className="text-3xl"
          role="img"
          aria-hidden
        >
          🎈
        </span>
        <p className="mt-4 text-lg font-medium leading-relaxed text-slate-800">
          {prompt}
        </p>
      </article>

      <div className="sticky bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 -mx-1 mt-8 flex flex-col gap-2 rounded-2xl bg-white/95 px-1 py-2 backdrop-blur-sm">
        <ActionButton primary onClick={anotherOne}>
          ↻ Another one
        </ActionButton>
        <Link
          href="/"
          className="mt-1 w-full rounded-xl py-3.5 text-center text-sm font-semibold text-bluenana ring-1 ring-bluenana/25 transition hover:bg-slate-50"
        >
          Done
        </Link>
      </div>
    </PageShell>
  );
}

function ActionButton({
  children,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
        primary
          ? "bg-bluenana text-white hover:bg-bluenana-dark"
          : "bg-white text-bluenana ring-1 ring-bluenana/25 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}
