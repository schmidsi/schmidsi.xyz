import { test } from 'node:test';
import assert from 'node:assert/strict';
import { alternates, SITE_URL } from './site.ts';

test('alternates sets a canonical path and keeps the RSS link', () => {
  // Page metadata replaces the layout's `alternates` as a whole, so every
  // page has to repeat the feed link next to its canonical
  assert.deepEqual(alternates('/posts/x/'), {
    canonical: '/posts/x/',
    types: { 'application/rss+xml': '/rss.xml' },
  });
});

test('canonical urls live on ses.eth.limo', () => {
  assert.equal(SITE_URL, 'https://ses.eth.limo');
});
