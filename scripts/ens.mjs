// Just enough ENS for `pnpm run publish`, with no dependencies: Node ships
// keccak-256, the rest is byte shuffling and JSON-RPC over fetch.

import { createHash } from 'node:crypto';

const keccak = (bytes) => createHash('keccak-256').update(bytes).digest();
const hex = (bytes) => '0x' + Buffer.from(bytes).toString('hex');
const unhex = (s) => Buffer.from(s.replace(/^0x/, ''), 'hex');

// EIP-137
export function namehash(name) {
  let node = Buffer.alloc(32);
  for (const label of name.split('.').filter(Boolean).reverse()) {
    node = keccak(Buffer.concat([node, keccak(label)]));
  }
  return hex(node);
}

// EIP-1577: a base32 CIDv1 ('b…') is just bytes, prefixed with ipfs-ns (0xe301).
export function contenthash(cid) {
  if (!cid.startsWith('b')) throw new Error(`not a base32 CIDv1: ${cid}`);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz234567';
  const bytes = [];
  let value = 0;
  let bits = 0;
  for (const c of cid.slice(1)) {
    const idx = alphabet.indexOf(c);
    if (idx === -1) throw new Error(`invalid base32 char: ${c}`);
    value = ((value << 5) | idx) & 0xffff;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >>> bits) & 0xff);
    }
  }
  if (bytes[0] !== 0x01) throw new Error(`not a CIDv1: ${cid}`);
  return '0xe301' + Buffer.from(bytes).toString('hex');
}

const word = (n) => n.toString(16).padStart(64, '0');

// ABI encoding of setContenthash(bytes32 node, bytes hash)
export function setContenthashCalldata(node, hash) {
  const bytes = unhex(hash);
  const padded = Buffer.concat([bytes, Buffer.alloc((32 - (bytes.length % 32)) % 32)]);
  return (
    '0x304e6ade' + node.slice(2) + word(0x40) + word(bytes.length) + padded.toString('hex')
  );
}

export async function rpc(url, method, params = []) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  const json = await res.json();
  if (json.error) throw new Error(`${method}: ${json.error.message}`);
  return json.result;
}

// For view functions taking one bytes32 and returning an address.
export async function callAddress(url, to, selector, node) {
  const result = await rpc(url, 'eth_call', [{ to, data: selector + node.slice(2) }, 'latest']);
  return '0x' + result.slice(-40);
}

// contenthash(bytes32) returns ABI-encoded bytes: offset, length, data.
export async function currentContenthash(url, resolver, node) {
  const result = unhex(
    await rpc(url, 'eth_call', [{ to: resolver, data: '0xbc1c58d1' + node.slice(2) }, 'latest']),
  );
  if (result.length < 64) return '0x';
  const length = Number(BigInt(hex(result.subarray(32, 64))));
  return hex(result.subarray(64, 64 + length));
}
