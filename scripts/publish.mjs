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
  contenthash,
  setContenthashCalldata,
  rpc,
  callAddress,
  currentContenthash,
} from './ens.mjs';

const NAME = 'ses.eth';
const ENS_REGISTRY = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
const NAME_WRAPPER = '0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401';
const RPC = process.env.RPC_URL ?? 'https://ethereum-rpc.publicnode.com';
const BROWSER_RPC = 'http://localhost:8545';

const cid = process.argv[2] ?? (await deploy());
const node = namehash(NAME);
const hash = contenthash(cid);
const resolver = await callAddress(RPC, ENS_REGISTRY, '0x0178b8bf', node);
const owner = await callAddress(RPC, NAME_WRAPPER, '0x6352211e', node);

console.log(`\n${NAME} → ipfs://${cid}`);
console.log(`resolver: ${resolver}\nowner:    ${owner}`);

if ((await currentContenthash(RPC, resolver, node)) === hash) {
  console.log(`${NAME} already points at this CID, nothing to do.`);
  process.exit(0);
}

const tx = process.env.ENS_SIGNER_KEY ? sendWithKey() : await sendWithBrowser();
console.log(`tx: https://etherscan.io/tx/${tx}`);
await waitForReceipt(tx);

// Runs the deploy, echoing its output, and returns the Root CID it prints.
async function deploy() {
  const child = spawn('bash', ['scripts/deploy.sh'], {
    stdio: ['inherit', 'pipe', 'inherit'],
  });
  let output = '';
  child.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
    output += chunk;
  });
  const code = await new Promise((resolve) => child.on('close', resolve));
  if (code !== 0) process.exit(code);
  // Omnipin colors its output, strip ANSI codes before matching.
  const match = output.replace(/\x1b\[[0-9;]*m/g, '').match(/Root CID: (\w+)/);
  if (!match) throw new Error('deploy finished but printed no Root CID');
  return match[1];
}

function sendWithKey() {
  // cast takes the key only as a flag. Same exposure as an env var: both are
  // readable by this user's processes (ps -E), neither touches disk.
  const result = spawnSync(
    'cast',
    [
      'send',
      resolver,
      'setContenthash(bytes32,bytes)',
      node,
      hash,
      '--private-key',
      process.env.ENS_SIGNER_KEY,
      '--rpc-url',
      RPC,
      '--json',
    ],
    { encoding: 'utf8', stdio: ['inherit', 'pipe', 'inherit'] },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
  return JSON.parse(result.stdout).transactionHash;
}

async function sendWithBrowser() {
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
      { from: owner, to: resolver, data: setContenthashCalldata(node, hash) },
    ]);
  } finally {
    // detached gives npx its own process group, so this also stops its child.
    if (proxy) process.kill(-proxy.pid);
  }
}

async function isUp() {
  try {
    await rpc(BROWSER_RPC, 'eth_chainId');
    return true;
  } catch {
    return false;
  }
}

async function waitForReceipt(tx) {
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
