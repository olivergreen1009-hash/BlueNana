export function PrivacyHint({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-xs leading-relaxed text-slate-500 ${className}`}
      role="note"
    >
      Please don&apos;t enter names or private details.
    </p>
  );
}
