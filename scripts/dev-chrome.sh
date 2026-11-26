#!/bin/sh
# Dev server plus a Chrome the agent can drive (see chrome-debug.sh). Chrome opens only once
# the server answers, so the first page load does not fail. Ctrl-C stops the server, Chrome
# stays open (it is detached).
(until curl -s -o /dev/null http://localhost:3000; do sleep 1; done; sh scripts/chrome-debug.sh) &
exec sh scripts/dev.sh
