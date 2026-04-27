"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, sectionViewport } from "@/lib/motion";

export function CurrentWork() {
  const current = portfolioData.currentWork;

  return (
    <Section id="current-work">
      <SectionHeading
        eyebrow="Currently Building"
        title={current.title}
        description="Will be added to github soon."
      />

      <motion.div
        variants={fadeInUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <GlassCard className="bg-gradient-to-br from-[#F3A6C8]/8 via-[#0F172A]/85 to-[#7DD3FC]/10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm text-[#B8B5C8]">Current status</p>
              <p className="mt-2 text-base text-[#F8FAFC]">{current.status}</p>

              <p className="mt-6 text-sm text-[#B8B5C8]">Goal</p>
              <p className="mt-2 text-base text-[#F8FAFC]">{current.goal}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {current.stack.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm text-[#B8B5C8]">Next steps</p>
                <ul className="mt-3 space-y-2 text-sm text-[#E8E4F3]">
                  {current.nextSteps.map((step) => (
                    <li key={step} className="flex items-start gap-2">
                      <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-[#C4B5FD]" aria-hidden />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0A1020]/80 p-5">
              <h3 className="text-base font-semibold text-[#F8FAFC]">Progress checklist</h3>
              <ul className="mt-4 space-y-3">
                {current.checklist.map((item) => (
                  <li key={item.label} className="flex items-start gap-3 text-sm text-[#D7D4E6]">
                    {item.done ? (
                      <CheckCircle2 size={17} className="mt-0.5 text-[#7DD3FC]" />
                    ) : (
                      <CircleDashed size={17} className="mt-0.5 text-[#F3A6C8]" />
                    )}
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </Section>
  );
}
