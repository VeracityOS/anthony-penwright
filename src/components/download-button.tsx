"use client";

// The whitepaper download, instrumented.
//
// A click is curiosity; a download is intent. This is the conversion the content
// thesis actually measures, so it is the one the campaign optimises for — not
// impressions, not landing-page views.

import { trackConversion } from "./insight-tag";

const CONVERSION_ID = process.env.NEXT_PUBLIC_LI_CONV_WHITEPAPER;

export function DownloadButton({
  href,
  children,
  style,
  className,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={() => trackConversion(CONVERSION_ID)}
    >
      {children}
    </a>
  );
}
