import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePost } from './posts.ts';

const post = (frontmatter: string) =>
  `---\ntitle: T\ndate: 2026-10-27\n${frontmatter}---\n\nBody\n`;

test('parsePost keeps engage links in frontmatter order', () => {
  const parsed = parsePost(
    'p',
    post(
      'engage:\n  X: https://x.com/a\n  LinkedIn: https://linkedin.com/b\n',
    ),
  );
  assert.deepEqual(parsed.engage, [
    { label: 'X', href: 'https://x.com/a' },
    { label: 'LinkedIn', href: 'https://linkedin.com/b' },
  ]);
  assert.equal(parsed.date, '2026-10-27');
  assert.equal(parsed.content.trim(), 'Body');
});

test('parsePost has no engage links when frontmatter has none', () => {
  assert.deepEqual(parsePost('p', post('')).engage, []);
});
