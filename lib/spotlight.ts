import type { Post } from './posts.ts';
import type { Skill } from './skills.ts';

// The one piece of content currently shared on social media gets a box on the
// home page. That is simply the newest own post or skill: reposts were
// advertised elsewhere long ago, uncommitted skills have no date yet.
export interface Spotlight {
  kind: 'Post' | 'Skill';
  title: string;
  href: string;
  date: string;
  description: string;
}

export function pickSpotlight(
  posts: Pick<Post, 'slug' | 'title' | 'date' | 'description' | 'canonical'>[],
  skills: Pick<Skill, 'name' | 'description' | 'history'>[],
): Spotlight | undefined {
  const candidates: Spotlight[] = [
    ...posts
      .filter((post) => !post.canonical)
      .map((post) => ({
        kind: 'Post' as const,
        title: post.title,
        href: `/posts/${post.slug}`,
        date: post.date,
        description: post.description,
      })),
    ...skills
      .filter((skill) => skill.history)
      .map((skill) => ({
        kind: 'Skill' as const,
        title: skill.name,
        href: `/skills/${skill.name}`,
        date: skill.history.created,
        description: skill.description,
      })),
  ];
  return candidates.sort((a, b) => b.date.localeCompare(a.date))[0];
}
