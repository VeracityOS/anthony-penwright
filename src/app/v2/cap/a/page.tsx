"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, CornerDownLeft } from "lucide-react";
import {
  DisplayHeading,
  FadeUp,
  Kbd,
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

export default function VariantAPage() {
  const [active, setActive] = useState(0);
  const group = profileSkills[active]!;
  const accent = ACCENTS[active % ACCENTS.length]!;
  const total = useMemo(
    () => profileSkills.reduce((s, g) => s + g.tags.length, 0),
    [],
  );

  // Keyboard navigation — ↑ ↓ to cycle groups
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % profileSkills.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + profileSkills.length) % profileSkills.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CapShell>
      <section className="relative px-5 pb-16 sm:px-8 md:pb-24 lg:px-[5vw] xl:px-[6vw]">
        <div className="mx-auto max-w-[1600px]">
          <SectionKicker
            index="A"
            label="Capabilities · Command palette"
            keys={["↑", "↓"]}
          />
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <DisplayHeading gradient>Operator console.</DisplayHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-white/65">
              Navigate 8 groups, {total} capabilities — like the inside of a
              command palette.
            </p>
          </div>

          <FadeUp>
            <SpotlightCard
              className="grid grid-cols-1 overflow-hidden md:grid-cols-[320px_1fr]"
              spotlightColor={`${accent}2e`}
              lift={false}
            >
              {/* ----- Left: file-tree ----- */}
              <div
                className="border-b border-white/[0.06] p-4 md:border-b-0 md:border-r"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="mb-3 flex items-center justify-between px-2">
                  <Mono style={{ color: TOKENS.inkFaint }}>
                    capabilities.tree
                  </Mono>
                  <span className="hidden items-center gap-1 md:inline-flex">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                  </span>
                </div>
                <ul className="flex flex-col gap-0.5">
                  {profileSkills.map((g, i) => {
                    const isActive = i === active;
                    const rowAccent = ACCENTS[i % ACCENTS.length]!;
                    return (
                      <li key={g.heading}>
                        <button
                          onClick={() => setActive(i)}
                          className="group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition"
                          style={{
                            background: isActive
                              ? `linear-gradient(90deg, ${rowAccent}18, ${rowAccent}06)`
                              : "transparent",
                            borderLeft: `2px solid ${isActive ? rowAccent : "transparent"}`,
                          }}
                        >
                          <span
                            className="font-mono text-[10.5px] tabular-nums"
                            style={{
                              color: isActive
                                ? rowAccent
                                : "rgba(255,255,255,0.42)",
                            }}
                          >
                            0{i + 1}
                          </span>
                          <span
                            className="flex-1 truncate text-[13px] font-[500]"
                            style={{
                              color: isActive
                                ? "#fff"
                                : "rgba(255,255,255,0.7)",
                            }}
                          >
                            {g.heading}
                          </span>
                          <span
                            className="font-mono text-[10.5px] tabular-nums"
                            style={{
                              color: isActive
                                ? rowAccent
                                : "rgba(255,255,255,0.32)",
                            }}
                          >
                            {g.tags.length}
                          </span>
                          <ChevronRight
                            className="h-3 w-3 transition-transform"
                            style={{
                              color: isActive
                                ? rowAccent
                                : "rgba(255,255,255,0.2)",
                              transform: isActive
                                ? "translateX(2px)"
                                : "translateX(-2px)",
                            }}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] px-2 pt-4 text-[10.5px] text-white/45">
                  <CornerDownLeft className="h-3 w-3" />
                  <span>select · </span>
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  <span>navigate</span>
                </div>
              </div>

              {/* ----- Right: active pane ----- */}
              <div className="relative min-h-[480px] p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <Mono
                        style={{
                          color: accent,
                          letterSpacing: "0.24em",
                        }}
                      >
                        0{active + 1} / 08 · active
                      </Mono>
                      <Mono style={{ color: TOKENS.inkFaint }}>
                        {group.tags.length} capabilities
                      </Mono>
                    </div>

                    <h3
                      className="text-[28px] font-[600] leading-[1.05] tracking-[-0.02em] text-white md:text-[34px]"
                    >
                      {group.heading}
                    </h3>

                    <div
                      className="mt-2 h-px w-16"
                      style={{
                        background: `linear-gradient(90deg, ${accent}, transparent)`,
                      }}
                    />

                    <div className="mt-7 flex flex-wrap gap-2">
                      {group.tags.map((t, j) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.32,
                            delay: Math.min(j * 0.022, 0.3),
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="inline-flex items-center rounded-lg px-3 py-2 text-[13px] font-[500] leading-tight"
                          style={{
                            background: `${accent}0f`,
                            border: `1px solid ${accent}2e`,
                            color: "#fff",
                            boxShadow: `inset 2px 0 0 0 ${accent}`,
                          }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>

                    {/* Footer summary row */}
                    <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-6 text-[11.5px] text-white/55">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: accent,
                            boxShadow: `0 0 8px ${accent}`,
                          }}
                        />
                        group.{active + 1}
                      </span>
                      <span>
                        capabilities ={" "}
                        <span className="font-mono text-white/80">
                          {group.tags.length}
                        </span>
                      </span>
                      <span>
                        total ={" "}
                        <span className="font-mono text-white/80">{total}</span>
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5">
                        <Kbd>↑</Kbd>
                        <Kbd>↓</Kbd>
                        <span>to navigate</span>
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </SpotlightCard>
          </FadeUp>
        </div>
      </section>
    </CapShell>
  );
}
