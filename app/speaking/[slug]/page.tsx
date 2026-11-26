import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from '@/components/ExternalLink';
import { SiteHeader } from '@/components/SiteHeader';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import {
  getTalk,
  sourceLabel,
  talkContext,
  talks,
  talkSlug,
  youtubeRef,
} from '@/app/speaking/talks';
import { getTranscript } from '@/app/speaking/transcript';
import {
  getSlides,
  parseNotes,
  slideImagePath,
  splitUrls,
} from '@/app/speaking/slides';
import { alternates, SITE_URL } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return talks.map((talk) => ({ slug: talkSlug(talk) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const talk = getTalk(slug);
  if (!talk) return {};
  const description = `${talkContext(talk)}. Recording and transcript.`;
  return {
    title: talk.title,
    description,
    alternates: alternates(`/speaking/${slug}/`),
    openGraph: {
      title: talk.title,
      description,
      type: 'video.other',
      images: youtubeRef(talk) ? [posterPath(slug)] : undefined,
    },
  };
}

// Preview image, a local copy of the YouTube thumbnail (see YouTubeEmbed)
const posterPath = (slug: string) => `/images/talks/${slug}.jpg`;

// "PT1H16M47S", the format schema.org wants for durations
function isoDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s || !(h || m) ? `${s}S` : ''}`;
}

// Speaker notes mostly point to sources, so urls become links
function NoteText({ text }: { text: string }) {
  return splitUrls(text).map((part, i) =>
    part.url ? (
      <ExternalLink key={i} href={part.text}>
        {part.text}
      </ExternalLink>
    ) : (
      <Fragment key={i}>{part.text}</Fragment>
    ),
  );
}

export default async function TalkPage({ params }: Props) {
  const { slug } = await params;
  const talk = getTalk(slug);
  if (!talk) notFound();

  const video = youtubeRef(talk);
  const transcript = getTranscript(slug);
  const slides = getSlides(slug);

  // Lets search engines index the video and its transcript text
  const jsonLd = video &&
    transcript && {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: talk.title,
      description: `${talkContext(talk)}.`,
      uploadDate: transcript.uploaded,
      duration: isoDuration(transcript.durationSeconds),
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
      thumbnailUrl: `${SITE_URL}${posterPath(slug)}`,
      inLanguage: 'en',
      url: `${SITE_URL}/speaking/${slug}/`,
    };

  return (
    <div>
      <SiteHeader />
      <main className="prose mt-8 mb-8">
        <h1 className="mb-2">{talk.title}</h1>
        <p className="mt-0 text-sm text-gray-500">
          {talkContext(talk)}
          {talk.with && (
            <>
              {' · with '}
              {talk.with.map((person, i) => (
                <Fragment key={person.href}>
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
        </p>

        {video && (
          <YouTubeEmbed
            id={video.id}
            start={video.start}
            title={talk.title}
            poster={posterPath(slug)}
          />
        )}
        {talk.description && <p>{talk.description}</p>}
        <p>
          <ExternalLink href={talk.href}>{sourceLabel(talk)}</ExternalLink>
        </p>

        {slides && (
          <>
            <h2>Slides</h2>
            {slides.map((slide, i) => (
              <figure key={i} className="mb-10">
                {/* Plain img: static export without image optimization */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slideImagePath(slug, i)}
                  alt={slide.alt || `Slide ${i + 1}`}
                  width={1257}
                  height={707}
                  loading="lazy"
                  className="not-prose w-full border border-gray-200"
                />
                <figcaption className="not-prose mt-1 text-sm text-gray-500">
                  Slide {i + 1} of {slides.length}
                </figcaption>
                {slide.notes && (
                  <div className="mt-2">
                    {parseNotes(slide.notes).map((block, j) =>
                      block.kind === 'list' ? (
                        <ul key={j}>
                          {block.items.map((item, k) => (
                            <li key={k}>
                              <NoteText text={item} />
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={j} className="whitespace-pre-line">
                          <NoteText text={block.text} />
                        </p>
                      ),
                    )}
                  </div>
                )}
              </figure>
            ))}
          </>
        )}

        {transcript && (
          <>
            <h2>Transcript</h2>
            <p className="text-sm text-gray-500">
              Auto-generated by YouTube, so names and technical terms may be
              wrong. It also contains what the other people in the recording
              said.
              {transcript.from &&
                ' The video covers more than my part, the transcript starts where it begins.'}
            </p>
            {transcript.paragraphs.map((paragraph) => (
              <p key={paragraph.time}>
                <span className="text-sm text-gray-500 tabular-nums">
                  [{paragraph.time}]
                </span>{' '}
                {paragraph.text}
              </p>
            ))}
          </>
        )}

        <p>
          <Link href="/speaking/">All talks</Link>
        </p>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </main>
    </div>
  );
}
