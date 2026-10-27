// pnpm run publish [CID]
//
// Pins the site (scripts/deploy.sh) and points ses.eth at the new CID.
// Pass a CID to skip the deploy and only update ENS.
//
// Signing: by default the transaction goes through browser-rpc
// (https://github.com/gskril/browser-rpc), so the ses.eth key stays in the
// browser wallet and never touches this machine. Set ENS_SIGNER_KEY to sign
// locally instead (needs Foundry's `cast`), e.g.
//   ENS_SIGNER_KEY="$(op read 'op://…')" pnpm run publish

import { spawn, spawnSync } from 'node:child_process';
import {
  namehash,
  labelhash,
  contenthash,
  dnsEncode,
  setContenthashCalldata,
  resolveCalldata,
  decodeResolvedBytes,
  rpc,
  callWord,
} from './ens.ts';
import { getStorageStatus, storageWarnings } from './filecoin.ts';

const NAME = 'ses.eth';
// ENSv2 (https://docs.ens.domains/learn/deployments). ses.eth is migrated, so
// the v1 registry and NameWrapper now report a zero resolver and owner.
const UNIVERSAL_RESOLVER = '0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe';
const ETH_REGISTRY = '0xf60aba43e1f7f3dab1186ff03b561401c9df85e2';
const RPC = process.env.RPC_URL ?? 'https://ethereum-rpc.publicnode.com';
const BROWSER_RPC = 'http://localhost:8545';

if (!process.argv[2]) await warnAboutStorage();
const cid = process.argv[2] ?? (await deploy());
const node = namehash(NAME);
const hash = contenthash(cid);
// The Universal Resolver answers with the current contenthash and the
// resolver it came from, looked up fresh as ENSv2 asks for writes.
const resolved = await rpc(RPC, 'eth_call', [
  {
    to: UNIVERSAL_RESOLVER,
    data: resolveCalldata(NAME, '0xbc1c58d1' + node.slice(2)),
  },
  'latest',
]);
const resolver = '0x' + resolved.slice(90, 130);
// Token IDs change in ENSv2, so get the current one before asking its owner.
const tokenId = await callWord(
  RPC,
  ETH_REGISTRY,
  '0x14ff5ea3', // getTokenId(uint256)
  labelhash(NAME.split('.')[0]),
);
const owner =
  '0x' + (await callWord(RPC, ETH_REGISTRY, '0x6352211e', tokenId)).slice(-40);

console.log(`\n${NAME} → ipfs://${cid}`);
console.log(`resolver: ${resolver}\nowner:    ${owner}`);
if (/^0x0+$/.test(resolver) || /^0x0+$/.test(owner)) {
  throw new Error(`${NAME} has no ENSv2 resolver or owner, refusing to send`);
}

if (decodeResolvedBytes(resolved) === hash) {
  console.log(`${NAME} already points at this CID, nothing to do.`);
  process.exit(0);
}

const key = process.env.ENS_SIGNER_KEY;
const tx = key ? sendWithKey(key) : await sendWithBrowser();
console.log(`tx: https://etherscan.io/tx/${tx}`);
await waitForReceipt(tx);

// Warns, without stopping, if Filecoin storage runs low or the provider is down.
async function warnAboutStorage() {
  try {
    for (const warning of storageWarnings(await getStorageStatus())) {
      console.warn(`⚠️  ${warning}`);
    }
  } catch (e) {
    console.warn(`⚠️  Could not check Filecoin storage: ${e.message}`);
  }
}

// Runs the deploy, echoing its output, and returns the Root CID it prints.
async function deploy(): Promise<string> {
  const child = spawn('bash', ['scripts/deploy.sh'], {
    stdio: ['inherit', 'pipe', 'inherit'],
  });
  let output = '';
  child.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
    output += chunk;
  });
  const code = await new Promise<number>((resolve) =>
    child.on('close', resolve),
  );
  if (code !== 0) process.exit(code);
  // stdout is a pipe, not a TTY, so omnipin prints the CID without colors.
  const match = output.match(/Root CID: (\w+)/);
  if (!match) throw new Error('deploy finished but printed no Root CID');
  return match[1];
}

function sendWithKey(key: string): string {
  // cast takes the key only as a flag. Same exposure as an env var: both are
  // readable by this user's processes (ps -E), neither touches disk.
  const result = spawnSync(
    'cast',
    [
      'send',
      resolver,
      'setContenthash(bytes,bytes)',
      dnsEncode(NAME),
      hash,
      '--private-key',
      key,
      '--rpc-url',
      RPC,
      '--json',
    ],
    { encoding: 'utf8', stdio: ['inherit', 'pipe', 'inherit'] },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
  return JSON.parse(result.stdout).transactionHash;
}

async function sendWithBrowser(): Promise<string> {
  // Reuse a browser-rpc that is already running, otherwise start one.
  let proxy;
  if (!(await isUp())) {
    proxy = spawn(
      'npx',
      ['-y', 'browser-rpc@0.0.12', '--rpc', RPC, '--from', owner],
      { stdio: 'inherit', detached: true },
    );
    for (let i = 0; !(await isUp()); i++) {
      if (i === 60) throw new Error('browser-rpc did not start on :8545');
      await sleep(500);
    }
  }
  try {
    console.log('Approve setContenthash in the browser wallet…');
    return await rpc(BROWSER_RPC, 'eth_sendTransaction', [
      { from: owner, to: resolver, data: setContenthashCalldata(NAME, hash) },
    ]);
  } finally {
    // detached gives npx its own process group, so this also stops its child.
    if (proxy) process.kill(-proxy.pid);
  }
}

async function isUp(): Promise<boolean> {
  try {
    await rpc(BROWSER_RPC, 'eth_chainId');
    return true;
  } catch {
    return false;
  }
}

async function waitForReceipt(tx: string) {
  for (;;) {
    const receipt = await rpc(RPC, 'eth_getTransactionReceipt', [tx]);
    if (receipt) {
      if (receipt.status !== '0x1') throw new Error(`tx reverted: ${tx}`);
      console.log(`Confirmed in block ${Number(receipt.blockNumber)}.`);
      return;
    }
    await sleep(4000);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
