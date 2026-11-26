import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Agent Skills format: app/skills/<name>/SKILL.md with name + description
// frontmatter. Kept as plain directories so a skill can be copied out as-is.
const skillsDirectory = path.join(process.cwd(), 'app/skills');

export const repoUrl = 'https://github.com/schmidsi/schmidsi.xyz';

export interface SkillHistory {
  created: string;
  updated: string;
  commit: string;
}

export interface Skill {
  name: string;
  description: string;
  raw: string;
  content: string;
  history?: SkillHistory;
}

// Dates come from git, not frontmatter: the Agent Skills spec allows only a
// fixed set of frontmatter keys, and git can't drift from the actual edits.
// Input is `git log --format='%H %cI'` output, newest commit first.
export function parseHistory(log: string): SkillHistory | undefined {
  const lines = log.trim().split('\n').filter(Boolean);
  if (lines.length === 0) return undefined;
  const [commit, updated] = lines[0].split(' ');
  const created = lines[lines.length - 1].split(' ')[1];
  return {
    created: created.slice(0, 10),
    updated: updated.slice(0, 10),
    commit,
  };
}

// The original date is what a reader orients by; an edit is only worth
// mentioning when it happened on a later day.
export function skillDate(
  history: SkillHistory,
  formatDate: (date: string) => string,
): string {
  const created = formatDate(history.created);
  if (history.updated === history.created) return created;
  return `${created} (updated ${formatDate(history.updated)})`;
}

function getHistory(name: string): SkillHistory | undefined {
  try {
    // --follow keeps the history of skills that started as something else
    // (e.g. a blog post moved here with git mv).
    const log = execFileSync(
      'git',
      [
        'log',
        '--follow',
        '--format=%H %cI',
        '--',
        path.join('app/skills', name, 'SKILL.md'),
      ],
      { encoding: 'utf8' },
    );
    return parseHistory(log);
  } catch (error) {
    console.error(`No git history for skill ${name}`, error);
    return undefined;
  }
}

export function getSkillNames(): string[] {
  return fs
    .readdirSync(skillsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
    .filter((entry) =>
      fs.existsSync(path.join(skillsDirectory, entry.name, 'SKILL.md')),
    )
    .map((entry) => entry.name)
    .sort();
}

export function getSkill(name: string): Skill {
  const raw = fs.readFileSync(
    path.join(skillsDirectory, name, 'SKILL.md'),
    'utf8',
  );
  const { data, content } = matter(raw);
  return {
    name,
    description: data.description,
    raw,
    content,
    history: getHistory(name),
  };
}

// Newest edit first, so the home page shows what changed lately. Skills
// without git history (not committed yet) go last.
export function byLastEdit(
  a: Pick<Skill, 'history'>,
  b: Pick<Skill, 'history'>,
): number {
  return (b.history?.updated ?? '').localeCompare(a.history?.updated ?? '');
}

export function getSkills(): Skill[] {
  return getSkillNames().map(getSkill).sort(byLastEdit);
}

// Files next to SKILL.md (e.g. screenshots) that the skill links relatively.
export function getSkillAssets(name: string): string[] {
  const dir = path.join(skillsDirectory, name, 'assets');
  return fs.existsSync(dir) ? fs.readdirSync(dir).sort() : [];
}

export function readSkillAsset(name: string, file: string): Buffer {
  return fs.readFileSync(path.join(skillsDirectory, name, 'assets', file));
}

// Assets worth a download link next to SKILL.md (scripts, configs). Images are
// only there to be shown inline in the skill.
export function downloadableAssets(files: string[]): string[] {
  return files.filter((file) => !/\.(png|jpe?g|gif|webp|svg)$/i.test(file));
}
