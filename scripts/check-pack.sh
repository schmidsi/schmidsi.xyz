#!/usr/bin/env bash
set -euo pipefail

# Fail if a required file would be missing from the CAR that Omnipin pins.
#
# Why: Omnipin once dropped every dot-path (see docs/issues 004), so
# .well-known/atproto-did vanished from deploys with no error, and the Bluesky
# handle broke. This packs `out/` exactly like a deploy does and checks the list.
#
# Usage: scripts/check-pack.sh   (after `pnpm build`)

required=(
  index.html
  rss.xml
  .well-known/atproto-did
)

dist="$(mktemp -d)"
trap 'rm -rf "$dist"' EXIT

files="$(pnpm exec omnipin pack out --dist "$dist" --verbose)"

missing=0
for file in "${required[@]}"; do
  if ! grep -q "^${file} (" <<<"$files"; then
    echo "check-pack: $file is missing from the CAR" >&2
    missing=1
  fi
done

if [ "$missing" -ne 0 ]; then
  exit 1
fi
echo "check-pack: all required files are in the CAR"
