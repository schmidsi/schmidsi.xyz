# Issue 007: Redundant Pinning (No Single Storage Provider)

**Status:** 🚧 IN PROGRESS (live on Filebase + Filecoin, failover test open)
**Created:** 2026-10-20
**Priority:** High
**Goal:** The site, and with it the `ses.eth.limo` Bluesky handle, survives any one storage
provider failing, and deploys succeed while any one provider works.

## Context

Every copy of the site lives with one Filecoin storage provider, ezpdpz-main (provider 1,
data set 1336). On 2026-10-20 its PDP service went down (`/pdp/ping` 503), then flapped
(uploads accepted, then connect timeouts while waiting for the piece). Deploys failed for
hours. The live site kept working only because the provider's IPFS gateway stayed up. A
worse outage, or the provider dropping the data, takes the site and the handle down.

Filecoin Warm Storage stores one copy per data set, on one provider, in omnipin 1.7.0 and
3.1.3 alike. Redundancy has to come from other providers.

## Done

- omnipin upgraded 1.7.0 → 3.1.3. The dot-path bug is still there, the patch is ported
  (`patches/omnipin@3.1.3.patch`), `check-pack` caught it as designed.
- `scripts/filecoin.ts` reads the FWSS v1.4 storage view (13-word data set layout).
- `scripts/deploy.sh` no longer passes `--strict`, so one failing provider does not fail
  the deploy. omnipin still fails if all providers fail.

## Plan

Use both Filebase and Pinata, three copies at three independent companies:

```
--providers Filebase,Filecoin,Pinata
```

Order matters: omnipin uploads the files to the first provider only. Filebase first
uploads directly. Filecoin always uploads its own copy. Pinata, last, pins by CID and
fetches from the other two over IPFS. With this order, a Filecoin outage like today's still
deploys.

Needed, in 1Password next to the Filecoin key:

- Filebase: an IPFS bucket (`OMNIPIN_FILEBASE_BUCKET_NAME`) and its IPFS RPC API token
  (`OMNIPIN_FILEBASE_TOKEN`, sent as a Bearer token to `rpc.filebase.io`).
- Pinata: a JWT with pinning scopes (`OMNIPIN_PINATA_TOKEN`).

Then `scripts/deploy.sh` reads them with `op read` like the Filecoin key, and
`check-pack` stays as is (it checks the CAR before any provider sees it).

## For the omnipin team

1. **Dot-paths are dropped.** `fs_walk` globs without `dot: true`, so `.well-known/` never
   reaches the CAR. Silent, no warning. Fix: one option. Patch:
   `patches/omnipin@3.1.3.patch`.
2. **CAR bytes are not deterministic.** Packing the same `out/` three times gives the same
   Root CID but three different CAR hashes, so the Filecoin piece CID changes on every run.
   Retries re-upload a new piece instead of finding the one already at the provider, and
   `FILECOIN_PIECE_CID` cannot be reused across runs.
3. **One connect timeout aborts the piece wait.** While polling the provider for the
   piece, a single `ConnectTimeoutError` ends the deploy, even with
   `OMNIPIN_FILECOIN_FINDPIECE_TIMEOUT_MS` set to 15 minutes. Polling should retry
   transient network errors within the budget.
4. **Filebase bucket creation fails silently.** `createBucket` (in
   `@stauro/filebase-upload`) returns a boolean nobody checks, so the upload later dies with
   `NoSuchBucket`. The real cause is not path-style vs virtual-hosted: the signer sends
   `x-amz-date` with a double `Z` (`…T103528ZZ`), so every CreateBucket gets `403
   AccessDenied`. Both URL styles work once the date is fixed.

Reported upstream (2026-10-24), from the fork in `~/Repos/@omnipin/`:

- Bug 1: PR https://github.com/omnipin/omnipin/pull/203
- Bug 2: issue https://github.com/omnipin/omnipin/issues/205 (cause: files are imported
  50 in parallel, and blocks are written in completion order)
- Bug 3: PR https://github.com/omnipin/omnipin/pull/204
- Bug 4: PR https://github.com/omnipin/filebase-upload/pull/6 (omnipin then needs a
  release and a dependency bump)

Once 203 ships in a release, drop `patches/omnipin@3.1.3.patch`.

## Progress (2026-10-24)

Decided: Filebase + Filecoin (two independent operators, one free, one verifiable and
paid). Pinata stays optional as a third copy.

- Filebase key pair in 1Password (`Agents - Privileged/Filebase`, username = access key,
  credential = secret). `deploy.sh` builds `OMNIPIN_FILEBASE_TOKEN` from both. Bucket
  `ses-eth`, created by hand because of bug 4.
- `deploy.sh` defaults to `PROVIDERS=Filebase,Filecoin`.
- Deployed `bafybeig3pwhvkdjg667jd7bh2v2m7saytpbsqdk4hhd2aihwhpcyf3gn5y` to both
  ("Deployed across all providers", Filecoin piece registered on chain). Filebase's
  gateway serves it, including `.well-known/atproto-did` and the skill.

- ses.eth points at it: `setContenthash` tx
  `0x569540e41c3f952aea495d6f130d62094118565cf8a5e556de2cd430e96d84e7` (2026-10-24).
- Filecoin Pay topped up to 2.20 USDFC, paid until 2028-03.

Left: verification step 3 (failover with Filecoin broken), then drop the patch once 203
ships.

## Verification

1. `pnpm run deploy` lists Filebase and Filecoin and ends with "Deployed across all
   providers". Done 2026-10-24.
2. The new CID resolves from Filebase's gateway, including `.well-known/atproto-did`.
   Done 2026-10-24.
3. With a bogus Filecoin key, the deploy still succeeds via Filebase, and warns.
