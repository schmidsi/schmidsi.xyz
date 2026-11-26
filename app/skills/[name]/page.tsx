import { ExternalLink } from '@/components/ExternalLink';
import { Mermaid } from '@/components/Mermaid';
import { SiteHeader } from '@/components/SiteHeader';
import { alternates } from '@/lib/site';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { formatDate } from '@/lib/posts';
import {
  downloadableAssets,
  getSkill,
  getSkillAssets,
  getSkillNames,
  isPhoneScreenshot,
  repoUrl,
} from '@/lib/skills';

interface Props {
  params: Promise<{ name: string }>;
}

export function generateStaticParams() {
  return getSkillNames().map((name) => ({ name }));
}

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  const skill = getSkill(name);
  return {
    title: skill.name,
    description: skill.description,
    alternates: alternates(`/skills/${name}/`),
  };
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

// Links to a skill's own files (assets/...) download instead of opening, so a
// script or config can be saved straight to disk, also on a phone.
function A(props: React.ComponentProps<'a'>) {
  const href = props.href ?? '';
  if (!href.startsWith('assets/')) return <a {...props} />;
  return <a {...props} download={href.split('/').pop()} />;
}

function Img(props: React.ComponentProps<'img'>) {
  if (typeof props.src !== 'string' || !isPhoneScreenshot(props.src)) {
    return <img {...props} />;
  }
  return (
    <img
      {...props}
      src={props.src.replace(/#phone$/, '')}
      style={{ maxWidth: '300px' }}
    />
  );
}

export default async function SkillPage({ params }: Props) {
  const { name } = await params;
  const skill = getSkill(name);
  const { history } = skill;
  const downloads = downloadableAssets(getSkillAssets(name));

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
          {downloads.map((file) => (
            <span key={file}>
              {' '}
              ·{' '}
              <a href={`/skills/${skill.name}/assets/${file}`} download={file}>
                Download {file}
              </a>
            </span>
          ))}
        </p>
        <Content components={{ pre: Pre, a: A, img: Img }} />
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
