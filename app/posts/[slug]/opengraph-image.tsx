import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Post metadata (inline for Edge Runtime compatibility)
// Add new posts here when creating them
const postMetadata: Record<string, { title: string; date: string; tag: string }> = {
  'nouns': {
    title: 'I minted a Noun',
    date: '2025-10-24',
    tag: 'nft, nouns',
  },
  'hello-world': {
    title: 'Hello world! The path to Blogosphere 2.0',
    date: '2024-01-15',
    tag: 'blogosphere-2',
  },
};

// Custom template renderer - add custom designs per post here
function renderOGImage(slug: string, post: { title: string; date: string; tag: string }) {
  // Custom templates for specific posts
  switch (slug) {
    case 'nouns':
      // Custom design for Nouns post with image
      return (
        <div
          style={{
            background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header: Site name */}
          <div
            style={{
              fontSize: 32,
              color: '#9ca3af',
              display: 'flex',
              marginBottom: 40,
            }}
          >
            <span style={{ color: '#111827' }}>S</span>imon{' '}
            <span style={{ color: '#111827' }}>E</span>manuel{' '}
            <span style={{ color: '#111827' }}>S</span>chmid
          </div>

          {/* Main content with Noun image */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              width: '100%',
            }}
          >
            {/* Emoji as placeholder for Noun image */}
            <div
              style={{
                fontSize: 120,
                display: 'flex',
              }}
            >
              ⌐◨-◨
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '700px',
              }}
            >
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: 20,
                }}
              >
                {post.title}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: '#6b7280',
                  display: 'flex',
                  gap: '15px',
                }}
              >
                <span>{post.date}</span>
                <span>•</span>
                <span>NFT, Nouns</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      // Default template for all other posts
      return (
        <div
          style={{
            fontSize: 64,
            background: 'linear-gradient(to bottom, #f9fafb, #e5e7eb)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header: Site name */}
          <div style={{ fontSize: 36, color: '#9ca3af', display: 'flex' }}>
            <span style={{ color: '#111827' }}>S</span>imon{' '}
            <span style={{ color: '#111827' }}>E</span>manuel{' '}
            <span style={{ color: '#111827' }}>S</span>chmid
          </div>

          {/* Main content: Post title */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 'bold',
              color: '#111827',
              marginTop: 40,
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </div>

          {/* Footer: Date and tag */}
          <div
            style={{
              fontSize: 28,
              color: '#6b7280',
              marginTop: 40,
              display: 'flex',
              gap: '20px',
            }}
          >
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.tag}</span>
          </div>
        </div>
      );
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postMetadata[slug];

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const content = renderOGImage(slug, post);

  return new ImageResponse(content, {
    ...size,
  });
}
