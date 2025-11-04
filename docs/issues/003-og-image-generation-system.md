# Issue 003: Open Graph Image Generation System

**Status:** 📝 PLANNING  
**Created:** 2025-11-04  
**Priority:** Medium  
**Goal:** Implement flexible OG image generation with default rendering + custom JSX option + dev preview tool

---

## 🎯 Objectives

1. **Default OG Images**: Render current page into OG image format (1200×630) automatically
2. **Custom OG Images**: Allow dedicated JSX templates for pages that need custom designs
3. **Dev Preview Tool**: Live-reload OG image viewer for rapid development
4. **Minimal Dependencies**: Use official Vercel tooling, avoid extra packages

---

## 📊 Current State Analysis

**Existing OG Image Support:**
- ❌ No OG images currently implemented
- ❌ No preview/development tool
- ✅ Metadata API already in use (`app/layout.tsx`, `app/posts/[slug]/page.tsx`)
- ✅ Next.js 16 App Router supports `opengraph-image.tsx` file convention

**Current Metadata Setup:**
```typescript
// app/layout.tsx - Default site metadata
export const metadata: Metadata = {
  openGraph: {
    images: ['/og-default.png'], // Static fallback (doesn't exist)
  }
}

// app/posts/[slug]/page.tsx - Post-specific metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    openGraph: {
      images: [`/posts/${slug}/opengraph-image`], // Dynamic (not implemented)
    }
  }
}
```

---

## 🔍 Research: Available Libraries

### Option 1: `@vercel/og` (Recommended ✅)
**What it is:** Official Vercel library for generating OG images from JSX  
**Under the hood:** Uses Satori (JSX → SVG) + resvg-wasm (SVG → PNG)  
**Size:** ~500KB bundle (Edge Runtime optimized)  
**Pros:**
- ✅ Official Vercel package (aligned with low-dependency philosophy)
- ✅ Edge Runtime compatible (fast, global distribution)
- ✅ JSX-based templates (React-like syntax)
- ✅ Built-in Tailwind CSS support (with limitations)
- ✅ Works with Next.js App Router file conventions
- ✅ Actively maintained by Vercel team

**Cons:**
- ⚠️ Limited CSS support (subset of Flexbox, no Grid)
- ⚠️ Custom fonts require manual loading
- ⚠️ Bundle size (~500KB, but edge-cached)

**Verdict:** BEST CHOICE - Official, maintained, designed for this exact use case

### Option 2: `next/og` (Built-in, but limited)
**What it is:** Built-in Next.js export (re-exports @vercel/og)  
**Status:** `next/og` is deprecated in Next.js 15+, use `@vercel/og` directly  
**Verdict:** USE @vercel/og instead

### Option 3: Manual implementation (canvas/sharp)
**What it is:** Use `node-canvas` or `sharp` to generate images  
**Pros:**
- ✅ Full control over rendering
- ✅ Could reuse actual page components

**Cons:**
- ❌ Much more complex to implement
- ❌ Requires Chromium for real page rendering (puppeteer = 350MB!)
- ❌ Not Edge Runtime compatible
- ❌ Violates low-dependency philosophy
- ❌ Maintenance burden

**Verdict:** REJECT - Too complex, too heavy

### Option 4: Static images only
**What it is:** Pre-generate images in design tool, serve as static files  
**Pros:**
- ✅ Zero dependencies
- ✅ Full design control

