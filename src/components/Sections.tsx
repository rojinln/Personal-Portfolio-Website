import { portfolio, type Project } from "@/data/portfolio";
import { Avatar } from "./Avatar";
import { PixelHeart, Stage } from "./ui";

const BAR_COLORS = ["var(--pink)", "var(--lilac)", "var(--mint)", "var(--gold)", "var(--pink-soft)"];

export function Player() {
  const p = portfolio;
  return (
    <Stage id="player" stage="STAGE 1" title="Player profile" kicker="A quick look at who's behind the controller.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* character card */}
        <div className="pixel-box reveal p-6">
          <div className="flex items-center gap-5">
            <div className="rounded-lg border-2 border-line bg-bg p-3">
              <Avatar size={72} />
            </div>
            <div>
              <p className="font-pixel text-xs text-pink-soft">{p.handle.toUpperCase()}</p>
              <p className="font-term mt-2 text-xl leading-none text-text">CLASS · {p.playerCard.class}</p>
              <p className="font-term text-xl text-muted">HOME · {p.location}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {p.stats.map((s, i) => (
              <div key={s.label} className="grid grid-cols-[96px_1fr_36px] items-center gap-3">
                <span className="font-pixel text-[0.55rem] text-muted">{s.label.toUpperCase()}</span>
                <div className="bar">
                  <span style={{ width: `${s.value}%`, ["--c" as string]: BAR_COLORS[i % BAR_COLORS.length] }} />
                </div>
                <span className="font-term text-right text-lg text-text">{s.value}</span>
              </div>
            ))}
          </div>

          <p className="font-pixel mt-8 text-[0.55rem] text-gold">TRAITS</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {p.hobbies.map((h) => (
              <li key={h.label} className="flex items-center gap-2 rounded border-2 border-line bg-bg-2 px-3 py-2 text-sm">
                <span aria-hidden>{h.icon}</span>
                {h.label}
              </li>
            ))}
          </ul>
        </div>

        {/* dialogue box bio */}
        <div className="flex flex-col gap-6">
          <div className="pixel-box pixel-box--pink reveal p-6 sm:p-8">
            <span className="font-pixel absolute -top-3 left-5 bg-bg px-2 text-[0.55rem] text-pink">ROJIN SAYS</span>
            {p.bio.map((para) => (
              <p key={para.slice(0, 20)} className="mb-4 text-lg leading-relaxed text-text last:mb-0">
                {para}
              </p>
            ))}
            <p className="font-pixel blink mt-4 text-right text-xs text-pink" aria-hidden>
              ▼
            </p>
          </div>

          <div className="reveal grid gap-4 sm:grid-cols-2">
            {p.achievements.map((a) => (
              <div key={a.title} className="flex items-start gap-3 rounded-xl border-2 border-line bg-panel p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gold/15">
                  <PixelHeart size={18} color="var(--gold)" />
                </div>
                <div>
                  <p className="font-pixel text-[0.5rem] text-gold">ACHIEVEMENT UNLOCKED</p>
                  <p className="mt-1 font-bold text-text">{a.title}</p>
                  <p className="text-sm text-muted">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}

function QuestList({ tier }: { tier: "main" | "side" }) {
  const main = tier === "main";
  return (
    <ol className="relative space-y-6 border-l-[3px] border-dashed border-line pl-6 sm:pl-10">
      {portfolio.quests
        .filter((q) => q.tier === tier)
        .map((q, i) => {
          const active = q.dates.includes("Present");
          const label = q.kind === "school" ? "MAIN QUEST · TRAINING" : main ? "MAIN QUEST" : "SIDE QUEST";
          const color = q.kind === "school" ? "text-lilac" : main ? "text-pink" : "text-mint";
          const dot = q.kind === "school" ? "bg-lilac" : main ? "bg-pink" : "bg-mint";
          return (
            <li key={q.title + q.dates} className="reveal relative">
              <span
                className={`absolute -left-[37px] top-6 h-5 w-5 rotate-45 border-[3px] border-bg sm:-left-[53px] ${dot} ${active ? "shadow-[0_0_14px_var(--pink)]" : ""}`}
                aria-hidden
              />
              <article className={`pixel-box p-5 sm:p-6 ${main && i === 0 ? "pixel-box--pink" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={`font-pixel text-[0.55rem] ${color}`}>
                      {label}
                      {active ? <span className="ml-2 text-gold">· ACTIVE</span> : null}
                    </p>
                    <h3 className={`mt-2 font-extrabold text-text ${main ? "text-xl" : "text-lg"}`}>{q.title}</h3>
                    <p className="text-muted">
                      {q.org} · {q.place}
                    </p>
                  </div>
                  <span className="chip text-gold">{q.dates}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {q.loot.map((l) => (
                    <li key={l} className="flex gap-3 text-text/90">
                      <span className="font-pixel mt-1 text-[0.55rem] text-gold" aria-hidden>
                        +
                      </span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
    </ol>
  );
}

export function Quests() {
  return (
    <Stage id="quests" stage="STAGE 2" title="Quest log" kicker="My current job and degrees are the main storyline. Earlier roles are the side quests that levelled me up.">
      <h3 className="font-pixel reveal mb-6 text-[0.7rem] text-pink">▸ MAIN QUESTS</h3>
      <QuestList tier="main" />
      <h3 className="font-pixel reveal mb-6 mt-14 text-[0.7rem] text-mint">▸ SIDE QUESTS</h3>
      <QuestList tier="side" />
    </Stage>
  );
}

const SLOT_COLOR: Record<Project["color"], string> = {
  pink: "var(--pink)",
  lilac: "var(--lilac)",
  mint: "var(--mint)",
  gold: "var(--gold)",
};

export function Saves() {
  return (
    <Stage id="saves" stage="STAGE 3" title="Save files" kicker="Projects I've built. Some live in private university repos, so not every slot has a link.">
      <div className="grid gap-6 md:grid-cols-2">
        {portfolio.projects.map((pr) => {
          const c = SLOT_COLOR[pr.color];
          return (
            <article key={pr.slot} className="gloss-tile is-hover reveal flex flex-col p-6" style={{ ["--c" as string]: c }}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-pixel text-[0.55rem]" style={{ color: c }}>
                  SLOT {pr.slot} · {pr.tag.toUpperCase()}
                </p>
                {pr.badge ? (
                  <span className="font-pixel rounded bg-gold px-2 py-1 text-[0.45rem] leading-tight text-bg">★ {pr.badge}</span>
                ) : null}
              </div>

              <h3 className="mt-4 text-2xl font-black text-text">{pr.title}</h3>
              <p className="mt-3 text-muted">{pr.blurb}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {pr.stats.map((s) => (
                  <div key={s.label} className="rounded-lg border-2 border-line bg-bg-2 px-3 py-2">
                    <p className="font-pixel text-[0.5rem] text-dim">{s.label.toUpperCase()}</p>
                    <p className="font-term text-2xl leading-tight" style={{ color: c }}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {pr.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between pt-6">
                {pr.links.length ? (
                  pr.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noreferrer" : undefined}
                      className="font-pixel text-[0.6rem] text-pink hover:underline"
                    >
                      ▶ LOAD {l.label.toUpperCase()}
                    </a>
                  ))
                ) : (
                  <span className="font-pixel text-[0.55rem] text-dim">🔒 PRIVATE REPO</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Stage>
  );
}

export function Inventory() {
  return (
    <Stage id="inventory" stage="STAGE 4" title="Inventory" kicker="Languages, tools and tricks I carry around.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.skills.map((g) => (
          <div key={g.title} className="pixel-box reveal p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-md border-2 border-pink/50 bg-pink/10 text-lg text-pink" aria-hidden>
                {g.icon}
              </span>
              <h3 className="font-pixel text-[0.65rem] text-text">{g.title.toUpperCase()}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Stage>
  );
}

export function NowBuilding() {
  const nb = portfolio.nowBuilding;
  return (
    <Stage id="now" stage="STAGE 5" title="Now loading..." kicker="What I'm working on when I'm not working.">
      <div className="pixel-box pixel-box--pink reveal grid gap-8 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-pixel text-[0.55rem] text-mint">● IN PROGRESS</p>
          <h3 className="mt-3 text-2xl font-black text-text">{nb.title}</h3>
          <p className="mt-3 text-muted">{nb.detail}</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="bar flex-1">
              <span style={{ width: `${nb.progress}%`, ["--c" as string]: "var(--mint)" }} />
            </div>
            <span className="font-term text-2xl text-mint">{nb.progress}%</span>
          </div>
        </div>
        <ul className="space-y-3">
          {nb.checklist.map((c) => (
            <li key={c.label} className="flex items-center gap-3">
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center border-2 text-xs ${c.done ? "border-mint bg-mint text-bg" : "border-line text-dim"}`}
                aria-hidden
              >
                {c.done ? "✓" : ""}
              </span>
              <span className={c.done ? "text-text" : "text-muted"}>
                {c.label}
                <span className="sr-only">{c.done ? " (done)" : " (to do)"}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}

export function Continue() {
  const l = portfolio.links;
  const options = [
    { label: "Email", value: l.emailLabel, href: l.email },
    { label: "LinkedIn", value: "in/rojin-lohrasbinejad", href: l.linkedin, external: true },
    { label: "GitHub", value: "@rojinln", href: l.github, external: true },
    { label: "Resume", value: "resume.pdf", href: l.resume, external: true },
  ];
  return (
    <section id="continue" className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
      <p className="font-pixel text-[0.62rem] text-gold">★ FINAL STAGE ★</p>
      <h2 className="font-pixel text-glow mt-4 text-3xl text-pink-soft sm:text-5xl">Continue?</h2>
      <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
        Hiring, collaborating, or just want to talk about F1 heartbreak? Pick an option and I&apos;ll get back to you.
      </p>
      <div className="font-term mt-3 text-3xl text-gold">
        <span className="blink">9</span>
      </div>

      <ul className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
        {options.map((o) => (
          <li key={o.label}>
            <a
              href={o.href}
              target={o.external ? "_blank" : undefined}
              rel={o.external ? "noreferrer" : undefined}
              className="gloss-tile group flex items-center justify-between gap-4 p-5"
            >
              <span>
                <span className="font-pixel block text-[0.6rem] text-pink">{o.label.toUpperCase()}</span>
                <span className="mt-1 block break-all text-text">{o.value}</span>
              </span>
              <span className="font-pixel text-xs text-dim group-hover:text-pink" aria-hidden>
                ▶
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t-[3px] border-line bg-bg/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="font-pixel text-[0.55rem] text-dim">© {new Date().getFullYear()} ROJIN LOHRASBINEJAD</p>
        <p className="font-pixel flex items-center gap-2 text-[0.55rem] text-dim">
          MADE WITH <PixelHeart size={12} /> IN VANCOUVER
        </p>
        <a href="#top" className="font-pixel text-[0.55rem] text-pink hover:underline">
          ▲ BACK TO TITLE
        </a>
      </div>
    </footer>
  );
}
