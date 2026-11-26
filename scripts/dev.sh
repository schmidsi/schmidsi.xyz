#!/bin/sh
# Dev server plus the annotation server for the Agentation toolbar on :4747. The annotation
# server lives here, not in a Claude session: a session-owned port dies with the session and
# no other session takes it over. Sessions only proxy to it (--mcp-only in .mcp.json).
# kill 0 on exit stops the whole process group, so no annotation server outlives the dev server.
trap 'kill 0' EXIT
npx -y agentation-mcp@1 server < /dev/null > /dev/null 2>&1 &
next dev "$@"
