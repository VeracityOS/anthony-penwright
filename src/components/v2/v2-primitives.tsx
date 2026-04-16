"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

// ------------------------------------------------------------------
// v2 Primitives — Ultra-modern 2026 (aurora + glass + bento)
// Linear · Vercel · Arc · Vision Pro · Rauno aesthetic
// ------------------------------------------------------------------

// Colour tokens. Deep dark canvas (never pure black) + emerald/violet/cyan aurora.
export const TOKENS = {
  canvas: "#0a0a0a",
  canvasDeep: "#050506",
  ink: "#f5f5f7",
  inkDim: "rgba(245,245,247,0.68)",
  inkFaint: "rgba(245,245,247,0.44)",
  inkGhost: "rgba(245,245,247,0.28)",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.14)",
  glass: "rgba(255,255,255,0.035)",
  glassHover: "rgba(255,255,255,0.06)",
  emerald: "#34d399",
  violet: "#a78bfa",
  cyan: "#22d3ee",
  amber: "#fbbf24",
  pink: "#f472b6",
};

// ---------------- Mono label (monospace eyebrow) ----------------
export function Mono({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`uppercase tracking-[0.24em] text-[10.5px] font-medium ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}

// ---------------- Kbd key (command-palette style) ----------------
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[5px] border border-white/15 bg-white/[0.05] px-1.5 text-[10px] font-medium tracking-[0.04em] text-white/75 shadow-[inset_0_-1px_0_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.1)]"
    >
      {children}
    </span>
  );
}

// ---------------- Status dot with pulse ----------------
export function StatusDot({ color = TOKENS.emerald }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2 w-2 items-center justify-center">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
      />
    </span>
  );
}

// ---------------- Noise overlay (prevents banding on gradients) ----------------
export function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  // SVG-encoded fractal noise as data URI — zero dependency, fully inline.
  const svg = `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay"
      style={{
        backgroundImage: url,
        backgroundSize: "180px 180px",
        opacity,
      }}
    />
  );
}

