import fs from 'fs';
import path from 'path';

const slidesDirectory = path.join(process.cwd(), 'app/speaking/slides');

export interface Slide {
  // Text on the slide, as alt text for the image. Empty for picture slides
  alt: string;
  // Speaker notes, plain text. "- " starts a list item
  notes: string;
}

// Talks without a recording can have their slides on the page instead: one
// json file per talk, in slide order. The images are in
// public/images/slides/<slug>/01.jpg, 02.jpg, ...
export function getSlides(slug: string): Slide[] | null {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(slidesDirectory, `${slug}.json`), 'utf8'),
    ) as Slide[];
  } catch {
    return null;
  }
}

export function slideImagePath(slug: string, index: number): string {
  return `/images/slides/${slug}/${String(index + 1).padStart(2, '0')}.jpg`;
}

export type NoteBlock =
  { kind: 'paragraph'; text: string } | { kind: 'list'; items: string[] };

// Consecutive "- " lines become one list, other consecutive lines one paragraph
export function parseNotes(notes: string): NoteBlock[] {
  const blocks: NoteBlock[] = [];
  for (const line of notes.split('\n')) {
    if (!line.trim()) {
      blocks.push({ kind: 'paragraph', text: '' });
      continue;
    }
    const last = blocks[blocks.length - 1];
    if (line.startsWith('- ')) {
      if (last?.kind === 'list') last.items.push(line.slice(2));
      else blocks.push({ kind: 'list', items: [line.slice(2)] });
    } else if (last?.kind === 'paragraph' && last.text) {
      last.text += `\n${line}`;
    } else if (last?.kind === 'paragraph' && !last.text) {
      last.text = line;
    } else {
      blocks.push({ kind: 'paragraph', text: line });
    }
  }
  return blocks.filter((b) => b.kind === 'list' || b.text);
}

// Splits text into plain parts and urls, without trailing punctuation
export function splitUrls(text: string): { text: string; url: boolean }[] {
  return text
    .split(/(https?:\/\/[^\s)]*[^\s).,;:])/)
    .filter(Boolean)
    .map((part) => ({ text: part, url: /^https?:\/\//.test(part) }));
}
