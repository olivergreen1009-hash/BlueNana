"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { MixPairCard } from "@/components/MixPairCard";
import { PageShell } from "@/components/PageShell";
import { PrivacyHint } from "@/components/PrivacyHint";
import { Toast } from "@/components/Toast";
import { TryReflectionModal } from "@/components/TryReflectionModal";
import {
  nextStarterIndex,
  starterPairAt,
  winTextForPair,
  type MixPair,
} from "@/lib/mix-and-bump";
import { addLittleWin } from "@/lib/storage";

const INVENT_MAX = 120;

export default function MixPage() {
  const router = useRouter();
  const [session, setSession] = useState({ index: 0, shown: new Set([0]) });
  const { index, shown } = session;
  const [invent, setInvent] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [reflectOpen, setReflectOpen] = useState(false);
  const [pendingPair, setPendingPair] = useState<MixPair | null>(null);
  const [pendingInvent, setPendingInvent] = useState("");

  const pair = starterPairAt(index);

  const clearInvent = useCallback(() => setInvent(""), []);

  const anotherPair = () => {
    const next = nextStarterIndex(shown, index);
    setSession((prev) => {
      const copy = new Set(prev.shown);
      copy.add(next);
      return { index: next, shown: copy };
    });
    clearInvent();
    setToast(null);
  };

  const displaySillyName =
    invent.trim().length > 0
      ? `${pair.sillyName} · ${invent.trim()}`
      : pair.sillyName;

  return (
    <PageShell showBanana bananaSize="sm" logoSubtitle="Mix and Bump">
      <h1 className="text-center text-xl font-bold text-bluenana">
        Mix and Bump
      </h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Invent something silly, then try a tiny real version.
      </p>

      <MixDivider />

      <MixPairCard pair={pair} flipKey={index} />

      <label className="mt-4 block">
        <span className="text-sm font-medium text-slate-700">
          Your invent (optional)
        </span>
        <PrivacyHint className="mt-2" />
        <input
          type="text"
          value={invent}
          onChange={(e) => setInvent(e.target.value.slice(0, INVENT_MAX))}
          placeholder="A silly twist, if you want…"
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-bluenana/30"
        />
        <span className="mt-1 block text-right text-xs text-slate-400">
          {invent.length}/{INVENT_MAX}
        </span>
      </label>

      <article className="mt-4 rounded-2xl border border-bluenana/15 bg-[#EEF4FD]/60 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-bluenana">
          Silly name
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-800">
          {displaySillyName}
        </p>
      </article>

      <article className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Tiny real-life action
        </p>
        <p className="mt-2 text-base leading-relaxed text-slate-800">
          {pair.tinyAction}
        </p>
      </article>

      {toast ? <Toast message={toast} onDismiss={() => setToast(null)} /> : null}

      <div className="sticky bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 -mx-1 mt-6 flex flex-col gap-2 rounded-2xl bg-white/95 px-1 py-2 backdrop-blur-sm">
        <ActionButton
          primary
          onClick={() => {
            setPendingPair(pair);
            setPendingInvent(invent);
            setReflectOpen(true);
          }}
        >
          ✨ Try this
        </ActionButton>
        <ActionButton onClick={anotherPair}>↻ Another pair</ActionButton>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-1 w-full py-2 text-center text-sm font-medium text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline"
        >
          Not today
        </button>
      </div>

      <TryReflectionModal
        open={reflectOpen}
        onClose={() => setReflectOpen(false)}
        onSave={(reflection) => {
          if (!pendingPair) return;
          const text = winTextForPair(pendingPair, pendingInvent);
          addLittleWin(text, "mix-and-bump", reflection);
          setReflectOpen(false);
          setToast("Logged in My Little Wins—only you can see it.");
        }}
      />
    </PageShell>
  );
}

function MixDivider() {
  return (
    <div className="relative my-4 flex items-center justify-center">
      <div className="h-px w-full bg-slate-200" />
      <span className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg">
        ✨
      </span>
    </div>
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
