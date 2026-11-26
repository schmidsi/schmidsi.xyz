import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getSlides, parseNotes, slideImagePath, splitUrls } from './slides.ts';
import { talks, talkSlug } from './talks.ts';
import fs from 'node:fs';

test('parseNotes groups list items and paragraphs', () => {
  assert.deepEqual(parseNotes('Intro\nmore\n- a\n- b\n\nEnd'), [
    { kind: 'paragraph', text: 'Intro\nmore' },
    { kind: 'list', items: ['a', 'b'] },
    { kind: 'paragraph', text: 'End' },
  ]);
  assert.deepEqual(parseNotes(''), []);
});

test('splitUrls keeps trailing punctuation out of links', () => {
  assert.deepEqual(splitUrls('see (https://a.test/x). Then https://b.test.'), [
    { text: 'see (', url: false },
    { text: 'https://a.test/x', url: true },
    { text: '). Then ', url: false },
    { text: 'https://b.test', url: true },
    { text: '.', url: false },
  ]);
});

test('every slide json has its images', () => {
  for (const talk of talks) {
    const slug = talkSlug(talk);
    const slides = getSlides(slug);
    if (!slides) continue;
    slides.forEach((_, i) =>
      assert.ok(fs.existsSync(`public${slideImagePath(slug, i)}`)),
    );
  }
});
