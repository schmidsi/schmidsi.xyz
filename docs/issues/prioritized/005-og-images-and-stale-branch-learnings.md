# Issue 005: Open Graph Images, and Learnings From Stale Branches

**Status:** Open
**Created:** 2026-10-20

Five side branches were reviewed and deleted on 2026-10-20. None were merged. This issue keeps
what was worth learning from them, and plans the one feature still worth building: Open Graph
(OG) preview images for posts.

## What Was Deleted, and Why

| Branch | Last commit | Verdict |
|---|---|---|
| `dev` | `64ebb80` (2025-01) | Deno 2 switch plus Nextra teardown. Deno is dead, Nextra is long gone. |
| `migrate-to-app-router` | `197ed54` | Already fully merged into `main`. |
| `cursor/generate-open-graph-images-with-custom-options-bab5` | `06566bf` (2025-11) | OG attempt 1 plus a devcontainer WIP commit. |
| `cursor/generate-open-graph-images-with-custom-options-047f` | `319f4d9` (2025-11) | OG attempt 2. |
| `claude/add-feature-01FTPzuoqF8zgAEGt7ygJfJt` | `2640afb` (2025-11) | Attempt 2 plus a Satori fix. |

The SHAs stay in the local reflog for a while after deletion, so `git branch <name> <sha>`
recovers any of them if needed.

## Learnings

### Static export rules out request-time rendering

Both OG attempts ignored `output: 'export'`, and that is why neither could merge.

- Attempt 1 used `export const runtime = 'edge'`. There is no edge on IPFS.
- Attempt 2 used a route handler with `dynamic = 'force-dynamic'`, rendering on each request.
  There is no server on IPFS.

Anything that produces an image must run at build time and write a PNG into `out/`. Next.js
supports that with the `opengraph-image.tsx` file convention plus `generateStaticParams`.

### No new dependency is needed

Attempt 1 added `@vercel/og`. `next/og` exports the same `ImageResponse` (Satori + resvg) and
ships with Next.js, so it costs nothing. Attempt 2 got this right.

### Do not duplicate post metadata

Attempt 1 kept a hand-maintained `postMetadata` map in the image file, because the edge runtime
cannot read the filesystem. Every new post would need a second manual edit. Two posts written
since would already be missing from it. At build time on Node, `getPost()` from `lib/posts.ts` just works.

### Satori is not a browser

- Every element with more than one child needs `display: 'flex'`. The Claude branch fix
  (`502f162`) was exactly this: `inline-flex` is not supported.
- Styles are inline objects, not Tailwind classes.
- Site fonts (Figtree) are not available unless the `.ttf` is loaded and passed via the
  `fonts` option. Attempt 1 decided system sans-serif is fine for a first version. Agreed.

### Crawlers need absolute image URLs

`app/layout.tsx` sets no `metadataBase`, so OG image URLs would come out relative, and social
crawlers ignore relative `og:image` URLs. Set `metadataBase` to `https://ses.eth.limo`, the same
canonical domain as `SITE_URL` in `scripts/generate-rss.ts`.

### Keep the scope small

Both attempts grew a per-post override registry and a dev preview page with size presets and
fake Twitter/Facebook cards (130 to 260 lines). With four posts, that is speculative. A custom
image for one post is just a different `opengraph-image.tsx` branch on the slug, and the preview
tool is opening `/posts/<slug>/opengraph-image` in the browser during `pnpm dev`.

### Agent branches drift from the codebase

Attempt 2's `app/providers.tsx` reintroduced wagmi and react-query providers that the slim-down
pass (issue 002) removed. Agent branches based on old `main` silently carry old architecture
along. Review the diff against current `main`, not just the feature.

### Devcontainer WIP is moot

`06566bf` preserved Docker NAT rules in `init-firewall.sh` so dev server ports stay reachable.
`main` stopped running the firewall at container start (`91836ae`), so the fix does nothing now.
The one lasting idea is `corepack enable` in the Dockerfile so `pnpm` exists in the container,
with the version pinned via a `packageManager` field in `package.json` rather than the
hardcoded pnpm 9.12.2.

## Plan

1. `app/layout.tsx`: add `metadataBase: new URL('https://ses.eth.limo')`, switch the Twitter card
   to `summary_large_image`.
2. `app/posts/[slug]/opengraph-image.tsx`: `ImageResponse` from `next/og`, data from `getPost()`,
   `generateStaticParams` reusing `getAllPostSlugs()`. Export `size` (1200 by 630) and
   `contentType`. Next.js wires `og:image` and `twitter:image` into the page metadata itself.
3. `app/opengraph-image.tsx`: same for the homepage, static content.
4. Template: start from the Claude branch's `OgTemplate` layout (top bar with name and
   `ses.eth`, tag badge, large title, description, date footer, light slate gradient). Inline it
   in the image file until a second consumer exists.

### Open question

The image route segment is extensionless (`/posts/<slug>/opengraph-image`). Check how the static
export names that file, and whether eth.limo serves it with an `image/png` content type. If not,
the fallback is to have the file convention emit a `.png` path or generate PNGs in a build
script next to `generate-rss.ts`.

## Verification

1. `pnpm build`, then the PNGs exist under `out/` for every post and the homepage.
2. The `og:image` meta tag in `out/posts/<slug>/index.html` is an absolute `https://ses.eth.limo`
   URL.
3. After deploy and ENS update: `curl -sI` the image URL returns 200 with `image/png`.
4. Paste a post URL into a card validator (e.g. opengraph.xyz) and see the image.
