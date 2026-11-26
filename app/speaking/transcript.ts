import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const transcriptsDirectory = path.join(
  process.cwd(),
  'app/speaking/transcripts',
);

export interface Transcript {
  source: string;
  uploaded: string;
  durationSeconds: number;
  // Second of the video where the talk starts, when it is not at the start
  from?: number;
  paragraphs: { time: string; text: string }[];
}

// Transcripts are plain files, one per talk: frontmatter, then paragraphs
// that each start with the [mm:ss] of the video where they begin.
export function parseTranscript(fileContents: string): Transcript {
  const { data, content } = matter(fileContents);
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((block) => block.trim().match(/^\[([\d:]+)\] ([\s\S]*)$/))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map((match) => ({ time: match[1], text: match[2] }));
  return {
    source: String(data.source),
    uploaded:
      data.uploaded instanceof Date
        ? data.uploaded.toISOString().split('T')[0]
        : String(data.uploaded),
    durationSeconds: Number(data.duration),
    from: data.from ? Number(data.from) : undefined,
    paragraphs,
  };
}

export function getTranscript(slug: string): Transcript | null {
  try {
    return parseTranscript(
      fs.readFileSync(path.join(transcriptsDirectory, `${slug}.md`), 'utf8'),
    );
  } catch {
    return null;
  }
}
