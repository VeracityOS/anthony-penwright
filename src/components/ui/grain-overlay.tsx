"use client";

/**
 * Editorial film-grain overlay.
 *
 * Uses an inline SVG fractalNoise turbulence filter encoded as a data URI
 * background-image — no network request, no PNG asset. Sits at ~3% opacity
 * so it's *felt* rather than seen. Use as an absolutely-positioned child
 * inside any relative container (image card, hero plate, etc.).
 */

const GRAIN_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
     <filter id='n'>
       <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
       <feColorMatrix type='matrix' values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.55 0'/>
     </filter>
     <rect width='100%' height='100%' filter='url(#n)'/>
   </svg>`,
);

export function GrainOverlay({
  opacity = 0.03,
  blendMode = "overlay",
  className = "",
}: {
  opacity?: number;
  blendMode?: "overlay" | "soft-light" | "multiply" | "screen";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${GRAIN_SVG}")`,
        backgroundSize: "240px 240px",
        opacity,
        mixBlendMode: blendMode,
      }}
    />
  );
}
