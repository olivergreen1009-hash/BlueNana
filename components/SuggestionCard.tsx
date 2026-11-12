type SuggestionCardProps = {
  title?: string;
  body: string;
  meta?: string;
};

export function SuggestionCard({ title = "Today's idea", body, meta }: SuggestionCardProps) {
  return (
    <article className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
        {title}
      </p>
      <p className="mt-3 text-lg leading-relaxed text-slate-800">{body}</p>
      {meta ? (
        <p className="mt-3 text-sm text-slate-500">{meta}</p>
      ) : null}
    </article>
  );
}
