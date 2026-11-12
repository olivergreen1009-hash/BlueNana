import { Banana } from "@/components/Banana";

type SuggestionCardProps = {
  body: string;
};

export function SuggestionCard({ body }: SuggestionCardProps) {
  return (
    <article className="flex gap-3 rounded-2xl border border-sky-100 bg-sky-50/90 px-4 py-5">
      <Banana size="sm" variant="standing" className="shrink-0" />
      <p className="flex items-center text-base font-medium leading-relaxed text-slate-800">
        {body}
      </p>
    </article>
  );
}
