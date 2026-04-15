"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  Cpu,
  ShieldCheck,
  Globe2,
  Award,
  Sparkles,
  Rocket,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionBackground } from "@/components/ui/section-background";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { profileSkills } from "@/content/profile";

type LightTreatment = {
  icon: LucideIcon;
  gradient: string;
  accent: string; // heading + dash colour
  pillText: string; // base pill text colour
  headline: string; // Fraunces display line, mirrors feature card anatomy
};

// 4 restrained warm-light treatments, each with a different tint so the grid
// feels editorially varied without becoming a checkerboard.
const lightTreatments: LightTreatment[] = [
  {
    // Strategy & Leadership — soft peach/cream
    icon: Compass,
    gradient: "linear-gradient(135deg, #FDF6F1 0%, #FAE8DC 55%, #F6D9C4 100%)",
    accent: "#C8532C",
    pillText: "#5C3824",
    headline: "Board-room fluency, earned over twenty years.",
  },
  {
    // Technology & Architecture — cool pearl
    icon: Cpu,
    gradient: "linear-gradient(135deg, #F2F5FA 0%, #E9EEF6 55%, #DCE4EF 100%)",
    accent: "#0A2540",
    pillText: "#2a3d55",
    headline: "Every layer of the smart-city stack — sensor to citizen.",
  },
  {
    // Delivery & Governance — warm sand
    icon: ShieldCheck,
    gradient: "linear-gradient(135deg, #FBF6EC 0%, #F4EBD5 55%, #EADFC0 100%)",
    accent: "#8A5A22",
    pillText: "#4f361a",
    headline: "Ship at scale without drift. Governance that protects value.",
  },
  {
    // Sectors Delivered — soft mint
    icon: Globe2,
    gradient: "linear-gradient(135deg, #EEF6EF 0%, #E0EDE2 55%, #D2E4D5 100%)",
    accent: "#3E6B55",
    pillText: "#2f4d40",
    headline: "From giga-projects to diplomatic estates — thirteen sectors.",
  },
  {
    // AI & Agent Orchestration — soft lavender
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #F5F0FA 0%, #EBE2F2 55%, #DFD0EB 100%)",
    accent: "#6B47A8",
    pillText: "#3f2a64",
    headline: "Multi-agent orchestration, end-to-end.",
  },
  {
    // Venture Studio & Building — warm rose
    icon: Rocket,
    gradient: "linear-gradient(135deg, #FAF1F0 0%, #F4DEDC 55%, #ECC8C5 100%)",
    accent: "#9E3D44",
    pillText: "#5e2329",
    headline: "Building ventures from blank canvas to live deployment.",
  },
  {
    // Full-Stack Build & Deploy — cool slate
    icon: Code2,
    gradient: "linear-gradient(135deg, #F0F3F5 0%, #E3E9EC 55%, #D2DBDF 100%)",
    accent: "#34546E",
    pillText: "#243a4d",
    headline: "Shipping code, infra and integrations across the modern stack.",
  },
];

