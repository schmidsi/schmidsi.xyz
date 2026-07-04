#!/usr/bin/env bash
set -euo pipefail

# Update the ses.eth contenthash to a new IPFS CID — signed in the browser.
#
# The ses.eth key never touches this machine: the transaction goes through
# browser-rpc (https://github.com/gskril/browser-rpc), a local proxy that
# forwards eth_sendTransaction to your browser wallet for signing.
#
# Usage:
#   1. npx browser-rpc --rpc https://ethereum-rpc.publicnode.com
#   2. scripts/update-ens.sh <Root CID printed by `pnpm run deploy`>
#   3. Review and sign in the browser tab that opens.

CID="${1:?usage: update-ens.sh <base32 CIDv1 from pnpm run deploy>}"
RPC="${RPC:-http://localhost:8545}"
ENS_REGISTRY=0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
NAMEWRAPPER=0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401

NODE_HASH=$(cast namehash ses.eth)
RESOLVER=$(cast call $ENS_REGISTRY "resolver(bytes32)(address)" "$NODE_HASH" --rpc-url "$RPC")
OWNER=$(cast call $NAMEWRAPPER "ownerOf(uint256)(address)" "$NODE_HASH" --rpc-url "$RPC")
CONTENTHASH=$(node "$(dirname "$0")/cid-to-contenthash.mjs" "$CID")

echo "node:        $NODE_HASH"
echo "resolver:    $RESOLVER"
echo "owner:       $OWNER (signs in browser)"
echo "contenthash: $CONTENTHASH"
echo
echo "Sending setContenthash — approve it in the browser wallet…"

cast send "$RESOLVER" "setContenthash(bytes32,bytes)" "$NODE_HASH" "$CONTENTHASH" \
  --rpc-url "$RPC" --unlocked --from "$OWNER"
