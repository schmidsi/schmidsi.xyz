import type { Metadata } from 'next';
import { Figtree, Roboto_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Simon Emanuel Schmid',
  description: 'Personal website and blog - Blogosphere 2.0',
  robots: 'follow, index',
  openGraph: {
    siteName: 'Simon Emanuel Schmid',
    title: 'Simon Emanuel Schmid',
    description: 'Personal website and blog - Blogosphere 2.0',
  },
  twitter: {
    card: 'summary',
    site: '@schmid_si',
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${robotoMono.variable}`}>
      <body className="font-sans">
        <div className="max-w-2xl px-8 py-16">
          {children}
          <footer className="mt-16 text-sm text-gray-500">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            {' · '}
            <a href="/rss.xml" className="hover:underline">
              RSS
            </a>
            {' · '}
            <a
              href="https://app.ens.domains/ses.eth"
              className="hover:underline"
            >
              ses.eth
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
