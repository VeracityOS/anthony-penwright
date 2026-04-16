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
import { motion } from "framer-motion";
import {
  AuroraBackground,
  Counter,
  DisplayHeading,
  FadeUp,
  GlassCard,
  GradientBorder,
  Kbd,
  MagneticButton,
  Mono,
  NoiseOverlay,
  SectionKicker,
  SpotlightCard,
  StatusDot,
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
    <section className="relative px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-[1340px] grid-cols-12 gap-5 md:gap-6">
        {/* Status row */}
        <div className="col-span-12 flex flex-wrap items-center gap-3">
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

        {/* Massive wordmark — gradient fill */}
        <div className="col-span-12">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-[700] leading-[0.84] tracking-[-0.05em]"
            style={{
              fontSize: "clamp(64px, 13.5vw, 220px)",
              color: "transparent",
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #e9e6f3 48%, #b7b3cc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: "0 0 80px rgba(167,139,250,0.16)",
            }}
          >
            <span>Anthony</span>
            <br />
            <span
              className="font-[400] italic"
              style={{
                fontFamily: "var(--font-fraunces), 'Fraunces', Georgia, serif",
                backgroundImage:
                  "linear-gradient(135deg, #34d399 0%, #a78bfa 55%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Penwright.
            </span>
          </motion.h1>
        </div>

        {/* Pitch + CTAs (left) + meta card (right) */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          <FadeUp delay={0.3}>
            <p className="max-w-2xl text-[18px] leading-[1.5] text-white/80 md:text-[22px]">
              {profile.pitch}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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

        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <FadeUp delay={0.35}>
            <GlassCard className="p-5">
              <Mono style={{ color: TOKENS.inkFaint }}>Primary pillars</Mono>
              <div className="mt-3 text-[14px] leading-[1.55] text-white/85">
                People · Business · Technology
                <br />
                Innovation · Leadership
              </div>
              <div
                className="mt-4 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                }}
              />
              <div className="mt-4 grid grid-cols-2 gap-3 text-[12px] text-white/65">
                <div>
                  <Mono style={{ color: TOKENS.inkFaint }}>Location</Mono>
                  <div className="mt-1">Riyadh, KSA</div>
                </div>
                <div>
                  <Mono style={{ color: TOKENS.inkFaint }}>Clearance</Mono>
                  <div className="mt-1">UK SC / DV</div>
                </div>
              </div>
            </GlassCard>
          </FadeUp>
        </div>

        {/* Hero stats strip — animated counters */}
        <div className="col-span-12 mt-10 md:mt-16">
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
    }
  ) => {
    const Icon = opts.icon;
    return (
      <SpotlightCard
        className={`${opts.span} flex flex-col justify-between p-6 md:p-7`}
        spotlightColor={opts.spotlight}
      >
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
                  ? "clamp(48px, 6vw, 96px)"
                  : "clamp(26px, 2.6vw, 40px)",
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

        <div className={opts.big ? "mt-8" : "mt-6"}>
          <div className="text-[11px] uppercase tracking-[0.16em] text-white/55">
            {m.period}
          </div>
          <h3
            className={`mt-2 font-[600] leading-tight tracking-[-0.015em] text-white ${
              opts.big ? "text-[28px] md:text-[36px]" : "text-[20px] md:text-[22px]"
            }`}
          >
            {m.org}
          </h3>
          <div className="mt-1 text-[12.5px] text-white/60">{m.role}</div>
          <p
            className={`mt-4 leading-[1.55] text-white/75 ${
              opts.big ? "text-[15px] md:text-[17px]" : "text-[13px]"
            }`}
          >
            {m.note}
          </p>
        </div>
      </SpotlightCard>
    );
  };

  return (
    <section id="moments" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1340px]">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(0,1fr)] md:gap-5">
          {tile(mod, {
            span: "md:col-span-8 md:row-span-2",
            accent: TOKENS.emerald,
            spotlight: "rgba(52,211,153,0.24)",
            big: true,
            badge: "Programme of record",
            icon: Shield,
          })}
          {tile(neomIn, {
            span: "md:col-span-4 md:row-span-2",
            accent: TOKENS.violet,
            spotlight: "rgba(167,139,250,0.24)",
            badge: "Best performer",
            icon: Sparkles,
          })}
          {tile(neomTD, {
            span: "md:col-span-5",
            accent: TOKENS.cyan,
            spotlight: "rgba(34,211,238,0.22)",
            icon: Cpu,
          })}
          {tile(quantela, {
            span: "md:col-span-3",
            accent: TOKENS.amber,
            spotlight: "rgba(251,191,36,0.22)",
            icon: LineChart,
          })}
          {tile(cisco, {
            span: "md:col-span-4",
            accent: TOKENS.violet,
            spotlight: "rgba(167,139,250,0.22)",
            icon: Globe2,
          })}
          {tile(fco, {
            span: "md:col-span-7",
            accent: TOKENS.emerald,
            spotlight: "rgba(52,211,153,0.20)",
            icon: Briefcase,
          })}
          {tile(verax, {
            span: "md:col-span-5",
            accent: TOKENS.cyan,
            spotlight: "rgba(34,211,238,0.22)",
            badge: "Active",
            icon: Rocket,
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
    <section id="capabilities" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1340px]">
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
            return (
              <FadeUp key={i} delay={Math.min(i * 0.04, 0.2)} className={spans[i] ?? "md:col-span-4"}>
                <SpotlightCard
                  className="flex h-full flex-col p-6 md:p-7"
                  spotlightColor={spotlights[i] ?? "rgba(52,211,153,0.18)"}
                >
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
    <section id="frameworks" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1340px]">
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
            const body = (
              <div className="flex h-full flex-col p-7 md:p-9">
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

            if (i === 0) {
              // Hero framework — animated conic gradient border
              return (
                <FadeUp key={i} delay={i * 0.05}>
                  <GradientBorder radius={26} duration={9}>
                    {body}
                  </GradientBorder>
                </FadeUp>
              );
            }

            return (
              <FadeUp key={i} delay={i * 0.05}>
                <SpotlightCard className="h-full" spotlightColor={a.s}>
                  {body}
                </SpotlightCard>
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
    <section id="timeline" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1340px]">
        <SectionKicker index="05" label="Career Timeline" keys={["⌘", "5"]} />
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <DisplayHeading gradient>Twenty years.</DisplayHeading>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Ministries, giga-projects, platforms. Each row a programme; each
            column a proof point.
          </p>
        </div>

        <div className="relative">
          {/* Glowing connective line (desktop) */}
          <div
            aria-hidden
            className="absolute left-[22px] top-0 hidden h-full w-px md:block"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(52,211,153,0.5) 8%, rgba(167,139,250,0.5) 50%, rgba(34,211,238,0.5) 92%, transparent 100%)",
              boxShadow: "0 0 12px rgba(167,139,250,0.25)",
            }}
          />

          <ul className="space-y-3">
            {timeline.map((t, i) => {
              const dotColor =
                i < 3 ? TOKENS.emerald : i < 7 ? TOKENS.violet : TOKENS.cyan;
              const glow =
                i < 3
                  ? "rgba(52,211,153,0.6)"
                  : i < 7
                  ? "rgba(167,139,250,0.6)"
                  : "rgba(34,211,238,0.6)";
              return (
                <FadeUp key={i} delay={Math.min(i * 0.02, 0.2)}>
                  <li className="relative md:pl-14">
                    {/* Pin */}
                    <span
                      aria-hidden
                      className="absolute left-[15px] top-[22px] hidden h-3.5 w-3.5 rounded-full md:block"
                      style={{
                        background: TOKENS.canvas,
                        border: `2px solid ${dotColor}`,
                        boxShadow: `0 0 12px ${glow}`,
                      }}
                    />
                    <GlassCard
                      className="grid grid-cols-12 items-center gap-3 px-5 py-4 md:gap-5 md:px-6 md:py-5"
                      interactive={false}
                    >
                      <div className="col-span-12 md:col-span-1">
                        <Mono style={{ color: TOKENS.inkFaint }}>
                          {String(i + 1).padStart(2, "0")}
                        </Mono>
                      </div>
                      <div className="col-span-12 text-[18px] font-[600] leading-tight tracking-[-0.01em] text-white md:col-span-4 md:text-[20px]">
                        {t.org}
                      </div>
                      <div className="col-span-7 text-[13px] leading-tight text-white/65 md:col-span-4 md:text-[13.5px]">
                        {t.role}
                      </div>
                      <div className="col-span-5 text-right md:col-span-2">
                        <div
                          className="text-[15px] font-[700] tracking-[-0.01em]"
                          style={{ color: dotColor }}
                        >
                          {t.value}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-1 md:text-right">
                        <Mono style={{ color: TOKENS.inkFaint }}>
                          {t.period}
                        </Mono>
                      </div>
                    </GlassCard>
                  </li>
                </FadeUp>
              );
            })}
          </ul>
        </div>
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
    <section id="credentials" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1340px]">
        <SectionKicker index="06" label="Credentials" keys={["⌘", "6"]} />
        <div className="mb-12">
          <DisplayHeading gradient>Receipts.</DisplayHeading>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <FadeUp key={i} delay={i * 0.04}>
                <SpotlightCard
                  className="flex h-full flex-col p-6 md:p-7"
                  spotlightColor={b.spotlight}
                >
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
    <section id="contact" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1340px]">
        <SectionKicker index="07" label="Contact" keys={["⌘", "7"]} />
        <FadeUp>
          <h2
            className="font-[700] leading-[0.88] tracking-[-0.045em]"
            style={{
              fontSize: "clamp(56px, 10.5vw, 180px)",
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
      {/* Fraunces (serif italic accent) — loaded via Google Fonts CSS import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,300..500&display=swap');
        ::selection { background: rgba(52,211,153,0.4); color: #fff; }
        html { scroll-behavior: smooth; background: ${TOKENS.canvas}; }
        body { background: ${TOKENS.canvas}; }
        :root { --font-fraunces: 'Fraunces'; }
      `}</style>

      <AuroraBackground scrollY={scrollY} />
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
        <SignatureMoments />
        <Capabilities />
        <Frameworks />
        <Timeline />
        <Credentials />
        <Contact />

        <footer className="relative border-t border-white/[0.06] px-5 py-10 md:px-10">
          <div className="mx-auto flex max-w-[1340px] flex-wrap items-center justify-between gap-4">
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
