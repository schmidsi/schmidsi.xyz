# Issue 004: `.well-known` Is Silently Dropped From Every IPFS Deploy

**Status:** 🚧 IN PROGRESS (code done, deploy and upstream PR pending)
**Created:** 2026-08-06
**Priority:** Medium
**Goal:** Get `ses.eth.limo` verified as the Bluesky handle

## Context

Bluesky's "Change Handle" flow verifies domain ownership by fetching
`https://<domain>/.well-known/atproto-did` and comparing the body to the account's DID.

The file is already correct in this repo: `public/.well-known/atproto-did` contains
`did:plc:unqpe6l2mpytlvja7byj66cs`, exactly the DID Bluesky asks for. It was added in
`a96897b` / `70dc24a` (Oct 2025) and it survives `next build` into `out/.well-known/atproto-did`.

But it never reaches IPFS, so verification fails:

```
$ curl https://ses.eth.limo/.well-known/atproto-did
failed to resolve /ipfs/bafybeicvzgfulf…hr2m/.well-known/atproto-did:
no link named ".well-known" under bafybeicvzgfulf…
```

`ses.eth.link` returns the identical error (both hostnames are served by the same
`server: eth.limo` infrastructure, confirmed via response headers). ENS resolution is fine and
the site itself is live: the deployed CID is byte-identical to the current local build,
`out/index.html` and `rss.xml` hash the same as what the gateway serves. The dot-directory is
the only thing missing.

## Root cause

`omnipin`'s directory walker globs without `dot: true`, and tinyglobby/picomatch skip
dot-prefixed path segments by default:

```ts
// omnipin src/utils/fs.ts
for (const absPath of await glob('**/*', {
  cwd: dir,
  ignore: ['**/node_modules'],
  onlyFiles: true,
  absolute: true,
}))
```

So `.well-known/atproto-did` never enters the CAR that `scripts/deploy.sh` pins. This is
silent: no warning, no error, and `--strict` does not catch it. Still unfixed on omnipin
`main` (latest release 3.1.1; this repo pins 1.7.0).

## Decisions

- The handle will be **`ses.eth.limo`**, matching `SITE_URL` in `scripts/generate-rss.mjs` and
  the deploy workflow name. One canonical domain everywhere.
- Fix omnipin locally with a pinned devDependency + `pnpm patch`, and open a one-line upstream
  PR so the patch can be dropped later.

## Plan

### 1. Pin and patch omnipin

`deploy.sh` currently shells out to `pnpm dlx omnipin@1.7.0`, which cannot be patched. omnipin
ships as 4 files with a single self-contained bundled `dist/cli.js` and no transitive
dependencies, so taking it as a devDependency costs essentially nothing and is more
reproducible than `dlx`.

- `pnpm add -D omnipin@1.7.0` (stay on 1.7.0; upgrading to 3.x is a separate concern with its
  own provider and flag changes)
- `pnpm patch omnipin@1.7.0`, then in the extracted `dist/cli.js` find the bundled `walk()`
  glob options (search for `node_modules` next to `onlyFiles`) and add the `dot` flag: a
  one-token insertion. `pnpm patch-commit` writes `patches/omnipin@1.7.0.patch` and the
  `pnpm.patchedDependencies` entry in `package.json`.
- `scripts/deploy.sh`: replace `pnpm dlx omnipin@1.7.0` with `pnpm exec omnipin`, keeping
  `deploy out --providers Filecoin --strict "$@"` unchanged.

### 2. Guard against silent regression

The failure mode here is a required file vanishing with no signal. Add a check to
`scripts/deploy.sh` after `pnpm build` and before the pin: run
`pnpm exec omnipin pack out --verbose` and fail with a clear message if
`.well-known/atproto-did` is absent from the listed files. A few lines, in the style of the
rest of the script.

### 3. Upstream PR

Open a PR against `omnipin/omnipin` adding `dot: true` to the glob options in
`src/utils/fs.ts`. Framing: static-site builds routinely rely on dot-paths (`.well-known/`,
`.nojekyll`), and dropping them silently produces a deploy that looks successful but serves
404s. Once released, drop the patch and bump the devDependency.

### 4. Deploy and update ENS

Existing flow, unchanged:

1. `pnpm run deploy` prints the Root CID (needs `OP_SERVICE_ACCOUNT_TOKEN`)
2. `npx browser-rpc --rpc <mainnet rpc>` in another shell
3. `scripts/update-ens.sh <CID>`, sign `setContenthash` in the browser wallet (needs Foundry's
   `cast`)

### 5. Close out

- Mark this issue complete with the upstream PR link and the `setContenthash` tx hash, the way
  issue 003 records its first tx.
- Note the `.well-known` dependency in `AGENTS.md` so the file is not mistaken for dead weight
  during a future slim-down pass.

## Verification

1. `pnpm build && ls out/.well-known/atproto-did`: file present in the export.
2. `pnpm exec omnipin pack out --verbose | grep '.well-known/atproto-did'`: the patch works.
   This is the step that fails today.
3. After deploy, ENS update, and a few minutes of gateway propagation:
   `curl -sS https://ses.eth.limo/.well-known/atproto-did` must print
   `did:plc:unqpe6l2mpytlvja7byj66cs` with a 200. Spot-check that `/` and `/rss.xml` still
   return 200.
4. In Bluesky: Settings → Account → Change Handle → "No DNS Panel" → enter `ses.eth.limo` →
   Verify Text File.

## Risk to accept

Bluesky re-validates handles periodically, so the handle is only as durable as the chain of
ENS contenthash → IPFS pin → eth.limo gateway. Every future `pnpm run deploy` mints a new CID,
and until `scripts/update-ens.sh` runs, ENS still points at the previous one, which is fine
because that CID will also contain the file once step 1 lands. The real hazard is deploying a
build where the file went missing again, which is what the step 2 guard prevents.

## Progress (2026-10-20)

Done, steps 1, 2 and the AGENTS.md note:

- `omnipin` pinned as an exact devDependency (1.7.0). It has no runtime dependencies.
- `patches/omnipin@1.7.0.patch` adds `dot: true` to the walker glob. The bundled 1.7.0
  `dist/cli.js` differs from upstream `src/utils/fs.ts` (it globs `dir` with
  `absolute: false`), but the fix is the same one token. pnpm 10 records the patch in
  `pnpm-workspace.yaml`, not `package.json`.
- `scripts/check-pack.sh` packs `out/` like a deploy and fails if `index.html`, `rss.xml` or
  `.well-known/atproto-did` is missing. It is a standalone script so it runs without the
  1Password token.
- `scripts/deploy.sh` builds, runs the check, and only then reads the secret, then deploys
  with `pnpm exec omnipin`.

Verified locally: unpatched, the pack reproduces the live CID
`bafybeicvzgfulf…hr2m` without `.well-known`, and the check fails. Patched, the check passes
and `.well-known/atproto-did` is the only dot-path in the CAR, so nothing like `.DS_Store`
leaks.

Remaining, needs Simon:

1. Upstream PR to `omnipin/omnipin` (step 3).
2. `pnpm run deploy`, then `scripts/update-ens.sh <CID>` and sign (step 4).
3. Verification steps 3 and 4: `curl` the file on `ses.eth.limo`, then verify in Bluesky.
4. Move this file to `done/` with the PR link and tx hash.
