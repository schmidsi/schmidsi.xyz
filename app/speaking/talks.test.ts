import { test } from 'node:test';
import assert from 'node:assert/strict';
import { talks, talkSlug, youtubeRef } from './talks.ts';

test('every talk has its own unique url slug', () => {
  const slugs = talks.map(talkSlug);
  assert.equal(new Set(slugs).size, talks.length);
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test('talkSlug drops apostrophes and cuts long titles at a word', () => {
  const base = { kind: 'Talk', year: 2023, href: 'https://x.test' } as const;
  assert.equal(
    talkSlug({ ...base, title: "What's Next", event: 'ETH Belgrade' }),
    'whats-next-eth-belgrade-2023',
  );
  const long = talkSlug({ ...base, title: 'word '.repeat(40), event: 'E' });
  assert.ok(long.endsWith('-word-e-2023') && long.length < 70);
});

test('youtubeRef reads the id and start offset', () => {
  const talk = talks.find((t) => t.href.includes('lRo-TBLTgzs'))!;
  assert.deepEqual(youtubeRef(talk), { id: 'lRo-TBLTgzs', start: 2166 });
  const other = talks.find((t) => !t.href.includes('youtube'))!;
  assert.equal(youtubeRef(other), undefined);
});
