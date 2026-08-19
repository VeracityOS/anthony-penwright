// Design tokens. Deliberately NOT a client module: server components need to
// read these, and Next.js forbids dotting into a client module's exports.
// v2-primitives re-exports this so existing imports keep working.
export const TOKENS = {
  canvas: "#0a0a0a",
  canvasDeep: "#050506",
  ink: "#f5f5f7",
  inkDim: "rgba(245,245,247,0.68)",
  inkFaint: "rgba(245,245,247,0.44)",
  inkGhost: "rgba(245,245,247,0.28)",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.14)",
  glass: "rgba(255,255,255,0.035)",
  glassHover: "rgba(255,255,255,0.06)",
  emerald: "#34d399",
  violet: "#a78bfa",
  cyan: "#22d3ee",
  amber: "#fbbf24",
  pink: "#f472b6",
};
