---
name: syndicate
description: Cross-post a published blog post from app/posts to X, LinkedIn, Substack, Bluesky and Farcaster through the Aside browser, then add the resulting post links as "Engage" links at the bottom of the blog post and republish. Use when the user wants to share, cross-post or syndicate a post.
---

# Syndicate a post

Posting publishes under the user's name. Aside fills in each composer and
stops before the final click, so the user can review and tweak the drafts.
Nothing gets posted until the user says go.

## 0. Preconditions

- The post is live on https://ses.eth.limo/posts/<slug>/ (run
  `pnpm run publish` first). Every platform version links there, and link
  cards need the live preview image.
- Read `aside guide` once per session. Drive each platform with
  `aside exec` and watch the session, reporting every minute or so.

## 1. Write one version per platform

Source: `app/posts/<slug>.mdx`. Write each version, plus the image as
`image.png`, to `~/.aside/u/0/syndicate/<slug>/` and show all of them to the
user. Aside sessions run in their own working folder and their default
permission policy blocks reads outside `~/.aside`, so always give them
absolute paths into that folder. For uploads they copy the file into their
session folder first, which is fine.

| Platform  | Text | Links | Handles |
|-----------|------|-------|---------|
| X         | Full text if the account can post long text (check the composer's limit), otherwise a teaser of 280 characters at most | Only the blog URL, at the end | Keep the @handles |
| LinkedIn  | Full text | Only the blog URL, at the end | Drop the X handles ("Greg (@gregskril)" becomes "Greg"), then tag each person or company as a LinkedIn mention in the composer. Only tag confident matches, report the rest |
| Substack  | Full post, with title, subtitle (frontmatter description) and the image on top. Send it to subscribers by email | Keep the inline links, handles link to X | Keep them as links to x.com |
| Bluesky   | Teaser plus the blog URL. Posts are capped at 300 characters, and a thread of the full text reads worse than the link card | Only the blog URL | Drop them, X handles don't exist there |
| Farcaster | Full text in one cast if the account allows long casts (Pro), otherwise a thread of casts up to 1024 bytes each | Only the blog URL, at the end as "Full post with links: <url>". The engage links live on the blog | Drop them |

For every platform, turn markdown links into their plain link text, except
on Substack. Attach the frontmatter `image` (in `public/`) where the
composer allows it. Leave it off Bluesky and Farcaster, where the blog link
card shows it.

## 2. Draft and stop

Run one `aside exec` per platform in parallel. Each one opens the composer,
pastes the text, attaches the image and **stops before posting**. The
prompt must say that explicitly. If a platform isn't logged in, ask the
user to log in in Aside, then resume the session with
`aside session resume <id> "..."` (ids from `aside session list`). Each
session reports when it's done, so run them in the background and read
their output.


The user reviews and edits in the open composers. Wait for their go.

## 3. Post and collect links

The user usually posts from the reviewed composers themselves and sends the
links. Otherwise resume each session with "post it and return the URL of the
published post". Store canonical URLs without tracking parameters: resolve
short links (lnkd.in), and for Substack take `canonical_url` from
`https://<pub>.substack.com/api/v1/archive?sort=new&limit=3` instead of a
note link.

## 4. Engage links on the blog

Add the links to the post's frontmatter, in this order:

```yaml
engage:
  X: https://x.com/...
  LinkedIn: https://www.linkedin.com/...
  Substack: https://....substack.com/p/...
  Bluesky: https://bsky.app/profile/.../post/...
  Farcaster: https://farcaster.xyz/...
```

The post page renders them as an "Engage" line at the bottom. Commit, run
`pnpm test`, push, and run `pnpm run publish`. The user signs the ENS
transaction in the browser.
