"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { timeline } from "@/content/timeline";

export function CareerTimeline() {
  return (
    <section className="relative bg-white/60">
      <div className="mx-auto max-w-container px-6 py-24 md:py-32">
        <SectionHeader
          number="05"
          kicker="Full Career Timeline"
          title={<>Twenty-three years of government, enterprise and giga-project delivery.</>}
        />
        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-hairline md:left-[calc(20%+7px)]"
          />
          {timeline.map((t, i) => (
            <motion.li
              key={`${t.org}-${t.role}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              className="relative grid grid-cols-1 gap-3 pl-8 pb-8 md:grid-cols-[20%_1fr] md:gap-6 md:pl-0"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[9px] h-[14px] w-[14px] rounded-full bg-canvas ring-2 ring-accent md:left-[20%] md:-translate-x-1/2"
              />
              <div className="md:pr-6 md:text-right">
                <div className="font-mono text-xs text-muted">{t.period}</div>
                <div className="font-mono text-sm text-accent">{t.value}</div>
              </div>
              <div>
                <div className="label-caps">{t.org}</div>
                <div className="font-display mt-1 text-xl leading-tight text-ink md:text-2xl">
                  {t.role}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
