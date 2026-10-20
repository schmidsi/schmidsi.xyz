import path from 'path';
import { getSkillAssets, getSkillNames, readSkillAsset } from '@/lib/skills';

// Serves skill assets at the same relative paths SKILL.md uses, so links work
// both on the rendered page and for agents fetching the raw SKILL.md URL.
export const dynamic = 'force-static';

const contentTypes: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

export function generateStaticParams() {
  return getSkillNames().flatMap((name) =>
    getSkillAssets(name).map((file) => ({ name, file })),
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string; file: string }> },
) {
  const { name, file } = await params;
  const type = contentTypes[path.extname(file)] ?? 'application/octet-stream';
  return new Response(new Uint8Array(readSkillAsset(name, file)), {
    headers: { 'content-type': type },
  });
}
