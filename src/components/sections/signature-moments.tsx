"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { signatureMoments } from "@/content/profile";

export function SignatureMoments() {
  return (
    <section className="mx-auto max-w-container px-6 py-24 md:py-32">
      <SectionHeader
        number="04"
        kicker="Signature Career Moments"
        title={<>Six programmes that shaped the playbook.</>}
      />
      <div className="grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
        {signatureMoments.map((m, i) => {
          // Asymmetric grid: first card spans 4, next 2, then 2,4, then 3,3
          const spans = [
            "md:col-span-4",
            "md:col-span-2",
            "md:col-span-2",
            "md:col-span-4",
            "md:col-span-3",
            "md:col-span-3",
          ];
          return (
            <motion.article
              key={`${m.org}-${m.role}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className={`${spans[i]} group relative overflow-hidden rounded-2xl bg-white p-8 ring-1 ring-black/5 transition hover:ring-ink/20`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="label-caps">{m.org}</span>
                <span className="font-mono text-xs text-muted">{m.period}</span>
              </div>
              <h3 className="font-display mt-4 text-2xl leading-tight text-ink md:text-[1.65rem]">
                {m.role}
              </h3>
              <div className="mt-3 font-mono text-xl text-accent">{m.value}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">
                {m.note}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
