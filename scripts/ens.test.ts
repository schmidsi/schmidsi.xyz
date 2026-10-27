import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  namehash,
  contenthash,
  dnsEncode,
  setContenthashCalldata,
  resolveCalldata,
  decodeResolvedBytes,
} from './ens.ts';

// Reference values from Foundry: `cast namehash`, `cast calldata`,
// `cast abi-encode`.
const CID = 'bafybeibhvkp4vjo4lqpafkf7tll5tjb5hicsevoqgtku7djaokezpmzk2i';
const NODE =
  '0x4e76673e3a243a166e70411086939b2d6dd899e006e43dc463b722ad19de8ee3';
const CONTENTHASH =
  '0xe3010170122027aa9fcaa5dc5c1e02a8bf9ad7d9a43d3a052255d034d54f8d20728997b32ad2';
const ZERO_WORD = '0'.repeat(64);

test('namehash', () => {
  assert.equal(namehash('ses.eth'), NODE);
  assert.equal(namehash(''), '0x' + '00'.repeat(32));
});

test('contenthash encodes a base32 CIDv1 per EIP-1577', () => {
  assert.equal(contenthash(CID), CONTENTHASH);
  assert.throws(() => contenthash('Qm123'));
});

test('dnsEncode prefixes each label with its length', () => {
  assert.equal(dnsEncode('ses.eth'), '0x037365730365746800');
});

test('setContenthash calldata matches cast calldata (ENSv2 resolver)', () => {
  assert.equal(
    setContenthashCalldata('ses.eth', CONTENTHASH),
    '0xc5d7badd' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '0373657303657468000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000026' +
      'e3010170122027aa9fcaa5dc5c1e02a8bf9ad7d9a43d3a052255d034d54f8d20' +
      '728997b32ad20000000000000000000000000000000000000000000000000000',
  );
});

test('resolve calldata wraps contenthash(node) for the Universal Resolver', () => {
  assert.equal(
    resolveCalldata('ses.eth', '0xbc1c58d1' + NODE.slice(2)),
    '0x9061b923' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '0373657303657468000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000024' +
      'bc1c58d14e76673e3a243a166e70411086939b2d6dd899e006e43dc463b722ad' +
      '19de8ee300000000000000000000000000000000000000000000000000000000',
  );
});

test('decodeResolvedBytes unwraps a Universal Resolver contenthash answer', () => {
  const resolver =
    '0000000000000000000000005faa23533950c1592b0ff043eee1dae5f1af8cf8';
  assert.equal(
    decodeResolvedBytes(
      '0x' +
        '0000000000000000000000000000000000000000000000000000000000000040' +
        resolver +
        '0000000000000000000000000000000000000000000000000000000000000080' +
        '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000026' +
        'e30101701220db7d8f550d26f7be91fc27d574cfc8189bc3280d5c39c7a020f6' +
        '3bc582eccdee0000000000000000000000000000000000000000000000000000',
    ),
    '0xe30101701220db7d8f550d26f7be91fc27d574cfc8189bc3280d5c39c7a020f63bc582eccdee',
  );
  // A resolver with no answer returns empty bytes.
  assert.equal(
    decodeResolvedBytes(
      '0x' +
        '0000000000000000000000000000000000000000000000000000000000000040' +
        resolver +
        ZERO_WORD,
    ),
    '0x',
  );
});
