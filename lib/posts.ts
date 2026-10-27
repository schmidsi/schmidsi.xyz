import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'app/posts');

// gray-matter parses unquoted YAML dates as Date objects; normalize to YYYY-MM-DD
function toIsoDate(date: string | Date): string {
  return date instanceof Date ? date.toISOString().split('T')[0] : String(date);
}

// UTC keeps the baked-in date independent of the build machine's timezone,
// which keeps the static export (and thus the IPFS CID) reproducible
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tag: string;
  author: string;
  image?: string;
  // Where the post was shared, so readers can like, share or comment there
  engage: { label: string; href: string }[];
  content: string;
}

export function parsePost(slug: string, fileContents: string): Post {
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title,
    date: toIsoDate(data.date),
    description: data.description,
    tag: data.tag,
    author: data.author,
    image: data.image,
    engage: Object.entries(data.engage ?? {}).map(([label, href]) => ({
      label,
      href: String(href),
    })),
    content,
  };
}

export function getPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_')) // Exclude drafts with _
    .map((fileName) =>
      parsePost(
        fileName.replace(/\.mdx$/, ''),
        fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'),
      ),
    );

  // Sort by date descending
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    return parsePost(slug, fs.readFileSync(fullPath, 'utf8'));
  } catch {
    return null;
  }
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx$/, ''),
    }));
}
