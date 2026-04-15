"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { FrameworkCard } from "@/components/ui/framework-card";
import { AuroraBlob } from "@/components/ui/aurora-blob";
import { frameworks, frameworkLoop } from "@/content/frameworks";

export function Frameworks() {
  return (
    <section className="relative isolate bg-gradient-to-b from-canvas via-white/40 to-canvas">
      <AuroraBlob
        className="top-20 right-0 h-[700px] w-[900px]"
        colors={["#EDE7F6", "#FFE8E0", "#E4F1EA"]}
        opacity={0.4}
      />
      <div className="mx-auto max-w-container px-6 py-28 md:py-36">
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

        <div className="space-y-8 md:space-y-10">
          {frameworks.map((fw, i) => (
            <FrameworkCard key={fw.number} fw={fw} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-2xl border border-hairline bg-white/70 p-8 backdrop-blur md:p-10"
        >
          <div className="label-caps">{frameworkLoop.headline}</div>
          <p className="font-display mt-4 text-2xl leading-snug text-ink md:text-3xl">
            {frameworkLoop.body}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 text-sm md:grid-cols-4">
            {[
              { k: "WHAT", v: "Innovation Ecosystem" },
              { k: "HOW", v: "Smart Services" },
              { k: "RUN", v: "Operations" },
              { k: "KEEP DELIVERING", v: "Value Realisation Office" },
            ].map((step, i) => (
              <div
                key={step.k}
                className="relative flex items-baseline gap-3 rounded-xl bg-canvas px-4 py-3 ring-1 ring-hairline"
              >
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <div>
                  <div className="label-caps">{step.k}</div>
                  <div className="font-display text-base text-ink">{step.v}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
