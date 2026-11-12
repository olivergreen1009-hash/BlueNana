import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function ReflectPage() {
  return (
    <PageShell bananaRemark>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-sky-950">
          Every little try matters
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-600">
          You do not have to finish perfectly. Showing up for a small improvement
          is already a win—it lives in My Little Wins whenever you are ready to
          look back.
        </p>
        <Link
          href="/wins"
          className="mt-8 w-full max-w-xs rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white"
        >
          View My Little Wins
        </Link>
        <Link href="/" className="mt-3 text-sm font-medium text-sky-700">
          Back to Home
        </Link>
      </div>
    </PageShell>
  );
}
