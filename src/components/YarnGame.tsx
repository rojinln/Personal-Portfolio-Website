"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Stage } from "./ui";

/* ------------------------------------------------------------------ */
/*  Kitty Yarn Catch: a tiny canvas game drawn at 320x180, scaled up.  */
/* ------------------------------------------------------------------ */

const W = 320;
const H = 180;
const FLOOR = 160;
const ROUND_SECONDS = 60;
const GRAVITY = 560;
const JUMP_V = -225;
const RUN_SPEED = 95;

// One-way platforms the kitty (and yarn) can land on.
const PLATFORMS = [
  { x1: 18, x2: 112, y: 128 }, // couch seat
  { x1: 198, x2: 262, y: 122 }, // coffee table
];

const YARN_COLORS = ["#ff5fae", "#b79cff", "#7ff5c3", "#ffd866", "#ff9a6b", "#7cc8ff"];

type Keys = { left: boolean; right: boolean; up: boolean; down: boolean };
type Yarn = { x: number; y: number; vx: number; vy: number; color: string; bounces: number; age: number; alive: boolean };
type Mouse = { x: number; y: number; dir: 1 | -1; speed: number; alive: boolean };
type Pop = { x: number; y: number; text: string; color: string; age: number };
type Kitty = { x: number; y: number; vy: number; face: 1 | -1; grounded: boolean; dropUntil: number; walk: number };

type World = {
  kitty: Kitty;
  yarns: Yarn[];
  mice: Mouse[];
  pops: Pop[];
  t: number;
  nextYarn: number;
  nextMouse: number;
  score: number;
  caught: number;
  mice_caught: number;
};

const freshWorld = (): World => ({
  kitty: { x: 160, y: FLOOR, vy: 0, face: 1, grounded: true, dropUntil: 0, walk: 0 },
  yarns: [],
  mice: [],
  pops: [],
  t: 0,
  nextYarn: 0.4,
  nextMouse: 5 + Math.random() * 4,
  score: 0,
  caught: 0,
  mice_caught: 0,
});

/* ----------------------------- sprites ----------------------------- */

const KITTY_A = [
  ".........K...K..",
  ".........KK.KK..",
  "T........KKKKKK.",
  "T........KEKKEK.",
  ".T.......KBKPKB.",
  ".TKKKKKKKKKKKK..",
  "..KKKLLLLLLKKK..",
  "..KKKLLLLLLKK...",
  "..KKKKKKKKKKK...",
  "..KK..KK..KK.KK.",
  "..KK..KK..KK.KK.",
];
const KITTY_B = [...KITTY_A.slice(0, 9), "...KK.KK.KK.KK..", "...KK.KK.KK.KK.."];
const KITTY_PAL: Record<string, string> = {
  K: "#d9c8f0",
  L: "#f6eefc",
  T: "#d9c8f0",
  E: "#2a1236",
  P: "#ff5fae",
  B: "#ff9cc9",
};

const MOUSE = ["..EE....", ".EGGGG..", "GGGGGGGD", "GGGGGGG.", ".G..G..."];
const MOUSE_PAL: Record<string, string> = { G: "#9b93a8", E: "#ffb3da", D: "#2a1236" };

function drawSprite(
  ctx: CanvasRenderingContext2D,
  rows: string[],
  pal: Record<string, string>,
  x: number,
  y: number,
  flip = false,
  px = 2,
) {
  const w = rows[0].length;
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < w; c++) {
      const ch = rows[r][c];
      const col = pal[ch];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(Math.round(x) + (flip ? w - 1 - c : c) * px, Math.round(y) + r * px, px, px);
    }
  }
}

function drawYarn(ctx: CanvasRenderingContext2D, y: Yarn) {
  const cx = Math.round(y.x);
  const cy = Math.round(y.y);
  const widths = [2, 4, 5, 5, 5, 5, 5, 4, 2]; // half-widths per row, a chunky pixel circle
  ctx.fillStyle = y.color;
  widths.forEach((hw, i) => ctx.fillRect(cx - hw, cy - 4 + i, hw * 2, 1));
  // thread lines
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fillRect(cx - 4, cy - 2, 8, 1);
  ctx.fillRect(cx - 5, cy, 10, 1);
  ctx.fillRect(cx - 3, cy + 2, 7, 1);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fillRect(cx - 3, cy - 3, 2, 1);
  // loose tail of yarn
  ctx.fillStyle = y.color;
  ctx.fillRect(cx + 4, cy + 3, 2, 1);
  ctx.fillRect(cx + 6, cy + 4, 2, 1);
}

