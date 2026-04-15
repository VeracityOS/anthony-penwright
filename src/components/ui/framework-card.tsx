"use client";

import { motion } from "framer-motion";
import type { Framework } from "@/content/frameworks";

export function FrameworkCard({ fw, index }: { fw: Framework; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-20px_rgba(17,17,17,0.12)] ring-1 ring-black/5 md:p-10"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: fw.accent }}
      />
      <div className="flex flex-wrap items-baseline gap-4">
        <span className="font-mono text-xs" style={{ color: fw.accent }}>
          Framework {fw.number}
        </span>
        {fw.stat ? (
          <span className="ml-auto hidden items-baseline gap-2 md:inline-flex">
            <span
              className="font-mono text-3xl font-medium"
              style={{ color: fw.accent }}
            >
              {fw.stat.value}
            </span>
            <span className="label-caps">{fw.stat.label}</span>
          </span>
        ) : null}
      </div>

      <h3 className="font-display mt-4 text-3xl leading-tight text-ink md:text-[2.25rem]">
        {fw.title}
      </h3>
      <p className="mt-2 max-w-2xl text-base text-muted md:text-lg">
        {fw.subtitle}
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="label-caps mb-4">Core Constructs</div>
          <ul className="space-y-3">
            {fw.constructs.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span
                  aria-hidden
                  className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ backgroundColor: fw.accent }}
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="label-caps mb-4">Live Deployment</div>
          <p className="pullquote font-display text-xl leading-snug text-ink">
            {fw.deployment}
          </p>
          {fw.stat ? (
            <div className="mt-6 md:hidden">
              <div
                className="font-mono text-3xl font-medium"
                style={{ color: fw.accent }}
              >
                {fw.stat.value}
              </div>
              <div className="label-caps mt-1">{fw.stat.label}</div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
