"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, sectionViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const traitPhrases: Record<string, string> = {
  ships: "practical execution",
  learns: "continuous learning",
  debugs: "solving hard problems under pressure",
  communicates: "clear communication",
  systems: "thoughtful system design",
};

function buildResultText(selectedIds: string[]): string {
  const phrases = selectedIds
    .map((id) => traitPhrases[id])
    .filter(Boolean);

  if (phrases.length === 0) {
    return "I work best with teams that value practical execution, clear communication, and thoughtful system design — and I bring all of that. If that sounds like your team, it's worth a conversation.";
  }

  const joined =
    phrases.length === 1
      ? phrases[0]
      : phrases.length === 2
        ? `${phrases[0]} and ${phrases[1]}`
        : `${phrases.slice(0, -1).join(", ")}, and ${phrases[phrases.length - 1]}`;

  const closer =
    phrases.length === 1 ? "and I bring exactly that" : phrases.length === 2 ? "and I bring both" : "and I bring all of it";

  return `I work best with teams that value ${joined} — ${closer}. If that sounds like your team, it's worth a conversation.`;
}

export function HireSimulator() {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [calculated, setCalculated] = useState(false);

  const matchScore = useMemo(() => {
    if (selectedTraits.length === 0) return 98;
    const total = portfolioData.hireTraits.length;
    const pct = Math.round((selectedTraits.length / total) * 100);
    return Math.min(pct + 75, 100);
  }, [selectedTraits.length]);

  const resultText = useMemo(() => buildResultText(selectedTraits), [selectedTraits]);

  const toggleTrait = (id: string) => {
    setCalculated(false);
    setSelectedTraits((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <Section id="hire-simulator">
      <SectionHeading
        eyebrow="Now the real question is..."
        title="Should you reach out to me?"
      />

      <motion.div variants={fadeInUp(0)} initial="hidden" whileInView="visible" viewport={sectionViewport}>
        <GlassCard className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#F3A6C8]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-[#7DD3FC]/15 blur-3xl" />

        <div className="relative z-10">
          <p className="mb-4 text-sm text-[#B8B5C8]">Select the traits you value in a teammate:</p>
          <div className="flex flex-wrap gap-3">
            {portfolioData.hireTraits.map((trait) => {
              const selected = selectedTraits.includes(trait.id);
              return (
                <button
                  key={trait.id}
                  type="button"
                  onClick={() => toggleTrait(trait.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]",
                    selected
                      ? "border-[#F3A6C8]/70 bg-[#F3A6C8]/20 text-[#FDE7F1]"
                      : "border-white/20 bg-white/5 text-[#E8E6F2] hover:border-white/35 hover:bg-white/10",
                  )}
                  aria-pressed={selected}
                >
                  {trait.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setCalculated(true)}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#F3A6C8] to-[#C4B5FD] px-5 py-3 text-sm font-semibold text-[#0F1424] transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3A6C8]"
          >
            <Sparkles size={16} />
            Calculate Fit
          </button>

          <AnimatePresence mode="wait">
            {calculated ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 rounded-2xl border border-[#7DD3FC]/35 bg-[#7DD3FC]/10 p-5"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-semibold text-[#E9F7FF]">Strong match.</p>
                  <span className="shrink-0 rounded-full bg-gradient-to-r from-[#F3A6C8] to-[#C4B5FD] px-3 py-1 text-sm font-bold text-[#0F1424]">
                    {matchScore}% match
                  </span>
                </div>
                <p className="mt-2 text-sm leading-7 text-[#D4EEFC]">{resultText}</p>
                <div className="mt-3 flex items-center gap-1 text-[#F3A6C8]">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25 }}
                    >
                      ✦
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        </GlassCard>
      </motion.div>
    </Section>
  );
}
