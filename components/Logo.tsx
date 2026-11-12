import Link from "next/link";
import {
  BANANA_BODY_PATH,
  BANANA_STEM_PATH,
  BANANA_TIP_PATH,
  BANANA_BLUE,
  BANANA_STEM_BLUE,
  BANANA_TIP_YELLOW,
  BANANA_VIEWBOX,
  HEART_PATH,
  HEART_YELLOW,
} from "@/lib/banana-art";

type LogoProps = {
  href?: string | null;
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md";
};

export function Logo({
  href = "/",
  className = "",
  showWordmark = true,
  size = "md",
}: LogoProps) {
  const iconSize = size === "sm" ? 28 : 36;

  const mark = (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="BlueNana home"
    >
      <span className="relative inline-flex shrink-0 items-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox={BANANA_VIEWBOX}
          aria-hidden
        >
          <path d={BANANA_BODY_PATH} fill={BANANA_BLUE} />
          <path d={BANANA_STEM_PATH} fill={BANANA_STEM_BLUE} />
          <path d={BANANA_TIP_PATH} fill={BANANA_TIP_YELLOW} />
        </svg>
        <svg
          width={size === "sm" ? 11 : 14}
          height={size === "sm" ? 11 : 14}
          viewBox="0 0 24 24"
          aria-hidden
          className="absolute -right-1 -top-0.5"
        >
          <path d={HEART_PATH} fill={HEART_YELLOW} />
        </svg>
      </span>
      {showWordmark ? (
        <span
          className={`font-bold tracking-tight text-[#1A5AD7] ${
            size === "sm" ? "text-base" : "text-lg"
          }`}
        >
          BlueNana
        </span>
      ) : null}
    </span>
  );

  if (href === null) {
    return mark;
  }
  if (href !== undefined) {
    return (
      <Link href={href} className="inline-block rounded-lg p-1 -m-1">
        {mark}
      </Link>
    );
  }
  return (
    <Link href="/" className="inline-block rounded-lg p-1 -m-1">
      {mark}
    </Link>
  );
}
