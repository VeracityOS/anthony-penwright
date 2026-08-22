import Link from "next/link";
import type { Metadata } from "next";
import { TOKENS } from "@/lib/tokens";
import { DownloadButton } from "@/components/download-button";

export const metadata: Metadata = {
  title: "The Value Realisation Office — verify the whitepaper",
  description:
    "An open methodology for governing whether a programme was worth delivering, not merely whether it was delivered. Published with a hash and an OpenTimestamps proof — verify it yourself.",
};

const HASH = "0e60063ae2f9250afc025a7bab6fa778d427088439dfb11858f5e22625ad66dd";
const DOC = "/value-realisation/value-realisation-office-v1.2.pdf";
const OTS = "/value-realisation/value-realisation-office-v1.2.pdf.ots";

const VERIFY_COMMANDS = [
  "sha256sum value-realisation-office-v1.2.pdf",
  "",
  "npm i javascript-opentimestamps",
  "node node_modules/javascript-opentimestamps/ots-cli.js upgrade whitepaper.pdf.ots",
  "node node_modules/javascript-opentimestamps/ots-cli.js verify whitepaper.pdf.ots",
].join("\n");

const MODES = [
  {
    name: "Value Realisation",
    does: "Return against the original business case",
    when: "Monthly",
    who: "CFO, CEO, board",
  },
  {
    name: "Operational Excellence",
    does: "Service quality, SLA adherence, KPIs",
    when: "Daily and weekly",
    who: "Operations director",
  },
  {
    name: "Adaptive",
    does: "What to start, what to retire",
    when: "Quarterly",
    who: "CTO, strategy",
  },
];

