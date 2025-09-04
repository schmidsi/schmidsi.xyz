import Head from 'next/head';
import Link from 'next/link';
import { Figtree } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

const Home = () => {
  return (
    <div className={`${figtree.variable} font-sans mt-8 mx-4`}>
      <Head>
        <title>Simon Emanuel Schmid</title>
      </Head>

      <h1 className="text-6xl font-bold text-gray-400 leading-negative">
        <span className="text-gray-900">S</span>imon <br />{' '}
        <span className="text-gray-900">E</span>manuel <br />{' '}
        <span className="text-gray-900">S</span>chmid
      </h1>

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
