import Link from 'next/link';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { getSkill, getSkillNames } from '@/lib/skills';

interface Props {
  params: Promise<{ name: string }>;
}

export function generateStaticParams() {
  return getSkillNames().map((name) => ({ name }));
}

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  const skill = getSkill(name);
  return { title: skill.name, description: skill.description };
}

export default async function SkillPage({ params }: Props) {
  const { name } = await params;
  const skill = getSkill(name);

  // format: 'md' because skills are plain Markdown, not MDX (no JSX parsing
  // of things like <domain> placeholders).
  const code = String(
    await compile(skill.content, {
      format: 'md',
      outputFormat: 'function-body',
      remarkPlugins: [remarkGfm],
    }),
  );
  const { default: Content } = await run(code, runtime);

  return (
    <div>
      <Link href="/">
        <header className="text-xl font-bold text-gray-400 leading-negative">
          <span className="text-gray-900">S</span>imon <br />
          <span className="text-gray-900">E</span>manuel <br />
          <span className="text-gray-900">S</span>chmid
        </header>
      </Link>
      <main className="prose mt-8 mb-8">
        <p className="text-sm text-gray-500">
          Agent skill ·{' '}
          <a href={`/skills/${skill.name}/SKILL.md`} download="SKILL.md">
            Download SKILL.md
          </a>
        </p>
        <Content />
      </main>
    </div>
  );
}
