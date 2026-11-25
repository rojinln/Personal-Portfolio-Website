"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Stage } from "./ui";

/** Tiny "build your party" mini-game: recruiters pick what their team needs. */
export function PartySelect() {
  const traits = portfolio.partyTraits;
  const [picked, setPicked] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const toggle = (id: string) => {
    setDone(false);
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const chosen = traits.filter((t) => picked.includes(t.id));
  const lines = chosen.length ? chosen : traits.slice(0, 3);

  return (
    <Stage id="party" stage="BONUS ROUND" title="Pick your party member" kicker="What does your team need most? Select any that apply, then press OK.">
      <div className="pixel-box reveal grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_1fr]">
        <div className="space-y-3" role="group" aria-label="Team needs">
          {traits.map((t) => {
            const on = picked.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(t.id)}
                className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition ${
                  on ? "border-pink bg-pink/15 text-text" : "border-line bg-bg-2 text-muted hover:border-pink/60"
                }`}
              >
                <span className="font-pixel w-4 text-[0.6rem] text-pink" aria-hidden>
                  {on ? "▶" : ""}
                </span>
                {t.label}
              </button>
            );
          })}
          <button type="button" onClick={() => setDone(true)} className="arcade-btn mt-4">
            OK
          </button>
        </div>

        <div className="flex flex-col justify-center rounded-xl border-2 border-dashed border-line p-6" aria-live="polite">
          {done ? (
            <>
              <p className="font-pixel text-[0.6rem] text-mint">★ IT&apos;S A MATCH! ★</p>
              <p className="mt-4 text-lg text-text">
                Rojin joined your party! New member {lines.map((l) => l.line).join(", ").replace(/, ([^,]*)$/, " and $1")}.
              </p>
              <a href="#continue" className="font-pixel mt-6 text-[0.6rem] text-pink hover:underline">
                ▶ SEND AN INVITE
              </a>
            </>
          ) : (
            <p className="font-term text-2xl text-dim">
              {picked.length ? `${picked.length} selected. Press OK when ready…` : "Waiting for player 2…"}
              <span className="blink">_</span>
            </p>
          )}
        </div>
      </div>
    </Stage>
  );
}
