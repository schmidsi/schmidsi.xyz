---
name: sandbox-claude-apple-container
description: Run Claude Code with --dangerously-skip-permissions inside an Apple container micro-VM on a Mac with Apple Silicon and macOS 26 (Tahoe) or later, so it can act without permission prompts but only sees the project folder. Covers installing Apple container, a minimal Dockerfile, the launch script, and the workaround when `container build` fails with HTTP 403 errors. Use when the user wants a lightweight sandbox for Claude Code on a Mac without Docker Desktop, or wants to stop approving every tool call.
---

# Sandbox Claude Code in an Apple container

Claude Code's permission prompts are tedious and are not real isolation: an
approved inline script can still touch files outside the project. The fix is
`--dangerously-skip-permissions` inside a sandbox, so the agent can do anything
but only to what the sandbox exposes.

[Apple container](https://github.com/apple/container) runs each Linux container
in its own lightweight micro-VM. Compared with Docker Desktop there is no shared
VM and no daemon idling in the background, and containers start in under a
second.

| | Docker Desktop | OrbStack | Colima | Apple container |
|---|---|---|---|---|
| Startup | ~10-30s | ~1s | ~5-10s | under a second |
| Idle RAM | 2-4 GB | 300-500 MB | ~400 MB | no daemon |
| Isolation | shared VM | shared VM | shared VM | VM per container |
| Open source | no | no | yes | yes (Apache 2.0) |

Choose something else when the setup also has to run on Linux or Windows (use
Docker or a devcontainer) or when you need Docker Compose. Apple container is
for a single, hard-isolated container on Apple Silicon.

## Requirements

- Apple Silicon Mac with macOS 26 (Tahoe) or later
- Apple container, installed from the `.pkg` on the
  [releases page](https://github.com/apple/container/releases)
- Docker (or any OCI builder), only if `container build` fails, see below

Check the install and start the service:

```bash
container --version
container system start
```

## 1. Dockerfile

Put it in `.devcontainer/Dockerfile` in the project. It is deliberately minimal:
the image only has to run a CLI.

```dockerfile
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl sudo ca-certificates jq \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash node

USER node
RUN curl -fsSL https://claude.ai/install.sh | bash
ENV PATH="/home/node/.local/bin:$PATH"

USER root
WORKDIR /workspace
```

Add whatever tools the user's tasks need (`python3`, `nodejs`, ...) to the
`apt-get install` line.

## 2. Build the image

```bash
container build -t claude-sandbox .devcontainer/
```

If network requests during the build fail with HTTP 403 (a
[known bug](https://github.com/apple/container/issues/656), seen in v0.9.0),
build with Docker and move the image over through a throwaway local registry:

```bash
docker build -t claude-sandbox .devcontainer/
docker run -d --rm --name registry -p 5555:5000 registry:2
docker tag claude-sandbox localhost:5555/claude-sandbox
docker push localhost:5555/claude-sandbox
container image pull --scheme http localhost:5555/claude-sandbox
container image tag localhost:5555/claude-sandbox claude-sandbox
docker stop registry
```

Rebuild only when the Dockerfile changes.

## 3. Launch script

Save as `start.sh` in the project root and `chmod +x start.sh`:

```bash
#!/bin/bash
set -e
WORKSPACE="$(cd "$(dirname "$0")" && pwd)"

if ! container system status &>/dev/null; then
  container system start
fi

exec container run -it --rm \
  --cpus 2 --memory 4G \
  -v "$WORKSPACE:/workspace" \
  -v "$HOME/.claude:/home/node/.claude" \
  --mount "type=bind,source=$HOME/Downloads,target=/home/node/Downloads,readonly" \
  -e ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY}" \
  -u node -w /workspace \
  claude-sandbox \
  claude --dangerously-skip-permissions "$@"
```

What the sandbox can reach:

- `/workspace`: the project folder, read-write
- `~/Downloads`: read-only (drop the `--mount` line if not needed)
- `~/.claude`: Claude Code login, settings and history, read-write
- the internet, for the Claude API

Nothing else on the Mac is visible. Arguments pass through to `claude`, e.g.
`./start.sh -c` to continue the last session.

Caveat: `~/.claude` is shared with the host, so the sandboxed agent can change
settings and hooks that the host's Claude Code later runs unsandboxed. If that
matters, mount a separate directory (e.g. `$WORKSPACE/.claude-home`) and log in
once inside the container, or use only `ANTHROPIC_API_KEY`.

## 4. Verify

```bash
./start.sh -p "run: ls / && ls ~ && touch /workspace/.sandbox-ok"
```

The listing should show the container's Linux filesystem, not the Mac's, and
`.sandbox-ok` should appear in the project folder on the host. Delete it after.

## Troubleshooting

- `container: command not found`: the `.pkg` is not installed, or the shell
  needs a restart to pick up `/usr/local/bin`.
- `container run` hangs or errors on the first run: `container system start`
  was not run, or the default kernel download was declined. Run it again and
  accept.
- 403 errors during `container build`: use the Docker and local registry
  workaround above.
- Claude asks to log in on every start: `~/.claude` is not mounted, or the
  mount target does not match the container user's home (`/home/node`).

Apple container is pre-1.0 and changes fast. Check its release notes when a flag
or subcommand above does not behave as described.