/** Pre-renders the living room backdrop once. */
function paintRoom(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const R = (col: string, x: number, y: number, w: number, h: number) => {
    g.fillStyle = col;
    g.fillRect(x, y, w, h);
  };

  // wallpaper with stripes and tiny hearts
  R("#1d1230", 0, 0, W, FLOOR);
  for (let x = 0; x < W; x += 16) R("#22163a", x, 0, 8, FLOOR);
  for (let y = 10; y < 120; y += 24)
    for (let x = (y / 24) % 2 ? 4 : 12; x < W; x += 32) {
      R("#3a2552", x, y, 1, 1);
      R("#3a2552", x + 2, y, 1, 1);
      R("#3a2552", x, y + 1, 3, 1);
      R("#3a2552", x + 1, y + 2, 1, 1);
    }
  R("#3b2752", 0, FLOOR - 6, W, 6); // skirting board

  // window with night sky
  R("#4a3366", 130, 18, 58, 50);
  R("#0c0812", 133, 21, 52, 44);
  // crescent moon
  ["..XXX..", ".XX....", "XX.....", "XX.....", "XX.....", ".XX....", "..XXX.."].forEach((row, y) =>
    row.split("").forEach((ch, x) => ch === "X" && R("#ffd866", 168 + x, 26 + y, 1, 1)),
  );
  [[140, 30], [150, 50], [178, 52], [158, 26], [143, 58]].forEach(([x, y]) => R("#ffb3da", x, y, 1, 1));
  R("#4a3366", 158, 21, 2, 44);
  R("#4a3366", 133, 42, 52, 2);
  R("#ff5fae", 126, 16, 8, 56); // curtains
  R("#ff5fae", 184, 16, 8, 56);
  R("#c2297a", 128, 16, 2, 56);
  R("#c2297a", 188, 16, 2, 56);
  R("#7a4a96", 122, 14, 74, 3); // rod

  // picture frame
  R("#ffd866", 40, 30, 34, 26);
  R("#130c1d", 43, 33, 28, 20);
  R("#7ff5c3", 47, 45, 20, 6);
  R("#b79cff", 52, 38, 8, 8);

  // floor lamp
  R("#7a4a96", 288, 60, 2, FLOOR - 60);
  R("#7a4a96", 282, FLOOR - 3, 14, 3);
  R("#ffb3da", 278, 46, 22, 16);
  R("#ff5fae", 278, 60, 22, 2);
  g.fillStyle = "rgba(255,216,102,0.07)";
  g.beginPath();
  g.moveTo(280, 62);
  g.lineTo(298, 62);
  g.lineTo(318, FLOOR);
  g.lineTo(258, FLOOR);
  g.fill();

  // wooden floor
  R("#2b1a3d", 0, FLOOR, W, H - FLOOR);
  for (let y = FLOOR + 4; y < H; y += 5) R("#24152f", 0, y, W, 1);
  for (let y = FLOOR; y < H; y += 5) for (let x = (y % 10) * 4; x < W; x += 40) R("#24152f", x, y, 1, 5);

  // rug
  R("#c2297a", 150, FLOOR + 6, 120, 10);
  R("#ff5fae", 152, FLOOR + 7, 116, 8);
  for (let x = 156; x < 266; x += 8) R("#ffd866", x, FLOOR + 10, 3, 2);

  // couch (seat top = platform y 128)
  R("#6d4bd1", 18, 104, 94, 24); // back
  R("#7f5fe0", 22, 108, 40, 18);
  R("#7f5fe0", 66, 108, 40, 18);
  R("#b79cff", 18, 128, 94, 4); // seat edge highlight
  R("#5a3bb8", 18, 132, 94, 20);
  R("#4a2f99", 10, 112, 10, 40); // arms
  R("#4a2f99", 110, 112, 10, 40);
  R("#2a1236", 14, 152, 4, 8);
  R("#2a1236", 112, 152, 4, 8);
  R("#ffd866", 26, 116, 10, 10); // cushion
  R("#ff5fae", 92, 116, 10, 10);

  // coffee table (top = platform y 122)
  R("#ffb3da", 198, 122, 64, 3);
  R("#c27a9e", 198, 125, 64, 4);
  R("#8a4f6d", 204, 129, 4, 31);
  R("#8a4f6d", 252, 129, 4, 31);
  // mug + plant on table
  R("#7ff5c3", 240, 114, 7, 8);
  R("#7ff5c3", 247, 116, 2, 3);
  R("#c2297a", 210, 114, 8, 8);
  R("#7ff5c3", 211, 106, 2, 8);
  R("#7ff5c3", 214, 104, 2, 10);
  R("#1f9e72", 208, 108, 3, 3);
  R("#1f9e72", 216, 106, 3, 3);

  return c;
}

