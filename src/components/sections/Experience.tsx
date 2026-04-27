"use client";

import { motion } from "framer-motion";
import { portfolioData, type TimelineEntry } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionViewport } from "@/lib/motion";

const PX_PER_MONTH = 15;
const MIN_BLOCK_HEIGHT = 84;
const COMPACT_THRESHOLD = 92;
const TIMELINE_EASE = [0.22, 1, 0.36, 1] as const;

const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

type ParsedRange = {
  start: number;
  end: number;
  duration: number;
};

function parseRange(dateRange: string): ParsedRange {
  const [startRaw = "", endRaw = ""] = dateRange.split(" - ");
  const [startMonthText = "", startYearText = "0"] = startRaw.trim().split(" ");
  const [endMonthText = "", endYearText = "0"] = endRaw.trim().split(" ");
  const startYear = Number(startYearText);
  const endYear = Number(endYearText);

  if (Number.isNaN(startYear) || Number.isNaN(endYear)) {
    return { start: 0, end: 0, duration: 1 };
  }

  const start = startYear * 12 + (monthMap[startMonthText] ?? 0);
  const end = endYear * 12 + (monthMap[endMonthText] ?? 0);

  return {
    start,
    end,
    duration: Math.max(1, end - start + 1),
  };
}

function getDurationLabel(months: number) {
  if (months >= 24) return `${Math.round(months / 12)} years`;
  if (months >= 12) return "1 year";
  return `${months} mo`;
}

function getEntryStyle(entry: TimelineEntry) {
  const isExperience = entry.track === "Experience";

  return {
    card: isExperience
      ? "border-[#7DD3FC]/25 bg-[#061122]/88"
      : "border-[#C4B5FD]/25 bg-[#100D20]/88",
    badge: isExperience
      ? "border-[#7DD3FC]/40 bg-[#7DD3FC]/10 text-[#D8F3FF]"
      : "border-[#C4B5FD]/40 bg-[#C4B5FD]/10 text-[#E6DFFD]",
    accent: isExperience ? "from-[#7DD3FC]" : "from-[#C4B5FD]",
  };
}

function TimelineBlock({
  entry,
  topPx,
  heightPx,
  side,
}: {
  entry: TimelineEntry;
  topPx: number;
  heightPx: number;
  side: "left" | "right";
}) {
  const range = parseRange(entry.dateRange);
  const displayHeight = Math.max(heightPx, MIN_BLOCK_HEIGHT);
  const compact = displayHeight < COMPACT_THRESHOLD;
  const style = getEntryStyle(entry);

  return (
    <motion.article
      initial={{ opacity: 0, x: side === "left" ? -18 : 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={sectionViewport}
      transition={{ duration: 0.5, ease: TIMELINE_EASE }}
      className="absolute inset-x-0"
      style={{ top: topPx, height: displayHeight }}
      aria-label={`${entry.title}, ${entry.dateRange}`}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-[0_18px_50px_-32px_rgba(125,211,252,0.7)] backdrop-blur-xl ${compact ? "p-3" : "p-4"} ${style.card}`}
      >
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${style.accent} to-transparent opacity-70`} />

        <div className="flex items-start justify-between gap-2">
          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${style.badge}`}>
            {entry.track}
          </span>
          <span className="mt-0.5 shrink-0 text-[10px] text-[#A7A3B5]">{entry.dateRange}</span>
        </div>

        <div className={compact ? "mt-1.5" : "mt-2"}>
          <h3 className="text-sm font-semibold leading-tight text-[#F8FAFC]">{entry.title}</h3>
          <p className="mt-0.5 text-[11px] text-[#C8C5D9]">{entry.location}</p>
        </div>

        {!compact ? <p className="mt-2 line-clamp-4 text-xs leading-5 text-[#B8B5C8]">{entry.summary}</p> : null}

        {!compact ? (
          <p className="mt-auto pt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8F8BA3]">
            {getDurationLabel(range.duration)}
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}

function MobileTimelineCard({ entry }: { entry: TimelineEntry }) {
  const style = getEntryStyle(entry);

  return (
    <article className={`rounded-2xl border p-4 backdrop-blur-xl ${style.card}`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${style.badge}`}>
          {entry.track}
        </span>
        <span className="text-[10px] text-[#9896A8]">{entry.dateRange}</span>
      </div>
      <h3 className="text-sm font-semibold text-[#F8FAFC]">{entry.title}</h3>
      <p className="mt-0.5 text-xs text-[#C8C5D9]">{entry.location}</p>
      <p className="mt-2 text-xs leading-5 text-[#B8B5C8]">{entry.summary}</p>
    </article>
  );
}

