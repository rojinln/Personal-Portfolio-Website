import { portfolio } from "@/data/portfolio";
import { Clock } from "./Clock";
import { PixelHeart, Sprite } from "./ui";

const ICONS: Record<string, { rows: string[]; palette: Record<string, string> }> = {
  player: {
    rows: ["..XXXX..", ".XXXXXX.", ".XOXXOX.", ".XXXXXX.", "..XXXX..", ".YYYYYY.", "YYYYYYYY", "YYYYYYYY"],
    palette: { X: "var(--pink-soft)", O: "var(--bg)", Y: "var(--pink)" },
  },
  quest: {
    rows: ["XXXXXXX.", "XOOOOOX.", "XOXXXOX.", "XOOOOOX.", "XOXXOOX.", "XOOOOOX.", "XXXXXXX.", "........"],
    palette: { X: "var(--gold)", O: "var(--panel-2)" },
  },
  save: {
    rows: ["XXXXXXX.", "XOOOOXX.", "XOOOOXXX", "XXXXXXXX", "XYYYYYYX", "XYYYYYYX", "XYYYYYYX", "XXXXXXXX"],
    palette: { X: "var(--lilac)", O: "var(--bg)", Y: "var(--panel-2)" },
  },
  items: {
    rows: ["..XXXX..", ".X....X.", "XXXXXXXX", "XOOYYOOX", "XOOYYOOX", "XOOOOOOX", "XOOOOOOX", "XXXXXXXX"],
    palette: { X: "var(--mint)", O: "var(--panel-2)", Y: "var(--gold)" },
  },
  mail: {
    rows: ["XXXXXXXX", "XX....XX", "X.X..X.X", "X..XX..X", "X......X", "XXXXXXXX"],
    palette: { X: "var(--pink)", ".": "var(--panel-2)" },
  },
};

function Tile({
  href,
  label,
  sub,
  icon,
  className = "",
  external,
}: {
  href: string;
  label: string;
  sub: string;
  icon: keyof typeof ICONS;
  className?: string;
  external?: boolean;
}) {
  const ic = ICONS[icon];
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`gloss-tile group flex flex-col justify-between p-5 ${className}`}
    >
      <Sprite rows={ic.rows} palette={ic.palette} size={40} />
      <div className="mt-6">
        <p className="font-pixel text-[0.7rem] text-text group-hover:text-pink">{label}</p>
        <p className="mt-2 text-sm text-muted">{sub}</p>
      </div>
    </a>
  );
}

/** Console-style home menu: a bento grid of rounded channel tiles. */
export function MenuGrid() {
  const nb = portfolio.nowBuilding;
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="reveal mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-pixel text-[0.62rem] text-gold">★ MAIN MENU ★</p>
          <h2 className="font-pixel text-glow mt-3 text-xl text-pink-soft sm:text-2xl">Select a channel</h2>
        </div>
        <p className="font-term hidden text-xl text-dim sm:block">◂ ▸ to browse · Ⓐ to select</p>
      </div>

      <div className="reveal grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Clock */}
        <div className="gloss-tile col-span-2 flex flex-col justify-between p-6 lg:col-span-1">
          <p className="font-pixel text-[0.58rem] text-lilac">LOCAL TIME</p>
          <Clock timeZone={portfolio.timezone} />
          <p className="font-term text-lg text-dim">{portfolio.location}</p>
        </div>

        <Tile href="#player" label="Player" sub="Who I am" icon="player" />
        <Tile href="#quests" label="Quest Log" sub="Work & school" icon="quest" />

        {/* Status */}
        <div className="gloss-tile col-span-2 flex flex-col gap-6 p-6 lg:col-span-1 lg:row-span-3">
          <div>
            <p className="font-pixel text-[0.58rem] text-mint">● STATUS</p>
            <p className="mt-4 text-lg font-bold leading-snug text-text">{portfolio.playerCard.status}</p>
          </div>
          <p className="font-pixel mt-2 text-[0.58rem] text-gold">HIGH SCORES</p>
          <div className="space-y-4">
            {portfolio.achievements.map((a) => (
              <div key={a.title} className="flex items-start gap-3">
                <span className="mt-1">
                  <PixelHeart size={14} color="var(--gold)" />
                </span>
                <div>
                  <p className="text-sm font-bold text-text">{a.title}</p>
                  <p className="text-xs text-muted">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Now building */}
        <a href="#now" className="gloss-tile col-span-2 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <p className="font-pixel text-[0.58rem] text-pink">NOW BUILDING</p>
            <p className="font-term text-xl text-gold">{nb.progress}%</p>
          </div>
          <div>
            <p className="mt-4 text-xl font-extrabold text-text">{nb.title}</p>
            <p className="mt-1 text-sm text-muted">{nb.detail}</p>
            <div className="bar mt-4">
              <span style={{ width: `${nb.progress}%` }} />
            </div>
          </div>
        </a>

        <Tile href="#saves" label="Save Files" sub="Projects" icon="save" />
        <Tile href="#inventory" label="Inventory" sub="Skills & tools" icon="items" />
        <Tile href="#continue" label="Contact" sub="Send a message" icon="mail" className="col-span-2" />
      </div>
    </section>
  );
}
