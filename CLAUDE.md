# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build for production (generates RSS feed then builds Next.js)
- `pnpm start` - Start production server

## Architecture

This is a Next.js personal website/blog using Nextra as the static site generator with a custom theme.

### Key Components

- **Custom Theme**: `components/Theme.tsx` provides the layout wrapper for all MDX content pages. Uses Figtree font from Google Fonts.
- **Homepage**: `pages/index.tsx` is a standalone React component (not using Nextra theme) that displays the main landing page with social links.
- **Blog Posts**: MDX files in `pages/posts/` are automatically rendered using the custom theme. Each post requires frontmatter with title, date, description, tag, and author fields.
- **RSS Generation**: `scripts/gen-rss.js` runs during build to generate RSS feed from posts' frontmatter.

### Content Structure

- Blog posts go in `pages/posts/` as MDX files
- Draft posts can be placed in `pages/drafts/`
- The custom theme wraps all MDX content with consistent header/navigation
- Homepage is separate from the blog theme system

### Styling

- Tailwind CSS for styling with custom configuration
- Typography plugin enabled for prose content
- Custom font (Figtree) loaded via Next.js font optimization

# Other
- Ethereum Identity Kit library id on Context7: "/ethereumidentitykit/docs"
