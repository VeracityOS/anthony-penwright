"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  Rocket,
  BookOpen,
  Share2,
  Sparkles,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { valuePillars } from "@/content/profile";

const pillarIcons: LucideIcon[] = [Compass, Rocket, BookOpen, Share2, Sparkles, Layers];

export function ValuePillars() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Section background — editorial growth-lines banner, visible but restrained */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/value-pillars-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.55]"
        />
        {/* Soft canvas scrim — top and bottom fade, centre keeps texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/10 to-canvas" />
        <GrainOverlay opacity={0.04} blendMode="overlay" />
      </div>

      <div className="mx-auto max-w-container px-6">
        <SectionHeader
          number="02"
          kicker="How I Add Value"
          title={<>Six ways my work moves the needle.</>}
          lede="Clarity at the top, delivery at scale, methodology underneath, ecosystem thinking — now with AI-native operating and a live venture studio on top."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valuePillars.map((v, i) => {
            const Icon = pillarIcons[i] ?? Compass;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group relative isolate overflow-hidden rounded-2xl bg-white/85 p-8 shadow-[0_1px_0_rgba(17,17,17,0.02)] ring-1 ring-black/5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:ring-accent/40 hover:shadow-[0_16px_40px_-20px_rgba(17,17,17,0.2)] md:p-10"
              >
                {/* Subtle oversized background icon — graphic motif */}
                <Icon
                  aria-hidden
                  size={220}
                  strokeWidth={1}
                  className="pointer-events-none absolute -right-10 -top-10 z-0 text-accent/[0.06]"
                />

                {/* Corner gradient accent */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-bl-[100%] bg-gradient-to-bl from-accent/[0.09] to-transparent"
                />

                {/* Plate number + icon badge row */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/30">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-accent/80">
                      0{i + 1}
                    </span>
                  </div>
                  {/* Hairline travel line */}
                  <span className="h-px w-16 bg-gradient-to-r from-accent/40 to-transparent" />
                </div>

                <h3 className="font-display relative z-10 mt-5 text-2xl leading-tight text-ink md:text-[1.75rem]">
                  {v.title}
                </h3>
                <p className="relative z-10 mt-4 text-base leading-relaxed text-muted md:text-[17px]">
                  {v.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
