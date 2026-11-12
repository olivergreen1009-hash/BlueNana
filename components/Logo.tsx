import Link from "next/link";
import {
  BANANA_BODY_PATH,
  BANANA_STEM_PATH,
  BANANA_BLUE,
  BANANA_STEM_BLUE,
  BANANA_VIEWBOX,
  HEART_PATH,
  HEART_YELLOW,
} from "@/lib/banana-art";

type LogoProps = {
  href?: string;
  className?: string;
};

export function Logo({ href = "/", className = "" }: LogoProps) {
  const mark = (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      aria-label="BlueNana home"
    >
      <svg
        width={30}
        height={30}
        viewBox={BANANA_VIEWBOX}
        aria-hidden
        className="shrink-0"
      >
        <path d={BANANA_BODY_PATH} fill={BANANA_BLUE} />
        <path d={BANANA_STEM_PATH} fill={BANANA_STEM_BLUE} />
      </svg>
      <svg width={13} height={13} viewBox="0 0 24 24" aria-hidden>
        <path d={HEART_PATH} fill={HEART_YELLOW} />
      </svg>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block rounded-lg p-1 -m-1">
        {mark}
      </Link>
    );
  }
  return mark;
}
