"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  number: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
};

export function SectionHeader({ number, kicker, title, lede }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14 max-w-3xl"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-accent">{number}</span>
        <span className="h-px w-12 bg-hairline" />
        <span className="label-caps">{kicker}</span>
      </div>
      <h2 className="font-display mt-5 text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
      ) : null}
    </motion.header>
  );
}
