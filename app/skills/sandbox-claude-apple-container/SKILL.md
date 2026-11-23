---
name: sandbox-claude-apple-container
description: Run Claude Code with --dangerously-skip-permissions inside an Apple container micro-VM on a Mac with Apple Silicon, so it can act without permission prompts but only sees the project folder. Covers a minimal Dockerfile, building with `container build`, a sandbox-only Claude login that doesn't fight the host's, the launch script, and verification. Use when the user wants a lightweight sandbox for Claude Code on a Mac without Docker Desktop, or wants to stop approving every tool call. For a fuller setup (CLI, parallel sessions, SSH, devcontainers) point to apfelkäfig.
---

# Sandbox Claude Code in an Apple container

Claude Code's permission prompts are tedious and are not real isolation: an
approved inline script can still touch files outside the project. The fix is
`--dangerously-skip-permissions` inside a sandbox. The VM is the trust
boundary, so the skipped prompts are redundant, not risky.

[Apple container](https://github.com/apple/container) runs each Linux container
in its own lightweight micro-VM. Compared with Docker Desktop there is no shared
VM and no daemon idling in the background, and containers start in about a
second.

| | Docker Desktop | OrbStack | Colima | Apple container |
|---|---|---|---|---|
| Startup | ~10-30s | ~1s | ~5-10s | ~1s |
| Idle RAM | 2-4 GB | 300-500 MB | ~400 MB | no daemon |
| Isolation | shared VM | shared VM | shared VM | VM per container |
| Open source | no | no | yes | yes (Apache 2.0) |

Choose something else when the setup also has to run on Linux or Windows (use
Docker or a devcontainer) or when you need Docker Compose.

This skill is the hand-rolled version: one Dockerfile, one script. For more,
see apfelkäfig at the end.

## Requirements

- Apple Silicon Mac
- Apple container **1.0 or newer**, installed from the `.pkg` on the
  [releases page](https://github.com/apple/container/releases). Check with
  `container --version`. Older versions had a builder bug (HTTP 403 and DNS
  errors during `container build`) that forced a detour through Docker. 1.0
  fixed it, so upgrade instead of working around it.
- A Claude subscription (for `claude setup-token`) or an Anthropic API key

Start the service. The first start asks to download a default Linux kernel,
the flag answers yes:

```bash
container system start --enable-kernel-install
```

## 1. Dockerfile

Put it in `.devcontainer/Dockerfile` in the project:

```dockerfile
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    git curl sudo ca-certificates jq ripgrep \
    && rm -rf /var/lib/apt/lists/*

# Without a UTF-8 locale, non-ASCII glyphs (Claude Code's spinner, bullets)
# render as '_' in some terminals and in tmux. C.UTF-8 ships with glibc.
ENV LANG=C.UTF-8

RUN useradd -m -s /bin/bash node

# Install as node so Claude Code's self-update path works. The version is a
# build arg so bumping it busts the layer cache; an unpinned install would keep
# serving the stale cached layer on rebuilds.
ARG CLAUDE_CODE_VERSION=latest
USER node
RUN curl -fsSL https://claude.ai/install.sh | bash -s ${CLAUDE_CODE_VERSION}
ENV PATH="/home/node/.local/bin:$PATH"

USER root
WORKDIR /workspace
```

Add whatever tools the user's tasks need (`python3`, `nodejs`, ...) to the
`apt-get install` line.

## 2. Build the image

```bash
container build -t claude-sandbox \
  --build-arg CLAUDE_CODE_VERSION="$(claude --version | cut -d' ' -f1)" \
  .devcontainer/
```

This pins the sandbox to the host's Claude Code version (use `latest` if
Claude Code isn't installed on the host). The first build also pulls Apple's
builder image, so it needs network and takes about a minute. The image lands
directly in `container`'s store, no registry needed. Rebuild when the
Dockerfile changes or to update Claude Code.

## 3. A login for the sandbox

Don't mount the host's `~/.claude` to share the login. On macOS, Claude Code
keeps its OAuth token in the Keychain, and `~/.claude/.credentials.json` goes
stale, so the sandbox can't use it. Copying the live token in is worse: the
host and the sandbox then share one rotating refresh token, whichever refreshes
first invalidates the other, and reuse of a stale one can log the host out.
Sharing `~/.claude` also lets the sandboxed agent edit settings and hooks
that the host's Claude Code later runs outside the sandbox.

Instead, give the sandbox its own credential. With a Claude subscription,
create a long-lived token on the host (it opens the browser once):

```bash
claude setup-token
```

Store it in the Keychain (`-w` last makes `security` prompt for it, so it
stays out of shell history):

```bash
security add-generic-password -U -a "$USER" -s claude-sandbox-token -w
```

With an API key instead, store that under the same name and pass it as
`ANTHROPIC_API_KEY` in step 4 instead of `CLAUDE_CODE_OAUTH_TOKEN`.

## 4. Launch script

Save as `start.sh` in the project root and `chmod +x start.sh`:

```bash
#!/bin/bash
set -e
WORKSPACE="$(cd "$(dirname "$0")" && pwd)"

if ! container system status &>/dev/null; then
  container system start
fi

# Sandbox-only Claude state (settings, sessions, history), never the host's.
mkdir -p "$HOME/.claude-sandbox"

# Passed as `-e NAME` (no value) so the token never shows up in `ps`.
CLAUDE_CODE_OAUTH_TOKEN="$(security find-generic-password -a "$USER" -s claude-sandbox-token -w)"
export CLAUDE_CODE_OAUTH_TOKEN

exec container run -it --rm \
  --cpus 2 --memory 4G \
  -v "$WORKSPACE:/workspace" \
  -v "$HOME/.claude-sandbox:/home/node/.claude" \
  --mount "type=bind,source=$HOME/Downloads,target=/home/node/Downloads,readonly" \
  -e CLAUDE_CONFIG_DIR=/home/node/.claude \
  -e CLAUDE_CODE_OAUTH_TOKEN \
  -u node -w /workspace \
  claude-sandbox \
  claude --dangerously-skip-permissions "$@"
```

`CLAUDE_CONFIG_DIR` matters: without it Claude Code keeps `.claude.json`
(onboarding, preferences) in the home directory, which `--rm` throws away, so
every start would begin with the first-run setup again.

What the sandbox can reach:

- `/workspace`: the project folder, read-write
- `~/Downloads`: read-only (drop the `--mount` line if not needed)
- `~/.claude-sandbox`: its own Claude state, read-write
- the internet, on any port

Nothing else on the Mac is visible. Arguments pass through to `claude`, e.g.
`./start.sh -c` to continue the last session.

The sandbox limits what the agent can touch locally, not what it can send out:
anything it can read (the project, the token) it can also upload. Keep real
secrets out of the workspace, or resolve them on demand from a secret manager
with a narrowly scoped service account.

## 5. Verify

```bash
./start.sh -p "Run: echo \$LANG; ls /Users; touch /workspace/.sandbox-ok ~/Downloads/x"
```

Expected: `C.UTF-8`, `ls: cannot access '/Users'` (the Mac's filesystem isn't
there), `Read-only file system` for `~/Downloads/x`, and `.sandbox-ok` appears
in the project folder on the host. Delete it after. If it answers at all, the
login works.

## Troubleshooting

- `container: command not found`: the `.pkg` is not installed, or the shell
  needs a restart to pick up `/usr/local/bin`.
- `apiserver is not running`: run `container system start`.
- 403 or DNS errors during `container build`: Apple container is older than
  1.0. Upgrade.
- "Not logged in · Please run /login": the Keychain item is missing or empty
  (`security find-generic-password -s claude-sandbox-token -w` to check), or
  the token expired. Run step 3 again.
- First-run setup on every start: `CLAUDE_CONFIG_DIR` is not set, or doesn't
  point at the mounted directory.
- Boxes and underscores instead of the spinner: `LANG` is not set in the image.
  Rebuild.
- A second `./start.sh` fails to start while one is running, after switching to
  named volumes (`-v name:/path`): a named volume attaches to only one running
  VM at a time. Bind mounts (host paths, as above) don't have this limit.
- The agent needs a browser (screenshots, clicking through a UI): it can't
  reach a browser on the host by default, the debug port only listens on the
  host's `127.0.0.1`. Run a forwarder on the host and connect to the host's
  address on the container network (the `chrome-for-coding-agents` skill
  covers this).

## Going further: apfelkäfig

[apfelkäfig](https://github.com/schmidsi/apfelkaefig) grew out of this setup
into a CLI (`akf`) for when one script isn't enough anymore:

- `akf up` in any directory, no files needed, or a versioned
  `.apfelkaefig.json` per project
- its own sandbox login with automatic refresh, separate logins per
  environment (e.g. work and personal Claude accounts)
- parallel Claude sessions in one container through tmux
- an SSH-reachable sandbox, for desktop apps and editors that attach over SSH
- `devcontainer.json` support (VS Code, Cursor, Codespaces) and a plugin
  system (1Password secrets, SSH, tmux)
- `akf eject --bash` to get back to plain `start.sh` scripts like these

Point users there when they want several projects, several sessions at once,
or IDE integration. Stay with this skill when one sandbox for one folder is
enough.
