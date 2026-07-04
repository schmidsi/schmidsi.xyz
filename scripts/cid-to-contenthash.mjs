// Converts a base32 CIDv1 (bafy…, as printed by `pnpm run deploy`) into the
// EIP-1577 contenthash bytes that ENS resolvers store for IPFS content.
// No dependencies: a CIDv1 is just base32-encoded bytes after the 'b' prefix,
// and the contenthash is those bytes behind an ipfs-ns multicodec (0xe3 0x01).

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567';

function base32Decode(s) {
  let bits = 0;
  let value = 0;
  const out = [];
  for (const c of s) {
    const idx = ALPHABET.indexOf(c);
    if (idx === -1) throw new Error(`invalid base32 char: ${c}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Uint8Array.from(out);
}

const cid = process.argv[2];
if (!cid || !cid.startsWith('b')) {
  console.error('Usage: node scripts/cid-to-contenthash.mjs <base32 CIDv1 (b…)>');
  process.exit(1);
}

const bytes = base32Decode(cid.slice(1));
if (bytes[0] !== 0x01) throw new Error('not a CIDv1');
console.log('0xe301' + Buffer.from(bytes).toString('hex'));
