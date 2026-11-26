import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { newPost } from './new-post.ts';

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'new-post-'));

test('newPost writes a draft with frontmatter from the title', () => {
  const dir = tmp();
  const file = newPost(dir, 'Hello, ENS World!', '2026-11-26');
  assert.equal(file, path.join(dir, '_hello-ens-world.mdx'));
  const text = fs.readFileSync(file, 'utf8');
  assert.match(text, /^---\ntitle: 'Hello, ENS World!'\ndate: 2026-11-26\n/);
  assert.match(text, /\nauthor: Simon Emanuel\n/);
});

test('newPost refuses to overwrite an existing post', () => {
  const dir = tmp();
  newPost(dir, 'Twice', '2026-11-26');
  assert.throws(() => newPost(dir, 'Twice', '2026-11-26'), /exists/);
});
