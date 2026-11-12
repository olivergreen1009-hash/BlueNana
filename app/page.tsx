import Link from "next/link";
import { Banana } from "@/components/Banana";
import { PageShell } from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell showLogo className="bg-white">
      <div className="relative mb-6 flex items-start gap-2">
        <header className="relative z-10 min-w-0 flex-1 pt-1">
          <h1 className="text-[1.35rem] font-bold leading-snug tracking-tight text-bluenana sm:text-[1.5rem]">
            Make one little part of the{" "}
            <span className="relative inline-block whitespace-nowrap">
              world
              <WavyUnderline />
            </span>{" "}
            better today.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Small ideas when you want them. Quiet and private.
          </p>
        </header>
        <div className="relative z-0 shrink-0 -mr-2 -mt-1">
          <Banana size="lg" showHeart className="pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <PathCard
          href="/good"
          title="Do a Little Good"
          tagline="One small kindness when you have a moment."
          cta="Find a small idea"
          variant="good"
        />
        <PathCard
          href="/better"
          title="Make Something Better"
          tagline="Name a small frustration and try a tweak."
          cta="Start with a frustration"
          variant="better"
        />
        <PathCard
          href="/mix"
          title="Mix and Bump"
          tagline="Invent something silly, then try a tiny real version."
          cta="Mix something new"
          variant="mix"
        />
        <Link
          href="/silly"
          className="flex items-center gap-3 rounded-2xl border border-dashed border-bluenana/25 bg-[#FFF8DB]/50 px-4 py-4 text-left transition hover:border-bluenana/40 hover:bg-[#FFF8DB]/80"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">
            🎲
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-bluenana">Random silly prompt</p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              One playful idea—optional, no saving.
            </p>
          </div>
          <span aria-hidden className="text-lg text-bluenana">
            ›
          </span>
        </Link>
      </div>

      <TrustBar />
    </PageShell>
  );
}

function WavyUnderline() {
  return (
    <svg
      className="absolute -bottom-0.5 left-0 w-full"
      height={7}
      viewBox="0 0 56 7"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 5 Q7 2 14 5 T28 5 T42 5 T56 5"
        fill="none"
        stroke="#FACC15"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrustBar() {
  return (
    <footer className="mt-8 rounded-2xl border border-sky-100 bg-sky-50/90 px-2 py-4">
      <ul className="flex items-stretch justify-between gap-1 text-center text-[0.6875rem] font-medium leading-tight text-slate-700 sm:text-xs">
        <TrustItem
          label="Free to start"
          icon={
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bluenana text-white">
              <svg width={12} height={12} viewBox="0 0 12 12" aria-hidden>
                <path
                  d="M2 6 L5 9 L10 3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          }
        />
        <li className="w-px self-center bg-sky-200" aria-hidden />
        <TrustItem
          label="Private by default"
          icon={
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              className="text-bluenana"
              aria-hidden
              fill="currentColor"
            >
              <path d="M8 10V8a4 4 0 1 1 8 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm2 0h4V8a2 2 0 1 0-4 0v2z" />
            </svg>
          }
        />
        <li className="w-px self-center bg-sky-200" aria-hidden />
        <TrustItem
          label="No pressure"
          icon={
            <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
              <path
                d="M12 20 C12 20 4 13 4 8.5 C 4 5.5 6.5 3 9.5 3 C 11 3 12 3.8 12 3.8 C 12 3.8 13 3 14.5 3 C 17.5 3 20 5.5 20 8.5 C 20 13 12 20 12 20 Z"
                fill="#FACC15"
              />
            </svg>
          }
        />
      </ul>
      <p className="mt-3 text-center text-[0.6875rem] text-slate-500">
        For ages 18 and up ·{" "}
        <Link href="/privacy" className="font-medium text-bluenana hover:underline">
          Privacy &amp; safety
        </Link>
      </p>
    </footer>
  );
}

function TrustItem({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="flex min-w-0 flex-1 flex-col items-center gap-1.5 px-0.5">
      {icon}
      <span>{label}</span>
    </li>
  );
}

function PathCard({
  href,
  title,
  tagline,
  cta,
  variant,
}: {
  href: string;
  title: string;
  tagline: string;
  cta: string;
  variant: "good" | "better" | "mix";
}) {
  return (
    <Link
      href={href}
      className="group flex gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition hover:border-bluenana/20 hover:shadow-[0_4px_14px_rgba(26,90,215,0.1)]"
    >
      <CardIcon
        variant={
          variant === "good" ? "heart" : variant === "better" ? "bulb" : "mix"
        }
      />
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-bold tracking-tight text-bluenana sm:text-lg">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{tagline}</p>
        <span className="mt-3 inline-flex items-center gap-0.5 text-sm font-semibold text-bluenana group-hover:text-bluenana-dark">
          {cta}
          <span aria-hidden className="text-base leading-none">
            ›
          </span>
        </span>
      </div>
    </Link>
  );
}

function CardIcon({ variant }: { variant: "heart" | "bulb" | "mix" }) {
  if (variant === "mix") {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-50 text-lg">
        ✨
      </span>
    );
  }
  if (variant === "heart") {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bluenana/10">
        <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 20 C12 20 4 13 4 8.5 C 4 5.5 6.5 3 9.5 3 C 11 3 12 3.8 12 3.8 C 12 3.8 13 3 14.5 3 C 17.5 3 20 5.5 20 8.5 C 20 13 12 20 12 20 Z"
            fill="#1A5AD7"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF8DB]">
      <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden fill="#FACC15">
        <path d="M9 21h6v-1H9v1zm3-19a7 7 0 00-4 12.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26A7 7 0 0012 2z" />
      </svg>
    </span>
  );
}
