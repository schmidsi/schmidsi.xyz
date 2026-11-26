import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sitemapEntries } from './sitemap.ts';

const entries = sitemapEntries();
const urls = entries.map((entry) => entry.url);

test('sitemap lists home, speaking, a talk, a post and a skill', () => {
  assert.ok(urls.includes('https://ses.eth.limo/'));
  assert.ok(urls.includes('https://ses.eth.limo/speaking/'));
  assert.ok(urls.some((url) => /\/speaking\/[^/]+\/$/.test(url)));
  assert.ok(urls.some((url) => /\/posts\/[^/]+\/$/.test(url)));
  assert.ok(urls.some((url) => /\/skills\/[^/]+\/$/.test(url)));
});

test('sitemap leaves out reposts, their canonical url is elsewhere', () => {
  assert.ok(!urls.some((url) => url.includes('from-blaze-to-react')));
});

test('posts carry the date of their last commit', () => {
  const post = entries.find((entry) => entry.url.includes('/posts/'));
  assert.match(post?.lastModified ?? '', /^\d{4}-\d{2}-\d{2}$/);
});

test('the home page is as new as the newest page', () => {
  const dates = entries.map((entry) => entry.lastModified ?? '').sort();
  assert.equal(entries[0].lastModified, dates[dates.length - 1]);
});
