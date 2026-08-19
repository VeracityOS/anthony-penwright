# Verifying the Agent Identity Framework whitepaper

The claim: this document existed, in exactly these bytes, no later than the
Bitcoin block its timestamp commits to. You can check that yourself, offline
from us, using only a public Bitcoin node or block explorer.

## The published document

**`agent-identity-framework-v0.1-signed.pdf`** — v0.1, 57 pages, signed
2026-07-20. This is the artifact. Everything else in this folder is a working
copy or a superseded proof.

| | |
|---|---|
| SHA-256 | `9f816beb141f12c3c369fbd39a93d605a9ba5d153a7e118f837f71e3eff280ea` |
| Proof | `agent-identity-framework-v0.1-signed.pdf.ots` |
| Stamped | 2026-08-19 |
| Bitcoin attestation | **Pending.** Calendars commit within a few hours; run `ots upgrade`, then this row gets a block height. |

## Check it

```bash
sha256sum agent-identity-framework-v0.1-signed.pdf
#    -> must equal the SHA-256 above, byte for byte

npm i javascript-opentimestamps
node node_modules/javascript-opentimestamps/ots-cli.js upgrade agent-identity-framework-v0.1-signed.pdf.ots
node node_modules/javascript-opentimestamps/ots-cli.js verify agent-identity-framework-v0.1-signed.pdf.ots
```

`upgrade` replaces the calendar's promise with a Bitcoin block header
attestation. After that the proof is verifiable against the blockchain with no
contact with the calendars, this repository, or the author.

## What this does and does not prove

**Proves:** these bytes existed no later than the attested block. Nobody —
including the author — can backdate or alter the document without the hash
changing and the proof failing.

**Does not prove:** authorship, originality, or that the author is who they say
they are. OpenTimestamps commits to content and time, not identity. It supports
a prior-art claim; it is not a signature.

Note on the filename: the "signed" in `-signed.pdf` refers to the handwritten
signature block on page 2. That is a signature in the ordinary sense, not a
cryptographic one. The cryptographic evidence is the hash and the `.ots` proof,
and they are separate things. Do not let the filename imply otherwise.

## Known defect in the published text

Page 3 of the PDF, under *First publication and prior art*, states:

> This document was first published on 27 April 2026. A SHA-256 cryptographic
> hash of the published file has been generated and timestamped via
> OpenTimestamps.

Until 2026-08-19 that sentence was true only of an **April `.docx` working
copy**, not of this PDF. A reader who hashed the PDF and looked for a matching
proof would have found none. It is true now — the PDF is stamped — but the next
revision should say plainly which file the proof covers, because a provenance
claim that does not name its artifact is exactly the failure this framework
exists to prevent.

## Working copies and superseded proofs

`archive/` holds earlier material. It is kept rather than deleted: each proof
remains independent evidence of what existed when.

| SHA-256 | What it is | Proof | Earliest Bitcoin block | Block time (UTC) |
|---|---|---|---|---|
| `9f816beb…80ea` | **v0.1 signed PDF — published** | `agent-identity-framework-v0.1-signed.pdf.ots` | pending | — |
| `ef989e51…2e6cf` | April `.docx` working copy | `agent-identity-framework-whitepaper.docx.ots` | pending | — |
| `b8264de5…b8488` | April `.docx` working copy | `archive/whitepaper-b8264de5.docx.ots` | 946875 | 2026-04-27 12:26:35 |
| `b2f19e41…a699a` | April `.docx` working copy | `archive/whitepaper-b2f19e41.docx.ots` | 946875 | 2026-04-27 12:26:35 |
| `2d9ed959…8fe4` | earlier draft, never stamped | — | — | — |

Two further copies exist outside this repo, under
`OneDrive/Backup/D/CV Anthony/Whitepapers/` (`f9d17edd…` .docx and `a7d51c26…`
unsigned .pdf). They are not the published artifact and carry no proof.

**Six copies of one document is the actual problem.** The hash mismatch was a
symptom. The rule going forward: one published artifact, stamped at the moment
it is published, with every working copy kept somewhere that cannot be mistaken
for it.
