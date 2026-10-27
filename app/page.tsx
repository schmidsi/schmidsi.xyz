import Link from 'next/link';
import { getPosts, formatDate } from '@/lib/posts';
import { getSkills } from '@/lib/skills';
import { EfpStats } from '@/components/EfpStats';

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/schmidsi' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/schmidsi/' },
  { label: 'GitHub', href: 'https://github.com/schmidsi' },
  { label: 'Mail', href: 'mailto:simon@schmid.io' },
  { label: 'X', href: 'https://x.com/schmidsi', hint: 'Twitter' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/ses.eth.limo' },
];

export default function HomePage() {
  const posts = getPosts();
  const skills = getSkills();

  return (
    <div>
      <h1 className="text-6xl font-bold text-gray-400 leading-negative">
        <span className="text-gray-900">S</span>imon <br />{' '}
        <span className="text-gray-900">E</span>manuel <br /> ses.eth
      </h1>

      <div className="mt-6 mb-6 text-sm text-gray-600">
        <Link
          href="https://app.ens.domains/ses.eth"
          className="hover:underline"
        >
          ses.eth
        </Link>
        {' · '}
        <EfpStats />
      </div>

      <div className="mt-6 flex flex-wrap gap-1">
        {socialLinks.map(({ label, href, hint }) => (
          <div
            key={label}
            className="p-1 bg-slate-200 hover:bg-transparent border border-gray-200"
          >
            <Link href={href}>
              {label}
              {hint && <span className="text-gray-500 text-xs"> {hint}</span>}
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mt-6">Read</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="underline">
              {post.title}
            </Link>{' '}
            <span className="text-sm text-gray-500">
              {formatDate(post.date)}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-6">Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name}>
            <Link href={`/skills/${skill.name}`} className="underline">
              {skill.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
