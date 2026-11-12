import Link from "next/link";
import { Banana } from "@/components/Banana";
import { PageShell } from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell
      showLogo
      className="bg-gradient-to-b from-sky-50/40 to-white"
    >
      <div className="mb-6 flex justify-center">
        <Banana size="lg" allowRemark />
      </div>
      <header className="text-center">
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-sky-950 sm:text-[1.65rem]">
          Make one little part of the world better today.
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Small ideas. Real people. A happier world.
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-4">
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

      <footer className="mt-auto pt-12 text-center text-sm text-slate-500">
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
      className="group block rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
    >
      <div
        className={`mb-3 h-1 w-14 rounded-full ${
          accent ? "bg-[#FFE566]" : "bg-[#3B8FE8]"
        }`}
      />
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{tagline}</p>
      <span
        className={`mt-4 inline-block rounded-full px-4 py-2 text-sm font-semibold ${
          accent
            ? "bg-[#FFE566] text-sky-950"
            : "bg-sky-600 text-white group-hover:bg-sky-700"
        }`}
      >
        {cta}
      </span>
    </Link>
  );
}
