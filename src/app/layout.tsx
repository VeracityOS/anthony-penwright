import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anthony Penwright — People · Business · Technology · Innovation · Leadership",
  description:
    "Managing Director–level leader codifying 20+ years of global smart-city and digital-infrastructure delivery into frameworks that work. $1.3BN+ programmes delivered.",
  metadataBase: new URL("https://anthony-penwright.vercel.app"),
  openGraph: {
    title: "Anthony Penwright",
    description:
      "$1.3BN+ programme value delivered. 40+ smart city projects. Four proprietary advisory frameworks. Riyadh, KSA.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Penwright",
    description: "$1.3BN+ delivered. Smart cities, innovation, digital infrastructure.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
