"use client";

import { useEffect, useState } from "react";
import { BananaGraphic } from "./BananaGraphic";
import type { BananaVariant } from "@/lib/banana-art";

const REMARKS = [
  "Small steps count.",
  "You're here—that matters.",
  "No rush.",
  "Kindness fits anywhere.",
  "One try is enough.",
];

type BananaProps = {
  size?: "sm" | "md" | "lg";
  variant?: BananaVariant;
  allowRemark?: boolean;
  showHeart?: boolean;
  className?: string;
};

const SIZE_TO_VARIANT: Record<NonNullable<BananaProps["size"]>, BananaVariant> = {
  sm: "inline",
  md: "default",
  lg: "hero",
};

export function Banana({
  size = "md",
  variant,
  allowRemark = false,
  showHeart,
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

  const resolved = variant ?? SIZE_TO_VARIANT[size];
  const heart = showHeart ?? resolved === "hero";

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <BananaGraphic
        variant={resolved}
        showHeart={heart}
        showFace
        className="drop-shadow-[0_4px_12px_rgba(26,90,215,0.18)]"
      />
      {remark ? (
        <p className="max-w-[14rem] text-center text-xs text-bluenana/80 italic">
          {remark}
        </p>
      ) : null}
    </div>
  );
}
