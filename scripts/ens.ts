// Just enough ENS for `pnpm run publish`, with no dependencies: Node ships
// keccak-256, the rest is byte shuffling and JSON-RPC over fetch.

import { createHash } from 'node:crypto';

const keccak = (bytes: Buffer | string) =>
  createHash('keccak-256').update(bytes).digest();
const hex = (bytes: Uint8Array) => '0x' + Buffer.from(bytes).toString('hex');
const unhex = (s: string) => Buffer.from(s.replace(/^0x/, ''), 'hex');

export const labelhash = (label: string) => hex(keccak(label));

// EIP-137
export function namehash(name: string): string {
  let node = Buffer.alloc(32);
  for (const label of name.split('.').filter(Boolean).reverse()) {
    node = keccak(Buffer.concat([node, keccak(label)]));
  }
  return hex(node);
}

// EIP-1577: a base32 CIDv1 ('b…') is just bytes, prefixed with ipfs-ns (0xe301).
export function contenthash(cid: string): string {
  if (!cid.startsWith('b')) throw new Error(`not a base32 CIDv1: ${cid}`);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz234567';
  const bytes: number[] = [];
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

const word = (n: number) => n.toString(16).padStart(64, '0');

// DNS wire format, which ENSv2 resolvers and the Universal Resolver take
// instead of a namehash: each label prefixed by its length, then a 0 byte.
export function dnsEncode(name: string): string {
  const labels = name.split('.').filter(Boolean);
  const bytes = labels.map((label) => {
    const b = Buffer.from(label);
    return Buffer.concat([Buffer.from([b.length]), b]);
  });
  return hex(Buffer.concat([...bytes, Buffer.from([0])]));
}

// ABI encoding of f(bytes a, bytes b), the shape of both calls below.
function encodeTwoBytes(selector: string, a: string, b: string): string {
  const tail = (h: string) => {
    const bytes = unhex(h);
    const pad = Buffer.alloc((32 - (bytes.length % 32)) % 32);
    return word(bytes.length) + Buffer.concat([bytes, pad]).toString('hex');
  };
  const first = tail(a);
  return (
    selector + word(0x40) + word(0x40 + first.length / 2) + first + tail(b)
  );
}

// setContenthash(bytes name, bytes hash) on an ENSv2 PermissionedResolver
export function setContenthashCalldata(name: string, hash: string): string {
  return encodeTwoBytes('0xc5d7badd', dnsEncode(name), hash);
}

// resolve(bytes name, bytes data) on the Universal Resolver
export function resolveCalldata(name: string, data: string): string {
  return encodeTwoBytes('0x9061b923', dnsEncode(name), data);
}

// ABI-decodes the dynamic bytes whose offset sits in the first word.
function firstBytes(buf: Buffer): Buffer {
  const offset = Number(BigInt(hex(buf.subarray(0, 32))));
  const length = Number(BigInt(hex(buf.subarray(offset, offset + 32))));
  return buf.subarray(offset + 32, offset + 32 + length);
}

// resolve() returns (bytes answer, address resolver), and the answer is
// itself the ABI-encoded `bytes` that contenthash() returns.
export function decodeResolvedBytes(result: string): string {
  const answer = firstBytes(unhex(result));
  return answer.length ? hex(firstBytes(answer)) : '0x';
}

export async function rpc(
  url: string,
  method: string,
  params: unknown[] = [],
): Promise<any> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  const json = await res.json();
  if (json.error) throw new Error(`${method}: ${json.error.message}`);
  return json.result;
}

// For view functions taking one 32-byte argument and returning one word.
export async function callWord(
  url: string,
  to: string,
  selector: string,
  arg: string,
): Promise<string> {
  const result = await rpc(url, 'eth_call', [
    { to, data: selector + arg.replace(/^0x/, '').padStart(64, '0') },
    'latest',
  ]);
  return '0x' + result.slice(2, 66);
}
