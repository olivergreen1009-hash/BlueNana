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
      <BananaGraphic variant="logo" showHeart />
      {showWordmark ? (
        <span className="text-lg font-bold tracking-tight text-bluenana">
          BlueNana
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
