'use client';

import { Figtree, Roboto_Mono } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${robotoMono.variable}`}>
      <head>
        <title>Simon Emanuel Schmid</title>
        <meta name="description" content="Personal website and blog - Blogosphere 2.0" />
        <meta name="robots" content="follow, index" />
        <meta property="og:site_name" content="Simon Emanuel Schmid" />
        <meta property="og:title" content="Simon Emanuel Schmid" />
        <meta property="og:description" content="Personal website and blog - Blogosphere 2.0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@schmid_si" />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/api/rss" />
      </head>
      <body className="font-sans">
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            {children}
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
