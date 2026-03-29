# ses.box

Personal website and blog for ses.eth - a hackable Next.js playground embracing "Blogosphere 2.0".

## 🎯 Philosophy: Low Dependencies, High Hackability

This site is intentionally built with **minimal dependencies** to maximize:
- **Hackability**: Easy to understand, modify, and experiment with
- **Maintainability**: Fewer dependencies = fewer breaking changes
- **Control**: Direct access to Next.js primitives without abstractions
- **Learning**: Perfect playground for testing new ideas

We avoid heavy frameworks and stick to official, well-maintained packages:
- Next.js core features (no extra frameworks)
- Official next-mdx-remote (no static site generators)
- Standard Web3 libraries (wagmi, viem)

## Overview

Next.js 16 + App Router blog with Web3 integration. Features:

- Personal blog posts in MDX
- Dynamic OG images per page (default + custom overrides)
- Web3 identity (ENS, EFP, Bluesky/ATProto)
- Auto-generated RSS feeds
- Ethereum wallet connectivity

## Quick Start

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server at http://localhost:3000
pnpm build      # Build for production (generates RSS + builds Next.js)
pnpm start      # Start production server
```

## Architecture

### Technology Stack (Minimal by Design)

**Core:**
- Next.js 16 (App Router)
- TypeScript  
- React 18

**Content:**
- next-mdx-remote (official Next.js MDX support)
- gray-matter (frontmatter parsing)

**Styling:**
- Tailwind CSS
- @tailwindcss/typography

**Web3:**
- wagmi + viem (Ethereum)
- ethereum-identity-kit (ENS, EFP)

**State:**
- TanStack React Query

### Project Structure

```
app/                              # Next.js 16 App Router
├── layout.tsx                    # Root layout + metadata wiring
├── providers.tsx                 # Client-side providers (wagmi, react-query)
├── page.tsx                      # Homepage
├── og/[...slug]/route.tsx        # OG image generator (default template)
├── og-preview/[...slug]/page.tsx # OG preview tool with live reload controls
├── posts/
│   ├── hello-world.mdx           # Blog posts colocated with routes
│   ├── nouns.mdx
│   ├── _drafts-start-with-underscore.mdx
│   └── [slug]/
│       └── page.tsx              # Post route with inline MDX compilation
└── api/rss/route.ts             # RSS feed endpoint

components/                       # Reusable components
├── LoadingSpinner.tsx
└── OgTemplate.tsx                # Shared OG image layout

lib/                             # Utilities
├── posts.ts                     # Post fetching/parsing
└── og.ts                        # OG defaults + override registry

public/                          # Static assets
└── .well-known/
    └── atproto-did              # Bluesky verification

docs/issues/                     # Project documentation
```

## Content Management

### Writing Blog Posts

Create MDX files in `app/posts/` with frontmatter:

```yaml
---
title: Your Post Title
date: YYYY-MM-DD
description: Brief description for RSS/SEO
tag: comma, separated, tags
author: Your Name
---

Your content here in MDX...
```

### Drafts

Prefix filename with underscore: `_my-draft.mdx` - won't be published or included in RSS.

### Published Posts

1. **hello-world.mdx** (2024-01-15) - Blogosphere 2.0 philosophy
2. **nouns.mdx** (2025-10-24) - Noun #1689 minting story

## Open Graph Images

### Default generator

- Every page routes through `GET /og[/{path}]`, which renders the shared template in `components/OgTemplate.tsx`.
- Blog posts automatically pull title, description, tag, and date from frontmatter to populate the OG card.
- Query parameters `?width=` and `?height=` are accepted (320–2000px) for quick experimentation.

### Custom overrides

- To craft a bespoke design, add an entry to the `overrideRenderers` map in `lib/og.ts`.
- Each renderer receives the request context (segments, search params, desired width/height) and should return a React node rendered by `ImageResponse`.

```typescript
// lib/og.ts
overrideRenderers['posts/hello-world'] = ({ width, height }) => (
  <div
    style={{
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Figtree, sans-serif',
      fontSize: 72,
      background: '#0f172a',
      color: '#f8fafc',
    }}
  >
    Hello, Blogosphere 2.0!
  </div>
);
```

### Preview tool

- Run `pnpm dev` and open `http://localhost:3000/og-preview` for the homepage or append any path (e.g. `/og-preview/posts/nouns`).
- Toggle auto-refresh, switch between presets (1200×630, 1080×1080, 1080×1920), or punch in custom dimensions.
- The preview appends a cache-busting query param so changes to OG JSX show up instantly.

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

### RSS Feed

RSS is available as an API route at `/api/rss` and updates dynamically:
- Scans `app/posts/` for MDX files
- Excludes drafts (files starting with _)
- Includes post metadata and links
- Cached for 1 hour

### Production Build

```bash
pnpm build
# 1. Generates static pages for all posts
# 2. Creates optimized production bundle
# 3. RSS available at /api/rss
```

## Adding Dependencies

⚠️ **Think twice before adding dependencies!**

Ask yourself:
1. Can I implement this in ~100 lines of code?
2. Is this officially maintained (Next.js, React, Vercel teams)?
3. Does this have minimal sub-dependencies?
4. Will this still work in 2 years?

If unsure, implement it yourself. Code you control > code you don't.

## Configuration Files

- **next.config.ts**: Clean Next.js configuration
- **tailwind.config.js**: Custom theme with Figtree/Roboto Mono fonts
- **tsconfig.json**: TypeScript with path aliases (@/*)
- **.mcp.json**: Model Context Protocol (ethid-mcp)
- **AGENTS.md**: Instructions for AI coding assistants

## Development

### Code Style

- **Prettier**: 80 char width, trailing commas, single quotes
- **EditorConfig**: 2-space indents, LF line endings, UTF-8
- **TypeScript**: Relaxed strictness for hackability

### Key Features

**Homepage** - Client component (`app/page.tsx`) featuring:
- ENS identity display (ses.eth)
- EFP follower/following stats (live API fetch)
- Social links across platforms
- Blog post index

**Blog Posts** - Server components with:
- MDX rendering via next-mdx-remote
- Frontmatter metadata extraction
- Dynamic routing ([slug])
- Draft exclusion (underscore prefix)

## Identity & Verification

The site supports multiple decentralized identity standards:

- ENS primary name resolution
- Bluesky DID verification (`.well-known/atproto-did`)
- Ethereum Follow Protocol social graph
- Cross-platform identity linking

## Philosophy

This project embodies:
1. **Blogosphere 2.0**: Own your content, distribute everywhere
2. **Low Dependencies**: Simple > complex, boring > exciting
3. **Hackability**: Easy to fork, modify, experiment
4. **Web3 Native**: Decentralized identity without vendor lock-in

Perfect playground for testing ideas without framework overhead.

## Notes

- Font: https://fonts.google.com/specimen/Figtree
- EFP API: https://api.ethfollow.xyz
- Ethereum Identity Kit docs: /ethereumidentitykit/docs (Context7)
