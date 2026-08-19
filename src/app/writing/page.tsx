import Link from "next/link";
import type { Metadata } from "next";
import { TOKENS } from "@/lib/tokens";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing — Anthony Penwright",
  description:
    "The operator's view of AI inside regulated institutions. Every piece carries something you can independently check.",
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function WritingIndex() {
  return (
    <main
      className="min-h-screen px-6 py-24 md:px-10"
      style={{ background: TOKENS.canvas, color: TOKENS.ink }}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-[12px] tracking-[0.14em] uppercase"
          style={{ color: TOKENS.inkFaint }}
        >
          ← Anthony Penwright
        </Link>

        <h1
          className="mt-10 font-[700] leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: "clamp(34px, 5vw, 56px)" }}
        >
          Writing
        </h1>

        <p className="mt-5 max-w-xl text-[16px] leading-[1.65]" style={{ color: TOKENS.inkDim }}>
          The operator&apos;s view of AI inside institutions that have auditors, procurement
          and a twenty-year-old estate. Every piece here carries an artifact —
          a hash, a command, a file — that you can check without taking my word for it.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 text-[15px]" style={{ color: TOKENS.inkFaint }}>
            Nothing published yet.
          </p>
        ) : (
          <ul className="mt-16 space-y-px">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/writing/${p.slug}`}
                  className="group block py-7 transition-colors"
                  style={{ borderTop: `1px solid ${TOKENS.line}` }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-mono text-[11px] tracking-[0.1em] uppercase"
                      style={{ color: TOKENS.inkGhost }}
                    >
                      {fmt(p.date)}
                    </span>
                    <span
                      className="font-mono text-[11px] tracking-[0.1em] uppercase"
                      style={{ color: TOKENS.violet }}
                    >
                      {p.shape}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-[19px] font-[600] leading-[1.35] tracking-[-0.01em] group-hover:opacity-70"
                    style={{ transition: "opacity 160ms" }}
                  >
                    {p.claim}
                  </p>
                  {p.artifact && (
                    <p className="mt-2 text-[13px]" style={{ color: TOKENS.inkFaint }}>
                      Check it: {p.artifact.label}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
