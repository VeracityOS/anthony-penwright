"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownToLine, Mail, MapPin } from "lucide-react";
import { AuroraBlob } from "@/components/ui/aurora-blob";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { profile } from "@/content/profile";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Gentle parallax: aurora drifts down ~80px and scales marginally as page scrolls past hero
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const auroraScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: auroraY, scale: auroraScale, willChange: "transform" }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <Image
          src="/images/hero-aurora.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.15]"
        />
        <GrainOverlay opacity={0.04} blendMode="overlay" />
      </motion.div>
      <AuroraBlob
        className="-top-40 left-1/2 h-[900px] w-[1400px] -translate-x-1/2"
        opacity={0.5}
      />
      <div className="mx-auto max-w-container px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-ink" />
          <span className="label-caps">Profile · 2026</span>
        </motion.div>

        <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-ink"
            >
              {profile.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-lg text-muted md:text-xl"
            >
              {profile.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="font-display mt-8 max-w-2xl text-2xl leading-snug text-ink md:text-[1.75rem]"
            >
              {profile.pitch}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href={profile.cvUrl}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition hover:bg-accent"
              >
                <ArrowDownToLine size={16} /> Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:border-ink hover:bg-white"
              >
                <Mail size={16} /> Get in touch
              </a>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs text-muted ring-1 ring-black/5 backdrop-blur">
                <MapPin size={14} className="text-accent" />
                {profile.location}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="justify-self-start md:justify-self-end"
          >
            {/* TODO: drop hero photo into /public/anthony.jpg — it will render here automatically */}
            <div
              className="relative aspect-square w-64 overflow-hidden rounded-full ring-1 ring-black/10 md:w-[22rem]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 25%, #FFE8E0, #EDE7F6 50%, #E4F1EA)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/anthony.jpg"
                alt="Anthony Penwright"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl text-ink/20">AP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="mx-auto max-w-container px-6">
        <div className="h-px w-full bg-hairline" />
      </div>
    </section>
  );
}
