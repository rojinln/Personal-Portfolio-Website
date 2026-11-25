"use client";

import { useSyncExternalStore } from "react";

/** The site is split into "pages" (game screens) addressed by URL hash, e.g. /#quests. */
export const PAGES = [
  { id: "top", label: "Title screen" },
  { id: "menu", label: "Main menu" },
  { id: "player", label: "Player profile" },
  { id: "quests", label: "Quest log" },
  { id: "saves", label: "Save files" },
  { id: "inventory", label: "Inventory" },
  { id: "now", label: "Now loading" },
  { id: "party", label: "Party select" },
  { id: "arcade", label: "Arcade" },
  { id: "continue", label: "Continue?" },
] as const;

export type PageId = (typeof PAGES)[number]["id"];

const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

/** Index of the page named by the current URL hash (0 = title screen). */
export function usePageIndex(): number {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => "",
  );
  const i = PAGES.findIndex((p) => p.id === hash);
  return i === -1 ? 0 : i;
}

export function goToPage(id: string) {
  if (id === "top") {
    // Clear the hash without adding a jump, then notify listeners.
    history.pushState(null, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = id;
  }
}
