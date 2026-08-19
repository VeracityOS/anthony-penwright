import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOKENS } from "@/components/v2/v2-primitives";
import { posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.claim} — Anthony Penwright`,
    description: post.body.split("\n\n")[1]?.slice(0, 160) ?? post.claim,
    openGraph: {
      title: post.claim,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [post.image] : undefined,
    },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main
      className="min-h-screen px-6 py-24 md:px-10"
      style={{ background: TOKENS.canvas, color: TOKENS.ink }}
    >
      <article className="mx-auto max-w-[42rem]">
        <Link
          href="/writing"
          className="text-[12px] tracking-[0.14em] uppercase"
          style={{ color: TOKENS.inkFaint }}
        >
          ← Writing
        </Link>

        <div className="mt-10 flex items-baseline gap-4">
          <span
            className="font-mono text-[11px] tracking-[0.1em] uppercase"
            style={{ color: TOKENS.inkGhost }}
          >
            {fmt(post.date)}
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.1em] uppercase"
            style={{ color: TOKENS.violet }}
          >
            {post.shape}
          </span>
        </div>

        <h1
          className="mt-4 font-[700] leading-[1.15] tracking-[-0.025em]"
          style={{ fontSize: "clamp(27px, 3.6vw, 40px)" }}
        >
          {post.claim}
        </h1>

        {post.image && (
          <div
            className="relative mt-10 aspect-[1200/627] w-full overflow-hidden rounded-lg"
            style={{ border: `1px solid ${TOKENS.line}` }}
          >
            <Image src={post.image} alt={post.alt ?? ""} fill className="object-cover" priority />
          </div>
        )}

        <div className="mt-10 space-y-6">
          {post.body
            .split("\n\n")
            .slice(1)
            .map((para, i) => (
              <p key={i} className="text-[17px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
                {para}
              </p>
            ))}
        </div>

        {post.artifact && (
          <section
            className="mt-14 rounded-lg p-6"
            style={{ background: TOKENS.glass, border: `1px solid ${TOKENS.line}` }}
          >
            <p
              className="font-mono text-[11px] tracking-[0.14em] uppercase"
              style={{ color: TOKENS.emerald }}
            >
              Check it yourself
            </p>
            <p className="mt-3 text-[15px] leading-[1.6]">{post.artifact.label}</p>
            {post.artifact.command && (
              <pre
                className="mt-4 overflow-x-auto rounded p-4 font-mono text-[13px] leading-[1.6]"
                style={{ background: TOKENS.canvasDeep, color: TOKENS.inkDim }}
              >
                {post.artifact.command}
              </pre>
            )}
            {post.artifact.href && (
              <a
                href={post.artifact.href}
                className="mt-4 inline-block text-[14px] underline underline-offset-4"
                style={{ color: TOKENS.cyan }}
              >
                {post.artifact.href}
              </a>
            )}
          </section>
        )}

        {post.linkedin && (
          <p className="mt-10 text-[14px]" style={{ color: TOKENS.inkFaint }}>
            Discussion on{" "}
            <a
              href={post.linkedin}
              className="underline underline-offset-4"
              style={{ color: TOKENS.inkDim }}
            >
              LinkedIn
            </a>
            .
          </p>
        )}
      </article>
    </main>
  );
}
