'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const EfpStats = () => {
  const [followers, setFollowers] = useState<number | null>(null);
  const [following, setFollowing] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          <span className="font-semibold">
            {followers !== null ? followers : '?'}
          </span>{' '}
          followers ·{' '}
          <span className="font-semibold">
            {following !== null ? following : '?'}
          </span>{' '}
          following
        </>
      )}
    </Link>
  );
};
