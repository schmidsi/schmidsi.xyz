# AGENTS.md

This file provides guidance to agentic coding agents working in this repository.

## Philosophy: Low Dependencies, High Hackability

⚠️ **CRITICAL**: This project intentionally minimizes dependencies.

Before suggesting ANY new dependency:
1. Check if it can be implemented in <100 lines of code → implement it yourself
2. Verify it's officially maintained (Next.js team, React team, Vercel, etc.)
3. Confirm it has minimal transitive dependencies
4. Consider maintenance burden over next 2+ years

**We prefer:**
- Writing code ourselves over adding packages
- Official packages over community packages  
- Boring, stable tech over exciting, new tech
- Understanding > abstraction

## Commands

- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build for production (static generation + RSS)
- `pnpm start` - Start production server
- `pnpm test` - Run script tests (`node --test`, no test framework)
- Scripts in `scripts/` are TypeScript run directly by Node (type stripping, no build step). Use erasable syntax only (no `enum`) and import with the `.ts` extension
- `pnpm run deploy` - Build, check, and pin to IPFS via Filebase (uploads first) and Filecoin, prints the Root CID. Succeeds if at least one provider worked. `PROVIDERS=Filebase pnpm run deploy` overrides the list
- `pnpm run publish [CID]` - Deploy, then point ses.eth at the CID (signed in the browser via browser-rpc, or with `ENS_SIGNER_KEY`). With a CID it only updates ENS. Always use `run`: bare `pnpm publish` and `pnpm deploy` are built-in pnpm commands
- `pnpm run storage [topup [amount]]` - Filecoin storage runway (USDFC in Filecoin Pay, days left, provider health). `topup` deposits wallet USDFC (default: all of it). omnipin never tops up after the first deploy, so this drains unless topped up. `publish` warns below 60 days or when the provider is down

## Naming

- The author is named only "Simon Emanuel" (titles, metadata, frontmatter, feeds). Never add "Schmid". Handles, URLs and email addresses stay as they are

## Code Style

- **Formatting**: Prettier enforced - single quotes, semicolons, trailing commas, 80 char width
- **Indentation**: 2 spaces (EditorConfig enforced)
- **TypeScript**: Enabled with `strictNullChecks` but not full strict mode (hackability > strictness)
- **Imports**: Use `@/*` path aliases, type imports with `import type`
- **Components**: Named exports for components, default exports for pages
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error Handling**: Try-catch with console.error for async operations
- **React**: Functional components with hooks, Server Components by default, 'use client' when needed
- **Styling**: Tailwind CSS with custom font variables (Figtree, Roboto Mono)

## Architecture Notes

- **Static export for IPFS** - `output: 'export'`, no server at runtime; interactivity is client-side JS only
- **Next.js 16 App Router** - Server Components run at build time and prerender to static HTML
- **MDX via @mdx-js/mdx** - Compiled inline in post page (no separate abstraction)
- **Content colocated with routes** - MDX files in `app/posts/` alongside route handlers
- **RSS at build time** - `scripts/generate-rss.ts` writes `public/rss.xml` before `next build`
- **`public/.well-known/atproto-did` is load-bearing** - Bluesky verifies the `ses.eth.limo` handle with it. Omnipin is patched (`patches/`) to keep dot-paths, and `scripts/check-pack.sh` fails the deploy if it goes missing
- **Client components only when needed** - 'use client' islands (e.g. EFP stats fetch)
- **Low dependency count** - Intentionally minimal for hackability and maintainability

## File Organization

- `app/` - Routes, pages, and MDX content (App Router)
  - `app/posts/*.mdx` - Blog posts colocated with routes (underscore prefix = draft)
  - `app/posts/[slug]/page.tsx` - Post route handler with inline MDX compilation
  - `app/skills/<name>/SKILL.md` - Agent skills (plain directories, copyable as-is), listed on the home page, rendered at `/skills/<name>/` and served raw at `/skills/<name>/SKILL.md`. Keep them generic: no assumptions about this app
- `components/` - Reusable React components
- `lib/` - Utility functions (posts)
- `public/` - Static assets
- `docs/issues/` - Issues as a kanban board, one folder per column: `backlog/`, `prioritized/`, `done/`, `dropped/`. Move a file with `git mv` to change its status. Numbers are global and never reused.

## Context & Resources

- Ethereum Identity Kit library on Context7: `/ethereumidentitykit/docs`
- EFP API: https://api.ethfollow.xyz

## When Making Changes

- Never ask for confirmation before changing files - just do it. We have git.
- Commit autonomously and often. Use `git -c user.email="simon+agent@schmid.io" -c user.name="Simon Agent" -c commit.gpgsign=false commit` to bypass 1Password/GPG signing.
- If git fails with "1Password: Could not connect to socket":
  1. Check if 1Password running: `ps aux | grep -i "1password" | grep -v grep | grep -v browser-helper`
  2. If not running: `open -a "1Password"`
  3. Wait a few seconds, then retry
- Simple is better than complex
- Keep it hackable - complexity is the enemy
- Write obvious code - clever code breaks
- Document WHY not WHAT - code shows what, comments show why
