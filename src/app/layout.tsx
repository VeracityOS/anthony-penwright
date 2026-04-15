import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
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

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anthony Penwright — People · Business · Technology · Innovation · Leadership",
  description:
    "Managing Director–level leader codifying 20+ years of global smart-city and digital-infrastructure delivery into frameworks that work. £1BN+ programmes delivered.",
  metadataBase: new URL("https://anthony-penwright.vercel.app"),
  openGraph: {
    title: "Anthony Penwright",
    description:
      "£1BN+ programme value delivered. 40+ smart city projects. Four proprietary advisory frameworks. Riyadh, KSA.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Penwright",
    description: "£1BN+ delivered. Smart cities, innovation, digital infrastructure.",
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
