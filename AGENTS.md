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
- No test suite configured (keep it simple)

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

- **Next.js 16 App Router** - Modern, server-first architecture
- **MDX via @mdx-js/mdx** - Compiled inline in post page (no separate abstraction)
- **Content colocated with routes** - MDX files in `app/posts/` alongside route handlers
- **RSS as API Route** - `/api/rss` generates feed dynamically
- **Server Components by default** - Client components only when needed ('use client')
- **Low dependency count** - Intentionally minimal for hackability and maintainability

## File Organization

- `app/` - Routes, pages, and MDX content (App Router)
  - `app/posts/*.mdx` - Blog posts colocated with routes (underscore prefix = draft)
  - `app/posts/[slug]/page.tsx` - Post route handler with inline MDX compilation
- `components/` - Reusable React components
- `lib/` - Utility functions (posts)
- `public/` - Static assets
- `docs/issues/` - Project documentation and migration records

## Context & Resources

- Ethereum Identity Kit library on Context7: `/ethereumidentitykit/docs`
- EFP API: https://api.ethfollow.xyz

## When Making Changes

- Never ask for confirmation before changing files - just do it. We have git.
- But never commit without confirmation from user.
- If git fails with "1Password: Could not connect to socket":
  1. Check if 1Password running: `ps aux | grep -i "1password" | grep -v grep | grep -v browser-helper`
  2. If not running: `open -a "1Password"`
  3. Wait a few seconds, then retry
- Simple is better than complex
- Keep it hackable - complexity is the enemy
- Write obvious code - clever code breaks
- Document WHY not WHAT - code shows what, comments show why
