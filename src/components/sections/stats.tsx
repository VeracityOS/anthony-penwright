"use client";

import { motion } from "framer-motion";
import { stats } from "@/content/profile";

export function Stats() {
  return (
    <section className="relative bg-white/60">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      <div className="mx-auto max-w-container px-6 py-20 md:py-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="relative"
            >
              <div className="font-mono text-4xl font-medium tracking-tight text-ink md:text-5xl">
                {s.value}
              </div>
              <div className="label-caps mt-3">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-container px-6">
        <div className="h-px w-full bg-hairline" />
      </div>
    </section>
  );
}
