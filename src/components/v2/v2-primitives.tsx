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
      className={`uppercase tracking-[0.22em] text-[10.5px] ${className}`}
      style={{
        fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ---------------- Kbd key (command-palette style) ----------------
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[5px] border border-white/15 bg-white/[0.05] px-1.5 text-[10px] font-medium text-white/75 shadow-[inset_0_-1px_0_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.1)]"
      style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
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
  size = "clamp(44px, 7.5vw, 128px)",
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

// ---------------- Useful scroll progress helper ----------------
export function usePageScroll() {
  const { scrollY, scrollYProgress } = useScroll();
  return { scrollY, scrollYProgress };
}

// Re-export for convenience
export { motion, useReducedMotion, useScroll, useTransform };
