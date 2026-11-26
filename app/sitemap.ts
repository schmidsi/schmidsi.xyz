import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts';
import { getSkillNames } from '@/lib/skills';
import { talks, talkSlug } from '@/app/speaking/talks';

// Static export: written once at build time
export const dynamic = 'force-static';

// ses.eth via the eth.limo gateway, same as the RSS feed
const SITE_URL = 'https://ses.eth.limo';

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified: `new Date()` would change every build and with it the
  // IPFS CID of identical content
  const paths = [
    '/',
    '/speaking/',
    ...talks.map((talk) => `/speaking/${talkSlug(talk)}/`),
    // Reposts point their canonical elsewhere, sitemaps list canonical URLs only
    ...getPosts()
      .filter((post) => !post.canonical)
      .map(({ slug }) => `/posts/${slug}/`),
    ...getSkillNames().map((name) => `/skills/${name}/`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
