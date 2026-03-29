## Issue 003: OG Image Generation System

**Status:** ✅ COMPLETE  
**Created:** 2025-11-04  
**Completed:** 2025-11-04  
**Priority:** High  
**Goal:** Provide first-class Open Graph image generation with sensible defaults, easy customization, and a live preview workflow.

---

## 🎯 Objectives

1. Auto-generate OG images for all routable pages with minimal configuration.
2. Allow authors to opt into fully custom OG compositions via dedicated JSX entries.
3. Ship a preview surface with live reload to speed up iteration.
4. Keep dependencies low and align with existing Next.js 16 App Router patterns.

---

## 🧭 Proposed Approach

- **Default Renderer**: Use Next.js `ImageResponse` (`next/og`) to render a shared OG layout that mirrors each page's metadata (title, description, accent color). Reuse existing page data loaders where possible to avoid duplication.
- **Per-Route Overrides**: Introduce an optional `export const og = ...` contract or colocated `app/og/[slug]/page.tsx` files that can return a React tree for `ImageResponse`. Falling back to the shared renderer when no override is provided keeps adoption low-friction.
- **Preview Tooling**: Add a development-only route (e.g. `app/og-preview/[...path]/page.tsx`) that renders an `<img>` pointing at the OG endpoint and auto-refreshes on HMR so changes to JSX/MDX are reflected instantly.
- **Static + Dynamic Support**: Integrate with `generateStaticParams` so blog posts get prerendered OG assets while also handling dynamic routes (e.g. homepage) on demand at the edge.

---

## 🏗️ Implementation Plan

1. **Metadata Inventory**
   - Audit which routes already surface metadata (title/description) and extend `lib/posts.ts` as needed to expose OG-friendly data (hero image, excerpt).

2. **Shared OG Renderer**
   - Create `app/og/[...slug]/route.tsx` that resolves a request to a page slug, loads data (post content, homepage info), and returns an `ImageResponse` using a new `components/OgTemplate.tsx`.
   - Template will map the page's existing layout styles into 1200×630 dimensions.

3. **Custom JSX Overrides**
   - Maintain a registry in `lib/og.ts` (`overrideRenderers`) that maps slugs to custom renderer functions.
   - Document the API (props provided, fallback behavior) and ensure TypeScript types stay lightweight.

4. **Preview Surface**
   - Add `app/og-preview/[...slug]/page.tsx` that wraps the target OG URL in a responsive frame with controls for width/height presets.
   - Include notices about caching and how to copy the resulting URL for social sharing validation.

5. **Configuration & Metadata Hooks**
   - Extend `generateMetadata` in existing pages to include `openGraph.images` pointing at the new API route so social crawlers pick it up automatically.

6. **Docs & DX**
   - Update `README.md` and `docs/issues` with usage instructions and customization guide.
   - Add cookbook-style examples for blog posts and generic pages.

---

## 🧱 Library Choices

- **Primary:** `next/og` (`ImageResponse`) – officially supported by Vercel/Next.js, zero extra dependency, leverages the underlying `@vercel/og`/`satori` renderer.
- **Optional:** No additional libraries planned. If we later need typography beyond system fonts, we can self-host fonts and load via CSS inside the OG renderer.

This keeps us aligned with the "Low Dependencies, High Hackability" philosophy. Headless browser screenshot tools (e.g. Puppeteer/Playwright) are intentionally out-of-scope right now due to weight and maintenance cost.

---

## ❓ Open Questions & Assumptions

- **Visual Parity vs Screenshot**: Exact page screenshots would require a headless browser and large dependency footprint. The plan assumes a faithful recreation via shared React layouts using `next/og`. Confirm if this meets the "render the current page" expectation or if true screenshots are mandatory.
- **Route Coverage**: Do we need OG assets for non-blog routes (e.g. API docs) or is the scope limited to marketing/blog pages?
- **Caching Strategy**: Should OG images be regenerated on each request, or cached/statically generated during build for known slugs?

---

## ✅ Success Criteria

- Every published blog post returns an OG image generated via the default renderer.
- Authors can register a custom renderer in `lib/og.ts` and see their bespoke design in production.
- Visiting `/og-preview/posts/nouns` in dev shows a live-updating image when editing the corresponding OG JSX.
- No new third-party dependencies added; build stays fast and the Node runtime keeps `fs`-backed loaders working.
- Documentation explains how to opt into overrides and how the preview tool works.

---

## 🛠️ Outcome

- Added `app/og/[...slug]/route.tsx` (Node runtime) to hydrate OG payloads from `lib/posts.ts` and render the shared `OgTemplate` via `ImageResponse`.
- Created `lib/og.ts` to centralize dimensions, payload resolution, and a straightforward `overrideRenderers` map for custom JSX entries.
- Implemented `app/og-preview/[...slug]/page.tsx` plus a client-side control panel for presets, cache-busting refresh, and manual dimension tweaking.
- Updated `app/layout.tsx` to use the App Router metadata API; blog posts now advertise `/og/posts/{slug}` images through `generateMetadata`.
- Documented setup and override instructions in `README.md`, linked to the preview workflow, and captured final decisions here.

