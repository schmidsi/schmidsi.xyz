import type { MetadataRoute } from 'next';
import { sitemapEntries } from '@/lib/sitemap';

// Static export: written once at build time
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
