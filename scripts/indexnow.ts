// IndexNow (https://www.indexnow.org) tells Bing, Yandex, Seznam and Naver
// right away which pages changed, instead of waiting for a recrawl. Bing in
// turn feeds ChatGPT search and Copilot. Google does not take part.
//
// The key is public by design: the engines fetch public/<key>.txt from the
// site to check the ping comes from its owner.
import { SITE_URL } from '../lib/site.ts';

export const INDEXNOW_KEY = 'd4de7b7939858e420af1bd44296bcabe';

const urlsWithDates = (xml: string) =>
  new Map(
    [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, url]) => [
      url.match(/<loc>(.*?)<\/loc>/)?.[1] ?? '',
      url.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
    ]),
  );

// Pages that are new or have a different lastmod than in the live sitemap
export function changedUrls(oldXml: string, newXml: string): string[] {
  const before = urlsWithDates(oldXml);
  return [...urlsWithDates(newXml)]
    .filter(([url, lastmod]) => !before.has(url) || before.get(url) !== lastmod)
    .map(([url]) => url);
}

export async function submitToIndexNow(urls: string[]) {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  if (!response.ok) {
    throw new Error(`IndexNow answered ${response.status}`);
  }
}
