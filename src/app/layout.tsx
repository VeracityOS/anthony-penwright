import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { InsightTag } from "@/components/insight-tag";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Anthony Penwright — People · Business · Technology · Innovation · Leadership",
  description:
    "Managing Director–level leader codifying 23 years of global smart-city and digital-infrastructure delivery into frameworks that work. $1.3BN+ programmes delivered.",
  metadataBase: new URL("https://anthonypenwright.com"),
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
    <html lang="en" className={poppins.variable}>
      <body>{children}        <InsightTag />
      </body>
    </html>
  );
}