// ---------------- Aurora background (drifting mesh gradients, scroll-parallax) ----------------
export function AuroraBackground({ scrollY }: { scrollY?: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const fallback = useMotionValue(0);
  const source = scrollY ?? fallback;
  // Scroll-linked parallax — aurora drifts slower than page for depth.
  const y1 = useTransform(source, [0, 3000], [0, -260]);
  const y2 = useTransform(source, [0, 3000], [0, -440]);
  const y3 = useTransform(source, [0, 3000], [0, -620]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base deep canvas + top-down subtle wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, rgba(52,211,153,0.14), transparent 55%), radial-gradient(ellipse at 90% 25%, rgba(167,139,250,0.12), transparent 50%), radial-gradient(ellipse at 8% 60%, rgba(34,211,238,0.10), transparent 55%), ${TOKENS.canvas}`,
        }}
      />

      {/* Emerald drifter — top-left */}
      <motion.div
        className="absolute -left-[12%] top-[4%] h-[55vw] w-[55vw] rounded-full will-change-transform"
        style={{
          y: reduce ? 0 : y1,
          background:
            "radial-gradient(circle, rgba(52,211,153,0.30) 0%, rgba(52,211,153,0) 62%)",
          filter: "blur(80px)",
          opacity: 0.9,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 44, -22, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet drifter — right middle */}
      <motion.div
        className="absolute right-[-16%] top-[32%] h-[60vw] w-[60vw] rounded-full will-change-transform"
        style={{
          y: reduce ? 0 : y2,
          background:
            "radial-gradient(circle, rgba(167,139,250,0.28) 0%, rgba(167,139,250,0) 62%)",
          filter: "blur(92px)",
          opacity: 0.85,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, -54, 32, 0],
                scale: [1, 0.92, 1.12, 1],
              }
        }
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan drifter — bottom-left */}
      <motion.div
        className="absolute bottom-[-12%] left-[18%] h-[50vw] w-[50vw] rounded-full will-change-transform"
        style={{
          y: reduce ? 0 : y3,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.24) 0%, rgba(34,211,238,0) 62%)",
          filter: "blur(100px)",
          opacity: 0.8,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 34, -42, 0],
                scale: [1, 1.06, 0.94, 1],
              }
        }
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft corner ambient leaks */}
      <div
        className="absolute left-0 top-0 h-[40vh] w-[40vw]"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(52,211,153,0.14), transparent 60%)",
        }}
      />
      <div
        className="absolute right-0 bottom-0 h-[45vh] w-[45vw]"
        style={{
          background:
            "radial-gradient(circle at 100% 100%, rgba(167,139,250,0.12), transparent 60%)",
        }}
      />

      {/* Gentle centre vignette — keeps focus inward */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 38%, rgba(5,5,6,0.72) 100%)",
        }}
      />
    </div>
  );
}

// ---------------- Glass card (frosted, inner-line, subtle bottom glow) ----------------
export function GlassCard({
  children,
  className = "",
  onMouseMove,
  style,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: CSSProperties;
  interactive?: boolean;
}) {
  return (
    <div
      onMouseMove={onMouseMove}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(24px) saturate(140%)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(255,255,255,0.02), 0 22px 60px -20px rgba(0,0,0,0.55)",
        transition: interactive
          ? "border-color 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)"
          : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ---------------- Spotlight card — light-follows-cursor radial gradient ----------------
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(52,211,153,0.20)",
  style,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: CSSProperties;
  lift?: boolean;
}) {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      whileHover={reduce || !lift ? undefined : { y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
        backdropFilter: "blur(24px) saturate(140%)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.09), 0 26px 60px -24px rgba(0,0,0,0.65)",
        ...style,
      }}
    >
      {/* Spotlight layer — radial at cursor position */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(460px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 45%)`,
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Bottom hairline highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

// ---------------- Animated conic gradient border ----------------
export function GradientBorder({
  children,
  className = "",
  radius = 28,
  duration = 8,
  inset = 1.5,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  duration?: number;
  inset?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="absolute"
        style={{
          inset: -inset,
          borderRadius: radius,
          background: `conic-gradient(from 0deg at 50% 50%, ${TOKENS.emerald}, ${TOKENS.violet}, ${TOKENS.cyan}, ${TOKENS.emerald})`,
          animation: reduce ? undefined : `ap-conic-spin ${duration}s linear infinite`,
          opacity: 0.85,
        }}
      />
      <style>{`@keyframes ap-conic-spin { to { transform: rotate(360deg); } }`}</style>
      <div
        className="relative h-full overflow-hidden"
        style={{
          borderRadius: radius - inset,
          background:
            "linear-gradient(180deg, rgba(12,12,14,0.94) 0%, rgba(6,6,9,0.96) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -20px rgba(0,0,0,0.55)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------- Fade-up on scroll ----------------
export function FadeUp({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------- Counter — ticks up when in view ----------------
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1800,
  decimals = 0,
  className = "",
  style,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  const formatted =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-US");

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ---------------- Display heading (massive, tight tracking, gradient-fill option) ----------------
export function DisplayHeading({
  children,
  className = "",
  gradient = false,
  size = "clamp(32px, 4vw, 64px)",
  style,
}: {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  size?: string;
  style?: CSSProperties;
}) {
  return (
    <h2
      className={`font-[700] leading-[0.9] tracking-[-0.035em] ${className}`}
      style={{
        fontSize: size,
        color: gradient ? "transparent" : TOKENS.ink,
        backgroundImage: gradient
          ? "linear-gradient(180deg, #ffffff 0%, #c7c5d6 100%)"
          : undefined,
        WebkitBackgroundClip: gradient ? "text" : undefined,
        backgroundClip: gradient ? "text" : undefined,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

// ---------------- Section kicker — "02 · Signature Work" with kbd keys ----------------
export function SectionKicker({
  index,
  label,
  keys,
}: {
  index: string;
  label: string;
  keys?: string[];
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <Mono style={{ color: TOKENS.inkFaint }}>
        {index} · {label}
      </Mono>
      {keys && keys.length > 0 && (
        <span className="flex items-center gap-1">
          {keys.map((k, i) => (
            <Kbd key={i}>{k}</Kbd>
          ))}
        </span>
      )}
    </div>
  );
}

// ---------------- Magnetic button ----------------
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18 });
  const sy = useSpring(y, { stiffness: 240, damping: 18 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    x.set(dx);
    y.set(dy);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const primaryStyle: CSSProperties = {
    background:
      "linear-gradient(135deg, rgba(52,211,153,0.95) 0%, rgba(34,211,238,0.9) 100%)",
    color: "#042018",
    boxShadow:
      "0 20px 44px -12px rgba(52,211,153,0.5), inset 0 1px 0 rgba(255,255,255,0.35)",
  };
  const ghostStyle: CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    color: TOKENS.ink,
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  };

  const commonCls =
    "group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-[13px] font-medium tracking-[0.02em] transition-transform";
  const baseCls = `${commonCls} ${className}`;

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-3"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.MutableRefObject<HTMLAnchorElement | null>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={baseCls}
        style={variant === "primary" ? primaryStyle : ghostStyle}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.MutableRefObject<HTMLButtonElement | null>}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={baseCls}
      style={variant === "primary" ? primaryStyle : ghostStyle}
    >
      {inner}
    </button>
  );
}

// ---------------- Orbit border — discreet perimeter light ----------------
// Two tiny light dots trace the card's perimeter on an `offset-path`. Slow,
// continuous, non-intrusive. Replacement for the louder conic-gradient border.
// Uses CSS-only animation (GPU offset-path) so it's cheap on every card.
export function OrbitBorder({
  children,
  accent = TOKENS.emerald,
  radius = 20,
  duration = 16,
  className = "",
}: {
  children: ReactNode;
  accent?: string;
  radius?: number;
  duration?: number;
  className?: string;
}) {
  // Stable SSR-safe ID — useId() is deterministic across server/client renders
  // (Math.random() caused a hydration mismatch).
  const rawId = useId();
  const id = `orbit${rawId.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div
      className={`relative ${className}`}
      style={{ borderRadius: radius }}
    >
      {/* Content sits on top */}
      <div className="relative z-10" style={{ borderRadius: radius }}>
        {children}
      </div>

      {/* Thin hairline frame at rest */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          border: `1px solid ${accent}1f`,
        }}
      />

      {/* Two traveling light dots at 180° phase offset — perimeter orbit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-visible"
        style={{ borderRadius: radius }}
      >
        <style>{`
          @keyframes ${id}-a { to { offset-distance: 100%; } }
          @keyframes ${id}-b { from { offset-distance: 50%; } to { offset-distance: 150%; } }
          .${id}-dot {
            position: absolute;
            inset: 0;
            width: 6px;
            height: 6px;
            border-radius: 9999px;
            background: radial-gradient(circle at 35% 35%, #ffffff 0%, ${accent} 50%, transparent 75%);
            box-shadow: 0 0 10px ${accent}, 0 0 24px ${accent}88, 0 0 40px ${accent}44;
            offset-path: inset(0 round ${radius}px);
            offset-rotate: 0deg;
            offset-anchor: center;
          }
          .${id}-a { animation: ${id}-a ${duration}s linear infinite; }
          .${id}-b { animation: ${id}-b ${duration * 1.15}s linear infinite; opacity: 0.6; }
          @media (prefers-reduced-motion: reduce) {
            .${id}-a, .${id}-b { animation: none; display: none; }
          }
        `}</style>
        <span className={`${id}-dot ${id}-a`} />
        <span className={`${id}-dot ${id}-b`} />
      </div>
    </div>
  );
}

// ---------------- Tile line-art pattern — subtle contextual watermark ----------------
// Thin-line SVG motifs themed per card context, rendered in the card's accent
// colour at low opacity. Sit as a top-right or bottom-right watermark — never
// compete with copy.
export function TilePattern({
  kind,
  accent,
  opacity = 0.18,
}: {
  kind:
    | "network"
    | "hex"
    | "circuit"
    | "globe"
    | "chart"
    | "constellation"
    | "shield"
    | "grid";
  accent: string;
  opacity?: number;
}) {
  const common = {
    stroke: accent,
    fill: "none",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };
  const dotFill = { fill: accent, stroke: "none" };

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className="pointer-events-none absolute right-0 top-0 h-[220px] w-[220px] md:h-[280px] md:w-[280px]"
      style={{ opacity, transform: "translate(12%, -12%)" }}
    >
      {kind === "network" && (
        <g {...common}>
          {/* Connected nodes — Cisco/city network style */}
          <line x1="40" y1="40" x2="110" y2="70" />
          <line x1="110" y1="70" x2="170" y2="45" />
          <line x1="110" y1="70" x2="60" y2="140" />
          <line x1="110" y1="70" x2="160" y2="130" />
          <line x1="60" y1="140" x2="130" y2="170" />
          <line x1="160" y1="130" x2="130" y2="170" />
          <circle cx="40" cy="40" r="8" />
          <circle cx="110" cy="70" r="12" />
          <circle cx="170" cy="45" r="7" />
          <circle cx="60" cy="140" r="9" />
          <circle cx="160" cy="130" r="8" />
          <circle cx="130" cy="170" r="10" />
          <circle cx="40" cy="40" r="2.5" {...dotFill} />
          <circle cx="110" cy="70" r="3" {...dotFill} />
          <circle cx="170" cy="45" r="2" {...dotFill} />
        </g>
      )}
      {kind === "hex" && (
        <g {...common}>
          {/* Hex lattice — NEOM / innovation */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => {
              const cx = 30 + col * 50 + (row % 2) * 25;
              const cy = 40 + row * 50;
              const r = 22;
              const pts = Array.from({ length: 6 })
                .map((_, k) => {
                  const a = (Math.PI / 3) * k - Math.PI / 2;
                  return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
                })
                .join(" ");
              return <polygon key={`${row}-${col}`} points={pts} />;
            })
          )}
        </g>
      )}
      {kind === "circuit" && (
        <g {...common}>
          {/* PCB traces — Tech & Digital */}
          <path d="M20 60 H 80 L 100 80 H 160 L 180 60" />
          <path d="M20 110 H 60 L 80 130 H 140" />
          <path d="M30 150 H 70 L 90 170 H 170" />
          <path d="M120 30 V 60" />
          <path d="M50 80 V 110" />
          <path d="M160 90 V 140" />
          <circle cx="20" cy="60" r="3" {...dotFill} />
          <circle cx="100" cy="80" r="3" {...dotFill} />
          <circle cx="180" cy="60" r="3" {...dotFill} />
          <circle cx="140" cy="130" r="3" {...dotFill} />
          <circle cx="90" cy="170" r="3" {...dotFill} />
          <rect x="105" y="75" width="20" height="10" />
          <rect x="55" y="125" width="16" height="8" />
        </g>
      )}
      {kind === "globe" && (
        <g {...common}>
          {/* Globe meridians — FCO / diplomatic */}
          <circle cx="100" cy="100" r="75" />
          <ellipse cx="100" cy="100" rx="75" ry="30" />
          <ellipse cx="100" cy="100" rx="75" ry="55" />
          <ellipse cx="100" cy="100" rx="30" ry="75" />
          <ellipse cx="100" cy="100" rx="55" ry="75" />
          <line x1="25" y1="100" x2="175" y2="100" />
          <line x1="100" y1="25" x2="100" y2="175" />
        </g>
      )}
      {kind === "chart" && (
        <g {...common}>
          {/* Ascending chart — Quantela / growth */}
          <line x1="25" y1="170" x2="180" y2="170" />
          <line x1="25" y1="30" x2="25" y2="170" />
          <polyline points="30,150 55,130 80,135 105,95 130,85 160,45" />
          <circle cx="30" cy="150" r="3" {...dotFill} />
          <circle cx="55" cy="130" r="3" {...dotFill} />
          <circle cx="80" cy="135" r="3" {...dotFill} />
          <circle cx="105" cy="95" r="3" {...dotFill} />
          <circle cx="130" cy="85" r="3" {...dotFill} />
          <circle cx="160" cy="45" r="4" {...dotFill} />
          {/* dashed trendline */}
          <line x1="30" y1="155" x2="175" y2="40" strokeDasharray="4 4" opacity={0.6} />
        </g>
      )}
      {kind === "constellation" && (
        <g {...common}>
          {/* Scattered nodes with links — Verax ventures */}
          <line x1="40" y1="50" x2="90" y2="90" />
          <line x1="90" y1="90" x2="150" y2="60" />
          <line x1="90" y1="90" x2="60" y2="150" />
          <line x1="90" y1="90" x2="160" y2="140" />
          <line x1="150" y1="60" x2="160" y2="140" />
          <line x1="60" y1="150" x2="120" y2="170" />
          <line x1="160" y1="140" x2="120" y2="170" />
          {[[40, 50, 3], [90, 90, 5], [150, 60, 3], [60, 150, 3], [160, 140, 4], [120, 170, 3], [180, 30, 2]].map(
            ([x, y, r], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={r + 4} opacity={0.4} />
                <circle cx={x} cy={y} r={r} {...dotFill} />
              </g>
            )
          )}
        </g>
      )}
      {kind === "shield" && (
        <g {...common}>
          {/* Crosshair grid — MoD / defence */}
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="20" />
          <line x1="100" y1="10" x2="100" y2="190" />
          <line x1="10" y1="100" x2="190" y2="100" />
          <line x1="36" y1="36" x2="164" y2="164" strokeDasharray="3 5" opacity={0.6} />
          <line x1="164" y1="36" x2="36" y2="164" strokeDasharray="3 5" opacity={0.6} />
          <circle cx="100" cy="100" r="3" {...dotFill} />
        </g>
      )}
      {kind === "grid" && (
        <g {...common}>
          {/* Plot grid with tick marks — generic data */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={20 + i * 20} y1="20" x2={20 + i * 20} y2="180" opacity={i % 2 === 0 ? 0.7 : 0.3} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="20" y1={20 + i * 20} x2="180" y2={20 + i * 20} opacity={i % 2 === 0 ? 0.7 : 0.3} />
          ))}
        </g>
      )}
    </svg>
  );
}

// ---------------- Floating bubbles — page-wide ambient motion layer ----------------
// Fixed-position translucent orbs drifting across the whole viewport. Positioned
// behind content (z-index handled by parent) but above the aurora. Respects
// prefers-reduced-motion.
export function FloatingBubbles() {
  const reduce = useReducedMotion();
  // 12 bubbles across emerald/violet/cyan palette, varied sizes and drift speeds.
  const bubbles = [
    { size: 420, top: "8%", left: "6%", color: TOKENS.emerald, dur: 28, delay: 0, dx: 80, dy: 60 },
    { size: 320, top: "22%", left: "78%", color: TOKENS.violet, dur: 32, delay: 2, dx: -90, dy: 70 },
    { size: 260, top: "42%", left: "22%", color: TOKENS.cyan, dur: 26, delay: 4, dx: 100, dy: -50 },
    { size: 380, top: "56%", left: "68%", color: TOKENS.emerald, dur: 34, delay: 1, dx: -70, dy: -80 },
    { size: 220, top: "72%", left: "12%", color: TOKENS.violet, dur: 30, delay: 3, dx: 110, dy: 40 },
    { size: 340, top: "84%", left: "74%", color: TOKENS.cyan, dur: 36, delay: 5, dx: -80, dy: -60 },
    { size: 180, top: "14%", left: "48%", color: TOKENS.amber, dur: 24, delay: 2.5, dx: 60, dy: 90 },
    { size: 280, top: "36%", left: "88%", color: TOKENS.emerald, dur: 30, delay: 0.5, dx: -120, dy: 50 },
    { size: 200, top: "62%", left: "42%", color: TOKENS.cyan, dur: 28, delay: 6, dx: 90, dy: -70 },
    { size: 300, top: "90%", left: "32%", color: TOKENS.violet, dur: 32, delay: 4.5, dx: -60, dy: -90 },
    { size: 160, top: "4%", left: "86%", color: TOKENS.emerald, dur: 22, delay: 1.5, dx: -100, dy: 80 },
    { size: 240, top: "48%", left: "54%", color: TOKENS.violet, dur: 34, delay: 3.5, dx: 70, dy: -40 },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle at 40% 40%, ${b.color}44 0%, ${b.color}18 40%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={
            reduce
              ? {}
              : {
                  x: [0, b.dx, 0],
                  y: [0, b.dy, 0],
                  scale: [1, 1.12, 1],
                  opacity: [0.55, 0.85, 0.55],
                }
          }
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ---------------- Section divider — full-bleed technical data-stream ----------------
// Full-width animated strip: scanning vertical bar, multiple traveling packets,
// flickering code-rain column labels, pulsing baseline. Visually loud, tight vertical
// footprint so it reads as a TRANSITION between sections rather than empty space.
export function SectionDivider({
  from,
  to,
  tag = "TRANSITION",
  accent = TOKENS.emerald,
}: {
  from?: string;
  to?: string;
  tag?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full"
      style={{
        height: "110px",
        // Soft edge-masked strip — no hard borders, fades into surrounding space
        maskImage:
          "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
      }}
    >
      {/* Floating orbs — slow, flowing bubble drift with organic sine-wave y
          motion. Uses easeInOut so speed varies naturally across the traverse
          instead of the constant-speed linear look. */}
      {!reduce && inView &&
        Array.from({ length: 28 }).map((_, i) => {
          const size = 5 + ((i * 7) % 18); // 5–22 px
          const baseY = 12 + ((i * 13) % 70); // 12–82 % vertical
          const dur = 14 + ((i * 3) % 8) * 1.1; // 14–22s — much slower
          const delay = (i * 0.6) % 14;
          const amp = 18 + ((i * 5) % 22); // vertical wave amplitude
          const peak = 0.5 + ((i % 5) * 0.08);
          // Sine-wave y keyframes — a few oscillations across the traverse so
          // orbs bob gently up/down as they drift across.
          const y = [0, -amp * 0.7, amp * 0.5, -amp, amp * 0.6, 0];
          return (
            <motion.span
              key={`orb-${i}`}
              initial={{ left: "-8%", y: 0, opacity: 0, scale: 0.7 }}
              animate={{
                left: "108%",
                y,
                opacity: [0, peak * 0.6, peak, peak, peak * 0.7, 0],
                scale: [0.7, 1, 1.08, 1.04, 0.95, 0.7],
              }}
              transition={{
                duration: dur,
                ease: [0.42, 0, 0.58, 1], // easeInOut cubic — speeds up mid, slows at edges
                delay,
                repeat: Infinity,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              }}
              className="pointer-events-none absolute rounded-full"
              style={{
                top: `${baseY}%`,
                width: size,
                height: size,
                background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${accent} 45%, ${accent}00 75%)`,
                boxShadow: `0 0 ${size}px ${accent}, 0 0 ${size * 2}px ${accent}66, 0 0 ${size * 3}px ${accent}33`,
                filter: "blur(0.4px)",
              }}
            />
          );
        })}

      {/* Centered coordinate pill — bolder, more visible callout */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 4 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-flex items-center gap-3 rounded-full border px-5 py-2.5 backdrop-blur-xl"
          style={{
            borderColor: `${accent}80`,
            background: `linear-gradient(180deg, ${accent}22 0%, ${accent}10 100%), rgba(10,10,10,0.75)`,
            boxShadow: `0 0 0 1px ${accent}25, 0 0 32px ${accent}55, 0 0 64px ${accent}22, inset 0 1px 0 ${accent}44`,
          }}
        >
          {/* Leading pulse dot */}
          <span className="relative inline-flex h-2 w-2 items-center justify-center">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
            />
            {!reduce && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: accent }}
                animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </span>
          {/* Text — uppercase, bold, clearly legible */}
          <span
            className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em]"
            style={{
              color: "#ffffff",
              textShadow: `0 0 12px ${accent}, 0 0 2px ${accent}`,
            }}
          >
            {from ? <span style={{ color: `${accent}` }}>{from}</span> : null}
            <span className="mx-2" style={{ color: accent }}>→</span>
            {to ? <span style={{ color: "#ffffff" }}>{to}</span> : null}
          </span>
          {/* Trailing tag chip */}
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.22em]"
            style={{
              color: accent,
              background: `${accent}1a`,
              border: `1px solid ${accent}55`,
            }}
          >
            {tag}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ---------------- Useful scroll progress helper ----------------
export function usePageScroll() {
  const { scrollY, scrollYProgress } = useScroll();
  return { scrollY, scrollYProgress };
}

// Re-export for convenience
export { motion, useReducedMotion, useScroll, useTransform };
