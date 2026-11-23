// Writes a redirect page into out/ for every entry in redirects.json.
// The static export has no server, so there are no HTTP redirects: each old
// path gets an index.html with a meta refresh (and a canonical link, so
// search engines move their ranking to the new URL).
//
// Usage: node scripts/redirects.ts   (after `next build`)
import fs from 'fs';
import path from 'path';

export function redirectPage(to: string): string {
  return `<!doctype html>
<meta charset="utf-8">
<title>Moved</title>
<meta http-equiv="refresh" content="0; url=${to}">
<link rel="canonical" href="${to}">
<p>Moved to <a href="${to}">${to}</a>.</p>
`;
}

export function writeRedirects(out: string, redirects: Record<string, string>) {
  for (const [from, to] of Object.entries(redirects)) {
    const file = path.join(out, from, 'index.html');
    // A redirect must never replace a real page that took over the old path.
    if (fs.existsSync(file)) {
      throw new Error(`redirect ${from} would overwrite an existing page`);
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, redirectPage(to));
  }
}

if (import.meta.main) {
  const redirects = JSON.parse(fs.readFileSync('redirects.json', 'utf8'));
  writeRedirects('out', redirects);
  console.log(`Wrote ${Object.keys(redirects).length} redirect(s) into out/`);
}
