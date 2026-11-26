import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { changedUrls, INDEXNOW_KEY } from './indexnow.ts';

const sitemap = (...entries: [string, string?][]) =>
  `<urlset>${entries
    .map(
      ([loc, lastmod]) =>
        `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
    )
    .join('')}</urlset>`;

test('changedUrls finds new pages and pages with a newer lastmod', () => {
  const before = sitemap(['https://a/1/', '2026-01-01'], ['https://a/2/', '2026-01-01']);
  const after = sitemap(
    ['https://a/1/', '2026-01-01'],
    ['https://a/2/', '2026-02-01'],
    ['https://a/3/', '2026-02-01'],
  );
  assert.deepEqual(changedUrls(before, after), ['https://a/2/', 'https://a/3/']);
});

test('changedUrls submits everything when there was no sitemap before', () => {
  assert.deepEqual(changedUrls('', sitemap(['https://a/1/'])), ['https://a/1/']);
});

test('the IndexNow key file is published at the site root', () => {
  // Search engines fetch https://ses.eth.limo/<key>.txt to verify the ping
  assert.match(INDEXNOW_KEY, /^[a-f0-9]{32}$/);
  assert.equal(
    fs.readFileSync(`public/${INDEXNOW_KEY}.txt`, 'utf8').trim(),
    INDEXNOW_KEY,
  );
});
