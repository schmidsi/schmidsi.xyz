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

const feed = new RSS({
  title: 'Simon Emanuel Schmid',
  description: 'Personal blog - Blogosphere 2.0',
  site_url: SITE_URL,
  feed_url: `${SITE_URL}/rss.xml`,
  language: 'en',
  pubDate: new Date(),
});

for (const post of getPosts()) {
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

fs.writeFileSync(
  path.join(process.cwd(), 'public/rss.xml'),
  feed.xml({ indent: true }),
);
console.log('✓ Generated public/rss.xml');
