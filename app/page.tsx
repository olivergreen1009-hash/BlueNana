import Link from "next/link";
import { Banana } from "@/components/Banana";
import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-28 pt-5">
        <Logo className="mb-6" />

        <div className="relative mb-8 flex items-start gap-2">
          <header className="min-w-0 flex-1 pt-1">
            <h1 className="text-[1.35rem] font-bold leading-snug tracking-tight text-bluenana sm:text-[1.5rem]">
              Make one little part of the{" "}
              <span className="relative inline-block">
                world
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height={6}
                  viewBox="0 0 80 6"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M0 4 Q10 0 20 4 T40 4 T60 3 T80 4"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              better today.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Small ideas. Real people. A happier world.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              A little inspiration to make everyday life better.
            </p>
          </header>
          <div className="shrink-0 -mr-2 rotate-[18deg]">
            <Banana size="lg" showHeart allowRemark />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <PathCard
            href="/good"
            title="Do a Little Good"
            tagline="Tiny actions. Big difference."
            cta="Find a small idea"
            variant="good"
          />
          <PathCard
            href="/better"
            title="Make Something Better"
            tagline="Spotted a problem? Let's improve it."
            cta="Let's solve a problem"
            variant="better"
          />
        </div>

        <footer className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-slate-100 pt-6 text-xs text-slate-600">
          <TrustItem
            icon={
              <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden>
                <circle
                  cx={12}
                  cy={12}
                  r={10}
                  fill="none"
                  stroke="#1A5AD7"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 12.5 11 15.5 16 9"
                  fill="none"
                  stroke="#1A5AD7"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            label="Free to start"
          />
          <span className="text-slate-200" aria-hidden>
            ·
          </span>
          <TrustItem
            icon={
              <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden>
                <rect
                  x={5}
                  y={11}
                  width={14}
                  height={10}
                  rx={2}
                  fill="none"
                  stroke="#1A5AD7"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 11V8a4 4 0 0 1 8 0v3"
                  fill="none"
                  stroke="#1A5AD7"
                  strokeWidth="1.5"
                />
              </svg>
            }
            label="Private by default"
          />
          <span className="text-slate-200" aria-hidden>
            ·
          </span>
          <TrustItem
            icon={
              <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M12 20 C12 20 4 13 4 8.5 C 4 5.5 6.5 3 9.5 3 C 11 3 12 3.8 12 3.8 C 12 3.8 13 3 14.5 3 C 17.5 3 20 5.5 20 8.5 C 20 13 12 20 12 20 Z"
                  fill="#FACC15"
                />
              </svg>
            }
            label="No pressure"
          />
        </footer>
      </main>
      <Nav />
    </div>
  );
}

function TrustItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {label}
    </span>
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
  variant: "good" | "better";
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition hover:border-bluenana/20 hover:shadow-[0_4px_14px_rgba(26,90,215,0.1)]"
    >
      <CardIcon variant={variant === "good" ? "heart" : "bulb"} />
      <h2 className="mt-4 text-lg font-bold tracking-tight text-bluenana">
        {title}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{tagline}</p>
      <span className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-bluenana group-hover:underline">
        {cta}
        <span aria-hidden>&gt;</span>
      </span>
    </Link>
  );
}

function CardIcon({
  variant,
}: {
  variant: "heart" | "bulb";
}) {
  if (variant === "heart") {
    return (
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bluenana/10">
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
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF8DB]">
      <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M9 18h6M10 22h4M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11Z"
          fill="#FACC15"
          stroke="#EAB308"
          strokeWidth="0.5"
        />
      </svg>
    </span>
  );
}
