'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function HomePage() {
  const [followers, setFollowers] = useState<number | null>(null);
  const [following, setFollowing] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch EFP stats
    fetch('https://api.ethfollow.xyz/api/v1/users/ses.eth/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setFollowers(data.followers_count || 0);
        setFollowing(data.following_count || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching EFP stats:', error);
        setFollowers(null);
        setFollowing(null);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-8 mx-4">
      <h1 className="text-6xl font-bold text-gray-400 leading-negative">
        <span className="text-gray-900">S</span>imon <br />{' '}
        <span className="text-gray-900">E</span>manuel <br />{' '}
        <span className="text-gray-900">S</span>chmid
      </h1>

      <div className="mt-6 mb-6">
        <div className="text-sm text-gray-600">
          <Link href="https://app.ens.domains/ses.eth" className="hover:underline">
            ses.eth
          </Link>
          {' · '}
          <Link
            href="https://efp.app/0x546457bbddf5e09929399768ab5a9d588cb0334d?ssr=false"
            className="hover:underline"
          >
            {loading ? (
              <>
                <LoadingSpinner /> followers · <LoadingSpinner /> following
              </>
            ) : (
              <>
                <span className="font-semibold">{followers !== null ? followers : '?'}</span>{' '}
                followers · <span className="font-semibold">{following !== null ? following : '?'}</span>{' '}
                following
              </>
            )}
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://warpcast.com/schmidsi">Farcaster</Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://t.me/schmidsi">Telegram</Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://www.linkedin.com/in/schmidsi/">LinkedIn</Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://github.com/schmidsi">GitHub</Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="mailto:simon@schmid.io">Mail</Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://hey.xyz/u/schmidsi">
            Hey <span className="text-gray-400 text-xs">Lens</span>
          </Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://x.com/schmidsi">
            X <span className="text-gray-400 text-xs">Twitter</span>
          </Link>
        </div>
        <br className="clear-left" />
      </div>

      <h2 className="text-lg font-semibold mt-6">Read</h2>
      <ul>
        <li>
          <Link href="/posts/nouns" className="underline">
            I minted a Noun (2025-10-24)
          </Link>
        </li>
        <li>
          <Link href="/posts/hello-world" className="underline">
            Hello world! The path to Blogosphere 2.0 (2024-1-15)
          </Link>
        </li>
      </ul>
    </div>
  );
}
