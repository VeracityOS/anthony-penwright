type Props = {
  className?: string;
  colors?: string[];
  opacity?: number;
};

/**
 * Soft gradient "aurora" blob. Blurred, low-opacity, used behind hero
 * and section dividers for warmth. SSR-safe (pure CSS).
 */
export function AuroraBlob({
  className = "",
  colors = ["#FFE8E0", "#EDE7F6", "#E4F1EA"],
  opacity = 0.55,
}: Props) {
  const gradient = `radial-gradient(closest-side, ${colors[0]}, transparent 70%),
                    radial-gradient(closest-side, ${colors[1]} 10%, transparent 70%),
                    radial-gradient(closest-side, ${colors[2]} 10%, transparent 70%)`;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute blur-3xl ${className}`}
      style={{
        background: gradient,
        backgroundPosition: "20% 30%, 70% 40%, 50% 80%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "60% 60%, 55% 55%, 50% 50%",
        opacity,
      }}
    />
  );
}
