import type { NextraThemeLayoutProps } from 'nextra';
import Head from 'next/head';
import { Figtree } from 'next/font/google';
import Link from 'next/link';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  console.log(pageOpts);

  return (
    <div className={`${figtree.variable} font-sans my-8 mx-4`}>
      <Head>
        <title>{pageOpts.title} | Simon Emanuel Schmid</title>
      </Head>

      <Link href="/">
        <header className="text-xl font-bold text-gray-400 leading-negative">
          <span className="text-gray-900">S</span>imon <br />{' '}
          <span className="text-gray-900">E</span>manuel <br />{' '}
          <span className="text-gray-900">S</span>chmid
        </header>
      </Link>
      <main className="prose mt-8 mb-8">{children}</main>
    </div>
  );
}
