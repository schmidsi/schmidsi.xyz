import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lastCommitDate } from './git.ts';

test('lastCommitDate is the YYYY-MM-DD of the newest commit to the files', () => {
  assert.match(lastCommitDate('package.json') ?? '', /^\d{4}-\d{2}-\d{2}$/);
});

test('lastCommitDate is undefined for files git does not know', () => {
  assert.equal(lastCommitDate('does/not/exist.md'), undefined);
});
