'use client';

import { useState } from 'react';

// Click-to-play facade: nothing is requested from YouTube, no iframe, until
// the reader presses play. The preview image is a copy hosted on this site,
// downloaded once from YouTube, so showing it tells nobody anything. youtube-nocookie.com keeps even
// the loaded player free of tracking cookies until the video is started.
export function YouTubeEmbed({
  id,
  start = 0,
  title,
  poster,
}: {
  id: string;
  start?: number;
  title: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    const src =
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` +
      (start ? `&start=${start}` : '');
    return (
      <iframe
        src={src}
        title={title}
        className="aspect-video w-full"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="not-prose group relative block aspect-video w-full cursor-pointer overflow-hidden bg-gray-900 text-white"
    >
      {poster && (
        // Plain img: the site is a static export without image optimization
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 m-0 h-full w-full object-cover"
        />
      )}
      <span className="absolute inset-0 bg-black/50 group-hover:bg-black/40" />
      <span className="relative flex h-full flex-col items-center justify-center gap-3">
        <svg viewBox="0 0 24 24" className="h-16 w-16" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" />
          <path d="M10 8l6 4-6 4z" fill="currentColor" />
        </svg>
        <span className="font-semibold">Play video</span>
        <span className="text-sm text-gray-200">
          Loads the player from YouTube when you click
        </span>
      </span>
    </button>
  );
}
