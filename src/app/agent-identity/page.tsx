import Link from "next/link";
import type { Metadata } from "next";
import { TOKENS } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Agent Identity Framework — verify the whitepaper",
  description:
    "An open specification for agent identity, with a published hash and an OpenTimestamps proof anchored in Bitcoin. Verify it yourself, without trusting the author.",
};

const HASH = "9f816beb141f12c3c369fbd39a93d605a9ba5d153a7e118f837f71e3eff280ea";
const DOC = "/agent-identity/agent-identity-framework-v0.1-signed.pdf";
const OTS = "/agent-identity/agent-identity-framework-v0.1-signed.pdf.ots";

const VERIFY_COMMANDS = [
  "sha256sum agent-identity-framework-v0.1-signed.pdf",
  "",
  "npm i javascript-opentimestamps",
  "node node_modules/javascript-opentimestamps/ots-cli.js upgrade whitepaper.pdf.ots",
  "node node_modules/javascript-opentimestamps/ots-cli.js verify whitepaper.pdf.ots",
].join("\n");

const VERSIONS = [
  { hash: "9f816beb…80ea", label: "v0.1 signed PDF — published", block: "pending", time: "signed 2026-07-20", note: "current" },
  { hash: "ef989e51…2e6cf", label: "April working .docx", block: "pending", time: "—", note: "working copy" },
  { hash: "b8264de5…b8488", label: "April working .docx", block: "946875", time: "2026-04-27 12:26:35 UTC", note: "superseded" },
  { hash: "b2f19e41…a699a", label: "April working .docx", block: "946875", time: "2026-04-27 12:26:35 UTC", note: "superseded" },
];

export default function AgentIdentityPage() {
  return (
    <main
      className="min-h-screen px-6 py-24 md:px-10"
      style={{ background: TOKENS.canvas, color: TOKENS.ink }}
    >
      <div className="mx-auto max-w-[46rem]">
        <Link
          href="/"
          className="text-[12px] tracking-[0.14em] uppercase"
          style={{ color: TOKENS.inkFaint }}
        >
          ← Anthony Penwright
        </Link>

        <p
          className="mt-10 font-mono text-[11px] tracking-[0.16em] uppercase"
          style={{ color: TOKENS.violet }}
        >
          Open specification · CC-BY-SA 4.0
        </p>

        <h1
          className="mt-4 font-[700] leading-[1.08] tracking-[-0.03em]"
          style={{ fontSize: "clamp(32px, 4.6vw, 52px)" }}
        >
          Agent Identity Framework
        </h1>

        <p className="mt-6 text-[17px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
          Every actor in software has an identity — except the autonomous agents we are about
          to give production access to. This is the specification for fixing that: five
          layers, from identity through policy, enforcement and evidence to a trust surface
          agents can transact across organisational boundaries on.
        </p>

        <p className="mt-5 text-[17px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
          It is offered openly, and it is timestamped. You do not have to take my word for
          when it was written, or that the copy you are holding is the one I published.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={DOC}
            className="rounded-md px-5 py-3 text-[14px] font-[600]"
            style={{ background: TOKENS.ink, color: TOKENS.canvas }}
          >
            Download the whitepaper
          </a>
          <a
            href={OTS}
            className="rounded-md px-5 py-3 text-[14px]"
            style={{ border: `1px solid ${TOKENS.lineStrong}`, color: TOKENS.inkDim }}
          >
            Timestamp proof (.ots)
          </a>
        </div>

        <section
          className="mt-14 rounded-lg p-6"
          style={{ background: TOKENS.glass, border: `1px solid ${TOKENS.line}` }}
        >
          <p
            className="font-mono text-[11px] tracking-[0.14em] uppercase"
            style={{ color: TOKENS.emerald }}
          >
            Verify it yourself
          </p>

          <p className="mt-4 text-[14px]" style={{ color: TOKENS.inkDim }}>
            SHA-256 of the current document:
          </p>
          <pre
            className="mt-2 overflow-x-auto rounded p-4 font-mono text-[12px] leading-[1.6]"
            style={{ background: TOKENS.canvasDeep, color: TOKENS.ink }}
          >
            {HASH}
          </pre>

          <p className="mt-6 text-[14px]" style={{ color: TOKENS.inkDim }}>
            The first command confirms the file matches the published hash. The rest confirm
            that hash was committed to the Bitcoin blockchain, using a public node rather
            than anything I control.
          </p>
          <pre
            className="mt-3 overflow-x-auto rounded p-4 font-mono text-[12px] leading-[1.7]"
            style={{ background: TOKENS.canvasDeep, color: TOKENS.inkDim }}
          >
            {VERIFY_COMMANDS}
          </pre>
        </section>

        <section className="mt-14">
          <h2 className="text-[20px] font-[600] tracking-[-0.01em]">What this proves</h2>
          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
            <strong style={{ color: TOKENS.ink }}>It proves</strong> these exact bytes existed
            no later than the attested Bitcoin block. Nobody — including me — can backdate or
            alter the document without the hash changing and the proof failing.
          </p>
          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
            <strong style={{ color: TOKENS.ink }}>It does not prove</strong> authorship,
            originality, or that I am who I say I am. OpenTimestamps commits to content and
            time, not identity. It supports a prior-art claim. It is not a signature, and
            saying otherwise would be the same mistake this specification exists to prevent.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[20px] font-[600] tracking-[-0.01em]">Version history</h2>
          <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: TOKENS.inkDim }}>
            Superseded versions are kept rather than overwritten. Each remains independent
            evidence of what existed when.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr style={{ color: TOKENS.inkFaint }}>
                  <th className="pb-3 pr-6 font-normal">SHA-256</th>
                  <th className="pb-3 pr-6 font-normal">What</th>
                  <th className="pb-3 pr-6 font-normal">Bitcoin block</th>
                  <th className="pb-3 pr-6 font-normal">Block time</th>
                  <th className="pb-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {VERSIONS.map((v) => (
                  <tr key={v.hash} style={{ borderTop: `1px solid ${TOKENS.line}` }}>
                    <td className="py-3 pr-6">{v.hash}</td>
                    <td className="py-3 pr-6 font-sans" style={{ color: TOKENS.inkDim }}>{v.label}</td>
                    <td className="py-3 pr-6">{v.block}</td>
                    <td className="py-3 pr-6" style={{ color: TOKENS.inkDim }}>
                      {v.time}
                    </td>
                    <td
                      className="py-3"
                      style={{ color: v.note === "current" ? TOKENS.emerald : TOKENS.inkFaint }}
                    >
                      {v.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[14px] leading-[1.65]" style={{ color: TOKENS.inkFaint }}>
            The current version&apos;s Bitcoin attestation is pending. OpenTimestamps calendars
            aggregate and commit periodically; run <code>ots upgrade</code> and the block
            appears. Until it does the proof rests on the calendars&apos; word rather than the
            blockchain — which is worth saying rather than glossing.
          </p>
        </section>
      </div>
    </main>
  );
}
