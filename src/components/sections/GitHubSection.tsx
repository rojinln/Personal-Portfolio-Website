"use client";

import { motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, sectionViewport } from "@/lib/motion";

export function GitHubSection() {
  return (
    <Section id="code-repositories">
      <SectionHeading
        eyebrow="Code & Repositories"
        title="Curated repositories with clear context."
        description="Selected repos will be curated and documented for hiring managers to scan quickly."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {portfolioData.repositories.map((repo, index) => (
          <motion.div
            key={repo.title}
            variants={fadeInUp(index * 0.04)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
          >
            <GlassCard className="h-full">
              <p className="text-xs uppercase tracking-[0.18em] text-[#B8B5C8]">{repo.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#F8FAFC]">{repo.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#C7C4D7]">{repo.description}</p>
              <a
                href={repo.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${repo.title} repository (opens in new tab)`}
                className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-[#EDE9F9] transition hover:border-[#7DD3FC]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]"
              >
                <FolderGit2 size={14} />
                Open repository
              </a>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
