# ses.box

Personal website and blog for ses.eth - a Next.js-powered platform embracing the "Blogosphere 2.0" philosophy of content ownership with distributed presence.

## Overview

This is a **Next.js blog** built with Nextra that combines traditional blogging with Web3/blockchain integration. The site features:

- Personal blog posts in MDX format
- Web3 identity integration (ENS, EFP, Bluesky/ATProto)
- Ethereum wallet connectivity
- Auto-generated RSS feeds
- Custom Nextra theme

## Quick Start

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server at http://localhost:3000
pnpm build      # Build for production (generates RSS + builds Next.js)
pnpm start      # Start production server
```

## Architecture

### Technology Stack

- **Framework**: Next.js (latest) with TypeScript
- **Static Site Generation**: Nextra (^2.13.2) + custom theme
- **Styling**: Tailwind CSS + Typography plugin
- **Web3**: Wagmi + Viem for Ethereum integration
- **Identity**: ethereum-identity-kit, ENS, EFP
- **State Management**: TanStack React Query
- **Fonts**: Figtree (sans-serif), Roboto Mono (monospace)

### Project Structure

```
/
├── components/
│   ├── Theme.tsx              # Custom Nextra theme layout
│   ├── FollowButton.tsx       # Web3 wallet-connected follow button
│   └── LoadingSpinner.tsx     # Animated loading component
├── pages/
│   ├── index.tsx              # Homepage (custom React component)
│   ├── posts/                 # Published blog posts (MDX)
│   ├── drafts/                # Work-in-progress posts
│   └── _app.tsx               # App wrapper with Wagmi/Web3 setup
├── public/
│   ├── feed.xml               # Auto-generated RSS feed
│   └── .well-known/
│       └── atproto-did        # Bluesky domain verification
├── scripts/
│   └── gen-rss.js             # RSS generation script
├── CLAUDE.md                  # Project instructions for Claude Code
└── package.json
```

## Content Management

### Writing Blog Posts

Create MDX files in `pages/posts/` with frontmatter:

```yaml
---
title: Your Post Title
date: YYYY/MM/DD
description: Brief description for RSS/SEO
tag: comma, separated, tags
author: Your Name
---

Your content here...
```

### Drafts

Place work-in-progress posts in `pages/drafts/` to keep them out of the RSS feed and production build.

### Published Posts

1. **hello-world.mdx** (2024-01-15) - Blogosphere 2.0 philosophy
2. **nouns.mdx** (2025-10-24) - Noun #1689 minting story

## Web3 Integration

### Identity Protocols

- **ENS**: ses.eth resolution and display
- **EFP** (Ethereum Follow Protocol): Follower/following stats and social graph
- **Bluesky/ATProto**: Domain verification via DID
- **Lens Protocol**: Social profile integration
- **Farcaster**: Decentralized social presence

### Wallet Connection

The site uses Wagmi for Ethereum wallet connectivity:
- MetaMask support
- Follow button integration (pending EFP implementation)
- Mainnet RPC via public providers

## Build System

### RSS Generation

The build process automatically generates an RSS feed:

1. `scripts/gen-rss.js` scans `pages/posts/` for MDX files
2. Extracts frontmatter (title, date, description, tags, author)
3. Generates `public/feed.xml` in RSS 2.0 format
4. Next.js build runs after RSS generation

### Production Build

```bash
pnpm build
# 1. Generates RSS feed from posts
# 2. Builds Next.js application
```

## Configuration Files

- **next.config.js**: Nextra integration
- **tailwind.config.js**: Custom theme with Figtree font
- **tsconfig.json**: TypeScript (loose typing)
- **.mcp.json**: Model Context Protocol (ethid-mcp)
- **CLAUDE.md**: Instructions for Claude Code AI assistant

## Development

### Code Style

- **Prettier**: 80 char width, trailing commas, single quotes
- **EditorConfig**: 2-space indents, LF line endings, UTF-8
- **TypeScript**: Enabled with relaxed strictness

### Key Components

**Theme.tsx** - Wraps all blog posts with:
- Header navigation
- Figtree font application
- Tailwind prose styling
- Homepage link

**Homepage** - Standalone React component featuring:
- ENS identity display
- EFP follower/following stats (live API fetch)
- Social links (Farcaster, Telegram, GitHub, etc.)
- Follow button with wallet connection

## Identity & Verification

The site supports multiple decentralized identity standards:

- ENS primary name resolution
- Bluesky DID verification (`.well-known/atproto-did`)
- Ethereum Follow Protocol social graph
- Cross-platform identity linking

## Philosophy

This project embodies "Blogosphere 2.0" - owning your content while maintaining distributed presence across platforms. The integration of Web3 identity protocols demonstrates a commitment to decentralized, user-controlled digital identity.

## Notes

- Font: https://fonts.google.com/specimen/Figtree
- EFP API: https://api.ethfollow.xyz
- Ethereum Identity Kit docs: /ethereumidentitykit/docs (Context7)
