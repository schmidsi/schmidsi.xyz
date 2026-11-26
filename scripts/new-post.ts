// Scaffold a draft post: pnpm new-post "My Title"
// The underscore prefix keeps it a draft; rename to <slug>.mdx to publish.
import fs from 'fs';
import path from 'path';

const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function newPost(dir: string, title: string, date: string): string {
  const slug = slugify(title);
  const file = path.join(dir, `_${slug}.mdx`);
  for (const f of [file, path.join(dir, `${slug}.mdx`)]) {
    if (fs.existsSync(f)) throw new Error(`${f} already exists`);
  }
  // Single quotes keep YAML happy with colons and other punctuation in titles
  const quoted = `'${title.replace(/'/g, "''")}'`;
  fs.writeFileSync(
    file,
    `---\ntitle: ${quoted}\ndate: ${date}\ndescription: \ntag: \nauthor: Simon Emanuel\n---\n\n`,
  );
  return file;
}

if (import.meta.main) {
  const title = process.argv.slice(2).join(' ').trim();
  if (!title) {
    console.error('Usage: pnpm new-post "Post title"');
    process.exit(1);
  }
  const today = new Date().toISOString().split('T')[0];
  console.log(newPost(path.join(process.cwd(), 'app/posts'), title, today));
}
