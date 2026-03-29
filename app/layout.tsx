import type { Metadata } from 'next';
import { Figtree, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/app/providers';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Simon Emanuel Schmid',
    template: '%s | Simon Emanuel Schmid',
  },
  description: 'Personal website and blog - Blogosphere 2.0',
  openGraph: {
    title: 'Simon Emanuel Schmid',
    description: 'Personal website and blog - Blogosphere 2.0',
    url: '/',
    siteName: 'Simon Emanuel Schmid',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@schmid_si',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': '/api/rss',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
