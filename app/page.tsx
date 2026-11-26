import Link from 'next/link';
import { ExternalLink } from '@/components/ExternalLink';
import { getPosts, formatDate } from '@/lib/posts';
import { getSkills, skillDate } from '@/lib/skills';
import { talks, featuredTalks, talkSlug } from '@/app/speaking/talks';

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/schmidsi' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/schmidsi/' },
  { label: 'GitHub', href: 'https://github.com/schmidsi' },
  { label: 'Mail', href: 'mailto:simon@schmid.io' },
  { label: 'X', href: 'https://x.com/schmidsi', hint: 'Twitter' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/ses.eth.limo' },
  { label: 'Substack', href: 'https://schmidsi.substack.com' },
];

export default function HomePage() {
  const posts = getPosts();
  const skills = getSkills();

  return (
    <div>
      <h1 className="text-6xl font-bold text-gray-400 leading-negative">
        <span className="text-gray-900">S</span>imon <br />{' '}
        <span className="text-gray-900">E</span>manuel <br />{' '}
        <ExternalLink
          href="https://app.ens.domains/ses.eth"
          className="hover:underline"
          iconClassName="ml-2 inline-block h-[0.3em] w-[0.3em] align-top"
        >
          ses.eth
        </ExternalLink>
      </h1>

      <div className="mt-6 flex flex-wrap gap-1">
        {socialLinks.map(({ label, href, hint }) => (
          <div
            key={label}
            className="p-1 bg-slate-200 hover:bg-transparent border border-gray-200"
          >
            {href.startsWith('mailto:') ? (
              <Link href={href}>{label}</Link>
            ) : (
              <ExternalLink href={href}>
                {label}
                {hint && <span className="text-gray-500 text-xs"> {hint}</span>}
              </ExternalLink>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mt-6">Writing</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="underline">
              {post.title}
            </Link>{' '}
            <span className="text-sm text-gray-500">
              {formatDate(post.date)}
              {post.publisher && ` · repost from ${post.publisher}`}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-6">Speaking</h2>
      <ul>
        {featuredTalks.map((talk) => (
          <li key={talk.href}>
            <Link href={`/speaking/${talkSlug(talk)}/`} className="underline">
              {talk.title}
            </Link>{' '}
            <span className="text-sm text-gray-500">
              {talk.event} {talk.year}
            </span>
          </li>
        ))}
        <li>
          <Link href="/speaking" className="underline">
            All {talks.length} recordings
          </Link>
        </li>
      </ul>

      <h2 className="text-lg font-semibold mt-6">Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name}>
            <Link href={`/skills/${skill.name}`} className="underline">
              {skill.name}
            </Link>
            {skill.history && (
              <span className="text-sm text-gray-500">
                {' '}
                {skillDate(skill.history, formatDate)}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
