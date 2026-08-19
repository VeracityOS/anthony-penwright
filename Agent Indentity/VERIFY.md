# Verifying the Agent Identity Framework whitepaper

The claim: this document existed, in exactly these bytes, no later than the
Bitcoin block its timestamp commits to. You can check that yourself, offline
from us, using only a public Bitcoin node or block explorer.

## Current version

| | |
|---|---|
| File | `agent-identity-framework-whitepaper.docx` |
| SHA-256 | `ef989e513dcd25d15d19b0f7a735049d86c249122e677e0e2a4b3d448272e6cf` |
| Proof | `agent-identity-framework-whitepaper.docx.ots` |
| Stamped | 2026-08-19 |
| Bitcoin attestation | **Pending.** Calendars commit within a few hours; run `ots upgrade` below, then this row gets a block height. |

## Check it

```bash
# 1. Does the file match the published hash?
sha256sum agent-identity-framework-whitepaper.docx
#    -> must equal the SHA-256 above, byte for byte

# 2. Does the timestamp proof cover that hash, and is it in a Bitcoin block?
npm i javascript-opentimestamps
node node_modules/javascript-opentimestamps/ots-cli.js upgrade agent-identity-framework-whitepaper.docx.ots
node node_modules/javascript-opentimestamps/ots-cli.js verify agent-identity-framework-whitepaper.docx.ots
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

## Version history

Earlier versions of this document were timestamped and are preserved in
`archive/`. They are kept, not deleted: each is independent evidence that its
version existed by its attested block.

| Version SHA-256 | Proof | Earliest Bitcoin block | Block time (UTC) |
|---|---|---|---|
| `b2f19e41…a699a` | `archive/whitepaper-b2f19e41.docx.ots` | 946875 | 2026-04-27 12:26:35 |
| `b8264de5…b8488` | `archive/whitepaper-b8264de5.docx.ots` | 946875 | 2026-04-27 12:26:35 |
| `ef989e51…2e6cf` | `agent-identity-framework-whitepaper.docx.ots` | pending | — |

The archived `.ots` files are renamed by hash because the document versions they
cover are no longer distributed. `ots info <file>.ots` shows the hash each one
commits to; `ots verify` needs the original bytes and so cannot be run on them.

Note on the April versions: the document was edited after `whitepaper.sha256`
was written, which is why the recorded hash and the shipped file diverged. The
fix is this file — one hash, one proof, regenerated whenever the document
changes, with the superseded proofs kept rather than overwritten.
