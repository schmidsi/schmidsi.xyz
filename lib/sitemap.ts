import fs from 'fs';
import { lastCommitDate } from './git.ts';
import { getPosts } from './posts.ts';
import { getSkills } from './skills.ts';
import { SITE_URL } from './site.ts';
import { talks, talkSlug } from '../app/speaking/talks.ts';

export interface SitemapEntry {
  url: string;
  lastModified?: string;
}

const newest = (dates: (string | undefined)[]) =>
  dates.filter(Boolean).sort().pop();

export function sitemapEntries(): SitemapEntry[] {
  // Reposts point their canonical elsewhere, sitemaps list canonical URLs only
  const posts = getPosts()
    .filter((post) => !post.canonical)
    .map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}/`,
      lastModified: lastCommitDate(`app/posts/${post.slug}.mdx`),
    }));
  const talkPages = talks.map((talk) => {
    const transcript = `app/speaking/transcripts/${talkSlug(talk)}.md`;
    return {
      url: `${SITE_URL}/speaking/${talkSlug(talk)}/`,
      lastModified: fs.existsSync(transcript)
        ? lastCommitDate(transcript)
        : undefined,
    };
  });
  const skills = getSkills().map((skill) => ({
    url: `${SITE_URL}/skills/${skill.name}/`,
    lastModified: skill.history?.updated,
  }));
  const speaking = {
    url: `${SITE_URL}/speaking/`,
    lastModified: newest([
      lastCommitDate('app/speaking/talks.ts'),
      ...talkPages.map((page) => page.lastModified),
    ]),
  };
  const pages = [speaking, ...talkPages, ...posts, ...skills];
  // The home page lists the newest of everything
  const home = {
    url: `${SITE_URL}/`,
    lastModified: newest(pages.map((page) => page.lastModified)),
  };
  return [home, ...pages];
}
