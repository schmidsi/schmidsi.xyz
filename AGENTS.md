# AGENTS.md

This file provides guidance to agentic coding agents working in this repository.

## Commands

- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build for production (generates RSS feed then builds Next.js)
- `pnpm start` - Start production server
- No test suite configured

## Code Style

- **Formatting**: Prettier enforced - single quotes, semicolons, trailing commas, 80 char width
- **Indentation**: 2 spaces (EditorConfig enforced)
- **TypeScript**: Enabled with `strictNullChecks` but not full strict mode
- **Imports**: Type imports use `import type`, Next.js components imported from 'next/*'
- **Components**: Named exports for components (e.g., `export const LoadingSpinner`), default exports for pages
- **Naming**: camelCase for variables/functions, PascalCase for components, kebab-case for file names in pages/posts/
- **Error Handling**: Try-catch with console.error for async operations
- **React**: Functional components with hooks, Next.js 13+ patterns with Google Fonts optimization
- **Styling**: Tailwind CSS with custom font variables, Tailwind typography plugin for prose content

## Architecture Notes

- Next.js + Nextra static site with custom theme in `components/Theme.tsx`
- MDX blog posts in `pages/posts/` with frontmatter (title, date, description, tag, author)
- Homepage (`pages/index.tsx`) is standalone React, not using Nextra theme
- RSS generated during build via `scripts/gen-rss.js`
