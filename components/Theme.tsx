import type { NextraThemeLayoutProps } from "nextra";
import Head from "next/head";

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  console.log(pageOpts);

  return (
    <>
      <Head>
        <title>{pageOpts.title} | Simon Emanuel Schmid</title>
      </Head>
      <div className="flex flex-col min-h-screen justify-between mx-auto w-96">
        <header className="h-10"></header>
        <main className="mb-auto h-10">{children}</main>
        <footer className="h-10">{/* new Date().getFullYear() */}</footer>
      </div>
    </>
  );
}
