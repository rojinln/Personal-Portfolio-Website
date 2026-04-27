"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 lg:px-10">
      <nav
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-[#0A1020]/70 px-4 py-3 backdrop-blur-xl md:px-6",
          scrolled && "border-white/20 bg-[#0A1020]/80 shadow-[0_0_40px_-18px_rgba(125,211,252,0.5)]",
        )}
      >
        <a href="#top" className="text-sm font-semibold tracking-wide text-[#F8FAFC] md:text-base">
          {portfolioData.name}
        </a>

        <ul className="hidden items-center gap-5 lg:flex">
          {portfolioData.navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-md px-1 py-1 text-sm text-[#D8D5E7] transition-colors hover:text-[#F3A6C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1020]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={portfolioData.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#7DD3FC]/30 px-4 py-2 text-sm text-[#E8F7FF] transition hover:border-[#7DD3FC]/60 hover:bg-[#7DD3FC]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1020]"
            >
              GitHub
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#F8FAFC] lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {menuOpen ? (
        <div className="mx-auto mt-2 w-full max-w-6xl rounded-2xl border border-white/10 bg-[#0A1020]/95 p-4 shadow-[0_10px_40px_-24px_rgba(125,211,252,0.5)] backdrop-blur-xl lg:hidden">
          <ul className="space-y-3">
            {portfolioData.navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-[#D8D5E7] transition hover:bg-white/10 hover:text-[#F3A6C8]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={portfolioData.links.github}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block rounded-lg border border-[#7DD3FC]/35 px-3 py-2 text-center text-sm text-[#E8F7FF]"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
