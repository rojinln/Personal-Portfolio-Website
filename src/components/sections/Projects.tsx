"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, sectionViewport } from "@/lib/motion";

export function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Selected work with clear outcomes."
        description="Some academic repositories are private, but selected project summaries, architecture decisions, and outcomes are shared below."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {portfolioData.projects.map((project, index) => {
          const isOpen = expandedIndex === index;
          return (
            <motion.div
              key={project.title}
              variants={fadeInUp(index * 0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              className="rounded-2xl bg-gradient-to-br from-[#F3A6C8]/35 via-[#C4B5FD]/15 to-[#7DD3FC]/25 p-[1px]"
            >
              <GlassCard className="h-full bg-[#0D1327]/80">
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1327]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-[#F8FAFC]">{project.title}</h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 shrink-0 text-[#B8B5C8]"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#B8B5C8]">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Pill key={tech}>{tech}</Pill>
                    ))}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm text-[#D8D5E7]">
                        <p>
                          <span className="font-semibold text-[#F3A6C8]">Problem solved:</span> {project.problemSolved}
                        </p>
                        <p>
                          <span className="font-semibold text-[#7DD3FC]">What I learned:</span> {project.learned}
                        </p>
                      </div>
                      {project.links.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${project.title} - ${link.label} (opens in new tab)`}
                              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-[#ECE8F8] transition hover:border-[#C4B5FD]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]"
                            >
                              {link.label}
                              <ArrowUpRight size={14} />
                            </a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
