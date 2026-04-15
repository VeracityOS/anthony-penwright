"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { signatureMoments } from "@/content/profile";

// Map organisation → editorial background image.
// Quantela intentionally left text-only to preserve visual rhythm.
const momentImages: Record<string, { src: string; alt: string } | undefined> = {
  "Verax Venture Studio": {
    src: "/images/fw-innovation-ecosystem.jpg",
    alt: "Verax Venture Studio editorial backdrop",
  },
  NEOM: {
    src: "/images/moment-neom.jpg",
    alt: "NEOM editorial backdrop",
  },
  Cisco: {
    src: "/images/moment-cisco.jpg",
    alt: "Cisco Smart City editorial backdrop",
  },
  FCO: {
    src: "/images/moment-fco.jpg",
    alt: "FCO strategic operations editorial backdrop",
  },
  MoD: {
    src: "/images/moment-fco.jpg",
    alt: "MoD DII(F) editorial backdrop",
  },
};

export function SignatureMoments() {
  return (
    <section className="mx-auto max-w-container px-6 py-24 md:py-32">
      <SectionHeader
        number="04"
        kicker="Signature Career Moments"
        title={<>Seven programmes that shaped the playbook.</>}
      />
      <div className="grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
        {signatureMoments.map((m, i) => {
          // Asymmetric grid climaxing with a full-width MoD card across the bottom.
          // Row 1: 4+2 · Row 2: 2+4 · Row 3: 3+3 · Row 4: 6 (full bleed)
          const spans = [
            "md:col-span-4",
            "md:col-span-2",
            "md:col-span-2",
            "md:col-span-4",
            "md:col-span-3",
            "md:col-span-3",
            "md:col-span-6",
          ];
          const image = momentImages[m.org];
          const hasImage = Boolean(image);
          const isQuantela = m.org === "Quantela";
          // Magazine-plate numbering (01..06) for imaged cards only
          const plateNumber = String(i + 1).padStart(2, "0");
          return (
            <motion.article
              key={`${m.org}-${m.role}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className={`${spans[i]} group relative isolate flex min-h-[260px] flex-col overflow-hidden rounded-2xl p-8 transition ${
                hasImage
                  ? "text-white ring-1 ring-black/5 hover:ring-ink/20"
                  : isQuantela
                    ? "ring-1 ring-[#C8532C]/40 hover:ring-[#C8532C]/70"
                    : "bg-white ring-1 ring-black/5 hover:ring-ink/20"
              }`}
              style={
                isQuantela
                  ? {
                      backgroundImage:
                        "linear-gradient(135deg, #FDF6F1 0%, #FBEDE3 55%, #F7E0D0 100%)",
                    }
                  : undefined
              }
            >
              {hasImage && image ? (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="absolute inset-0 z-0 object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-[#0A2540]/90 via-[#0A2540]/55 to-transparent"
                  />
                  {/* Film grain — ~3%, keeps editorial texture, hides AI smoothness */}
                  <div className="pointer-events-none absolute inset-0 z-20">
                    <GrainOverlay opacity={0.05} blendMode="overlay" />
                  </div>
                  {/* Magazine-plate watermark number, top-right */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-6 top-6 z-30 font-mono text-[11px] tracking-[0.2em] text-white/60"
                  >
                    {plateNumber}
                  </span>
                </>
              ) : null}

              {isQuantela ? (
                <>
                  {/* Oversized stat watermark — "$90M" at ~8% opacity behind text */}
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -right-2 bottom-0 select-none text-[9rem] leading-none tracking-tight text-[#C8532C] opacity-[0.08] md:text-[12rem]"
                  >
                    $90M
                  </span>
                  {/* Hairline inner frame */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-[#C8532C]/25"
                  />
                  {/* Plate number in the warm accent */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-6 top-6 font-mono text-[11px] tracking-[0.2em] text-[#C8532C]/70"
                  >
                    {plateNumber}
                  </span>
                </>
              ) : null}

              <div className="relative z-30 flex items-baseline justify-between gap-4">
                <span
                  className={`label-caps ${
                    hasImage
                      ? "text-white/80"
                      : isQuantela
                        ? "text-[#C8532C]"
                        : ""
                  }`}
                >
                  {m.org}
                </span>
                <span
                  className={`font-mono text-xs ${
                    hasImage
                      ? "text-white/70"
                      : isQuantela
                        ? "text-[#8B4423]/70"
                        : "text-muted"
                  }`}
                >
                  {m.period}
                </span>
              </div>
              <h3
                className={`font-display relative z-30 mt-4 text-2xl leading-tight md:text-[1.65rem] ${
                  hasImage ? "text-white" : "text-ink"
                }`}
              >
                {m.role}
              </h3>
              <div
                className={`relative z-30 mt-3 font-mono text-xl ${
                  hasImage
                    ? "text-white"
                    : isQuantela
                      ? "text-[#C8532C]"
                      : "text-accent"
                }`}
              >
                {m.value}
              </div>
              <p
                className={`relative z-30 mt-4 text-sm leading-relaxed md:text-[15px] ${
                  hasImage
                    ? "text-white/85"
                    : isQuantela
                      ? "text-[#5C3824]"
                      : "text-muted"
                }`}
              >
                {m.note}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
