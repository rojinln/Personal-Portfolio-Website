import { portfolioData } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-[#B8B5C8] md:flex-row md:px-8 lg:px-10">
        <p>
          © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
        </p>
        <p className="text-center md:text-right">Built with Next.js, TypeScript, Tailwind, Framer Motion, and Three.js.</p>
      </div>
    </footer>
  );
}
