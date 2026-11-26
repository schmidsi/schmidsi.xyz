import { getPosts } from './posts.ts';
import { getSkills } from './skills.ts';
import { SITE_URL } from './site.ts';
import { talkContext, talks, talkSlug } from '../app/speaking/talks.ts';

// /llms.txt (https://llmstxt.org): a plain markdown map of the site for
// language models, so they find the content without parsing HTML
export function llmsTxt(): string {
  const list = (items: string[]) => items.join('\n');
  const posts = getPosts()
    .filter((post) => !post.canonical) // reposts live elsewhere first
    .map(
      (post) =>
        `- [${post.title}](${SITE_URL}/posts/${post.slug}/): ${post.description}`,
    );
  const talkLines = talks.map(
    (talk) =>
      `- [${talk.title}](${SITE_URL}/speaking/${talkSlug(talk)}/): ${talkContext(talk)}`,
  );
  const skills = getSkills().map(
    (skill) =>
      `- [${skill.name}](${SITE_URL}/skills/${skill.name}/): ${skill.description} Raw: ${SITE_URL}/skills/${skill.name}/SKILL.md`,
  );
  return `# Simon Emanuel

> Personal website of Simon Emanuel (ses.eth): blog posts, recordings of conference talks (each talk page has a full transcript), and agent skills.

## Posts

${list(posts)}

## Talks

${list(talkLines)}

## Skills

${list(skills)}
`;
}
