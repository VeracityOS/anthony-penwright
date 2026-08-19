# Whitepaper Protection — What's Done and What's Left

## What's already done (in this build)

1. **Title page** now carries an explicit copyright line:
   © 2026 Anthony Penwright / Verax Venture Studio.

2. **A new Notice page** (page 2 of the document) sets out:
   - Copyright and CC-BY-SA 4.0 licence terms in plain English
   - Your asserted trademarks (Verax, Verax Venture Studio, the four framework names, Verax Command Center, the Agent Identity Framework name itself, and the constructs Agent IdP / ABOM / Rulebooks)
   - Attribution requirements for anyone who quotes, summarises, or builds on the work
   - A first-publication-and-prior-art statement (this is the defensive publication clause — it means the techniques in this paper cannot subsequently be patented by anyone else)
   - Contact email

3. **SHA-256 hash of the published file** has been generated.

   > The hash is no longer written here. It changes every time the document is
   > edited, and a stale hash in prose is worse than none — see `VERIFY.md`,
   > which is the single source of truth for the current hash, its
   > OpenTimestamps proof, and the superseded versions in `archive/`.

This hash is the unique fingerprint of THIS exact version of the document.
If anyone later claims to have authored the work earlier than you, you point
to a dated public record of this hash and demonstrate that the file existed
on the date you posted it.

---

## What you need to do (5 minutes, all free)

### Step 1 — Post the hash publicly with a date stamp

The fastest way to establish unambiguous priority. Pick any one (or all) of:

**LinkedIn (recommended for your audience)** — copy/paste the post below into a
new LinkedIn post. The platform's timestamp on the post + the hash in the
post = a public dated record.

**Twitter/X** — same approach, shorter.

**A new GitHub repo** — create `verax-vs/agent-identity-framework`, commit
the .docx and the .sha256 file. Git commits are timestamped and tamper-evident.

You don't need to do all three; LinkedIn alone is enough.

### Step 2 — Run OpenTimestamps from your own machine (optional but strongest)

The sandbox I built this in can't reach the OpenTimestamps servers, so this
one's for you. Two commands on your laptop:

```bash
pip install opentimestamps-client
ots stamp agent-identity-framework-whitepaper.docx
```

This generates a file called `agent-identity-framework-whitepaper.docx.ots`.
That file is a cryptographic proof, anchored into the Bitcoin blockchain,
that the .docx with this exact hash existed at the time you ran the command.

It takes about 30 seconds to generate. The Bitcoin anchor takes a few hours
to complete in the background — once it has, you can verify any time with:

```bash
ots verify agent-identity-framework-whitepaper.docx.ots
```

Keep both files (the .docx and the .ots) together forever. Together they are
unforgeable proof of authorship date. This is what serious open-source
authors and academic preprint authors use to establish priority.

### Step 3 — Email the file to yourself

Belt-and-braces. Email the .docx as an attachment from one of your accounts
to another (or to yourself). Email server timestamps are legally recognised
contemporaneous records. Cost: zero, time: 30 seconds.

---

## Ready-to-post LinkedIn announcement

Copy from the line below. It's deliberately written in your voice — direct,
no jargon-puffery, framework-first.

---

After a long stretch of writing it up, I'm publishing v0.1 of The Agent
Identity Framework — an open specification for identity, access, audit,
compliance and behavioural defence of autonomous and semi-autonomous AI
agents.

The premise is simple: every other actor in software has identity. Users
have credentials. Services have certificates. Machines have workload
identities. Agents — generative, long-running, multi-hop, probabilistic —
have nothing of the kind, and the IAM patterns that work for the first
three categories don't survive contact with the fourth.

The framework decomposes into five sequentially adoptable layers — Identity,
Policy, Enforcement, Evidence, Trust Surface — and 14 sections covering the
agent lifecycle, the Agent Bill of Materials, capability-based authorisation
with just-in-time elevation, the policy enforcement plane, hash-chained
audit with deterministic replay, the rulebook construct, federation and
agent-to-agent operation across organisational boundaries.

It's offered openly. Specification under CC-BY-SA 4.0. Reference
implementations under Apache 2.0. Stewardship rests with Verax Venture
Studio for the 0.x series, with a defined path to a neutral foundation
once adoption justifies it.

Document SHA-256 (for prior-art and provenance):
ef989e513dcd25d15d19b0f7a735049d86c249122e677e0e2a4b3d448272e6cf

Timestamped to the Bitcoin blockchain via OpenTimestamps. Don't take my word
for it — `sha256sum` the file and run `ots verify`. Instructions ship with it.

Comments, contributions and challenges all welcome.

#AI #AIGovernance #IdentityAndAccessManagement #AgenticAI #OpenStandards

---

## Why the Notice page matters

The Notice page does three legally meaningful things:

1. **Copyright assertion** — establishes you as the author and dates the
   work. Without an explicit notice, copyright still exists, but proving
   authorship and date later becomes harder.

2. **Trademark separation** — makes it explicit that the open licence covers
   the SPEC TEXT only, not the BRAND. This is the single most important
   protection for your commercial position. Anyone can implement the
   framework; nobody can call their product "Verax".

3. **Defensive publication / prior art** — by publicly disclosing the
   techniques, you create prior art. This means a competitor cannot later
   patent any of the techniques in the framework and use the patent
   against you. This protection kicks in automatically at the moment of
   first publication, and the SHA-256 hash + timestamp anchors the date.

## What this does NOT protect

To be clear, so you have realistic expectations:

- It does not stop competitors from offering AI governance services
- It does not stop someone implementing the framework
- It does not stop someone forking the spec under CC-BY-SA terms (that's
  the deal you've made by open-licensing it)
- It does not protect anything proprietary that's IN the document — once
  published under CC-BY-SA, the spec text is open forever

What it DOES protect:
- Your name as the author
- Your trademarks (asserted now, formally registrable later when budget allows)
- The timestamp of first publication
- Your defensive position against future patent claims
