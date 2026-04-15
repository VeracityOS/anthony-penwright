import Image from "next/image";
import { GrainOverlay } from "@/components/ui/grain-overlay";

type Props = {
  src: string;
  alt?: string;
  /** 0–1, default 0.55 */
  opacity?: number;
};

/**
 * Photographic page-section backdrop with canvas scrim + film grain.
 * Sits behind section content via `-z-10`. The host section needs
 * `relative isolate overflow-hidden` for proper stacking.
 */
export function SectionBackground({ src, alt = "", opacity = 0.55 }: Props) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ opacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/10 to-canvas" />
      <GrainOverlay opacity={0.04} blendMode="overlay" />
    </div>
  );
}