export function Capabilities() {
  // Split: all groups except Frameworks & Standards get light treatments;
  // Frameworks becomes the image-feature card at the bottom.
  const frameworksIndex = profileSkills.findIndex(
    (g) => g.heading === "Frameworks & Standards",
  );
  const lightGroups = profileSkills.filter(
    (_, i) => i !== frameworksIndex,
  );
  const featureGroup = profileSkills[frameworksIndex];

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-20">
      <SectionBackground src="/images/capabilities-bg.jpg" opacity={0.4} />
      <div className="mx-auto max-w-container px-6">
      <SectionHeader
        number="03"
        kicker="Capabilities"
        title={<>The full toolkit, grouped.</>}
      />

      <div className="mt-2 grid gap-3 md:grid-cols-2 lg:grid-cols-6 md:auto-rows-auto md:gap-4">
        {/* Four light cards — 3/3 top row, 3/3 second row */}
        {lightGroups.map((group, i) => {
          const t = lightTreatments[i];
          const Icon = t.icon;
          const plate = String(i + 1).padStart(2, "0");
          return (
            <motion.div
              key={group.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              style={{ backgroundImage: t.gradient }}
              className="relative isolate overflow-hidden rounded-xl p-4 md:p-5 lg:col-span-2 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:ring-ink/15 hover:shadow-[0_12px_28px_-16px_rgba(17,17,17,0.18)]"
            >
              {/* Oversized ghost-icon watermark — subtle graphic motif */}
              <Icon
                aria-hidden
                size={260}
                strokeWidth={0.8}
                className="pointer-events-none absolute -right-12 -top-12 z-0"
                style={{ color: `${t.accent}12` }}
              />
              {/* Corner gradient wash */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-bl-[100%]"
                style={{
                  background: `linear-gradient(to bottom left, ${t.accent}14, transparent 70%)`,
                }}
              />
              {/* Diagonal hairline grid — editorial paper texture */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-multiply"
                style={{
                  backgroundImage: `repeating-linear-gradient(135deg, ${t.accent}08 0px, ${t.accent}08 1px, transparent 1px, transparent 14px)`,
                }}
              />

              <GrainOverlay opacity={0.04} blendMode="overlay" />

              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 z-10 font-mono text-[10px] tracking-[0.2em]"
                style={{ color: `${t.accent}99` }}
              >
                {plate}
              </span>

              <div className="relative z-10 mb-2 flex items-center gap-2.5">
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-1"
                  style={{
                    backgroundColor: `${t.accent}14`,
                    borderColor: `${t.accent}40`,
                    color: t.accent,
                  }}
                >
                  <Icon size={13} strokeWidth={1.8} />
                </span>
                <span
                  className="label-caps text-[10px]"
                  style={{ color: t.accent }}
                >
                  {group.heading}
                </span>
              </div>

              {/* Display headline — mirrors feature card anatomy */}
              <h3
                className="font-display relative z-10 mb-2.5 text-[0.95rem] leading-[1.2] md:text-[1.05rem]"
                style={{ color: t.pillText }}
              >
                {t.headline}
              </h3>

              <div className="relative z-10 mb-2 flex items-center gap-2">
                <span
                  className="h-px w-6"
                  style={{ backgroundColor: t.accent }}
                />
                <span
                  className="font-mono text-[9.5px] tracking-[0.2em]"
                  style={{ color: `${t.accent}BB` }}
                >
                  {String(group.tags.length).padStart(2, "0")} capabilities
                </span>
              </div>

              <div className="relative z-10 flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border bg-white/55 px-2.5 py-1 text-[11.5px] backdrop-blur-sm transition hover:bg-white"
                    style={{
                      borderColor: `${t.accent}25`,
                      color: t.pillText,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Feature card — Frameworks & Standards with image + oxford overlay */}
        {featureGroup ? (
          <motion.div
            key={featureGroup.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative isolate overflow-hidden rounded-2xl p-8 text-white md:col-span-2 lg:col-span-6 md:p-10 ring-1 ring-black/10 transition hover:ring-ink/20"
          >
            <Image
              src="/images/fw-vro.jpg"
              alt="Frameworks and standards editorial backdrop"
              fill
              sizes="100vw"
              className="absolute inset-0 z-0 object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-[#0A2540]/95 via-[#0A2540]/75 to-[#0A2540]/40"
            />
            <div className="pointer-events-none absolute inset-0 z-20">
              <GrainOverlay opacity={0.05} blendMode="overlay" />
            </div>

            <span
              aria-hidden
              className="pointer-events-none absolute right-6 top-6 z-30 font-mono text-[11px] tracking-[0.2em] text-white/60"
            >
              05
            </span>

            <div className="relative z-30 mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-[#E8A87C]/50 text-[#E8A87C]">
                <Award size={18} strokeWidth={1.8} />
              </span>
              <span className="label-caps text-[#E8A87C]">
                {featureGroup.heading}
              </span>
            </div>

            <h3 className="font-display relative z-30 max-w-2xl text-2xl leading-tight text-white md:text-[1.75rem]">
              Author of four proprietary methodologies. Practitioner of every global smart-city standard that matters.
            </h3>

            <div className="relative z-30 mt-5 mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#E8A87C]" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#E8A87C]/90">
                {String(featureGroup.tags.length).padStart(2, "0")} frameworks & standards
              </span>
            </div>

            <div className="relative z-30 flex flex-wrap gap-1.5">
              {featureGroup.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11.5px] text-white/90 backdrop-blur-sm transition hover:border-[#E8A87C]/60 hover:bg-white/15 hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
      </div>
    </section>
  );
}
