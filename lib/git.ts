import { execFileSync } from 'child_process';

// Date of the newest commit touching any of the files, YYYY-MM-DD. Git dates
// only change with the content, so they keep the build (and IPFS CID) stable.
export function lastCommitDate(...files: string[]): string | undefined {
  try {
    const date = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...files],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    return date ? date.slice(0, 10) : undefined;
  } catch (error) {
    console.error(`No git date for ${files.join(', ')}`, error);
    return undefined;
  }
}
