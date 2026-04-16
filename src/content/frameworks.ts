export type Framework = {
  number: string;
  title: string;
  subtitle: string;
  accent: string;
  constructs: string[];
  deployment: string;
  stat?: { value: string; label: string };
  image?: string;
  imageAlt?: string;
};

export const frameworks: Framework[] = [
  {
    number: "01",
    title: "Smart Services Advisory",
    subtitle: "The HOW — designing citizen & tenant services that deliver.",
    accent: "#C8532C",
    constructs: [
      "3-Layer model: Sense → Analyse → Act",
      "6-stage pathway: Discovery → Execute",
      "7-domain taxonomy across the city stack",
      "21-measure Impact-vs-Feasibility scoring",
    ],
    deployment:
      "150+ smart services mapped and 40+ smart-city initiatives delivered end-to-end — DMCC Uptown Dubai, NEOM, Red Sea Global.",
    stat: { value: "40+", label: "services scored at DMCC" },
    image: "/images/fw-smart-services.jpg",
    imageAlt: "Smart Services Advisory framework topper",
  },
  {
    number: "02",
    title: "Innovation Ecosystem Advisory",
    subtitle: "The WHAT — a pipeline from idea to procurement-ready demand.",
    accent: "#0A2540",
    constructs: [
      "8-Pillar ecosystem model",
      "7-stage Innovation Funnel: idea → ROI",
      "Dual demand & supply scoring",
      "85% implementation · 14-mo payback",
    ],
    deployment:
      "8 Living Labs delivered, 85+ pilots landed — Strive Services Group KSA demand pipeline mirrors NEOM's board.",
    stat: { value: "3–4%", label: "pipeline-to-procurement conversion" },
    image: "/images/fw-innovation-ecosystem.jpg",
    imageAlt: "Innovation Ecosystem Advisory framework topper",
  },
  {
    number: "03",
    title: "Smart City Operations Advisory",
    subtitle: "The RUN — the engine that keeps services live at giga-scale.",
    accent: "#4A7C59",
    constructs: [
      "TOM, NOC/SOC & 24/7 ops design",
      "60+ SOP library (ITIL v3 aligned)",
      "AI-augmented ops — 40% manual reduction",
      "Northbound apps: CCC, citizen, dashboards",
    ],
    deployment:
      "NEOM: 99.9% uptime. FCO: 99.8% SLA across 242 sites, 150+ countries.",
    stat: { value: "99.9%", label: "uptime at NEOM" },
    image: "/images/fw-operations.jpg",
    imageAlt: "Smart City Operations Advisory framework topper",
  },
  {
    number: "04",
    title: "Value Realisation Office (VRO)",
    subtitle: "The KEEP DELIVERING — outcomes governance, not delivery governance.",
    accent: "#8B5A3C",
    constructs: [
      "VRO ≠ PMO — governs outcomes, not delivery",
      "3 Operating Modes · 3 Workstreams · 5 Outputs",
      "Buyer-owned, anchored to the Command Centre",
      "Closes the Phase-2 ROI gap permanently",
    ],
    deployment:
      "NEOM innovation board, Quantela commercial model, Cisco global practice.",
    image: "/images/fw-vro.jpg",
    imageAlt: "Value Realisation Office framework topper",
  },
];

export const frameworkLoop = {
  headline: "How they combine",
  body: "Ecosystem Advisory (WHAT) feeds Smart Services Advisory (HOW), which hands to Operations Advisory (RUN), which is governed end-to-end by the VRO (KEEP DELIVERING). The VRO then feeds new ideation back into the Ecosystem funnel — a closed loop.",
};
