import Head from 'next/head';
import Link from 'next/link';
import { Figtree, Roboto_Mono } from 'next/font/google';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ProfileCard = dynamic(() => import('ethereum-identity-kit').then(mod => ({ default: mod.ProfileCard })), {
  ssr: false,
  loading: () => <p>Loading profile...</p>
});

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

const Home = () => {
  const [followers, setFollowers] = useState<number | null>(null);
  const [following, setFollowing] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  const spinnerChars = ['—', '\\', '|', '/'];

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

    // Animate spinner while loading
    const interval = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % spinnerChars.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={`${figtree.variable} ${robotoMono.variable} font-sans mt-8 mx-4`}>
      <Head>
        <title>Simon Emanuel Schmid</title>
      </Head>

      <h1 className="text-6xl font-bold text-gray-400 leading-negative">
        <span className="text-gray-900">S</span>imon <br />{' '}
        <span className="text-gray-900">E</span>manuel <br />{' '}
        <span className="text-gray-900">S</span>chmid
      </h1>

      <div className="mt-6 mb-6">
        <div className="text-sm text-gray-600">
          <Link href="https://app.ens.domains/ses.eth" legacyBehavior>
            <a className="font-mono hover:underline">ses.eth</a>
          </Link>
          {' · '}
          <Link href="https://efp.app/0x546457bbddf5e09929399768ab5a9d588cb0334d?ssr=false" legacyBehavior>
            <a className="hover:underline">
              {loading ? (
                <>
                  <span className="font-mono">{spinnerChars[spinnerFrame]}</span> followers · <span className="font-mono">{spinnerChars[spinnerFrame]}</span> following
                </>
              ) : (
                <>
                  <span className="font-semibold">{followers !== null ? followers : '?'}</span> followers · <span className="font-semibold">{following !== null ? following : '?'}</span> following
                </>
              )}
            </a>
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://warpcast.com/schmidsi" legacyBehavior>
            <a>Farcaster</a>
          </Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://t.me/schmidsi" legacyBehavior>
            <a>Telegram</a>
          </Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://www.linkedin.com/in/schmidsi/" legacyBehavior>
            <a>LinkedIn</a>
          </Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://github.com/schmidsi" legacyBehavior>
            <a>GitHub</a>
          </Link>
        </div>
        {/* <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://converse.xyz/dm/schmidsi.eth" legacyBehavior>
            <a>
              Converse <span className="text-gray-400 text-xs">XMTP</span>
            </a>
          </Link>
        </div> */}
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="mailto:simon@schmid.io" legacyBehavior>
            <a>Mail</a>
          </Link>
        </div>

        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://hey.xyz/u/schmidsi" legacyBehavior>
            <a>
              Hey <span className="text-gray-400 text-xs">Lens</span>
            </a>
          </Link>
        </div>
        <div className="float-left m-0.5 p-1 bg-slate-200 hover:bg-transparent border">
          <Link href="https://twitter.com/schmid_si" legacyBehavior>
            <a>
              X <span className="text-gray-400 text-xs">Twitter</span>
            </a>
          </Link>
        </div>
        <br className="clear-left" />
      </div>

      <h2 className="text-lg font-semibold mt-6">Read</h2>
      <ul>
        <li>
          <Link href="/posts/hello-world" className="underline">
            Hello world! The path to Blogosphere 2.0 (2024-1-15)
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
