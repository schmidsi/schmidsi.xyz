# Issue 002: Slim Down Codebase & Eliminate Premature Abstractions

**Status:** ✅ COMPLETE  
**Created:** 2025-10-31  
**Completed:** 2025-10-31  
**Priority:** Medium  
**Goal:** Simplify codebase, remove unnecessary abstractions, improve hackability

---

## 🎯 Objectives

1. Inline single-use functions (reduce over-abstraction)
2. Colocate MDX content with routes (simplify mental model)
3. Remove unused/incomplete components
4. Improve code readability and maintainability

---

## 📊 Current State Analysis

**Total TypeScript files:** 9  
**Lines of code:** ~462 (excluding node_modules)

**File breakdown:**
```
112 lines - app/page.tsx (homepage)
 86 lines - components/FollowButton.tsx (UNUSED - has TODO)
 71 lines - lib/posts.ts (3 functions, used in 2 places)
 63 lines - app/posts/[slug]/page.tsx
 54 lines - app/layout.tsx
 33 lines - app/api/rss/route.ts
 18 lines - components/LoadingSpinner.tsx (used in 2 places)
 16 lines - lib/mdx.tsx (1 function, used in 1 place)
  9 lines - lib/wagmi.ts (1 export, used in 1 place)
```

---

## 🔍 Code Smells Identified

### 1. **Premature Abstraction: lib/mdx.tsx**
**Issue:** Single-use function in separate file  
**Location:** `lib/mdx.tsx` (17 lines)  
**Usage:** Only called once in `app/posts/[slug]/page.tsx`  
**Impact:** Adds mental overhead, forces file switching  

**Fix:** Inline into `app/posts/[slug]/page.tsx`

---

### 2. **Premature Abstraction: lib/wagmi.ts**
**Issue:** Trivial config in separate file  
**Location:** `lib/wagmi.ts` (9 lines)  
**Usage:** Only imported once in `app/layout.tsx`  
**Impact:** 9 lines of config don't warrant separate file  

**Fix:** Inline into `app/layout.tsx`

---

### 3. **Unnecessary Separation: content/posts/**
**Issue:** MDX files separated from their route  
**Location:** `content/posts/*.mdx` referenced by `app/posts/[slug]/`  
**Mental model:** Content lives far from where it's used  
**Hackability:** Harder to understand file → route relationship  

**Fix:** Move `content/posts/*.mdx` → `app/posts/*.mdx`  
Update path in `lib/posts.ts` to `app/posts/` instead of `content/posts/`

**Pros:**
- Content colocated with route
- Clear 1:1 mapping: `app/posts/nouns.mdx` → `/posts/nouns`
- Easier to understand for newcomers
- Follows Next.js App Router conventions

**Cons:**
- MDX files mixed with code files (but this is fine in App Router)

---

### 4. **Dead Code: components/FollowButton.tsx**
**Issue:** Component exists but never used  
**Location:** `components/FollowButton.tsx` (86 lines)  
**Usage:** Imported nowhere, commented out everywhere  
**Status:** Has TODO comment "implement EFP follow action"  
**Impact:** 20% of codebase is unused code  

**Decision needed:**
- **Option A:** Delete it (we can restore from git later)
- **Option B:** Keep it as reference for future EFP integration
- **Option C:** Move to `docs/code-snippets/` as example

