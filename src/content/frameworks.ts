export type Framework = {
  number: string;
  title: string;
  subtitle: string;
  accent: string;
  constructs: string[];
  deployment: string;
  stat?: { value: string; label: string };
};

export const frameworks: Framework[] = [
  {
    number: "01",
    title: "Smart Services Advisory",
    subtitle: "The HOW — designing citizen & tenant services that deliver.",
    accent: "#C8532C",
    constructs: [
      "3-Layer service definition: Sense → Analyse → Act",
      "6-stage pathway: Discovery → Identification → Prioritisation → Design → Procure → Execute",
      "7-domain taxonomy: People & Welcome, Smart Energy, Smart Water, Smart Environment, Robotics, Vision AI & Safety, Smart Facilities",
      "21-measure scoring → Impact-vs-Feasibility quadrant",
      "8 delivered outputs: Service Catalogue, Architecture Blueprint, Living Lab Plan, Test Framework, TOM, Business Model, RFP Pack, Governance + KPIs",
    ],
    deployment:
      "DMCC Uptown Dubai — 40+ services scored, procurement-ready portfolio. Also applied at NEOM & Red Sea Global across 40+ deployments.",
    stat: { value: "40+", label: "services scored at DMCC" },
  },
  {
    number: "02",
    title: "Innovation Ecosystem Advisory",
    subtitle: "The WHAT — a pipeline from idea to procurement-ready demand.",
    accent: "#0A2540",
    constructs: [
      "8-Pillar model: Vision & Strategic Alignment, R&A, Investment & Funding, Demand Side, Supply Side, Government Programmes, Talent & Skills, Enablers",
      "7-stage Innovation Funnel: Submission → Screening → Demand Scoring → Supply-Demand Match → Governance → Procurement → ROI Tracking",
      "Dual scoring — Demand (5 categories × 26 measures) and Supply (5 categories)",
      "Fit ≥80% = Fast-track to procurement",
      "Benchmarks: ~85% implementation success; 100%+ ROI over 3 years; ~14-month payback",
    ],
    deployment:
      "Strive Services Group KSA — smart-FM demand pipeline. Governance framework mirrors NEOM's innovation board.",
    stat: { value: "3–4%", label: "pipeline-to-procurement conversion" },
  },
  {
    number: "03",
    title: "Smart City Operations Advisory",
    subtitle: "The RUN — the engine that keeps services live at giga-scale.",
    accent: "#4A7C59",
    constructs: [
      "Operations Design & Restructure — Target Operating Model, NOC/SOC, 24/7 ops",
      "Standard Operating Procedures — ITIL v3 aligned (60+ SOPs delivered at NEOM)",
      "Automation & AI-Augmented Ops — 40% manual effort reduction",
      "Northbound App DevOps — Command & Control Centres, citizen apps, executive dashboards",
    ],
    deployment:
      "NEOM: 99.9% uptime across critical services. FCO: 99.8% SLA across 242 sites and 150+ countries.",
    stat: { value: "99.9%", label: "uptime at NEOM" },
  },
  {
    number: "04",
    title: "Value Realisation Office (VRO)",
    subtitle: "The KEEP DELIVERING — outcomes governance, not delivery governance.",
    accent: "#8B5A3C",
    constructs: [
      "VRO ≠ PMO — PMO governs delivery; VRO governs outcomes & ROI",
      "3 Parallel Operating Modes: Value Realisation, Operational Excellence, Adaptive/Evolving",
      "3 Permanent Workstreams: Service Portfolio & Business Model, Technology Blueprint, Operating Model",
      "3 Strategic Imperatives: Stakeholder Requirements, Alignment, CEO-level Goals",
      "5 Standing Outputs: Innovation Stimulus, 12-month Roadmap, Risk Register, 3-year Investments Forecast, PoC Pipeline",
    ],
    deployment:
      "Deployed at NEOM's innovation governance board, Quantela's outcome-based commercial model, and Cisco's global Smart City practice.",
  },
];

export const frameworkLoop = {
  headline: "How they combine",
  body: "Ecosystem Advisory (WHAT) feeds Smart Services Advisory (HOW), which hands to Operations Advisory (RUN), which is governed end-to-end by the VRO (KEEP DELIVERING). The VRO then feeds new ideation back into the Ecosystem funnel — a closed loop.",
};
