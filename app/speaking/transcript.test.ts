import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseTranscript } from './transcript.ts';
import { talks, talkSlug, youtubeRef } from './talks.ts';

test('parseTranscript reads frontmatter and timed paragraphs', () => {
  const parsed = parseTranscript(
    '---\nsource: YouTube auto-generated captions\nuploaded: 2024-11-19\nduration: 4607\nfrom: 2166\n---\n\n[36:03] Hello\nthere.\n\n[1:02:03] Second.\n',
  );
  assert.equal(parsed.uploaded, '2024-11-19');
  assert.equal(parsed.durationSeconds, 4607);
  assert.equal(parsed.from, 2166);
  assert.deepEqual(parsed.paragraphs, [
    { time: '36:03', text: 'Hello\nthere.' },
    { time: '1:02:03', text: 'Second.' },
  ]);
});

test('every YouTube talk has a local preview image', () => {
  for (const talk of talks.filter(youtubeRef)) {
    const file = `public/images/talks/${talkSlug(talk)}.jpg`;
    assert.ok(fs.existsSync(file), `missing preview image for ${talk.title}`);
  }
});

test('every YouTube talk has a transcript file with paragraphs', () => {
  for (const talk of talks.filter(youtubeRef)) {
    const file = `app/speaking/transcripts/${talkSlug(talk)}.md`;
    assert.ok(fs.existsSync(file), `missing transcript for ${talk.title}`);
    assert.ok(parseTranscript(fs.readFileSync(file, 'utf8')).paragraphs.length);
  }
});
