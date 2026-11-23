import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { redirectPage, writeRedirects } from './redirects.ts';

test('redirectPage sends browsers and crawlers to the target', () => {
  const html = redirectPage('/skills/x/');
  assert.match(html, /<meta http-equiv="refresh" content="0; url=\/skills\/x\/">/);
  assert.match(html, /<link rel="canonical" href="\/skills\/x\/">/);
  assert.match(html, /<a href="\/skills\/x\/">/);
});

test('writeRedirects writes <from>/index.html into the export', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'redirects-'));
  writeRedirects(out, { '/posts/old/': '/skills/new/' });
  const html = fs.readFileSync(path.join(out, 'posts/old/index.html'), 'utf8');
  assert.match(html, /url=\/skills\/new\//);
});

test('writeRedirects refuses to overwrite a real page', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'redirects-'));
  fs.mkdirSync(path.join(out, 'posts/live'), { recursive: true });
  fs.writeFileSync(path.join(out, 'posts/live/index.html'), 'real page');
  assert.throws(
    () => writeRedirects(out, { '/posts/live/': '/elsewhere/' }),
    /posts\/live/,
  );
});
