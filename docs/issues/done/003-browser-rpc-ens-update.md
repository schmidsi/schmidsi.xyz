# Issue 003: Scriptable ses.eth Contenthash Update via browser-rpc

**Status:** ✅ COMPLETE
**Created:** 2026-07-04
**Completed:** 2026-07-04 — `scripts/update-ens.sh`, first tx `0x0d0e3cbe…ba5b`
**Priority:** Low

## Context

After `pnpm run deploy` pins a new build to Filecoin and prints the Root CID,
updating the contenthash of ses.eth is a deliberate manual step: paste
`ipfs://<CID>` into app.ens.domains and sign from the owner wallet. The ses.eth
key must never be exposed to agents, `.env` files, or disk.

## Idea

Use [gskril/browser-rpc](https://github.com/gskril/browser-rpc) to make the
transaction scriptable without changing the security model. It's a local proxy
on `localhost:8545` that routes `eth_sendTransaction` to the browser wallet for
signing — the key stays in the wallet.

Flow:

1. `pnpm run deploy` prints the Root CID (as today)
2. `npx browser-rpc --rpc <mainnet rpc>` starts the proxy
3. A small script (viem or `cast send`, <100 lines per repo philosophy) calls
   `setContenthash(namehash('ses.eth'), <encoded contenthash>)` on the ses.eth
   resolver via `localhost:8545`
4. Browser opens, review and sign in the wallet

## Notes

- `browser-rpc` runs via `npx`, not as a project dependency
- The only fiddly bit: encoding the CID to EIP-1577 contenthash bytes
  (`0xe30101701220…`-style)
