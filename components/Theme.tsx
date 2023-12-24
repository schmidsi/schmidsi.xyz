import type { NextraThemeLayoutProps } from "nextra";
import Head from "next/head";

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  console.log(pageOpts);

  return (
    <>
      <Head>
        <title>{pageOpts.title} | Simon Emanuel Schmid</title>
      </Head>
      <div>{children}</div>
    </>
  );
}
