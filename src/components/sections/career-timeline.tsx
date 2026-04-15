"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionBackground } from "@/components/ui/section-background";
import { timeline } from "@/content/timeline";

export function CareerTimeline() {
  return (
    <section className="relative isolate overflow-hidden">
      <SectionBackground src="/images/timeline-bg.jpg" opacity={0.5} />
      <div className="mx-auto max-w-container px-6 py-14 md:py-20">
        <SectionHeader
          number="05"
          kicker="Full Career Timeline"
          title={<>Twenty-three years of government, enterprise and giga-project delivery.</>}
        />
        {/* Compact 2-col on tablet, 3-col on desktop — fits in the viewport */}
        <ol className="grid gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
          {timeline.map((t, i) => (
            <motion.li
              key={`${t.org}-${t.role}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.025 }}
              className="group relative flex items-start gap-3 rounded-lg border border-hairline bg-white/70 px-3 py-2.5 backdrop-blur-sm transition hover:border-accent/40 hover:bg-white"
            >
              <span
                aria-hidden
                className="mt-[6px] h-[10px] w-[10px] shrink-0 rounded-full bg-canvas ring-2 ring-accent"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="label-caps text-[9.5px] truncate">{t.org}</span>
                  <span className="font-mono text-[10px] text-accent shrink-0">{t.value}</span>
                </div>
                <div className="font-display mt-0.5 text-[14px] leading-tight text-ink truncate">
                  {t.role}
                </div>
                <div className="font-mono text-[10px] text-muted">{t.period}</div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
