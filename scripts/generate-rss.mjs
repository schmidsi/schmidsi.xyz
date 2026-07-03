// Generates public/rss.xml at build time.
// API routes can't be statically exported (output: 'export'), so the feed is
// written as a plain file that gets copied into out/ and served by eth.limo.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import RSS from 'rss';

const SITE_URL = 'https://www.ses.box';
const postsDirectory = path.join(process.cwd(), 'app/posts');

function getPosts() {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_')) // drafts start with _
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const { data, content } = matter(
        fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'),
      );
      return { slug, content, ...data };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

const posts = getPosts();

const feed = new RSS({
  title: 'Simon Emanuel Schmid',
  description: 'Personal blog - Blogosphere 2.0',
  site_url: SITE_URL,
  feed_url: `${SITE_URL}/rss.xml`,
  language: 'en',
  // Newest post's date, not `new Date()`, so identical content yields an
  // identical feed — keeps the exported IPFS CID stable across rebuilds.
  pubDate: posts.length ? new Date(posts[0].date) : new Date(0),
});

for (const post of posts) {
  feed.item({
    title: post.title,
    description: post.description,
    url: `${SITE_URL}/posts/${post.slug}`,
    date: new Date(post.date),
    categories: post.tag.split(',').map((t) => t.trim()),
    author: post.author,
    custom_elements: [{ 'content:encoded': post.content }],
  });
}

// The `rss` lib hardcodes <lastBuildDate> to now with no opt-out; pin it to the
// same date as pubDate so the output (and thus the IPFS CID) stays stable.
const pubDate = (posts.length ? new Date(posts[0].date) : new Date(0)).toUTCString();
const xml = feed
  .xml({ indent: true })
  .replace(/<lastBuildDate>.*?<\/lastBuildDate>/, `<lastBuildDate>${pubDate}</lastBuildDate>`);

fs.writeFileSync(path.join(process.cwd(), 'public/rss.xml'), xml);
console.log('✓ Generated public/rss.xml');
