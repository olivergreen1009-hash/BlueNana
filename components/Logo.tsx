import Link from "next/link";

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
        width={28}
        height={28}
        viewBox="0 0 64 64"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M12 38 C12 18 28 8 46 14 C58 18 56 36 44 48 C32 58 16 54 12 38 Z"
          fill="#3B8FE8"
        />
        <path
          d="M46 12 C52 8 58 10 60 16 C56 14 50 15 46 20 Z"
          fill="#3B8FE8"
        />
        <path
          d="M22 34 Q26 30 30 34"
          stroke="#1e4a7a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="26" cy="28" rx="2" ry="2.5" fill="#1e4a7a" />
        <ellipse cx="36" cy="28" rx="2" ry="2.5" fill="#1e4a7a" />
      </svg>
      <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 21 C12 21 4 14 4 9.5 C4 6.5 6.5 4 9.5 4 C11 4 12 4.8 12 4.8 C12 4.8 13 4 14.5 4 C17.5 4 20 6.5 20 9.5 C20 14 12 21 12 21 Z"
          fill="#FFE566"
        />
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
