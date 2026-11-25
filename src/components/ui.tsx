import type { ReactNode } from "react";

/** Section wrapper with a stage label, like a level select heading. */
export function Stage({
  id,
  stage,
  title,
  kicker,
  children,
}: {
  id: string;
  stage: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <header className="reveal mb-10">
        <p className="font-pixel text-[0.62rem] text-gold">★ {stage} ★</p>
        <h2 className="font-pixel text-glow mt-3 text-xl text-pink-soft sm:text-3xl">{title}</h2>
        {kicker ? <p className="mt-4 max-w-2xl text-muted">{kicker}</p> : null}
      </header>
      {children}
    </section>
  );
}

/** Little row of dots with a heart walking across. */
export function DotTrail() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6" aria-hidden>
      <div className="dot-trail">
        <span className="walker">
          <PixelHeart size={18} />
        </span>
      </div>
    </div>
  );
}

const HEART = ["0110110", "1111111", "1111111", "0111110", "0011100", "0001000"];

export function PixelHeart({ size = 16, color = "var(--pink)", empty = false }: { size?: number; color?: string; empty?: boolean }) {
  return <Sprite rows={HEART} size={size} palette={{ "1": empty ? "var(--line)" : color }} />;
}

/** Renders a sprite from rows of palette keys as crisp SVG rects. */
export function Sprite({
  rows,
  size,
  palette,
  className,
  label,
}: {
  rows: string[];
  size: number;
  palette: Record<string, string>;
  className?: string;
  label?: string;
}) {
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={(size * h) / w}
      shapeRendering="crispEdges"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rows.flatMap((row, y) =>
        row.split("").map((ch, x) =>
          palette[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={palette[ch]} /> : null,
        ),
      )}
    </svg>
  );
}
