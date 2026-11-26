import { ExternalLink } from '@/components/ExternalLink';
import { Mermaid } from '@/components/Mermaid';
import { SiteHeader } from '@/components/SiteHeader';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { formatDate } from '@/lib/posts';
import { getSkill, getSkillNames, repoUrl } from '@/lib/skills';

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

// ```mermaid blocks render as diagrams; every other code block stays a <pre>.
function Pre(props: React.ComponentProps<'pre'>) {
  const code = props.children as
    | React.ReactElement<{ className?: string; children?: React.ReactNode }>
    | undefined;
  if (code?.props?.className === 'language-mermaid') {
    return <Mermaid chart={String(code.props.children).trim()} />;
  }
  return <pre {...props} />;
}

export default async function SkillPage({ params }: Props) {
  const { name } = await params;
  const skill = getSkill(name);
  const { history } = skill;

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
      <SiteHeader />
      <main className="prose mt-8 mb-8">
        <p className="text-sm text-gray-500">
          Agent skill ·{' '}
          {history && (
            <>
              <time dateTime={history.created}>
                {formatDate(history.created)}
              </time>{' '}
              ·{' '}
            </>
          )}
          <a href={`/skills/${skill.name}/SKILL.md`} download="SKILL.md">
            Download SKILL.md
          </a>
        </p>
        <Content components={{ pre: Pre }} />
        {history && (
          <>
            <h2>Last edit</h2>
            <p>
              <time dateTime={history.updated}>
                {formatDate(history.updated)}
              </time>{' '}
              in commit{' '}
              <ExternalLink href={`${repoUrl}/commit/${history.commit}`}>
                <code>{history.commit.slice(0, 7)}</code>
              </ExternalLink>{' '}
              (
              <ExternalLink
                href={`${repoUrl}/commits/main/app/skills/${skill.name}`}
              >
                full history
              </ExternalLink>
              )
            </p>
          </>
        )}
      </main>
    </div>
  );
}
