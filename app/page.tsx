import Link from "next/link";
import { Banana } from "@/components/Banana";
import { PageShell } from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell showLogo className="bg-white">
      <div className="mb-8 flex justify-center pt-2">
        <Banana size="lg" allowRemark />
      </div>
      <header className="text-center">
        <h1 className="mx-auto max-w-[20rem] text-[1.625rem] font-bold leading-snug tracking-tight text-slate-900 sm:max-w-none sm:text-[1.75rem]">
          Make one little part of the world better today.
        </h1>
        <p className="mx-auto mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-slate-600 sm:max-w-sm sm:text-base">
          Small ideas. Real people. A happier world.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-5">
        <PathCard
          href="/good"
          title="Do a Little Good"
          tagline="Tiny actions. Big difference."
          cta="Find a small idea"
        />
        <PathCard
          href="/better"
          title="Make Something Better"
          tagline="Spotted a problem? Let's improve it."
          cta="Let's solve a problem"
          accent
        />
      </div>

      <footer className="mt-auto pt-14 text-center text-sm leading-relaxed text-slate-500">
        Free to start · Private by default · No pressure
      </footer>
    </PageShell>
  );
}

function PathCard({
  href,
  title,
  tagline,
  cta,
  accent,
}: {
  href: string;
  title: string;
  tagline: string;
  cta: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white px-5 py-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition hover:border-sky-100 hover:shadow-[0_4px_12px_rgba(59,130,246,0.08)]"
    >
      <div
        className={`mb-4 h-1 w-12 rounded-full ${
          accent ? "bg-[#FFE566]" : "bg-[#3B82F6]"
        }`}
      />
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{tagline}</p>
      <span
        className={`mt-5 inline-flex w-fit items-center rounded-full px-5 py-2.5 text-sm font-semibold ${
          accent
            ? "bg-[#FFE566] text-slate-900"
            : "bg-[#3B82F6] text-white group-hover:bg-blue-600"
        }`}
      >
        {cta}
      </span>
    </Link>
  );
}
