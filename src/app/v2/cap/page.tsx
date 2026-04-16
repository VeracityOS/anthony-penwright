"use client";

import Link from "next/link";
import { ArrowUpRight, Terminal, Tags, Command, Network } from "lucide-react";
import { motion } from "framer-motion";
import {
  AuroraBackground,
  DisplayHeading,
  FadeUp,
  FloatingBubbles,
  Mono,
  NoiseOverlay,
  SectionKicker,
  SpotlightCard,
  StatusDot,
  TOKENS,
  usePageScroll,
} from "@/components/v2/v2-primitives";
import { profileSkills } from "@/content/profile";

const variants = [
  {
    slug: "a",
    kicker: "Variant A",
    title: "Command-palette / IDE panel",
    body: "Left file-tree list of groups, right-pane tag cloud, keyboard hints, accent cycles per active group. Feels like a developer tool.",
    Icon: Command,
    accent: TOKENS.emerald,
    spotlight: "rgba(52,211,153,0.20)",
  },
  {
    slug: "b",
    kicker: "Variant B",
    title: "Filterable tag cloud",
    body: "All tags flow as one responsive cloud. Toggleable group pills with counts highlight a subset with its accent — Arc-style command palette.",
    Icon: Tags,
    accent: TOKENS.violet,
    spotlight: "rgba(167,139,250,0.20)",
  },
  {
    slug: "c",
    kicker: "Variant C",
    title: "Terminal / system log",
    body: "Monospaced terminal blocks — window chrome, ❯ prompt, accent left-borders, blinking cursor. Aurora bleeds through the edges of the panel.",
    Icon: Terminal,
    accent: TOKENS.cyan,
    spotlight: "rgba(34,211,238,0.20)",
  },
  {
    slug: "d",
    kicker: "Variant D",
    title: "Radial constellation",
    body: "SVG canvas — 8 headings arranged clock-wise, tags float around the periphery, animated lines connect each group to its tags.",
    Icon: Network,
    accent: TOKENS.pink,
    spotlight: "rgba(244,114,182,0.20)",
  },
] as const;

const totalCapabilities = profileSkills.reduce(
  (sum, g) => sum + g.tags.length,
  0,
);

export default function CapIndexPage() {
  const { scrollY } = usePageScroll();

  return (
    <main
      className="relative min-h-screen overflow-x-hidden antialiased"
      style={{
        background: TOKENS.canvas,
        color: TOKENS.ink,
        fontFamily: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <style>{`
        ::selection { background: rgba(52,211,153,0.4); color: #fff; }
        html { scroll-behavior: smooth; background: ${TOKENS.canvas}; }
        body { background: ${TOKENS.canvas}; }
      `}</style>

      <AuroraBackground scrollY={scrollY} />
      <FloatingBubbles />
      <NoiseOverlay opacity={0.03} />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "calc((100vw - 40px) / 12) 100%",
          backgroundPosition: "20px 0",
          maskImage:
            "linear-gradient(to bottom, transparent 0, black 300px, black calc(100% - 300px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black 300px, black calc(100% - 300px), transparent 100%)",
        }}
      />

      {/* Top pill — same floating style, links back to /v2 */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex items-center justify-between px-4 md:top-6 md:px-6">
        <Link
          href="/v2"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11.5px] text-white/75 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px -10px rgba(0,0,0,0.5)",
          }}
        >
          ← Back to /v2
        </Link>
        <div
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-xl"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px -10px rgba(0,0,0,0.5)",
          }}
        >
          <span className="flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5">
            <StatusDot />
            <Mono style={{ color: TOKENS.ink }}>AP · capability mockups</Mono>
          </span>
        </div>
      </div>

      <div className="relative z-10 px-5 pt-28 pb-16 sm:px-8 md:pt-32 md:pb-24 lg:px-[5vw] xl:px-[6vw]">
        <div className="mx-auto max-w-[1600px]">
          <SectionKicker
            index="03"
            label="Capabilities · Mockups"
            keys={["A", "B", "C", "D"]}
          />
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <DisplayHeading gradient>Capabilities — four takes.</DisplayHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-white/65">
              Same 8 groups, same {totalCapabilities} capabilities — rendered
              four different ways. Pick the one that feels right.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {variants.map((v, i) => {
              const Icon = v.Icon;
              return (
                <FadeUp key={v.slug} delay={Math.min(i * 0.05, 0.2)}>
                  <Link href={`/v2/cap/${v.slug}`} className="block h-full">
                    <SpotlightCard
                      className="flex h-full flex-col p-7 md:p-8"
                      spotlightColor={v.spotlight}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{
                            background: `linear-gradient(135deg, ${v.accent}22, ${v.accent}0a)`,
                            border: `1px solid ${v.accent}40`,
                          }}
                        >
                          <Icon
                            className="h-4 w-4"
                            style={{ color: v.accent }}
                          />
                        </div>
                        <Mono style={{ color: TOKENS.inkFaint }}>
                          0{i + 1} / 04
                        </Mono>
                      </div>

                      <Mono
                        className="mt-6"
                        style={{ color: v.accent, letterSpacing: "0.24em" }}
                      >
                        {v.kicker}
                      </Mono>
                      <h3 className="mt-2 text-[22px] font-[600] leading-tight tracking-[-0.01em] text-white md:text-[26px]">
                        {v.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/65">
                        {v.body}
                      </p>

                      {/* Mini preview bar — palette + arrow */}
                      <div className="mt-7 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {[
                            TOKENS.emerald,
                            TOKENS.violet,
                            TOKENS.cyan,
                            TOKENS.amber,
                            TOKENS.pink,
                          ].map((c) => (
                            <span
                              key={c}
                              className="h-2 w-6 rounded-full"
                              style={{
                                background: c,
                                opacity: c === v.accent ? 1 : 0.3,
                                boxShadow:
                                  c === v.accent ? `0 0 12px ${c}` : undefined,
                              }}
                            />
                          ))}
                        </div>
                        <motion.span
                          whileHover={{ x: 3, y: -3 }}
                          className="inline-flex items-center gap-1 text-[12px] text-white/80"
                        >
                          Open mockup
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </motion.span>
                      </div>
                    </SpotlightCard>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
