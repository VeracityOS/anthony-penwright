"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  DisplayHeading,
  FadeUp,
  Mono,
  SectionKicker,
  SpotlightCard,
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

// Flatten tags with their group index, preserving order.
function buildFlatTags() {
  const out: { tag: string; groupIndex: number; key: string }[] = [];
  profileSkills.forEach((g, gi) => {
    g.tags.forEach((t, ti) => {
      out.push({ tag: t, groupIndex: gi, key: `${gi}-${ti}` });
    });
  });
  return out;
}

export default function VariantBPage() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const flat = useMemo(buildFlatTags, []);
  const total = flat.length;

  return (
    <CapShell>
      <section className="relative px-5 pb-16 sm:px-8 md:pb-24 lg:px-[5vw] xl:px-[6vw]">
        <div className="mx-auto max-w-[1600px]">
          <SectionKicker
            index="B"
            label="Capabilities · Filterable cloud"
            keys={["filter"]}
          />
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <DisplayHeading gradient>One cloud. Eight lenses.</DisplayHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-white/65">
              Tap a lens to filter {total} capabilities by focus area —
              everything else fades, the rest reflows.
            </p>
          </div>

          <FadeUp>
            <SpotlightCard
              className="p-6 md:p-8"
              spotlightColor="rgba(167,139,250,0.20)"
              lift={false}
            >
              {/* ----- Filter bar ----- */}
              <div className="mb-6 flex items-center justify-between gap-3">
                <Mono style={{ color: TOKENS.inkFaint }}>
                  lenses · {profileSkills.length}
                </Mono>
                {activeGroup !== null && (
                  <button
                    onClick={() => setActiveGroup(null)}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                )}
              </div>

              <div className="mb-7 flex flex-wrap gap-2">
                {profileSkills.map((g, i) => {
                  const a = ACCENTS[i % ACCENTS.length]!;
                  const isOn = activeGroup === i;
                  const isDim = activeGroup !== null && activeGroup !== i;
                  return (
                    <button
                      key={g.heading}
                      onClick={() => setActiveGroup(isOn ? null : i)}
                      className="group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-[500] transition"
                      style={{
                        background: isOn
                          ? `linear-gradient(180deg, ${a}2e, ${a}14)`
                          : "rgba(255,255,255,0.035)",
                        border: `1px solid ${isOn ? `${a}88` : "rgba(255,255,255,0.1)"}`,
                        color: isOn
                          ? "#fff"
                          : isDim
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(255,255,255,0.82)",
                        boxShadow: isOn ? `0 0 24px ${a}33` : undefined,
                        opacity: isDim ? 0.55 : 1,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: a,
                          boxShadow: isOn ? `0 0 8px ${a}` : undefined,
                        }}
                      />
                      <span>{g.heading}</span>
                      <span
                        className="font-mono text-[10.5px] tabular-nums"
                        style={{
                          color: isOn ? a : "rgba(255,255,255,0.45)",
                        }}
                      >
                        {g.tags.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ----- Cloud ----- */}
              <motion.div layout className="flex flex-wrap gap-1.5">
                {flat.map((item) => {
                  const a = ACCENTS[item.groupIndex % ACCENTS.length]!;
                  const isHighlighted =
                    activeGroup === null || activeGroup === item.groupIndex;
                  const isDimmed =
                    activeGroup !== null && activeGroup !== item.groupIndex;
                  return (
                    <motion.span
                      key={item.key}
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 32,
                        mass: 0.8,
                      }}
                      animate={{
                        opacity: isDimmed ? 0.22 : 1,
                        scale: activeGroup === item.groupIndex ? 1.02 : 1,
                      }}
                      className="inline-flex items-center rounded-[6px] px-2.5 py-[6px] text-[11.5px] font-[500] leading-[1.1]"
                      style={{
                        background: isHighlighted
                          ? `${a}14`
                          : "rgba(255,255,255,0.035)",
                        border: `1px solid ${isHighlighted ? `${a}55` : "rgba(255,255,255,0.08)"}`,
                        color: isHighlighted
                          ? "#fff"
                          : "rgba(255,255,255,0.7)",
                        boxShadow:
                          activeGroup === item.groupIndex
                            ? `inset 2px 0 0 0 ${a}, 0 0 14px ${a}2e`
                            : undefined,
                      }}
                    >
                      {item.tag}
                    </motion.span>
                  );
                })}
              </motion.div>

              {/* ----- Footer stats ----- */}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-5 text-[11.5px] text-white/55">
                <span>
                  showing ={" "}
                  <span className="font-mono text-white/85">
                    {activeGroup === null
                      ? total
                      : profileSkills[activeGroup]!.tags.length}
                  </span>
                </span>
                <span>
                  of <span className="font-mono text-white/85">{total}</span>
                </span>
                {activeGroup !== null && (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: ACCENTS[activeGroup % ACCENTS.length],
                        boxShadow: `0 0 8px ${ACCENTS[activeGroup % ACCENTS.length]}`,
                      }}
                    />
                    lens = {profileSkills[activeGroup]!.heading}
                  </span>
                )}
              </div>
            </SpotlightCard>
          </FadeUp>
        </div>
      </section>
    </CapShell>
  );
}