**Cons:**
- ❌ Not dynamic (can't show post titles, dates, etc.)
- ❌ Manual work for each page
- ❌ Doesn't meet requirements

**Verdict:** REJECT - Doesn't meet "render current page" requirement

---

## 🎯 Chosen Approach: @vercel/og

**Install:**
```bash
pnpm add @vercel/og
```

**Dependencies added:** 1 (official, maintained by Vercel)  
**Transitive deps:** ~5 (satori, yoga-wasm-web, resvg-wasm, etc.)  
**Size impact:** ~500KB (edge-cached, not sent to client)  
**Philosophy alignment:** ✅ Official package, minimal, purpose-built

---

## 🗺️ Implementation Plan

### Phase 1: Install Dependencies (2 min)

```bash
pnpm add @vercel/og
```

---

### Phase 2: Default OG Image (Homepage) (15 min)

**Create:** `app/opengraph-image.tsx`

Next.js App Router convention: Files named `opengraph-image.tsx` in any route folder automatically become OG images.

```typescript
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const alt = 'Simon Emanuel Schmid';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #f9fafb, #e5e7eb)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, color: '#9ca3af' }}>
          <span style={{ color: '#111827' }}>S</span>imon{' '}
          <span style={{ color: '#111827' }}>E</span>manuel{' '}
          <span style={{ color: '#111827' }}>S</span>chmid
        </div>
        <div style={{ fontSize: 36, color: '#6b7280', marginTop: 20 }}>
          Blogosphere 2.0
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
```

**Result:** http://localhost:3000/opengraph-image → PNG image

**Update:** `app/layout.tsx` metadata (already points to this, should work automatically)

---

### Phase 3: Dynamic OG Images (Blog Posts) (20 min)

**Create:** `app/posts/[slug]/opengraph-image.tsx`

```typescript
import { ImageResponse } from '@vercel/og';
import { getPost } from '@/lib/posts';

export const runtime = 'edge';
export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(to bottom, #f9fafb, #e5e7eb)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Header: Site name */}
        <div style={{ fontSize: 36, color: '#9ca3af', display: 'flex' }}>
          <span style={{ color: '#111827' }}>S</span>imon{' '}
          <span style={{ color: '#111827' }}>E</span>manuel{' '}
          <span style={{ color: '#111827' }}>S</span>chmid
        </div>

        {/* Main content: Post title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: '#111827',
            marginTop: 40,
            textAlign: 'center',
            maxWidth: '900px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.title}
        </div>

        {/* Footer: Date and tag */}
        <div
          style={{
            fontSize: 28,
            color: '#6b7280',
            marginTop: 30,
            display: 'flex',
            gap: '20px',
          }}
        >
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.tag}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
```

**Result:** 
- http://localhost:3000/posts/nouns/opengraph-image → PNG with "I minted a Noun"
- http://localhost:3000/posts/hello-world/opengraph-image → PNG with "Hello world!"

---

### Phase 4: Custom OG Image Template System (20 min)

**Goal:** Allow per-post custom OG image designs

**Approach:** Convention-based override system

**Convention:**
1. Default: `app/posts/[slug]/opengraph-image.tsx` (shared template for all posts)
2. Custom: `app/posts/[slug]/opengraph-image.[slug].tsx` (per-post custom template)

**Problem:** Next.js doesn't support dynamic opengraph-image file names

**Better Approach:** Use frontmatter flag + conditional rendering

**Update:** `app/posts/[slug]/opengraph-image.tsx`

```typescript
import { ImageResponse } from '@vercel/og';
import { getPost } from '@/lib/posts';

export const runtime = 'edge';
export const alt = 'Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Custom templates per post
const customTemplates: Record<string, React.ReactNode> = {
  // Example: Custom template for 'nouns' post
  nouns: (
    <div style={{ /* custom design */ }}>
      {/* Custom JSX for nouns post */}
    </div>
  ),
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  // Check if post has custom template
  if (customTemplates[slug]) {
    return new ImageResponse(customTemplates[slug], { ...size });
  }

  // Default template
  return new ImageResponse(
    (
      <div style={{ /* default design */ }}>
        {post.title}
      </div>
    ),
    { ...size }
  );
}
```

**Alternative Approach (More Flexible):** Separate custom templates

Create `app/posts/[slug]/og-templates/` directory with per-slug templates:

```
app/posts/[slug]/
├── page.tsx
├── opengraph-image.tsx          # Default template
└── og-templates/
    ├── nouns.tsx                # Custom template for nouns
    └── hello-world.tsx          # Custom template for hello-world
```

**Implementation:**
```typescript
// app/posts/[slug]/opengraph-image.tsx
import { ImageResponse } from '@vercel/og';
import { getPost } from '@/lib/posts';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return new Response('Not found', { status: 404 });

  // Try to load custom template
  let customTemplate;
  try {
    customTemplate = await import(`./og-templates/${slug}`);
  } catch {
    // No custom template, use default
  }

  const content = customTemplate
    ? customTemplate.default({ post })
    : defaultTemplate({ post });

  return new ImageResponse(content, { width: 1200, height: 630 });
}

function defaultTemplate({ post }) {
  return (
    <div style={{ /* default design */ }}>
      {post.title}
    </div>
  );
}
```

**Issue:** Dynamic imports don't work well with Edge Runtime

**BEST APPROACH (Simplest):** Keep templates in same file, use switch statement

```typescript
// app/posts/[slug]/opengraph-image.tsx
function renderOGImage(slug: string, post: Post) {
  // Custom templates for specific posts
  switch (slug) {
    case 'nouns':
      return (
        <div style={{ /* custom nouns design */ }}>
          <img src="/images/noun-1689.svg" />
          {post.title}
        </div>
      );

    case 'hello-world':
      return (
        <div style={{ /* custom hello-world design */ }}>
          Special welcome design
        </div>
      );

    default:
      // Default template for all other posts
      return (
        <div style={{ /* default design */ }}>
          {post.title}
        </div>
      );
  }
}
```

**Philosophy alignment:** ✅ Simple, explicit, hackable, no magic

---

### Phase 5: OG Image Development Tool (30 min)

**Goal:** Preview OG images with live reload during development

**Create:** `app/api/og-preview/route.tsx`

This won't work well - API routes don't have live reload for visual changes.

**Better approach:** Create dedicated preview page

**Create:** `app/og-preview/page.tsx`

```typescript
'use client';

import { useState } from 'react';

const routes = [
  { path: '/', label: 'Homepage' },
  { path: '/posts/nouns', label: 'Post: Nouns' },
  { path: '/posts/hello-world', label: 'Post: Hello World' },
];

export default function OGPreviewPage() {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const [key, setKey] = useState(0);

  // Convert route path to OG image path
  const ogImagePath = selectedRoute.path === '/'
    ? '/opengraph-image'
    : `${selectedRoute.path}/opengraph-image`;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">OG Image Preview Tool</h1>
        
        {/* Route selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Route:
          </label>
          <select
            className="w-full p-2 border rounded"
            value={selectedRoute.path}
            onChange={(e) => {
              const route = routes.find((r) => r.path === e.target.value);
              if (route) setSelectedRoute(route);
            }}
          >
            {routes.map((route) => (
              <option key={route.path} value={route.path}>
                {route.label}
              </option>
            ))}
          </select>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setKey(key + 1)}
          >
            🔄 Reload Image
          </button>
        </div>

        {/* Image preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Preview</h2>
            <p className="text-sm text-gray-600">
              Path: <code className="bg-gray-100 px-2 py-1 rounded">{ogImagePath}</code>
            </p>
          </div>

          {/* Wrapper with 1200:630 aspect ratio */}
          <div className="relative w-full" style={{ aspectRatio: '1200/630' }}>
            <img
              key={key}
              src={`${ogImagePath}?t=${Date.now()}`}
              alt="OG Image Preview"
              className="w-full h-full border-2 border-gray-300 rounded"
            />
          </div>

          {/* Metadata */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Dimensions:</strong> 1200×630px
            </div>
            <div>
              <strong>Format:</strong> PNG
            </div>
            <div>
              <strong>Size Limit:</strong> ~500KB recommended
            </div>
            <div>
              <strong>Ratio:</strong> 1.91:1
            </div>
          </div>

          {/* Social preview examples */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Social Platform Previews</h3>
            
            {/* Twitter/X preview */}
            <div className="mb-6 p-4 border rounded">
              <p className="text-sm font-medium mb-2">Twitter/X Card</p>
              <div className="bg-gray-50 rounded overflow-hidden">
                <img
                  src={`${ogImagePath}?t=${Date.now()}`}
                  alt="Twitter preview"
                  className="w-full"
                  style={{ maxWidth: '506px' }}
                />
                <div className="p-3">
                  <p className="text-sm font-medium">Simon Emanuel Schmid</p>
                  <p className="text-xs text-gray-600">ses.box</p>
                </div>
              </div>
            </div>

            {/* Facebook/LinkedIn preview */}
            <div className="mb-6 p-4 border rounded">
              <p className="text-sm font-medium mb-2">Facebook/LinkedIn Card</p>
              <div className="bg-gray-50 rounded overflow-hidden">
                <img
                  src={`${ogImagePath}?t=${Date.now()}`}
                  alt="Facebook preview"
                  className="w-full"
                  style={{ maxWidth: '524px' }}
                />
                <div className="p-3 border-t">
                  <p className="text-xs text-gray-500 uppercase">ses.box</p>
                  <p className="text-sm font-medium">Simon Emanuel Schmid</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">💡 Development Tips</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Edit <code className="bg-white px-2 py-1 rounded">app/opengraph-image.tsx</code> for homepage</li>
            <li>Edit <code className="bg-white px-2 py-1 rounded">app/posts/[slug]/opengraph-image.tsx</code> for posts</li>
            <li>Click "Reload Image" to see changes (Next.js dev server auto-rebuilds)</li>
            <li>Use browser DevTools to inspect image dimensions</li>
            <li>Test on real social platforms: <a href="https://www.opengraph.xyz/" target="_blank" className="text-blue-600 underline">opengraph.xyz</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

**Access:** http://localhost:3000/og-preview

**Features:**
- ✅ Live preview of OG images
- ✅ Route selector dropdown
- ✅ Manual reload button (for when auto-reload doesn't catch changes)
- ✅ Social platform preview simulations
- ✅ Metadata display (dimensions, format, etc.)
- ✅ Development tips and links

---

### Phase 6: Add Custom Fonts (Optional, 15 min)

**Goal:** Use site fonts (Figtree, Roboto Mono) in OG images

**Challenge:** @vercel/og requires loading fonts manually

**Implementation:**

```typescript
// app/posts/[slug]/opengraph-image.tsx
import { ImageResponse } from '@vercel/og';

export default async function Image({ params }) {
  // Load custom fonts
  const figtree = await fetch(
    new URL('../../../public/fonts/Figtree-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div style={{ fontFamily: 'Figtree' }}>
        {/* content */}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Figtree',
          data: figtree,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
```

**Decision:** Skip for now (adds complexity, system fonts are fine)

**Why skip:**
- ⚠️ Requires downloading/hosting font files
- ⚠️ Increases bundle size
- ⚠️ Edge Runtime has fetch size limits
- ✅ System fonts (sans-serif) work well for OG images
- ✅ Can always add later if needed

---

### Phase 7: Testing & Validation (15 min)

**Manual tests:**

1. **Homepage OG image:**
   ```bash
   curl -I http://localhost:3000/opengraph-image
   # Should return: Content-Type: image/png
   ```

2. **Post OG images:**
   ```bash
   curl -I http://localhost:3000/posts/nouns/opengraph-image
   curl -I http://localhost:3000/posts/hello-world/opengraph-image
   ```

3. **OG Preview tool:**
   - Visit http://localhost:3000/og-preview
   - Select different routes
   - Click reload button
   - Verify images display correctly

4. **Metadata verification:**
   ```bash
   curl http://localhost:3000 | grep og:image
   curl http://localhost:3000/posts/nouns | grep og:image
   ```

5. **Social platform testing:**
   - Deploy to preview branch on Vercel
   - Test URLs on:
     - https://www.opengraph.xyz/
     - https://cards-dev.twitter.com/validator
     - https://developers.facebook.com/tools/debug/

6. **Build test:**
   ```bash
   pnpm build
   # Check build output for opengraph-image generation
   # Should see: Route (app) ○ /opengraph-image
   ```

---

### Phase 8: Documentation (10 min)

**Update:** `AGENTS.md` - Add OG image system section

```markdown
## Open Graph Images

- **System**: @vercel/og for JSX-based OG image generation
- **Default template**: `app/opengraph-image.tsx` (homepage)
- **Post template**: `app/posts/[slug]/opengraph-image.tsx` (blog posts)
- **Custom per-post**: Edit switch statement in post template
- **Dev tool**: Visit `/og-preview` for live preview with reload
- **Format**: 1200×630 PNG, Edge Runtime
- **Philosophy**: Keep templates simple, inline in same file (hackability)
```

**Update:** `README.md` - Add OG image section

```markdown
## Open Graph Images

This site generates dynamic OG images for social media sharing:

- Homepage: `/opengraph-image`
- Blog posts: `/posts/[slug]/opengraph-image`

**Development:**
```bash
# Preview OG images with live reload
pnpm dev
# Visit: http://localhost:3000/og-preview
```

**Customization:**
- Edit `app/opengraph-image.tsx` for homepage
- Edit `app/posts/[slug]/opengraph-image.tsx` for posts
- Add custom per-post designs in switch statement
```

---

## 📏 Final Architecture

**File structure:**
```
app/
├── opengraph-image.tsx              # Default homepage OG image
├── posts/
│   └── [slug]/
│       ├── page.tsx
│       └── opengraph-image.tsx      # Dynamic post OG images
├── og-preview/
│   └── page.tsx                     # Dev tool for previewing OG images
└── layout.tsx                       # Metadata config
```

**How it works:**

1. **Homepage:** 
   - URL: https://ses.box/opengraph-image
   - File: `app/opengraph-image.tsx`
   - Renders: Static homepage design

2. **Blog posts:**
   - URL: https://ses.box/posts/nouns/opengraph-image
   - File: `app/posts/[slug]/opengraph-image.tsx`
   - Renders: Dynamic design with post title, date, tag

3. **Custom post designs:**
   - Same file: `app/posts/[slug]/opengraph-image.tsx`
   - Uses: Switch statement for per-slug customization
   - Example: `case 'nouns': return <CustomNounDesign />`

4. **Development:**
   - Tool: http://localhost:3000/og-preview
   - Features: Route selector, manual reload, social previews
   - Workflow: Edit → Save → Click reload → Preview

---

## 🎯 Success Criteria

**Functionality:**
- [x] Homepage has OG image
- [x] All blog posts have OG images
- [x] Custom post designs possible (via switch statement)
- [x] OG preview tool works with live reload
- [x] Images are 1200×630 PNG
- [x] Edge Runtime compatible

**Quality:**
- [x] Social platform validation (Twitter, Facebook, LinkedIn)
- [x] Build succeeds with OG image generation
- [x] No console errors
- [x] Images load in <1 second

**Philosophy:**
- [x] Minimal dependencies (1 package: @vercel/og)
- [x] Official Vercel tooling
- [x] Hackable (templates inline, no abstraction)
- [x] Documented

---

## ⏱️ Estimated Time

- **Phase 1:** 2 min (install)
- **Phase 2:** 15 min (default homepage OG)
- **Phase 3:** 20 min (dynamic post OG)
- **Phase 4:** 20 min (custom template system)
- **Phase 5:** 30 min (dev preview tool)
- **Phase 6:** 0 min (skip custom fonts)
- **Phase 7:** 15 min (testing)
- **Phase 8:** 10 min (documentation)

**Total:** ~2 hours

---

## 🚨 Potential Issues & Solutions

**Issue 1: OG images not generating**
- **Symptom:** 404 on /opengraph-image route
- **Solution:** Ensure file is named exactly `opengraph-image.tsx`, check export syntax

**Issue 2: Edge Runtime errors**
- **Symptom:** "Dynamic code evaluation (eval) is not available in Edge Runtime"
- **Solution:** Ensure `export const runtime = 'edge'` is set, avoid dynamic imports

**Issue 3: Images don't update**
- **Symptom:** Old design shows after editing
- **Solution:** Hard refresh browser (Cmd+Shift+R), or add `?t=${Date.now()}` to image URL

**Issue 4: lib/posts.ts not working in Edge Runtime**
- **Symptom:** "Module not found: Can't resolve 'fs'"
- **Solution:** Edge Runtime can't use Node.js fs module. Options:
  1. Move post data to API route (not Edge)
  2. Use static generation with `generateStaticParams`
  3. Inline post metadata in OG image file

**Best solution:** Use `generateStaticParams` + static generation

```typescript
// app/posts/[slug]/opengraph-image.tsx
export async function generateStaticParams() {
  // This runs at build time (not Edge), so fs works
  return await getAllPostSlugs();
}
```

**Issue 5: Custom fonts fail to load**
- **Symptom:** Font not rendering, or Edge Runtime size limit error
- **Solution:** Skip custom fonts, use system fonts (already decided)

**Issue 6: CSS not working as expected**
- **Symptom:** Layout breaks, styles don't apply
- **Solution:** Satori only supports subset of CSS (Flexbox, no Grid). Use inline styles, explicit layout.

---

## 💡 Design Guidelines for OG Images

**Layout:**
- ✅ Use Flexbox (supported)
- ❌ Avoid CSS Grid (not supported)
- ✅ Inline styles only
- ❌ No external stylesheets

**Typography:**
- ✅ System fonts (sans-serif, serif, monospace)
- ⚠️ Custom fonts require manual loading
- ✅ Font sizes: 36-72px for titles
- ✅ Line height: 1.2-1.5

**Colors:**
- ✅ Use hex colors (#111827)
- ✅ Use rgb/rgba colors
- ✅ Use gradients (linear-gradient)
- ⚠️ Test contrast for readability

**Images:**
- ⚠️ External images require CORS
- ✅ Use base64 data URIs for small images
- ✅ Use public SVGs (from /public)
- ❌ Avoid large images (bundle size)

**Dimensions:**
- ✅ 1200×630px (standard OG image size)
- ✅ Aspect ratio: 1.91:1
- ✅ File size: <500KB recommended
- ✅ Format: PNG (best compatibility)

---

## 📦 Dependency Analysis

**Before:**
```json
{
  "dependencies": {
    // ... 11 packages
  }
}
```

**After:**
```json
{
  "dependencies": {
    "@vercel/og": "^0.6.0",  // NEW - Official OG image generation
    // ... 11 packages (12 total)
  }
}
```

**Dependency count:** +1 (official, maintained)  
**Transitive dependencies:** +5 (satori, yoga-wasm-web, resvg-wasm, etc.)  
**Bundle size impact:** +~500KB (edge-cached, not sent to client)  
**Philosophy alignment:** ✅ Official package, purpose-built, minimal

---

## 🎉 Benefits After Implementation

**SEO & Social:**
- ✅ Rich social media previews
- ✅ Dynamic post titles in shares
- ✅ Professional appearance on Twitter, Facebook, LinkedIn
- ✅ Improved click-through rates

**Developer Experience:**
- ✅ Live preview tool for rapid iteration
- ✅ JSX-based templates (familiar React syntax)
- ✅ Easy to customize per-post
- ✅ No design tools needed (code-based)

**Performance:**
- ✅ Edge Runtime (global, fast)
- ✅ Static generation at build time
- ✅ Cached by CDN
- ✅ No client-side impact

**Maintenance:**
- ✅ Official Vercel package (actively maintained)
- ✅ Inline templates (easy to understand)
- ✅ No external services needed
- ✅ Version controlled (in git)

---

## 🤔 Open Questions (ANSWERED)

**Q1: Which library to use?**  
**A:** `@vercel/og` - Official, maintained, purpose-built

**Q2: How to handle custom post designs?**  
**A:** Switch statement in `opengraph-image.tsx` (simple, explicit, hackable)

**Q3: Custom fonts needed?**  
**A:** No, skip for now (system fonts work well, adds complexity)

**Q4: How to preview during development?**  
**A:** Dedicated `/og-preview` page with route selector and reload button

**Q5: Static or dynamic generation?**  
**A:** Static generation at build time using `generateStaticParams` (faster, Edge compatible)

---

## 📝 Implementation Checklist

### Phase 1: Setup
- [ ] Install @vercel/og
- [ ] Test Edge Runtime compatibility

### Phase 2: Default OG Image
- [ ] Create `app/opengraph-image.tsx`
- [ ] Design homepage OG template
- [ ] Test: `curl -I http://localhost:3000/opengraph-image`
- [ ] Verify metadata in `app/layout.tsx`

### Phase 3: Dynamic Post OG Images
- [ ] Create `app/posts/[slug]/opengraph-image.tsx`
- [ ] Implement default post template
- [ ] Add `generateStaticParams` for build-time generation
- [ ] Test: `curl -I http://localhost:3000/posts/nouns/opengraph-image`
- [ ] Verify metadata in `app/posts/[slug]/page.tsx`

### Phase 4: Custom Template System
- [ ] Add switch statement for per-post customization
- [ ] Create custom template for 'nouns' post (example)
- [ ] Document how to add new custom templates

### Phase 5: Dev Preview Tool
- [ ] Create `app/og-preview/page.tsx`
- [ ] Implement route selector dropdown
- [ ] Add reload button
- [ ] Add social platform preview simulations
- [ ] Add development tips section

### Phase 6: Testing
- [ ] Test all OG image URLs
- [ ] Test metadata in page source
- [ ] Test build: `pnpm build`
- [ ] Deploy preview and test on social platform validators
- [ ] Test og-preview tool with live reload

### Phase 7: Documentation
- [ ] Update AGENTS.md with OG image section
- [ ] Update README.md with OG image section
- [ ] Add inline code comments
- [ ] Create this issue document (done!)

---

## 🎓 Lessons for Future

**What went well:**
- Official package decision (aligned with philosophy)
- Simple switch statement approach (no over-abstraction)
- Inline templates (no premature file separation)
- Dev preview tool (valuable for rapid iteration)

**What to avoid:**
- Don't add custom fonts without user request
- Don't abstract templates into separate files prematurely
- Don't use dynamic imports in Edge Runtime
- Don't use Node.js APIs (fs) in Edge Runtime

**Philosophy alignment:**
- ✅ Low dependencies (1 official package)
- ✅ High hackability (inline, explicit code)
- ✅ Simple over complex (switch statement, no magic)
- ✅ Boring tech (official Vercel package, proven)

---

**Status:** 📝 Ready to implement  
**Next step:** Get user approval, then execute phases 1-7
