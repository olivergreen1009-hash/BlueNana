"use client";

import { useEffect, useState } from "react";

export function Toast({
  message,
  onDismiss,
  durationMs = 3200,
}: {
  message: string;
  onDismiss: () => void;
  durationMs?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));
    const hideTimer = window.setTimeout(() => setVisible(false), durationMs - 280);
    const dismissTimer = window.setTimeout(onDismiss, durationMs);
    return () => {
      cancelAnimationFrame(show);
      window.clearTimeout(hideTimer);
      window.clearTimeout(dismissTimer);
    };
  }, [durationMs, message, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[60] mx-auto max-w-[26rem] px-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="rounded-xl bg-slate-900/90 px-4 py-2.5 text-center text-sm font-medium text-white shadow-lg backdrop-blur-sm">
        {message}
      </p>
    </div>
  );
}
