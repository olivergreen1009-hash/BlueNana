import Link from "next/link";
import { BananaGraphic } from "./BananaGraphic";

type LogoProps = {
  href?: string;
  showWordmark?: boolean;
  className?: string;
};

export function Logo({
  href = "/",
  showWordmark = true,
  className = "",
}: LogoProps) {
  const mark = (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="BlueNana home"
    >
      <BananaGraphic size={34} showFace showHeart showTip />
      {showWordmark ? (
        <span className="relative text-lg font-bold tracking-tight text-[#1A5AD7]">
          BlueNana
          <svg
            width={10}
            height={10}
            viewBox="0 0 24 24"
            aria-hidden
            className="absolute -right-2 -top-1"
          >
            <path
              d="M 12 21 C 12 21 4 14 4 9.5 C 4 6.5 6.5 4 9.5 4 C 11 4 12 4.8 12 4.8 C 12 4.8 13 4 14.5 4 C 17.5 4 20 6.5 20 9.5 C 20 14 12 21 12 21 Z"
              fill="#FACC15"
            />
          </svg>
        </span>
      ) : null}
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
