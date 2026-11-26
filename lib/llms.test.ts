import { test } from 'node:test';
import assert from 'node:assert/strict';
import { llmsTxt } from './llms.ts';

const text = llmsTxt();

test('llms.txt starts with the site name and a summary', () => {
  assert.match(text, /^# Simon Emanuel\n\n> .+/);
});

test('llms.txt links posts, talks and skills with absolute urls', () => {
  assert.match(text, /## Posts\n\n- \[.+\]\(https:\/\/ses\.eth\.limo\/posts\/.+\/\)/);
  assert.match(text, /## Talks\n\n- \[.+\]\(https:\/\/ses\.eth\.limo\/speaking\/.+\/\)/);
  assert.match(text, /## Skills\n\n- \[.+\]\(https:\/\/ses\.eth\.limo\/skills\/.+\/\)/);
});

test('llms.txt leaves out reposts', () => {
  assert.doesNotMatch(text, /from-blaze-to-react/);
});
