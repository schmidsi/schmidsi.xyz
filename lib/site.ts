// ses.eth via the eth.limo gateway, the ses.box domain is lost, don't use it.
// The same IPFS content is reachable on every gateway, so each page declares
// this host as canonical, otherwise search engines pick a copy at random.
export const SITE_URL = 'https://ses.eth.limo';

// Next merges metadata per top-level key, so a page that sets `alternates`
// drops the layout's RSS link unless it repeats it
export function alternates(path: string) {
  return {
    canonical: path,
    types: { 'application/rss+xml': '/rss.xml' },
  };
}
