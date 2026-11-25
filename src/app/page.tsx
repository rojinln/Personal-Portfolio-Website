import { Hud } from "@/components/Hud";
import { MenuGrid } from "@/components/MenuGrid";
import { Pager } from "@/components/Pager";
import { PartySelect } from "@/components/PartySelect";
import { Continue, Footer, Inventory, NowBuilding, Player, Quests, Saves } from "@/components/Sections";
import { TitleScreen } from "@/components/TitleScreen";
import { YarnGame } from "@/components/YarnGame";
import { DotTrail } from "@/components/ui";

// Deterministic star positions so server and client render the same thing.
const STARS = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 37.3) % 100,
  top: (i * 61.7) % 100,
  d: 2 + (i % 5),
  delay: (i % 7) * 0.4,
}));

export default function Home() {
  return (
    <>
      <div className="bg-grid" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{ left: `${s.left}%`, top: `${s.top}%`, ["--d" as string]: `${s.d}s`, ["--delay" as string]: `${s.delay}s` }}
          />
        ))}
      </div>
      <div className="scanlines" aria-hidden />

      <Hud />
      {/* Each child is one "page"; order must match PAGES in components/pages.ts */}
      <main className="relative z-10">
        <Pager>
          <TitleScreen />
          <div className="pt-12">
            <MenuGrid />
          </div>
          <Player />
          <Quests />
          <Saves />
          <Inventory />
          <NowBuilding />
          <PartySelect />
          <YarnGame />
          <>
            <Continue />
            <DotTrail />
            <Footer />
          </>
        </Pager>
      </main>
    </>
  );
}
