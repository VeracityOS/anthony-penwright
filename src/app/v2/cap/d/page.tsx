"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
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

// Canvas geometry — 1000×1000 viewBox, centre at (500, 500).
const VB = 1000;
const CENTER = VB / 2;
const GROUP_RADIUS = 300; // inner circle where group nodes sit
const TAG_RING_MIN = 380; // innermost possible tag position
const TAG_RING_MAX = 480; // outermost

// Pre-compute node geometry once per render.
function buildGeometry() {
  const n = profileSkills.length;
  const groups = profileSkills.map((g, i) => {
    // Start at 12 o'clock and distribute clockwise.
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const x = CENTER + Math.cos(angle) * GROUP_RADIUS;
    const y = CENTER + Math.sin(angle) * GROUP_RADIUS;
    return { heading: g.heading, tags: g.tags, index: i, angle, x, y };
  });

  // Each group gets a narrow angular sector for its tags (± half the sector).
  const sector = (Math.PI * 2) / n; // 45° per group @ n=8
  const usableSector = sector * 0.82; // leave small gap between neighbours

  const tags: {
    key: string;
    label: string;
    groupIndex: number;
    tagIndex: number;
    x: number;
    y: number;
    angle: number;
  }[] = [];

  groups.forEach((g) => {
    const count = g.tags.length;
    g.tags.forEach((t, ti) => {
      // Centre the tag row on the group's angle, stagger 2 rings for density.
      const t01 = count <= 1 ? 0.5 : ti / (count - 1);
      const a = g.angle + (t01 - 0.5) * usableSector;
      // Alternate radii to avoid overlap on big groups.
      const r = ti % 2 === 0 ? TAG_RING_MAX : TAG_RING_MIN;
      const x = CENTER + Math.cos(a) * r;
      const y = CENTER + Math.sin(a) * r;
      tags.push({
        key: `${g.index}-${ti}`,
        label: t,
        groupIndex: g.index,
        tagIndex: ti,
        x,
        y,
        angle: a,
      });
    });
  });

  return { groups, tags };
}

