import Link from 'next/link';

// Small version of the landing page title, linking home from subpages.
export function SiteHeader() {
  return (
    <Link href="/">
      <header className="text-xl font-bold text-gray-400 leading-negative">
        <span className="text-gray-900">S</span>imon <br />
        <span className="text-gray-900">E</span>manuel <br />
        ses.eth
      </header>
    </Link>
  );
}
