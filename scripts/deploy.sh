#!/usr/bin/env bash
set -euo pipefail

# Deploy the static site to Filecoin/IPFS with Omnipin, then print the Root CID.
#
# The Filecoin funding key (testoor.eth) is pulled from 1Password at the moment
# of use and lives only in this process's memory — never in .env or on disk.
# Requires OP_SERVICE_ACCOUNT_TOKEN in the environment (see the
# 1password-agent-secrets setup).
#
# ENS is NOT touched here. `pnpm run publish` runs this, then points ses.eth
# at the printed CID.
#
# Pass extra Omnipin flags through, e.g:
#   pnpm run deploy --filecoin-chain=calibration   # free testnet dry run

pnpm build
bash scripts/check-pack.sh   # fail before touching secrets if files went missing

key="$(op read 'op://Agents - Privileged/testoor.eth/private key' --no-newline)"
export OMNIPIN_FILECOIN_TOKEN="0x${key#0x}"   # normalize to a single 0x prefix
unset key

# Local, patched omnipin (see patches/): upstream drops dot-paths like .well-known.
exec pnpm exec omnipin deploy out --providers Filecoin --strict "$@"
