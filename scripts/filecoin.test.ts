import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  decodeAccount,
  decodeDataSets,
  extractServiceUrl,
  runway,
  EPOCHS_PER_DAY,
  parseUsdfc,
  storageWarnings,
} from './filecoin.ts';

const word = (n: bigint | number) => BigInt(n).toString(16).padStart(64, '0');

test('decodeAccount reads the four accounts() words', () => {
  const hex = '0x' + word(400n) + word(180n) + word(2n) + word(1000n);
  assert.deepEqual(decodeAccount(hex), {
    funds: 400n,
    lockupCurrent: 180n,
    lockupRate: 2n,
    lockupLastSettledAt: 1000n,
  });
});

test('runway: free funds after lockup, settled up to head, per rate', () => {
  const account = {
    funds: 1000n,
    lockupCurrent: 200n,
    lockupRate: 1n,
    lockupLastSettledAt: 100n,
  };
  // 100 epochs since settlement add 100 to the lockup: 1000 - 300 = 700 left.
  assert.deepEqual(runway(account, 200n), {
    paidEpochs: 700n,
    lockupEpochs: 300n,
  });
  assert.equal(EPOCHS_PER_DAY, 2880n);
});

test('runway with no rate is unlimited', () => {
  const account = {
    funds: 5n,
    lockupCurrent: 0n,
    lockupRate: 0n,
    lockupLastSettledAt: 0n,
  };
  assert.equal(runway(account, 10n), null);
});

test('decodeDataSets reads static 11-word structs', () => {
  const set = (providerId: number, dataSetId: number, endEpoch: number) =>
    [2363, 0, 0, 0xaa, 0xbb, 0xcc, 0, 7, endEpoch, providerId, dataSetId]
      .map(word)
      .join('');
  const hex = '0x' + word(32) + word(2) + set(1, 1336, 0) + set(4, 99, 123);
  assert.deepEqual(decodeDataSets(hex), [
    { providerId: 1n, dataSetId: 1336n, pdpEndEpoch: 0n },
    { providerId: 4n, dataSetId: 99n, pdpEndEpoch: 123n },
  ]);
  assert.deepEqual(decodeDataSets('0x' + word(32) + word(0)), []);
});

test('extractServiceUrl finds the URL in the ABI-encoded provider blob', () => {
  const text = Buffer.from('serviceURL').toString('hex');
  const url = Buffer.from('https://main.ezpdpz.net').toString('hex');
  const hex =
    '0x' + word(1) + text.padEnd(64, '0') + word(23) + url.padEnd(64, '0');
  assert.equal(extractServiceUrl(hex), 'https://main.ezpdpz.net');
});

test('parseUsdfc turns a decimal string into 18-decimal units', () => {
  assert.equal(parseUsdfc('1'), 10n ** 18n);
  assert.equal(parseUsdfc('1.82'), 182n * 10n ** 16n);
  assert.equal(parseUsdfc('0.000000000000000001'), 1n);
  assert.throws(() => parseUsdfc('1.2.3'));
  assert.throws(() => parseUsdfc('-1'));
});

test('storageWarnings flags low runway, a down provider and termination', () => {
  const ok = { paidDays: 90, healthy: true, dataSet: { pdpEndEpoch: 0n } };
  assert.deepEqual(storageWarnings(ok), []);
  const bad = { paidDays: 10, healthy: false, dataSet: { pdpEndEpoch: 5n } };
  assert.equal(storageWarnings(bad).length, 3);
});
