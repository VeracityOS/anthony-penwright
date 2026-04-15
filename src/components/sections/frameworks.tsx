"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionBackground } from "@/components/ui/section-background";
import { FrameworkCard } from "@/components/ui/framework-card";
import { frameworks, frameworkLoop } from "@/content/frameworks";

export function Frameworks() {
  return (
    <section className="relative isolate overflow-hidden">
      <SectionBackground src="/images/frameworks-bg.jpg" opacity={0.6} />
      <div className="mx-auto max-w-container px-6 py-14 md:py-20">
        <SectionHeader
          number="03"
          kicker="The Four Frameworks"
          title={
            <>
              Codified methodology, not consulting theatre.
            </>
          }
          lede="Twenty years of smart-city and digital-infrastructure delivery, distilled into four closed-loop advisory frameworks — each with constructs, scoring models and standing outputs. Each one is live, in production, on a real programme."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {frameworks.map((fw, i) => (
            <FrameworkCard key={fw.number} fw={fw} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-6 rounded-xl border border-hairline bg-white/70 p-5 backdrop-blur md:p-6"
        >
          <div className="label-caps text-[10px]">{frameworkLoop.headline}</div>
          <p className="font-display mt-2 text-base leading-snug text-ink md:text-lg">
            {frameworkLoop.body}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
            {[
              { k: "WHAT", v: "Innovation Ecosystem" },
              { k: "HOW", v: "Smart Services" },
              { k: "RUN", v: "Operations" },
              { k: "KEEP DELIVERING", v: "Value Realisation Office" },
            ].map((step, i) => (
              <div
                key={step.k}
                className="relative flex items-baseline gap-2 rounded-lg bg-canvas px-3 py-2 ring-1 ring-hairline"
              >
                <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
                <div>
                  <div className="label-caps text-[9px]">{step.k}</div>
                  <div className="font-display text-[12.5px] leading-tight text-ink">{step.v}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
