// Read-only view of the Filecoin Warm Storage that omnipin pays for: how much
// USDFC is left in Filecoin Pay, how many days that buys, and whether the
// storage provider is up. No dependencies, raw eth_call over fetch.
//
// Why this exists: omnipin only deposits into Filecoin Pay when it creates a
// data set (the first deploy). Later deploys reuse it and never top up, so the
// deposit drains silently until the provider may drop the site.

import { createHash } from 'node:crypto';
import { rpc } from './ens.ts';

export const FILECOIN_RPC =
  process.env.FILECOIN_RPC_URL ?? 'https://api.node.glif.io/rpc/v1';
// testoor.eth, the address of the 1Password key that scripts/deploy.sh uses.
export const PAYER = '0xfa75ed868c65970bbfdfc238d82d6cfcfd7d9031';
// Filecoin mainnet contracts, as configured in omnipin 1.7.0.
export const USDFC = '0x80B98d3aa09ffff255c3ba4A241111Ff1262F045';
export const PAYMENTS = '0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa';
const STORAGE_VIEW = '0x9e4e6699d8F67dFc883d6b0A7344Bd56F7E80B46';
const PROVIDER_REGISTRY = '0xf55dDbf63F1b55c3F1D4FA7e339a68AB7b64A5eB';

export const EPOCHS_PER_DAY = 2880n; // 30 second epochs

export interface Account {
  funds: bigint;
  lockupCurrent: bigint;
  lockupRate: bigint;
  lockupLastSettledAt: bigint;
}

export interface DataSet {
  providerId: bigint;
  dataSetId: bigint;
  pdpEndEpoch: bigint;
}

const words = (hex: string) =>
  (hex.slice(2).match(/.{64}/g) ?? []).map((w) => BigInt('0x' + w));

const pad = (value: string | bigint) =>
  (typeof value === 'bigint' ? value.toString(16) : value.slice(2))
    .toLowerCase()
    .padStart(64, '0');

const selector = (signature: string) =>
  '0x' + createHash('keccak-256').update(signature).digest('hex').slice(0, 8);

const call = (to: string, signature: string, ...args: (string | bigint)[]) =>
  rpc(FILECOIN_RPC, 'eth_call', [
    { to, data: selector(signature) + args.map(pad).join('') },
    'latest',
  ]) as Promise<string>;

export function decodeAccount(hex: string): Account {
  const [funds, lockupCurrent, lockupRate, lockupLastSettledAt] = words(hex);
  return { funds, lockupCurrent, lockupRate, lockupLastSettledAt };
}

// Filecoin Pay settles lockup lazily: since the last settlement the lockup has
// grown by rate per epoch. What remains above it pays future epochs. The
// lockup itself is the provider's guaranteed pay once the funds run out.
export function runway(
  account: Account,
  head: bigint,
): { paidEpochs: bigint; lockupEpochs: bigint } | null {
  const { funds, lockupCurrent, lockupRate, lockupLastSettledAt } = account;
  if (lockupRate === 0n) return null;
  const lockup = lockupCurrent + lockupRate * (head - lockupLastSettledAt);
  const free = funds > lockup ? funds - lockup : 0n;
  return { paidEpochs: free / lockupRate, lockupEpochs: lockup / lockupRate };
}

// getClientDataSets returns DataSetInfoView[]: 11 static words per entry.
export function decodeDataSets(hex: string): DataSet[] {
  const w = words(hex);
  const count = Number(w[1]);
  return Array.from({ length: count }, (_, i) => {
    const s = w.slice(2 + i * 11, 13 + i * 11);
    return { pdpEndEpoch: s[8], providerId: s[9], dataSetId: s[10] };
  });
}

// The provider record is deeply nested ABI (strings, bytes[]). The service URL
// is plain ASCII inside it, so find it instead of writing a full decoder.
export function extractServiceUrl(hex: string): string | null {
  const text = Buffer.from(hex.slice(2), 'hex').toString('latin1');
  return text.match(/https?:\/\/[\x21-\x7e]+/)?.[0] ?? null;
}

export function formatUsdfc(amount: bigint): string {
  const whole = amount / 10n ** 18n;
  const cents = (amount % 10n ** 18n) / 10n ** 16n;
  return `${whole}.${cents.toString().padStart(2, '0')}`;
}

export async function getStorageStatus() {
  const [walletHex, accountHex, setsHex, headHex] = await Promise.all([
    call(USDFC, 'balanceOf(address)', PAYER),
    call(PAYMENTS, 'accounts(address,address)', USDFC, PAYER),
    call(STORAGE_VIEW, 'getClientDataSets(address)', PAYER),
    rpc(FILECOIN_RPC, 'eth_blockNumber') as Promise<string>,
  ]);
  const account = decodeAccount(accountHex);
  const head = BigInt(headHex);
  const dataSet = decodeDataSets(setsHex).at(-1); // omnipin uses the last one

  let serviceUrl: string | null = null;
  let healthy = false;
  if (dataSet) {
    serviceUrl = extractServiceUrl(
      await call(
        PROVIDER_REGISTRY,
        'getProviderWithProduct(uint256,uint8)',
        dataSet.providerId,
        0n,
      ),
    );
    healthy = serviceUrl ? await ping(serviceUrl) : false;
  }

  const time = runway(account, head);
  const days = (epochs: bigint) => Number(epochs) / Number(EPOCHS_PER_DAY);
  return {
    wallet: BigInt(walletHex),
    account,
    monthlyRate: account.lockupRate * EPOCHS_PER_DAY * 30n,
    paidDays: time ? days(time.paidEpochs) : Infinity,
    lockupDays: time ? days(time.lockupEpochs) : 0,
    dataSet,
    serviceUrl,
    healthy,
  };
}

async function ping(serviceUrl: string): Promise<boolean> {
  try {
    const res = await fetch(new URL('/pdp/ping', serviceUrl), {
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function parseUsdfc(amount: string): bigint {
  const match = amount.match(/^(\d+)(?:\.(\d{1,18}))?$/);
  if (!match) throw new Error(`not a USDFC amount: ${amount}`);
  const [, whole, fraction = ''] = match;
  return BigInt(whole) * 10n ** 18n + BigInt(fraction.padEnd(18, '0'));
}

export const MIN_PAID_DAYS = 60;

export function storageWarnings(status: {
  paidDays: number;
  healthy: boolean;
  dataSet?: { pdpEndEpoch: bigint };
}): string[] {
  const warnings: string[] = [];
  if (status.paidDays < MIN_PAID_DAYS) {
    warnings.push(
      `Filecoin storage is paid for ${Math.floor(status.paidDays)} more days. ` +
        'Top up with `pnpm run storage topup`.',
    );
  }
  if (!status.healthy) {
    warnings.push(
      'The storage provider is down (/pdp/ping failed). A deploy will likely ' +
        'fail with "Failed to store piece data". Retry later.',
    );
  }
  if (status.dataSet && status.dataSet.pdpEndEpoch !== 0n) {
    warnings.push(
      'The Filecoin data set is terminated. The provider may drop the site.',
    );
  }
  return warnings;
}
