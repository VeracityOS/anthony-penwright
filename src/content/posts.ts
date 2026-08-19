// Published posts. This is the destination every LinkedIn post points at, and
// the reason "go and check" resolves to something rather than nothing.
//
// Written by content-engine on publish. Numbers here must already be resolved
// from the fact base — this file is the rendered output, not a source of truth.

export type Post = {
  slug: string;
  claim: string;          // the opening line, doubles as the title
  date: string;           // ISO
  shape: "reversal" | "demonstration" | "admission" | "pattern" | "decision";
  channel: "personal" | "veracity";
  body: string;           // markdown-ish; paragraphs split on blank lines
  artifact?: {            // the thing a reader can independently check
    label: string;
    href?: string;
    command?: string;
  };
  linkedin?: string;      // permalink once published
  image?: string;         // /writing/<slug>.png
  alt?: string;
};

export const posts: Post[] = [];
