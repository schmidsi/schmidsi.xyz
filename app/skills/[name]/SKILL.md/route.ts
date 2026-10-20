import { getSkill, getSkillNames } from '@/lib/skills';

// Serves the raw SKILL.md so agents can fetch or download it. force-static
// writes it as a plain file during the static export.
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getSkillNames().map((name) => ({ name }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  return new Response(getSkill(name).raw, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
}
