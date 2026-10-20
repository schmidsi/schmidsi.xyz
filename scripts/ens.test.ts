import { test } from 'node:test';
import assert from 'node:assert/strict';
import { namehash, contenthash, setContenthashCalldata } from './ens.ts';

// Reference values from Foundry: `cast namehash`, `cast calldata`.
const CID = 'bafybeibhvkp4vjo4lqpafkf7tll5tjb5hicsevoqgtku7djaokezpmzk2i';
const NODE =
  '0x4e76673e3a243a166e70411086939b2d6dd899e006e43dc463b722ad19de8ee3';
const CONTENTHASH =
  '0xe3010170122027aa9fcaa5dc5c1e02a8bf9ad7d9a43d3a052255d034d54f8d20728997b32ad2';

test('namehash', () => {
  assert.equal(namehash('ses.eth'), NODE);
  assert.equal(namehash(''), '0x' + '00'.repeat(32));
});

test('contenthash encodes a base32 CIDv1 per EIP-1577', () => {
  assert.equal(contenthash(CID), CONTENTHASH);
  assert.throws(() => contenthash('Qm123'));
});

test('setContenthash calldata matches cast calldata', () => {
  assert.equal(
    setContenthashCalldata(NODE, CONTENTHASH),
    '0x304e6ade' +
      '4e76673e3a243a166e70411086939b2d6dd899e006e43dc463b722ad19de8ee3' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000026' +
      'e3010170122027aa9fcaa5dc5c1e02a8bf9ad7d9a43d3a052255d034d54f8d20' +
      '728997b32ad20000000000000000000000000000000000000000000000000000',
  );
});
