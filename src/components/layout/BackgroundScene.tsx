export function BackgroundScene() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Noise grain texture */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.032]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Orbs — distributed across full viewport height */}

      {/* Top-left — pink */}
      <div
        className="bg-orb absolute -left-40 -top-28 h-[560px] w-[560px] rounded-full bg-[#F3A6C8] opacity-[0.13] blur-[140px]"
        style={{ animationDelay: "0s", animationDuration: "22s" }}
      />

      {/* Top-right — purple */}
      <div
        className="bg-orb absolute -right-40 top-0 h-[580px] w-[580px] rounded-full bg-[#C4B5FD] opacity-[0.14] blur-[150px]"
        style={{ animationDelay: "7s", animationDuration: "26s" }}
      />

      {/* Mid-left — sky blue */}
      <div
        className="bg-orb absolute -left-24 top-[38%] h-[480px] w-[480px] rounded-full bg-[#7DD3FC] opacity-[0.10] blur-[130px]"
        style={{ animationDelay: "3s", animationDuration: "24s" }}
      />

      {/* Mid-right — pink */}
      <div
        className="bg-orb absolute -right-20 top-[52%] h-[440px] w-[440px] rounded-full bg-[#F3A6C8] opacity-[0.09] blur-[120px]"
        style={{ animationDelay: "11s", animationDuration: "20s" }}
      />

      {/* Bottom-left — purple */}
      <div
        className="bg-orb absolute -bottom-32 left-[8%] h-[500px] w-[500px] rounded-full bg-[#C4B5FD] opacity-[0.11] blur-[140px]"
        style={{ animationDelay: "5s", animationDuration: "28s" }}
      />

      {/* Bottom-right — sky blue */}
      <div
        className="bg-orb absolute -bottom-28 right-[4%] h-[460px] w-[460px] rounded-full bg-[#7DD3FC] opacity-[0.10] blur-[130px]"
        style={{ animationDelay: "14s", animationDuration: "23s" }}
      />

      {/* Centre vignette — frames the content, deepens edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 55%, rgba(7,11,22,0.55) 100%)",
        }}
      />
    </div>
  );
}