**Recommendation:** Delete it. We have git history. YAGNI (You Aren't Gonna Need It).

---

### 5. **Potential Over-Abstraction: lib/posts.ts**
**Issue:** 3 functions, some arguably premature  
**Location:** `lib/posts.ts` (71 lines)  
**Usage:** Used in 2 files (RSS + post page)  

**Functions:**
1. `getPosts()` - Used in RSS route (✅ justified)
2. `getPost(slug)` - Used in post page (✅ justified)
3. `getAllPostSlugs()` - Used in generateStaticParams (✅ justified)

**Analysis:** Actually this file is FINE. All 3 functions are used, and having them centralized makes sense for:
- RSS feed generation
- Post page rendering
- Static generation

**Verdict:** KEEP as is (good abstraction, used in multiple places)

---

### 6. **Minor: Duplicate Filter Logic**
**Issue:** Filter chain could be simplified  
**Location:** `lib/posts.ts` lines 19-21, 64-67

```typescript
// Current (verbose)
.filter((fileName) => fileName.endsWith('.mdx'))
.filter((fileName) => !fileName.startsWith('_'))

// Could be (concise)
.filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
```

**Impact:** Minor, but shows pattern of being overly explicit  
**Verdict:** Low priority, but good example of being more concise

---

### 7. **Inconsistent Async Usage**
**Issue:** Some functions are `async` but don't use `await`  
**Location:** `lib/posts.ts` - `getPosts()`, `getPost()`, `getAllPostSlugs()`

All these functions are marked `async` but use synchronous `fs.readFileSync`. This is unnecessary - they could just be regular functions.

**Fix:** Remove `async` from functions that don't await anything, or switch to async `fs.promises`

---

## 🎯 Proposed Changes

### Change 1: Inline lib/mdx.tsx
**File:** `lib/mdx.tsx` → DELETE  
**Target:** `app/posts/[slug]/page.tsx`  

**Before:**
```typescript
import { compileMDX } from '@/lib/mdx';
...
const MDXContent = await compileMDX(post.content);
```

**After:**
```typescript
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
...
// Compile MDX to React component
const code = String(
  await compile(post.content, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm],
  }),
);
const { default: MDXContent } = await run(code, runtime);
```

**Impact:** -1 file, -3 lines (net savings after accounting for added import)

---

### Change 2: Inline lib/wagmi.ts
**File:** `lib/wagmi.ts` → DELETE  
**Target:** `app/layout.tsx`

**Before:**
```typescript
import { wagmiConfig } from '@/lib/wagmi';
```

**After:**
```typescript
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
});
```

**Impact:** -1 file, +4 lines in layout (but clearer)

---

### Change 3: Move content/posts/ → app/posts/
**Directories:**
- `content/posts/*.mdx` → DELETE directory
- `app/posts/*.mdx` → CREATE  

**Files to move:**
- `content/posts/hello-world.mdx` → `app/posts/hello-world.mdx`
- `content/posts/nouns.mdx` → `app/posts/nouns.mdx`

**Update:** `lib/posts.ts` line 5:
```typescript
// Before
const postsDirectory = path.join(process.cwd(), 'content/posts');

// After
const postsDirectory = path.join(process.cwd(), 'app/posts');
```

**New structure:**
```
app/posts/
├── hello-world.mdx          # Content
├── nouns.mdx                # Content
├── _draft-example.mdx       # Draft (underscore prefix)
└── [slug]/
    └── page.tsx             # Route handler
```

**Impact:** -1 directory level, clearer colocati on

---

### Change 4: Delete components/FollowButton.tsx
**File:** `components/FollowButton.tsx` → DELETE  
**Reason:** Unused, incomplete, can restore from git if needed  
**Impact:** -86 lines (-19% of codebase!)

---

### Change 5: Simplify lib/posts.ts (Optional)
**Remove unnecessary `async` keywords:**

```typescript
// Before
export async function getPosts(): Promise<Post[]> {
export async function getAllPostSlugs() {

// After
export function getPosts(): Post[] {
export function getAllPostSlugs() {
```

Keep `getPost()` as `async` for consistency with page.tsx expectations.

**Also simplify filters:**
```typescript
// Before
.filter((fileName) => fileName.endsWith('.mdx'))
.filter((fileName) => !fileName.startsWith('_'))

// After
.filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
```

**Impact:** Clearer, more concise

---

## 📏 Expected Results

**Before:**
```
9 TypeScript files
462 lines of code
3 directories (app/, lib/, components/)
86 lines unused code (FollowButton)
```

**After:**
```
7 TypeScript files (-2)
~350 lines of code (-112, -24%)
2 directories (app/, components/)
0 lines unused code
Simpler mental model
```

---

## 🎯 Migration Steps

### Step 1: Inline lib/mdx.tsx
1. Copy content from `lib/mdx.tsx` into `app/posts/[slug]/page.tsx`
2. Update imports
3. Delete `lib/mdx.tsx`
4. Test: `curl http://localhost:3000/posts/nouns`

### Step 2: Inline lib/wagmi.ts
1. Copy content into `app/layout.tsx`
2. Update imports
3. Delete `lib/wagmi.ts`
4. Test: `curl http://localhost:3000`

### Step 3: Move MDX files
1. `mv content/posts/*.mdx app/posts/`
2. Update `lib/posts.ts` path: `app/posts` instead of `content/posts`
3. `rmdir content/posts content` (if empty)
4. Test: `curl http://localhost:3000/api/rss`

### Step 4: Delete FollowButton
1. `rm components/FollowButton.tsx`
2. Test build: `pnpm build`

### Step 5: Simplify lib/posts.ts (Optional)
1. Remove unnecessary `async` keywords
2. Combine filter chains
3. Test: All routes still work

### Step 6: Update documentation
1. Update AGENTS.md if needed
2. Update README.md structure diagram

---

## ✅ Success Criteria

- [ ] Build succeeds: `pnpm build`
- [ ] Homepage works: http://localhost:3000
- [ ] Blog posts work: /posts/nouns, /posts/hello-world
- [ ] RSS works: /api/rss
- [ ] File count reduced by 2
- [ ] Line count reduced by ~20%
- [ ] No unused imports
- [ ] Clearer mental model

---

## 🚨 Risks & Mitigation

**Risk 1: Breaking blog posts**  
**Mitigation:** Test after each change, easy rollback with git

**Risk 2: Path issues after moving MDX**  
**Mitigation:** Update single line in `lib/posts.ts`, test RSS immediately

**Risk 3: Removing FollowButton we might need later**  
**Mitigation:** Git history preserves it, can restore in 10 seconds

---

## 💡 Philosophy Alignment

This refactoring embodies the "Low Dependencies, High Hackability" philosophy:

- ✅ **Less abstraction** - Inline single-use functions
- ✅ **Clearer structure** - Content colocated with routes
- ✅ **YAGNI** - Delete unused code
- ✅ **Obvious over clever** - Explicit over abstracted
- ✅ **Easy to understand** - Fewer files = simpler mental model

---

## 📝 Additional Code Smell Observations

### Potential Future Improvements (Not in scope)

1. **app/page.tsx (112 lines)** - Could extract EFP stats logic to custom hook
   - But: Only used once, so current approach is fine per our philosophy

2. **Multiple 'use client' boundaries** - Could be optimized
   - But: Clear and explicit is better than optimized

3. **Hardcoded social links** - Could be config file
   - But: Config files are abstractions. Hardcoded is hackable.

4. **LoadingSpinner component (18 lines)** - Could be inline
   - But: Used in 2 places, justified abstraction

**Verdict:** Current code after proposed changes will be at optimal hackability level.

---

## 🎓 Lessons Learned

1. **Abstraction is not free** - Every file has cognitive overhead
2. **Colocation aids understanding** - Keep related code together
3. **Delete > Comment out** - Unused code should be removed
4. **Simple > DRY** - Don't abstract until used 3+ times
5. **File count matters** - Fewer files = easier to navigate

---

## 🔄 Execution Order

1. ✅ Create this issue document
2. ✅ Delete FollowButton (biggest impact, least risk)
3. ✅ Inline lib/wagmi.ts (simple, clear benefit)
4. ✅ Inline lib/mdx.tsx (removes abstraction)
5. ✅ Move content/posts → app/posts (structural improvement)
6. ✅ Simplify lib/posts.ts filters (polish)
7. ✅ Test everything
8. ⏳ Commit

**Estimated time:** 20-30 minutes

---

## 📋 Checklist

### Preparation
- [x] Review current code one more time
- [x] Ensure dev server is running
- [x] Create checkpoint commit

### Execution
- [x] Delete components/FollowButton.tsx
- [x] Inline lib/wagmi.ts → app/layout.tsx
- [x] Inline lib/mdx.tsx → app/posts/[slug]/page.tsx
- [x] Move content/posts/*.mdx → app/posts/*.mdx
- [x] Update lib/posts.ts path reference
- [x] Delete empty content/ directory
- [x] Simplify filter chains in lib/posts.ts
- [x] Remove unused imports

### Validation
- [x] TypeScript compiles
- [x] Homepage loads
- [x] Both blog posts load
- [x] RSS feed works
- [x] `pnpm build` succeeds
- [x] No console errors

### Cleanup
- [x] Update AGENTS.md (file organization section)
- [x] Update README.md (structure diagram)
- [ ] Commit changes
- [x] Update this issue status to COMPLETE

---

## 🎯 Expected Outcome

**Cleaner codebase:**
- 7 files instead of 9 (-22%)
- ~350 lines instead of 462 (-24%)
- Simpler structure (2 directories instead of 3)
- Zero unused code
- Better colocation (MDX with routes)
- Easier to understand and hack

**Mental model improvement:**
```
Before: "Where's the MDX compiler? Oh, lib/mdx.tsx. Where's Wagmi config? Oh, lib/wagmi.ts."
After: "MDX compilation? Right here in the post page where it's used. Wagmi? In the layout where providers are."
```

This aligns perfectly with the hackability philosophy: **obvious beats clever, inline beats abstracted.**
