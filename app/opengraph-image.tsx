import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const alt = 'Simon Emanuel Schmid';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #f9fafb, #e5e7eb)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, color: '#9ca3af' }}>
          <span style={{ color: '#111827' }}>S</span>imon{' '}
          <span style={{ color: '#111827' }}>E</span>manuel{' '}
          <span style={{ color: '#111827' }}>S</span>chmid
        </div>
        <div style={{ fontSize: 36, color: '#6b7280', marginTop: 20 }}>
          Blogosphere 2.0
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
