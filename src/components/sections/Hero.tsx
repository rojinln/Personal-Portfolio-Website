"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Download, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { portfolioData } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { fadeInUp, sectionViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const GirlAvatar = dynamic(() => import("@/components/three/GirlAvatar"), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] w-full animate-pulse rounded-3xl border border-white/10 bg-white/5 md:h-[420px]" />
  ),
});

const iconMap: Record<string, ReactNode> = {
  "View Projects": <ArrowRight size={16} />,
  "View GitHub": <Code2 size={16} />,
  "Download Resume": <Download size={16} />,
  "Contact Me": <Mail size={16} />,
};

export function Hero() {
  return (
    <Section id="top" className="relative overflow-hidden pt-34 md:pt-38">
      <div className="pointer-events-none absolute -left-24 top-18 h-72 w-72 rounded-full bg-[#F3A6C8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#7DD3FC]/15 blur-3xl" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={fadeInUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <p className="mb-4 inline-flex rounded-full border border-[#C4B5FD]/30 bg-[#C4B5FD]/10 px-4 py-1 text-xs font-medium tracking-wide text-[#DCD4FD]">
            Open to impactful opportunities
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#F8FAFC] sm:text-5xl md:text-6xl">
            Hi, I&apos;m {portfolioData.name}.
          </h1>
          <p className="mt-5 text-lg font-medium text-[#D7D3E6]">{portfolioData.title}</p>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#B8B5C8]">{portfolioData.bio}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {portfolioData.heroActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                aria-label={action.external ? `${action.label} (opens in new tab)` : action.label}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]",
                  action.variant === "primary"
                    ? "bg-gradient-to-r from-[#F3A6C8] to-[#C4B5FD] text-[#0C1020] hover:opacity-90"
                    : "border border-white/20 bg-white/5 text-[#E8E6F2] hover:border-white/35 hover:bg-white/10",
                )}
              >
                {iconMap[action.label] ?? <ArrowRight size={16} />}
                <span>{action.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="rounded-3xl border border-white/12 bg-white/[0.04] p-3 backdrop-blur-sm"
        >
          <GirlAvatar />
        </motion.div>
      </div>
    </Section>
  );
}
