import type { NextraThemeLayoutProps } from "nextra";

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  console.log(pageOpts);

  return <div>{children}</div>;
}
