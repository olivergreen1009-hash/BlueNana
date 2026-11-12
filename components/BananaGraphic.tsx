import {
  BANANA_BODY_PATH,
  BANANA_EYES,
  BANANA_FACE,
  BANANA_HEART_TRANSFORM,
  BANANA_HIGHLIGHT_PATH,
  BANANA_SMILE_PATH,
  BANANA_STEM_PATH,
  BANANA_TIP_PATH,
  BANANA_BLUE,
  BANANA_STEM,
  BANANA_TIP,
  BANANA_VARIANTS,
  BANANA_VIEWBOX,
  HEART_PATH,
  HEART_YELLOW,
  type BananaVariant,
} from "@/lib/banana-art";

type BananaGraphicProps = {
  variant?: BananaVariant;
  className?: string;
  showFace?: boolean;
  showHeart?: boolean;
  title?: string;
};

export function BananaGraphic({
  variant = "default",
  className = "",
  showFace = true,
  showHeart,
  title,
}: BananaGraphicProps) {
  const cfg = BANANA_VARIANTS[variant];
  const heart = showHeart ?? cfg.showHeart ?? false;

  return (
    <svg
      width={cfg.width}
      height={cfg.height}
      viewBox={BANANA_VIEWBOX}
      aria-hidden={!title}
      role={title ? "img" : undefined}
      className={`shrink-0 ${className}`}
    >
      {title ? <title>{title}</title> : null}
      <g transform={cfg.transform}>
        <path d={BANANA_BODY_PATH} fill={BANANA_BLUE} />
        <path d={BANANA_TIP_PATH} fill={BANANA_TIP} />
        <path d={BANANA_STEM_PATH} fill={BANANA_STEM} />
        <path
          d={BANANA_HIGHLIGHT_PATH}
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.22"
          fill="none"
          strokeLinecap="round"
        />
        {showFace ? (
          <>
            <path
              d={BANANA_SMILE_PATH}
              stroke={BANANA_FACE}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            {BANANA_EYES.map((eye) => (
              <circle
                key={`${eye.cx}-${eye.cy}`}
                cx={eye.cx}
                cy={eye.cy}
                r={eye.r}
                fill={BANANA_FACE}
              />
            ))}
          </>
        ) : null}
        {heart ? (
          <path
            d={HEART_PATH}
            fill={HEART_YELLOW}
            transform={BANANA_HEART_TRANSFORM}
          />
        ) : null}
      </g>
    </svg>
  );
}
