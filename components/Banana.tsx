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
  size?: "sm" | "md" | "lg";
  allowRemark?: boolean;
  className?: string;
};

const SIZES = { sm: 44, md: 64, lg: 112 } as const;

export function Banana({
  size = "md",
  allowRemark = false,
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

  const dim = SIZES[size];

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 64 64"
        aria-hidden
        className="shrink-0 drop-shadow-sm"
      >
        <path
          d="M10 36 C10 16 26 6 44 12 C56 16 54 34 42 46 C30 56 14 52 10 36 Z"
          fill="#3B8FE8"
        />
        <path
          d="M44 10 C50 6 56 8 58 14 C54 12 48 13 44 18 Z"
          fill="#2B7AD4"
        />
        <path
          d="M20 32 Q26 26 32 32"
          stroke="#1e4a7a"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="24" cy="26" rx="2.2" ry="2.8" fill="#1e4a7a" />
        <ellipse cx="36" cy="26" rx="2.2" ry="2.8" fill="#1e4a7a" />
        <ellipse cx="28" cy="40" rx="3" ry="2" fill="#FFE566" opacity="0.35" />
      </svg>
      {remark ? (
        <p className="max-w-[14rem] text-center text-xs text-sky-800/80 italic">
          {remark}
        </p>
      ) : null}
    </div>
  );
}
