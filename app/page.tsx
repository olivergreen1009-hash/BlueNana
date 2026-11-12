import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell bananaRemark>
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-sky-950">
          BlueNana
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Little good, little better—at your pace.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4">
        <PathCard
          href="/good"
          title="Do a Little Good"
          description="Kind prompts you can try today—save ideas or log a win when you act."
          accent="from-sky-400 to-sky-500"
        />
        <PathCard
          href="/better"
          title="Make Something Better"
          description="Name a small annoyance, pick a gentle fix, and celebrate the try."
          accent="from-amber-300 to-yellow-400"
        />
      </div>

      <footer className="mt-auto pt-10 text-center text-sm text-slate-500">
        Free to start · Private on your device · No account
      </footer>
    </PageShell>
  );
}

function PathCard({
  href,
  title,
  description,
  accent,
}: {
  href: string;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-white bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className={`mb-3 h-1.5 w-12 rounded-full bg-gradient-to-r ${accent}`} />
      <h2 className="text-xl font-semibold text-slate-900 group-hover:text-sky-900">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      <span className="mt-4 inline-block text-sm font-medium text-sky-700">
        Start →
      </span>
    </Link>
  );
}
