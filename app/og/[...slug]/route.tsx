import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import type { ReactElement } from 'react';
import { OgTemplate } from '@/components/OgTemplate';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, getOgOverrideRenderer, resolveDefaultPayload } from '@/lib/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const resolved = await params;
  const segments = (resolved.slug ?? []).filter(Boolean);
  const searchParams = request.nextUrl.searchParams;

  const width = clampDimension(searchParams.get('width'), OG_IMAGE_WIDTH);
  const height = clampDimension(searchParams.get('height'), OG_IMAGE_HEIGHT);

  const overrideRenderer = getOgOverrideRenderer(segments);

  if (overrideRenderer) {
    const element = await overrideRenderer({
      request,
      segments,
      searchParams,
      width,
      height,
    });

    return respond(element, width, height);
  }

  const payload = await resolveDefaultPayload(segments);
  const element = <OgTemplate {...payload} />;

  return respond(element, width, height);
}

function respond(element: ReactElement, width: number, height: number) {
  const response = new ImageResponse(element, {
    width,
    height,
  });

  response.headers.set('Cache-Control', 'no-store');
  return response;
}

function clampDimension(raw: string | null, fallback: number) {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);

  if (Number.isNaN(parsed)) return fallback;

  return Math.min(Math.max(parsed, 320), 2000);
}

