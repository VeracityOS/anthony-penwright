"use client";

import {
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Cpu,
  Globe2,
  Shield,
  Layers,
  Rocket,
  Gauge,
  Boxes,
  Award,
  Briefcase,
  Building2,
  LineChart,
  GraduationCap,
  KeyRound,
  Linkedin,
  Compass,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AuroraBackground,
  Counter,
  DisplayHeading,
  FadeUp,
  FloatingBubbles,
  GlassCard,
  OrbitBorder,
  Kbd,
  MagneticButton,
  Mono,
  NoiseOverlay,
  SectionDivider,
  SectionKicker,
  SpotlightCard,
  StatusDot,
  TilePattern,
  TOKENS,
  usePageScroll,
} from "@/components/v2/v2-primitives";
import {
  profile,
  signatureMoments,
  credentials,
  profileSkills,
} from "@/content/profile";
import { timeline } from "@/content/timeline";
import { frameworks } from "@/content/frameworks";

// ---------------- Helpers ----------------
// Parse stat values like "$1.3BN+", "40+", "7" into counter inputs.
function parseStat(value: string): {
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
} {
  const m = value.match(/^([^\d-]*)([\d.,]+)(.*)$/);
  if (!m) return { prefix: "", to: 0, suffix: value, decimals: 0 };
  const prefix = m[1] ?? "";
  const num = parseFloat((m[2] ?? "0").replace(/,/g, ""));
  const suffix = m[3] ?? "";
  const decimals = (m[2] ?? "").includes(".") ? 1 : 0;
  return { prefix, to: num, suffix, decimals };
}

// Hero stats — 4 headline counters.
const heroStats = [
  { value: "$1.3BN+", label: "Programme value delivered" },
  { value: "7", label: "Active ventures" },
  { value: "40+", label: "Programmes led" },
  { value: "13", label: "Sectors delivered" },
];

// Capability icons (assigned in order to profileSkills groups).
const capabilityIcons = [
  Layers,
  Cpu,
  Shield,
  Globe2,
  Sparkles,
  Rocket,
  Boxes,
  Gauge,
];

// ---------------- Top nav (sticky, floating pill) ----------------
function TopBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4 md:top-6">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-xl"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        <span className="flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5">
          <StatusDot />
          <Mono style={{ color: TOKENS.ink }}>AP · v2</Mono>
        </span>
        <a
          href="#moments"
          className="hidden rounded-full px-3 py-1.5 text-[12px] text-white/70 transition hover:bg-white/[0.06] hover:text-white md:inline-flex"
        >
          Work
        </a>
        <a
          href="#frameworks"
          className="hidden rounded-full px-3 py-1.5 text-[12px] text-white/70 transition hover:bg-white/[0.06] hover:text-white md:inline-flex"
        >
          Frameworks
        </a>
        <a
          href="#timeline"
          className="hidden rounded-full px-3 py-1.5 text-[12px] text-white/70 transition hover:bg-white/[0.06] hover:text-white md:inline-flex"
        >
          Timeline
        </a>
        <a
          href="#contact"
          className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[12px] text-white transition hover:bg-white/[0.14]"
        >
          Contact
          <ArrowUpRight className="ml-1 inline h-3 w-3" />
        </a>
      </motion.div>
    </div>
  );
}