function stepWorld(w: World, key: Keys, dt: number) {
  const k = w.kitty;
  w.t += dt;

  // --- kitty movement ---
  const dir = (key.right ? 1 : 0) - (key.left ? 1 : 0);
  k.x = Math.min(W - 14, Math.max(14, k.x + dir * RUN_SPEED * dt));
  if (dir !== 0) {
    k.face = dir as 1 | -1;
    k.walk += dt;
  }
  if (key.up && k.grounded) {
    k.vy = JUMP_V;
    k.grounded = false;
  }
  if (key.down && k.grounded && k.y < FLOOR) {
    k.dropUntil = w.t + 0.25; // hop down off the couch/table
    k.grounded = false;
  }

  const prevY = k.y;
  k.vy += GRAVITY * dt;
  k.y += k.vy * dt;
  k.grounded = false;
  if (k.vy >= 0 && w.t > k.dropUntil) {
    for (const p of PLATFORMS) {
      if (k.x > p.x1 && k.x < p.x2 && prevY <= p.y && k.y >= p.y) {
        k.y = p.y;
        k.vy = 0;
        k.grounded = true;
      }
    }
  }
  if (k.y >= FLOOR) {
    k.y = FLOOR;
    k.vy = 0;
    k.grounded = true;
  }

  // --- spawn yarn ---
  if (w.t >= w.nextYarn) {
    w.yarns.push({
      x: 16 + Math.random() * (W - 32),
      y: -6,
      vx: (Math.random() - 0.5) * 80,
      vy: 20 + Math.random() * 30,
      color: YARN_COLORS[Math.floor(Math.random() * YARN_COLORS.length)],
      bounces: 0,
      age: 0,
      alive: true,
    });
    const pace = Math.max(0.45, 1.15 - w.t / 80);
    w.nextYarn = w.t + pace * (0.6 + Math.random() * 0.8);
  }

  // --- spawn mouse ---
  if (w.t >= w.nextMouse) {
    const fromLeft = Math.random() < 0.5;
    const onCouch = Math.random() < 0.25;
    w.mice.push({
      x: onCouch ? (fromLeft ? 26 : 104) : fromLeft ? -16 : W + 16,
      y: onCouch ? PLATFORMS[0].y : FLOOR,
      dir: fromLeft ? 1 : -1,
      speed: 55 + Math.random() * 35,
      alive: true,
    });
    w.nextMouse = w.t + 6 + Math.random() * 6;
  }

  const catchAt = (x: number, y: number, r: number) => Math.abs(x - k.x) < 14 + r && Math.abs(y - (k.y - 11)) < 11 + r;

  // --- yarn physics ---
  for (const y of w.yarns) {
    const py = y.y;
    y.age += dt;
    y.vy += 300 * dt;
    y.x += y.vx * dt;
    y.y += y.vy * dt;
    if (y.x < 6 || y.x > W - 6) {
      y.vx *= -1;
      y.x = Math.min(W - 6, Math.max(6, y.x));
    }
    const surfaces = [...PLATFORMS.filter((p) => y.x > p.x1 && y.x < p.x2).map((p) => p.y), FLOOR];
    for (const s of surfaces) {
      if (y.vy > 0 && py + 4 <= s && y.y + 4 >= s) {
        y.y = s - 4;
        y.vy *= -0.72;
        y.vx *= 0.9;
        y.bounces++;
        break;
      }
    }
    if (catchAt(y.x, y.y, 4)) {
      y.alive = false;
      w.score += 10;
      w.caught++;
      w.pops.push({ x: y.x, y: y.y - 4, text: "+10", color: y.color, age: 0 });
    } else if (y.age > 5.5 || (y.bounces > 4 && Math.abs(y.vy) < 30)) {
      y.alive = false;
    }
  }
  w.yarns = w.yarns.filter((y) => y.alive);

  // --- mice ---
  for (const m of w.mice) {
    m.x += m.dir * m.speed * dt;
    const onCouch = m.y === PLATFORMS[0].y;
    if (onCouch && (m.x < PLATFORMS[0].x1 + 2 || m.x > PLATFORMS[0].x2 - 2)) {
      m.y = FLOOR; // scurries off the couch
    }
    if (m.x < -20 || m.x > W + 20) m.alive = false;
    if (m.alive && catchAt(m.x, m.y - 5, 4)) {
      m.alive = false;
      w.score += 50;
      w.mice_caught++;
      w.pops.push({ x: m.x, y: m.y - 8, text: "+50!", color: "#ffd866", age: 0 });
    }
  }
  w.mice = w.mice.filter((m) => m.alive);

  for (const p of w.pops) p.age += dt;
  w.pops = w.pops.filter((p) => p.age < 1);
}

