"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Avatar } from "./Avatar";

export function TitleScreen() {
  const [flash, setFlash] = useState(false);

  const start = () => {
    setFlash(true);
    setTimeout(() => {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
      setFlash(false);
    }, 280);
  };

  // Enter on the title screen behaves like pressing START.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && window.scrollY < 200 && document.activeElement === document.body) start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6">
      {flash ? <div className="pointer-events-none fixed inset-0 z-[70] bg-pink-soft/40" aria-hidden /> : null}

      <div className="grid items-center gap-12 md:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="font-term text-2xl text-mint">
            <span className="mr-2 inline-block h-3 w-3 rounded-full bg-mint align-middle shadow-[0_0_10px_var(--mint)]" />
            PLAYER 1 · ONLINE · {portfolio.location.toUpperCase()}
          </p>

          <h1 className="font-pixel text-glow mt-6 text-[1.35rem] leading-[1.4] min-[420px]:text-[1.7rem] text-pink-soft sm:text-5xl sm:leading-[1.3]">
            Rojin
            <br />
            <span className="text-text">Lohrasbinejad</span>
          </h1>

          <p className="font-pixel mt-6 text-[0.7rem] text-lilac sm:text-xs">
            {portfolio.role.toUpperCase()} <span className="text-dim">{"//"}</span> {portfolio.subrole.toUpperCase()}
          </p>

          <p className="mt-6 max-w-xl text-lg text-muted">{portfolio.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button type="button" onClick={start} className="arcade-btn">
              ▶ Press Start
            </button>
            <a href={portfolio.links.resume} target="_blank" rel="noreferrer" className="arcade-btn arcade-btn--ghost">
              Resume.pdf
            </a>
          </div>

          <p className="font-pixel mt-10 hidden text-[0.55rem] text-dim sm:block">
            <span className="blink">▌</span> PRESS ENTER OR SCROLL TO CONTINUE
          </p>
        </div>

        <div className="relative mx-auto">
          <div className="pixel-box pixel-box--pink float relative grid place-items-center p-8 sm:p-10">
            <span className="font-pixel absolute -top-3 left-4 bg-bg px-2 text-[0.55rem] text-pink">P1</span>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-pink/20 blur-3xl" aria-hidden />
              <Avatar size={220} />
            </div>
            <p className="font-term mt-6 text-center text-2xl leading-none text-text">
              {portfolio.playerCard.class}
            </p>
            <p className="font-term text-center text-xl text-gold">{portfolio.playerCard.level} · {portfolio.playerCard.origin}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
