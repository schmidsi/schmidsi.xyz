#!/bin/sh
# Open a Chrome the agent can drive: remote debugging (CDP) on 127.0.0.1:9222, which is
# where the chrome-devtools MCP server in ~/.claude.json connects. Separate profile, so it
# never touches the normal Chrome. `open -na` detaches it from this shell.
# Usage: pnpm chrome [url]   (default: the dev server)
exec open -na "Google Chrome" --args \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/.cache/ses-box-chrome-debug" \
  --no-first-run \
  "${1:-http://localhost:3000}"
