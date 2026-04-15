"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { competencies } from "@/content/profile";

export function Competencies() {
  return (
    <section className="relative bg-white/60">
      <div className="mx-auto max-w-container px-6 py-24 md:py-32">
        <SectionHeader
          number="07"
          kicker="Core Competencies"
          title={<>The full toolkit.</>}
        />
        <div className="grid gap-10 md:grid-cols-2">
          {competencies.map((block, idx) => (
            <motion.div
              key={block.heading}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <div className="label-caps">{block.heading}</div>
              <div className="mt-5 flex flex-wrap gap-2">
                {block.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-sm text-ink transition hover:border-accent hover:text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
