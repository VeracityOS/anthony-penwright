"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { valuePillars } from "@/content/profile";

export function ValuePillars() {
  return (
    <section className="mx-auto max-w-container px-6 py-24 md:py-32">
      <SectionHeader
        number="02"
        kicker="How I Add Value"
        title={<>Four ways my work moves the needle.</>}
        lede="Clarity at the top, delivery at scale, methodology underneath, ecosystem thinking across it all."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {valuePillars.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            className="group relative rounded-2xl bg-white p-8 ring-1 ring-black/5 transition hover:ring-accent/40 md:p-10"
          >
            <div className="font-mono text-xs text-accent">0{i + 1}</div>
            <h3 className="font-display mt-4 text-2xl leading-tight text-ink md:text-[1.75rem]">
              {v.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-[17px]">
              {v.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
