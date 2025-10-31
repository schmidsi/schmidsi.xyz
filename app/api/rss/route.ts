import RSS from 'rss';
import { getPosts } from '@/lib/posts';

export async function GET() {
  const posts = getPosts();

  const feed = new RSS({
    title: 'Simon Emanuel Schmid',
    description: 'Personal blog - Blogosphere 2.0',
    site_url: 'https://www.ses.box',
    feed_url: 'https://www.ses.box/api/rss',
    language: 'en',
    pubDate: new Date(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://www.ses.box/posts/${post.slug}`,
      date: new Date(post.date),
      categories: post.tag.split(',').map((t) => t.trim()),
      author: post.author,
      custom_elements: [{ 'content:encoded': post.content }],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
