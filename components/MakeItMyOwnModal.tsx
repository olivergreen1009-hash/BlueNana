"use client";

import { useState } from "react";
import { PrivacyHint } from "@/components/PrivacyHint";

type MakeItMyOwnModalProps = {
  open: boolean;
  initialText: string;
  onClose: () => void;
  onSave: (text: string) => void;
};

const MAX_LEN = 400;

export function MakeItMyOwnModal({
  open,
  initialText,
  onClose,
  onSave,
}: MakeItMyOwnModalProps) {
  if (!open) return null;

  return (
    <MakeItMyOwnModalBody
      key={initialText}
      initialText={initialText}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function MakeItMyOwnModalBody({
  initialText,
  onClose,
  onSave,
}: Omit<MakeItMyOwnModalProps, "open">) {
  const [text, setText] = useState(initialText);

  const save = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSave(trimmed);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 p-4 pb-[calc(5rem+env(safe-area-inset-bottom))] sm:items-center sm:pb-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="make-own-title"
    >
      <div className="w-full max-w-[26rem] rounded-2xl border border-slate-100 bg-white p-5 shadow-xl">
        <h2 id="make-own-title" className="text-lg font-bold text-slate-900">
          Make it my own
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Tweak the idea so it fits your day.
        </p>
        <PrivacyHint className="mt-3" />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_LEN))}
          rows={5}
          className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-bluenana/30"
        />
        <span className="mt-1 block text-right text-xs text-slate-400">
          {text.length}/{MAX_LEN}
        </span>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            disabled={!text.trim()}
            onClick={save}
            className="w-full rounded-xl bg-bluenana px-4 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-bluenana-dark"
          >
            Save to Ideas
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 text-center text-sm text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
