"use client";

import { useEffect, useState } from "react";
import { PAGES, usePageIndex } from "./pages";
import { PixelHeart } from "./ui";

const NAV: { label: string; href: string; external?: boolean }[] = [
  { label: "Menu", href: "#menu" },
  { label: "Player", href: "#player" },
  { label: "Quests", href: "#quests" },
  { label: "Saves", href: "#saves" },
  { label: "Items", href: "#inventory" },
  { label: "Arcade", href: "#arcade" },
  { label: "Contact", href: "#continue" },
  { label: "Resume", href: "/resume.pdf", external: true },
];

/** Fixed top HUD: lives, nav (highlighting the current page), and a score that climbs as you progress. */
export function Hud() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const index = usePageIndex();
  const current = PAGES[index].id;
  const score = Math.round((index / (PAGES.length - 1)) * 9999);
  const showTop = scrolled && current !== "arcade";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-3" aria-label="Back to title screen">
            <span className="flex gap-1">
              <PixelHeart size={14} />
              <PixelHeart size={14} />
              <PixelHeart size={14} />
            </span>
            <span className="font-pixel text-[0.62rem] text-pink-soft">ROJIN.EXE</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((n) => {
              const active = n.href === `#${current}`;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  target={n.external ? "_blank" : undefined}
                  rel={n.external ? "noreferrer" : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`font-pixel relative rounded px-3 py-2 text-[0.58rem] uppercase transition ${
                    active
                      ? "bg-pink/15 text-pink shadow-[inset_0_0_0_2px_var(--pink)]"
                      : "text-muted hover:bg-panel-2 hover:text-pink"
                  }`}
                >
                  {active ? <span className="blink mr-1" aria-hidden>▸</span> : null}
                  {n.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <p className="font-pixel hidden text-[0.58rem] text-gold sm:block" aria-label={`Page ${index + 1} of ${PAGES.length}`}>
              SCORE <span className="text-text">{String(score).padStart(4, "0")}</span>
            </p>
            <button
              type="button"
              className="font-pixel rounded border-2 border-line px-3 py-2 text-[0.58rem] text-pink-soft lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>

        {open ? (
          <nav id="mobile-nav" className="border-t-2 border-line bg-bg px-4 pb-4 lg:hidden" aria-label="Mobile">
            <ul className="grid grid-cols-2 gap-2 pt-3">
              {NAV.map((n) => {
                const active = n.href === `#${current}`;
                return (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      target={n.external ? "_blank" : undefined}
                      rel={n.external ? "noreferrer" : undefined}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`font-pixel block rounded border-2 px-3 py-3 text-[0.6rem] uppercase ${
                        active ? "border-pink bg-pink/15 text-pink" : "border-line bg-panel text-text"
                      }`}
                    >
                      ▸ {n.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </header>

      {/* Back-to-top: appears once you've scrolled down a long page (hidden on the arcade so it never covers the game) */}
      <a
        href="#top"
        aria-label="Back to top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`arcade-btn fixed bottom-24 right-5 z-50 !px-3 !py-3 transition-opacity sm:right-8 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        tabIndex={showTop ? 0 : -1}
      >
        ▲ <span className="hidden sm:inline">Top</span>
      </a>
    </>
  );
}
