"use client";

import { useEffect, useState } from "react";
import {
  BANANA_BODY_PATH,
  BANANA_EYES,
  BANANA_FACE,
  BANANA_SMILE_PATH,
  BANANA_STEM_PATH,
  BANANA_TIP_PATH,
  BANANA_BLUE,
  BANANA_STEM_BLUE,
  BANANA_TIP_YELLOW,
  BANANA_VIEWBOX,
  BANANA_STANDING_VIEWBOX,
  STANDING_BODY_PATH,
  STANDING_STEM_PATH,
  STANDING_TIP_PATH,
} from "@/lib/banana-art";

const REMARKS = [
  "Small steps count.",
  "You're here—that matters.",
  "No rush.",
  "Kindness fits anywhere.",
  "One try is enough.",
];

export type BananaVariant = "default" | "standing" | "horizontal" | "leaning";

type BananaProps = {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: BananaVariant;
  allowRemark?: boolean;
  className?: string;
};

const SIZES = { sm: 44, md: 64, lg: 100, xl: 140 } as const;

function DefaultBanana({ dim }: { dim: number }) {
  return (
    <svg
      width={dim}
      height={dim}
      viewBox={BANANA_VIEWBOX}
      aria-hidden
      className="shrink-0"
    >
      <path d={BANANA_BODY_PATH} fill={BANANA_BLUE} />
      <path d={BANANA_STEM_PATH} fill={BANANA_STEM_BLUE} />
      <path d={BANANA_TIP_PATH} fill={BANANA_TIP_YELLOW} />
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
  );
}

function StandingBanana({ width }: { width: number }) {
  const height = Math.round(width * 1.5);
  return (
    <svg
      width={width}
      height={height}
      viewBox={BANANA_STANDING_VIEWBOX}
      aria-hidden
      className="shrink-0"
    >
      <ellipse cx="40" cy="112" rx="18" ry="4" fill="#000" opacity="0.08" />
      <path d={STANDING_BODY_PATH} fill={BANANA_BLUE} />
      <path d={STANDING_STEM_PATH} fill={BANANA_STEM_BLUE} />
      <path d={STANDING_TIP_PATH} fill={BANANA_TIP_YELLOW} />
      <ellipse cx="28" cy="38" rx="2.5" ry="3" fill={BANANA_FACE} />
      <ellipse cx="38" cy="38" rx="2.5" ry="3" fill={BANANA_FACE} />
      <path
        d="M 26 46 Q 33 52 42 46"
        stroke={BANANA_FACE}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 48 52 C 58 40 62 32 56 26"
        stroke={BANANA_BLUE}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="56" cy="24" r="5" fill={BANANA_BLUE} />
      <path
        d="M 18 88 L 14 108 M 32 92 L 30 108"
        stroke={BANANA_BLUE}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="14" cy="109" rx="5" ry="3" fill={BANANA_STEM_BLUE} />
      <ellipse cx="30" cy="109" rx="5" ry="3" fill={BANANA_STEM_BLUE} />
    </svg>
  );
}

function HorizontalBanana({ width }: { width: number }) {
  const height = Math.round(width * 0.55);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 64"
      aria-hidden
      className="shrink-0"
    >
      <g transform="rotate(-25 60 32)">
        <path
          d="M 85 8 C 95 6 100 16 96 26 C 108 38 110 52 100 58 C 88 64 68 60 58 50 C 48 42 52 28 62 20 C 72 12 78 10 85 8 Z"
          fill={BANANA_BLUE}
        />
        <path
          d="M 86 6 C 92 3 98 6 97 12 L 92 14 C 91 9 88 7 86 6 Z"
          fill={BANANA_STEM_BLUE}
        />
        <path
          d="M 56 48 C 54 54 58 58 64 54 C 60 50 58 48 56 48 Z"
          fill={BANANA_TIP_YELLOW}
        />
        <ellipse cx="72" cy="34" rx="2" ry="2.5" fill={BANANA_FACE} />
        <ellipse cx="80" cy="34" rx="2" ry="2.5" fill={BANANA_FACE} />
        <path
          d="M 70 40 Q 76 44 82 40"
          stroke={BANANA_FACE}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function LeaningBanana({ width }: { width: number }) {
  const height = Math.round(width * 1.1);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 90 100"
      aria-hidden
      className="shrink-0"
    >
      <ellipse cx="45" cy="94" rx="22" ry="4" fill="#000" opacity="0.1" />
      <g transform="rotate(18 45 50)">
        <path
          d="M 45 10 C 55 8 60 20 56 32 C 62 50 56 72 44 82 C 34 88 22 82 20 68 C 18 52 24 34 34 22 C 38 16 42 12 45 10 Z"
          fill={BANANA_BLUE}
        />
        <path
          d="M 46 8 C 50 5 56 7 55 13 L 50 15 C 49 10 47 9 46 8 Z"
          fill={BANANA_STEM_BLUE}
        />
        <path
          d="M 18 76 C 16 82 20 86 26 82 C 22 78 20 76 18 76 Z"
          fill={BANANA_TIP_YELLOW}
        />
        <ellipse cx="34" cy="38" rx="2.2" ry="2.8" fill={BANANA_FACE} />
        <ellipse cx="44" cy="38" rx="2.2" ry="2.8" fill={BANANA_FACE} />
        <path
          d="M 32 46 Q 39 52 48 46"
          stroke={BANANA_FACE}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 24 78 L 18 92 M 38 80 L 36 92"
          stroke={BANANA_BLUE}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function Banana({
  size = "md",
  variant = "default",
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

  const art =
    variant === "standing" ? (
      <StandingBanana width={dim} />
    ) : variant === "horizontal" ? (
      <HorizontalBanana width={dim} />
    ) : variant === "leaning" ? (
      <LeaningBanana width={dim} />
    ) : (
      <DefaultBanana dim={dim} />
    );

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {art}
      {remark ? (
        <p className="max-w-[14rem] text-center text-xs text-[#1A5AD7]/80 italic">
          {remark}
        </p>
      ) : null}
    </div>
  );
}
