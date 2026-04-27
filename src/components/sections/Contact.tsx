"use client";

import { motion } from "framer-motion";
import { AtSign, BriefcaseBusiness, FileText, FolderGit2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, sectionViewport } from "@/lib/motion";

export function Contact() {
  const contactLinks = [
    { label: "Email", href: portfolioData.links.email, icon: AtSign },
    { label: "LinkedIn", href: portfolioData.links.linkedin, icon: BriefcaseBusiness },
    { label: "GitHub", href: portfolioData.links.github, icon: FolderGit2 },
    { label: "Resume", href: portfolioData.links.resume, icon: FileText },
  ];

  return (
    <Section id="contact" className="pb-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let&apos;s build something useful."
        description="If this work direction matches your team goals, I would love to connect."
      />

      <motion.div
        variants={fadeInUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        className="flex flex-wrap gap-3"
      >
        {contactLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
            aria-label={item.href.startsWith("mailto:") ? item.label : `${item.label} (opens in new tab)`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-[#ECE8F8] transition hover:border-[#F3A6C8]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]"
          >
            <item.icon size={15} />
            {item.label}
          </a>
        ))}
      </motion.div>
    </Section>
  );
}
