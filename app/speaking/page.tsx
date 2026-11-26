import { Fragment } from 'react';
import Link from 'next/link';
import { ExternalLink } from '@/components/ExternalLink';
import { SiteHeader } from '@/components/SiteHeader';
import {
  featuredTalks,
  interviews,
  otherTalks,
  talkContext,
  talkSlug,
} from '@/app/speaking/talks';
import type { Talk } from '@/app/speaking/talks';
import { alternates } from '@/lib/site';

export const metadata = {
  title: 'Speaking',
  description:
    'Recordings and transcripts of conference talks, workshops, panels, interviews and podcasts by Simon Emanuel',
  alternates: alternates('/speaking/'),
};

function TalkList({ talks }: { talks: Talk[] }) {
  return (
    // No bullets: each entry is two lines, the gap separates them
    <ul className="list-none pl-0 [&>li]:my-5 [&>li]:pl-0 [&>li]:leading-snug">
      {talks.map((talk) => (
        <li key={talk.href}>
          <Link href={`/speaking/${talkSlug(talk)}/`}>{talk.title}</Link>
          <span className="mt-1 block text-sm text-gray-500">
            {talkContext(talk)}
            {talk.with && (
              <>
                {' · with '}
                {talk.with.map((person, i) => (
                  <Fragment key={person.href}>
                    {/* nowrap keeps the comma next to the icon */}
                    <span className="whitespace-nowrap">
                      <ExternalLink href={person.href}>
                        {person.name}
                      </ExternalLink>
                      {i < talk.with!.length - 1 && ','}
                    </span>
                    {i < talk.with!.length - 1 && ' '}
                  </Fragment>
                ))}
              </>
            )}
          </span>
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
        <p>
          Recordings and transcripts of my conference talks, workshops, panels,
          interviews and podcasts.
        </p>

        {/* Curated on top: whoever reviews a talk application skims */}
        <h2>Start here</h2>
        <TalkList talks={featuredTalks} />

        <h2>More recordings</h2>
        <TalkList talks={otherTalks} />

        <h2>Interviews and podcasts</h2>
        <TalkList talks={interviews} />
      </main>
    </div>
  );
}
