---
name: chrome-for-coding-agents
description: Give a coding agent (Claude Code or any CLI agent with a chrome-devtools or Playwright MCP) a Chrome it can see and drive. Covers launching Chrome with remote debugging on the host, and reaching that Chrome from a sandbox (Docker, devcontainer, Apple container / apfelkäfig) or from an agent running on a remote dev server, via port forwards and SSH tunnels. Use when the agent should look at a web app, take screenshots or click through a UI, or when the MCP fails with "ECONNREFUSED 9222", "Host header is specified and is not an IP address or localhost", or an empty page list.
---

# A Chrome the agent can drive

The agent never embeds a browser. A real Chrome runs on the machine with a screen, with
the Chrome DevTools Protocol (CDP) enabled on a port. The agent's MCP server (for Claude
Code: `chrome-devtools-mcp`, alternatively `@playwright/mcp`) connects to that port and
can then list tabs, navigate, click, read the DOM, take screenshots and watch console and
network output.

Everything below follows from three facts about Chrome's debug port:

1. It binds to `127.0.0.1` only (`--remote-debugging-address` works for headless only).
   Anything not on the same machine needs a port forward.
2. It rejects requests whose `Host` header is neither `localhost` nor an IP literal, with
   a 500 and the text "Host header is specified and is not an IP address or localhost".
   `host.docker.internal:9223` is rejected, `192.168.64.1:9223` is accepted.
3. It builds the `webSocketDebuggerUrl` in `/json/version` from that `Host` header. A
   forwarded port therefore works out of the box when the client addresses it by IP.

The debug port gives full control over that Chrome: every tab, cookie and login in its
profile. Always use a dedicated profile directory, never the daily one, and never expose
the port beyond loopback or a tunnel.

## The three working modes

Click a diagram to open it full size. The same parts in every mode: the agent, its MCP server, Chrome with the debug port, and
the app under test. What changes is which machine or sandbox each part runs in, and what
bridges the gaps.

**Simple: agent on the laptop.** Everything is on one machine and talks over loopback.

[![Deployment diagram, local mode: on one laptop, Claude Code talks over stdio to the chrome-devtools MCP, which speaks CDP to Chrome on 127.0.0.1:9222; Chrome opens the dev server on localhost:5173; the dev server tees its output into logs/ which the agent reads](assets/mode-1-local.svg)](assets/mode-1-local.svg)

**Medium: agent in a container on the laptop.** Chrome stays on the host. A forwarder on
the host (socat or the proxy) exposes the debug port to the container, which addresses
the host by IP. The dev server inside the container publishes its port so Chrome can
reach it.

[![Deployment diagram, container mode: inside the laptop a container holds Claude Code, the MCP and the dev server; the MCP connects to the host's IP on port 9223 where socat forwards to Chrome on 127.0.0.1:9222; Chrome opens localhost:5173, a published port into the container's dev server](assets/mode-2-container.svg)](assets/mode-2-container.svg)

**Complex: agent on a remote server, browser on the laptop.** One SSH connection carries
two tunnels. A reverse tunnel makes the laptop's Chrome appear on the server's loopback
port 9222, so the MCP config is identical to the simple mode. A forward tunnel makes the
server's dev server appear on the laptop's localhost, so Chrome can open it.

[![Deployment diagram, remote mode: the laptop runs the SSH client and Chrome, the server runs sshd, Claude Code, the MCP and the dev server; a reverse tunnel carries CDP from the server's 127.0.0.1:9222 to the laptop's Chrome, a forward tunnel carries HTTP from the laptop's localhost:5173 to the server's dev server](assets/mode-3-remote.svg)](assets/mode-3-remote.svg)

## 1. Launch Chrome on the host

A small script in the project, run on the machine with the display (macOS shown):

```sh
#!/bin/sh
# Open a Chrome the agent can drive: CDP on 127.0.0.1:9222, separate profile.
# `open -na` detaches it from this shell, so it outlives the terminal.
# Usage: scripts/chrome-debug.sh [url]
exec open -na "Google Chrome" --args \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/.cache/<project>-chrome-debug" \
  --no-first-run \
  "${1:-http://localhost:5173}"
```

Add it as `npm run chrome` (or a `just`/`make` target) so it is one command. On Linux,
call the `google-chrome` or `chromium` binary directly with the same flags and `&`.

