// pnpm run storage                 Filecoin storage balance, runway, provider
// pnpm run storage topup [amount]  Deposit USDFC into Filecoin Pay
//                                  (default: the whole wallet balance)
//
// Top-up signs with the same 1Password key as scripts/deploy.sh and needs
// Foundry's `cast`. Deposits can be withdrawn again from Filecoin Pay.

import { spawnSync } from 'node:child_process';
import {
  FILECOIN_RPC,
  PAYER,
  PAYMENTS,
  USDFC,
  formatUsdfc,
  getStorageStatus,
  parseUsdfc,
  storageWarnings,
} from './filecoin.ts';

const [command, amount] = process.argv.slice(2);

if (command === 'topup') {
  await topup(amount);
} else if (command) {
  console.error('usage: pnpm run storage [topup [amount]]');
  process.exit(1);
}
await printStatus();

async function printStatus() {
  const s = await getStorageStatus();
  const until = new Date(Date.now() + s.paidDays * 86_400_000);
  const provider = s.serviceUrl ?? 'unknown provider';
  console.log(
    [
      `Filecoin storage, data set ${s.dataSet?.dataSetId ?? 'none'} on ${provider} (${s.healthy ? 'up' : 'DOWN'})`,
      `  Deposited:  ${formatUsdfc(s.account.funds)} USDFC (${formatUsdfc(s.account.lockupCurrent)} locked)`,
      `  Rate:       ${formatUsdfc(s.monthlyRate)} USDFC/month`,
      `  Paid until: ${until.toISOString().slice(0, 10)} (${Math.floor(s.paidDays)} days), then ~${Math.floor(s.lockupDays)} days of lockup`,
      `  Wallet:     ${formatUsdfc(s.wallet)} USDFC not deposited`,
      ...storageWarnings(s).map((w) => `⚠️  ${w}`),
    ].join('\n'),
  );
}

async function topup(amountArg?: string) {
  const { wallet } = await getStorageStatus();
  const value = amountArg ? parseUsdfc(amountArg) : wallet;
  if (value === 0n || value > wallet) {
    console.error(
      `Cannot deposit ${formatUsdfc(value)} USDFC, the wallet has ${formatUsdfc(wallet)}.`,
    );
    process.exit(1);
  }

  const key = run('op', [
    'read',
    'op://Agents - Privileged/testoor.eth/private key',
    '--no-newline',
  ]);
  const privateKey = '0x' + key.replace(/^0x/, '');
  const address = run('cast', [
    'wallet',
    'address',
    '--private-key',
    privateKey,
  ]);
  if (address.toLowerCase() !== PAYER) {
    throw new Error(`key is for ${address}, expected the payer ${PAYER}`);
  }

  console.log(`Depositing ${formatUsdfc(value)} USDFC into Filecoin Pay…`);
  const send = (to: string, signature: string, ...args: string[]) =>
    run('cast', [
      'send',
      to,
      signature,
      ...args,
      '--private-key',
      privateKey,
      '--rpc-url',
      FILECOIN_RPC,
    ]);
  send(USDFC, 'approve(address,uint256)', PAYMENTS, value.toString());
  send(
    PAYMENTS,
    'deposit(address,address,uint256)',
    USDFC,
    PAYER,
    value.toString(),
  );
  console.log('Done.\n');
}

function run(command: string, args: string[]): string {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'inherit'],
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
  return result.stdout.trim();
}
