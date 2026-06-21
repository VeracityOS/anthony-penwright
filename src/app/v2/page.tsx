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
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Command, Search, CornerDownLeft } from "lucide-react";
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
  { value: "40+", label: "Major programmes led" },
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

// ---------------- Scroll progress bar (top, gradient) ----------------
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #34d399 0%, #a78bfa 50%, #22d3ee 100%)",
        boxShadow: "0 0 12px rgba(167,139,250,0.55)",
      }}
    />
  );
}

// ---------------- Credibility marquee (organisations served) ----------------
const TRUST_NAMES = [
  "UK Ministry of Defence",
  "Foreign & Commonwealth Office",
  "Cabinet Office",
  "Cisco",
  "Wipro",
  "Quantela",
  "NEOM",
  "Red Sea Global",
  "Environment Agency",
];
function CredibilityMarquee() {
  const items = [...TRUST_NAMES, ...TRUST_NAMES];
  const dot = (
    <span
      aria-hidden
      className="inline-block h-1 w-1 shrink-0 rounded-full"
      style={{ background: TOKENS.emerald, boxShadow: `0 0 8px ${TOKENS.emerald}` }}
    />
  );
  return (
    <div className="relative px-5 pb-6 pt-2 sm:px-8 md:pb-8 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-3 flex items-center gap-3">
          <Mono style={{ color: TOKENS.inkFaint }}>Trusted across</Mono>
          <div className="h-px flex-1 bg-white/[0.07]" />
        </div>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex w-max items-center gap-9 whitespace-nowrap py-1"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 38, ease: "linear", repeat: Infinity }}
          >
            {items.map((name, i) => (
              <span key={i} className="flex items-center gap-9">
                <span className="text-[14px] font-[500] tracking-[-0.01em] text-white/45 transition-colors hover:text-white/80 md:text-[15px]">
                  {name}
                </span>
                {dot}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ---------------- AI stack cards (hero) ----------------
function AiStackCards() {
  const cards = [
    { v: "111", k: "Specialist agents", s: "master-orchestrated", a: TOKENS.emerald, sp: "rgba(52,211,153,0.18)", Icon: Boxes },
    { v: "80+", k: "Agent skills", s: "versioned workflows", a: TOKENS.violet, sp: "rgba(167,139,250,0.18)", Icon: Layers },
    { v: "10+", k: "MCP integrations", s: "Graph · Azure · GitHub · n8n", a: TOKENS.cyan, sp: "rgba(34,211,238,0.18)", Icon: Cpu },
    { v: "RAG", k: "Localised retrieval", s: "vector search · HNSW", a: TOKENS.amber, sp: "rgba(251,191,36,0.16)", Icon: Sparkles },
    { v: "4-tier", k: "LLM routing", s: "Haiku → Opus", a: TOKENS.emerald, sp: "rgba(52,211,153,0.18)", Icon: Gauge },
    { v: "Hooks", k: "Harness & CI", s: "session · post-tool · stop", a: TOKENS.violet, sp: "rgba(167,139,250,0.18)", Icon: Shield },
  ];
  const archs = [
    "Domain-Driven Design",
    "Event sourcing",
    "Hierarchical-mesh swarm",
    "Zero-trust agent identity",
    "Tamper-proof provenance",
  ];
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <Mono style={{ color: TOKENS.inkFaint }}>Production AI stack</Mono>
        <div className="h-px flex-1 bg-white/[0.07]" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {cards.map((c, i) => {
          const Icon = c.Icon;
          return (
            <FadeUp key={i} delay={Math.min(i * 0.05, 0.3)}>
              <SpotlightCard className="h-full p-4" spotlightColor={c.sp}>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: `${c.a}1f`, border: `1px solid ${c.a}40` }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: c.a }} />
                </div>
                <div
                  className="mt-3 font-[700] leading-none tracking-[-0.02em]"
                  style={{ color: c.a, fontSize: "clamp(20px, 2vw, 26px)" }}
                >
                  {c.v}
                </div>
                <div className="mt-1.5 text-[12.5px] font-[500] leading-tight text-white">
                  {c.k}
                </div>
                <div className="mt-0.5 text-[10.5px] leading-tight text-white/45">
                  {c.s}
                </div>
              </SpotlightCard>
            </FadeUp>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Mono style={{ color: TOKENS.inkFaint }}>Architectures</Mono>
        {archs.map((a) => (
          <span
            key={a}
            className="rounded-[6px] px-2 py-[3px] text-[11px] text-white/65"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------- ⌘K Command palette ----------------
type CmdItem = {
  label: string;
  hint: string;
  href: string;
  external?: boolean;
};
function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const items: CmdItem[] = useMemo(
    () => [
      { label: "Executive Summary", hint: "Section 02", href: "#summary" },
      { label: "Signature Work", hint: "Section 03", href: "#moments" },
      { label: "Capabilities", hint: "Section 04", href: "#capabilities" },
      { label: "Proprietary Frameworks", hint: "Section 05", href: "#frameworks" },
      { label: "Agent Identity Framework", hint: "Open standard · 06", href: "#agent-identity" },
      { label: "Veracity OS", hint: "Section 07", href: "#veracity-os" },
      { label: "Career Timeline", hint: "Section 08", href: "#timeline" },
      { label: "Credentials", hint: "Section 09", href: "#credentials" },
      { label: "Contact", hint: "Section 10", href: "#contact" },
      { label: "Email Anthony", hint: profile.email, href: `mailto:${profile.email}`, external: true },
      { label: "Download CV", hint: "PDF · DOCX", href: profile.cvUrl, external: true },
      {
        label: "Read the whitepaper",
        hint: "Agent Identity Framework",
        href: "/agent-identity-framework-whitepaper.docx",
        external: true,
      },
      { label: "LinkedIn", hint: "Connect", href: profile.linkedin, external: true },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  const go = (item: CmdItem | undefined) => {
    if (!item) return;
    setOpen(false);
    setQuery("");
    if (item.external) {
      window.open(item.href, item.href.startsWith("mailto:") ? "_self" : "_blank");
    } else {
      const el = document.querySelector(item.href);
      el?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", item.href);
    }
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(filtered[active]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={() => setOpen(false)}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "rgba(6,8,10,0.66)", backdropFilter: "blur(6px)" }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/12 bg-[#0d1014]/95"
            style={{
              boxShadow:
                "0 30px 80px -24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
              <Search className="h-4 w-4 text-white/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or action…"
                className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none"
              />
              <span className="hidden items-center gap-1 sm:flex">
                <Kbd>esc</Kbd>
              </span>
            </div>
            <div className="max-h-[52vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-[13px] text-white/45">
                  No matches.
                </div>
              )}
              {filtered.map((item, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={item.label}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item)}
                    className="flex w-full items-center justify-between gap-4 px-3 py-2.5 text-left"
                    style={{
                      background: isActive
                        ? "linear-gradient(90deg, rgba(52,211,153,0.14), rgba(167,139,250,0.08))"
                        : "transparent",
                      boxShadow: isActive
                        ? `inset 2px 0 0 0 ${TOKENS.emerald}`
                        : "none",
                    }}
                  >
                    <span className="mx-1 flex flex-col">
                      <span className="text-[14px] font-[500] text-white">
                        {item.label}
                      </span>
                      <span className="text-[11.5px] text-white/45">{item.hint}</span>
                    </span>
                    {isActive && (
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-white/50" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2.5">
              <div className="flex items-center gap-2 text-[11px] text-white/40">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                <span>navigate</span>
                <Kbd>↵</Kbd>
                <span>open</span>
              </div>
              <Mono style={{ color: TOKENS.inkFaint }}>AP · v2</Mono>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-cmdk"))}
          aria-label="Open command palette"
          className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1.5 text-white/55 transition hover:bg-white/[0.08] hover:text-white"
        >
          <Command className="h-3 w-3" />
          <span className="text-[11px]">K</span>
        </button>
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
          href="#agent-identity"
          className="hidden rounded-full px-3 py-1.5 text-[12px] text-white/70 transition hover:bg-white/[0.06] hover:text-white md:inline-flex"
        >
          Identity Framework
        </a>
        <a
          href="#veracity-os"
          className="hidden rounded-full px-3 py-1.5 text-[12px] text-white/70 transition hover:bg-white/[0.06] hover:text-white md:inline-flex"
        >
          Veracity OS
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
            className="mt-7 pb-3 text-6xl font-semibold leading-[1.18] tracking-[-0.035em] md:text-7xl"
            style={{
              color: "transparent",
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #e9e6f3 55%, #b7b3cc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: "0 0 60px rgba(167,139,250,0.14)",
              paddingBottom: "0.15em",
              overflow: "visible",
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

        {/* Production AI stack — full-width band, aligned with the grid */}
        <div className="col-span-12 mt-8 md:mt-10">
          <FadeUp delay={0.4}>
            <AiStackCards />
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

// ---------------- EXECUTIVE SUMMARY ----------------
function ExecutiveSummary() {
  const highlights = [
    { value: "$1.3BN+", label: "delivered" },
    { value: "40+", label: "major programmes" },
    { value: "4", label: "proprietary frameworks" },
    { value: "7", label: "active ventures" },
    { value: "13", label: "sectors" },
    { value: "20+", label: "years" },
  ];
  return (
    <section id="summary" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="02" label="Executive Summary" keys={["⌘", "2"]} />
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <DisplayHeading gradient>The short version.</DisplayHeading>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Twenty years. $1.3BN+ delivered. Four frameworks, seven ventures,
            one operator — shipping outcomes, not decks.
          </p>
        </div>

        <FadeUp>
          <OrbitBorder accent={TOKENS.emerald} radius={16} duration={26}>
            <SpotlightCard
              className="p-7 md:p-10"
              spotlightColor="rgba(52,211,153,0.16)"
            >
              <TilePattern kind="constellation" accent={TOKENS.emerald} opacity={0.12} />
              <div className="relative space-y-5 text-[15.5px] leading-[1.7] text-white/85 md:text-[16.5px]">
                {profile.executiveSummary.map((para, i) => (
                  <p key={i}>
                    {i === 0 && (
                      <span
                        className="float-left mr-2 font-[700] leading-[0.9]"
                        style={{
                          color: TOKENS.emerald,
                          fontSize: "clamp(42px, 3.6vw, 56px)",
                        }}
                      >
                        {para.charAt(0)}
                      </span>
                    )}
                    {i === 0 ? para.slice(1) : para}
                  </p>
                ))}
              </div>
              <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
                {highlights.map((h, i) => {
                  const accents = [
                    TOKENS.emerald,
                    TOKENS.violet,
                    TOKENS.cyan,
                    TOKENS.amber,
                    TOKENS.emerald,
                    TOKENS.violet,
                  ];
                  const accent = accents[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-lg px-3 py-2.5"
                      style={{
                        background: `${accent}10`,
                        border: `1px solid ${accent}44`,
                        boxShadow: `inset 2px 0 0 0 ${accent}`,
                      }}
                    >
                      <div
                        className="font-[700] leading-none tracking-[-0.02em]"
                        style={{ color: accent, fontSize: "clamp(18px, 1.8vw, 22px)" }}
                      >
                        {h.value}
                      </div>
                      <div className="mt-1.5 text-[10.5px] uppercase tracking-[0.14em] text-white/55">
                        {h.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </SpotlightCard>
          </OrbitBorder>
        </FadeUp>
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
        <SectionKicker index="03" label="Signature Work" keys={["⌘", "3"]} />
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
        <SectionKicker index="04" label="Capabilities" keys={["⌘", "4"]} />
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
            const cardAccent = capabilityAccents[i % capabilityAccents.length];
            return (
              <FadeUp key={i} delay={Math.min(i * 0.04, 0.2)} className={spans[i] ?? "md:col-span-4"}>
                <OrbitBorder
                  accent={cardAccent}
                  radius={16}
                  duration={18 + i * 2}
                  className="h-full"
                >
                <SpotlightCard
                  className="flex h-full flex-col p-6 md:p-7"
                  spotlightColor={spotlights[i] ?? "rgba(52,211,153,0.18)"}
                >
                  <TilePattern
                    kind={capabilityPatterns[i % capabilityPatterns.length]}
                    accent={cardAccent}
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
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {g.tags.map((t, j) => {
                      const tagAccent =
                        capabilityAccents[i % capabilityAccents.length];
                      return (
                        <motion.span
                          key={j}
                          initial={{ opacity: 0, y: 4 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-10% 0px" }}
                          transition={{
                            duration: 0.35,
                            delay: Math.min(j * 0.025, 0.35),
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          whileHover={{ y: -1 }}
                          className="group relative inline-flex items-center overflow-hidden rounded-[6px] px-2.5 py-[5px] text-[11.5px] font-[500] leading-[1.1]"
                          style={{
                            backgroundColor: `${tagAccent}1f`,
                            border: `1px solid ${tagAccent}66`,
                            boxShadow: `inset 2px 0 0 0 ${tagAccent}, 0 0 12px ${tagAccent}33`,
                            color: "#ffffff",
                          }}
                        >
                          {/* Shimmer sweep on entrance */}
                          <motion.span
                            aria-hidden
                            initial={{ x: "-120%" }}
                            whileInView={{ x: "140%" }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{
                              duration: 0.9,
                              delay: 0.35 + Math.min(j * 0.025, 0.35),
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
                            style={{
                              background: `linear-gradient(90deg, transparent 0%, ${tagAccent}44 50%, transparent 100%)`,
                            }}
                          />
                          <span className="relative">{t}</span>
                        </motion.span>
                      );
                    })}
                  </div>
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
        <SectionKicker index="05" label="Proprietary Frameworks" keys={["⌘", "5"]} />
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

// ---------------- AGENT IDENTITY FRAMEWORK ----------------
// Anthony's open-standard IP: a published specification for identity, access,
// audit, compliance and behavioural defence of agentic AI. CC-BY-SA 4.0 spec,
// Apache-2.0 reference impls, SHA-256 + Bitcoin-timestamped for prior art.
function AgentIdentityFramework() {
  const accent = TOKENS.violet;
  const spotlight = "rgba(167,139,250,0.22)";

  const layers = [
    {
      no: "L1",
      name: "Identity",
      body: "Every agent gets a verifiable, attestable, revocable identity — issued and scoped, never assumed. An Agent IdP plus the Agent Bill of Materials (ABOM) record what an agent is, what it is built from, and who stands behind it.",
    },
    {
      no: "L2",
      name: "Policy",
      body: "Agents hold no standing power. Rights are granted as scoped, capability-based authorisations with just-in-time elevation — expressed in human-auditable Rulebooks rather than buried in code.",
    },
    {
      no: "L3",
      name: "Enforcement",
      body: "A policy enforcement plane sits in the request path. Every tool call, model hop and data access is checked against policy before it executes — prevention, not post-hoc detection.",
    },
    {
      no: "L4",
      name: "Evidence",
      body: "Hash-chained, tamper-evident audit with deterministic replay: reconstruct exactly what an agent did, in what order, and why — to the standard an auditor or regulator will accept.",
    },
    {
      no: "L5",
      name: "Trust Surface",
      body: "Federation and agent-to-agent operation across organisational boundaries — so agents from different parties transact on verifiable trust, not blind trust.",
    },
  ];

  const constructs = [
    "Agent IdP",
    "Agent Bill of Materials (ABOM)",
    "Capability-based authz",
    "Just-in-time elevation",
    "Policy enforcement plane",
    "Hash-chained audit",
    "Deterministic replay",
    "Rulebooks",
    "Federation / A2A",
  ];

  return (
    <section id="agent-identity" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="06" label="Open Standard" keys={["⌘", "6"]} />
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <DisplayHeading gradient>The Agent Identity Framework.</DisplayHeading>
            <p className="mt-3 text-[14px] uppercase tracking-[0.18em] text-white/55">
              An open specification · Authored by Anthony Penwright · Stewarded by Verax Venture Studio
            </p>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Every other actor in software has identity — users have credentials,
            services have certificates, machines have workload identity.{" "}
            <span className="text-white">Autonomous AI agents have nothing of the kind.</span>{" "}
            This is the open standard that gives them one.
          </p>
        </div>

        {/* Provenance / licence banner */}
        <FadeUp delay={0.05}>
          <div
            className="mb-6 flex flex-col gap-2 rounded-2xl border px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:gap-6 md:px-7 md:py-5"
            style={{
              borderColor: "rgba(167,139,250,0.28)",
              background:
                "linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(167,139,250,0.02) 60%)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
              />
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                Published · v0.1
              </span>
            </div>
            <p className="text-[13px] leading-snug text-white/85 md:text-[14px]">
              <span className="font-[600] text-white">Spec under CC-BY-SA 4.0</span> · reference
              implementations under Apache 2.0 · SHA-256 + Bitcoin-timestamped for prior art —
              a defensive publication, free for anyone to adopt.
            </p>
          </div>
        </FadeUp>

        {/* Five sequentially adoptable layers — vertical stack */}
        <div className="grid grid-cols-1 gap-4">
          {layers.map((l, i) => (
            <FadeUp key={l.no} delay={i * 0.05}>
              <SpotlightCard spotlightColor={spotlight}>
                <div className="relative flex flex-col gap-3 overflow-hidden p-5 md:flex-row md:items-center md:gap-7 md:p-6">
                  <TilePattern kind="circuit" accent={accent} opacity={0.1} />
                  <div className="flex shrink-0 items-center gap-4 md:w-[230px]">
                    <span
                      className="font-[700] leading-none tracking-[-0.03em]"
                      style={{
                        fontSize: "clamp(26px, 2.4vw, 36px)",
                        color: "transparent",
                        backgroundImage: `linear-gradient(135deg, ${accent} 0%, #ffffff 100%)`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      {l.no}
                    </span>
                    <h3 className="text-[19px] font-[600] leading-tight tracking-[-0.015em] text-white md:text-[21px]">
                      {l.name}
                    </h3>
                  </div>
                  <p className="relative text-[13.5px] leading-[1.6] text-white/75 md:text-[14.5px]">
                    {l.body}
                  </p>
                </div>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>

        {/* Constructs + CTA */}
        <FadeUp delay={0.2}>
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5 backdrop-blur md:px-7 md:py-6">
            <Mono style={{ color: accent }}>Core constructs · 14 sections</Mono>
            <div className="mt-4 flex flex-wrap gap-2">
              {constructs.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-[6px] px-2.5 py-[5px] text-[11.5px] font-[500] leading-[1.1]"
                  style={{
                    backgroundColor: `${accent}1f`,
                    border: `1px solid ${accent}66`,
                    boxShadow: `inset 2px 0 0 0 ${accent}`,
                    color: "#ffffff",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticButton href="/agent-identity-framework-whitepaper.docx" variant="primary">
                <Download className="h-4 w-4" />
                Read the whitepaper
              </MagneticButton>
              <span className="font-mono text-[10.5px] leading-tight text-white/40">
                SHA-256 b2f19e41…0e4a699a
              </span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ---------------- VERACITY OS ----------------
function VeracityOS() {
  const accent = TOKENS.emerald;
  const spotlight = "rgba(52,211,153,0.22)";

  const pillars = [
    {
      tag: "What it is",
      title: "Knowledge you can prove.",
      body: "Every fact, document, and decision is signed by a verified person and locked into a tamper-proof record. Think of it as a notary built into your knowledge base — provenance is baked in, not bolted on.",
    },
    {
      tag: "How it plugs in",
      title: "Uses the logins you already have.",
      body: "Veracity connects to your existing staff login system (Microsoft, Okta, Ping, or WebAuthn) and verifies who's writing — it never owns or holds your passwords or directory. Bank-grade key security at the enterprise tier.",
    },
    {
      tag: "Where it lands",
      title: "Built for industries where wikis fail audits.",
      body: "Healthcare · Pharma · Construction · Family Offices — sectors where regulators, auditors, and lawyers must prove who knew what, when. Three pricing tiers from $45K/yr to enterprise-custom.",
    },
  ];

  return (
    <section id="veracity-os" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="07" label="The New Architecture" keys={["⌘", "7"]} />
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <DisplayHeading gradient>Veracity OS.</DisplayHeading>
            <p className="mt-3 text-[14px] uppercase tracking-[0.18em] text-white/55">
              Provenance for the AI era · Founder &amp; CEO
            </p>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            A knowledge platform where every fact is <span className="text-white">signed by a real, verified person</span> and <span className="text-white">locked into a tamper-proof record</span> — so regulators, auditors, and AI systems can trust what they read. Built inside Verax Venture Studio.
          </p>
        </div>

        <FadeUp delay={0.05}>
          <div
            className="mb-6 flex flex-col gap-2 rounded-2xl border px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:gap-6 md:px-7 md:py-5"
            style={{
              borderColor: "rgba(52,211,153,0.28)",
              background:
                "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(52,211,153,0.02) 60%)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
              />
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                Projected commercial value
              </span>
            </div>
            <p className="text-[14px] leading-snug text-white md:text-[15px]">
              <span className="font-[600]">$33M+ cumulative revenue</span> over five years ·{" "}
              <span className="font-[600]">$14.9M ARR</span> by Y5 ·{" "}
              <span className="font-[600]">2,651 customers</span> — across the four regulated industries where today&apos;s wikis can&apos;t pass an audit.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <FadeUp key={p.tag} delay={i * 0.06}>
              <OrbitBorder accent={accent} radius={20} duration={16 + i * 2}>
                <SpotlightCard className="h-full" spotlightColor={spotlight}>
                  <div className="relative flex h-full flex-col overflow-hidden p-7 md:p-8">
                    <TilePattern kind="network" accent={accent} opacity={0.14} />
                    <Mono style={{ color: accent }}>{p.tag}</Mono>
                    <h3 className="mt-4 text-[20px] font-[600] leading-tight tracking-[-0.015em] text-white md:text-[22px]">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[13.5px] leading-[1.6] text-white/75">
                      {p.body}
                    </p>
                  </div>
                </SpotlightCard>
              </OrbitBorder>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.25}>
          <div
            className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 backdrop-blur md:grid-cols-4 md:gap-6 md:px-7 md:py-5"
          >
            {[
              { k: "5-yr cumulative revenue", v: "$33.3M" },
              { k: "Y5 annual run-rate", v: "$14.9M" },
              { k: "Y5 customers", v: "2,651" },
              { k: "Round", v: "$2.5M Seed · live" },
            ].map((s) => (
              <div key={s.k} className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">{s.k}</span>
                <span className="text-[14px] font-[600] leading-tight text-white md:text-[15px]">{s.v}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ---------------- TIMELINE ----------------
function Timeline() {
  return (
    <section id="timeline" className="relative px-5 py-12 sm:px-8 md:py-16 lg:px-[5vw] xl:px-[6vw]">
      <div className="mx-auto max-w-[1600px]">
        <SectionKicker index="08" label="Career Timeline" keys={["⌘", "8"]} />
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
      heading: "Data, Security & Quality",
      items: credentials.dataSecurity,
      icon: Shield,
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
        <SectionKicker index="09" label="Credentials" keys={["⌘", "9"]} />
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
        <SectionKicker index="10" label="Contact" keys={["⌘", "0"]} />
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

      <ScrollProgress />
      <CommandPalette />
      <TopBar />

      <div className="relative z-10">
        <Hero />
        <CredibilityMarquee />
        <SectionDivider from="01 · INTRO" to="02 · SUMMARY" tag="TRANSITION" accent={TOKENS.emerald} />
        <ExecutiveSummary />
        <SectionDivider from="02 · SUMMARY" to="03 · SIGNATURE WORK" tag="TRANSITION" accent={TOKENS.violet} />
        <SignatureMoments />
        <SectionDivider from="03 · SIGNATURE WORK" to="04 · CAPABILITIES" tag="TRANSITION" accent={TOKENS.cyan} />
        <Capabilities />
        <SectionDivider from="04 · CAPABILITIES" to="05 · FRAMEWORKS" tag="TRANSITION" accent={TOKENS.amber} />
        <Frameworks />
        <SectionDivider from="05 · FRAMEWORKS" to="06 · AGENT IDENTITY" tag="OPEN STANDARD" accent={TOKENS.violet} />
        <AgentIdentityFramework />
        <SectionDivider from="06 · AGENT IDENTITY" to="07 · VERACITY OS" tag="ARCHITECTURE" accent={TOKENS.emerald} />
        <VeracityOS />
        <SectionDivider from="07 · VERACITY OS" to="08 · TIMELINE" tag="TRANSITION" accent={TOKENS.emerald} />
        <Timeline />
        <SectionDivider from="08 · TIMELINE" to="09 · CREDENTIALS" tag="TRANSITION" accent={TOKENS.violet} />
        <Credentials />
        <SectionDivider from="09 · CREDENTIALS" to="10 · CONTACT" tag="TRANSITION" accent={TOKENS.cyan} />
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
