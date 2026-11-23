import { SiteHeader } from '@/components/SiteHeader';
import { featuredTalks, otherTalks, talkContext } from '@/app/speaking/talks';
import type { Talk } from '@/app/speaking/talks';

export const metadata = {
  title: 'Speaking',
  description:
    'Recordings of conference talks, workshops and panels by Simon Emanuel',
};

function TalkList({ talks }: { talks: Talk[] }) {
  return (
    <ul>
      {talks.map((talk) => (
        <li key={talk.href}>
          <a href={talk.href} target="_blank" rel="noopener noreferrer">
            {talk.title}
          </a>
          <br />
          <span className="text-sm text-gray-500">{talkContext(talk)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SpeakingPage() {
  return (
    <div>
      <SiteHeader />
      <main className="prose mt-8 mb-8">
        <h1>Speaking</h1>
        <p>Recordings of my conference talks, workshops and panels.</p>

        {/* Curated on top: whoever reviews a talk application skims */}
        <h2>Start here</h2>
        <TalkList talks={featuredTalks} />

        <h2>More recordings</h2>
        <TalkList talks={otherTalks} />
      </main>
    </div>
  );
}
