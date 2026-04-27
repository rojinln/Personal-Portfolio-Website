"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeIn, fadeInUp, sectionViewport } from "@/lib/motion";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Focused toolkit for practical product delivery."
        description="Balanced across engineering, data, and frontend execution."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {portfolioData.skills.map((category, index) => (
          <motion.div
            key={category.title}
            variants={fadeInUp(index * 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
          >
            <GlassCard className="h-full">
              <h3 className="text-lg font-semibold text-[#F8FAFC]">{category.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <motion.div
        variants={fadeIn(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#7DD3FC]/25 bg-[#7DD3FC]/10 px-4 py-2 text-sm text-[#D8F3FF]"
      >
        <Sparkles size={15} />
        <span>{portfolioData.skillNote}</span>
      </motion.div>
    </Section>
  );
}
