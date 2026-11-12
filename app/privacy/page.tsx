import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell showBanana bananaSize="sm">
      <h1 className="text-xl font-bold text-bluenana">Privacy &amp; safety</h1>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700">
        <p>
          BlueNana keeps your ideas and wins on <strong>this device only</strong>,
          using your browser&apos;s local storage. Nothing is sent to our servers.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>No accounts or sign-in</li>
          <li>We do not sell your data</li>
          <li>Clearing site data in your browser removes everything here</li>
          <li>
            Use <strong>Delete</strong> on My Little Wins or <strong>Remove</strong> on
            Ideas to delete individual entries
          </li>
          <li>
            <strong>Delete everything</strong> on My Little Wins clears all logged
            wins
          </li>
        </ul>
        <p>
          BlueNana is a gentle prompt tool—not medical, legal, or crisis advice. If
          you need professional help, reach out to a qualified provider in your area.
        </p>
        <p className="text-slate-600">
          For ages 18 and up. Please avoid entering names or private details in text
          fields.
        </p>
      </div>
      <Link
        href="/"
        className="mt-8 block text-center text-sm font-medium text-bluenana"
      >
        ← Back to Home
      </Link>
    </PageShell>
  );
}
