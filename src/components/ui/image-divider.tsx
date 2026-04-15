"use client";

import Image from "next/image";

type ImageDividerProps = {
  src: string;
  alt?: string;
  opacity?: number;
};

export function ImageDivider({
  src,
  alt = "",
  opacity = 0.35,
}: ImageDividerProps) {
  return (
    <div
      aria-hidden={alt === ""}
      className="relative mx-auto h-[120px] w-full max-w-[1800px] overflow-hidden md:h-[160px]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ opacity }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas via-transparent to-canvas" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  );
}
