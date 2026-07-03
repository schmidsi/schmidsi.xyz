#!/usr/bin/env bash
set -euo pipefail

# Deploy the static site to Filecoin/IPFS with Omnipin, then print the Root CID.
#
# The Filecoin funding key (testoor.eth) is pulled from 1Password at the moment
# of use and lives only in this process's memory — never in .env or on disk.
# Requires OP_SERVICE_ACCOUNT_TOKEN in the environment (see the
# 1password-agent-secrets setup).
#
# ENS is NOT touched here: copy the printed `ipfs://<CID>` into the Content Hash
# record for ses.eth on app.ens.domains and sign it from your own wallet.
#
# Pass extra Omnipin flags through, e.g:
#   pnpm deploy --filecoin-chain=calibration   # free testnet dry run

key="$(op read 'op://Agents - Privileged/testoor.eth/private key' --no-newline)"
export OMNIPIN_FILECOIN_TOKEN="0x${key#0x}"   # normalize to a single 0x prefix
unset key

pnpm build
exec pnpm dlx omnipin@1.7.0 deploy out --providers Filecoin --strict "$@"
