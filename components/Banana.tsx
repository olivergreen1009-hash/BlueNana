"use client";

import { useEffect, useState } from "react";
import {
  BANANA_BODY_PATH,
  BANANA_EYES,
  BANANA_FACE,
  BANANA_SMILE_PATH,
  BANANA_STEM_PATH,
  BANANA_BLUE,
  BANANA_STEM_BLUE,
  BANANA_VIEWBOX,
} from "@/lib/banana-art";

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

const SIZES = { sm: 44, md: 64, lg: 120 } as const;

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
        viewBox={BANANA_VIEWBOX}
        aria-hidden
        className="shrink-0 drop-shadow-sm"
      >
        <path d={BANANA_BODY_PATH} fill={BANANA_BLUE} />
        <path d={BANANA_STEM_PATH} fill={BANANA_STEM_BLUE} />
        <path
          d={BANANA_SMILE_PATH}
          stroke={BANANA_FACE}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        {BANANA_EYES.map((eye) => (
          <ellipse
            key={`${eye.cx}-${eye.cy}`}
            cx={eye.cx}
            cy={eye.cy}
            rx={eye.rx}
            ry={eye.ry}
            fill={BANANA_FACE}
          />
        ))}
      </svg>
      {remark ? (
        <p className="max-w-[14rem] text-center text-xs text-sky-800/80 italic">
          {remark}
        </p>
      ) : null}
    </div>
  );
}
