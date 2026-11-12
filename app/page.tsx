import Link from "next/link";
import { Banana } from "@/components/Banana";
import { Logo } from "@/components/Logo";
import { PageShell } from "@/components/PageShell";
import {
  IconCheck,
  IconChevronRight,
  IconHeart,
  IconLightbulbOutline,
  IconLock,
} from "@/components/icons";

export default function Home() {
  return (
    <PageShell showLogo={false} className="bg-white">
      <div className="mb-6 flex justify-center pt-2">
        <LogoHeader />
      </div>

      <div className="relative mt-4 flex gap-3">
        <header className="flex-1 pt-1">
          <h1 className="text-[1.35rem] font-bold leading-snug tracking-tight text-[#1A5AD7] sm:text-2xl">
            Make one little part of the world{" "}
            <span className="wavy-underline inline-block">better today.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Small ideas. Real people. A happier world.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            A little inspiration to make everyday life better.
          </p>
        </header>
        <div className="shrink-0 pt-2">
          <Banana size="lg" variant="standing" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <PathCard
          href="/good"
          title="Do a Little Good"
          tagline="Tiny actions. Big difference."
          cta="Find a small idea"
          icon="heart"
        />
        <PathCard
          href="/better"
          title="Make Something Better"
          tagline="Spotted a problem? Let's improve it."
          cta="Let's solve a problem"
          icon="bulb"
        />
      </div>

      <footer className="mt-10 flex items-center justify-center gap-0 rounded-2xl bg-sky-50/80 px-2 py-4 text-xs text-slate-600">
        <TrustItem icon="check" label="Free to start" />
        <span className="mx-2 h-4 w-px bg-slate-200" aria-hidden />
        <TrustItem icon="lock" label="Private by default" />
        <span className="mx-2 h-4 w-px bg-slate-200" aria-hidden />
        <TrustItem icon="heart" label="No pressure" />
      </footer>
    </PageShell>
  );
}

function LogoHeader() {
  return <Logo size="md" />;
}

function TrustItem({
  icon,
  label,
}: {
  icon: "check" | "lock" | "heart";
  label: string;
}) {
  return (
    <span className="flex flex-col items-center gap-1 px-1 text-center">
      {icon === "check" ? (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A5AD7] text-white">
          <IconCheck size={14} />
        </span>
      ) : icon === "lock" ? (
        <IconLock size={18} className="text-[#1A5AD7]" />
      ) : (
        <IconHeart size={18} className="text-[#FACC15]" />
      )}
      <span className="leading-tight">{label}</span>
    </span>
  );
}

function PathCard({
  href,
  title,
  tagline,
  cta,
  icon,
}: {
  href: string;
  title: string;
  tagline: string;
  cta: string;
  icon: "heart" | "bulb";
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-5 shadow-[0_1px_4px_rgba(15,23,42,0.06)] transition hover:border-sky-100 hover:shadow-md"
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
          icon === "heart" ? "bg-sky-100" : "bg-yellow-100"
        }`}
      >
        {icon === "heart" ? (
          <IconHeart size={24} className="text-[#1A5AD7]" />
        ) : (
          <IconLightbulbOutline size={24} className="text-[#FACC15]" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-[#1A5AD7]">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{tagline}</p>
        <span className="mt-3 inline-flex items-center gap-0.5 text-sm font-semibold text-[#1A5AD7]">
          {cta}
          <IconChevronRight size={16} />
        </span>
      </span>
    </Link>
  );
}
