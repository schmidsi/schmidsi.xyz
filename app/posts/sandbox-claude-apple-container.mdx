---
title: Sandbox Claude Code on Mac Without Docker Overhead
date: 2026-02-20
description: Using Apple Container to run Claude Code in a lightweight micro-VM sandbox on Apple Silicon
tag: claude, macos, containers
author: Claude Code
---

> This blog post was entirely written by Claude Code to summarize what we discovered together today. I proofread it and think it also makes sense to read as a human.

I use Claude Code daily for non-dev tasks — organizing a relocation, managing documents, drafting emails. The problem: Claude's built-in permission system is cumbersome. It asks the same questions over and over, and it's not real isolation. I once approved an inline Python script without fully reading it, and it modified files outside my project folder.

So you need `--dangerously-skip-permissions`. But running that on your bare machine is... dangerous.

The standard answer is Docker and DevContainers. It works, but it's slow. Docker Desktop boots a full Linux VM, eats 2–4 GB of RAM idle, and takes 10–30 seconds to start. For running a CLI tool in a sandbox, that's overkill.

## Apple Container: per-container micro-VMs

Since September 2025, macOS Tahoe ships with support for [Apple Container](https://github.com/apple/container) — Apple's open-source tool for running Linux containers using lightweight virtual machines, written in Swift and optimized for Apple Silicon.

The key difference from Docker: **each container gets its own micro-VM**. Docker on Mac runs one shared Linux VM and puts all your containers inside it. Apple Container spins up a dedicated lightweight VM per container. Better isolation, no shared daemon, sub-second startup.

First released at WWDC in June 2025, it's now at v0.9.0 (February 2026). Still pre-1.0, but the runtime is solid.

## The setup

Install Apple Container from [GitHub releases](https://github.com/apple/container/releases) (it's a `.pkg` — double-click to install). Then start the service:

```bash
container system start
```

Here's the Dockerfile — deliberately minimal since we're just sandboxing a CLI tool:

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

And the launch script:

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

That's it. Claude runs fully unleashed inside a micro-VM. It can read and write your project files (bind-mounted), access Downloads read-only, and reach the internet for the Claude API. It cannot touch anything else on your Mac.

## The comparison

| | Docker Desktop | OrbStack | Colima | Apple Container |
|---|---|---|---|---|
| **Startup** | ~10–30s | ~1s | ~5–10s | Sub-second |
| **Idle RAM** | 2–4 GB | 300–500 MB | ~400 MB | No daemon |
| **Isolation** | Shared VM | Shared VM | Shared VM | Per-container VM |
| **Cost** | Free (small co) | $8/mo commercial | Free (MIT) | Free |
| **Open source** | No | No | Yes | Yes (Apache 2.0) |

Docker Compose remains the gold standard for interoperability — if you need your setup to work on Linux and Windows too, stick with Docker. OrbStack is the best drop-in Docker replacement on Mac today if you want that compatibility with less overhead. Colima is the open-source alternative.

But if you're on Apple Silicon and just need hard isolation for a single container — Apple Container is the lightest option that exists.

## One gotcha: building images

As of v0.9.0, `container build` has a [known networking bug](https://github.com/apple/container/issues/656) — HTTP requests during builds get 403 errors. The workaround: build with Docker, push to a local registry, pull into Apple Container.

```bash
docker build -t claude-sandbox .devcontainer/
docker run -d --rm --name registry -p 5555:5000 registry:2
docker tag claude-sandbox localhost:5555/claude-sandbox
docker push localhost:5555/claude-sandbox
container image pull --scheme http localhost:5555/claude-sandbox
container image tag localhost:5555/claude-sandbox claude-sandbox
docker stop registry
```

You only need to do this once (or when you update the Dockerfile). Day-to-day, it's just `./start.sh` and you're in.

## Who this is for

If you use Claude Code for daily tasks — not heavy development, just the kind of work where you want to say "go do it" without babysitting permissions — and you're on a Mac with Apple Silicon running macOS 26+, this is the thinnest possible sandbox. No daemon eating RAM in the background, no VM you forgot to stop, no license fees. Just a micro-VM that starts in under a second and dies when you're done.

The whole stack (macOS Tahoe + Apple Container) has only existed since late 2025. It's very new, still pre-1.0, and has rough edges. But for this use case, it works today.
