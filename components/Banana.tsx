"use client";

import { useEffect, useState } from "react";

const REMARKS = [
  "Small steps count.",
  "You're here—that matters.",
  "No rush.",
  "Kindness fits anywhere.",
  "One try is enough.",
];

type BananaProps = {
  size?: "sm" | "md";
  allowRemark?: boolean;
  className?: string;
};

export function Banana({
  size = "md",
  allowRemark = true,
  className = "",
}: BananaProps) {
  const [remark, setRemark] = useState<string | null>(null);

  useEffect(() => {
    if (!allowRemark) return;
    const frame = requestAnimationFrame(() => {
      if (Math.random() < 0.22) {
        setRemark(REMARKS[Math.floor(Math.random() * REMARKS.length)] ?? null);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [allowRemark]);

  const dim = size === "sm" ? 40 : 56;

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 64 64"
        aria-hidden
        className="shrink-0 drop-shadow-sm"
      >
        <ellipse cx="32" cy="34" rx="22" ry="26" fill="#FFE566" />
        <path
          d="M32 8 C38 4 48 6 50 14 C44 12 36 14 32 20 Z"
          fill="#4DA3FF"
        />
        <ellipse cx="26" cy="30" rx="3" ry="4" fill="#C9A227" opacity="0.35" />
        <ellipse cx="36" cy="38" rx="2.5" ry="3" fill="#C9A227" opacity="0.3" />
        <ellipse cx="40" cy="28" rx="2" ry="2.5" fill="#C9A227" opacity="0.25" />
      </svg>
      {remark ? (
        <p className="max-w-[12rem] text-center text-xs text-sky-800/80 italic">
          {remark}
        </p>
      ) : null}
    </div>
  );
}
