"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, Microscope } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, sectionViewport } from "@/lib/motion";

const iconByKey = {
  engineering: Code2,
  data: BrainCircuit,
  research: Microscope,
};

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="Multidisciplinary, focused, and product-minded."
        description={portfolioData.shortBio}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {portfolioData.aboutCards.map((card, index) => {
          const Icon = iconByKey[card.key];
          return (
            <motion.div
              key={card.title}
              variants={fadeInUp(index * 0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
            >
              <GlassCard className="h-full">
                <div className="mb-4 inline-flex rounded-xl border border-[#C4B5FD]/30 bg-[#C4B5FD]/10 p-2 text-[#E7E2FE]">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-[#F8FAFC]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#B8B5C8]">{card.description}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        variants={fadeInUp(0.18)}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        className="mt-8 text-sm leading-7 text-[#9896AA] italic"
      >
        {portfolioData.personalNote}
      </motion.p>
    </Section>
  );
}
