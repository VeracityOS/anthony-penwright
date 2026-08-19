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
  body: string;           // paragraphs split on blank lines
  artifact?: {            // the thing a reader can independently check
    label: string;
    href?: string;
    command?: string;
  };
  linkedin?: string;      // permalink once published
  image?: string;
  alt?: string;
};

const aifPublished = [
  "Every actor in software has an identity. Except the autonomous agents we are about to give production access to.",
  "Your engineers have credentials that expire. Your contractors have accounts you can revoke on their last day. Your service accounts have owners, scopes and an audit trail. Then an agent arrives with a standing API key, permissions nobody scoped, no bill of materials for what it is built from, and no way to switch it off short of rotating a secret and hoping.",
  "I have published the Agent Identity Framework to fix that. It is an open specification, 57 pages, licensed CC-BY-SA 4.0, and free.",
  "Five layers, each answering one question a regulator will eventually ask you. Identity: what is this agent, and who stands behind it? Policy: what is it allowed to do, right now, rather than in general? Enforcement: who checks before it acts, not after? Evidence: can you reconstruct exactly what it did? Trust Surface: how do agents from different organisations transact at all?",
  "The published version is the signed v0.1. It carries a SHA-256 hash and an OpenTimestamps proof anchored to Bitcoin block 963164, both published alongside the document.",
  "That matters more than it sounds. It means you do not have to trust me about when this was written, or whether the copy you are holding is the one I published.",
  "A specification about proving things ought to be provable itself.",
  "It is offered openly. Adopt it, argue with it, improve it. A standard is worth exactly what its adoption is worth.",
].join("\n\n");

export const posts: Post[] = [
  {
    slug: "agent-identity-framework-published",
    claim:
      "Every actor in software has an identity. Except the autonomous agents we are about to give production access to.",
    date: "2026-08-19",
    shape: "demonstration",
    channel: "personal",
    image: "/writing-aif-published.png",
    alt: "An old hotel key board of numbered brass fobs, with one key hanging on its hook carrying no tag at all.",
    linkedin:
      "https://www.linkedin.com/feed/update/urn:li:share:7495827298882027521/",
    artifact: {
      label:
        "Download the specification, hash it, and check it against the published value. Anchored in Bitcoin block 963164.",
      href: "/agent-identity",
      command: "sha256sum agent-identity-framework-v0.1-signed.pdf",
    },
    body: aifPublished,
  },
];
