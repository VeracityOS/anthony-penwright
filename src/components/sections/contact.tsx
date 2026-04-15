"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownToLine, Linkedin, Mail, Phone } from "lucide-react";
import { AuroraBlob } from "@/components/ui/aurora-blob";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.15]">
          <Image
            src="/images/contact-architecture.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Strong canvas scrim — keeps the headline crisp regardless of image tonality */}
        <div className="absolute inset-0 bg-canvas/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/60 to-canvas" />
      </div>
      <AuroraBlob
        className="bottom-0 left-1/2 h-[700px] w-[1200px] -translate-x-1/2"
        opacity={0.55}
      />
      <div className="relative z-10 mx-auto max-w-container px-6 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="label-caps">08 · Contact</div>
          <h2 className="font-display mt-6 text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
            Let&apos;s build something that delivers.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Open to board, advisory, and programme leadership mandates — GCC, UK, LATAM.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition hover:bg-accent"
            >
              <Mail size={16} /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:border-ink hover:bg-white"
            >
              <Phone size={16} /> {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:border-ink hover:bg-white"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={profile.cvUrl}
              className="inline-flex items-center gap-2 rounded-full border border-accent/60 px-6 py-3 text-sm font-medium text-accent transition hover:bg-accent hover:text-canvas"
            >
              <ArrowDownToLine size={16} /> Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
