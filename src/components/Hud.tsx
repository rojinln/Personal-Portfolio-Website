"use client";

import { useEffect, useState } from "react";
import { PixelHeart } from "./ui";

const NAV: { label: string; href: string; external?: boolean }[] = [
  { label: "Menu", href: "#menu" },
  { label: "Player", href: "#player" },
  { label: "Quests", href: "#quests" },
  { label: "Saves", href: "#saves" },
  { label: "Items", href: "#inventory" },
  { label: "Contact", href: "#continue" },
  { label: "Resume", href: "/resume.pdf", external: true },
];

/** Fixed top HUD: lives, nav, and a score that climbs as you scroll. */
export function Hud() {
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScore(max > 0 ? Math.min(9999, Math.round((window.scrollY / max) * 9999)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
            <span className="flex gap-1">
              <PixelHeart size={14} />
              <PixelHeart size={14} />
              <PixelHeart size={14} />
            </span>
            <span className="font-pixel text-[0.62rem] text-pink-soft">ROJIN.EXE</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target={n.external ? "_blank" : undefined}
                rel={n.external ? "noreferrer" : undefined}
                className="font-pixel rounded px-3 py-2 text-[0.58rem] uppercase text-muted transition hover:bg-panel-2 hover:text-pink"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <p className="font-pixel hidden text-[0.58rem] text-gold sm:block" aria-label={`Scroll progress ${score}`}>
              SCORE <span className="text-text">{String(score).padStart(4, "0")}</span>
            </p>
            <button
              type="button"
              className="font-pixel rounded border-2 border-line px-3 py-2 text-[0.58rem] text-pink-soft md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>

        {open ? (
          <nav id="mobile-nav" className="border-t-2 border-line bg-bg px-4 pb-4 md:hidden" aria-label="Mobile">
            <ul className="grid grid-cols-2 gap-2 pt-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    target={n.external ? "_blank" : undefined}
                    rel={n.external ? "noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="font-pixel block rounded border-2 border-line bg-panel px-3 py-3 text-[0.6rem] uppercase text-text"
                  >
                    ▸ {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      {/* Back-to-top: appears once you've scrolled past the title screen */}
      <a
        href="#top"
        aria-label="Back to top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`arcade-btn fixed bottom-5 right-5 z-50 !px-3 !py-3 transition-opacity sm:bottom-8 sm:right-8 ${
          score > 600 ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        tabIndex={score > 600 ? 0 : -1}
      >
        ▲ <span className="hidden sm:inline">Top</span>
      </a>
    </>
  );
}
