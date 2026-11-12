"use client";

import { useState } from "react";
import { PrivacyHint } from "@/components/PrivacyHint";

type TryReflectionModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (reflection: string | undefined) => void;
};

const MAX_LEN = 200;

export function TryReflectionModal({
  open,
  onClose,
  onSave,
}: TryReflectionModalProps) {
  const [note, setNote] = useState("");

  if (!open) return null;

  const finish = (withNote: boolean) => {
    const trimmed = note.trim();
    onSave(withNote && trimmed ? trimmed : undefined);
    setNote("");
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 p-4 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:items-center sm:pb-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="try-reflect-title"
    >
      <div className="w-full max-w-[26rem] rounded-2xl border border-slate-100 bg-white p-5 shadow-xl">
        <h2
          id="try-reflect-title"
          className="text-lg font-bold text-slate-900"
        >
          What did you notice?
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Optional—skip anytime. No pressure.
        </p>
        <PrivacyHint className="mt-3" />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, MAX_LEN))}
          rows={4}
          placeholder="A small observation, feeling, or nothing at all…"
          className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bluenana/30"
        />
        <span className="mt-1 block text-right text-xs text-slate-400">
          {note.length}/{MAX_LEN}
        </span>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => finish(true)}
            className="w-full rounded-xl bg-bluenana px-4 py-3 text-sm font-semibold text-white hover:bg-bluenana-dark"
          >
            Save to My Little Wins
          </button>
          <button
            type="button"
            onClick={() => finish(false)}
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={() => {
              setNote("");
              onClose();
            }}
            className="py-2 text-center text-sm text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