export default function VariantDPage() {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const { groups, tags } = useMemo(buildGeometry, []);
  const total = tags.length;

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <CapShell>
      <section className="relative px-5 pb-16 sm:px-8 md:pb-24 lg:px-[5vw] xl:px-[6vw]">
        <div className="mx-auto max-w-[1600px]">
          <SectionKicker
            index="D"
            label="Capabilities · Constellation"
            keys={["map"]}
          />
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <DisplayHeading gradient>Map of capabilities.</DisplayHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-white/65">
              {total} capabilities orbiting 8 anchors. Hover a heading to light
              up its cluster.
            </p>
          </div>

          <FadeUp>
            <SpotlightCard
              className="p-4 md:p-6"
              spotlightColor="rgba(244,114,182,0.18)"
              lift={false}
            >
              {/* ----- SVG canvas ----- */}
              <div
                className="relative mx-auto aspect-square w-full max-w-[900px] overflow-hidden rounded-xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02), transparent 70%)",
                }}
              >
                {/* Cursor-follow spotlight (desktop only; decorative) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, rgba(244,114,182,0.10), transparent 60%)`,
                  }}
                />
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${VB} ${VB}`}
                  className="absolute inset-0 h-full w-full"
                  onMouseMove={onMove}
                >
                  {/* Background guide circles */}
                  <g stroke="rgba(255,255,255,0.05)" fill="none">
                    <circle cx={CENTER} cy={CENTER} r={GROUP_RADIUS} />
                    <circle cx={CENTER} cy={CENTER} r={TAG_RING_MIN} />
                    <circle cx={CENTER} cy={CENTER} r={TAG_RING_MAX} />
                  </g>

                  {/* Connecting lines (group → tag) */}
                  {tags.map((t) => {
                    const g = groups[t.groupIndex]!;
                    const a = ACCENTS[t.groupIndex % ACCENTS.length]!;
                    const isActive =
                      hoveredGroup === t.groupIndex ||
                      hoveredTag === t.key;
                    const isDim =
                      (hoveredGroup !== null &&
                        hoveredGroup !== t.groupIndex) ||
                      (hoveredTag !== null && hoveredTag !== t.key);
                    return (
                      <motion.line
                        key={`line-${t.key}`}
                        x1={g.x}
                        y1={g.y}
                        x2={t.x}
                        y2={t.y}
                        stroke={a}
                        strokeWidth={isActive ? 1.6 : 0.6}
                        strokeOpacity={isDim ? 0.06 : isActive ? 0.75 : 0.18}
                        strokeLinecap="round"
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        whileInView={
                          reduce
                            ? undefined
                            : { pathLength: 1, opacity: 1 }
                        }
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: Math.min(
                            0.08 * t.groupIndex + t.tagIndex * 0.015,
                            0.9,
                          ),
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    );
                  })}

                  {/* Tag nodes */}
                  {tags.map((t) => {
                    const a = ACCENTS[t.groupIndex % ACCENTS.length]!;
                    const isActive =
                      hoveredGroup === t.groupIndex ||
                      hoveredTag === t.key;
                    const isDim =
                      (hoveredGroup !== null &&
                        hoveredGroup !== t.groupIndex) ||
                      (hoveredTag !== null && hoveredTag !== t.key);
                    // Mirror text when on the left half of the circle to keep readable.
                    const flip =
                      Math.cos(t.angle) < 0
                        ? `rotate(180 ${t.x} ${t.y})`
                        : "";
                    const anchor =
                      Math.cos(t.angle) < 0 ? "end" : "start";
                    // Truncate very long labels on screen (full label stays in list).
                    const label =
                      t.label.length > 38 ? t.label.slice(0, 36) + "…" : t.label;

                    return (
                      <g
                        key={`tag-${t.key}`}
                        onMouseEnter={() => setHoveredTag(t.key)}
                        onMouseLeave={() => setHoveredTag(null)}
                        style={{ cursor: "pointer" }}
                      >
                        <circle
                          cx={t.x}
                          cy={t.y}
                          r={isActive ? 5 : 3}
                          fill={a}
                          opacity={isDim ? 0.22 : 1}
                          style={{
                            filter: isActive
                              ? `drop-shadow(0 0 10px ${a})`
                              : undefined,
                            transition: "all 180ms ease",
                          }}
                        />
                        <text
                          x={t.x + (Math.cos(t.angle) < 0 ? -10 : 10)}
                          y={t.y + 3}
                          transform={flip}
                          textAnchor={anchor}
                          fontSize={13}
                          fontWeight={500}
                          fill={
                            isActive
                              ? "#ffffff"
                              : isDim
                                ? "rgba(255,255,255,0.32)"
                                : "rgba(255,255,255,0.72)"
                          }
                          style={{
                            transition: "fill 180ms ease",
                            pointerEvents: "none",
                          }}
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Group anchors — draw last so they sit on top */}
                  {groups.map((g) => {
                    const a = ACCENTS[g.index % ACCENTS.length]!;
                    const isOn = hoveredGroup === g.index;
                    const related =
                      hoveredTag !== null &&
                      tags.find((t) => t.key === hoveredTag)?.groupIndex ===
                        g.index;
                    const active = isOn || related;
                    // Label position: slightly past node outward.
                    const lx =
                      CENTER + Math.cos(g.angle) * (GROUP_RADIUS - 34);
                    const ly =
                      CENTER + Math.sin(g.angle) * (GROUP_RADIUS - 34);
                    return (
                      <g
                        key={`grp-${g.index}`}
                        onMouseEnter={() => setHoveredGroup(g.index)}
                        onMouseLeave={() => setHoveredGroup(null)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* Glow halo */}
                        <circle
                          cx={g.x}
                          cy={g.y}
                          r={active ? 22 : 14}
                          fill={a}
                          opacity={active ? 0.22 : 0.1}
                          style={{ transition: "all 220ms ease" }}
                        />
                        <circle
                          cx={g.x}
                          cy={g.y}
                          r={active ? 9 : 7}
                          fill={a}
                          style={{
                            filter: active
                              ? `drop-shadow(0 0 14px ${a})`
                              : `drop-shadow(0 0 6px ${a}88)`,
                            transition: "all 220ms ease",
                          }}
                        />
                        {/* Heading */}
                        <text
                          x={lx}
                          y={ly}
                          textAnchor="middle"
                          fontSize={14}
                          fontWeight={600}
                          fill="#ffffff"
                          style={{
                            pointerEvents: "none",
                            textShadow: `0 0 8px ${a}`,
                          }}
                        >
                          {g.heading}
                        </text>
                        {/* Count */}
                        <text
                          x={lx}
                          y={ly + 16}
                          textAnchor="middle"
                          fontSize={10}
                          fontWeight={500}
                          letterSpacing="0.16em"
                          fill={a}
                          style={{ pointerEvents: "none" }}
                        >
                          {g.tags.length} · 0{g.index + 1}
                        </text>
                      </g>
                    );
                  })}

                  {/* Centre badge */}
                  <g>
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={66}
                      fill="rgba(10,10,12,0.75)"
                      stroke="rgba(255,255,255,0.12)"
                    />
                    <text
                      x={CENTER}
                      y={CENTER - 8}
                      textAnchor="middle"
                      fontSize={34}
                      fontWeight={700}
                      fill="#ffffff"
                    >
                      {total}
                    </text>
                    <text
                      x={CENTER}
                      y={CENTER + 16}
                      textAnchor="middle"
                      fontSize={10}
                      letterSpacing="0.22em"
                      fill="rgba(255,255,255,0.5)"
                    >
                      CAPABILITIES
                    </text>
                  </g>
                </svg>
              </div>

              {/* ----- Legend / mobile fallback list ----- */}
              <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
                {groups.map((g) => {
                  const a = ACCENTS[g.index % ACCENTS.length]!;
                  const isOn = hoveredGroup === g.index;
                  return (
                    <button
                      key={`leg-${g.index}`}
                      onMouseEnter={() => setHoveredGroup(g.index)}
                      onMouseLeave={() => setHoveredGroup(null)}
                      onClick={() =>
                        setHoveredGroup(isOn ? null : g.index)
                      }
                      className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-left text-[11.5px] transition"
                      style={{
                        background: isOn
                          ? `linear-gradient(90deg, ${a}1f, ${a}08)`
                          : "rgba(255,255,255,0.025)",
                        border: `1px solid ${isOn ? `${a}66` : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{
                          background: a,
                          boxShadow: isOn ? `0 0 8px ${a}` : undefined,
                        }}
                      />
                      <span className="flex-1 truncate text-white/80">
                        {g.heading}
                      </span>
                      <span
                        className="font-mono text-[10.5px] tabular-nums"
                        style={{ color: a }}
                      >
                        {g.tags.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-4 text-[11.5px] text-white/55">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: TOKENS.emerald,
                      boxShadow: `0 0 8px ${TOKENS.emerald}`,
                    }}
                  />
                  hover · pin a constellation
                </span>
                <Mono style={{ color: TOKENS.inkFaint, marginLeft: "auto" }}>
                  nodes = {total} · clusters = {profileSkills.length}
                </Mono>
              </div>
            </SpotlightCard>
          </FadeUp>
        </div>
      </section>
    </CapShell>
  );
}