Chrome refuses a second instance on the same profile, so a stale debug Chrome must be
quit before relaunching with other flags. `--user-data-dir` under `$HOME/.cache` keeps
logins to the app under test across restarts; use `/tmp/...` or add `--incognito` for a
clean browser each time.

Verify on the host:

```sh
curl -s http://127.0.0.1:9222/json/version
```

It must print JSON with `Browser` and `webSocketDebuggerUrl`.

## 2. Point the agent's MCP at it

Claude Code, user scope so every project has it:

```sh
claude mcp add -s user chrome-devtools -- npx -y chrome-devtools-mcp@latest --browser-url http://127.0.0.1:9222
```

This lands in `~/.claude.json` under `mcpServers`. Playwright's MCP takes the same URL
as `--cdp-endpoint`. Without `--browser-url` the MCP launches its own headless Chrome,
which the user cannot see and which has none of their sessions.

Restart the agent session after adding the server. Check with `/mcp` in Claude Code,
then ask the agent to list the open pages and take a screenshot. If it answers with the
tab you see on screen, the setup is done for the host case.

## 3. Agent inside a container on the same machine

The container cannot reach `127.0.0.1:9222` of the host. Two things are needed: a
forward from a host interface the container can reach, and an address the MCP can use
that Chrome will accept (fact 2 above).

### 3a. Forward with the host's IP (no proxy)

Run on the host, next to Chrome:

```sh
socat TCP-LISTEN:9223,fork,reuseaddr,bind=0.0.0.0 TCP:127.0.0.1:9222
```

Then address it by IP from inside the container. Find the host's address from the
container's point of view:

- Docker Desktop (macOS/Windows): `getent hosts host.docker.internal` prints the IP.
  Docker on Linux: start the container with `--add-host=host.docker.internal:host-gateway`
  first, or use the bridge gateway from `ip route | awk '/default/ {print $3}'`.
- Apple `container` (apfelkäfig): the host is the default gateway of the container's
  subnet, usually `192.168.64.1`. `ip route | awk '/default/ {print $3}'` prints it.
- Devcontainers: same as Docker; `forwardPorts` goes the other way (container to host)
  and does not help here.

Use the IP, not the name, in the MCP URL inside the container:

```sh
claude mcp add -s user chrome-devtools -- npx -y chrome-devtools-mcp@latest --browser-url http://192.168.64.1:9223
```

Verify from inside the container:

```sh
curl -s http://192.168.64.1:9223/json/version
```

The `webSocketDebuggerUrl` must start with `ws://192.168.64.1:9223/`. If the IP changes
between runs, resolve it in the launcher (e.g. `start.sh` writes the project's `.mcp.json`
with the current gateway).

`bind=0.0.0.0` exposes the port on every host interface, including Wi-Fi. Bind to the
container network's interface instead when it has a fixed address (e.g.
`bind=192.168.64.1`), or stop socat when done.

### 3b. Forward by hostname (Host-rewriting proxy)

When the MCP URL must be a name such as `host.docker.internal:9223`, Chrome rejects the
Host header, so a tiny HTTP proxy rewrites it and fixes the URLs in `/json` responses.
This is the historical "chrome-bridge" script; it runs on the host and replaces socat.

```sh
#!/bin/bash
# Chrome on :9222 plus a CDP proxy on 0.0.0.0:9223 that presents itself as
# $CDP_HOST (default host.docker.internal:9223) to clients in containers.
set -e
CDP_HOST="${CDP_HOST:-host.docker.internal:9223}"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug-profile "$@" &
CHROME_PID=$!
sleep 2
CDP_HOST="$CDP_HOST" node -e '
const http = require("http"), net = require("net");
const pub = process.env.CDP_HOST;
const server = http.createServer((req, res) => {
  const up = http.request({ hostname: "127.0.0.1", port: 9222, path: req.url, method: req.method,
    headers: { ...req.headers, host: "localhost:9222" } }, (u) => {
    let body = ""; u.on("data", (c) => body += c);
    u.on("end", () => {
      body = body.replace(/localhost:9222/g, pub);
      res.writeHead(u.statusCode, { ...u.headers, "content-length": Buffer.byteLength(body) });
      res.end(body);
    });
  });
  up.on("error", (e) => { res.writeHead(502); res.end(e.message); });
  req.pipe(up);
});
server.on("upgrade", (req, socket, head) => {
  const up = net.connect(9222, "127.0.0.1");
  up.write(req.method + " " + req.url + " HTTP/1.1\r\n" +
    Object.entries(req.headers).map(([k, v]) => k.toLowerCase() === "host" ? k + ": localhost:9222" : k + ": " + v).join("\r\n") + "\r\n\r\n");
  if (head.length) up.write(head);
  socket.pipe(up); up.pipe(socket);
  up.on("error", () => socket.destroy()); socket.on("error", () => up.destroy());
});
server.listen(9223, "0.0.0.0", () => console.log("CDP proxy on :9223 as " + pub));
' &
PROXY_PID=$!
trap "kill $PROXY_PID $CHROME_PID 2>/dev/null" EXIT
wait $CHROME_PID
```

