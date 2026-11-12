"use client";

import { useEffect, useState } from "react";
import { BananaGraphic } from "./BananaGraphic";

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
  showHeart?: boolean;
  className?: string;
};

const SIZES = { sm: 44, md: 64, lg: 128 } as const;

export function Banana({
  size = "md",
  allowRemark = false,
  showHeart = false,
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
      <BananaGraphic
        size={dim}
        showFace
        showHeart={showHeart}
        showTip
        className="drop-shadow-[0_4px_12px_rgba(26,90,215,0.18)]"
      />
      {remark ? (
        <p className="max-w-[14rem] text-center text-xs text-[#1A5AD7]/80 italic">
          {remark}
        </p>
      ) : null}
    </div>
  );
}
