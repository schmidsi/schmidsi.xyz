import type { NextRequest } from 'next/server';
import type { ReactElement } from 'react';
import { getPost } from '@/lib/posts';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export interface OgPayload {
  title: string;
  description?: string;
  badge?: string;
  footer?: string;
  accent?: string;
}

export interface OgRendererContext {
  request: NextRequest;
  segments: string[];
  searchParams: URLSearchParams;
  width: number;
  height: number;
}

export type OgRenderer = (context: OgRendererContext) => Promise<ReactElement> | ReactElement;

export const overrideRenderers: Record<string, OgRenderer> = {
  // Example:
  // 'posts/nouns': async ({ width, height }) => (
  //   <YourCustomComponent width={width} height={height} />
  // ),
};

export function getOgOverrideRenderer(segments: string[]) {
  const key = segments.join('/') || 'index';
  return overrideRenderers[key];
}

export async function resolveDefaultPayload(segments: string[]): Promise<OgPayload> {
  if (segments.length === 0) {
    return {
      title: 'Simon Emanuel Schmid',
      description: 'Personal website and blog - Blogosphere 2.0',
      footer: 'schmid.io',
      accent: '#0f172a',
    };
  }

  if (segments[0] === 'posts' && segments[1]) {
    const post = await getPost(segments[1]);
    if (post) {
      return {
        title: post.title,
        description: post.description,
        badge: post.tag,
        footer: formatDate(post.date),
        accent: '#1d4ed8',
      };
    }
  }

  const fallbackTitle = segments.map(capitalizeSegment).join(' / ');

  return {
    title: fallbackTitle || 'schmid.io',
    description: 'Personal website and blog - Blogosphere 2.0',
    footer: 'schmid.io',
    accent: '#0f172a',
  };
}

function capitalizeSegment(segment: string) {
  if (!segment) return segment;
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

