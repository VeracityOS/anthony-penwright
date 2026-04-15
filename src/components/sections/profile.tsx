"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionBackground } from "@/components/ui/section-background";
import { profile } from "@/content/profile";

export function Profile() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <SectionBackground src="/images/profile-bg.jpg" opacity={0.4} />
      <div className="mx-auto max-w-container px-6">
      <SectionHeader
        number="01"
        kicker="Profile"
        title={<>A visionary leader in technology, business and transformation.</>}
      />
      <div className="max-w-3xl space-y-6">
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
      </div>
    </section>
  );
}
