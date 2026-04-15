"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import type { Framework } from "@/content/frameworks";

export function FrameworkCard({ fw, index }: { fw: Framework; index: number }) {
  // Compact vertical card — banner on top, tight content below.
  // Only the first 4-5 constructs surface; rest stay in data for the master CV.
  const topConstructs = fw.constructs.slice(0, 4);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: "easeOut" }}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-22px_rgba(17,17,17,0.14)] ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(0,0,0,0.05),0_28px_52px_-18px_rgba(17,17,17,0.22)]"
    >
      {/* Accent left bar */}
      <span
        aria-hidden
        className="absolute left-0 top-0 z-20 h-full w-[3px]"
        style={{ backgroundColor: fw.accent }}
      />

      {/* Banner — vertical portrait aspect for a 4-col layout */}
      {fw.image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={fw.image}
            alt={fw.imageAlt ?? `${fw.title} banner`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white"
          />
          <div className="pointer-events-none absolute inset-0 z-10">
            <GrainOverlay opacity={0.04} blendMode="overlay" />
          </div>
          <span
            aria-hidden
            className="absolute left-4 top-4 z-20 font-mono text-[10px] tracking-[0.2em]"
            style={{ color: fw.accent }}
          >
            FW · {String(fw.number).padStart(2, "0")}
          </span>
        </div>
      ) : null}

      {/* Content — tight, with fixed row heights so cards align horizontally */}
      <div className="relative flex flex-1 flex-col px-5 pb-6 pt-4 md:px-6">
        {/* Title block — fixed min-height for ~2 lines */}
        <div className="min-h-[4.5rem]">
          <h3 className="font-display text-[1.2rem] leading-tight text-ink md:text-[1.35rem] line-clamp-2">
            {fw.title}
          </h3>
          <p className="mt-1 text-xs text-muted md:text-[13px] line-clamp-2">
            {fw.subtitle}
          </p>
        </div>

        {/* Accent divider */}
        <span
          aria-hidden
          className="mt-3 h-px w-8"
          style={{ backgroundColor: fw.accent }}
        />

        {/* Constructs block — fixed height for 4 items */}
        <ul className="mt-3 space-y-1.5 min-h-[7.5rem]">
          {topConstructs.map((c) => (
            <li
              key={c}
              className="flex gap-2 text-[12.5px] leading-[1.4] text-ink/80"
            >
              <span
                aria-hidden
                className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full"
                style={{ backgroundColor: fw.accent }}
              />
              <span className="line-clamp-1">{c}</span>
            </li>
          ))}
        </ul>

        {/* Footer — deployment + stat, anchored to bottom */}
        <div className="mt-auto pt-5">
          <div
            className="label-caps mb-2 text-[10px]"
            style={{ color: `${fw.accent}CC` }}
          >
            Live Deployment
          </div>
          <p className="min-h-[3.5rem] text-[12px] leading-snug text-ink/90 line-clamp-3">
            {fw.deployment}
          </p>
          {fw.stat ? (
            <div
              className="mt-4 flex h-[2.75rem] items-center gap-2 border-t pt-3"
              style={{ borderColor: `${fw.accent}22` }}
            >
              <span
                className="font-mono text-lg font-medium"
                style={{ color: fw.accent }}
              >
                {fw.stat.value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55">
                {fw.stat.label}
              </span>
            </div>
          ) : (
            <div className="mt-4 h-[2.75rem]" />
          )}
        </div>
      </div>
    </motion.article>
  );
}
