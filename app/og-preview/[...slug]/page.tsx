import type { Metadata } from 'next';
import { PreviewClient } from '@/app/og-preview/PreviewClient';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '@/lib/og';

interface PreviewPageProps {
  params: { slug?: string[] };
  searchParams?: Record<string, string | string[] | undefined>;
}

export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: PreviewPageProps): Metadata {
  const path = `/${(params.slug ?? []).join('/')}`.replace(/\/+$/, '') || '/';

  return {
    title: `OG Preview – ${path}`,
  };
}

export default function OgPreviewPage({ params, searchParams }: PreviewPageProps) {
  const segments = params.slug ?? [];
  const width = coerceDimension(searchParams?.width, OG_IMAGE_WIDTH);
  const height = coerceDimension(searchParams?.height, OG_IMAGE_HEIGHT);

  return <PreviewClient segments={segments} initialWidth={width} initialHeight={height} />;
}

function coerceDimension(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, 320), 2000);
}