The MCP inside the container then uses `--browser-url http://host.docker.internal:9223`.
Closing the Chrome window stops the proxy too.

### 3c. The app under test must be reachable from Chrome

Chrome runs on the host, so URLs are the host's view. A dev server listening inside the
container is invisible until its port is published (`-p 127.0.0.1:5173:5173` for Docker
and Apple container, `forwardPorts` in a devcontainer). Then the agent opens
`http://localhost:5173`, which is the host's localhost, not the container's. Tell the
agent this explicitly; it will otherwise report the server as down.

## 4. Agent on a remote dev server

Chrome stays on the laptop; the agent CLI runs on the server over SSH. Two tunnels, one
in each direction, both on loopback, so nothing is exposed and Chrome's Host check passes
(`localhost`):

```sh
ssh -R 9222:127.0.0.1:9222 -L 5173:127.0.0.1:5173 user@server
```

- `-R 9222:127.0.0.1:9222`: the server's `127.0.0.1:9222` leads back to the laptop's
  Chrome. The MCP on the server uses `--browser-url http://127.0.0.1:9222`, exactly as
  in the host case, so the same user-scope MCP config works in both places.
- `-L 5173:127.0.0.1:5173`: the laptop's `localhost:5173` reaches the dev server on the
  box, so the Chrome the agent drives can open the app under test. Add one `-L` per
  port the agent will visit (API, Datasette, Storybook).

Put both in `~/.ssh/config` so a plain `ssh server` carries them:

```
Host server
  RemoteForward 9222 127.0.0.1:9222
  LocalForward 5173 127.0.0.1:5173
```

Verify on the server: `curl -s http://127.0.0.1:9222/json/version`. If it fails with
"connection refused", Chrome is not running on the laptop or the tunnel is not up; a
reverse forward silently fails when the port is already taken on the server (`sshd` logs
"remote port forwarding failed"). Anyone with a shell on the server can use that port
while the tunnel is up, which is acceptable on a single-user box and not on a shared one.

Tailscale or another VPN does not remove the need for the reverse tunnel: Chrome still
listens on loopback only. The VPN only replaces the SSH hostname.

## 5. Checklist when the agent cannot see the browser

Work from the Chrome side outwards. Each step has one command.

1. Chrome is up with the flag: `curl -s http://127.0.0.1:9222/json/version` on the host.
   Nothing: Chrome was started without `--remote-debugging-port`, or another Chrome
   already owned the profile and the flag was ignored. Quit it and relaunch.
2. The forward answers from where the agent runs: the same `curl` against the forwarded
   address. "connection refused": socat, proxy or tunnel not running, or the wrong IP.
3. Status 500 with the Host header text: the agent is using a hostname. Switch to the IP
   (3a) or the rewriting proxy (3b).
4. `/json/version` works but the MCP hangs or lists no pages: the `webSocketDebuggerUrl`
   in the response points to an address the agent cannot reach (e.g. `localhost:9222`
   seen from a container). Use the IP in the `Host` the agent sends (3a) or the proxy
   (3b), which rewrites that URL.
5. The MCP works but every page errors: the app is served inside a container or on the
   remote box and is not forwarded to the machine Chrome runs on (3c, 4).

## Leave it in the project

Commit the launcher script and a line in the project's agent instructions: how to start
the browser, which address the MCP uses in each environment, and that the debug profile
is separate from the user's own. A future session, human or agent, should not have to
rediscover the Host header rule.
