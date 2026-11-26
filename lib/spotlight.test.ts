import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickSpotlight } from './spotlight.ts';

const post = (slug: string, date: string, canonical?: string) => ({
  slug,
  title: slug,
  date,
  description: `about ${slug}`,
  canonical,
});
const skill = (name: string, created?: string) => ({
  name,
  description: `about ${name}`,
  history: created && { created, updated: created, commit: 'a' },
});

test('pickSpotlight takes the newest post', () => {
  assert.deepEqual(
    pickSpotlight([post('new', '2026-11-26'), post('old', '2026-10-01')], []),
    {
      kind: 'Post',
      title: 'new',
      href: '/posts/new',
      date: '2026-11-26',
      description: 'about new',
    },
  );
});

test('pickSpotlight takes a skill published after the newest post', () => {
  assert.deepEqual(
    pickSpotlight(
      [post('p', '2026-11-01')],
      [skill('old', '2026-01-01'), skill('fresh', '2026-11-20')],
    ),
    {
      kind: 'Skill',
      title: 'fresh',
      href: '/skills/fresh',
      date: '2026-11-20',
      description: 'about fresh',
    },
  );
});

test('pickSpotlight skips reposts and uncommitted skills', () => {
  assert.equal(
    pickSpotlight(
      [
        post('repost', '2026-11-26', 'https://example.com'),
        post('own', '2026-01-01'),
      ],
      [skill('draft')],
    )?.title,
    'own',
  );
});

test('pickSpotlight is undefined without content', () => {
  assert.equal(pickSpotlight([], []), undefined);
});
