"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionBackground } from "@/components/ui/section-background";
import { credentials } from "@/content/profile";

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <div className="label-caps">{heading}</div>
      <ul className="mt-5 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-ink">
            <span className="mt-[10px] h-[4px] w-[4px] shrink-0 rounded-full bg-accent" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Credentials() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <SectionBackground src="/images/credentials-bg.jpg" opacity={0.4} />
      <div className="mx-auto max-w-container px-6">
      <SectionHeader
        number="06"
        kicker="Standards & Credentials"
        title={<>Grounded in the standards that matter.</>}
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="grid gap-10 rounded-2xl bg-white p-8 ring-1 ring-black/5 md:grid-cols-2 md:p-12"
      >
        <List heading="Smart City & Infrastructure Standards" items={credentials.standards} />
        <List heading="Data, Security & Quality Standards" items={credentials.dataSecurity} />
        <List heading="Certifications" items={credentials.certifications} />
        <List heading="Education" items={credentials.education} />
        <div className="md:col-span-2">
          <div className="label-caps">Security Clearance</div>
          <p className="font-display mt-4 text-xl text-ink">{credentials.clearance}</p>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