// ---------------- HERO ----------------
function Hero() {
  return (
    <section className="relative px-5 pb-8 pt-24 sm:px-8 md:pb-10 md:pt-28 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-12 items-center gap-6 md:gap-10">
        {/* Left: status + name + pitch + CTAs */}
        <div className="col-span-12 md:col-span-8">
          {/* Status row */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md"
            >
              <StatusDot />
              <Mono style={{ color: TOKENS.ink }}>
                Available · Riyadh · 2026
              </Mono>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md"
            >
              <Mono style={{ color: TOKENS.inkFaint }}>MD · Smart-City · AI-native</Mono>
            </motion.span>
          </div>

          {/* Wordmark — restrained Linear/Vercel scale, single Poppins face */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-7 text-6xl font-semibold leading-[0.98] tracking-[-0.035em] md:text-7xl"
            style={{
              color: "transparent",
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #e9e6f3 55%, #b7b3cc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: "0 0 60px rgba(167,139,250,0.14)",
            }}
          >
            Anthony Penwright.
          </motion.h1>

          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-[1.55] text-white/80 md:text-lg">
              {profile.pitch}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <MagneticButton href={`mailto:${profile.email}`} variant="primary">
                Start a conversation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
              <MagneticButton href={profile.cvUrl} variant="ghost">
                <Download className="h-4 w-4" />
                Download CV
              </MagneticButton>
            </div>
          </FadeUp>
        </div>

        {/* Right: headshot with aurora halo */}
        <div className="col-span-12 md:col-span-4">
          <FadeUp delay={0.25}>
            <div className="relative mx-auto flex w-full items-center justify-center md:mx-0 md:ml-auto">
              {/* Aurora halo */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(52,211,153,0.35), transparent 55%), radial-gradient(circle at 70% 70%, rgba(167,139,250,0.32), transparent 55%), radial-gradient(circle at 50% 50%, rgba(34,211,238,0.22), transparent 60%)",
                  filter: "blur(42px)",
                  transform: "scale(1.08)",
                }}
              />
              <div
                className="relative aspect-square w-full overflow-hidden rounded-[28px]"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.12), 0 30px 80px -24px rgba(0,0,0,0.65), 0 0 60px -10px rgba(52,211,153,0.25)",
                }}
              >
                <Image
                  src="/anthony.jpg"
                  alt="Anthony Penwright"
                  width={400}
                  height={400}
                  priority
                  className="h-full w-full object-cover"
                />
                {/* Subtle inner tint for canvas continuity */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.35) 100%)",
                  }}
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Hero stats strip — animated counters */}
        <div className="col-span-12 mt-6 md:mt-8">
          <FadeUp delay={0.4}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {heroStats.map((s, i) => {
                const p = parseStat(s.value);
                return (
                  <SpotlightCard
                    key={i}
                    className="p-5 md:p-6"
                    spotlightColor={
                      [
                        "rgba(52,211,153,0.22)",
                        "rgba(167,139,250,0.22)",
                        "rgba(34,211,238,0.22)",
                        "rgba(251,191,36,0.20)",
                      ][i]
                    }
                  >
                    <Mono style={{ color: TOKENS.inkFaint }}>
                      0{i + 1}
                    </Mono>
                    <div
                      className="mt-3 font-[700] leading-none tracking-[-0.03em]"
                      style={{
                        fontSize: "clamp(34px, 4.2vw, 56px)",
                        color: TOKENS.ink,
                      }}
                    >
                      <Counter
                        to={p.to}
                        prefix={p.prefix}
                        suffix={p.suffix}
                        decimals={p.decimals}
                      />
                    </div>
                    <div className="mt-2 text-[12px] tracking-[0.02em] text-white/60">
                      {s.label}
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ---------------- SIGNATURE MOMENTS (bento) ----------------
// signatureMoments order: 0 Verax, 1 NEOM-Innov, 2 NEOM-TD, 3 Quantela,
// 4 Cisco, 5 FCO, 6 MoD
//
// Desktop bento (12-col). Rows explicit to prevent orphans:
//   Row A: MoD          (col-span 8, row-span 2)  BIG
//          NEOM-Innov   (col-span 4, row-span 2)  secondary hero
//   Row B: NEOM-TD (col-span 5)  +  Quantela (col-span 3)  +  Cisco (col-span 4)
//   Row C: FCO    (col-span 7)  +  Verax    (col-span 5)
// 7 tiles. No gaps. No orphans.
function SignatureMoments() {
  const mod = signatureMoments[6];
  const cisco = signatureMoments[4];
  const fco = signatureMoments[5];
  const quantela = signatureMoments[3];
  const neomTD = signatureMoments[2];
  const neomIn = signatureMoments[1];
  const verax = signatureMoments[0];

  const tile = (
    m: typeof mod,
    opts: {
      span: string;
      accent: string;
      spotlight: string;
      big?: boolean;
      badge?: string;
      icon: React.ComponentType<{ className?: string }>;
      pattern?: React.ComponentProps<typeof TilePattern>["kind"];
    }
  ) => {
    const Icon = opts.icon;
    return (
      <SpotlightCard
        className={`${opts.span} relative flex flex-col gap-5 overflow-hidden p-5 md:p-6`}
        spotlightColor={opts.spotlight}
      >
        {opts.pattern && (
          <TilePattern kind={opts.pattern} accent={opts.accent} opacity={0.15} />
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Icon className="h-4 w-4 text-white/80" />
            </div>
            {opts.badge && (
              <span
                className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
                style={{
                  background: `${opts.accent}1a`,
                  color: opts.accent,
                  border: `1px solid ${opts.accent}3d`,
                }}
              >
                {opts.badge}
              </span>
            )}
          </div>
          <div className="text-right">
            <div
              className="font-[700] leading-none tracking-[-0.03em]"
              style={{
                fontSize: opts.big
                  ? "clamp(36px, 3.8vw, 60px)"
                  : "clamp(22px, 2vw, 32px)",
                color: "transparent",
                backgroundImage: `linear-gradient(135deg, ${opts.accent} 0%, #ffffff 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {m.value}
            </div>
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">
            {m.period}
          </div>
          <h3
            className={`mt-1.5 font-[600] leading-tight tracking-[-0.015em] text-white ${
              opts.big ? "text-[22px] md:text-[26px]" : "text-[17px] md:text-[19px]"
            }`}
          >
            {m.org}
          </h3>
          <div className="mt-0.5 text-[12px] text-white/60">{m.role}</div>
          <p
            className={`mt-3 leading-[1.5] text-white/75 ${
              opts.big ? "text-[13.5px] md:text-[15px]" : "text-[12.5px]"
            }`}
          >
            {m.note}
          </p>
        </div>
      </SpotlightCard>
    );
  };

  return (
    <section id="moments" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="02" label="Signature Work" keys={["⌘", "2"]} />
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <DisplayHeading gradient>
            $1.3BN+
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #34d399 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              shipped.
            </span>
          </DisplayHeading>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Seven programmes that shaped the playbook. Defence, diplomacy,
            giga-project, venture studio — delivered, not decks.
          </p>
        </div>

        {/* Bento grid — mobile 1-col, desktop 12-col w/ explicit row spans */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(140px,auto)] md:gap-5">
          {tile(mod, {
            span: "md:col-span-8 md:row-span-2",
            accent: TOKENS.emerald,
            spotlight: "rgba(52,211,153,0.24)",
            big: true,
            badge: "Programme of record",
            icon: Shield,
            pattern: "shield",
          })}
          {tile(neomIn, {
            span: "md:col-span-4 md:row-span-2",
            accent: TOKENS.violet,
            spotlight: "rgba(167,139,250,0.24)",
            badge: "Best performer",
            icon: Sparkles,
            pattern: "hex",
          })}
          {tile(neomTD, {
            span: "md:col-span-5",
            accent: TOKENS.cyan,
            spotlight: "rgba(34,211,238,0.22)",
            icon: Cpu,
            pattern: "circuit",
          })}
          {tile(quantela, {
            span: "md:col-span-3",
            accent: TOKENS.amber,
            spotlight: "rgba(251,191,36,0.22)",
            icon: LineChart,
            pattern: "chart",
          })}
          {tile(cisco, {
            span: "md:col-span-4",
            accent: TOKENS.violet,
            spotlight: "rgba(167,139,250,0.22)",
            icon: Globe2,
            pattern: "network",
          })}
          {tile(fco, {
            span: "md:col-span-7",
            accent: TOKENS.emerald,
            spotlight: "rgba(52,211,153,0.20)",
            icon: Briefcase,
            pattern: "globe",
          })}
          {tile(verax, {
            span: "md:col-span-5",
            accent: TOKENS.cyan,
            spotlight: "rgba(34,211,238,0.22)",
            badge: "Active",
            icon: Rocket,
            pattern: "constellation",
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------- CAPABILITIES ----------------
// 8 groups from profileSkills. Bento layout (12-col):
//   Row 1: 4 / 4 / 4  (three equal)
//   Row 2: 7 / 5      (two wide)
//   Row 3: 5 / 7      (mirror)
//   Row 4: 12         (full-width finisher)
// No orphans.
function Capabilities() {
  const spans = [
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-12",
  ];
  const spotlights = [
    "rgba(52,211,153,0.18)",
    "rgba(167,139,250,0.18)",
    "rgba(34,211,238,0.18)",
    "rgba(251,191,36,0.16)",
    "rgba(52,211,153,0.16)",
    "rgba(167,139,250,0.18)",
    "rgba(34,211,238,0.18)",
    "rgba(244,114,182,0.16)",
  ];

  return (
    <section id="capabilities" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="03" label="Capabilities" keys={["⌘", "3"]} />
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <DisplayHeading gradient>Full-stack operator.</DisplayHeading>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Executive leadership, platform engineering, agent orchestration and
            venture building — one operator, one stack.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {profileSkills.map((g, i) => {
            const Icon = capabilityIcons[i % capabilityIcons.length];
            const capabilityPatterns: Array<React.ComponentProps<typeof TilePattern>["kind"]> = [
              "hex",
              "circuit",
              "network",
              "globe",
              "chart",
              "constellation",
              "grid",
              "shield",
            ];
            const capabilityAccents = [
              TOKENS.emerald,
              TOKENS.violet,
              TOKENS.cyan,
              TOKENS.amber,
              TOKENS.emerald,
              TOKENS.violet,
              TOKENS.cyan,
              TOKENS.pink,
            ];
            return (
              <FadeUp key={i} delay={Math.min(i * 0.04, 0.2)} className={spans[i] ?? "md:col-span-4"}>
                <SpotlightCard
                  className="flex h-full flex-col p-6 md:p-7"
                  spotlightColor={spotlights[i] ?? "rgba(52,211,153,0.18)"}
                >
                  <TilePattern
                    kind={capabilityPatterns[i % capabilityPatterns.length]}
                    accent={capabilityAccents[i % capabilityAccents.length]}
                    opacity={0.13}
                  />
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(52,211,153,0.14), rgba(167,139,250,0.10))",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <Icon className="h-4 w-4 text-white/85" />
                    </div>
                    <Mono style={{ color: TOKENS.inkFaint }}>
                      0{i + 1} / {String(profileSkills.length).padStart(2, "0")}
                    </Mono>
                  </div>
                  <h3 className="mt-5 text-[17px] font-[600] leading-tight tracking-[-0.01em] text-white md:text-[19px]">
                    {g.heading}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.tags.map((t, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center rounded-full bg-white/[0.035] px-2.5 py-1 text-[11.5px] leading-none text-white/75"
                        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------- FRAMEWORKS ----------------
function Frameworks() {
  const accents = [
    { c: TOKENS.emerald, s: "rgba(52,211,153,0.22)" },
    { c: TOKENS.violet, s: "rgba(167,139,250,0.22)" },
    { c: TOKENS.cyan, s: "rgba(34,211,238,0.22)" },
    { c: TOKENS.amber, s: "rgba(251,191,36,0.20)" },
  ];

  return (
    <section id="frameworks" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="04" label="Proprietary Frameworks" keys={["⌘", "4"]} />
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <DisplayHeading gradient>Four frameworks.</DisplayHeading>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Authored, deployed, measured. The codified backbone of $1.3BN+ of
            programme value.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {frameworks.map((f, i) => {
            const a = accents[i % accents.length];
            const frameworkPatterns: Array<React.ComponentProps<typeof TilePattern>["kind"]> = [
              "hex",
              "chart",
              "network",
              "grid",
            ];
            const body = (
              <div className="relative flex h-full flex-col overflow-hidden p-7 md:p-9">
                <TilePattern
                  kind={frameworkPatterns[i % frameworkPatterns.length]}
                  accent={a.c}
                  opacity={0.14}
                />
                <div className="flex items-start justify-between gap-6">
                  <div
                    className="font-[700] leading-none tracking-[-0.04em]"
                    style={{
                      fontSize: "clamp(48px, 5.5vw, 88px)",
                      color: "transparent",
                      backgroundImage: `linear-gradient(135deg, ${a.c} 0%, #ffffff 100%)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {f.number}
                  </div>
                  {f.stat && (
                    <div
                      className="rounded-xl border border-white/10 px-3 py-2 text-right backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div
                        className="text-[22px] font-[700] leading-none tracking-[-0.02em]"
                        style={{ color: a.c }}
                      >
                        {f.stat.value}
                      </div>
                      <div className="mt-2 max-w-[140px] text-[10px] uppercase tracking-[0.14em] text-white/55">
                        {f.stat.label}
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="mt-7 text-[22px] font-[600] leading-tight tracking-[-0.015em] text-white md:text-[26px]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-white/65">
                  {f.subtitle}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                  {f.constructs.map((c, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[13.5px] leading-[1.55] text-white/80"
                    >
                      <span
                        className="mt-[7px] inline-block h-[6px] w-[6px] shrink-0 rounded-full"
                        style={{ background: a.c, boxShadow: `0 0 8px ${a.c}` }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <Mono style={{ color: TOKENS.inkFaint }}>Deployment</Mono>
                  <p className="mt-2 text-[13px] leading-[1.55] text-white/70">
                    {f.deployment}
                  </p>
                </div>
              </div>
            );

            // Discreet perimeter-orbit light on every framework — each with its
            // own accent colour and a different orbit duration so they never
            // pulse in sync.
            return (
              <FadeUp key={i} delay={i * 0.05}>
                <OrbitBorder accent={a.c} radius={20} duration={14 + i * 3}>
                  <SpotlightCard className="h-full" spotlightColor={a.s}>
                    {body}
                  </SpotlightCard>
                </OrbitBorder>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------- TIMELINE ----------------
function Timeline() {
  return (
    <section id="timeline" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="05" label="Career Timeline" keys={["⌘", "5"]} />
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <DisplayHeading gradient>Twenty years.</DisplayHeading>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Ministries, giga-projects, platforms. Each row a programme; each
            column a proof point.
          </p>
        </div>

        {(() => {
          const perRow = 4;
          const rows = Math.ceil(timeline.length / perRow);
          // Serpentine path through a 1000×1000 viewBox, 4 rows × 4 cols,
          // stretched to fit the grid container via preserveAspectRatio="none".
          // Row centres: 125/375/625/875. Col centres: 125/375/625/875.
          const d =
            "M 125 125 L 875 125 " +
            "C 980 125, 980 375, 875 375 " +
            "L 125 375 " +
            "C 20 375, 20 625, 125 625 " +
            "L 875 625 " +
            "C 980 625, 980 875, 875 875 " +
            "L 800 875";
          return (
            <div className="relative">
              {/* Serpentine roadmap — SVG rail with traveling glow, stretched
                  to match the grid. Cards sit on each station. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden md:block"
              >
                <svg
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="none"
                  className="h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="roadmap-rail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={TOKENS.emerald} stopOpacity="0.4" />
                      <stop offset="50%" stopColor={TOKENS.violet} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={TOKENS.cyan} stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="roadmap-light" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={TOKENS.emerald} stopOpacity="0" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="100%" stopColor={TOKENS.cyan} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Dashed ghost rail */}
                  <path
                    d={d}
                    stroke="url(#roadmap-rail)"
                    strokeWidth="1.6"
                    strokeDasharray="6 7"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Traveling glow — 120-unit bright dash flows along the road */}
                  <motion.path
                    d={d}
                    stroke="url(#roadmap-light)"
                    strokeWidth="2.6"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray="120 4400"
                    animate={{ strokeDashoffset: [0, -4520] }}
                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    style={{
                      filter: `drop-shadow(0 0 4px ${TOKENS.emerald}) drop-shadow(0 0 10px ${TOKENS.violet}aa) drop-shadow(0 0 18px ${TOKENS.cyan}66)`,
                    }}
                  />
                  {/* Station markers — small glowing pins on each station */}
                  {timeline.map((_, i) => {
                    const row = Math.floor(i / perRow);
                    const colInRow = i % perRow;
                    const col =
                      row % 2 === 0 ? colInRow : perRow - 1 - colInRow;
                    const cx = 125 + col * 250;
                    const cy = 125 + row * 250;
                    const accent =
                      i < 4
                        ? TOKENS.emerald
                        : i < 8
                        ? TOKENS.violet
                        : i < 12
                        ? TOKENS.cyan
                        : TOKENS.amber;
                    return (
                      <g key={i}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="14"
                          fill={accent}
                          fillOpacity="0.15"
                          stroke={accent}
                          strokeOpacity="0.5"
                          strokeWidth="1.2"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle cx={cx} cy={cy} r="4" fill={accent} />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Grid — 4 cols × 4 rows on desktop, single column on mobile */}
              <div
                className="relative grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-6 md:gap-y-20"
                style={{
                  gridAutoRows: "minmax(0, auto)",
                }}
              >
                {timeline.map((t, i) => {
                  const row = Math.floor(i / perRow);
                  const colInRow = i % perRow;
                  const col =
                    row % 2 === 0 ? colInRow : perRow - 1 - colInRow;
                  const accent =
                    i < 4
                      ? TOKENS.emerald
                      : i < 8
                      ? TOKENS.violet
                      : i < 12
                      ? TOKENS.cyan
                      : TOKENS.amber;
                  return (
                    <div
                      key={i}
                      style={{
                        gridColumnStart: col + 1,
                        gridRowStart: row + 1,
                      }}
                    >
                      <FadeUp delay={Math.min(i * 0.02, 0.2)}>
                        <div
                          className="relative rounded-xl px-3 py-2.5 backdrop-blur-md"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: `1px solid ${accent}2e`,
                            boxShadow: `0 0 0 1px ${accent}14, 0 6px 24px -8px ${accent}55`,
                          }}
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <Mono
                              style={{
                                color: TOKENS.inkGhost,
                                fontSize: "9.5px",
                              }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </Mono>
                            <span
                              className="font-[700] tracking-[-0.01em]"
                              style={{ color: accent, fontSize: "12.5px" }}
                            >
                              {t.value}
                            </span>
                          </div>
                          <div className="mt-1 text-[13px] font-[600] leading-tight tracking-[-0.01em] text-white">
                            {t.org}
                          </div>
                          <div className="mt-0.5 truncate text-[10.5px] leading-tight text-white/60">
                            {t.role}
                          </div>
                          <div className="mt-1 text-[9.5px] tracking-[0.08em] text-white/45">
                            {t.period}
                          </div>
                        </div>
                      </FadeUp>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

// ---------------- CREDENTIALS ----------------
function Credentials() {
  const blocks: {
    heading: string;
    items: string[];
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
    spotlight: string;
  }[] = [
    {
      heading: "Standards",
      items: credentials.standards,
      icon: Award,
      accent: TOKENS.emerald,
      spotlight: "rgba(52,211,153,0.18)",
    },
    {
      heading: "Certifications",
      items: credentials.certifications,
      icon: Building2,
      accent: TOKENS.violet,
      spotlight: "rgba(167,139,250,0.18)",
    },
    {
      heading: "Education",
      items: credentials.education,
      icon: GraduationCap,
      accent: TOKENS.cyan,
      spotlight: "rgba(34,211,238,0.18)",
    },
    {
      heading: "Clearance",
      items: [credentials.clearance],
      icon: KeyRound,
      accent: TOKENS.amber,
      spotlight: "rgba(251,191,36,0.16)",
    },
  ];
  return (
    <section id="credentials" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="06" label="Credentials" keys={["⌘", "6"]} />
        <div className="mb-12">
          <DisplayHeading gradient>Credentials.</DisplayHeading>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            const credentialPatterns: Array<React.ComponentProps<typeof TilePattern>["kind"]> = [
              "grid",
              "shield",
              "constellation",
              "globe",
            ];
            return (
              <FadeUp key={i} delay={i * 0.04}>
                <SpotlightCard
                  className="flex h-full flex-col p-6 md:p-7"
                  spotlightColor={b.spotlight}
                >
                  <TilePattern
                    kind={credentialPatterns[i % credentialPatterns.length]}
                    accent={b.accent}
                    opacity={0.13}
                  />
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${b.accent}29, rgba(255,255,255,0.02))`,
                        border: `1px solid ${b.accent}40`,
                      }}
                    >
                      <span style={{ color: b.accent }}>
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <Mono style={{ color: TOKENS.inkFaint }}>
                      0{i + 1}
                    </Mono>
                  </div>
                  <div className="mt-5 text-[15px] font-[600] tracking-[-0.01em] text-white">
                    {b.heading}
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {b.items.map((it, j) => (
                      <li
                        key={j}
                        className="text-[13.5px] leading-[1.55] text-white/80"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------- CONTACT ----------------
function Contact() {
  return (
    <section id="contact" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="07" label="Contact" keys={["⌘", "7"]} />
        <FadeUp>
          <h2
            className="font-[700] leading-[0.88] tracking-[-0.045em]"
            style={{
              fontSize: "clamp(40px, 5vw, 88px)",
              color: "transparent",
              backgroundImage:
                "linear-gradient(135deg, #ffffff 0%, #a78bfa 55%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Let&rsquo;s
            <br />
            build<span style={{ color: TOKENS.emerald }}>.</span>
          </h2>
        </FadeUp>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <FadeUp delay={0.1}>
            <MagneticButton href={`mailto:${profile.email}`} variant="primary">
              {profile.email}
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </FadeUp>
          <FadeUp delay={0.15}>
            <MagneticButton href={profile.linkedin} variant="ghost">
              <Linkedin className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </FadeUp>
          <FadeUp delay={0.2}>
            <MagneticButton href={profile.cvUrl} variant="ghost">
              <Download className="h-4 w-4" />
              CV
            </MagneticButton>
          </FadeUp>
        </div>

        <FadeUp delay={0.25}>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <SpotlightCard
              className="p-6"
              spotlightColor="rgba(52,211,153,0.18)"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/60" />
                <Mono style={{ color: TOKENS.inkFaint }}>Email</Mono>
              </div>
              <div className="mt-3 text-[16px] text-white">
                {profile.email}
              </div>
            </SpotlightCard>
            <SpotlightCard
              className="p-6"
              spotlightColor="rgba(167,139,250,0.18)"
            >
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/60" />
                <Mono style={{ color: TOKENS.inkFaint }}>Direct</Mono>
              </div>
              <div className="mt-3 text-[16px] text-white">
                {profile.phone}
              </div>
            </SpotlightCard>
            <SpotlightCard
              className="p-6"
              spotlightColor="rgba(34,211,238,0.18)"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-white/60" />
                <Mono style={{ color: TOKENS.inkFaint }}>Based</Mono>
              </div>
              <div className="mt-3 text-[16px] text-white">
                {profile.location}
              </div>
            </SpotlightCard>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ---------------- PAGE ----------------
export default function V2Page() {
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
      {/* Global tweaks — single Poppins face everywhere */}
      <style>{`
        ::selection { background: rgba(52,211,153,0.4); color: #fff; }
        html { scroll-behavior: smooth; background: ${TOKENS.canvas}; }
        body { background: ${TOKENS.canvas}; }
      `}</style>

      <AuroraBackground scrollY={scrollY} />
      <FloatingBubbles />
      <NoiseOverlay opacity={0.03} />

      {/* Faint 12-col grid overlay — editorial touch, fades at top/bottom */}
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

      <TopBar />

      <div className="relative z-10">
        <Hero />
        <SectionDivider from="01 · INTRO" to="02 · SIGNATURE WORK" tag="TRANSITION" accent={TOKENS.emerald} />
        <SignatureMoments />
        <SectionDivider from="02 · SIGNATURE WORK" to="03 · CAPABILITIES" tag="TRANSITION" accent={TOKENS.violet} />
        <Capabilities />
        <SectionDivider from="03 · CAPABILITIES" to="04 · FRAMEWORKS" tag="TRANSITION" accent={TOKENS.cyan} />
        <Frameworks />
        <SectionDivider from="04 · FRAMEWORKS" to="05 · TIMELINE" tag="TRANSITION" accent={TOKENS.amber} />
        <Timeline />
        <SectionDivider from="05 · TIMELINE" to="06 · CREDENTIALS" tag="TRANSITION" accent={TOKENS.emerald} />
        <Credentials />
        <SectionDivider from="06 · CREDENTIALS" to="07 · CONTACT" tag="TRANSITION" accent={TOKENS.violet} />
        <Contact />

        <footer className="relative border-t border-white/[0.06] px-5 py-10 sm:px-8 lg:px-[5vw] xl:px-[6vw]">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
            <Mono style={{ color: TOKENS.inkFaint }}>
              © 2026 Anthony Penwright · v2 / Ultra-modern edition
            </Mono>
            <div className="flex items-center gap-3">
              <Mono style={{ color: TOKENS.inkFaint }}>
                <Compass className="-mt-0.5 mr-1 inline h-3 w-3" />
                Jump
              </Mono>
              <a
                href="/"
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              >
                View v1
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
