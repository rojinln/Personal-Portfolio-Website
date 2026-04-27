"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float, MeshDistortMaterial } from "@react-three/drei";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import * as THREE from "three";

// ── Avatar helper ─────────────────────────────────────────────────────────────
// DiceBear renders hair AFTER all facial features in SVG DOM order, so the
// hair fringe paints over eyes, eyebrows, nose, and mouth. Fix: extract every
// facial feature group and reinsert them at the very end so they always render
// on top of hair regardless of style.
function liftFeaturesAboveHair(svg: string): string {
  // Groups to lift, in the order they should appear (back → front)
  const selectors = [
    "translate\\(78 134\\)",  // mouth
    "translate\\(104 122\\)", // nose
    "translate\\(76 82\\)",   // eyebrows
    "translate\\(76 90\\)",   // eyes
  ];

  const extracted: string[] = [];
  let fixed = svg;

  for (const sel of selectors) {
    const match = fixed.match(new RegExp(`<g transform="${sel}">([\\s\\S]*?)<\\/g>`))?.[0];
    if (match) {
      fixed = fixed.replace(match, "");
      extracted.push(match);
    }
  }

  // Re-insert all lifted groups before the final closing tags
  fixed = fixed.replace("</g></g></svg>", extracted.join("") + "</g></g></svg>");
  return fixed;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildUri(overrides: Record<string, any>): string {
  const raw = createAvatar(avataaars, {
    seed: "rojin-portfolio-2025",
    skinColor: ["ffdbb4"],
    top: ["straight01"],       // long straight hair
    hairColor: ["4a312c"],
    clothing: ["collarAndSweater"],
    clothesColor: ["e57fa8"],
    eyebrows: ["defaultNatural"],
    accessoriesProbability: 0,
    facialHairProbability: 0,
    backgroundColor: ["transparent"],
    ...overrides,
  }).toString();
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(liftFeaturesAboveHair(raw))}`;
}

// ── Three.js orb ─────────────────────────────────────────────────────────────
function GlowOrb({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.09;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <MeshDistortMaterial
          color={hovered ? "#fde68a" : "#C4B5FD"}
          emissive={hovered ? "#f59e0b" : "#7c3aed"}
          emissiveIntensity={hovered ? 0.7 : 0.35}
          distort={0.42}
          speed={2.4}
          transparent
          opacity={hovered ? 0.26 : 0.2}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

function AvatarScene({ hovered }: { hovered: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Key light — warm front */}
      <pointLight position={[2, 3, 4]}  intensity={hovered ? 2.8 : 1.8} color={hovered ? "#fde68a" : "#fff5f5"} />
      {/* Fill light — cool left */}
      <pointLight position={[-3, 1, 2]} intensity={0.7} color="#7DD3FC" />
      {/* Rim light — purple back */}
      <pointLight position={[0, -2, -3]} intensity={hovered ? 1.2 : 0.8} color="#C4B5FD" />

      <GlowOrb hovered={hovered} />

      <Sparkles
        count={hovered ? 80 : 45}
        scale={5}
        size={hovered ? 2.4 : 1.6}
        speed={hovered ? 0.8 : 0.3}
        color={hovered ? "#fde68a" : "#C4B5FD"}
        opacity={hovered ? 1 : 0.6}
      />
    </>
  );
}

export default function GirlAvatar() {
  const [hovered, setHovered] = useState(false);

  const idleUri = useMemo(
    () => buildUri({ eyes: ["happy"], eyebrows: ["raisedExcitedNatural"], mouth: ["smile"] }),
    []
  );

  const hoveredUri = useMemo(
    () =>
      buildUri({
        eyes: ["happy"],
        eyebrows: ["defaultNatural"],
        mouth: ["twinkle"],
        accessories: ["sunglasses"],
        accessoriesProbability: 100,
        accessoriesColor: ["2c1b18"],
      }),
    []
  );

  return (
    <div
      className="relative flex h-[340px] w-full items-end justify-center overflow-hidden md:h-[420px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 42 }} gl={{ alpha: true }}>
          <AvatarScene hovered={hovered} />
        </Canvas>
      </div>

      {/* Sun-burst bloom on hover */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={
          hovered
            ? { opacity: 1, scale: 1.3 }
            : { opacity: 0, scale: 0.85 }
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(253,230,138,0.45) 0%, rgba(245,158,11,0.2) 45%, transparent 72%)",
          filter: "blur(16px)",
        }}
      />

      {/* halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(196,181,253,0.25) 0%, rgba(243,166,200,0.16) 55%, transparent 82%)",
          filter: "blur(22px)",
        }}
      />

      {/* Light disc behind the face */}
      <div
        className="pointer-events-none absolute left-1/2 z-[2] h-[170px] w-[150px] -translate-x-1/2 rounded-full"
        style={{
          top: "28%",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,248,235,0.22) 0%, rgba(255,240,220,0.10) 55%, transparent 80%)",
          filter: "blur(8px)",
        }}
      />

      {/* Avatar */}
      <motion.div
        className="relative z-10 flex select-none items-end justify-center"
        animate={
          hovered
            ? {
                y: -10,
                scale: 1.06,
                rotateY: 4,
                filter: "drop-shadow(0 28px 48px rgba(196,181,253,0.7)) drop-shadow(0 4px 12px rgba(253,230,138,0.5))",
              }
            : {
                y: [0, -11, 0],
                scale: 1,
                rotateY: 0,
                filter: "drop-shadow(0 18px 36px rgba(196,181,253,0.45))",
              }
        }
        transition={
          hovered
            ? { duration: 0.35, ease: "easeOut" }
            : {
                y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 0.35 },
                scale: { duration: 0.35 },
                rotateY: { duration: 0.35 },
              }
        }
        style={{ perspective: 600 }}
      >
        {/* shadow */}
        <motion.div
          className="absolute bottom-[-8px] left-1/2 z-[-1] h-5 w-44 -translate-x-1/2 rounded-full bg-[#C4B5FD]/25 blur-xl"
          animate={{ opacity: hovered ? 0.85 : 0.4, scaleX: hovered ? 1.25 : 1 }}
          transition={{ duration: 0.35 }}
        />

        {/* Idle avatar */}
        <motion.img
          key="idle"
          src={idleUri}
          alt="Developer avatar"
          width={310}
          height={310}
          draggable={false}
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0"
          style={{ imageRendering: "auto" }}
        />

        {/* Hovered avatar */}
        <motion.img
          key="hovered"
          src={hoveredUri}
          alt="Developer avatar smiling"
          width={310}
          height={310}
          draggable={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="bottom-0"
          style={{ imageRendering: "auto" }}
        />
      </motion.div>

      {/* Floating tech badges */}
      {[
        { text: "Software Engineer", color: "#7DD3FC", x: "6%",  y: "20%", delay: 0 },
        { text: "Full Stack Developer",    color: "#7DD3FC", x: "25%", y: "7%", delay: 0.35 },
        { text: "Problem Solver",   color: "#F3A6C8", x: "68%", y: "16%", delay: 0.35 },
        { text: "Data & ML",    color: "#C4B5FD", x: "2%",  y: "66%", delay: 0.7 },
        { text: "F1 Ferrari Fan",    color: "#ff0000", x: "68%", y: "35%", delay: 0.35 },
      ].map((badge) => (
        <motion.span
          key={badge.text}
          className="absolute z-20 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md"
          style={{ color: badge.color, left: badge.x, top: badge.y }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: badge.delay + 0.5, duration: 0.4 },
            scale:   { delay: badge.delay + 0.5, duration: 0.4 },
            y: { delay: badge.delay, duration: 2.8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {badge.text}
        </motion.span>
      ))}
    </div>
  );
}
