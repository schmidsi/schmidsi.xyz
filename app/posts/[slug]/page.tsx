import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getAllPostSlugs } from '@/lib/posts';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Compile MDX to React component
  const code = String(
    await compile(post.content, {
      outputFormat: 'function-body',
      remarkPlugins: [remarkGfm],
    }),
  );
  const { default: MDXContent } = await run(code, runtime);

  return (
    <div className="my-8 mx-4">
      <Link href="/">
        <header className="text-xl font-bold text-gray-400 leading-negative">
          <span className="text-gray-900">S</span>imon <br />
          <span className="text-gray-900">E</span>manuel <br />
          <span className="text-gray-900">S</span>chmid
        </header>
      </Link>
      <main className="prose mt-8 mb-8">
        <MDXContent />
      </main>
    </div>
  );
}
