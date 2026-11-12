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
            <span className="relative inline-block">
              world
              <WavyUnderline />
            </span>{" "}
            better{" "}
            <span className="relative inline-block">
              today
              <WavyUnderline />
            </span>
            .
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Small ideas. Real people.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            A happier world.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            A little inspiration to make everyday life better.
          </p>
        </header>
        <div className="relative z-0 shrink-0 -mr-1">
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

      <TrustBar />
    </PageShell>
  );
}

function WavyUnderline() {
  return (
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
  );
}

function TrustBar() {
  return (
    <footer className="mt-10 rounded-2xl bg-sky-50 px-3 py-4">
      <ul className="flex flex-col items-center gap-3 text-xs font-medium text-slate-700">
        <li className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bluenana text-white">
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
          Free to start
        </li>
        <li className="flex items-center gap-2">
          <svg width={16} height={16} viewBox="0 0 24 24" className="text-bluenana" aria-hidden>
            <path
              fill="currentColor"
              d="M8 10V8a4 4 0 1 1 8 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm2 0h4V8a2 2 0 1 0-4 0v2z"
            />
          </svg>
          Private by default
        </li>
        <li className="flex items-center gap-2">
          <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 20 C12 20 4 13 4 8.5 C 4 5.5 6.5 3 9.5 3 C 11 3 12 3.8 12 3.8 C 12 3.8 13 3 14.5 3 C 17.5 3 20 5.5 20 8.5 C 20 13 12 20 12 20 Z"
              fill="#FACC15"
            />
          </svg>
          No pressure
        </li>
      </ul>
    </footer>
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

function CardIcon({ variant }: { variant: "heart" | "bulb" }) {
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
