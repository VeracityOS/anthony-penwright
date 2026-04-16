"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import {
  AuroraBackground,
  FloatingBubbles,
  Mono,
  NoiseOverlay,
  StatusDot,
  TOKENS,
  usePageScroll,
} from "@/components/v2/v2-primitives";

// Shared shell for /v2/cap/* mockup pages. Keeps them visually identical to /v2
// (aurora, bubbles, noise, faint grid, floating top pill) while removing the
// real nav and adding a small back-to-index link.
export default function CapShell({ children }: { children: ReactNode }) {
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

      {/* Faint 12-col grid overlay — same as /v2 */}
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

      {/* Top-left back link + floating status pill, v2 style */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex items-center justify-between px-4 md:top-6 md:px-6">
        <Link
          href="/v2/cap"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11.5px] text-white/75 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px -10px rgba(0,0,0,0.5)",
          }}
        >
          <ArrowLeft className="h-3 w-3" />
          Back to mockups
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
            <Mono style={{ color: TOKENS.ink }}>AP · capabilities</Mono>
          </span>
        </div>
      </div>

      <div className="relative z-10 pt-24 md:pt-28">{children}</div>
    </main>
  );
}
