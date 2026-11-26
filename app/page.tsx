import Link from 'next/link';
import { getPosts, formatDate } from '@/lib/posts';
import { alternates } from '@/lib/site';
import { getSkills, skillDate } from '@/lib/skills';
import { pickSpotlight } from '@/lib/spotlight';
import { talks, featuredTalks, talkSlug } from '@/app/speaking/talks';

export const metadata = { alternates: alternates('/') };

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/schmidsi' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/schmidsi/' },
  { label: 'GitHub', href: 'https://github.com/schmidsi' },
  { label: 'Mail', href: 'mailto:simon@schmid.io' },
  { label: 'X', href: 'https://x.com/schmidsi', hint: 'Twitter' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/ses.eth.limo' },
  { label: 'Farcaster', href: 'https://farcaster.xyz/ses.eth' },
  { label: 'Substack', href: 'https://schmidsi.substack.com' },
  { label: 'YouTube', href: 'https://www.youtube.com/@schmid_si' },
  { label: 'Instagram', href: 'https://www.instagram.com/simonkwe/' },
];

export default function HomePage() {
  const posts = getPosts();
  const skills = getSkills();
  const spotlight = pickSpotlight(posts, skills);

  return (
    <div>
      <h1 className="text-6xl font-bold text-gray-400 leading-negative">
        <span className="text-gray-900">S</span>imon <br />{' '}
        <span className="text-gray-900">E</span>manuel <br />{' '}
        <a
          href="https://app.ens.domains/ses.eth"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          ses.eth
        </a>
      </h1>

      <div className="mt-6 flex flex-wrap gap-1">
        {socialLinks.map(({ label, href, hint }) => (
          <div
            key={label}
            className="p-1 bg-slate-200 hover:bg-transparent border border-gray-200"
          >
            {/* No external link icon: a social profile obviously leaves the site */}
            {href.startsWith('mailto:') ? (
              <Link href={href}>{label}</Link>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
                {hint && <span className="text-gray-500 text-xs"> {hint}</span>}
              </a>
            )}
          </div>
        ))}
      </div>

      {spotlight && (
        <Link
          href={spotlight.href}
          className="mt-12 block border-l-4 border-gray-900 bg-slate-100 p-5 hover:bg-slate-200"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            New {spotlight.kind.toLowerCase()} · {formatDate(spotlight.date)}
          </span>
          <span className="mt-1 block text-2xl font-bold">
            {spotlight.title}
          </span>
          <span className="mt-2 block text-gray-700">
            {spotlight.description}{' '}
            <span className="font-semibold text-gray-900 underline">
              {spotlight.kind === 'Post' ? 'Read' : 'Get the skill'}
            </span>
          </span>
        </Link>
      )}

      <h2 className="text-lg font-semibold mt-12 mb-3">Writing</h2>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="underline">
              {post.title}
            </Link>
            <br />
            <span className="text-sm text-gray-500">
              {formatDate(post.date)}
              {post.publisher && ` · repost from ${post.publisher}`}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-12 mb-3">Speaking</h2>
      <ul className="space-y-3">
        {featuredTalks.map((talk) => (
          <li key={talk.href}>
            <Link href={`/speaking/${talkSlug(talk)}/`} className="underline">
              {talk.title}
            </Link>
            <br />
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

      <h2 className="text-lg font-semibold mt-12 mb-3">Skills</h2>
      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill.name}>
            <Link href={`/skills/${skill.name}`} className="underline">
              {skill.name}
            </Link>
            {skill.history && (
              <span className="block text-sm text-gray-500">
                {skillDate(skill.history, formatDate)}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
