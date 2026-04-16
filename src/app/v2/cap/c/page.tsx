"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  DisplayHeading,
  FadeUp,
  Mono,
  SectionKicker,
  TOKENS,
} from "@/components/v2/v2-primitives";
import { profileSkills } from "@/content/profile";
import CapShell from "../_shell";

const ACCENTS = [
  TOKENS.emerald,
  TOKENS.violet,
  TOKENS.cyan,
  TOKENS.amber,
  TOKENS.emerald,
  TOKENS.violet,
  TOKENS.cyan,
  TOKENS.pink,
];

const ACCENT_NAMES = [
  "emerald",
  "violet",
  "cyan",
  "amber",
  "emerald",
  "violet",
  "cyan",
  "pink",
];

// Slugify heading → terminal-friendly identifier.
function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function VariantCPage() {
  const reduce = useReducedMotion();
  const total = profileSkills.reduce((s, g) => s + g.tags.length, 0);

  return (
    <CapShell>
      <section className="relative px-5 pb-16 sm:px-8 md:pb-24 lg:px-[5vw] xl:px-[6vw]">
        <div className="mx-auto max-w-[1600px]">
          <SectionKicker
            index="C"
            label="Capabilities · System log"
            keys={["tty"]}
          />
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <DisplayHeading gradient>capabilities.log</DisplayHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-white/65">
              {total} capabilities — piped through a terminal. Eight blocks,
              one session.
            </p>
          </div>

          <FadeUp>
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,10,12,0.92) 0%, rgba(3,4,6,0.96) 100%)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.07), 0 40px 80px -30px rgba(0,0,0,0.7)",
              }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: "#ff5f57" }}
                  />
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: "#febc2e" }}
                  />
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: "#28c840" }}
                  />
                </div>
                <Mono style={{ color: TOKENS.inkFaint }}>
                  anthony@verax · ~/capabilities · zsh
                </Mono>
                <span className="w-14" />
              </div>

              {/* Terminal body */}
              <div
                className="overflow-x-auto px-4 py-5 text-[12.5px] leading-[1.7] md:px-6 md:py-6 md:text-[13px]"
                style={{
                  fontFamily:
                    "ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, Consolas, monospace",
                  color: "rgba(235,240,245,0.9)",
                }}
              >
                <div className="mb-4 text-white/45">
                  $ cat capabilities.log
                </div>

                {profileSkills.map((g, i) => {
                  const a = ACCENTS[i % ACCENTS.length]!;
                  const name = ACCENT_NAMES[i % ACCENT_NAMES.length]!;
                  const id = slug(g.heading);
                  return (
                    <motion.div
                      key={g.heading}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(i * 0.05, 0.3),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mb-8"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span style={{ color: a }}>❯</span>
                        <span className="text-white/45">
                          0{i + 1}
                        </span>
                        <span className="font-[600]" style={{ color: a }}>
                          {id}
                        </span>
                      </div>
                      <div className="ml-5 mt-0.5 flex flex-wrap gap-x-5 gap-y-1 text-white/55">
                        <span>
                          capabilities=
                          <span className="text-white/85">
                            {g.tags.length}
                          </span>
                        </span>
                        <span>
                          accent=
                          <span style={{ color: a }}>{name}</span>
                        </span>
                        <span>
                          status=
                          <span style={{ color: TOKENS.emerald }}>active</span>
                        </span>
                      </div>
                      <div className="ml-5 mt-3 flex flex-wrap gap-1.5">
                        {g.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded px-2 py-1 text-[11.5px]"
                            style={{
                              background: `${a}10`,
                              border: `1px solid ${a}33`,
                              color: "rgba(245,250,255,0.92)",
                              boxShadow: `inset 2px 0 0 0 ${a}`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Summary + blinking cursor */}
                <div className="mt-6 border-t border-white/[0.06] pt-4">
                  <div className="text-white/45">
                    $ wc -l capabilities.log
                  </div>
                  <div className="ml-1 mt-1 text-white/75">
                    <span className="text-white/85">
                      {total}
                    </span>{" "}
                    capabilities across{" "}
                    <span className="text-white/85">
                      {profileSkills.length}
                    </span>{" "}
                    groups
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-white/45">
                    <span>$</span>
                    {reduce ? (
                      <span
                        className="inline-block h-[14px] w-[8px]"
                        style={{ background: TOKENS.emerald }}
                      />
                    ) : (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block h-[14px] w-[8px]"
                        style={{
                          background: TOKENS.emerald,
                          boxShadow: `0 0 8px ${TOKENS.emerald}`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </CapShell>
  );
}
