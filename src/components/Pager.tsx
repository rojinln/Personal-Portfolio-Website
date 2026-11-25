"use client";

import { Children, useEffect, type ReactNode } from "react";
import { goToPage, PAGES, usePageIndex } from "./pages";

/**
 * Shows one section ("page") at a time, like screens in an old console game,
 * with Previous / Next buttons in a fixed bar at the bottom.
 */
export function Pager({ children }: { children: ReactNode }) {
  const index = usePageIndex();
  const pages = Children.toArray(children);
  const prev = index > 0 ? PAGES[index - 1] : null;
  const next = index < PAGES.length - 1 ? PAGES[index + 1] : null;

  // Every page starts at its top.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [index]);

  return (
    <>
      <div key={PAGES[index].id} className="page-in min-h-[calc(100svh-4rem)] pb-28">
        {pages[index]}
      </div>

      <nav
        aria-label="Page navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-line bg-bg/90 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => prev && goToPage(prev.id)}
            disabled={!prev}
            className="arcade-btn arcade-btn--ghost !px-3 disabled:pointer-events-none disabled:opacity-30"
          >
            ◀ <span className="hidden sm:inline">{prev ? prev.label : "Prev"}</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <div className="flex flex-col items-center gap-1.5">
            <p className="font-pixel text-[0.5rem] text-gold sm:text-[0.55rem]">
              {String(index + 1).padStart(2, "0")} / {PAGES.length}
            </p>
            <div className="hidden gap-1 sm:flex" aria-hidden>
              {PAGES.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => goToPage(p.id)}
                  title={p.label}
                  className={`h-2.5 w-2.5 rotate-45 border-2 ${
                    i === index ? "border-pink bg-pink" : i < index ? "border-pink/60 bg-pink/30" : "border-line bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => next && goToPage(next.id)}
            disabled={!next}
            className="arcade-btn !px-3 disabled:pointer-events-none disabled:opacity-30"
          >
            <span className="hidden sm:inline">{next ? next.label : "Next"}</span>
            <span className="sm:hidden">Next</span> ▶
          </button>
        </div>
      </nav>
    </>
  );
}
