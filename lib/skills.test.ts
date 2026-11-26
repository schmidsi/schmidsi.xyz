import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  byLastEdit,
  downloadableAssets,
  parseHistory,
  skillDate,
} from './skills.ts';

test('parseHistory takes created from the oldest and last edit from the newest commit', () => {
  const log = [
    'ccc333 2026-11-23T17:59:23+04:00',
    'bbb222 2026-11-23T17:48:54+04:00',
    'aaa111 2026-02-20T20:51:23+04:00',
    '',
  ].join('\n');
  assert.deepEqual(parseHistory(log), {
    created: '2026-02-20',
    updated: '2026-11-23',
    commit: 'ccc333',
  });
});

test('parseHistory is undefined for an uncommitted skill', () => {
  assert.equal(parseHistory(''), undefined);
});

test('skillDate shows the original date, plus the update only if it differs', () => {
  const formatDate = (date: string) => `<${date}>`;
  assert.equal(
    skillDate({ created: '2026-10-20', updated: '2026-10-20', commit: 'a' }, formatDate),
    '<2026-10-20>',
  );
  assert.equal(
    skillDate({ created: '2026-10-20', updated: '2026-11-23', commit: 'a' }, formatDate),
    '<2026-10-20> (updated <2026-11-23>)',
  );
});

test('byLastEdit puts the most recently edited skill first, undated last', () => {
  const skill = (name: string, updated?: string) => ({
    name,
    history: updated ? { created: updated, updated, commit: 'a' } : undefined,
  });
  const sorted = [
    skill('old', '2026-01-01'),
    skill('uncommitted'),
    skill('new', '2026-11-23'),
  ].sort(byLastEdit);
  assert.deepEqual(
    sorted.map((s) => s.name),
    ['new', 'old', 'uncommitted'],
  );
});

test('downloadableAssets skips images, which the skill only shows inline', () => {
  assert.deepEqual(
    downloadableAssets(['a.user.js', 'shot.png', 'b.JPG', 'conf.json', 'c.svg']),
    ['a.user.js', 'conf.json'],
  );
});
