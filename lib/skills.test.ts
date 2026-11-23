import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHistory, skillDate } from './skills.ts';

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