export default function ValueRealisationPage() {
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
          style={{ color: TOKENS.amber }}
        >
          Open methodology · CC BY-SA 4.0
        </p>

        <h1
          className="mt-4 font-[700] leading-[1.08] tracking-[-0.03em]"
          style={{ fontSize: "clamp(32px, 4.6vw, 52px)" }}
        >
          The Value Realisation Office
        </h1>

        <p className="mt-6 text-[17px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
          Your PMO governs whether the project was delivered. Nobody in the building governs
          whether it was worth delivering. This is the methodology for the body that does —
          what it is, how it differs from a programme office, and how to stand one up.
        </p>

        <p className="mt-5 text-[17px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
          Built on twenty-three years of delivery in government and large-scale technology
          transformation. Offered openly, and timestamped — you do not have to take my word
          for when it was written.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <DownloadButton
            href={DOC}
            className="rounded-md px-5 py-3 text-[14px] font-[600]"
            style={{ background: TOKENS.ink, color: TOKENS.canvas }}
          >
            Download the methodology
          </DownloadButton>
          <a
            href={OTS}
            className="rounded-md px-5 py-3 text-[14px]"
            style={{ border: `1px solid ${TOKENS.lineStrong}`, color: TOKENS.inkDim }}
          >
            Timestamp proof (.ots)
          </a>
        </div>

        <section className="mt-14">
          <h2 className="text-[20px] font-[600] tracking-[-0.01em]">
            Three modes, three cadences, three audiences
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr style={{ color: TOKENS.inkFaint }}>
                  <th className="pb-3 pr-6 font-normal">Mode</th>
                  <th className="pb-3 pr-6 font-normal">What it governs</th>
                  <th className="pb-3 pr-6 font-normal">Cadence</th>
                  <th className="pb-3 font-normal">Audience</th>
                </tr>
              </thead>
              <tbody>
                {MODES.map((m) => (
                  <tr key={m.name} style={{ borderTop: `1px solid ${TOKENS.line}` }}>
                    <td className="py-3 pr-6 font-[600]">{m.name}</td>
                    <td className="py-3 pr-6" style={{ color: TOKENS.inkDim }}>
                      {m.does}
                    </td>
                    <td className="py-3 pr-6" style={{ color: TOKENS.inkDim }}>
                      {m.when}
                    </td>
                    <td className="py-3" style={{ color: TOKENS.inkDim }}>
                      {m.who}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[15px] leading-[1.65]" style={{ color: TOKENS.inkFaint }}>
            The PMO sits alongside the VRO, not inside it, and the two are permitted to disagree
            in public. That tension is the mechanism.
          </p>
        </section>

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
            SHA-256 of the published document:
          </p>
          <pre
            className="mt-2 overflow-x-auto rounded p-4 font-mono text-[12px] leading-[1.6]"
            style={{ background: TOKENS.canvasDeep, color: TOKENS.ink }}
          >
            {HASH}
          </pre>
          <p className="mt-6 text-[14px]" style={{ color: TOKENS.inkDim }}>
            The first command confirms the file matches the published hash. The rest confirm that
            hash was committed to the Bitcoin blockchain, using a public node rather than anything
            I control.
          </p>
          <pre
            className="mt-3 overflow-x-auto rounded p-4 font-mono text-[12px] leading-[1.7]"
            style={{ background: TOKENS.canvasDeep, color: TOKENS.inkDim }}
          >
            {VERIFY_COMMANDS}
          </pre>
          <p className="mt-5 text-[13px] leading-[1.6]" style={{ color: TOKENS.inkFaint }}>
            Anchored in Bitcoin block 963564, 2026-08-22 08:40:10 UTC. That attestation verifies
            against any public Bitcoin node, with no contact with the OpenTimestamps calendars,
            this site, or the author.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[20px] font-[600] tracking-[-0.01em]">On the name</h2>
          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
            <strong style={{ color: TOKENS.ink }}>
              &ldquo;Value Realisation Office&rdquo; is not claimed as original to me.
            </strong>{" "}
            It is in active use across the consulting industry, several firms publish their own
            treatments, and no source establishes who used it first. This paper makes no priority
            claim.
          </p>
          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
            What is specific here is the construct — three modes on three cadences to three
            audiences, a seven-element chassis, three workstreams that never close, and the PMO
            sitting alongside rather than inside. Those are the parts worth arguing about, and the
            parts the paper defends.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[20px] font-[600] tracking-[-0.01em]">Version history</h2>
          <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: TOKENS.inkDim }}>
            Superseded versions stay published. A superseded document is still evidence of what
            was said and when, and deleting it would defeat the purpose of stamping it.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr style={{ color: TOKENS.inkFaint }}>
                  <th className="pb-3 pr-6 font-normal">Version</th>
                  <th className="pb-3 pr-6 font-normal">SHA-256</th>
                  <th className="pb-3 pr-6 font-normal">Changed</th>
                  <th className="pb-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr style={{ borderTop: `1px solid ${TOKENS.line}` }}>
                  <td className="py-3 pr-6">1.2</td>
                  <td className="py-3 pr-6">0e60063a…66dd</td>
                  <td className="py-3 pr-6 font-sans" style={{ color: TOKENS.inkDim }}>
                    Basis stated as experience rather than named engagements
                  </td>
                  <td className="py-3" style={{ color: TOKENS.emerald }}>current</td>
                </tr>
                <tr style={{ borderTop: `1px solid ${TOKENS.line}` }}>
                  <td className="py-3 pr-6">
                    <a href="/value-realisation/value-realisation-office-v1.1.pdf" style={{ color: TOKENS.inkDim }}>1.1</a>
                  </td>
                  <td className="py-3 pr-6">7980f395…caac</td>
                  <td className="py-3 pr-6 font-sans" style={{ color: TOKENS.inkDim }}>
                    Drawn diagram, card layout, narrative scenes, running mark
                  </td>
                  <td className="py-3" style={{ color: TOKENS.inkFaint }}>superseded</td>
                </tr>
                <tr style={{ borderTop: `1px solid ${TOKENS.line}` }}>
                  <td className="py-3 pr-6">
                    <a href="/value-realisation/value-realisation-office-v1.0.pdf" style={{ color: TOKENS.inkDim }}>1.0</a>
                  </td>
                  <td className="py-3 pr-6">42852ea0…e059f</td>
                  <td className="py-3 pr-6 font-sans" style={{ color: TOKENS.inkDim }}>
                    First release
                  </td>
                  <td className="py-3" style={{ color: TOKENS.inkFaint }}>superseded</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[20px] font-[600] tracking-[-0.01em]">One test</h2>
          <p className="mt-4 text-[17px] leading-[1.7]" style={{ color: TOKENS.ink }}>
            When did someone in your organisation last formally recommend stopping a programme
            that was delivering to plan?
          </p>
          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: TOKENS.inkDim }}>
            If the answer is never, there is no outcomes governance in the building. There is a
            programme office, and there is hope.
          </p>
        </section>
      </div>
    </main>
  );
}
