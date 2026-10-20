import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Agent Skills format: app/skills/<name>/SKILL.md with name + description
// frontmatter. Kept as plain directories so a skill can be copied out as-is.
const skillsDirectory = path.join(process.cwd(), 'app/skills');

export interface Skill {
  name: string;
  description: string;
  raw: string;
  content: string;
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
  return { name, description: data.description, raw, content };
}

export function getSkills(): Skill[] {
  return getSkillNames().map(getSkill);
}
