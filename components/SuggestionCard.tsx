import { BananaGraphic } from "./BananaGraphic";

type SuggestionCardProps = {
  title?: string;
  body: string;
  meta?: string;
};

export function SuggestionCard({
  title,
  body,
  meta,
}: SuggestionCardProps) {
  return (
    <article className="flex gap-3 rounded-2xl border border-bluenana/15 bg-gradient-to-br from-[#EEF4FD] to-white p-4 shadow-sm">
      <BananaGraphic size={52} showFace showTip className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        {title ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-bluenana">
            {title}
          </p>
        ) : null}
        <p className={`text-base leading-relaxed text-slate-800 ${title ? "mt-2" : ""}`}>
          {body}
        </p>
        {meta ? <p className="mt-2 text-sm text-slate-500">{meta}</p> : null}
      </div>
    </article>
  );
}
