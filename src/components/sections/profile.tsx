"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { profile } from "@/content/profile";

export function Profile() {
  return (
    <section className="mx-auto max-w-container px-6 py-24 md:py-32">
      <SectionHeader
        number="01"
        kicker="Profile"
        title={<>A visionary leader in technology, business and transformation.</>}
      />
      <div className="grid gap-10 md:grid-cols-2">
        {profile.bio.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="text-lg leading-relaxed text-ink"
          >
            {p}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
