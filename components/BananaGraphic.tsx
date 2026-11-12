import {
  BANANA_BODY_PATH,
  BANANA_BLUE,
  BANANA_BLUE_DARK,
  BANANA_EYES,
  BANANA_FACE,
  BANANA_SMILE_PATH,
  BANANA_STEM_PATH,
  BANANA_TIP_PATH,
  BANANA_TIP_YELLOW,
  BANANA_VIEWBOX,
  HEART_PATH,
  HEART_POSITION,
  HEART_YELLOW,
} from "@/lib/banana-art";

export type BananaGraphicProps = {
  size?: number;
  showFace?: boolean;
  showHeart?: boolean;
  showTip?: boolean;
  className?: string;
  title?: string;
};

export function BananaGraphic({
  size = 64,
  showFace = true,
  showHeart = false,
  showTip = true,
  className = "",
  title,
}: BananaGraphicProps) {
  const heartTransform = `translate(${HEART_POSITION.x} ${HEART_POSITION.y}) scale(${HEART_POSITION.scale})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={BANANA_VIEWBOX}
      aria-hidden={!title}
      role={title ? "img" : undefined}
      className={`shrink-0 ${className}`}
    >
      {title ? <title>{title}</title> : null}
      <path d={BANANA_BODY_PATH} fill={BANANA_BLUE} />
      {showTip ? (
        <path d={BANANA_TIP_PATH} fill={BANANA_TIP_YELLOW} />
      ) : null}
      <path d={BANANA_STEM_PATH} fill={BANANA_BLUE_DARK} />
      {showFace ? (
        <>
          <path
            d={BANANA_SMILE_PATH}
            stroke={BANANA_FACE}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          {BANANA_EYES.map((eye) => (
            <ellipse
              key={`${eye.cx}-${eye.cy}`}
              cx={eye.cx}
              cy={eye.cy}
              rx={eye.rx}
              ry={eye.ry}
              fill={BANANA_FACE}
            />
          ))}
        </>
      ) : null}
      {showHeart ? (
        <g transform={heartTransform}>
          <path d={HEART_PATH} fill={HEART_YELLOW} />
        </g>
      ) : null}
    </svg>
  );
}
