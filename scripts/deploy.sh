#!/usr/bin/env bash
set -euo pipefail

# Deploy the static site to IPFS via Filebase and Filecoin with Omnipin, then
# print the Root CID.
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

# Filebase: omnipin wants base64("<access key>:<secret>") and creates the
# bucket if it does not exist yet.
fb_key="$(op read 'op://Agents - Privileged/Filebase/username' --no-newline)"
fb_secret="$(op read 'op://Agents - Privileged/Filebase/credential' --no-newline)"
export OMNIPIN_FILEBASE_TOKEN="$(printf '%s:%s' "$fb_key" "$fb_secret" | base64 | tr -d '\n')"
export OMNIPIN_FILEBASE_BUCKET_NAME=ses-eth
unset fb_key fb_secret

# Order matters: omnipin uploads the files to the first provider only, the
# others pin by CID. Filecoin always uploads its own copy. Filebase first means
# a Filecoin outage no longer blocks the deploy. Override with PROVIDERS=….
PROVIDERS="${PROVIDERS:-Filebase,Filecoin}"

# Local, patched omnipin (see patches/): upstream drops dot-paths like .well-known.
# No --strict: with several providers, one outage must not block the deploy.
# omnipin still fails if every provider fails.
exec pnpm exec omnipin deploy out --providers "$PROVIDERS" "$@"