function YearMarker({ year, topPx }: { year: number; topPx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={sectionViewport}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="absolute left-0 right-0 flex items-center"
      style={{ top: topPx, transform: "translateY(-50%)" }}
    >
      <div className="h-px flex-1 bg-white/18" />
      <span className="shrink-0 rounded bg-[#08101E] px-1 py-0.5 text-[9px] font-bold text-[#B8B5C8]">
        {year}
      </span>
      <div className="h-px flex-1 bg-white/18" />
    </motion.div>
  );
}

export function Experience() {
  const entries = portfolioData.timelineEntries;
  const ranges = entries.map((entry) => parseRange(entry.dateRange));
  const globalStart = Math.min(...ranges.map((range) => range.start));
  const globalEnd = Math.max(...ranges.map((range) => range.end));
  const containerHeight = (globalEnd - globalStart + 1) * PX_PER_MONTH;
  const startYear = Math.floor(globalStart / 12);
  const endYear = Math.floor(globalEnd / 12);

  const experienceEntries = entries.filter((entry) => entry.track === "Experience");
  const educationEntries = entries.filter((entry) => entry.track !== "Experience");
  const mobileEntries = [...entries].sort((a, b) => parseRange(b.dateRange).end - parseRange(a.dateRange).end);

  const yearMarkers = Array.from({ length: endYear - startYear + 2 }, (_, index) => startYear + index)
    .map((year) => ({
      year,
      topPx: (globalEnd - year * 12) * PX_PER_MONTH,
    }))
    .filter((marker) => marker.topPx > 0 && marker.topPx < containerHeight);

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience Snapshot"
        title="Work & Education Timeline"
        description="1.5+ years of professional software engineering experience, with graduate studies in Big Data."
      />

      <div className="space-y-4 md:hidden">
        {mobileEntries.map((entry, index) => (
          <motion.div
            key={`mobile-${entry.title}-${entry.dateRange}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport}
            transition={{ duration: 0.4, delay: index * 0.04 }}
          >
            <MobileTimelineCard entry={entry} />
          </motion.div>
        ))}
      </div>

      <div className="mb-5 hidden grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] items-center md:grid">
        <p className="text-right text-xs font-semibold uppercase tracking-[0.22em] text-[#7DD3FC]">Experience</p>
        <div />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">Education</p>
      </div>

      <div
        aria-label="Proportional work and education timeline from 2020 to 2025"
        className="relative hidden md:flex"
        style={{ height: containerHeight }}
      >
        <div className="relative flex-1 pr-5">
          {experienceEntries.map((entry) => {
            const range = parseRange(entry.dateRange);
            return (
              <TimelineBlock
                key={`experience-${entry.title}-${entry.dateRange}`}
                entry={entry}
                topPx={(globalEnd - range.end) * PX_PER_MONTH}
                heightPx={range.duration * PX_PER_MONTH}
                side="left"
              />
            );
          })}
        </div>

        <div className="relative w-16 shrink-0" aria-hidden>
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-[#C4B5FD]/15 via-[#C4B5FD]/55 to-[#7DD3FC]/20" />

          <div className="absolute left-0 right-0 flex items-center" style={{ top: 0 }}>
            <div className="h-px flex-1 bg-white/20" />
            <span className="shrink-0 px-1 text-[9px] font-bold text-[#7896A8]">{endYear}</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {yearMarkers.map((marker) => (
            <YearMarker key={marker.year} year={marker.year} topPx={marker.topPx} />
          ))}

          <div
            className="absolute left-0 right-0 flex items-center"
            style={{ top: containerHeight, transform: "translateY(-50%)" }}
          >
            <div className="h-px flex-1 bg-white/20" />
            <span className="shrink-0 px-1 text-[9px] font-bold text-[#7896A8]">{startYear}</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
        </div>

        <div className="relative flex-1 pl-5">
          {educationEntries.map((entry) => {
            const range = parseRange(entry.dateRange);
            return (
              <TimelineBlock
                key={`education-${entry.title}-${entry.dateRange}`}
                entry={entry}
                topPx={(globalEnd - range.end) * PX_PER_MONTH}
                heightPx={range.duration * PX_PER_MONTH}
                side="right"
              />
            );
          })}
        </div>
      </div>
    </Section>
  );
}