/* ------------------------------ game ------------------------------ */

type Status = "idle" | "playing" | "over" | "stopped";

export function YarnGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLCanvasElement | null>(null);
  const worldRef = useRef<World>(freshWorld());
  const keys = useRef<Keys>({ left: false, right: false, up: false, down: false });
  const rafRef = useRef<number>(0);
  const statusRef = useRef<Status>("idle");

  const [status, setStatus] = useState<Status>("idle");
  const [hud, setHud] = useState({ score: 0, time: ROUND_SECONDS, caught: 0, mice: 0 });
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const bestRef = useRef(0);

  // Load best score (per-browser convenience only).
  useEffect(() => {
    let saved = 0;
    try {
      saved = Number(localStorage.getItem("kitty-yarn-best") || 0);
    } catch {
      /* storage blocked */
    }
    bestRef.current = saved;
    const id = setTimeout(() => setBest(saved), 0);
    return () => clearTimeout(id);
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    if (!roomRef.current) roomRef.current = paintRoom();
    const w = worldRef.current;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(roomRef.current, 0, 0);

    w.mice.forEach((m) => drawSprite(ctx, MOUSE, MOUSE_PAL, m.x - 8, m.y - 10, m.dir === -1));
    w.yarns.forEach((y) => {
      ctx.globalAlpha = y.age > 5 ? Math.max(0, 1 - (y.age - 5) * 2) : 1;
      drawYarn(ctx, y);
      ctx.globalAlpha = 1;
    });

    const k = w.kitty;
    const frame = k.grounded && Math.floor(k.walk * 8) % 2 === 1 ? KITTY_B : KITTY_A;
    drawSprite(ctx, frame, KITTY_PAL, k.x - 16, k.y - 22, k.face === -1);

    const pixelFont = getComputedStyle(document.body).getPropertyValue("--font-pixel") || "monospace";
    ctx.font = `8px ${pixelFont}`;
    ctx.textAlign = "center";
    w.pops.forEach((p) => {
      ctx.globalAlpha = Math.max(0, 1 - p.age);
      ctx.fillStyle = "#0c0812";
      ctx.fillText(p.text, p.x + 1, p.y - p.age * 16 + 1);
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, p.x, p.y - p.age * 16);
      ctx.globalAlpha = 1;
    });
  }, []);

  const finish = useCallback((reason: "over" | "stopped" = "over") => {
    statusRef.current = reason;
    setStatus(reason);
    cancelAnimationFrame(rafRef.current);
    const score = worldRef.current.score;
    const prev = bestRef.current;
    setNewBest(score > prev);
    if (score > prev) {
      bestRef.current = score;
      setBest(score);
      try {
        localStorage.setItem("kitty-yarn-best", String(score));
      } catch {
        /* storage blocked */
      }
    }
  }, []);

  const loop = useCallback(() => {
    let last = performance.now();
    let lastHud = "";
    const tick = (now: number) => {
      if (statusRef.current !== "playing") return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      stepWorld(worldRef.current, keys.current, dt);
      draw();
      const w = worldRef.current;
      const time = Math.max(0, Math.ceil(ROUND_SECONDS - w.t));
      const next = `${w.score}|${time}|${w.caught}|${w.mice_caught}`;
      if (next !== lastHud) {
        lastHud = next;
        setHud({ score: w.score, time, caught: w.caught, mice: w.mice_caught });
      }
      if (w.t >= ROUND_SECONDS) return finish();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [draw, finish]);

  const play = () => {
    worldRef.current = freshWorld();
    keys.current = { left: false, right: false, up: false, down: false };
    statusRef.current = "playing";
    setStatus("playing");
    setHud({ score: 0, time: ROUND_SECONDS, caught: 0, mice: 0 });
    cancelAnimationFrame(rafRef.current);
    loop();
    wrapRef.current?.focus({ preventScroll: true });
  };

  // First paint of the room, and cleanup.
  useEffect(() => {
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // Keyboard controls (only while playing, so the page scrolls normally otherwise).
  useEffect(() => {
    const map: Record<string, keyof Keys> = {
      ArrowLeft: "left",
      a: "left",
      ArrowRight: "right",
      d: "right",
      ArrowUp: "up",
      w: "up",
      " ": "up",
      ArrowDown: "down",
      s: "down",
    };
    const set = (e: KeyboardEvent, v: boolean) => {
      if (statusRef.current !== "playing") return;
      const k = map[e.key] ?? map[e.key.toLowerCase()];
      if (!k) return;
      e.preventDefault();
      keys.current[k] = v;
    };
    const down = (e: KeyboardEvent) => set(e, true);
    const up = (e: KeyboardEvent) => set(e, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const hold = (k: keyof Keys) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      keys.current[k] = true;
    },
    onPointerUp: () => (keys.current[k] = false),
    onPointerLeave: () => (keys.current[k] = false),
    onPointerCancel: () => (keys.current[k] = false),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  return (
    <Stage
      id="arcade"
      stage="ARCADE"
      title="Kitty yarn catch"
      kicker="Help the kitty catch falling yarn before it rolls away. Mice are worth extra if you're quick. You have 60 seconds."
    >
      <div className="pixel-box pixel-box--pink reveal p-3 sm:p-5">
        {/* scoreboard */}
        <div className="font-pixel mb-3 flex flex-wrap items-center justify-between gap-3 px-1 text-[0.55rem] sm:text-[0.62rem]">
          <span className="text-pink-soft">
            SCORE <span className="text-text">{String(hud.score).padStart(4, "0")}</span>
          </span>
          <span className="text-lilac">
            🧶 <span className="text-text">{hud.caught}</span> &nbsp;🐭 <span className="text-text">{hud.mice}</span>
          </span>
          <span className="text-gold">
            TIME <span className="text-text">{hud.time}</span>
          </span>
          <span className="text-mint">
            BEST <span className="text-text">{best}</span>
          </span>
        </div>

        {/* screen */}
        <div
          ref={wrapRef}
          tabIndex={-1}
          className="relative overflow-hidden rounded-md border-[3px] border-bg outline-none"
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="block h-full w-full"
            style={{ imageRendering: "pixelated" }}
            aria-label="Game screen: a living room with a couch, a coffee table and a kitty"
            role="img"
          />

          {status !== "playing" ? (
            <div className="absolute inset-0 grid place-items-center bg-bg/60 p-4 text-center backdrop-blur-[1px]">
              <div>
                {status === "over" || status === "stopped" ? (
                  <>
                    <p className="font-pixel text-glow text-sm text-pink-soft sm:text-2xl">
                      {status === "over" ? "TIME'S UP!" : "PAUSED FOR A NAP"}
                    </p>
                    <p className="font-term mt-2 text-xl text-text sm:mt-3 sm:text-3xl">
                      {hud.score} pts · {hud.caught} yarn · {hud.mice} mice
                    </p>
                    {newBest ? (
                      <p className="font-pixel mt-2 text-[0.55rem] text-gold">★ NEW HIGH SCORE ★</p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <p className="font-pixel text-glow text-sm text-pink-soft sm:text-2xl">READY?</p>
                    <p className="font-term mt-3 hidden text-2xl text-muted sm:block">
                      ← → move · ↑ / space jump · ↓ hop down
                    </p>
                    <p className="font-term mt-2 text-lg text-muted sm:hidden">Use the arrows below</p>
                  </>
                )}
                <button type="button" onClick={play} className="arcade-btn mt-5 !hidden sm:!inline-flex">
                  ▶ {status === "idle" ? "Play" : "Play again"}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3">
            {status === "playing" ? (
              <button type="button" onClick={() => finish("stopped")} className="arcade-btn arcade-btn--ghost">
                ■ Stop
              </button>
            ) : (
              <button type="button" onClick={play} className="arcade-btn">
                ▶ Play
              </button>
            )}
          </div>

          {/* touch d-pad */}
          <div className="flex select-none items-center gap-2 touch-none" aria-label="Touch controls">
            {(
              [
                ["left", "◀", "Move left"],
                ["up", "▲", "Jump"],
                ["down", "▼", "Hop down"],
                ["right", "▶", "Move right"],
              ] as const
            ).map(([k, glyph, label]) => (
              <button
                key={k}
                type="button"
                aria-label={label}
                disabled={status !== "playing"}
                className="font-pixel grid h-12 w-12 place-items-center rounded-lg border-[3px] border-line bg-panel-2 text-sm text-pink-soft shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none disabled:opacity-40"
                {...hold(k)}
              >
                {glyph}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}
