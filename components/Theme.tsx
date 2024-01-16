import type { NextraThemeLayoutProps } from 'nextra';
import Head from 'next/head';
import { Figtree } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  console.log(pageOpts);

  return (
    <>
      <Head>
        <title>{pageOpts.title} | Simon Emanuel Schmid</title>
      </Head>

      <main className={`${figtree.variable} font-sans mt-8 mx-4 prose`}>
        {children}
      </main>
    </>
  );
}
